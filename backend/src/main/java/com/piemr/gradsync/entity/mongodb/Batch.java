package com.piemr.gradsync.entity.mongodb;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.index.Indexed;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Max;

import java.time.LocalDateTime;
import java.util.List;

@Document(collection = "batches")
@CompoundIndex(def = "{'graduationYear': 1, 'branch': 1}", unique = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Batch {
    
    @Id
    private String id;
    
    @Min(value = 2008, message = "Admission year cannot be before 2008")
    @Max(value = 2030, message = "Admission year cannot be after 2030")
    private Integer admissionYear;
    
    @Min(value = 2012, message = "Graduation year cannot be before 2012")
    @Max(value = 2034, message = "Graduation year cannot be after 2034")
    @Indexed
    private Integer graduationYear;
    
    @NotBlank(message = "Branch is required")
    @Indexed
    private String branch; // CSE, IT, ECE, EEE, MECH, CIVIL, CHEMICAL, BIOTECH
    
    @Min(value = 0, message = "Total students cannot be negative")
    private Integer totalStudents;
    
    @Min(value = 0, message = "Placed students cannot be negative")
    private Integer placedStudents;
    
    @Min(value = 0, message = "Average package cannot be negative")
    private Double averagePackage;
    
    @Min(value = 0, message = "Highest package cannot be negative")
    private Double highestPackage;
    
    @Min(value = 0, message = "Placement percentage cannot be negative")
    @Max(value = 100, message = "Placement percentage cannot exceed 100")
    private Double placementPercentage;
    
    private List<String> topRecruiters;
    
    private String batchCoordinator; // Reference to User ID
    
    private List<String> achievements;
    
    @Indexed
    private Boolean isActive = true;
    
    // Statistics for the batch
    private BatchStatistics statistics;
    
    // Placement details
    private List<PlacementRecord> placementRecords;
    
    @CreatedDate
    private LocalDateTime createdAt;
    
    @LastModifiedDate
    private LocalDateTime updatedAt;
    
    // Nested Classes
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class BatchStatistics {
        private Integer maleStudents;
        private Integer femaleStudents;
        private Double averageCGPA;
        private Integer studentsInHigherStudies;
        private Integer entrepreneursCount;
        private List<CompanyWiseHiring> companyWiseHiring;
        
        @Data
        @NoArgsConstructor
        @AllArgsConstructor
        public static class CompanyWiseHiring {
            private String companyName;
            private Integer studentsHired;
            private Double averagePackage;
            private List<String> positions;
        }
    }
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class PlacementRecord {
        private String studentId; // Reference to User ID
        private String companyName;
        private String designation;
        private Double packageOffered;
        private LocalDateTime placementDate;
        private String placementType; // CAMPUS, OFF_CAMPUS, INTERNSHIP_CONVERSION
        private String location;
    }
    
    // Helper methods
    public String getBatchName() {
        return branch + " " + admissionYear + "-" + graduationYear;
    }
    
    public Double calculatePlacementPercentage() {
        if (totalStudents == null || totalStudents == 0) {
            return 0.0;
        }
        if (placedStudents == null) {
            return 0.0;
        }
        return (placedStudents.doubleValue() / totalStudents.doubleValue()) * 100;
    }
    
    public boolean isGraduated() {
        return graduationYear <= LocalDateTime.now().getYear();
    }
    
    public boolean isCurrentBatch() {
        int currentYear = LocalDateTime.now().getYear();
        return graduationYear > currentYear && graduationYear <= currentYear + 4;
    }
}
