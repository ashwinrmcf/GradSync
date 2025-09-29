package com.piemr.gradsync.dto.user;

import com.piemr.gradsync.entity.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserResponse {
    
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String batchYear;
    private String branch;
    private String rollNumber;
    private String currentCompany;
    private String position;
    private String location;
    private String profileImageUrl;
    private String linkedinUrl;
    private String portfolioUrl;
    private String bio;
    private String skills;
    private User.Role role;
    private Boolean isVerified;
    private Boolean isActive;
    private Boolean emailVerified;
    private String phoneNumber;
    private Integer experienceYears;
    private LocalDateTime graduationDate;
    private LocalDateTime createdAt;
    private LocalDateTime lastLogin;
    
    // Constructor from User entity
    public UserResponse(User user) {
        this.id = user.getId();
        this.firstName = user.getFirstName();
        this.lastName = user.getLastName();
        this.email = user.getEmail();
        this.batchYear = user.getBatchYear();
        this.branch = user.getBranch();
        this.rollNumber = user.getRollNumber();
        this.currentCompany = user.getCurrentCompany();
        this.position = user.getPosition();
        this.location = user.getLocation();
        this.profileImageUrl = user.getProfileImageUrl();
        this.linkedinUrl = user.getLinkedinUrl();
        this.portfolioUrl = user.getPortfolioUrl();
        this.bio = user.getBio();
        this.skills = user.getSkills();
        this.role = user.getRole();
        this.isVerified = user.getIsVerified();
        this.isActive = user.getIsActive();
        this.emailVerified = user.getEmailVerified();
        this.phoneNumber = user.getPhoneNumber();
        this.experienceYears = user.getExperienceYears();
        this.graduationDate = user.getGraduationDate();
        this.createdAt = user.getCreatedAt();
        this.lastLogin = user.getLastLogin();
    }
    
    // Helper methods
    public String getFullName() {
        return firstName + " " + lastName;
    }
    
    public boolean isAlumni() {
        return role == User.Role.ALUMNI;
    }
    
    public boolean isStudent() {
        return role == User.Role.STUDENT;
    }
}
