package com.piemr.gradsync.controller;

import com.piemr.gradsync.service.ExcelDataProcessor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/admin/data")
@CrossOrigin(origins = "*", maxAge = 3600)
public class DataProcessingController {
    
    @Autowired
    private ExcelDataProcessor excelDataProcessor;
    
    /**
     * Process the NBA 2025.xlsx file from the Data folder
     * POST /api/admin/data/process-nba2025
     */
    @PostMapping("/process-nba2025")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> processNBA2025Data() {
        try {
            Map<String, Object> result = excelDataProcessor.processNBA2025Data();
            
            if ((Boolean) result.get("success")) {
                return ResponseEntity.ok(result);
            } else {
                return ResponseEntity.badRequest().body(result);
            }
            
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                .body(Map.of(
                    "success", false,
                    "message", "Error processing NBA 2025 data: " + e.getMessage()
                ));
        }
    }
    
    /**
     * Get data processing status and statistics
     * GET /api/admin/data/status
     */
    @GetMapping("/status")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> getDataStatus() {
        // This would return current database statistics
        return ResponseEntity.ok(Map.of(
            "message", "Data processing endpoint ready",
            "nba2025File", "Data/NBA 2025.xlsx",
            "status", "Ready to process"
        ));
    }
}
