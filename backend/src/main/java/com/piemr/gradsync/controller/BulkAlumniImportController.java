package com.piemr.gradsync.controller;

import com.piemr.gradsync.entity.mongodb.User;
import com.piemr.gradsync.entity.mongodb.Batch;
import com.piemr.gradsync.repository.mongodb.UserMongoRepository;
import com.piemr.gradsync.repository.mongodb.BatchMongoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/admin/alumni")
@CrossOrigin(origins = "*", maxAge = 3600)
public class BulkAlumniImportController {
    
    @Autowired
    private UserMongoRepository userRepository;
    
    @Autowired
    private BatchMongoRepository batchRepository;
    
    /**
     * Bulk import alumni data
     * POST /api/admin/alumni/bulk-import
     */
    @PostMapping("/bulk-import")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> bulkImportAlumni(@RequestBody List<User> alumniList) {
        try {
            List<User> importedAlumni = new ArrayList<>();
            List<String> errors = new ArrayList<>();
            
            for (User alumni : alumniList) {
                try {
                    // Validate required fields
                    if (alumni.getEmail() == null || alumni.getBatchInfo() == null || 
                        alumni.getBatchInfo().getRollNumber() == null) {
                        errors.add("Missing required fields for alumni: " + 
                                  (alumni.getEmail() != null ? alumni.getEmail() : "Unknown"));
                        continue;
                    }
                    
                    // Check if alumni already exists
                    if (userRepository.existsByEmail(alumni.getEmail()) || 
                        userRepository.existsByBatchInfoRollNumber(alumni.getBatchInfo().getRollNumber())) {
                        errors.add("Alumni already exists: " + alumni.getEmail());
                        continue;
                    }
                    
                    // Set default values if not provided
                    if (alumni.getRole() == null) {
                        alumni.setRole(User.Role.ALUMNI);
                    }
                    if (alumni.getStatus() == null) {
                        alumni.setStatus(User.Status.PENDING_VERIFICATION);
                    }
                    if (alumni.getPassword() == null) {
                        alumni.setPassword("student123"); // Default password
                    }
                    
                    // Set timestamps
                    alumni.setCreatedAt(LocalDateTime.now());
                    alumni.setUpdatedAt(LocalDateTime.now());
                    
                    // Ensure verification info exists
                    if (alumni.getVerification() == null) {
                        User.VerificationInfo verification = new User.VerificationInfo();
                        verification.setEmailVerified(false);
                        verification.setPhoneVerified(false);
                        verification.setProfileVerified(false);
                        alumni.setVerification(verification);
                    }
                    
                    // Save alumni
                    User savedAlumni = userRepository.save(alumni);
                    importedAlumni.add(savedAlumni);
                    
                } catch (Exception e) {
                    errors.add("Error importing alumni " + alumni.getEmail() + ": " + e.getMessage());
                }
            }
            
            // Update batch statistics
            updateBatchStatistics(importedAlumni);
            
            // Prepare response
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Bulk import completed");
            response.put("totalProvided", alumniList.size());
            response.put("successfullyImported", importedAlumni.size());
            response.put("errors", errors);
            response.put("importedAlumni", importedAlumni.stream()
                .map(this::createAlumniSummary)
                .collect(Collectors.toList()));
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("success", false);
            errorResponse.put("message", "Error during bulk import: " + e.getMessage());
            return ResponseEntity.internalServerError().body(errorResponse);
        }
    }
    
    /**
     * Generate sample alumni data for a specific batch year
     * GET /api/admin/alumni/generate-sample/{year}
     */
    @GetMapping("/generate-sample/{year}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> generateSampleData(@PathVariable Integer year) {
        try {
            List<User> sampleAlumni = generateSampleAlumniData(year, 10);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Sample data generated for batch " + year);
            response.put("batchYear", year);
            response.put("count", sampleAlumni.size());
            response.put("sampleData", sampleAlumni);
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("success", false);
            errorResponse.put("message", "Error generating sample data: " + e.getMessage());
            return ResponseEntity.internalServerError().body(errorResponse);
        }
    }
    
    /**
     * Get batch statistics for all years
     * GET /api/admin/alumni/batch-stats
     */
    @GetMapping("/batch-stats")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> getBatchStatistics() {
        try {
            List<Batch> allBatches = batchRepository.findAll();
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("totalBatches", allBatches.size());
            response.put("batchStatistics", allBatches.stream()
                .map(this::createBatchSummary)
                .collect(Collectors.toList()));
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("success", false);
            errorResponse.put("message", "Error fetching batch statistics: " + e.getMessage());
            return ResponseEntity.internalServerError().body(errorResponse);
        }
    }
    
    // Helper methods
    private void updateBatchStatistics(List<User> alumni) {
        // Group alumni by batch (graduation year + branch)
        Map<String, List<User>> batchGroups = alumni.stream()
            .filter(user -> user.getBatchInfo() != null)
            .collect(Collectors.groupingBy(user -> 
                user.getBatchInfo().getGraduationYear() + "-" + user.getBatchInfo().getBranch()));
        
        batchGroups.forEach((batchKey, batchAlumni) -> {
            if (!batchAlumni.isEmpty()) {
                User firstAlumni = batchAlumni.get(0);
                Integer graduationYear = firstAlumni.getBatchInfo().getGraduationYear();
                String branch = firstAlumni.getBatchInfo().getBranch();
                
                // Find or create batch
                Optional<Batch> existingBatch = batchRepository.findByGraduationYearAndBranch(graduationYear, branch);
                Batch batch = existingBatch.orElse(new Batch());
                
                if (!existingBatch.isPresent()) {
                    batch.setGraduationYear(graduationYear);
                    batch.setBranch(branch);
                    batch.setAdmissionYear(graduationYear - 4);
                    batch.setIsActive(true);
                    batch.setCreatedAt(LocalDateTime.now());
                }
                
                // Update statistics
                long totalInBatch = userRepository.countByBatchInfoGraduationYearAndBatchInfoBranch(graduationYear, branch);
                long placedInBatch = userRepository.countByBatchInfoGraduationYearAndBatchInfoBranchAndProfessionalCurrentCompanyIsNotNull(graduationYear, branch);
                
                batch.setTotalStudents((int) totalInBatch);
                batch.setPlacedStudents((int) placedInBatch);
                
                if (placedInBatch > 0) {
                    // Calculate average package
                    List<User> placedAlumni = userRepository.findByBatchInfoGraduationYearAndBatchInfoBranchAndProfessionalCurrentCompanyIsNotNull(graduationYear, branch);
                    double avgPackage = placedAlumni.stream()
                        .filter(user -> user.getProfessional() != null && user.getProfessional().getCurrentSalary() != null)
                        .mapToDouble(user -> user.getProfessional().getCurrentSalary())
                        .average()
                        .orElse(0.0);
                    
                    batch.setAveragePackage(avgPackage);
                    batch.setPlacementPercentage((placedInBatch * 100.0) / totalInBatch);
                }
                
                batch.setUpdatedAt(LocalDateTime.now());
                batchRepository.save(batch);
            }
        });
    }
    
    private List<User> generateSampleAlumniData(Integer year, int count) {
        List<User> sampleAlumni = new ArrayList<>();
        String[] firstNames = {"Aarav", "Vivaan", "Aditya", "Vihaan", "Arjun", "Ananya", "Diya", "Priya", "Kavya", "Anika"};
        String[] lastNames = {"Sharma", "Verma", "Gupta", "Singh", "Kumar", "Patel", "Jain", "Agarwal", "Reddy", "Nair"};
        String[] branches = {"CSE", "IT", "ECE", "EEE", "MECH", "CIVIL"};
        String[] companies = {"TCS", "Infosys", "Wipro", "Cognizant", "Accenture", "Microsoft", "Google", "Amazon"};
        
        Random random = new Random();
        
        for (int i = 0; i < count; i++) {
            User alumni = new User();
            
            String firstName = firstNames[random.nextInt(firstNames.length)];
            String lastName = lastNames[random.nextInt(lastNames.length)];
            String branch = branches[random.nextInt(branches.length)];
            String company = companies[random.nextInt(companies.length)];
            
            alumni.setFirstName(firstName);
            alumni.setLastName(lastName);
            alumni.setEmail(firstName.toLowerCase() + "." + lastName.toLowerCase() + year + "@piemr.edu.in");
            alumni.setPassword("student123");
            alumni.setRole(User.Role.ALUMNI);
            alumni.setStatus(User.Status.PENDING_VERIFICATION);
            
            // Batch info
            User.BatchInfo batchInfo = new User.BatchInfo();
            batchInfo.setAdmissionYear(year - 4);
            batchInfo.setGraduationYear(year);
            batchInfo.setBranch(branch);
            batchInfo.setRollNumber("0863" + branch + String.format("%03d", i + 1));
            batchInfo.setCgpa(6.0 + random.nextDouble() * 4.0); // 6.0 to 10.0
            alumni.setBatchInfo(batchInfo);
            
            // Professional info
            User.ProfessionalInfo professional = new User.ProfessionalInfo();
            professional.setCurrentCompany(company);
            professional.setDesignation("Software Engineer");
            professional.setCurrentSalary(3.0 + random.nextDouble() * 15.0); // 3.0 to 18.0 LPA
            professional.setWorkType("FULL_TIME");
            professional.setExperienceYears(LocalDateTime.now().getYear() - year);
            alumni.setProfessional(professional);
            
            // Verification
            User.VerificationInfo verification = new User.VerificationInfo();
            verification.setEmailVerified(random.nextBoolean());
            verification.setPhoneVerified(random.nextBoolean());
            verification.setProfileVerified(random.nextBoolean());
            alumni.setVerification(verification);
            
            sampleAlumni.add(alumni);
        }
        
        return sampleAlumni;
    }
    
    private Map<String, Object> createAlumniSummary(User alumni) {
        Map<String, Object> summary = new HashMap<>();
        summary.put("id", alumni.getId());
        summary.put("name", alumni.getFullName());
        summary.put("email", alumni.getEmail());
        if (alumni.getBatchInfo() != null) {
            summary.put("rollNumber", alumni.getBatchInfo().getRollNumber());
            summary.put("batch", alumni.getBatchInfo().getGraduationYear() + " " + alumni.getBatchInfo().getBranch());
        }
        if (alumni.getProfessional() != null) {
            summary.put("company", alumni.getProfessional().getCurrentCompany());
        }
        return summary;
    }
    
    private Map<String, Object> createBatchSummary(Batch batch) {
        Map<String, Object> summary = new HashMap<>();
        summary.put("graduationYear", batch.getGraduationYear());
        summary.put("branch", batch.getBranch());
        summary.put("totalStudents", batch.getTotalStudents());
        summary.put("placedStudents", batch.getPlacedStudents());
        summary.put("placementPercentage", batch.getPlacementPercentage());
        summary.put("averagePackage", batch.getAveragePackage());
        return summary;
    }
}
