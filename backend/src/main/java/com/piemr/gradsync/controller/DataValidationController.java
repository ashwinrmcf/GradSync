package com.piemr.gradsync.controller;

import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.io.FileInputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin/validate")
@CrossOrigin(origins = "*", maxAge = 3600)
public class DataValidationController {
    
    /**
     * Preview NBA 2025.xlsx file structure and first few rows
     * GET /api/admin/validate/preview-nba2025
     */
    @GetMapping("/preview-nba2025")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> previewNBA2025() {
        try {
            String filePath = "Data/NBA 2025.xlsx";
            FileInputStream file = new FileInputStream(filePath);
            Workbook workbook = new XSSFWorkbook(file);
            Sheet sheet = workbook.getSheetAt(0);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("fileName", "NBA 2025.xlsx");
            response.put("sheetName", sheet.getSheetName());
            response.put("totalRows", sheet.getLastRowNum() + 1);
            
            // Find data start row
            int dataStartRow = findDataStartRow(sheet);
            response.put("dataStartRow", dataStartRow + 1); // 1-indexed for display
            
            // Get header information
            List<Map<String, Object>> headerInfo = new ArrayList<>();
            if (dataStartRow > 0) {
                Row headerRow = sheet.getRow(dataStartRow - 1);
                if (headerRow != null) {
                    for (int col = 0; col <= 4; col++) {
                        Cell cell = headerRow.getCell(col);
                        Map<String, Object> colInfo = new HashMap<>();
                        colInfo.put("column", (char)('A' + col));
                        colInfo.put("index", col);
                        colInfo.put("header", cell != null ? getCellValueAsString(cell) : "");
                        headerInfo.add(colInfo);
                    }
                }
            }
            response.put("headers", headerInfo);
            
            // Preview first 5 data rows
            List<Map<String, Object>> previewData = new ArrayList<>();
            for (int i = dataStartRow; i < Math.min(dataStartRow + 5, sheet.getLastRowNum() + 1); i++) {
                Row row = sheet.getRow(i);
                if (row == null) continue;
                
                Map<String, Object> rowData = new HashMap<>();
                rowData.put("rowNumber", i + 1);
                rowData.put("serialNo", getCellValueAsString(row.getCell(0)));
                rowData.put("rollNumber", getCellValueAsString(row.getCell(1)));
                rowData.put("studentName", getCellValueAsString(row.getCell(2)));
                rowData.put("company", getCellValueAsString(row.getCell(3)));
                rowData.put("appointmentNo", getCellValueAsString(row.getCell(4)));
                
                previewData.add(rowData);
            }
            response.put("previewData", previewData);
            
            // Count total valid records
            int validRecords = 0;
            for (int i = dataStartRow; i <= sheet.getLastRowNum(); i++) {
                Row row = sheet.getRow(i);
                if (row != null) {
                    String rollNumber = getCellValueAsString(row.getCell(1));
                    String name = getCellValueAsString(row.getCell(2));
                    if (rollNumber != null && !rollNumber.trim().isEmpty() && 
                        name != null && !name.trim().isEmpty()) {
                        validRecords++;
                    }
                }
            }
            response.put("validRecords", validRecords);
            
            workbook.close();
            file.close();
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                .body(Map.of(
                    "success", false,
                    "message", "Error previewing NBA 2025 file: " + e.getMessage()
                ));
        }
    }
    
    private int findDataStartRow(Sheet sheet) {
        for (int i = 0; i <= sheet.getLastRowNum(); i++) {
            Row row = sheet.getRow(i);
            if (row == null) continue;
            
            Cell firstCell = row.getCell(0);
            if (firstCell != null) {
                String cellValue = getCellValueAsString(firstCell);
                if ("1".equals(cellValue)) {
                    return i;
                }
                if (firstCell.getCellType() == CellType.NUMERIC && 
                    firstCell.getNumericCellValue() == 1.0) {
                    return i;
                }
            }
        }
        return 6; // Default
    }
    
    private String getCellValueAsString(Cell cell) {
        if (cell == null) return null;
        
        switch (cell.getCellType()) {
            case STRING:
                return cell.getStringCellValue().trim();
            case NUMERIC:
                if (DateUtil.isCellDateFormatted(cell)) {
                    return cell.getDateCellValue().toString();
                } else {
                    return String.valueOf((long) cell.getNumericCellValue());
                }
            case BOOLEAN:
                return String.valueOf(cell.getBooleanCellValue());
            case FORMULA:
                return cell.getCellFormula();
            default:
                return null;
        }
    }
}
