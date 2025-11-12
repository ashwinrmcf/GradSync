// Quick Setup Commands for GradSync MongoDB
// Copy and paste these commands in your MongoDB shell/management tool

use gradsyncdb;

// Create Users Collection
db.createCollection("users");
db.users.createIndex({ "email": 1 }, { unique: true });
db.users.createIndex({ "batchInfo.rollNumber": 1 }, { unique: true });
db.users.createIndex({ "batchInfo.graduationYear": 1, "batchInfo.branch": 1 });

// Create Batches Collection  
db.createCollection("batches");
db.batches.createIndex({ "graduationYear": 1, "branch": 1 }, { unique: true });

// Create Companies Collection
db.createCollection("companies");
db.companies.createIndex({ "name": 1 }, { unique: true });

// Create Placements Collection
db.createCollection("placements");
db.placements.createIndex({ "studentId": 1 });
db.placements.createIndex({ "companyId": 1 });

// Insert Admin User
db.users.insertOne({
  email: "admin@piemr.edu.in",
  password: "$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewfhllQdHqByU1uq",
  firstName: "Admin",
  lastName: "User", 
  role: "ADMIN",
  status: "ACTIVE",
  batchInfo: {
    admissionYear: 2020,
    graduationYear: 2024,
    branch: "CSE",
    rollNumber: "ADMIN001"
  },
  verification: {
    emailVerified: true,
    phoneVerified: true,
    profileVerified: true
  },
  createdAt: new Date(),
  updatedAt: new Date()
});

// Insert Sample Batch for 2018-2022
db.batches.insertOne({
  admissionYear: 2018,
  graduationYear: 2022,
  branch: "CSE",
  totalStudents: 0, // Will be updated when you import Excel data
  placedStudents: 0,
  averagePackage: 0.0,
  placementPercentage: 0.0,
  topRecruiters: [],
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date()
});

print("GradSync database setup complete!");
print("Admin login: admin@piemr.edu.in / admin123");
