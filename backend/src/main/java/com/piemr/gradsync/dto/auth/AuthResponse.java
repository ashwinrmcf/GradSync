package com.piemr.gradsync.dto.auth;

import com.piemr.gradsync.dto.user.UserResponse;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AuthResponse {
    
    private String accessToken;
    private String refreshToken;
    private String tokenType = "Bearer";
    private Long expiresIn; // in seconds
    private UserResponse user;
    private String message;
    private boolean success;
    
    // Constructor for successful authentication
    public AuthResponse(String accessToken, String refreshToken, Long expiresIn, UserResponse user) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        this.expiresIn = expiresIn;
        this.user = user;
        this.success = true;
        this.message = "Authentication successful";
    }
    
    // Constructor for error response
    public AuthResponse(String message, boolean success) {
        this.message = message;
        this.success = success;
    }
}
