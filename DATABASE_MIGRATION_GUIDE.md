# GradSync MongoDB Schema & Migration Guide

## 📋 Overview

This guide covers the complete MongoDB schema design for GradSync Alumni Management System and migration from MySQL to MongoDB.

## 🏗️ Why MongoDB?

**Advantages for Alumni Management:**
- **Flexible Schema**: Alumni data varies significantly (different career paths, skills, experiences)
- **Nested Documents**: Store complex data like work history, education, projects in single documents
- **Scalability**: Better performance with large datasets (thousands of alumni)
- **JSON Integration**: Seamless integration with React frontend
- **Rich Queries**: Complex search and aggregation capabilities

## 🗄️ Database Schema

### 1. Users Collection
**Purpose**: Store all user information (Alumni, Students, Faculty, Admin)

**Key Features:**
- Flexible professional information storage
- Nested contact and address information
- Skills and achievements arrays
- Social media links
- Verification status tracking

**Sample Document:**
```json
{
  "_id": "ObjectId",
  "email": "john.doe@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "role": "ALUMNI",
  "status": "ACTIVE",
  "batchInfo": {
    "admissionYear": 2018,
    "graduationYear": 2022,
    "branch": "CSE",
    "rollNumber": "18CS001",
    "cgpa": 8.5
  },
  "professional": {
    "currentCompany": "TCS",
    "designation": "Software Engineer",
    "currentSalary": 4.5,
    "experienceYears": 2,
    "skills": ["Java", "Spring Boot", "React"],
    "workHistory": [...]
  },
  "contact": {
    "phone": "9876543210",
    "address": {
      "city": "Hyderabad",
      "state": "Telangana",
      "country": "India"
    }
  }
}
```

### 2. Batches Collection
**Purpose**: Store batch-wise statistics and information

**Sample Document:**
```json
{
  "_id": "ObjectId",
  "graduationYear": 2022,
  "branch": "CSE",
  "admissionYear": 2018,
  "totalStudents": 120,
  "placedStudents": 108,
  "averagePackage": 6.8,
  "placementPercentage": 90.0,
  "topRecruiters": ["TCS", "Infosys", "Microsoft"],
  "statistics": {
    "maleStudents": 80,
    "femaleStudents": 40,
    "averageCGPA": 7.8
  }
}
```

### 3. Companies Collection
**Purpose**: Store company information and hiring history

### 4. Placements Collection
**Purpose**: Store individual placement records

## 🚀 Setup Instructions

### 1. Install MongoDB
```bash
# Windows (using Chocolatey)
choco install mongodb

# Or download from https://www.mongodb.com/try/download/community
```

### 2. Start MongoDB Service
```bash
# Windows
net start MongoDB

# Or use MongoDB Compass for GUI management
```

### 3. Update Application Configuration

**Option A: Use MongoDB Only**
```properties
# application.properties
spring.profiles.active=mongodb
spring.data.mongodb.database=gradsync
```

**Option B: Use Both MySQL and MongoDB**
```properties
# Keep existing MySQL config for authentication
# Add MongoDB for alumni data
spring.data.mongodb.database=gradsync
```

### 4. Run Database Schema Creation
```bash
# Connect to MongoDB
mongo
use gradsync
load('database/mongodb-schema.js')
```

## 📥 Excel Data Import

### Expected Excel Format (NBA 2025.xlsx):
| Column | Description | Required | Example |
|--------|-------------|----------|---------|
| Name | Full Name | Yes | John Doe |
| Roll Number | Unique Roll No | Yes | 18CS001 |
| Email | Email Address | Yes | john@example.com |
| Branch | Engineering Branch | Yes | CSE |
| Admission Year | Year of Admission | No | 2018 |
| Graduation Year | Year of Graduation | No | 2022 |
| Company | Current Company | No | TCS |
| Designation | Job Title | No | Software Engineer |
| Package | Salary in LPA | No | 4.5 |
| Phone | Contact Number | No | 9876543210 |
| CGPA | Academic Score | No | 8.5 |

### Import Process:
1. **Upload Excel File**: Use the admin panel to upload NBA 2025.xlsx
2. **Validation**: System validates data format and checks for duplicates
3. **Import**: Creates User documents and updates Batch statistics
4. **Placement Records**: Automatically creates placement records for employed alumni

### API Endpoints:
```
POST /api/admin/import/students
GET /api/admin/import/template
POST /api/admin/import/validate
```

## 🔄 Migration Strategy

### Phase 1: Parallel Setup (Recommended)
1. **Keep MySQL**: Continue using MySQL for authentication and core features
2. **Add MongoDB**: Use MongoDB for alumni data, placements, and analytics
3. **Gradual Migration**: Move features one by one

### Phase 2: Complete Migration (Optional)
1. **Data Export**: Export existing MySQL data
2. **Transform**: Convert to MongoDB format
3. **Import**: Load into MongoDB collections
4. **Switch**: Update application to use MongoDB only

## 🔍 Query Examples

### Find Alumni by Batch
```java
List<User> cse2022 = userRepository.findByBatchInfoGraduationYearAndBatchInfoBranch(2022, "CSE");
```

### Search Alumni by Company
```java
List<User> tcsAlumni = userRepository.findByProfessionalCurrentCompany("TCS");
```

### Get Placement Statistics
```java
long placedCount = userRepository.countPlacedAlumniByBatch(2022, "CSE");
```

### Text Search
```java
List<User> searchResults = userRepository.findByTextSearch("software engineer");
```

## 📊 Analytics & Reports

The MongoDB schema supports rich analytics:

1. **Batch Performance**: Placement percentages, average packages
2. **Company Analysis**: Top recruiters, hiring trends
3. **Alumni Tracking**: Career progression, location distribution
4. **Skills Analysis**: Popular technologies, skill gaps

## 🔐 Security Considerations

1. **Data Validation**: All inputs validated using Bean Validation
2. **Access Control**: Role-based access (Admin, Alumni, Student)
3. **Data Privacy**: Sensitive information properly protected
4. **Audit Trail**: Track data changes and access

## 🛠️ Development Tips

1. **Use MongoDB Compass**: GUI tool for database management
2. **Index Optimization**: Indexes created automatically for performance
3. **Aggregation Pipelines**: Use for complex analytics queries
4. **Document Size**: Keep documents under 16MB limit
5. **Backup Strategy**: Regular backups of MongoDB data

## 📈 Performance Optimization

1. **Indexes**: Compound indexes on frequently queried fields
2. **Pagination**: Use Spring Data's Pageable for large result sets
3. **Projection**: Fetch only required fields
4. **Connection Pooling**: Configured for optimal performance

## 🚨 Troubleshooting

### Common Issues:
1. **Connection Failed**: Check MongoDB service status
2. **Import Errors**: Validate Excel file format
3. **Duplicate Data**: Check unique constraints on email/roll number
4. **Performance Issues**: Review indexes and query patterns

## 📞 Next Steps

1. **Install MongoDB** on your system
2. **Update pom.xml** with new dependencies (already done)
3. **Configure application.properties** for MongoDB connection
4. **Import your NBA 2025.xlsx** file using the admin panel
5. **Test the system** with sample queries

This schema provides a robust foundation for your GradSync application with excellent scalability and flexibility for future enhancements.
