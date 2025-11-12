package com.piemr.gradsync.controller;

import com.piemr.gradsync.entity.mongodb.Batch;
import com.piemr.gradsync.entity.mongodb.User;
import com.piemr.gradsync.repository.mongodb.BatchMongoRepository;
import com.piemr.gradsync.repository.mongodb.UserMongoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/batches")
@CrossOrigin(origins = "*", maxAge = 3600)
public class BatchController {
    
    @Autowired
    private BatchMongoRepository batchRepository;
    
    @Autowired
    private UserMongoRepository userRepository;
    
    /**
     * Get all batches
     * GET /api/batches
     */
    @GetMapping
    public ResponseEntity<?> getAllBatches() {
        try {
            List<Batch> batches = batchRepository.findAll(Sort.by("graduationYear").descending());
            
            List<Map<String, Object>> batchList = batches.stream()
                .map(this::transformBatchToResponse)
                .collect(Collectors.toList());
            
            return ResponseEntity.ok(Map.of("batches", batchList));
            
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                .body(Map.of("error", "Error fetching batches: " + e.getMessage()));
        }
    }
    
    /**
     * Get specific batch details
     * GET /api/batches/2022/CSE
     */
    @GetMapping("/{graduationYear}/{branch}")
    public ResponseEntity<?> getBatchDetails(@PathVariable Integer graduationYear, @PathVariable String branch) {
        try {
            Optional<Batch> batchOpt = batchRepository.findByGraduationYearAndBranch(graduationYear, branch);
            
            if (batchOpt.isEmpty()) {
                return ResponseEntity.notFound().build();
            }
            
            Batch batch = batchOpt.get();
            Map<String, Object> response = transformBatchToResponse(batch);
            
            // Add student list
            List<User> students = userRepository.findByBatchInfoGraduationYearAndBatchInfoBranch(graduationYear, branch);
            List<Map<String, Object>> studentList = students.stream()
                .map(this::transformUserToStudentResponse)
                .collect(Collectors.toList());
            
            response.put("students", studentList);
            response.put("studentCount", students.size());
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                .body(Map.of("error", "Error fetching batch details: " + e.getMessage()));
        }
    }
    
    /**
     * Get batch statistics for dashboard
     * GET /api/batches/stats
     */
    @GetMapping("/stats")
    public ResponseEntity<?> getBatchStats() {
        try {
            List<Batch> allBatches = batchRepository.findAll();
            
            int totalBatches = allBatches.size();
            int totalStudents = allBatches.stream().mapToInt(b -> b.getTotalStudents() != null ? b.getTotalStudents() : 0).sum();
            int totalPlaced = allBatches.stream().mapToInt(b -> b.getPlacedStudents() != null ? b.getPlacedStudents() : 0).sum();
            double avgPlacementRate = totalStudents > 0 ? (totalPlaced * 100.0 / totalStudents) : 0;
            
            // Recent batches (last 3 years)
            List<Batch> recentBatches = batchRepository.findByGraduationYearRange(2020, 2024);
            
            Map<String, Object> stats = new HashMap<>();
            stats.put("totalBatches", totalBatches);
            stats.put("totalStudents", totalStudents);
            stats.put("totalPlaced", totalPlaced);
            stats.put("averagePlacementRate", Math.round(avgPlacementRate * 100.0) / 100.0);
            stats.put("recentBatches", recentBatches.stream()
                .map(this::transformBatchToResponse)
                .collect(Collectors.toList()));
            
            return ResponseEntity.ok(stats);
            
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                .body(Map.of("error", "Error fetching batch statistics: " + e.getMessage()));
        }
    }
    
    /**
     * Get placement trends
     * GET /api/batches/trends
     */
    @GetMapping("/trends")
    public ResponseEntity<?> getPlacementTrends() {
        try {
            List<Batch> batches = batchRepository.findAll(Sort.by("graduationYear").ascending());
            
            List<Map<String, Object>> trends = batches.stream()
                .map(batch -> {
                    Map<String, Object> trend = new HashMap<>();
                    trend.put("year", batch.getGraduationYear());
                    trend.put("branch", batch.getBranch());
                    trend.put("totalStudents", batch.getTotalStudents());
                    trend.put("placedStudents", batch.getPlacedStudents());
                    trend.put("placementPercentage", batch.getPlacementPercentage());
                    trend.put("averagePackage", batch.getAveragePackage());
                    return trend;
                })
                .collect(Collectors.toList());
            
            return ResponseEntity.ok(Map.of("trends", trends));
            
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                .body(Map.of("error", "Error fetching placement trends: " + e.getMessage()));
        }
    }
    
    private Map<String, Object> transformBatchToResponse(Batch batch) {
        Map<String, Object> response = new HashMap<>();
        response.put("id", batch.getId());
        response.put("graduationYear", batch.getGraduationYear());
        response.put("admissionYear", batch.getAdmissionYear());
        response.put("branch", batch.getBranch());
        response.put("batchName", batch.getBatchName());
        response.put("totalStudents", batch.getTotalStudents());
        response.put("placedStudents", batch.getPlacedStudents());
        response.put("averagePackage", batch.getAveragePackage());
        response.put("highestPackage", batch.getHighestPackage());
        response.put("placementPercentage", batch.getPlacementPercentage());
        response.put("topRecruiters", batch.getTopRecruiters());
        response.put("achievements", batch.getAchievements());
        response.put("isActive", batch.getIsActive());
        response.put("isGraduated", batch.isGraduated());
        response.put("isCurrentBatch", batch.isCurrentBatch());
        response.put("statistics", batch.getStatistics());
        response.put("createdAt", batch.getCreatedAt());
        response.put("updatedAt", batch.getUpdatedAt());
        
        return response;
    }
    
    private Map<String, Object> transformUserToStudentResponse(User user) {
        Map<String, Object> student = new HashMap<>();
        student.put("id", user.getId());
        student.put("name", user.getFullName());
        student.put("rollNumber", user.getBatchInfo() != null ? user.getBatchInfo().getRollNumber() : null);
        student.put("email", user.getEmail());
        student.put("cgpa", user.getBatchInfo() != null ? user.getBatchInfo().getCgpa() : null);
        
        // Professional info
        if (user.getProfessional() != null) {
            student.put("company", user.getProfessional().getCurrentCompany());
            student.put("designation", user.getProfessional().getDesignation());
            student.put("salary", user.getProfessional().getCurrentSalary());
            student.put("appointmentInfo", user.getProfessional().getSkills());
        }
        
        student.put("isPlaced", user.getProfessional() != null && user.getProfessional().getCurrentCompany() != null);
        
        return student;
    }
}
