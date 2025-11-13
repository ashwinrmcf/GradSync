# Multi-Batch Alumni Import Guide

This guide explains how to import alumni data for multiple batch years (2023, 2024, 2025) into your GradSync system.

## 📋 Overview

You now have the tools to import alumni data for different batch years in the same format as your existing 2022 batch alumni. The system supports:

- **2023 Batch Alumni** - Recent graduates with entry-level positions
- **2024 Batch Alumni** - Fresh graduates with competitive packages  
- **2025 Batch Alumni** - Latest graduates with premium placements

## 🗂️ Generated Files

The following files have been created for you:

### 1. Data Files (`/generated-alumni-data/`)
- `batch-2023-alumni.json` - 20 alumni from 2023 batch
- `batch-2024-alumni.json` - 18 alumni from 2024 batch  
- `batch-2025-alumni.json` - 16 alumni from 2025 batch
- `all-new-batches-alumni.json` - Combined data (54 alumni total)
- `import-alumni-to-mongodb.js` - MongoDB import script

### 2. Backend Files
- `BulkAlumniImportController.java` - New REST API for bulk imports
- `import-multi-batch-alumni.http` - HTTP requests for testing

### 3. Scripts
- `create-multi-batch-alumni.js` - Data generation script

## 🚀 Import Methods

### Method 1: Direct MongoDB Import (Recommended)

1. **Open MongoDB Compass or MongoDB Shell**
2. **Connect to your GradSync database**
3. **Run the import script:**
   ```bash
   # In MongoDB shell
   load('D:/GradSync/generated-alumni-data/import-alumni-to-mongodb.js')
   ```

### Method 2: REST API Import

1. **Start your backend server:**
   ```bash
   cd backend
   mvn spring-boot:run
   ```

2. **Use the HTTP file:**
   - Open `import-multi-batch-alumni.http` in VS Code
   - Install REST Client extension
   - Execute requests step by step

3. **Or use curl commands:**
   ```bash
   # Login first to get JWT token
   curl -X POST http://localhost:8080/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{"email":"admin@piemr.edu.in","password":"admin123"}'
   
   # Import 2023 batch (replace YOUR_JWT_TOKEN_HERE)
   curl -X POST http://localhost:8080/api/admin/alumni/bulk-import \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE" \
     -d @generated-alumni-data/batch-2023-alumni.json
   ```

### Method 3: Custom Data Import

If you have your own Excel/CSV data:

1. **Use the existing Excel import endpoint:**
   ```
   POST /api/admin/import/students
   ```

2. **Excel format should match:**
   | Name | Roll Number | Email | Branch | Admission Year | Graduation Year | Company | Designation | Package | Phone | CGPA |
   |------|-------------|-------|--------|----------------|-----------------|---------|-------------|---------|-------|------|

## 📊 Data Structure

Each alumni record follows this MongoDB format:

```json
{
  "email": "student.name@piemr.edu.in",
  "password": "student123",
  "firstName": "Student",
  "lastName": "Name", 
  "role": "ALUMNI",
  "status": "PENDING_VERIFICATION",
  "batchInfo": {
    "admissionYear": 2019,
    "graduationYear": 2023,
    "branch": "CSE",
    "rollNumber": "0863CSE001",
    "cgpa": 8.5
  },
  "professional": {
    "currentCompany": "TCS",
    "designation": "Software Engineer",
    "currentSalary": 3.5,
    "workType": "FULL_TIME",
    "workLocation": "Bangalore, India",
    "experienceYears": 1,
    "skills": ["Java", "Python", "JavaScript"]
  },
  "contact": {
    "phone": "+919876543210",
    "address": {
      "city": "Bangalore",
      "state": "Karnataka", 
      "country": "India"
    }
  },
  "profile": {
    "profileImage": "http://localhost:8080/images/profiles/default.jpeg",
    "bio": "Software Engineer with experience in technology industry."
  },
  "socialLinks": {
    "linkedin": "https://linkedin.com/in/student-name",
    "github": "https://github.com/studentname",
    "portfolio": "https://studentname.dev"
  },
  "verification": {
    "emailVerified": true,
    "phoneVerified": false,
    "profileVerified": true
  }
}
```

## 🎯 Batch Characteristics

### 2023 Batch (20 Alumni)
- **Companies:** TCS, Infosys, Wipro, Cognizant, Accenture, HCL, Tech Mahindra
- **Salary Range:** 3.5 - 4.5 LPA
- **Experience:** 1 year
- **Focus:** Entry-level positions, service companies

### 2024 Batch (18 Alumni)  
- **Companies:** Microsoft, Google, Amazon, Flipkart, Paytm, Zomato, Swiggy
- **Salary Range:** 6.5 - 15.0 LPA
- **Experience:** Fresh graduates
- **Focus:** Product companies, higher packages

### 2025 Batch (16 Alumni)
- **Companies:** Meta, Apple, Netflix, Uber, Adobe, Salesforce, Oracle
- **Salary Range:** 8.0 - 18.0 LPA  
- **Experience:** 0 years (fresh graduates)
- **Focus:** Premium companies, top-tier packages

## 🔧 Verification Steps

After importing, verify the data:

1. **Check Alumni Count:**
   ```
   GET http://localhost:8080/api/alumni?page=0&size=100
   ```

2. **Verify Each Batch:**
   ```
   GET http://localhost:8080/api/alumni/batch/2023/CSE
   GET http://localhost:8080/api/alumni/batch/2024/CSE  
   GET http://localhost:8080/api/alumni/batch/2025/CSE
   ```

3. **Check Batch Statistics:**
   ```
   GET http://localhost:8080/api/batches
   ```

4. **Test Frontend:**
   - Visit `http://localhost:3000/directory`
   - Filter by different batch years
   - Verify alumni cards display correctly

## 🎨 Frontend Display

The alumni will automatically appear in:

- **Directory Page** - Filterable by batch year
- **Batches Page** - Statistics for each year
- **Search Results** - Searchable across all batches
- **Connect Modal** - Contact functionality for all alumni

## 📈 Batch Statistics

The system automatically calculates:

- **Total Students** per batch/branch
- **Placed Students** count
- **Average Package** for each batch
- **Placement Percentage**
- **Top Companies** list

## 🔄 Updating Data

To add more alumni or update existing data:

1. **Modify the generation script:**
   ```bash
   node scripts/create-multi-batch-alumni.js
   ```

2. **Re-import using any method above**

3. **Or add individual alumni via API:**
   ```
   POST /api/admin/alumni/bulk-import
   ```

## 🛠️ Troubleshooting

### Common Issues:

1. **Duplicate Email/Roll Number:**
   - System prevents duplicates automatically
   - Check error messages in import response

2. **Missing Required Fields:**
   - Ensure email, firstName, lastName, batchInfo are provided
   - Check validation errors

3. **Backend Not Running:**
   - Start Spring Boot application: `mvn spring-boot:run`
   - Verify MongoDB connection

4. **Frontend Not Updating:**
   - Clear browser cache
   - Restart Next.js dev server: `npm run dev`

## 📞 Support

If you encounter issues:

1. Check console logs for errors
2. Verify API endpoints are responding
3. Ensure MongoDB is running and accessible
4. Check network connectivity between frontend/backend

---

**Total Alumni After Import:** 100+ (46 from 2022 + 54 from new batches)

**Supported Batch Years:** 2022, 2023, 2024, 2025

**Ready for Production:** ✅ All data follows the same format and structure as existing 2022 alumni
