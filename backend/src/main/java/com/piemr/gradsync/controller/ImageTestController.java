package com.piemr.gradsync.controller;

import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping("/test")
@CrossOrigin(origins = {"http://localhost:3000", "http://127.0.0.1:3000"})
public class ImageTestController {
    
    @GetMapping("/image/{filename}")
    public ResponseEntity<Resource> getImage(@PathVariable String filename) {
        try {
            Resource resource = new ClassPathResource("static/images/profiles/" + filename);
            
            if (resource.exists()) {
                String contentType = Files.probeContentType(Paths.get(resource.getFilename()));
                if (contentType == null) {
                    contentType = "application/octet-stream";
                }
                
                return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(contentType))
                    .body(resource);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (IOException e) {
            return ResponseEntity.internalServerError().build();
        }
    }
    
    @GetMapping("/images/list")
    public ResponseEntity<String> listImages() {
        try {
            Path profilesPath = Paths.get("src/main/resources/static/images/profiles");
            if (Files.exists(profilesPath)) {
                StringBuilder sb = new StringBuilder();
                sb.append("Images found:\n");
                Files.list(profilesPath).forEach(path -> {
                    sb.append("- ").append(path.getFileName()).append("\n");
                });
                return ResponseEntity.ok(sb.toString());
            } else {
                return ResponseEntity.ok("Profiles directory not found");
            }
        } catch (IOException e) {
            return ResponseEntity.ok("Error listing images: " + e.getMessage());
        }
    }
}
