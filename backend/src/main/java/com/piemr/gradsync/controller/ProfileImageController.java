package com.piemr.gradsync.controller;

import com.piemr.gradsync.service.ProfileImageService;
import com.piemr.gradsync.service.UserDetailsServiceImpl;
import com.piemr.gradsync.entity.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/profile-images")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = {"http://localhost:3000", "http://127.0.0.1:3000"})
public class ProfileImageController {
    
    private final ProfileImageService profileImageService;
    
    /**
     * Upload profile image for current user
     */
    @PostMapping("/upload")
    public ResponseEntity<Map<String, Object>> uploadProfileImage(
            @RequestParam("file") org.springframework.web.multipart.MultipartFile file) {
        
        try {
            // Get current user from authentication
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            UserDetailsServiceImpl.CustomUserPrincipal userPrincipal = 
                (UserDetailsServiceImpl.CustomUserPrincipal) authentication.getPrincipal();
            User currentUser = userPrincipal.getUser();
            
            log.info("Uploading profile image for user: {} ({})", currentUser.getEmail(), currentUser.getId());
            
            if (file.isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of(
                    "success", false,
                    "message", "Please select a file to upload"
                ));
            }
            
            // Validate file type
            String contentType = file.getContentType();
            if (contentType == null || !contentType.startsWith("image/")) {
                return ResponseEntity.badRequest().body(Map.of(
                    "success", false,
                    "message", "Please upload a valid image file"
                ));
            }
            
            // Upload and get URL - use the JPA user ID as string
            String imageUrl = profileImageService.uploadUserProfileImage(currentUser.getId().toString(), file);
            
            if (imageUrl != null) {
                return ResponseEntity.ok(Map.of(
                    "success", true,
                    "imageUrl", imageUrl,
                    "message", "Profile image uploaded successfully"
                ));
            } else {
                return ResponseEntity.badRequest().body(Map.of(
                    "success", false,
                    "message", "Failed to upload profile image"
                ));
            }
            
        } catch (Exception e) {
            log.error("Error uploading profile image: {}", e.getMessage());
            return ResponseEntity.internalServerError().body(Map.of(
                "success", false,
                "message", "Error uploading profile image: " + e.getMessage()
            ));
        }
    }
    
    /**
     * Process and upload all profile images from Assets folder (Admin only)
     */
    @PostMapping("/admin/process-all")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Map<String, Object>> processAllProfileImages() {
        log.info("Processing all profile images from Assets folder");
        
        try {
            Map<String, Object> result = profileImageService.processProfileImages();
            
            if ((Boolean) result.get("success")) {
                log.info("Successfully processed profile images: {}", result.get("message"));
                return ResponseEntity.ok(result);
            } else {
                log.error("Failed to process profile images: {}", result.get("message"));
                return ResponseEntity.badRequest().body(result);
            }
            
        } catch (Exception e) {
            log.error("Error processing profile images: {}", e.getMessage());
            return ResponseEntity.internalServerError().body(Map.of(
                "success", false,
                "message", "Internal server error: " + e.getMessage()
            ));
        }
    }
    
    /**
     * Get profile image URL for a specific user
     */
    @GetMapping("/user/{userId}")
    public ResponseEntity<Map<String, Object>> getUserProfileImage(@PathVariable String userId) {
        try {
            String imageUrl = profileImageService.getProfileImageUrl(userId);
            
            if (imageUrl != null) {
                return ResponseEntity.ok(Map.of(
                    "success", true,
                    "imageUrl", imageUrl
                ));
            } else {
                return ResponseEntity.ok(Map.of(
                    "success", false,
                    "message", "No profile image found for user"
                ));
            }
            
        } catch (Exception e) {
            log.error("Error getting profile image for user {}: {}", userId, e.getMessage());
            return ResponseEntity.internalServerError().body(Map.of(
                "success", false,
                "message", "Error retrieving profile image: " + e.getMessage()
            ));
        }
    }
    
    /**
     * Update profile image URL for a specific user (Admin only)
     */
    @PutMapping("/admin/user/{userId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Map<String, Object>> updateUserProfileImage(
            @PathVariable String userId,
            @RequestBody Map<String, String> request) {
        
        try {
            String imageUrl = request.get("imageUrl");
            
            if (imageUrl == null || imageUrl.trim().isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of(
                    "success", false,
                    "message", "Image URL is required"
                ));
            }
            
            boolean updated = profileImageService.updateProfileImage(userId, imageUrl);
            
            if (updated) {
                return ResponseEntity.ok(Map.of(
                    "success", true,
                    "message", "Profile image updated successfully"
                ));
            } else {
                return ResponseEntity.badRequest().body(Map.of(
                    "success", false,
                    "message", "Failed to update profile image"
                ));
            }
            
        } catch (Exception e) {
            log.error("Error updating profile image for user {}: {}", userId, e.getMessage());
            return ResponseEntity.internalServerError().body(Map.of(
                "success", false,
                "message", "Error updating profile image: " + e.getMessage()
            ));
        }
    }
}
