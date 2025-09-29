package com.piemr.gradsync.dto.auth;

import com.piemr.gradsync.entity.User;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RegisterRequest {
    
    @NotBlank(message = "First name is required")
    @Size(min = 2, max = 50, message = "First name must be between 2 and 50 characters")
    private String firstName;
    
    @NotBlank(message = "Last name is required")
    @Size(min = 2, max = 50, message = "Last name must be between 2 and 50 characters")
    private String lastName;
    
    @Email(message = "Please provide a valid email address")
    @NotBlank(message = "Email is required")
    private String email;
    
    @NotBlank(message = "Password is required")
    @Size(min = 6, message = "Password must be at least 6 characters")
    private String password;
    
    @NotBlank(message = "Batch year is required")
    private String batchYear;
    
    @NotBlank(message = "Branch is required")
    private String branch;
    
    @NotBlank(message = "Roll number is required")
    private String rollNumber;
    
    // Optional fields
    private String currentCompany;
    private String position;
    private String location;
    private String phoneNumber;
    private String linkedinUrl;
    private String portfolioUrl;
    private String bio;
    
    // Default role is ALUMNI, can be overridden
    private User.Role role = User.Role.ALUMNI;
    
    // Terms and conditions
    private boolean agreeToTerms = false;
    private boolean allowNetworking = true;
}
