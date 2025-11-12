// Test script to verify Excel file structure
// This helps understand the column layout of NBA 2025.xlsx

const XLSX = require('xlsx');
const path = require('path');

function analyzeExcelFile() {
    try {
        const filePath = path.join(__dirname, '..', 'Data', 'NBA 2025.xlsx');
        console.log('Reading file:', filePath);
        
        const workbook = XLSX.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        
        console.log('\n=== Excel File Analysis ===');
        console.log('Sheet Name:', sheetName);
        
        // Get range
        const range = XLSX.utils.decode_range(worksheet['!ref']);
        console.log('Range:', worksheet['!ref']);
        console.log('Total Rows:', range.e.r + 1);
        console.log('Total Columns:', range.e.c + 1);
        
        // Read header row
        console.log('\n=== Header Row (Row 1) ===');
        for (let col = 0; col <= range.e.c; col++) {
            const cellAddress = XLSX.utils.encode_cell({ r: 0, c: col });
            const cell = worksheet[cellAddress];
            if (cell) {
                console.log(`Column ${String.fromCharCode(65 + col)} (${col}):`, cell.v);
            }
        }
        
        // Read first few data rows
        console.log('\n=== Sample Data Rows ===');
        for (let row = 1; row <= Math.min(5, range.e.r); row++) {
            console.log(`\nRow ${row + 1}:`);
            for (let col = 0; col <= range.e.c; col++) {
                const cellAddress = XLSX.utils.encode_cell({ r: row, c: col });
                const cell = worksheet[cellAddress];
                const columnLetter = String.fromCharCode(65 + col);
                if (cell) {
                    console.log(`  ${columnLetter}: ${cell.v}`);
                }
            }
        }
        
        // Convert to JSON for easier analysis
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        console.log('\n=== Column Mapping Suggestion ===');
        if (jsonData.length > 0) {
            const headers = jsonData[0];
            headers.forEach((header, index) => {
                console.log(`Column ${index} (${String.fromCharCode(65 + index)}): ${header}`);
            });
        }
        
    } catch (error) {
        console.error('Error reading Excel file:', error.message);
        console.log('\nMake sure:');
        console.log('1. NBA 2025.xlsx exists in the Data folder');
        console.log('2. npm install xlsx is run');
        console.log('3. File is not corrupted');
    }
}

// Run if called directly
if (require.main === module) {
    analyzeExcelFile();
}

module.exports = { analyzeExcelFile };
