package com.piemr.gradsync.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "job_postings")
@Data
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class JobPosting {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank(message = "Job title is required")
    @Column(nullable = false)
    private String title;
    
    @NotBlank(message = "Company name is required")
    @Column(nullable = false)
    private String company;
    
    @Column(name = "company_logo_url")
    private String companyLogoUrl;
    
    @NotBlank(message = "Location is required")
    @Column(nullable = false)
    private String location;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "job_type", nullable = false)
    private JobType jobType;
    
    @NotBlank(message = "Experience level is required")
    @Column(name = "experience_level", nullable = false)
    private String experienceLevel;
    
    @Column(name = "salary_range")
    private String salaryRange;
    
    @Column(columnDefinition = "TEXT", nullable = false)
    private String description;
    
    @Column(columnDefinition = "TEXT")
    private String requirements; // JSON string of requirements array
    
    @Column(columnDefinition = "TEXT")
    private String benefits; // JSON string of benefits array
    
    @Column(columnDefinition = "TEXT")
    private String skills; // JSON string of required skills
    
    @Column(name = "application_deadline")
    private LocalDateTime applicationDeadline;
    
    @Column(name = "is_urgent", nullable = false)
    private Boolean isUrgent = false;
    
    @Column(name = "is_active", nullable = false)
    private Boolean isActive = true;
    
    @Column(name = "application_url")
    private String applicationUrl;
    
    @Column(name = "application_email")
    private String applicationEmail;
    
    @Column(name = "application_instructions", columnDefinition = "TEXT")
    private String applicationInstructions;
    
    @Column(name = "views_count", nullable = false)
    private Integer viewsCount = 0;
    
    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
    
    @LastModifiedDate
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    // Relationships
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "posted_by", nullable = false)
    private User postedBy;
    
    @OneToMany(mappedBy = "jobPosting", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<JobApplication> applications = new HashSet<>();
    
    // Enums
    public enum JobType {
        FULL_TIME("Full Time"),
        PART_TIME("Part Time"),
        INTERNSHIP("Internship"),
        CONTRACT("Contract"),
        FREELANCE("Freelance");
        
        private final String displayName;
        
        JobType(String displayName) {
            this.displayName = displayName;
        }
        
        public String getDisplayName() {
            return displayName;
        }
    }
    
    // Helper methods
    public int getApplicationCount() {
        return applications != null ? applications.size() : 0;
    }
    
    public boolean isExpired() {
        return applicationDeadline != null && applicationDeadline.isBefore(LocalDateTime.now());
    }
    
    public long getDaysUntilDeadline() {
        if (applicationDeadline == null) return -1;
        return java.time.temporal.ChronoUnit.DAYS.between(LocalDateTime.now(), applicationDeadline);
    }
}
