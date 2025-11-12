package com.piemr.gradsync.controller;

import com.piemr.gradsync.dto.auth.AuthResponse;
import com.piemr.gradsync.dto.auth.LoginRequest;
import com.piemr.gradsync.dto.auth.RegisterRequest;
import com.piemr.gradsync.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = {"http://localhost:3000", "http://127.0.0.1:3000"})
public class AuthController {
    
    private final AuthService authService;
    
    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest request) {
        log.info("Registration attempt for email: {}", request.getEmail());
        
        AuthResponse response = authService.register(request);
        
        if (response.isSuccess()) {
            log.info("Registration successful for email: {}", request.getEmail());
            return ResponseEntity.ok(response);
        } else {
            log.warn("Registration failed for email: {} - {}", request.getEmail(), response.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        log.info("Login attempt for email: {}", request.getEmail());
        
        AuthResponse response = authService.login(request);
        
        if (response.isSuccess()) {
            log.info("Login successful for email: {}", request.getEmail());
            return ResponseEntity.ok(response);
        } else {
            log.warn("Login failed for email: {} - {}", request.getEmail(), response.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
    }
    
    @PostMapping("/refresh")
    public ResponseEntity<AuthResponse> refreshToken(@RequestBody Map<String, String> request) {
        String refreshToken = request.get("refreshToken");
        
        if (refreshToken == null || refreshToken.trim().isEmpty()) {
            return ResponseEntity.badRequest()
                .body(new AuthResponse("Refresh token is required", false));
        }
        
        log.info("Token refresh attempt");
        
        AuthResponse response = authService.refreshToken(refreshToken);
        
        if (response.isSuccess()) {
            log.info("Token refresh successful");
            return ResponseEntity.ok(response);
        } else {
            log.warn("Token refresh failed - {}", response.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
    }
    
    @PostMapping("/validate")
    public ResponseEntity<Map<String, Object>> validateToken(@RequestBody Map<String, String> request) {
        String token = request.get("token");
        
        if (token == null || token.trim().isEmpty()) {
            return ResponseEntity.badRequest()
                .body(Map.of("valid", false, "message", "Token is required"));
        }
        
        boolean isValid = authService.validateToken(token);
        
        if (isValid) {
            String email = authService.extractEmailFromToken(token);
            return ResponseEntity.ok(Map.of(
                "valid", true,
                "email", email,
                "message", "Token is valid"
            ));
        } else {
            return ResponseEntity.ok(Map.of(
                "valid", false,
                "message", "Token is invalid or expired"
            ));
        }
    }
    
    @PostMapping("/check-email")
    public ResponseEntity<Map<String, Object>> checkEmail(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        
        if (email == null || email.trim().isEmpty()) {
            return ResponseEntity.badRequest()
                .body(Map.of("exists", false, "message", "Email is required"));
        }
        
        boolean exists = authService.userExists(email);
        
        return ResponseEntity.ok(Map.of(
            "exists", exists,
            "message", exists ? "Email already registered" : "Email available"
        ));
    }
    
    @PostMapping("/check-roll-number")
    public ResponseEntity<Map<String, Object>> checkRollNumber(@RequestBody Map<String, String> request) {
        String rollNumber = request.get("rollNumber");
        
        if (rollNumber == null || rollNumber.trim().isEmpty()) {
            return ResponseEntity.badRequest()
                .body(Map.of("exists", false, "message", "Roll number is required"));
        }
        
        boolean exists = authService.rollNumberExists(rollNumber);
        
        return ResponseEntity.ok(Map.of(
            "exists", exists,
            "message", exists ? "Roll number already registered" : "Roll number available"
        ));
    }
    
    @PostMapping("/change-password")
    public ResponseEntity<Map<String, Object>> changePassword(
            @RequestBody Map<String, String> request,
            @RequestHeader("Authorization") String authHeader) {
        
        try {
            String token = authHeader.substring(7); // Remove "Bearer " prefix
            String email = authService.extractEmailFromToken(token);
            String oldPassword = request.get("oldPassword");
            String newPassword = request.get("newPassword");
            
            if (oldPassword == null || newPassword == null) {
                return ResponseEntity.badRequest()
                    .body(Map.of("success", false, "message", "Both old and new passwords are required"));
            }
            
            boolean success = authService.changePassword(email, oldPassword, newPassword);
            
            if (success) {
                return ResponseEntity.ok(Map.of(
                    "success", true,
                    "message", "Password changed successfully"
                ));
            } else {
                return ResponseEntity.badRequest().body(Map.of(
                    "success", false,
                    "message", "Current password is incorrect"
                ));
            }
            
        } catch (Exception e) {
            log.error("Password change failed", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of("success", false, "message", "Password change failed"));
        }
    }
    
    @GetMapping("/me")
    public ResponseEntity<Map<String, Object>> getCurrentUser(@RequestHeader("Authorization") String authHeader) {
        try {
            String token = authHeader.substring(7); // Remove "Bearer " prefix
            
            if (!authService.validateToken(token)) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("success", false, "message", "Invalid token"));
            }
            
            String email = authService.extractEmailFromToken(token);
            
            return ResponseEntity.ok(Map.of(
                "success", true,
                "email", email,
                "message", "User authenticated"
            ));
            
        } catch (Exception e) {
            log.error("Get current user failed", e);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(Map.of("success", false, "message", "Authentication failed"));
        }
    }
}
