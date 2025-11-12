package com.piemr.gradsync.controller;

import com.piemr.gradsync.entity.mongodb.User;
import com.piemr.gradsync.service.DataImportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin/import")
@CrossOrigin(origins = "*", maxAge = 3600)
public class DataImportController {
    
    @Autowired
    private DataImportService dataImportService;
    
    /**
     * Import student data from Excel file
     * POST /api/admin/import/students
     */
    @PostMapping("/students")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> importStudentData(@RequestParam("file") MultipartFile file) {
        try {
            // Validate file
            if (file.isEmpty()) {
                return ResponseEntity.badRequest()
                    .body(createErrorResponse("File is empty"));
            }
            
            if (!isExcelFile(file)) {
                return ResponseEntity.badRequest()
                    .body(createErrorResponse("Please upload a valid Excel file (.xlsx or .xls)"));
            }
            
            // Import data
            List<User> importedUsers = dataImportService.importStudentDataFromExcel(file);
            
            // Create response
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Data imported successfully");
            response.put("importedCount", importedUsers.size());
            response.put("importedUsers", importedUsers.stream()
                .map(user -> {
                    Map<String, Object> userInfo = new HashMap<>();
                    userInfo.put("id", user.getId());
                    userInfo.put("name", user.getFullName());
                    userInfo.put("email", user.getEmail());
                    userInfo.put("rollNumber", user.getBatchInfo().getRollNumber());
                    userInfo.put("batch", user.getBatchDisplay());
                    return userInfo;
                })
                .toList());
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(createErrorResponse("Error importing data: " + e.getMessage()));
        }
    }
    
    /**
     * Get import template information
     * GET /api/admin/import/template
     */
    @GetMapping("/template")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> getImportTemplate() {
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("templateColumns", List.of(
            "Name (Required)",
            "Roll Number (Required)",
            "Email (Required)",
            "Branch (Required)",
            "Admission Year",
            "Graduation Year",
            "Company",
            "Designation",
            "Package (LPA)",
            "Phone",
            "CGPA"
        ));
        response.put("sampleData", List.of(
            List.of("John Doe", "18CS001", "john.doe@example.com", "CSE", 2018, 2022, 
                   "TCS", "Software Engineer", 4.5, "9876543210", 8.5),
            List.of("Jane Smith", "18IT002", "jane.smith@example.com", "IT", 2018, 2022, 
                   "Infosys", "System Analyst", 5.2, "9876543211", 9.1)
        ));
        response.put("instructions", List.of(
            "Upload an Excel file (.xlsx or .xls) with student data",
            "First row should contain column headers",
            "Name, Roll Number, Email, and Branch are required fields",
            "Roll numbers and emails must be unique",
            "Branch should be one of: CSE, IT, ECE, EEE, MECH, CIVIL, CHEMICAL, BIOTECH",
            "Package should be in LPA (Lakhs Per Annum)",
            "CGPA should be between 0 and 10"
        ));
        
        return ResponseEntity.ok(response);
    }
    
    /**
     * Validate import data before actual import
     * POST /api/admin/import/validate
     */
    @PostMapping("/validate")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> validateImportData(@RequestParam("file") MultipartFile file) {
        try {
            if (file.isEmpty()) {
                return ResponseEntity.badRequest()
                    .body(createErrorResponse("File is empty"));
            }
            
            if (!isExcelFile(file)) {
                return ResponseEntity.badRequest()
                    .body(createErrorResponse("Please upload a valid Excel file (.xlsx or .xls)"));
            }
            
            // TODO: Implement validation logic
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "File validation completed");
            response.put("validRows", 0);
            response.put("invalidRows", 0);
            response.put("errors", List.of());
            response.put("warnings", List.of());
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(createErrorResponse("Error validating file: " + e.getMessage()));
        }
    }
    
    // Helper methods
    private boolean isExcelFile(MultipartFile file) {
        String contentType = file.getContentType();
        return contentType != null && (
            contentType.equals("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") ||
            contentType.equals("application/vnd.ms-excel")
        );
    }
    
    private Map<String, Object> createErrorResponse(String message) {
        Map<String, Object> response = new HashMap<>();
        response.put("success", false);
        response.put("message", message);
        return response;
    }
}
