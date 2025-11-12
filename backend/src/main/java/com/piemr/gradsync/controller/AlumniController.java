package com.piemr.gradsync.controller;

import com.piemr.gradsync.entity.mongodb.User;
import com.piemr.gradsync.entity.mongodb.Batch;
import com.piemr.gradsync.repository.mongodb.UserMongoRepository;
import com.piemr.gradsync.repository.mongodb.BatchMongoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/alumni")
@CrossOrigin(origins = "*", maxAge = 3600)
public class AlumniController {
    
    @Autowired
    private UserMongoRepository userRepository;
    
    @Autowired
    private BatchMongoRepository batchRepository;
    
    /**
     * Get all alumni with pagination
     * GET /api/alumni?page=0&size=10
     */
    @GetMapping
    public ResponseEntity<?> getAllAlumni(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "12") int size,
            @RequestParam(required = false) String branch,
            @RequestParam(required = false) Integer graduationYear,
            @RequestParam(required = false) String company) {
        
        try {
            Pageable pageable = PageRequest.of(page, size, Sort.by("batchInfo.graduationYear").descending());
            Page<User> alumniPage;
            
            // Apply filters
            if (graduationYear != null && branch != null) {
                alumniPage = userRepository.findByBatchInfoGraduationYearAndBatchInfoBranch(
                    graduationYear, branch, pageable);
            } else if (company != null) {
                alumniPage = userRepository.findByProfessionalCurrentCompany(company, pageable);
            } else {
                alumniPage = userRepository.findByRole(User.Role.ALUMNI, pageable);
            }
            
            // Transform to response format
            List<Map<String, Object>> alumniList = alumniPage.getContent().stream()
                .map(this::transformUserToAlumniResponse)
                .collect(Collectors.toList());
            
            Map<String, Object> response = new HashMap<>();
            response.put("alumni", alumniList);
            response.put("totalElements", alumniPage.getTotalElements());
            response.put("totalPages", alumniPage.getTotalPages());
            response.put("currentPage", page);
            response.put("size", size);
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                .body(Map.of("error", "Error fetching alumni: " + e.getMessage()));
        }
    }
    
    /**
     * Get alumni by batch
     * GET /api/alumni/batch/2022/CSE
     */
    @GetMapping("/batch/{graduationYear}/{branch}")
    public ResponseEntity<?> getAlumniByBatch(
            @PathVariable Integer graduationYear,
            @PathVariable String branch,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        
        try {
            Pageable pageable = PageRequest.of(page, size, Sort.by("firstName").ascending());
            Page<User> alumniPage = userRepository.findByBatchInfoGraduationYearAndBatchInfoBranch(
                graduationYear, branch, pageable);
            
            List<Map<String, Object>> alumniList = alumniPage.getContent().stream()
                .map(this::transformUserToAlumniResponse)
                .collect(Collectors.toList());
            
            // Get batch statistics
            Optional<Batch> batchOpt = batchRepository.findByGraduationYearAndBranch(graduationYear, branch);
            Map<String, Object> batchStats = new HashMap<>();
            if (batchOpt.isPresent()) {
                Batch batch = batchOpt.get();
                batchStats.put("totalStudents", batch.getTotalStudents());
                batchStats.put("placedStudents", batch.getPlacedStudents());
                batchStats.put("averagePackage", batch.getAveragePackage());
                batchStats.put("placementPercentage", batch.getPlacementPercentage());
                batchStats.put("topRecruiters", batch.getTopRecruiters());
            }
            
            Map<String, Object> response = new HashMap<>();
            response.put("alumni", alumniList);
            response.put("batchStats", batchStats);
            response.put("totalElements", alumniPage.getTotalElements());
            response.put("totalPages", alumniPage.getTotalPages());
            response.put("currentPage", page);
            response.put("graduationYear", graduationYear);
            response.put("branch", branch);
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                .body(Map.of("error", "Error fetching batch alumni: " + e.getMessage()));
        }
    }
    
    /**
     * Search alumni
     * GET /api/alumni/search?q=searchTerm
     */
    @GetMapping("/search")
    public ResponseEntity<?> searchAlumni(
            @RequestParam String q,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        
        try {
            Pageable pageable = PageRequest.of(page, size);
            Page<User> alumniPage = userRepository.findByTextSearch(q, pageable);
            
            List<Map<String, Object>> alumniList = alumniPage.getContent().stream()
                .map(this::transformUserToAlumniResponse)
                .collect(Collectors.toList());
            
            Map<String, Object> response = new HashMap<>();
            response.put("alumni", alumniList);
            response.put("totalElements", alumniPage.getTotalElements());
            response.put("searchQuery", q);
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                .body(Map.of("error", "Error searching alumni: " + e.getMessage()));
        }
    }
    
    /**
     * Get alumni by company
     * GET /api/alumni/company/TCS
     */
    @GetMapping("/company/{companyName}")
    public ResponseEntity<?> getAlumniByCompany(@PathVariable String companyName) {
        try {
            List<User> alumni = userRepository.findByProfessionalCurrentCompanyContainingIgnoreCase(companyName);
            
            List<Map<String, Object>> alumniList = alumni.stream()
                .map(this::transformUserToAlumniResponse)
                .collect(Collectors.toList());
            
            Map<String, Object> response = new HashMap<>();
            response.put("alumni", alumniList);
            response.put("company", companyName);
            response.put("count", alumni.size());
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                .body(Map.of("error", "Error fetching company alumni: " + e.getMessage()));
        }
    }
    
    /**
     * Get batch statistics
     * GET /api/alumni/stats/batch/2022/CSE
     */
    @GetMapping("/stats/batch/{graduationYear}/{branch}")
    public ResponseEntity<?> getBatchStats(@PathVariable Integer graduationYear, @PathVariable String branch) {
        try {
            long totalStudents = userRepository.countByBatch(graduationYear, branch);
            long placedStudents = userRepository.countPlacedAlumniByBatch(graduationYear, branch);
            
            // Get top companies for this batch
            List<User> batchAlumni = userRepository.findByBatchInfoGraduationYearAndBatchInfoBranch(graduationYear, branch);
            Map<String, Long> companyCount = batchAlumni.stream()
                .filter(user -> user.getProfessional() != null && user.getProfessional().getCurrentCompany() != null)
                .collect(Collectors.groupingBy(
                    user -> user.getProfessional().getCurrentCompany(),
                    Collectors.counting()
                ));
            
            List<String> topCompanies = companyCount.entrySet().stream()
                .sorted(Map.Entry.<String, Long>comparingByValue().reversed())
                .limit(5)
                .map(Map.Entry::getKey)
                .collect(Collectors.toList());
            
            Map<String, Object> stats = new HashMap<>();
            stats.put("totalStudents", totalStudents);
            stats.put("placedStudents", placedStudents);
            stats.put("placementPercentage", totalStudents > 0 ? (placedStudents * 100.0 / totalStudents) : 0);
            stats.put("topCompanies", topCompanies);
            stats.put("graduationYear", graduationYear);
            stats.put("branch", branch);
            
            return ResponseEntity.ok(stats);
            
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                .body(Map.of("error", "Error fetching batch stats: " + e.getMessage()));
        }
    }
    
    private Map<String, Object> transformUserToAlumniResponse(User user) {
        Map<String, Object> alumni = new HashMap<>();
        alumni.put("id", user.getId());
        alumni.put("name", user.getFullName());
        alumni.put("firstName", user.getFirstName());
        alumni.put("lastName", user.getLastName());
        alumni.put("email", user.getEmail());
        
        // Batch info
        if (user.getBatchInfo() != null) {
            alumni.put("rollNumber", user.getBatchInfo().getRollNumber());
            alumni.put("branch", user.getBatchInfo().getBranch());
            alumni.put("graduationYear", user.getBatchInfo().getGraduationYear());
            alumni.put("admissionYear", user.getBatchInfo().getAdmissionYear());
            alumni.put("cgpa", user.getBatchInfo().getCgpa());
            alumni.put("batchDisplay", user.getBatchDisplay());
        }
        
        // Professional info
        if (user.getProfessional() != null) {
            alumni.put("currentCompany", user.getProfessional().getCurrentCompany());
            alumni.put("designation", user.getProfessional().getDesignation());
            alumni.put("workLocation", user.getProfessional().getWorkLocation());
            alumni.put("experienceYears", user.getProfessional().getExperienceYears());
            alumni.put("currentSalary", user.getProfessional().getCurrentSalary());
            alumni.put("skills", user.getProfessional().getSkills());
        }
        
        // Contact info
        if (user.getContact() != null) {
            alumni.put("phone", user.getContact().getPhone());
            if (user.getContact().getAddress() != null) {
                alumni.put("location", user.getContact().getAddress().getCity());
            }
        }
        
        // Social links
        if (user.getSocialLinks() != null) {
            alumni.put("linkedin", user.getSocialLinks().getLinkedin());
            alumni.put("github", user.getSocialLinks().getGithub());
            alumni.put("portfolio", user.getSocialLinks().getPortfolio());
        }
        
        // Profile info
        if (user.getProfile() != null) {
            alumni.put("bio", user.getProfile().getBio());
            alumni.put("profileImage", user.getProfile().getProfileImage());
            alumni.put("achievements", user.getProfile().getAchievements());
        }
        
        alumni.put("status", user.getStatus());
        alumni.put("createdAt", user.getCreatedAt());
        
        return alumni;
    }
}
