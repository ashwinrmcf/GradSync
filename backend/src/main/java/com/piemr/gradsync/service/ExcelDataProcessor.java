package com.piemr.gradsync.service;

import com.piemr.gradsync.entity.mongodb.User;
import com.piemr.gradsync.entity.mongodb.Batch;
import com.piemr.gradsync.entity.mongodb.Company;
import com.piemr.gradsync.entity.mongodb.Placement;
import com.piemr.gradsync.repository.mongodb.UserMongoRepository;
import com.piemr.gradsync.repository.mongodb.BatchMongoRepository;
import com.piemr.gradsync.repository.mongodb.CompanyMongoRepository;
import com.piemr.gradsync.repository.mongodb.PlacementMongoRepository;

import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.FileInputStream;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.HashMap;
import java.util.Map;

@Service
public class ExcelDataProcessor {
    
    @Autowired
    private UserMongoRepository userRepository;
    
    @Autowired
    private BatchMongoRepository batchRepository;
    
    @Autowired
    private CompanyMongoRepository companyRepository;
    
    @Autowired
    private PlacementMongoRepository placementRepository;
    
    /**
     * Process the NBA 2025.xlsx file from the Data folder
     */
    public Map<String, Object> processNBA2025Data() {
        Map<String, Object> result = new HashMap<>();
        List<User> importedUsers = new ArrayList<>();
        List<String> errors = new ArrayList<>();
        
        try {
            // Try multiple possible paths for the Excel file
            String[] possiblePaths = {
                "Data/NBA 2025.xlsx",
                "../Data/NBA 2025.xlsx", 
                "../../Data/NBA 2025.xlsx",
                "d:/GradSync/Data/NBA 2025.xlsx"
            };
            
            String filePath = null;
            for (String path : possiblePaths) {
                java.io.File testFile = new java.io.File(path);
                if (testFile.exists()) {
                    filePath = path;
                    break;
                }
            }
            
            if (filePath == null) {
                throw new IOException("NBA 2025.xlsx file not found in any of the expected locations: " + 
                    String.join(", ", possiblePaths));
            }
            
            System.out.println("Found Excel file at: " + filePath);
            FileInputStream file = new FileInputStream(filePath);
            Workbook workbook = new XSSFWorkbook(file);
            Sheet sheet = workbook.getSheetAt(0);
            
            System.out.println("Processing NBA 2025 data...");
            System.out.println("Total rows: " + sheet.getLastRowNum());
            
            // Find the actual data start row (skip headers and title rows)
            int dataStartRow = findDataStartRow(sheet);
            System.out.println("Data starts at row: " + (dataStartRow + 1));
            
            // Process each row (skip headers)
            for (int i = dataStartRow; i <= sheet.getLastRowNum(); i++) {
                Row row = sheet.getRow(i);
                if (row == null) continue;
                
                try {
                    User user = createUserFromRow(row, i);
                    if (user != null) {
                        // Check for duplicates
                        if (!userRepository.existsByEmail(user.getEmail()) && 
                            !userRepository.existsByBatchInfoRollNumber(user.getBatchInfo().getRollNumber())) {
                            
                            User savedUser = userRepository.save(user);
                            importedUsers.add(savedUser);
                            
                            // Create placement record if employment data exists
                            createPlacementRecord(savedUser);
                            
                            System.out.println("Imported: " + user.getFullName() + " (" + user.getBatchInfo().getRollNumber() + ")");
                        } else {
                            errors.add("Row " + (i + 1) + ": Duplicate email or roll number - " + user.getEmail());
                        }
                    }
                } catch (Exception e) {
                    errors.add("Row " + (i + 1) + ": " + e.getMessage());
                    System.err.println("Error processing row " + (i + 1) + ": " + e.getMessage());
                }
            }
            
            workbook.close();
            file.close();
            
            // Update batch statistics
            updateBatchStatistics();
            
            result.put("success", true);
            result.put("importedCount", importedUsers.size());
            result.put("errorCount", errors.size());
            result.put("errors", errors);
            result.put("message", "Successfully imported " + importedUsers.size() + " students from NBA 2025.xlsx");
            
        } catch (IOException e) {
            result.put("success", false);
            result.put("message", "Error reading Excel file: " + e.getMessage());
            System.err.println("Error reading Excel file: " + e.getMessage());
        }
        
        return result;
    }
    
    /**
     * Find the row where actual student data starts (skip title and header rows)
     */
    private int findDataStartRow(Sheet sheet) {
        for (int i = 0; i <= sheet.getLastRowNum(); i++) {
            Row row = sheet.getRow(i);
            if (row == null) continue;
            
            Cell firstCell = row.getCell(0);
            if (firstCell != null) {
                String cellValue = getCellValueAsString(firstCell);
                // Look for the first row that starts with "1" (S.No column)
                if ("1".equals(cellValue)) {
                    return i;
                }
                // Also check if it's a numeric value (in case it's formatted as number)
                if (firstCell.getCellType() == CellType.NUMERIC && 
                    firstCell.getNumericCellValue() == 1.0) {
                    return i;
                }
            }
        }
        // Default to row 6 if not found (based on typical NBA format)
        return 6;
    }
    
    private User createUserFromRow(Row row, int rowIndex) {
        User user = new User();
        
        try {
            // Column mapping based on NBA 2025.xlsx structure (CSE Department Placement Record)
            // Row structure: S.No | Enrollment No | Student name | Employee name | Appointment No
            String serialNo = getCellValueAsString(row.getCell(0)); // Column A: S.No
            String rollNumber = getCellValueAsString(row.getCell(1)); // Column B: Enrollment No (like 0863CS181002)
            String name = getCellValueAsString(row.getCell(2)); // Column C: Student name
            String company = getCellValueAsString(row.getCell(3)); // Column D: Employee name (Company)
            String appointmentInfo = getCellValueAsString(row.getCell(4)); // Column E: Appointment No/Date
            
            // Validate required fields
            if (name == null || name.trim().isEmpty()) {
                throw new RuntimeException("Student name is required");
            }
            if (rollNumber == null || rollNumber.trim().isEmpty()) {
                throw new RuntimeException("Enrollment number is required");
            }
            
            // Parse name
            String[] nameParts = name.trim().split("\\s+");
            user.setFirstName(nameParts[0]);
            if (nameParts.length > 1) {
                user.setLastName(String.join(" ", 
                    java.util.Arrays.copyOfRange(nameParts, 1, nameParts.length)));
            } else {
                user.setLastName(""); // Will need manual update
            }
            
            // Generate email from roll number
            String email = rollNumber.toLowerCase().trim() + "@piemr.edu.in";
            user.setEmail(email);
            
            // Set basic info
            user.setPassword("student123"); // Default password - will be hashed
            user.setRole(User.Role.ALUMNI);
            user.setStatus(User.Status.PENDING_VERIFICATION);
            
            // Batch Information - CSE Department 2018-2022
            User.BatchInfo batchInfo = new User.BatchInfo();
            batchInfo.setRollNumber(rollNumber.toUpperCase().trim());
            batchInfo.setBranch("CSE"); // Computer Science & Engineering
            batchInfo.setAdmissionYear(2018);
            batchInfo.setGraduationYear(2022);
            
            user.setBatchInfo(batchInfo);
            
            // Professional Information - Company placement data
            if (company != null && !company.trim().isEmpty() && 
                !company.trim().equalsIgnoreCase("Employee name")) { // Skip header
                
                User.ProfessionalInfo professional = new User.ProfessionalInfo();
                professional.setCurrentCompany(company.trim());
                professional.setDesignation("Software Engineer"); // Default designation
                professional.setWorkType("FULL_TIME");
                
                // Store appointment info as additional details
                if (appointmentInfo != null && !appointmentInfo.trim().isEmpty()) {
                    professional.setSkills(List.of("Appointment Info: " + appointmentInfo.trim()));
                }
                
                // Set default package for CSE graduates (can be updated later)
                professional.setCurrentSalary(4.5); // Default 4.5 LPA
                
                user.setProfessional(professional);
            }
            
            // Verification Info
            User.VerificationInfo verification = new User.VerificationInfo();
            verification.setEmailVerified(false);
            verification.setPhoneVerified(false);
            verification.setProfileVerified(false);
            user.setVerification(verification);
            
            return user;
            
        } catch (Exception e) {
            throw new RuntimeException("Error creating user from row data: " + e.getMessage());
        }
    }
    
    private void createPlacementRecord(User user) {
        if (user.getProfessional() == null || 
            user.getProfessional().getCurrentCompany() == null) {
            return;
        }
        
        try {
            // Find or create company
            String companyName = user.getProfessional().getCurrentCompany();
            Optional<Company> existingCompany = companyRepository.findByNameIgnoreCase(companyName);
            
            Company company;
            if (existingCompany.isPresent()) {
                company = existingCompany.get();
            } else {
                company = new Company();
                company.setName(companyName);
                company.setIndustry("Technology"); // Default
                company.setIsActive(true);
                company = companyRepository.save(company);
            }
            
            // Create placement record
            Placement placement = new Placement();
            placement.setStudentId(user.getId());
            placement.setCompanyId(company.getId());
            placement.setDesignation(user.getProfessional().getDesignation());
            placement.setPackageAmount(user.getProfessional().getCurrentSalary());
            placement.setPlacementDate(LocalDateTime.of(2022, 6, 1, 0, 0)); // Graduation date
            placement.setPlacementType(Placement.PlacementType.CAMPUS);
            placement.setStatus(Placement.PlacementStatus.JOINED);
            
            placementRepository.save(placement);
            
        } catch (Exception e) {
            System.err.println("Error creating placement record for " + user.getFullName() + ": " + e.getMessage());
        }
    }
    
    private void updateBatchStatistics() {
        try {
            // Update CSE 2018-2022 batch statistics
            Optional<Batch> existingBatch = batchRepository.findByGraduationYearAndBranch(2022, "CSE");
            
            Batch batch;
            if (existingBatch.isPresent()) {
                batch = existingBatch.get();
            } else {
                batch = new Batch();
                batch.setGraduationYear(2022);
                batch.setBranch("CSE");
                batch.setAdmissionYear(2018);
                batch.setIsActive(true);
            }
            
            // Count students in this batch
            long totalStudents = userRepository.countByBatch(2022, "CSE");
            long placedStudents = userRepository.countPlacedAlumniByBatch(2022, "CSE");
            
            batch.setTotalStudents((int) totalStudents);
            batch.setPlacedStudents((int) placedStudents);
            
            if (placedStudents > 0) {
                // Calculate average package
                List<User> placedAlumni = userRepository.findByBatchInfoGraduationYearAndBatchInfoBranch(2022, "CSE")
                    .stream()
                    .filter(user -> user.getProfessional() != null && 
                                   user.getProfessional().getCurrentSalary() != null)
                    .toList();
                
                if (!placedAlumni.isEmpty()) {
                    double avgPackage = placedAlumni.stream()
                        .mapToDouble(user -> user.getProfessional().getCurrentSalary())
                        .average()
                        .orElse(0.0);
                    
                    batch.setAveragePackage(avgPackage);
                }
                
                batch.setPlacementPercentage((placedStudents * 100.0) / totalStudents);
            }
            
            // Update top recruiters
            List<String> topRecruiters = new ArrayList<>();
            // This would require aggregation query - simplified for now
            topRecruiters.add("TCS");
            topRecruiters.add("Infosys");
            topRecruiters.add("Wipro");
            batch.setTopRecruiters(topRecruiters);
            
            batchRepository.save(batch);
            
            System.out.println("Updated batch statistics: " + totalStudents + " total, " + placedStudents + " placed");
            
        } catch (Exception e) {
            System.err.println("Error updating batch statistics: " + e.getMessage());
        }
    }
    
    // Helper methods for reading Excel cells
    private String getCellValueAsString(Cell cell) {
        if (cell == null) return null;
        
        switch (cell.getCellType()) {
            case STRING:
                return cell.getStringCellValue().trim();
            case NUMERIC:
                if (DateUtil.isCellDateFormatted(cell)) {
                    return cell.getDateCellValue().toString();
                } else {
                    return String.valueOf((long) cell.getNumericCellValue());
                }
            case BOOLEAN:
                return String.valueOf(cell.getBooleanCellValue());
            case FORMULA:
                return cell.getCellFormula();
            default:
                return null;
        }
    }
    
    private Double getCellValueAsDouble(Cell cell) {
        if (cell == null) return null;
        
        try {
            if (cell.getCellType() == CellType.NUMERIC) {
                return cell.getNumericCellValue();
            } else if (cell.getCellType() == CellType.STRING) {
                String value = cell.getStringCellValue().trim();
                if (!value.isEmpty()) {
                    return Double.parseDouble(value);
                }
            }
        } catch (NumberFormatException e) {
            System.err.println("Error parsing double from cell: " + e.getMessage());
        }
        
        return null;
    }
}
