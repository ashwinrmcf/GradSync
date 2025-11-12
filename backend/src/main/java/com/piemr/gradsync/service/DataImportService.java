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
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class DataImportService {
    
    @Autowired
    private UserMongoRepository userRepository;
    
    @Autowired
    private BatchMongoRepository batchRepository;
    
    @Autowired
    private CompanyMongoRepository companyRepository;
    
    @Autowired
    private PlacementMongoRepository placementRepository;
    
    /**
     * Import student data from Excel file
     * Expected columns: Name, Roll Number, Email, Branch, Admission Year, Graduation Year, 
     * Company, Designation, Package, Phone, CGPA
     */
    public List<User> importStudentDataFromExcel(MultipartFile file) throws IOException {
        List<User> importedUsers = new ArrayList<>();
        
        try (Workbook workbook = new XSSFWorkbook(file.getInputStream())) {
            Sheet sheet = workbook.getSheetAt(0);
            
            // Skip header row
            for (int i = 1; i <= sheet.getLastRowNum(); i++) {
                Row row = sheet.getRow(i);
                if (row == null) continue;
                
                try {
                    User user = createUserFromExcelRow(row);
                    if (user != null) {
                        // Check if user already exists
                        if (!userRepository.existsByEmail(user.getEmail()) && 
                            !userRepository.existsByBatchInfoRollNumber(user.getBatchInfo().getRollNumber())) {
                            
                            User savedUser = userRepository.save(user);
                            importedUsers.add(savedUser);
                            
                            // Create placement record if company information exists
                            if (user.getProfessional() != null && 
                                user.getProfessional().getCurrentCompany() != null) {
                                createPlacementRecord(savedUser);
                            }
                        }
                    }
                } catch (Exception e) {
                    System.err.println("Error processing row " + i + ": " + e.getMessage());
                }
            }
        }
        
        // Update batch statistics
        updateBatchStatistics(importedUsers);
        
        return importedUsers;
    }
    
    private User createUserFromExcelRow(Row row) {
        try {
            User user = new User();
            
            // Basic Information
            String fullName = getCellValueAsString(row.getCell(0)); // Name column
            if (fullName != null && !fullName.trim().isEmpty()) {
                String[] nameParts = fullName.trim().split("\\s+");
                user.setFirstName(nameParts[0]);
                if (nameParts.length > 1) {
                    user.setLastName(String.join(" ", 
                        java.util.Arrays.copyOfRange(nameParts, 1, nameParts.length)));
                } else {
                    user.setLastName(""); // Will need to be updated
                }
            }
            
            String rollNumber = getCellValueAsString(row.getCell(1)); // Roll Number
            String email = getCellValueAsString(row.getCell(2)); // Email
            String branch = getCellValueAsString(row.getCell(3)); // Branch
            
            // Validate required fields
            if (rollNumber == null || email == null || branch == null) {
                return null;
            }
            
            user.setEmail(email.toLowerCase());
            user.setPassword("defaultPassword123"); // Will be hashed automatically
            user.setRole(User.Role.ALUMNI);
            user.setStatus(User.Status.PENDING_VERIFICATION);
            
            // Batch Information
            User.BatchInfo batchInfo = new User.BatchInfo();
            batchInfo.setRollNumber(rollNumber.toUpperCase());
            batchInfo.setBranch(branch.toUpperCase());
            
            // Get admission and graduation years
            Integer admissionYear = getCellValueAsInteger(row.getCell(4));
            Integer graduationYear = getCellValueAsInteger(row.getCell(5));
            
            if (admissionYear != null) {
                batchInfo.setAdmissionYear(admissionYear);
            }
            if (graduationYear != null) {
                batchInfo.setGraduationYear(graduationYear);
            }
            
            // CGPA
            Double cgpa = getCellValueAsDouble(row.getCell(10));
            if (cgpa != null) {
                batchInfo.setCgpa(cgpa);
            }
            
            user.setBatchInfo(batchInfo);
            
            // Professional Information
            String company = getCellValueAsString(row.getCell(6)); // Company
            String designation = getCellValueAsString(row.getCell(7)); // Designation
            Double packageAmount = getCellValueAsDouble(row.getCell(8)); // Package
            
            if (company != null || designation != null || packageAmount != null) {
                User.ProfessionalInfo professional = new User.ProfessionalInfo();
                professional.setCurrentCompany(company);
                professional.setDesignation(designation);
                professional.setCurrentSalary(packageAmount);
                professional.setWorkType("FULL_TIME");
                user.setProfessional(professional);
            }
            
            // Contact Information
            String phone = getCellValueAsString(row.getCell(9)); // Phone
            if (phone != null) {
                User.ContactInfo contact = new User.ContactInfo();
                contact.setPhone(phone);
                user.setContact(contact);
            }
            
            // Verification
            User.VerificationInfo verification = new User.VerificationInfo();
            verification.setEmailVerified(false);
            verification.setPhoneVerified(false);
            verification.setProfileVerified(false);
            user.setVerification(verification);
            
            return user;
            
        } catch (Exception e) {
            System.err.println("Error creating user from row: " + e.getMessage());
            return null;
        }
    }
    
    private void createPlacementRecord(User user) {
        if (user.getProfessional() == null || 
            user.getProfessional().getCurrentCompany() == null) {
            return;
        }
        
        // Find or create company
        String companyName = user.getProfessional().getCurrentCompany();
        Optional<Company> existingCompany = companyRepository.findByName(companyName);
        
        Company company;
        if (existingCompany.isPresent()) {
            company = existingCompany.get();
        } else {
            company = new Company();
            company.setName(companyName);
            company.setIndustry("Technology"); // Default industry
            company.setIsActive(true);
            company = companyRepository.save(company);
        }
        
        // Create placement record
        Placement placement = new Placement();
        placement.setStudentId(user.getId());
        placement.setCompanyId(company.getId());
        placement.setDesignation(user.getProfessional().getDesignation());
        placement.setPackageAmount(user.getProfessional().getCurrentSalary());
        placement.setPlacementDate(LocalDateTime.now()); // Default to current date
        placement.setPlacementType(Placement.PlacementType.CAMPUS);
        placement.setStatus(Placement.PlacementStatus.JOINED);
        
        placementRepository.save(placement);
    }
    
    private void updateBatchStatistics(List<User> users) {
        // Group users by batch and update statistics
        users.stream()
            .collect(java.util.stream.Collectors.groupingBy(
                user -> user.getBatchInfo().getGraduationYear() + "-" + user.getBatchInfo().getBranch()
            ))
            .forEach((batchKey, batchUsers) -> {
                if (!batchUsers.isEmpty()) {
                    User firstUser = batchUsers.get(0);
                    Integer graduationYear = firstUser.getBatchInfo().getGraduationYear();
                    String branch = firstUser.getBatchInfo().getBranch();
                    
                    Optional<Batch> existingBatch = batchRepository.findByGraduationYearAndBranch(graduationYear, branch);
                    
                    Batch batch;
                    if (existingBatch.isPresent()) {
                        batch = existingBatch.get();
                    } else {
                        batch = new Batch();
                        batch.setGraduationYear(graduationYear);
                        batch.setBranch(branch);
                        batch.setAdmissionYear(graduationYear - 4); // Assuming 4-year course
                        batch.setIsActive(true);
                    }
                    
                    // Update batch statistics
                    batch.setTotalStudents(batchUsers.size());
                    
                    long placedStudents = batchUsers.stream()
                        .filter(user -> user.getProfessional() != null && 
                                       user.getProfessional().getCurrentCompany() != null)
                        .count();
                    
                    batch.setPlacedStudents((int) placedStudents);
                    
                    if (placedStudents > 0) {
                        double avgPackage = batchUsers.stream()
                            .filter(user -> user.getProfessional() != null && 
                                           user.getProfessional().getCurrentSalary() != null)
                            .mapToDouble(user -> user.getProfessional().getCurrentSalary())
                            .average()
                            .orElse(0.0);
                        
                        batch.setAveragePackage(avgPackage);
                        batch.setPlacementPercentage((placedStudents * 100.0) / batchUsers.size());
                    }
                    
                    batchRepository.save(batch);
                }
            });
    }
    
    // Helper methods for reading Excel cells
    private String getCellValueAsString(Cell cell) {
        if (cell == null) return null;
        
        switch (cell.getCellType()) {
            case STRING:
                return cell.getStringCellValue().trim();
            case NUMERIC:
                return String.valueOf((long) cell.getNumericCellValue());
            case BOOLEAN:
                return String.valueOf(cell.getBooleanCellValue());
            default:
                return null;
        }
    }
    
    private Integer getCellValueAsInteger(Cell cell) {
        if (cell == null) return null;
        
        try {
            if (cell.getCellType() == CellType.NUMERIC) {
                return (int) cell.getNumericCellValue();
            } else if (cell.getCellType() == CellType.STRING) {
                return Integer.parseInt(cell.getStringCellValue().trim());
            }
        } catch (NumberFormatException e) {
            System.err.println("Error parsing integer from cell: " + e.getMessage());
        }
        
        return null;
    }
    
    private Double getCellValueAsDouble(Cell cell) {
        if (cell == null) return null;
        
        try {
            if (cell.getCellType() == CellType.NUMERIC) {
                return cell.getNumericCellValue();
            } else if (cell.getCellType() == CellType.STRING) {
                return Double.parseDouble(cell.getStringCellValue().trim());
            }
        } catch (NumberFormatException e) {
            System.err.println("Error parsing double from cell: " + e.getMessage());
        }
        
        return null;
    }
}
