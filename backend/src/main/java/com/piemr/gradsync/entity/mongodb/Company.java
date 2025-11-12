package com.piemr.gradsync.entity.mongodb;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.index.TextIndexed;

import jakarta.validation.constraints.NotBlank;

import java.time.LocalDateTime;
import java.util.List;

@Document(collection = "companies")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Company {
    
    @Id
    private String id;
    
    @NotBlank(message = "Company name is required")
    @Indexed(unique = true)
    @TextIndexed
    private String name;
    
    @NotBlank(message = "Industry is required")
    @Indexed
    private String industry;
    
    private String website;
    private String logo;
    private String description;
    private String location;
    
    private CompanySize size; // STARTUP, SMALL, MEDIUM, LARGE, ENTERPRISE
    
    private List<HiringHistory> hiringHistory;
    
    private CompanyDetails details;
    
    @Indexed
    private Boolean isActive = true;
    
    @CreatedDate
    private LocalDateTime createdAt;
    
    @LastModifiedDate
    private LocalDateTime updatedAt;
    
    // Enums
    public enum CompanySize {
        STARTUP, SMALL, MEDIUM, LARGE, ENTERPRISE
    }
    
    // Nested Classes
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class HiringHistory {
        private Integer year;
        private Integer studentsHired;
        private Double averagePackage;
        private Double highestPackage;
        private List<String> positions;
        private List<String> branches; // Which branches they hired from
    }
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CompanyDetails {
        private String foundedYear;
        private String headquarters;
        private String ceo;
        private Integer employeeCount;
        private Double revenue;
        private List<String> technologies;
        private List<String> services;
        private String companyType; // PRODUCT, SERVICE, CONSULTING, STARTUP
    }
    
    // Helper methods
    public Integer getTotalStudentsHired() {
        if (hiringHistory == null) {
            return 0;
        }
        return hiringHistory.stream()
                .mapToInt(history -> history.studentsHired != null ? history.studentsHired : 0)
                .sum();
    }
    
    public Double getAveragePackageOffered() {
        if (hiringHistory == null || hiringHistory.isEmpty()) {
            return 0.0;
        }
        return hiringHistory.stream()
                .filter(history -> history.averagePackage != null)
                .mapToDouble(history -> history.averagePackage)
                .average()
                .orElse(0.0);
    }
    
    public boolean isTopRecruiter() {
        return getTotalStudentsHired() >= 10; // Companies that hired 10+ students
    }
}
