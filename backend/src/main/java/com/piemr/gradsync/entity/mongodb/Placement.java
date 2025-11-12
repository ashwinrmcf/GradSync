package com.piemr.gradsync.entity.mongodb;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.index.Indexed;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Min;

import java.time.LocalDateTime;

@Document(collection = "placements")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Placement {
    
    @Id
    private String id;
    
    @NotBlank(message = "Student ID is required")
    @Indexed
    private String studentId; // Reference to User ID
    
    @NotBlank(message = "Company ID is required")
    @Indexed
    private String companyId; // Reference to Company ID
    
    @NotBlank(message = "Designation is required")
    private String designation;
    
    @Min(value = 0, message = "Package cannot be negative")
    private Double packageAmount;
    
    @Indexed
    private LocalDateTime placementDate;
    
    private LocalDateTime joiningDate;
    
    private String location;
    
    private PlacementType placementType;
    
    @Indexed
    private PlacementStatus status;
    
    private String notes;
    
    // Additional placement details
    private PlacementDetails details;
    
    @CreatedDate
    private LocalDateTime createdAt;
    
    @LastModifiedDate
    private LocalDateTime updatedAt;
    
    // Enums
    public enum PlacementType {
        CAMPUS, OFF_CAMPUS, INTERNSHIP_CONVERSION, REFERRAL, POOL_CAMPUS
    }
    
    public enum PlacementStatus {
        OFFERED, JOINED, DECLINED, TERMINATED, ON_HOLD
    }
    
    // Nested Class
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class PlacementDetails {
        private String jobRole;
        private String department;
        private String workMode; // REMOTE, HYBRID, ON_SITE
        private Integer probationPeriod; // in months
        private String bondPeriod; // e.g., "2 years"
        private Double variableComponent; // Variable pay component
        private String benefits; // Other benefits like insurance, etc.
        private String reportingManager;
        private String hrContact;
        private String offerLetterPath; // Path to offer letter document
    }
    
    // Helper methods
    public boolean isActive() {
        return status == PlacementStatus.JOINED || status == PlacementStatus.OFFERED;
    }
    
    public boolean isSuccessful() {
        return status == PlacementStatus.JOINED;
    }
    
    public String getPackageDisplay() {
        if (packageAmount == null) {
            return "Not specified";
        }
        return String.format("%.2f LPA", packageAmount);
    }
    
    public Integer getPlacementYear() {
        if (placementDate == null) {
            return null;
        }
        return placementDate.getYear();
    }
}
