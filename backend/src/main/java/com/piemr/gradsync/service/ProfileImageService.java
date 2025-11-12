package com.piemr.gradsync.service;

import com.piemr.gradsync.entity.mongodb.User;
import com.piemr.gradsync.repository.mongodb.UserMongoRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.*;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class ProfileImageService {
    
    private final UserMongoRepository userMongoRepository;
    
    // Base path for storing profile images
    private static final String PROFILE_IMAGES_PATH = "src/main/resources/static/images/profiles/";
    private static final String BASE_URL = "http://localhost:8080/images/profiles/";
    
    /**
     * Process and upload profile images from the Assets folder
     */
    public Map<String, Object> processProfileImages() {
        Map<String, Object> result = new HashMap<>();
        List<String> processedImages = new ArrayList<>();
        List<String> errors = new ArrayList<>();
        
        try {
            // Create profiles directory if it doesn't exist
            Path profilesDir = Paths.get(PROFILE_IMAGES_PATH);
            if (!Files.exists(profilesDir)) {
                Files.createDirectories(profilesDir);
            }
            
            // Source directory with profile images
            String sourceDir = "D:/GradSync/Assets/PIEMR(2018-22) Alumni/";
            File sourceFolder = new File(sourceDir);
            
            if (!sourceFolder.exists()) {
                throw new IOException("Source directory not found: " + sourceDir);
            }
            
            File[] imageFiles = sourceFolder.listFiles((dir, name) -> 
                name.toLowerCase().endsWith(".jpg") || 
                name.toLowerCase().endsWith(".jpeg") || 
                name.toLowerCase().endsWith(".png")
            );
            
            if (imageFiles == null || imageFiles.length == 0) {
                throw new IOException("No image files found in source directory");
            }
            
            log.info("Found {} image files to process", imageFiles.length);
            
            // Process each image file
            for (File imageFile : imageFiles) {
                try {
                    String fileName = imageFile.getName();
                    String studentName = extractStudentName(fileName);
                    
                    log.info("Processing image: {} for student: {}", fileName, studentName);
                    
                    // Find the user in MongoDB
                    Optional<User> userOpt = findUserByName(studentName);
                    
                    if (userOpt.isPresent()) {
                        User user = userOpt.get();
                        
                        // Copy image to profiles directory
                        String newFileName = user.getId() + "_" + sanitizeFileName(fileName);
                        Path targetPath = profilesDir.resolve(newFileName);
                        Files.copy(imageFile.toPath(), targetPath, StandardCopyOption.REPLACE_EXISTING);
                        
                        // Update user's profile image URL
                        String imageUrl = BASE_URL + newFileName;
                        
                        // Initialize profile if null
                        if (user.getProfile() == null) {
                            user.setProfile(new User.ProfileInfo());
                        }
                        
                        user.getProfile().setProfileImage(imageUrl);
                        userMongoRepository.save(user);
                        
                        processedImages.add(studentName + " -> " + imageUrl);
                        log.info("Updated profile image for {}: {}", studentName, imageUrl);
                        
                    } else {
                        errors.add("User not found for image: " + fileName + " (extracted name: " + studentName + ")");
                        log.warn("User not found for image: {} (extracted name: {})", fileName, studentName);
                    }
                    
                } catch (Exception e) {
                    errors.add("Error processing " + imageFile.getName() + ": " + e.getMessage());
                    log.error("Error processing image {}: {}", imageFile.getName(), e.getMessage());
                }
            }
            
            result.put("success", true);
            result.put("processedCount", processedImages.size());
            result.put("errorCount", errors.size());
            result.put("processedImages", processedImages);
            result.put("errors", errors);
            result.put("message", String.format("Successfully processed %d profile images", processedImages.size()));
            
        } catch (Exception e) {
            log.error("Error in processProfileImages: {}", e.getMessage());
            result.put("success", false);
            result.put("message", "Error processing profile images: " + e.getMessage());
            result.put("errors", Arrays.asList(e.getMessage()));
        }
        
        return result;
    }
    
    /**
     * Extract student name from filename
     */
    private String extractStudentName(String fileName) {
        // Remove file extension
        String nameWithoutExt = fileName.replaceAll("\\.(jpg|jpeg|png)$", "");
        
        // Handle different naming patterns
        if (nameWithoutExt.contains("_")) {
            // Format: "AbhinaySharma_SynapsesXTL.jpeg"
            nameWithoutExt = nameWithoutExt.split("_")[0];
        }
        
        // Convert camelCase to separate words
        String result = nameWithoutExt.replaceAll("([a-z])([A-Z])", "$1 $2");
        
        // Handle special cases
        result = result.replace("anishshrivastava", "Anish Shrivastva");
        result = result.replace("ashishbercha", "Ashish Bercha");
        result = result.replace("chetan solanki", "Chetan Solanki");
        result = result.replace("eklavyamalviya", "Eklavya Malviya");
        result = result.replace("ishikabangar", "Ishika Bangar");
        result = result.replace("kuldeep", "Kuldeep");
        result = result.replace("mainkarajput", "Mainka Rajput");
        result = result.replace("meet chauhan", "Meet Singh Chouhan");
        result = result.replace("nandinisharma", "Nandini Sharma");
        result = result.replace("piyushjain", "Piyush Jain");
        result = result.replace("pradyum dharva", "Pradyum Dharwa");
        result = result.replace("sagarsankhere", "Sagar Sankhere");
        result = result.replace("sakshikothari", "Sakshi Kothari");
        result = result.replace("vivekchoudhary", "Vivek Choudhary");
        result = result.replace("wassaif khan", "Wassaif Khan");
        
        return result.trim();
    }
    
    /**
     * Find user by name (flexible matching)
     */
    private Optional<User> findUserByName(String extractedName) {
        // Try exact match first
        List<User> users = userMongoRepository.findAll();
        
        for (User user : users) {
            String fullName = (user.getFirstName() + " " + user.getLastName()).trim();
            
            // Exact match
            if (fullName.equalsIgnoreCase(extractedName)) {
                return Optional.of(user);
            }
            
            // Partial match (contains)
            if (fullName.toLowerCase().contains(extractedName.toLowerCase()) ||
                extractedName.toLowerCase().contains(fullName.toLowerCase())) {
                return Optional.of(user);
            }
            
            // Match by first name only
            if (user.getFirstName().equalsIgnoreCase(extractedName.split(" ")[0])) {
                return Optional.of(user);
            }
        }
        
        return Optional.empty();
    }
    
    /**
     * Sanitize filename for safe storage
     */
    private String sanitizeFileName(String fileName) {
        return fileName.replaceAll("[^a-zA-Z0-9._-]", "_").toLowerCase();
    }
    
    /**
     * Get profile image URL for a user
     */
    public String getProfileImageUrl(String userId) {
        Optional<User> userOpt = userMongoRepository.findById(userId);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            if (user.getProfile() != null && user.getProfile().getProfileImage() != null) {
                return user.getProfile().getProfileImage();
            }
        }
        return null;
    }
    
    /**
     * Update profile image for a specific user
     */
    public boolean updateProfileImage(String userId, String imageUrl) {
        try {
            Optional<User> userOpt = userMongoRepository.findById(userId);
            if (userOpt.isPresent()) {
                User user = userOpt.get();
                
                // Initialize profile if null
                if (user.getProfile() == null) {
                    user.setProfile(new User.ProfileInfo());
                }
                
                user.getProfile().setProfileImage(imageUrl);
                userMongoRepository.save(user);
                return true;
            }
        } catch (Exception e) {
            log.error("Error updating profile image for user {}: {}", userId, e.getMessage());
        }
        return false;
    }
}
