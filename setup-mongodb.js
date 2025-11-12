// MongoDB Setup Script for GradSync
// Run this in MongoDB shell or your database management tool

// Connect to MongoDB and switch to gradsyncdb
use gradsyncdb;

print("Setting up GradSync MongoDB Database...");

// Create the admin user first
db.users.insertOne({
  email: "admin@piemr.edu.in",
  password: "$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewfhllQdHqByU1uq", // password: admin123
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

// Create indexes for better performance
db.users.createIndex({ "email": 1 }, { unique: true });
db.users.createIndex({ "batchInfo.rollNumber": 1 }, { unique: true });

// Create the CSE 2018-2022 batch
db.batches.insertOne({
  admissionYear: 2018,
  graduationYear: 2022,
  branch: "CSE",
  totalStudents: 0, // Will be updated after import
  placedStudents: 0,
  averagePackage: 0.0,
  placementPercentage: 0.0,
  topRecruiters: [],
  isActive: true,
  achievements: ["Ready for NBA 2025 data import"],
  createdAt: new Date(),
  updatedAt: new Date()
});

// Create basic indexes
db.batches.createIndex({ "graduationYear": 1, "branch": 1 }, { unique: true });
db.companies.createIndex({ "name": 1 }, { unique: true });
db.placements.createIndex({ "studentId": 1 });

print("✅ Admin user created: admin@piemr.edu.in / admin123");
print("✅ CSE 2018-2022 batch created");
print("✅ Database indexes created");
print("✅ Ready for NBA 2025 data import!");

// Verify setup
print("\n=== Verification ===");
print("Admin users: " + db.users.countDocuments({role: "ADMIN"}));
print("Total users: " + db.users.countDocuments());
print("Batches: " + db.batches.countDocuments());
print("\nDatabase setup complete! 🚀");
