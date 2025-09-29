package com.piemr.gradsync.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
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
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class User {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank(message = "First name is required")
    @Size(min = 2, max = 50, message = "First name must be between 2 and 50 characters")
    @Column(name = "first_name", nullable = false)
    private String firstName;
    
    @NotBlank(message = "Last name is required")
    @Size(min = 2, max = 50, message = "Last name must be between 2 and 50 characters")
    @Column(name = "last_name", nullable = false)
    private String lastName;
    
    @Email(message = "Please provide a valid email address")
    @NotBlank(message = "Email is required")
    @Column(unique = true, nullable = false)
    private String email;
    
    @NotBlank(message = "Password is required")
    @Size(min = 6, message = "Password must be at least 6 characters")
    @Column(nullable = false)
    private String password;
    
    @NotBlank(message = "Batch year is required")
    @Column(name = "batch_year", nullable = false)
    private String batchYear;
    
    @NotBlank(message = "Branch is required")
    @Column(nullable = false)
    private String branch;
    
    @NotBlank(message = "Roll number is required")
    @Column(name = "roll_number", unique = true, nullable = false)
    private String rollNumber;
    
    @Column(name = "current_company")
    private String currentCompany;
    
    @Column(name = "position")
    private String position;
    
    @Column(name = "location")
    private String location;
    
    @Column(name = "profile_image_url")
    private String profileImageUrl;
    
    @Column(name = "linkedin_url")
    private String linkedinUrl;
    
    @Column(name = "portfolio_url")
    private String portfolioUrl;
    
    @Column(columnDefinition = "TEXT")
    private String bio;
    
    @Column(name = "skills", columnDefinition = "TEXT")
    private String skills; // JSON string of skills array
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role = Role.ALUMNI;
    
    @Column(name = "is_verified", nullable = false)
    private Boolean isVerified = false;
    
    @Column(name = "is_active", nullable = false)
    private Boolean isActive = true;
    
    @Column(name = "email_verified", nullable = false)
    private Boolean emailVerified = false;
    
    @Column(name = "phone_number")
    private String phoneNumber;
    
    @Column(name = "experience_years")
    private Integer experienceYears;
    
    @Column(name = "graduation_date")
    private LocalDateTime graduationDate;
    
    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
    
    @LastModifiedDate
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    @Column(name = "last_login")
    private LocalDateTime lastLogin;
    
    // Relationships
    @OneToMany(mappedBy = "postedBy", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<JobPosting> jobPostings = new HashSet<>();
    
    @OneToMany(mappedBy = "applicant", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<JobApplication> jobApplications = new HashSet<>();
    
    @OneToMany(mappedBy = "organizer", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<Event> organizedEvents = new HashSet<>();
    
    // Enums
    public enum Role {
        ALUMNI, STUDENT, ADMIN, FACULTY
    }
    
    // Helper methods
    public String getFullName() {
        return firstName + " " + lastName;
    }
    
    public boolean isAlumni() {
        return role == Role.ALUMNI;
    }
    
    public boolean isStudent() {
        return role == Role.STUDENT;
    }
    
    public boolean isAdmin() {
        return role == Role.ADMIN;
    }
}
