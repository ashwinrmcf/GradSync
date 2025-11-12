// MongoDB Initialization Script for GradSync Database
// Run this script in MongoDB shell or your database management tool

// Switch to gradsyncdb database
use gradsyncdb;

// Drop existing collections if they exist (optional - remove if you want to keep existing data)
// db.users.drop();
// db.batches.drop();
// db.companies.drop();
// db.placements.drop();
// db.events.drop();
// db.jobPostings.drop();

print("Initializing GradSync MongoDB Database...");

// ================================
// 1. CREATE USERS COLLECTION WITH VALIDATION
// ================================
db.createCollection("users", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["email", "firstName", "lastName", "role", "batchInfo"],
      properties: {
        email: {
          bsonType: "string",
          pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
          description: "Valid email address"
        },
        firstName: {
          bsonType: "string",
          minLength: 2,
          maxLength: 50
        },
        lastName: {
          bsonType: "string",
          minLength: 2,
          maxLength: 50
        },
        role: {
          enum: ["ALUMNI", "STUDENT", "FACULTY", "ADMIN"],
          description: "User role in the system"
        },
        batchInfo: {
          bsonType: "object",
          required: ["admissionYear", "graduationYear", "branch", "rollNumber"],
          properties: {
            admissionYear: {
              bsonType: "int",
              minimum: 2008,
              maximum: 2030
            },
            graduationYear: {
              bsonType: "int",
              minimum: 2012,
              maximum: 2034
            },
            branch: {
              enum: ["CSE", "IT", "ECE", "EEE", "MECH", "CIVIL", "CHEMICAL", "BIOTECH"],
              description: "Engineering branch"
            },
            rollNumber: {
              bsonType: "string",
              description: "Unique roll number"
            }
          }
        }
      }
    }
  }
});

print("✓ Users collection created");

// ================================
// 2. CREATE BATCHES COLLECTION
// ================================
db.createCollection("batches", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["admissionYear", "graduationYear", "branch"],
      properties: {
        admissionYear: { bsonType: "int" },
        graduationYear: { bsonType: "int" },
        branch: { bsonType: "string" },
        totalStudents: { bsonType: "int" },
        placedStudents: { bsonType: "int" },
        averagePackage: { bsonType: "double" },
        placementPercentage: { bsonType: "double" }
      }
    }
  }
});

print("✓ Batches collection created");

// ================================
// 3. CREATE COMPANIES COLLECTION
// ================================
db.createCollection("companies", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "industry"],
      properties: {
        name: { bsonType: "string" },
        industry: { bsonType: "string" },
        isActive: { bsonType: "bool" }
      }
    }
  }
});

print("✓ Companies collection created");

// ================================
// 4. CREATE PLACEMENTS COLLECTION
// ================================
db.createCollection("placements", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["studentId", "companyId", "packageAmount", "placementDate"],
      properties: {
        studentId: { bsonType: "string" },
        companyId: { bsonType: "string" },
        designation: { bsonType: "string" },
        packageAmount: { bsonType: "double" },
        placementDate: { bsonType: "date" }
      }
    }
  }
});

print("✓ Placements collection created");

// ================================
// 5. CREATE EVENTS COLLECTION
// ================================
db.createCollection("events", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["title", "eventDate", "organizerId"],
      properties: {
        title: { bsonType: "string" },
        eventDate: { bsonType: "date" },
        organizerId: { bsonType: "string" },
        isPublic: { bsonType: "bool" }
      }
    }
  }
});

print("✓ Events collection created");

// ================================
// 6. CREATE JOB POSTINGS COLLECTION
// ================================
db.createCollection("jobPostings", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["title", "companyId", "postedBy"],
      properties: {
        title: { bsonType: "string" },
        companyId: { bsonType: "string" },
        postedBy: { bsonType: "string" },
        isActive: { bsonType: "bool" }
      }
    }
  }
});

print("✓ Job Postings collection created");

// ================================
// 7. CREATE INDEXES FOR PERFORMANCE
// ================================

print("Creating indexes...");

// Users Collection Indexes
db.users.createIndex({ "email": 1 }, { unique: true });
db.users.createIndex({ "batchInfo.rollNumber": 1 }, { unique: true });
db.users.createIndex({ "batchInfo.graduationYear": 1, "batchInfo.branch": 1 });
db.users.createIndex({ "role": 1, "status": 1 });
db.users.createIndex({ "professional.currentCompany": 1 });
db.users.createIndex({ "createdAt": -1 });

// Text index for search functionality
db.users.createIndex({
  "firstName": "text",
  "lastName": "text",
  "professional.currentCompany": "text",
  "professional.designation": "text"
});

print("✓ Users indexes created");

// Batches Collection Indexes
db.batches.createIndex({ "graduationYear": 1, "branch": 1 }, { unique: true });
db.batches.createIndex({ "isActive": 1 });

print("✓ Batches indexes created");

// Companies Collection Indexes
db.companies.createIndex({ "name": 1 }, { unique: true });
db.companies.createIndex({ "industry": 1 });

print("✓ Companies indexes created");

// Placements Collection Indexes
db.placements.createIndex({ "studentId": 1 });
db.placements.createIndex({ "companyId": 1 });
db.placements.createIndex({ "placementDate": -1 });

print("✓ Placements indexes created");

// Events Collection Indexes
db.events.createIndex({ "eventDate": 1 });
db.events.createIndex({ "eventType": 1 });
db.events.createIndex({ "organizerId": 1 });

print("✓ Events indexes created");

// Job Postings Collection Indexes
db.jobPostings.createIndex({ "companyId": 1 });
db.jobPostings.createIndex({ "postedBy": 1 });
db.jobPostings.createIndex({ "isActive": 1, "applicationDeadline": 1 });

print("✓ Job Postings indexes created");

// ================================
// 8. INSERT SAMPLE DATA FOR TESTING
// ================================

print("Inserting sample data...");

// Sample Admin User
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

// Sample Batch Data for 2018-2022 (your Excel data batch)
db.batches.insertOne({
  admissionYear: 2018,
  graduationYear: 2022,
  branch: "CSE",
  totalStudents: 120,
  placedStudents: 108,
  averagePackage: 6.8,
  highestPackage: 12.5,
  placementPercentage: 90.0,
  topRecruiters: ["TCS", "Infosys", "Wipro", "Cognizant", "Microsoft"],
  isActive: true,
  achievements: ["100% Placement Record", "Best Engineering College Award"],
  createdAt: new Date(),
  updatedAt: new Date()
});

// Sample Companies
db.companies.insertMany([
  {
    name: "TCS",
    industry: "Information Technology",
    website: "https://www.tcs.com",
    size: "ENTERPRISE",
    isActive: true,
    hiringHistory: [
      {
        year: 2022,
        studentsHired: 25,
        averagePackage: 4.2,
        positions: ["Software Engineer", "System Analyst"]
      }
    ],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Infosys",
    industry: "Information Technology",
    website: "https://www.infosys.com",
    size: "ENTERPRISE",
    isActive: true,
    hiringHistory: [
      {
        year: 2022,
        studentsHired: 20,
        averagePackage: 4.8,
        positions: ["Software Developer", "Consultant"]
      }
    ],
    createdAt: new Date(),
    updatedAt: new Date()
  }
]);

print("✓ Sample data inserted");

// ================================
// 9. VERIFY SETUP
// ================================

print("\n=== Database Setup Complete ===");
print("Database: gradsyncdb");
print("Collections created: " + db.getCollectionNames().length);
print("Sample users: " + db.users.countDocuments());
print("Sample batches: " + db.batches.countDocuments());
print("Sample companies: " + db.companies.countDocuments());

print("\n=== Next Steps ===");
print("1. Update your Spring Boot application.properties");
print("2. Start your Spring Boot application");
print("3. Import your NBA 2025.xlsx file using the admin panel");
print("4. Test the API endpoints");

print("\n=== Admin Login Credentials ===");
print("Email: admin@piemr.edu.in");
print("Password: admin123");

print("\nGradSync MongoDB Database initialized successfully! 🚀");
