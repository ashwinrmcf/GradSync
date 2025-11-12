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
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Max;

import java.time.LocalDateTime;
import java.util.List;

@Document(collection = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
    
    @Id
    private String id;
    
    // Basic Information
    @Email(message = "Please provide a valid email address")
    @NotBlank(message = "Email is required")
    @Indexed(unique = true)
    private String email;
    
    @NotBlank(message = "Password is required")
    @Size(min = 6, message = "Password must be at least 6 characters")
    private String password;
    
    @NotBlank(message = "First name is required")
    @Size(min = 2, max = 50, message = "First name must be between 2 and 50 characters")
    @TextIndexed
    private String firstName;
    
    @NotBlank(message = "Last name is required")
    @Size(min = 2, max = 50, message = "Last name must be between 2 and 50 characters")
    @TextIndexed
    private String lastName;
    
    @Size(max = 50, message = "Middle name cannot exceed 50 characters")
    private String middleName;
    
    // Role and Status
    private Role role = Role.ALUMNI;
    private Status status = Status.PENDING_VERIFICATION;
    
    // Academic Information
    private BatchInfo batchInfo;
    
    // Contact Information
    private ContactInfo contact;
    
    // Professional Information
    private ProfessionalInfo professional;
    
    // Social Links
    private SocialLinks socialLinks;
    
    // Profile Information
    private ProfileInfo profile;
    
    // Verification and Security
    private VerificationInfo verification;
    
    @CreatedDate
    private LocalDateTime createdAt;
    
    @LastModifiedDate
    private LocalDateTime updatedAt;
    
    private LocalDateTime lastLogin;
    
    // Enums
    public enum Role {
        ALUMNI, STUDENT, FACULTY, ADMIN
    }
    
    public enum Status {
        ACTIVE, INACTIVE, PENDING_VERIFICATION, SUSPENDED
    }
    
    // Nested Classes for Complex Fields
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class BatchInfo {
        @Min(value = 2008, message = "Admission year cannot be before 2008")
        @Max(value = 2030, message = "Admission year cannot be after 2030")
        private Integer admissionYear;
        
        @Min(value = 2012, message = "Graduation year cannot be before 2012")
        @Max(value = 2034, message = "Graduation year cannot be after 2034")
        private Integer graduationYear;
        
        @NotBlank(message = "Branch is required")
        private String branch; // CSE, IT, ECE, EEE, MECH, CIVIL, CHEMICAL, BIOTECH
        
        @NotBlank(message = "Roll number is required")
        @Indexed(unique = true)
        private String rollNumber;
        
        @Min(value = 0, message = "CGPA cannot be negative")
        @Max(value = 10, message = "CGPA cannot exceed 10")
        private Double cgpa;
        
        private String division; // FIRST, SECOND, THIRD, PASS
    }
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ContactInfo {
        private String phone;
        private String alternatePhone;
        private Address address;
        
        @Data
        @NoArgsConstructor
        @AllArgsConstructor
        public static class Address {
            private String street;
            private String city;
            private String state;
            private String country = "India";
            private String pincode;
        }
    }
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ProfessionalInfo {
        @TextIndexed
        private String currentCompany;
        
        @TextIndexed
        private String designation;
        
        private String workLocation;
        
        @Min(value = 0, message = "Experience years cannot be negative")
        private Integer experienceYears;
        
        private Double currentSalary;
        private String workType; // FULL_TIME, PART_TIME, FREELANCE, INTERN, UNEMPLOYED, ENTREPRENEUR
        private String industry;
        private List<String> skills;
        private List<WorkHistory> workHistory;
        
        @Data
        @NoArgsConstructor
        @AllArgsConstructor
        public static class WorkHistory {
            private String company;
            private String designation;
            private LocalDateTime startDate;
            private LocalDateTime endDate;
            private String location;
            private String description;
            private Double salary;
        }
    }
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class SocialLinks {
        private String linkedin;
        private String github;
        private String portfolio;
        private String twitter;
        private String instagram;
    }
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ProfileInfo {
        @Size(max = 1000, message = "Bio cannot exceed 1000 characters")
        private String bio;
        
        private String profileImage;
        private String coverImage;
        private List<String> achievements;
        private List<String> interests;
    }
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class VerificationInfo {
        private Boolean emailVerified = false;
        private Boolean phoneVerified = false;
        private Boolean profileVerified = false;
        private String verificationToken;
        private String resetPasswordToken;
        private LocalDateTime resetPasswordExpires;
    }
    
    // Helper methods
    public String getFullName() {
        return firstName + " " + lastName;
    }
    
    public String getBatchDisplay() {
        if (batchInfo != null) {
            return batchInfo.admissionYear + "-" + batchInfo.graduationYear;
        }
        return "";
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
    
    // Password encoding method
    public void encodePassword() {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        this.password = encoder.encode(this.password);
    }
    
    // Password verification method
    public boolean checkPassword(String rawPassword) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        return encoder.matches(rawPassword, this.password);
    }
}
