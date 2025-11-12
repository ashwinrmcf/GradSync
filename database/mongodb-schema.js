// MongoDB Schema Design for GradSync Alumni Management System
// This file contains the collection schemas and indexes for optimal performance

// ================================
// 1. USERS COLLECTION
// ================================
db.createCollection("users", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["email", "firstName", "lastName", "role", "batchInfo"],
      properties: {
        _id: {
          bsonType: "objectId"
        },
        // Basic Information
        email: {
          bsonType: "string",
          pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
          description: "Valid email address"
        },
        password: {
          bsonType: "string",
          minLength: 6,
          description: "Hashed password"
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
        middleName: {
          bsonType: "string",
          maxLength: 50
        },
        // Role and Status
        role: {
          enum: ["ALUMNI", "STUDENT", "FACULTY", "ADMIN"],
          description: "User role in the system"
        },
        status: {
          enum: ["ACTIVE", "INACTIVE", "PENDING_VERIFICATION", "SUSPENDED"],
          description: "Account status"
        },
        // Academic Information
        batchInfo: {
          bsonType: "object",
          required: ["admissionYear", "graduationYear", "branch"],
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
            },
            cgpa: {
              bsonType: "double",
              minimum: 0,
              maximum: 10
            },
            division: {
              enum: ["FIRST", "SECOND", "THIRD", "PASS"],
              description: "Academic division/class"
            }
          }
        },
        // Contact Information
        contact: {
          bsonType: "object",
          properties: {
            phone: {
              bsonType: "string",
              pattern: "^[+]?[0-9]{10,15}$"
            },
            alternatePhone: {
              bsonType: "string",
              pattern: "^[+]?[0-9]{10,15}$"
            },
            address: {
              bsonType: "object",
              properties: {
                street: { bsonType: "string" },
                city: { bsonType: "string" },
                state: { bsonType: "string" },
                country: { bsonType: "string", default: "India" },
                pincode: { bsonType: "string" }
              }
            }
          }
        },
        // Professional Information
        professional: {
          bsonType: "object",
          properties: {
            currentCompany: { bsonType: "string" },
            designation: { bsonType: "string" },
            workLocation: { bsonType: "string" },
            experienceYears: { bsonType: "int", minimum: 0 },
            currentSalary: { bsonType: "double" },
            workType: {
              enum: ["FULL_TIME", "PART_TIME", "FREELANCE", "INTERN", "UNEMPLOYED", "ENTREPRENEUR"]
            },
            industry: { bsonType: "string" },
            skills: {
              bsonType: "array",
              items: { bsonType: "string" }
            },
            workHistory: {
              bsonType: "array",
              items: {
                bsonType: "object",
                properties: {
                  company: { bsonType: "string" },
                  designation: { bsonType: "string" },
                  startDate: { bsonType: "date" },
                  endDate: { bsonType: "date" },
                  location: { bsonType: "string" },
                  description: { bsonType: "string" },
                  salary: { bsonType: "double" }
                }
              }
            }
          }
        },
        // Social Links
        socialLinks: {
          bsonType: "object",
          properties: {
            linkedin: { bsonType: "string" },
            github: { bsonType: "string" },
            portfolio: { bsonType: "string" },
            twitter: { bsonType: "string" },
            instagram: { bsonType: "string" }
          }
        },
        // Profile Information
        profile: {
          bsonType: "object",
          properties: {
            bio: { bsonType: "string", maxLength: 1000 },
            profileImage: { bsonType: "string" },
            coverImage: { bsonType: "string" },
            achievements: {
              bsonType: "array",
              items: { bsonType: "string" }
            },
            interests: {
              bsonType: "array",
              items: { bsonType: "string" }
            }
          }
        },
        // Verification and Security
        verification: {
          bsonType: "object",
          properties: {
            emailVerified: { bsonType: "bool", default: false },
            phoneVerified: { bsonType: "bool", default: false },
            profileVerified: { bsonType: "bool", default: false },
            verificationToken: { bsonType: "string" },
            resetPasswordToken: { bsonType: "string" },
            resetPasswordExpires: { bsonType: "date" }
          }
        },
        // Timestamps
        createdAt: { bsonType: "date" },
        updatedAt: { bsonType: "date" },
        lastLogin: { bsonType: "date" }
      }
    }
  }
});

// ================================
// 2. BATCHES COLLECTION
// ================================
db.createCollection("batches", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["admissionYear", "graduationYear", "branch"],
      properties: {
        _id: { bsonType: "objectId" },
        admissionYear: { bsonType: "int" },
        graduationYear: { bsonType: "int" },
        branch: { bsonType: "string" },
        totalStudents: { bsonType: "int" },
        placedStudents: { bsonType: "int" },
        averagePackage: { bsonType: "double" },
        highestPackage: { bsonType: "double" },
        placementPercentage: { bsonType: "double" },
        topRecruiters: {
          bsonType: "array",
          items: { bsonType: "string" }
        },
        batchCoordinator: { bsonType: "objectId" },
        achievements: {
          bsonType: "array",
          items: { bsonType: "string" }
        },
        isActive: { bsonType: "bool" },
        createdAt: { bsonType: "date" },
        updatedAt: { bsonType: "date" }
      }
    }
  }
});

// ================================
// 3. COMPANIES COLLECTION
// ================================
db.createCollection("companies", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "industry"],
      properties: {
        _id: { bsonType: "objectId" },
        name: { bsonType: "string" },
        industry: { bsonType: "string" },
        website: { bsonType: "string" },
        logo: { bsonType: "string" },
        description: { bsonType: "string" },
        location: { bsonType: "string" },
        size: {
          enum: ["STARTUP", "SMALL", "MEDIUM", "LARGE", "ENTERPRISE"]
        },
        hiringHistory: {
          bsonType: "array",
          items: {
            bsonType: "object",
            properties: {
              year: { bsonType: "int" },
              studentsHired: { bsonType: "int" },
              averagePackage: { bsonType: "double" },
              positions: {
                bsonType: "array",
                items: { bsonType: "string" }
              }
            }
          }
        },
        isActive: { bsonType: "bool" },
        createdAt: { bsonType: "date" },
        updatedAt: { bsonType: "date" }
      }
    }
  }
});

// ================================
// 4. PLACEMENTS COLLECTION
// ================================
db.createCollection("placements", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["studentId", "companyId", "package", "placementDate"],
      properties: {
        _id: { bsonType: "objectId" },
        studentId: { bsonType: "objectId" },
        companyId: { bsonType: "objectId" },
        designation: { bsonType: "string" },
        package: { bsonType: "double" },
        placementDate: { bsonType: "date" },
        joiningDate: { bsonType: "date" },
        location: { bsonType: "string" },
        placementType: {
          enum: ["CAMPUS", "OFF_CAMPUS", "INTERNSHIP_CONVERSION", "REFERRAL"]
        },
        status: {
          enum: ["OFFERED", "JOINED", "DECLINED", "TERMINATED"]
        },
        notes: { bsonType: "string" },
        createdAt: { bsonType: "date" },
        updatedAt: { bsonType: "date" }
      }
    }
  }
});

// ================================
// 5. EVENTS COLLECTION
// ================================
db.createCollection("events", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["title", "eventDate", "organizerId"],
      properties: {
        _id: { bsonType: "objectId" },
        title: { bsonType: "string" },
        description: { bsonType: "string" },
        eventDate: { bsonType: "date" },
        endDate: { bsonType: "date" },
        location: { bsonType: "string" },
        eventType: {
          enum: ["REUNION", "WORKSHOP", "SEMINAR", "JOB_FAIR", "NETWORKING", "CULTURAL", "SPORTS"]
        },
        organizerId: { bsonType: "objectId" },
        maxAttendees: { bsonType: "int" },
        registrationDeadline: { bsonType: "date" },
        isPublic: { bsonType: "bool" },
        targetBatches: {
          bsonType: "array",
          items: { bsonType: "int" }
        },
        speakers: {
          bsonType: "array",
          items: {
            bsonType: "object",
            properties: {
              name: { bsonType: "string" },
              designation: { bsonType: "string" },
              company: { bsonType: "string" },
              bio: { bsonType: "string" }
            }
          }
        },
        registrations: {
          bsonType: "array",
          items: {
            bsonType: "object",
            properties: {
              userId: { bsonType: "objectId" },
              registeredAt: { bsonType: "date" },
              attended: { bsonType: "bool" }
            }
          }
        },
        createdAt: { bsonType: "date" },
        updatedAt: { bsonType: "date" }
      }
    }
  }
});

// ================================
// 6. JOB_POSTINGS COLLECTION
// ================================
db.createCollection("jobPostings", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["title", "companyId", "postedBy"],
      properties: {
        _id: { bsonType: "objectId" },
        title: { bsonType: "string" },
        description: { bsonType: "string" },
        companyId: { bsonType: "objectId" },
        postedBy: { bsonType: "objectId" },
        location: { bsonType: "string" },
        jobType: {
          enum: ["FULL_TIME", "PART_TIME", "CONTRACT", "INTERNSHIP"]
        },
        experienceRequired: { bsonType: "string" },
        salaryRange: {
          bsonType: "object",
          properties: {
            min: { bsonType: "double" },
            max: { bsonType: "double" }
          }
        },
        skills: {
          bsonType: "array",
          items: { bsonType: "string" }
        },
        applicationDeadline: { bsonType: "date" },
        isActive: { bsonType: "bool" },
        applications: {
          bsonType: "array",
          items: {
            bsonType: "object",
            properties: {
              applicantId: { bsonType: "objectId" },
              appliedAt: { bsonType: "date" },
              status: {
                enum: ["APPLIED", "SHORTLISTED", "INTERVIEWED", "SELECTED", "REJECTED"]
              },
              resume: { bsonType: "string" },
              coverLetter: { bsonType: "string" }
            }
          }
        },
        createdAt: { bsonType: "date" },
        updatedAt: { bsonType: "date" }
      }
    }
  }
});

// ================================
// INDEXES FOR PERFORMANCE
// ================================

// Users Collection Indexes
db.users.createIndex({ "email": 1 }, { unique: true });
db.users.createIndex({ "batchInfo.rollNumber": 1 }, { unique: true });
db.users.createIndex({ "batchInfo.graduationYear": 1, "batchInfo.branch": 1 });
db.users.createIndex({ "role": 1, "status": 1 });
db.users.createIndex({ "professional.currentCompany": 1 });
db.users.createIndex({ "createdAt": -1 });

// Batches Collection Indexes
db.batches.createIndex({ "graduationYear": 1, "branch": 1 }, { unique: true });
db.batches.createIndex({ "isActive": 1 });

// Companies Collection Indexes
db.companies.createIndex({ "name": 1 }, { unique: true });
db.companies.createIndex({ "industry": 1 });

// Placements Collection Indexes
db.placements.createIndex({ "studentId": 1 });
db.placements.createIndex({ "companyId": 1 });
db.placements.createIndex({ "placementDate": -1 });

// Events Collection Indexes
db.events.createIndex({ "eventDate": 1 });
db.events.createIndex({ "eventType": 1 });
db.events.createIndex({ "organizerId": 1 });

// Job Postings Collection Indexes
db.jobPostings.createIndex({ "companyId": 1 });
db.jobPostings.createIndex({ "postedBy": 1 });
db.jobPostings.createIndex({ "isActive": 1, "applicationDeadline": 1 });

console.log("MongoDB Schema and Indexes created successfully!");
