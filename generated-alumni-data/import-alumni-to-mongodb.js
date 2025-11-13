
// MongoDB Import Script for Multi-Batch Alumni Data
// Run this script in MongoDB shell or MongoDB Compass

// Switch to your database
use gradsync;

// Import 2023 batch alumni
db.users.insertMany([
  {
    "email": "vihaan.sharma@piemr.edu.in",
    "password": "student123",
    "firstName": "Vihaan",
    "lastName": "Sharma",
    "role": "ALUMNI",
    "status": "PENDING_VERIFICATION",
    "batchInfo": {
      "admissionYear": 2019,
      "graduationYear": 2023,
      "branch": "EEE",
      "rollNumber": "086323EEE001",
      "cgpa": 9.82
    },
    "professional": {
      "currentCompany": "Infosys",
      "designation": "System Engineer",
      "currentSalary": 4,
      "workType": "FULL_TIME",
      "workLocation": "Hyderabad, India",
      "experienceYears": 2,
      "skills": [
        "MATLAB",
        "PLC Programming",
        "Electrical Design",
        "Control Systems"
      ]
    },
    "contact": {
      "phone": "+919128696337",
      "address": {
        "city": "Hyderabad",
        "state": "India",
        "country": "India"
      }
    },
    "profile": {
      "profileImage": "http://localhost:8080/images/profiles/default_vihaan_sharma.jpeg",
      "bio": "Vihaan is a dedicated System Engineer at Infosys with 2 years of experience in the technology industry."
    },
    "socialLinks": {
      "linkedin": "https://linkedin.com/in/vihaan-sharma",
      "github": "https://github.com/vihaansharma",
      "portfolio": "https://vihaansharma.dev"
    },
    "verification": {
      "emailVerified": true,
      "phoneVerified": false,
      "profileVerified": true
    },
    "createdAt": "2025-11-13T19:13:38.742Z",
    "updatedAt": "2025-11-13T19:13:38.747Z",
    "_class": "com.piemr.gradsync.entity.mongodb.User"
  },
  {
    "email": "aditya.sharma@piemr.edu.in",
    "password": "student123",
    "firstName": "Aditya",
    "lastName": "Sharma",
    "role": "ALUMNI",
    "status": "PENDING_VERIFICATION",
    "batchInfo": {
      "admissionYear": 2019,
      "graduationYear": 2023,
      "branch": "MECH",
      "rollNumber": "086323MECH002",
      "cgpa": 7.53
    },
    "professional": {
      "currentCompany": "TCS",
      "designation": "Software Engineer",
      "currentSalary": 3.5,
      "workType": "FULL_TIME",
      "workLocation": "Pune, India",
      "experienceYears": 2,
      "skills": [
        "CATIA",
        "Manufacturing"
      ]
    },
    "contact": {
      "phone": "+917298178326",
      "address": {
        "city": "Pune",
        "state": "India",
        "country": "India"
      }
    },
    "profile": {
      "profileImage": "http://localhost:8080/images/profiles/default_aditya_sharma.jpeg",
      "bio": "Aditya is a dedicated Software Engineer at TCS with 2 years of experience in the technology industry."
    },
    "socialLinks": {
      "linkedin": "https://linkedin.com/in/aditya-sharma",
      "github": "https://github.com/adityasharma",
      "portfolio": "https://adityasharma.dev"
    },
    "verification": {
      "emailVerified": true,
      "phoneVerified": true,
      "profileVerified": true
    },
    "createdAt": "2025-11-13T19:13:38.747Z",
    "updatedAt": "2025-11-13T19:13:38.747Z",
    "_class": "com.piemr.gradsync.entity.mongodb.User"
  },
  {
    "email": "diya.verma@piemr.edu.in",
    "password": "student123",
    "firstName": "Diya",
    "lastName": "Verma",
    "role": "ALUMNI",
    "status": "PENDING_VERIFICATION",
    "batchInfo": {
      "admissionYear": 2019,
      "graduationYear": 2023,
      "branch": "EEE",
      "rollNumber": "086323EEE003",
      "cgpa": 6.29
    },
    "professional": {
      "currentCompany": "Wipro",
      "designation": "Project Engineer",
      "currentSalary": 3.8,
      "workType": "FULL_TIME",
      "workLocation": "Mumbai, India",
      "experienceYears": 2,
      "skills": [
        "AutoCAD",
        "Electrical Design",
        "PLC Programming",
        "Control Systems"
      ]
    },
    "contact": {
      "phone": "+911296599716",
      "address": {
        "city": "Mumbai",
        "state": "India",
        "country": "India"
      }
    },
    "profile": {
      "profileImage": "http://localhost:8080/images/profiles/default_diya_verma.jpeg",
      "bio": "Diya is a dedicated Project Engineer at Wipro with 2 years of experience in the technology industry."
    },
    "socialLinks": {
      "linkedin": "https://linkedin.com/in/diya-verma",
      "github": "https://github.com/diyaverma",
      "portfolio": "https://diyaverma.dev"
    },
    "verification": {
      "emailVerified": true,
      "phoneVerified": true,
      "profileVerified": true
    },
    "createdAt": "2025-11-13T19:13:38.747Z",
    "updatedAt": "2025-11-13T19:13:38.747Z",
    "_class": "com.piemr.gradsync.entity.mongodb.User"
  },
  {
    "email": "kiara.goel@piemr.edu.in",
    "password": "student123",
    "firstName": "Kiara",
    "lastName": "Goel",
    "role": "ALUMNI",
    "status": "PENDING_VERIFICATION",
    "batchInfo": {
      "admissionYear": 2019,
      "graduationYear": 2023,
      "branch": "CIVIL",
      "rollNumber": "086323CIVIL004",
      "cgpa": 7.04
    },
    "professional": {
      "currentCompany": "Wipro",
      "designation": "Project Engineer",
      "currentSalary": 3.8,
      "workType": "FULL_TIME",
      "workLocation": "Coimbatore, India",
      "experienceYears": 2,
      "skills": [
        "Surveying",
        "Construction Management",
        "AutoCAD",
        "Structural Analysis"
      ]
    },
    "contact": {
      "phone": "+915491820484",
      "address": {
        "city": "Coimbatore",
        "state": "India",
        "country": "India"
      }
    },
    "profile": {
      "profileImage": "http://localhost:8080/images/profiles/default_kiara_goel.jpeg",
      "bio": "Kiara is a dedicated Project Engineer at Wipro with 2 years of experience in the technology industry."
    },
    "socialLinks": {
      "linkedin": "https://linkedin.com/in/kiara-goel",
      "github": "https://github.com/kiaragoel",
      "portfolio": "https://kiaragoel.dev"
    },
    "verification": {
      "emailVerified": true,
      "phoneVerified": false,
      "profileVerified": true
    },
    "createdAt": "2025-11-13T19:13:38.747Z",
    "updatedAt": "2025-11-13T19:13:38.747Z",
    "_class": "com.piemr.gradsync.entity.mongodb.User"
  },
  {
    "email": "saanvi.iyer@piemr.edu.in",
    "password": "student123",
    "firstName": "Saanvi",
    "lastName": "Iyer",
    "role": "ALUMNI",
    "status": "PENDING_VERIFICATION",
    "batchInfo": {
      "admissionYear": 2019,
      "graduationYear": 2023,
      "branch": "CIVIL",
      "rollNumber": "086323CIVIL005",
      "cgpa": 8.92
    },
    "professional": {
      "currentCompany": "Wipro",
      "designation": "Project Engineer",
      "currentSalary": 3.8,
      "workType": "FULL_TIME",
      "workLocation": "Pune, India",
      "experienceYears": 2,
      "skills": [
        "Structural Analysis",
        "AutoCAD",
        "Project Management"
      ]
    },
    "contact": {
      "phone": "+911472102526",
      "address": {
        "city": "Pune",
        "state": "India",
        "country": "India"
      }
    },
    "profile": {
      "profileImage": "http://localhost:8080/images/profiles/default_saanvi_iyer.jpeg",
      "bio": "Saanvi is a dedicated Project Engineer at Wipro with 2 years of experience in the technology industry."
    },
    "socialLinks": {
      "linkedin": "https://linkedin.com/in/saanvi-iyer",
      "github": "https://github.com/saanviiyer",
      "portfolio": "https://saanviiyer.dev"
    },
    "verification": {
      "emailVerified": true,
      "phoneVerified": false,
      "profileVerified": true
    },
    "createdAt": "2025-11-13T19:13:38.748Z",
    "updatedAt": "2025-11-13T19:13:38.748Z",
    "_class": "com.piemr.gradsync.entity.mongodb.User"
  },
  {
    "email": "pari.mishra@piemr.edu.in",
    "password": "student123",
    "firstName": "Pari",
    "lastName": "Mishra",
    "role": "ALUMNI",
    "status": "PENDING_VERIFICATION",
    "batchInfo": {
      "admissionYear": 2019,
      "graduationYear": 2023,
      "branch": "MECH",
      "rollNumber": "086323MECH006",
      "cgpa": 9.54
    },
    "professional": {
      "currentCompany": "Infosys",
      "designation": "System Engineer",
      "currentSalary": 4,
      "workType": "FULL_TIME",
      "workLocation": "Kolkata, India",
      "experienceYears": 2,
      "skills": [
        "Thermodynamics",
        "AutoCAD",
        "CATIA"
      ]
    },
    "contact": {
      "phone": "+917405716804",
      "address": {
        "city": "Kolkata",
        "state": "India",
        "country": "India"
      }
    },
    "profile": {
      "profileImage": "http://localhost:8080/images/profiles/default_pari_mishra.jpeg",
      "bio": "Pari is a dedicated System Engineer at Infosys with 2 years of experience in the technology industry."
    },
    "socialLinks": {
      "linkedin": "https://linkedin.com/in/pari-mishra",
      "github": "https://github.com/parimishra",
      "portfolio": "https://parimishra.dev"
    },
    "verification": {
      "emailVerified": true,
      "phoneVerified": false,
      "profileVerified": true
    },
    "createdAt": "2025-11-13T19:13:38.748Z",
    "updatedAt": "2025-11-13T19:13:38.748Z",
    "_class": "com.piemr.gradsync.entity.mongodb.User"
  },
  {
    "email": "ayaan.verma@piemr.edu.in",
    "password": "student123",
    "firstName": "Ayaan",
    "lastName": "Verma",
    "role": "ALUMNI",
    "status": "PENDING_VERIFICATION",
    "batchInfo": {
      "admissionYear": 2019,
      "graduationYear": 2023,
      "branch": "ECE",
      "rollNumber": "086323ECE007",
      "cgpa": 7.75
    },
    "professional": {
      "currentCompany": "Accenture",
      "designation": "Application Developer",
      "currentSalary": 4.5,
      "workType": "FULL_TIME",
      "workLocation": "Coimbatore, India",
      "experienceYears": 2,
      "skills": [
        "VLSI Design",
        "MATLAB",
        "Signal Processing",
        "Verilog"
      ]
    },
    "contact": {
      "phone": "+913774368242",
      "address": {
        "city": "Coimbatore",
        "state": "India",
        "country": "India"
      }
    },
    "profile": {
      "profileImage": "http://localhost:8080/images/profiles/default_ayaan_verma.jpeg",
      "bio": "Ayaan is a dedicated Application Developer at Accenture with 2 years of experience in the technology industry."
    },
    "socialLinks": {
      "linkedin": "https://linkedin.com/in/ayaan-verma",
      "github": "https://github.com/ayaanverma",
      "portfolio": "https://ayaanverma.dev"
    },
    "verification": {
      "emailVerified": true,
      "phoneVerified": false,
      "profileVerified": true
    },
    "createdAt": "2025-11-13T19:13:38.748Z",
    "updatedAt": "2025-11-13T19:13:38.748Z",
    "_class": "com.piemr.gradsync.entity.mongodb.User"
  },
  {
    "email": "reyansh.iyer@piemr.edu.in",
    "password": "student123",
    "firstName": "Reyansh",
    "lastName": "Iyer",
    "role": "ALUMNI",
    "status": "PENDING_VERIFICATION",
    "batchInfo": {
      "admissionYear": 2019,
      "graduationYear": 2023,
      "branch": "EEE",
      "rollNumber": "086323EEE008",
      "cgpa": 9.58
    },
    "professional": {
      "currentCompany": "Wipro",
      "designation": "Project Engineer",
      "currentSalary": 3.8,
      "workType": "FULL_TIME",
      "workLocation": "Ahmedabad, India",
      "experienceYears": 2,
      "skills": [
        "Power Systems",
        "PLC Programming",
        "Electrical Design"
      ]
    },
    "contact": {
      "phone": "+911104418284",
      "address": {
        "city": "Ahmedabad",
        "state": "India",
        "country": "India"
      }
    },
    "profile": {
      "profileImage": "http://localhost:8080/images/profiles/default_reyansh_iyer.jpeg",
      "bio": "Reyansh is a dedicated Project Engineer at Wipro with 2 years of experience in the technology industry."
    },
    "socialLinks": {
      "linkedin": "https://linkedin.com/in/reyansh-iyer",
      "github": "https://github.com/reyanshiyer",
      "portfolio": "https://reyanshiyer.dev"
    },
    "verification": {
      "emailVerified": false,
      "phoneVerified": true,
      "profileVerified": false
    },
    "createdAt": "2025-11-13T19:13:38.748Z",
    "updatedAt": "2025-11-13T19:13:38.748Z",
    "_class": "com.piemr.gradsync.entity.mongodb.User"
  },
  {
    "email": "myra.nair@piemr.edu.in",
    "password": "student123",
    "firstName": "Myra",
    "lastName": "Nair",
    "role": "ALUMNI",
    "status": "PENDING_VERIFICATION",
    "batchInfo": {
      "admissionYear": 2019,
      "graduationYear": 2023,
      "branch": "CSE",
      "rollNumber": "086323CSE009",
      "cgpa": 9.91
    },
    "professional": {
      "currentCompany": "Capgemini",
      "designation": "Analyst",
      "currentSalary": 4.1,
      "workType": "FULL_TIME",
      "workLocation": "Bangalore, India",
      "experienceYears": 2,
      "skills": [
        "AWS",
        "Node.js",
        "MySQL"
      ]
    },
    "contact": {
      "phone": "+919259568388",
      "address": {
        "city": "Bangalore",
        "state": "India",
        "country": "India"
      }
    },
    "profile": {
      "profileImage": "http://localhost:8080/images/profiles/default_myra_nair.jpeg",
      "bio": "Myra is a dedicated Analyst at Capgemini with 2 years of experience in the technology industry."
    },
    "socialLinks": {
      "linkedin": "https://linkedin.com/in/myra-nair",
      "github": "https://github.com/myranair",
      "portfolio": "https://myranair.dev"
    },
    "verification": {
      "emailVerified": false,
      "phoneVerified": true,
      "profileVerified": true
    },
    "createdAt": "2025-11-13T19:13:38.749Z",
    "updatedAt": "2025-11-13T19:13:38.749Z",
    "_class": "com.piemr.gradsync.entity.mongodb.User"
  },
  {
    "email": "shaurya.malhotra@piemr.edu.in",
    "password": "student123",
    "firstName": "Shaurya",
    "lastName": "Malhotra",
    "role": "ALUMNI",
    "status": "PENDING_VERIFICATION",
    "batchInfo": {
      "admissionYear": 2019,
      "graduationYear": 2023,
      "branch": "IT",
      "rollNumber": "086323IT010",
      "cgpa": 7.97
    },
    "professional": {
      "currentCompany": "Cognizant",
      "designation": "Programmer Analyst",
      "currentSalary": 4.2,
      "workType": "FULL_TIME",
      "workLocation": "Noida, India",
      "experienceYears": 2,
      "skills": [
        "C++",
        "Database Management",
        "Java",
        "Network Security"
      ]
    },
    "contact": {
      "phone": "+917111374623",
      "address": {
        "city": "Noida",
        "state": "India",
        "country": "India"
      }
    },
    "profile": {
      "profileImage": "http://localhost:8080/images/profiles/default_shaurya_malhotra.jpeg",
      "bio": "Shaurya is a dedicated Programmer Analyst at Cognizant with 2 years of experience in the technology industry."
    },
    "socialLinks": {
      "linkedin": "https://linkedin.com/in/shaurya-malhotra",
      "github": "https://github.com/shauryamalhotra",
      "portfolio": "https://shauryamalhotra.dev"
    },
    "verification": {
      "emailVerified": true,
      "phoneVerified": false,
      "profileVerified": false
    },
    "createdAt": "2025-11-13T19:13:38.749Z",
    "updatedAt": "2025-11-13T19:13:38.749Z",
    "_class": "com.piemr.gradsync.entity.mongodb.User"
  },
  {
    "email": "aarav.chopra@piemr.edu.in",
    "password": "student123",
    "firstName": "Aarav",
    "lastName": "Chopra",
    "role": "ALUMNI",
    "status": "PENDING_VERIFICATION",
    "batchInfo": {
      "admissionYear": 2019,
      "graduationYear": 2023,
      "branch": "ECE",
      "rollNumber": "086323ECE011",
      "cgpa": 7.01
    },
    "professional": {
      "currentCompany": "Cognizant",
      "designation": "Programmer Analyst",
      "currentSalary": 4.2,
      "workType": "FULL_TIME",
      "workLocation": "Pune, India",
      "experienceYears": 2,
      "skills": [
        "Embedded Systems",
        "MATLAB",
        "PCB Design"
      ]
    },
    "contact": {
      "phone": "+911143938451",
      "address": {
        "city": "Pune",
        "state": "India",
        "country": "India"
      }
    },
    "profile": {
      "profileImage": "http://localhost:8080/images/profiles/default_aarav_chopra.jpeg",
      "bio": "Aarav is a dedicated Programmer Analyst at Cognizant with 2 years of experience in the technology industry."
    },
    "socialLinks": {
      "linkedin": "https://linkedin.com/in/aarav-chopra",
      "github": "https://github.com/aaravchopra",
      "portfolio": "https://aaravchopra.dev"
    },
    "verification": {
      "emailVerified": true,
      "phoneVerified": false,
      "profileVerified": true
    },
    "createdAt": "2025-11-13T19:13:38.749Z",
    "updatedAt": "2025-11-13T19:13:38.749Z",
    "_class": "com.piemr.gradsync.entity.mongodb.User"
  },
  {
    "email": "ishaan.nair@piemr.edu.in",
    "password": "student123",
    "firstName": "Ishaan",
    "lastName": "Nair",
    "role": "ALUMNI",
    "status": "PENDING_VERIFICATION",
    "batchInfo": {
      "admissionYear": 2019,
      "graduationYear": 2023,
      "branch": "ECE",
      "rollNumber": "086323ECE012",
      "cgpa": 8.75
    },
    "professional": {
      "currentCompany": "Wipro",
      "designation": "Project Engineer",
      "currentSalary": 3.8,
      "workType": "FULL_TIME",
      "workLocation": "Ahmedabad, India",
      "experienceYears": 2,
      "skills": [
        "Embedded Systems",
        "PCB Design",
        "MATLAB"
      ]
    },
    "contact": {
      "phone": "+912095407844",
      "address": {
        "city": "Ahmedabad",
        "state": "India",
        "country": "India"
      }
    },
    "profile": {
      "profileImage": "http://localhost:8080/images/profiles/default_ishaan_nair.jpeg",
      "bio": "Ishaan is a dedicated Project Engineer at Wipro with 2 years of experience in the technology industry."
    },
    "socialLinks": {
      "linkedin": "https://linkedin.com/in/ishaan-nair",
      "github": "https://github.com/ishaannair",
      "portfolio": "https://ishaannair.dev"
    },
    "verification": {
      "emailVerified": true,
      "phoneVerified": false,
      "profileVerified": true
    },
    "createdAt": "2025-11-13T19:13:38.749Z",
    "updatedAt": "2025-11-13T19:13:38.749Z",
    "_class": "com.piemr.gradsync.entity.mongodb.User"
  },
  {
    "email": "saanvi.pandey@piemr.edu.in",
    "password": "student123",
    "firstName": "Saanvi",
    "lastName": "Pandey",
    "role": "ALUMNI",
    "status": "PENDING_VERIFICATION",
    "batchInfo": {
      "admissionYear": 2019,
      "graduationYear": 2023,
      "branch": "IT",
      "rollNumber": "086323IT013",
      "cgpa": 6.69
    },
    "professional": {
      "currentCompany": "HCL Technologies",
      "designation": "Software Developer",
      "currentSalary": 3.6,
      "workType": "FULL_TIME",
      "workLocation": "Delhi, India",
      "experienceYears": 2,
      "skills": [
        "Network Security",
        "Java",
        "System Administration",
        "C++"
      ]
    },
    "contact": {
      "phone": "+917161545632",
      "address": {
        "city": "Delhi",
        "state": "India",
        "country": "India"
      }
    },
    "profile": {
      "profileImage": "http://localhost:8080/images/profiles/default_saanvi_pandey.jpeg",
      "bio": "Saanvi is a dedicated Software Developer at HCL Technologies with 2 years of experience in the technology industry."
    },
    "socialLinks": {
      "linkedin": "https://linkedin.com/in/saanvi-pandey",
      "github": "https://github.com/saanvipandey",
      "portfolio": "https://saanvipandey.dev"
    },
    "verification": {
      "emailVerified": false,
      "phoneVerified": false,
      "profileVerified": false
    },
    "createdAt": "2025-11-13T19:13:38.749Z",
    "updatedAt": "2025-11-13T19:13:38.749Z",
    "_class": "com.piemr.gradsync.entity.mongodb.User"
  },
  {
    "email": "ayaan.iyer@piemr.edu.in",
    "password": "student123",
    "firstName": "Ayaan",
    "lastName": "Iyer",
    "role": "ALUMNI",
    "status": "PENDING_VERIFICATION",
    "batchInfo": {
      "admissionYear": 2019,
      "graduationYear": 2023,
      "branch": "ECE",
      "rollNumber": "086323ECE014",
      "cgpa": 7.15
    },
    "professional": {
      "currentCompany": "Capgemini",
      "designation": "Analyst",
      "currentSalary": 4.1,
      "workType": "FULL_TIME",
      "workLocation": "Chennai, India",
      "experienceYears": 2,
      "skills": [
        "Embedded Systems",
        "PCB Design",
        "Verilog"
      ]
    },
    "contact": {
      "phone": "+915710839754",
      "address": {
        "city": "Chennai",
        "state": "India",
        "country": "India"
      }
    },
    "profile": {
      "profileImage": "http://localhost:8080/images/profiles/default_ayaan_iyer.jpeg",
      "bio": "Ayaan is a dedicated Analyst at Capgemini with 2 years of experience in the technology industry."
    },
    "socialLinks": {
      "linkedin": "https://linkedin.com/in/ayaan-iyer",
      "github": "https://github.com/ayaaniyer",
      "portfolio": "https://ayaaniyer.dev"
    },
    "verification": {
      "emailVerified": true,
      "phoneVerified": false,
      "profileVerified": true
    },
    "createdAt": "2025-11-13T19:13:38.749Z",
    "updatedAt": "2025-11-13T19:13:38.749Z",
    "_class": "com.piemr.gradsync.entity.mongodb.User"
  },
  {
    "email": "vedant.nair@piemr.edu.in",
    "password": "student123",
    "firstName": "Vedant",
    "lastName": "Nair",
    "role": "ALUMNI",
    "status": "PENDING_VERIFICATION",
    "batchInfo": {
      "admissionYear": 2019,
      "graduationYear": 2023,
      "branch": "ECE",
      "rollNumber": "086323ECE015",
      "cgpa": 7.66
    },
    "professional": {
      "currentCompany": "Tech Mahindra",
      "designation": "Associate Software Engineer",
      "currentSalary": 3.7,
      "workType": "FULL_TIME",
      "workLocation": "Coimbatore, India",
      "experienceYears": 2,
      "skills": [
        "MATLAB",
        "PCB Design",
        "VLSI Design",
        "Verilog"
      ]
    },
    "contact": {
      "phone": "+913456727438",
      "address": {
        "city": "Coimbatore",
        "state": "India",
        "country": "India"
      }
    },
    "profile": {
      "profileImage": "http://localhost:8080/images/profiles/default_vedant_nair.jpeg",
      "bio": "Vedant is a dedicated Associate Software Engineer at Tech Mahindra with 2 years of experience in the technology industry."
    },
    "socialLinks": {
      "linkedin": "https://linkedin.com/in/vedant-nair",
      "github": "https://github.com/vedantnair",
      "portfolio": "https://vedantnair.dev"
    },
    "verification": {
      "emailVerified": true,
      "phoneVerified": true,
      "profileVerified": true
    },
    "createdAt": "2025-11-13T19:13:38.749Z",
    "updatedAt": "2025-11-13T19:13:38.749Z",
    "_class": "com.piemr.gradsync.entity.mongodb.User"
  },
  {
    "email": "diya.nair@piemr.edu.in",
    "password": "student123",
    "firstName": "Diya",
    "lastName": "Nair",
    "role": "ALUMNI",
    "status": "PENDING_VERIFICATION",
    "batchInfo": {
      "admissionYear": 2019,
      "graduationYear": 2023,
      "branch": "CIVIL",
      "rollNumber": "086323CIVIL016",
      "cgpa": 7
    },
    "professional": {
      "currentCompany": "TCS",
      "designation": "Software Engineer",
      "currentSalary": 3.5,
      "workType": "FULL_TIME",
      "workLocation": "Pune, India",
      "experienceYears": 2,
      "skills": [
        "Surveying",
        "Construction Management",
        "Structural Analysis",
        "AutoCAD"
      ]
    },
    "contact": {
      "phone": "+911824785479",
      "address": {
        "city": "Pune",
        "state": "India",
        "country": "India"
      }
    },
    "profile": {
      "profileImage": "http://localhost:8080/images/profiles/default_diya_nair.jpeg",
      "bio": "Diya is a dedicated Software Engineer at TCS with 2 years of experience in the technology industry."
    },
    "socialLinks": {
      "linkedin": "https://linkedin.com/in/diya-nair",
      "github": "https://github.com/diyanair",
      "portfolio": "https://diyanair.dev"
    },
    "verification": {
      "emailVerified": true,
      "phoneVerified": false,
      "profileVerified": false
    },
    "createdAt": "2025-11-13T19:13:38.749Z",
    "updatedAt": "2025-11-13T19:13:38.749Z",
    "_class": "com.piemr.gradsync.entity.mongodb.User"
  },
  {
    "email": "shaurya.bansal@piemr.edu.in",
    "password": "student123",
    "firstName": "Shaurya",
    "lastName": "Bansal",
    "role": "ALUMNI",
    "status": "PENDING_VERIFICATION",
    "batchInfo": {
      "admissionYear": 2019,
      "graduationYear": 2023,
      "branch": "CIVIL",
      "rollNumber": "086323CIVIL017",
      "cgpa": 9.14
    },
    "professional": {
      "currentCompany": "Wipro",
      "designation": "Project Engineer",
      "currentSalary": 3.8,
      "workType": "FULL_TIME",
      "workLocation": "Hyderabad, India",
      "experienceYears": 2,
      "skills": [
        "AutoCAD",
        "Surveying",
        "Construction Management",
        "Project Management"
      ]
    },
    "contact": {
      "phone": "+919493671625",
      "address": {
        "city": "Hyderabad",
        "state": "India",
        "country": "India"
      }
    },
    "profile": {
      "profileImage": "http://localhost:8080/images/profiles/default_shaurya_bansal.jpeg",
      "bio": "Shaurya is a dedicated Project Engineer at Wipro with 2 years of experience in the technology industry."
    },
    "socialLinks": {
      "linkedin": "https://linkedin.com/in/shaurya-bansal",
      "github": "https://github.com/shauryabansal",
      "portfolio": "https://shauryabansal.dev"
    },
    "verification": {
      "emailVerified": true,
      "phoneVerified": false,
      "profileVerified": true
    },
    "createdAt": "2025-11-13T19:13:38.749Z",
    "updatedAt": "2025-11-13T19:13:38.749Z",
    "_class": "com.piemr.gradsync.entity.mongodb.User"
  },
  {
    "email": "navya.rao@piemr.edu.in",
    "password": "student123",
    "firstName": "Navya",
    "lastName": "Rao",
    "role": "ALUMNI",
    "status": "PENDING_VERIFICATION",
    "batchInfo": {
      "admissionYear": 2019,
      "graduationYear": 2023,
      "branch": "ECE",
      "rollNumber": "086323ECE018",
      "cgpa": 8.22
    },
    "professional": {
      "currentCompany": "Wipro",
      "designation": "Project Engineer",
      "currentSalary": 3.8,
      "workType": "FULL_TIME",
      "workLocation": "Mumbai, India",
      "experienceYears": 2,
      "skills": [
        "VLSI Design",
        "Embedded Systems",
        "Signal Processing",
        "PCB Design",
        "Verilog"
      ]
    },
    "contact": {
      "phone": "+911080486824",
      "address": {
        "city": "Mumbai",
        "state": "India",
        "country": "India"
      }
    },
    "profile": {
      "profileImage": "http://localhost:8080/images/profiles/default_navya_rao.jpeg",
      "bio": "Navya is a dedicated Project Engineer at Wipro with 2 years of experience in the technology industry."
    },
    "socialLinks": {
      "linkedin": "https://linkedin.com/in/navya-rao",
      "github": "https://github.com/navyarao",
      "portfolio": "https://navyarao.dev"
    },
    "verification": {
      "emailVerified": true,
      "phoneVerified": false,
      "profileVerified": true
    },
    "createdAt": "2025-11-13T19:13:38.752Z",
    "updatedAt": "2025-11-13T19:13:38.752Z",
    "_class": "com.piemr.gradsync.entity.mongodb.User"
  },
  {
    "email": "aadhya.goel@piemr.edu.in",
    "password": "student123",
    "firstName": "Aadhya",
    "lastName": "Goel",
    "role": "ALUMNI",
    "status": "PENDING_VERIFICATION",
    "batchInfo": {
      "admissionYear": 2019,
      "graduationYear": 2023,
      "branch": "EEE",
      "rollNumber": "086323EEE019",
      "cgpa": 9.68
    },
    "professional": {
      "currentCompany": "HCL Technologies",
      "designation": "Software Developer",
      "currentSalary": 3.6,
      "workType": "FULL_TIME",
      "workLocation": "Pune, India",
      "experienceYears": 2,
      "skills": [
        "AutoCAD",
        "PLC Programming",
        "Electrical Design"
      ]
    },
    "contact": {
      "phone": "+913811420848",
      "address": {
        "city": "Pune",
        "state": "India",
        "country": "India"
      }
    },
    "profile": {
      "profileImage": "http://localhost:8080/images/profiles/default_aadhya_goel.jpeg",
      "bio": "Aadhya is a dedicated Software Developer at HCL Technologies with 2 years of experience in the technology industry."
    },
    "socialLinks": {
      "linkedin": "https://linkedin.com/in/aadhya-goel",
      "github": "https://github.com/aadhyagoel",
      "portfolio": "https://aadhyagoel.dev"
    },
    "verification": {
      "emailVerified": true,
      "phoneVerified": true,
      "profileVerified": true
    },
    "createdAt": "2025-11-13T19:13:38.752Z",
    "updatedAt": "2025-11-13T19:13:38.752Z",
    "_class": "com.piemr.gradsync.entity.mongodb.User"
  },
  {
    "email": "shaurya.malhotra@piemr.edu.in",
    "password": "student123",
    "firstName": "Shaurya",
    "lastName": "Malhotra",
    "role": "ALUMNI",
    "status": "PENDING_VERIFICATION",
    "batchInfo": {
      "admissionYear": 2019,
      "graduationYear": 2023,
      "branch": "EEE",
      "rollNumber": "086323EEE020",
      "cgpa": 9.81
    },
    "professional": {
      "currentCompany": "Wipro",
      "designation": "Project Engineer",
      "currentSalary": 3.8,
      "workType": "FULL_TIME",
      "workLocation": "Coimbatore, India",
      "experienceYears": 2,
      "skills": [
        "AutoCAD",
        "Electrical Design",
        "Control Systems",
        "Power Systems"
      ]
    },
    "contact": {
      "phone": "+918426486750",
      "address": {
        "city": "Coimbatore",
        "state": "India",
        "country": "India"
      }
    },
    "profile": {
      "profileImage": "http://localhost:8080/images/profiles/default_shaurya_malhotra.jpeg",
      "bio": "Shaurya is a dedicated Project Engineer at Wipro with 2 years of experience in the technology industry."
    },
    "socialLinks": {
      "linkedin": "https://linkedin.com/in/shaurya-malhotra",
      "github": "https://github.com/shauryamalhotra",
      "portfolio": "https://shauryamalhotra.dev"
    },
    "verification": {
      "emailVerified": true,
      "phoneVerified": true,
      "profileVerified": false
    },
    "createdAt": "2025-11-13T19:13:38.752Z",
    "updatedAt": "2025-11-13T19:13:38.752Z",
    "_class": "com.piemr.gradsync.entity.mongodb.User"
  }
]);

// Import 2024 batch alumni  
db.users.insertMany([
  {
    "email": "aarav.nair@piemr.edu.in",
    "password": "student123",
    "firstName": "Aarav",
    "lastName": "Nair",
    "role": "ALUMNI",
    "status": "PENDING_VERIFICATION",
    "batchInfo": {
      "admissionYear": 2020,
      "graduationYear": 2024,
      "branch": "ECE",
      "rollNumber": "086324ECE001",
      "cgpa": 6.23
    },
    "professional": {
      "currentCompany": "Microsoft",
      "designation": "Software Engineer",
      "currentSalary": 12,
      "workType": "FULL_TIME",
      "workLocation": "Gurgaon, India",
      "experienceYears": 1,
      "skills": [
        "VLSI Design",
        "Embedded Systems",
        "Signal Processing",
        "MATLAB"
      ]
    },
    "contact": {
      "phone": "+919875366470",
      "address": {
        "city": "Gurgaon",
        "state": "India",
        "country": "India"
      }
    },
    "profile": {
      "profileImage": "http://localhost:8080/images/profiles/default_aarav_nair.jpeg",
      "bio": "Aarav is a dedicated Software Engineer at Microsoft with 1 years of experience in the technology industry."
    },
    "socialLinks": {
      "linkedin": "https://linkedin.com/in/aarav-nair",
      "github": "https://github.com/aaravnair",
      "portfolio": "https://aaravnair.dev"
    },
    "verification": {
      "emailVerified": false,
      "phoneVerified": false,
      "profileVerified": false
    },
    "createdAt": "2025-11-13T19:13:38.752Z",
    "updatedAt": "2025-11-13T19:13:38.752Z",
    "_class": "com.piemr.gradsync.entity.mongodb.User"
  },
  {
    "email": "sai.agarwal@piemr.edu.in",
    "password": "student123",
    "firstName": "Sai",
    "lastName": "Agarwal",
    "role": "ALUMNI",
    "status": "PENDING_VERIFICATION",
    "batchInfo": {
      "admissionYear": 2020,
      "graduationYear": 2024,
      "branch": "CSE",
      "rollNumber": "086324CSE002",
      "cgpa": 7.88
    },
    "professional": {
      "currentCompany": "Swiggy",
      "designation": "Software Engineer",
      "currentSalary": 7.5,
      "workType": "FULL_TIME",
      "workLocation": "Ahmedabad, India",
      "experienceYears": 1,
      "skills": [
        "MongoDB",
        "Java"
      ]
    },
    "contact": {
      "phone": "+911525472273",
      "address": {
        "city": "Ahmedabad",
        "state": "India",
        "country": "India"
      }
    },
    "profile": {
      "profileImage": "http://localhost:8080/images/profiles/default_sai_agarwal.jpeg",
      "bio": "Sai is a dedicated Software Engineer at Swiggy with 1 years of experience in the technology industry."
    },
    "socialLinks": {
      "linkedin": "https://linkedin.com/in/sai-agarwal",
      "github": "https://github.com/saiagarwal",
      "portfolio": "https://saiagarwal.dev"
    },
    "verification": {
      "emailVerified": true,
      "phoneVerified": false,
      "profileVerified": true
    },
    "createdAt": "2025-11-13T19:13:38.752Z",
    "updatedAt": "2025-11-13T19:13:38.752Z",
    "_class": "com.piemr.gradsync.entity.mongodb.User"
  },
  {
    "email": "reyansh.mishra@piemr.edu.in",
    "password": "student123",
    "firstName": "Reyansh",
    "lastName": "Mishra",
    "role": "ALUMNI",
    "status": "PENDING_VERIFICATION",
    "batchInfo": {
      "admissionYear": 2020,
      "graduationYear": 2024,
      "branch": "IT",
      "rollNumber": "086324IT003",
      "cgpa": 6.45
    },
    "professional": {
      "currentCompany": "Ola",
      "designation": "Product Engineer",
      "currentSalary": 6.8,
      "workType": "FULL_TIME",
      "workLocation": "Chennai, India",
      "experienceYears": 1,
      "skills": [
        "C++",
        "Network Security",
        "Cloud Computing",
        "Database Management"
      ]
    },
    "contact": {
      "phone": "+914096704638",
      "address": {
        "city": "Chennai",
        "state": "India",
        "country": "India"
      }
    },
    "profile": {
      "profileImage": "http://localhost:8080/images/profiles/default_reyansh_mishra.jpeg",
      "bio": "Reyansh is a dedicated Product Engineer at Ola with 1 years of experience in the technology industry."
    },
    "socialLinks": {
      "linkedin": "https://linkedin.com/in/reyansh-mishra",
      "github": "https://github.com/reyanshmishra",
      "portfolio": "https://reyanshmishra.dev"
    },
    "verification": {
      "emailVerified": true,
      "phoneVerified": false,
      "profileVerified": true
    },
    "createdAt": "2025-11-13T19:13:38.752Z",
    "updatedAt": "2025-11-13T19:13:38.752Z",
    "_class": "com.piemr.gradsync.entity.mongodb.User"
  },
  {
    "email": "vihaan.agarwal@piemr.edu.in",
    "password": "student123",
    "firstName": "Vihaan",
    "lastName": "Agarwal",
    "role": "ALUMNI",
    "status": "PENDING_VERIFICATION",
    "batchInfo": {
      "admissionYear": 2020,
      "graduationYear": 2024,
      "branch": "IT",
      "rollNumber": "086324IT004",
      "cgpa": 6.09
    },
    "professional": {
      "currentCompany": "Flipkart",
      "designation": "Software Engineer",
      "currentSalary": 8.5,
      "workType": "FULL_TIME",
      "workLocation": "Pune, India",
      "experienceYears": 1,
      "skills": [
        "System Administration",
        "Network Security",
        "Database Management",
        "Java"
      ]
    },
    "contact": {
      "phone": "+911180886425",
      "address": {
        "city": "Pune",
        "state": "India",
        "country": "India"
      }
    },
    "profile": {
      "profileImage": "http://localhost:8080/images/profiles/default_vihaan_agarwal.jpeg",
      "bio": "Vihaan is a dedicated Software Engineer at Flipkart with 1 years of experience in the technology industry."
    },
    "socialLinks": {
      "linkedin": "https://linkedin.com/in/vihaan-agarwal",
      "github": "https://github.com/vihaanagarwal",
      "portfolio": "https://vihaanagarwal.dev"
    },
    "verification": {
      "emailVerified": false,
      "phoneVerified": false,
      "profileVerified": true
    },
    "createdAt": "2025-11-13T19:13:38.752Z",
    "updatedAt": "2025-11-13T19:13:38.752Z",
    "_class": "com.piemr.gradsync.entity.mongodb.User"
  },
  {
    "email": "diya.reddy@piemr.edu.in",
    "password": "student123",
    "firstName": "Diya",
    "lastName": "Reddy",
    "role": "ALUMNI",
    "status": "PENDING_VERIFICATION",
    "batchInfo": {
      "admissionYear": 2020,
      "graduationYear": 2024,
      "branch": "IT",
      "rollNumber": "086324IT005",
      "cgpa": 9.86
    },
    "professional": {
      "currentCompany": "Microsoft",
      "designation": "Software Engineer",
      "currentSalary": 12,
      "workType": "FULL_TIME",
      "workLocation": "Mumbai, India",
      "experienceYears": 1,
      "skills": [
        "System Administration",
        "Network Security",
        "Database Management",
        "C++"
      ]
    },
    "contact": {
      "phone": "+915673424560",
      "address": {
        "city": "Mumbai",
        "state": "India",
        "country": "India"
      }
    },
    "profile": {
      "profileImage": "http://localhost:8080/images/profiles/default_diya_reddy.jpeg",
      "bio": "Diya is a dedicated Software Engineer at Microsoft with 1 years of experience in the technology industry."
    },
    "socialLinks": {
      "linkedin": "https://linkedin.com/in/diya-reddy",
      "github": "https://github.com/diyareddy",
      "portfolio": "https://diyareddy.dev"
    },
    "verification": {
      "emailVerified": false,
      "phoneVerified": false,
      "profileVerified": true
    },
    "createdAt": "2025-11-13T19:13:38.752Z",
    "updatedAt": "2025-11-13T19:13:38.752Z",
    "_class": "com.piemr.gradsync.entity.mongodb.User"
  },
  {
    "email": "kabir.prasad@piemr.edu.in",
    "password": "student123",
    "firstName": "Kabir",
    "lastName": "Prasad",
    "role": "ALUMNI",
    "status": "PENDING_VERIFICATION",
    "batchInfo": {
      "admissionYear": 2020,
      "graduationYear": 2024,
      "branch": "CSE",
      "rollNumber": "086324CSE006",
      "cgpa": 6.32
    },
    "professional": {
      "currentCompany": "Paytm",
      "designation": "Backend Developer",
      "currentSalary": 7,
      "workType": "FULL_TIME",
      "workLocation": "Bangalore, India",
      "experienceYears": 1,
      "skills": [
        "Node.js",
        "MySQL",
        "React",
        "Java"
      ]
    },
    "contact": {
      "phone": "+911988467884",
      "address": {
        "city": "Bangalore",
        "state": "India",
        "country": "India"
      }
    },
    "profile": {
      "profileImage": "http://localhost:8080/images/profiles/default_kabir_prasad.jpeg",
      "bio": "Kabir is a dedicated Backend Developer at Paytm with 1 years of experience in the technology industry."
    },
    "socialLinks": {
      "linkedin": "https://linkedin.com/in/kabir-prasad",
      "github": "https://github.com/kabirprasad",
      "portfolio": "https://kabirprasad.dev"
    },
    "verification": {
      "emailVerified": true,
      "phoneVerified": true,
      "profileVerified": true
    },
    "createdAt": "2025-11-13T19:13:38.752Z",
    "updatedAt": "2025-11-13T19:13:38.752Z",
    "_class": "com.piemr.gradsync.entity.mongodb.User"
  },
  {
    "email": "vivaan.pandey@piemr.edu.in",
    "password": "student123",
    "firstName": "Vivaan",
    "lastName": "Pandey",
    "role": "ALUMNI",
    "status": "PENDING_VERIFICATION",
    "batchInfo": {
      "admissionYear": 2020,
      "graduationYear": 2024,
      "branch": "IT",
      "rollNumber": "086324IT007",
      "cgpa": 8.42
    },
    "professional": {
      "currentCompany": "Paytm",
      "designation": "Backend Developer",
      "currentSalary": 7,
      "workType": "FULL_TIME",
      "workLocation": "Gurgaon, India",
      "experienceYears": 1,
      "skills": [
        "System Administration",
        "C++"
      ]
    },
    "contact": {
      "phone": "+917665495120",
      "address": {
        "city": "Gurgaon",
        "state": "India",
        "country": "India"
      }
    },
    "profile": {
      "profileImage": "http://localhost:8080/images/profiles/default_vivaan_pandey.jpeg",
      "bio": "Vivaan is a dedicated Backend Developer at Paytm with 1 years of experience in the technology industry."
    },
    "socialLinks": {
      "linkedin": "https://linkedin.com/in/vivaan-pandey",
      "github": "https://github.com/vivaanpandey",
      "portfolio": "https://vivaanpandey.dev"
    },
    "verification": {
      "emailVerified": true,
      "phoneVerified": true,
      "profileVerified": true
    },
    "createdAt": "2025-11-13T19:13:38.752Z",
    "updatedAt": "2025-11-13T19:13:38.752Z",
    "_class": "com.piemr.gradsync.entity.mongodb.User"
  },
  {
    "email": "anika.patel@piemr.edu.in",
    "password": "student123",
    "firstName": "Anika",
    "lastName": "Patel",
    "role": "ALUMNI",
    "status": "PENDING_VERIFICATION",
    "batchInfo": {
      "admissionYear": 2020,
      "graduationYear": 2024,
      "branch": "ECE",
      "rollNumber": "086324ECE008",
      "cgpa": 8.56
    },
    "professional": {
      "currentCompany": "Flipkart",
      "designation": "Software Engineer",
      "currentSalary": 8.5,
      "workType": "FULL_TIME",
      "workLocation": "Chennai, India",
      "experienceYears": 1,
      "skills": [
        "Verilog",
        "Embedded Systems",
        "Signal Processing"
      ]
    },
    "contact": {
      "phone": "+914873877422",
      "address": {
        "city": "Chennai",
        "state": "India",
        "country": "India"
      }
    },
    "profile": {
      "profileImage": "http://localhost:8080/images/profiles/default_anika_patel.jpeg",
      "bio": "Anika is a dedicated Software Engineer at Flipkart with 1 years of experience in the technology industry."
    },
    "socialLinks": {
      "linkedin": "https://linkedin.com/in/anika-patel",
      "github": "https://github.com/anikapatel",
      "portfolio": "https://anikapatel.dev"
    },
    "verification": {
      "emailVerified": true,
      "phoneVerified": false,
      "profileVerified": false
    },
    "createdAt": "2025-11-13T19:13:38.752Z",
    "updatedAt": "2025-11-13T19:13:38.752Z",
    "_class": "com.piemr.gradsync.entity.mongodb.User"
  },
  {
    "email": "kiara.arora@piemr.edu.in",
    "password": "student123",
    "firstName": "Kiara",
    "lastName": "Arora",
    "role": "ALUMNI",
    "status": "PENDING_VERIFICATION",
    "batchInfo": {
      "admissionYear": 2020,
      "graduationYear": 2024,
      "branch": "CIVIL",
      "rollNumber": "086324CIVIL009",
      "cgpa": 8.37
    },
    "professional": {
      "currentCompany": "Microsoft",
      "designation": "Software Engineer",
      "currentSalary": 12,
      "workType": "FULL_TIME",
      "workLocation": "Kolkata, India",
      "experienceYears": 1,
      "skills": [
        "Structural Analysis",
        "Surveying",
        "Construction Management"
      ]
    },
    "contact": {
      "phone": "+919475078738",
      "address": {
        "city": "Kolkata",
        "state": "India",
        "country": "India"
      }
    },
    "profile": {
      "profileImage": "http://localhost:8080/images/profiles/default_kiara_arora.jpeg",
      "bio": "Kiara is a dedicated Software Engineer at Microsoft with 1 years of experience in the technology industry."
    },
    "socialLinks": {
      "linkedin": "https://linkedin.com/in/kiara-arora",
      "github": "https://github.com/kiaraarora",
      "portfolio": "https://kiaraarora.dev"
    },
    "verification": {
      "emailVerified": true,
      "phoneVerified": true,
      "profileVerified": true
    },
    "createdAt": "2025-11-13T19:13:38.752Z",
    "updatedAt": "2025-11-13T19:13:38.752Z",
    "_class": "com.piemr.gradsync.entity.mongodb.User"
  },
  {
    "email": "aadhya.kumar@piemr.edu.in",
    "password": "student123",
    "firstName": "Aadhya",
    "lastName": "Kumar",
    "role": "ALUMNI",
    "status": "PENDING_VERIFICATION",
    "batchInfo": {
      "admissionYear": 2020,
      "graduationYear": 2024,
      "branch": "CSE",
      "rollNumber": "086324CSE010",
      "cgpa": 9.37
    },
    "professional": {
      "currentCompany": "Google",
      "designation": "Software Developer",
      "currentSalary": 15,
      "workType": "FULL_TIME",
      "workLocation": "Pune, India",
      "experienceYears": 1,
      "skills": [
        "Java",
        "JavaScript",
        "React",
        "AWS"
      ]
    },
    "contact": {
      "phone": "+912048406387",
      "address": {
        "city": "Pune",
        "state": "India",
        "country": "India"
      }
    },
    "profile": {
      "profileImage": "http://localhost:8080/images/profiles/default_aadhya_kumar.jpeg",
      "bio": "Aadhya is a dedicated Software Developer at Google with 1 years of experience in the technology industry."
    },
    "socialLinks": {
      "linkedin": "https://linkedin.com/in/aadhya-kumar",
      "github": "https://github.com/aadhyakumar",
      "portfolio": "https://aadhyakumar.dev"
    },
    "verification": {
      "emailVerified": true,
      "phoneVerified": false,
      "profileVerified": true
    },
    "createdAt": "2025-11-13T19:13:38.752Z",
    "updatedAt": "2025-11-13T19:13:38.752Z",
    "_class": "com.piemr.gradsync.entity.mongodb.User"
  },
  {
    "email": "aadhya.rao@piemr.edu.in",
    "password": "student123",
    "firstName": "Aadhya",
    "lastName": "Rao",
    "role": "ALUMNI",
    "status": "PENDING_VERIFICATION",
    "batchInfo": {
      "admissionYear": 2020,
      "graduationYear": 2024,
      "branch": "CSE",
      "rollNumber": "086324CSE011",
      "cgpa": 8.56
    },
    "professional": {
      "currentCompany": "Ola",
      "designation": "Product Engineer",
      "currentSalary": 6.8,
      "workType": "FULL_TIME",
      "workLocation": "Coimbatore, India",
      "experienceYears": 1,
      "skills": [
        "React",
        "AWS",
        "MongoDB"
      ]
    },
    "contact": {
      "phone": "+912669549042",
      "address": {
        "city": "Coimbatore",
        "state": "India",
        "country": "India"
      }
    },
    "profile": {
      "profileImage": "http://localhost:8080/images/profiles/default_aadhya_rao.jpeg",
      "bio": "Aadhya is a dedicated Product Engineer at Ola with 1 years of experience in the technology industry."
    },
    "socialLinks": {
      "linkedin": "https://linkedin.com/in/aadhya-rao",
      "github": "https://github.com/aadhyarao",
      "portfolio": "https://aadhyarao.dev"
    },
    "verification": {
      "emailVerified": true,
      "phoneVerified": true,
      "profileVerified": false
    },
    "createdAt": "2025-11-13T19:13:38.752Z",
    "updatedAt": "2025-11-13T19:13:38.752Z",
    "_class": "com.piemr.gradsync.entity.mongodb.User"
  },
  {
    "email": "ishaan.nair@piemr.edu.in",
    "password": "student123",
    "firstName": "Ishaan",
    "lastName": "Nair",
    "role": "ALUMNI",
    "status": "PENDING_VERIFICATION",
    "batchInfo": {
      "admissionYear": 2020,
      "graduationYear": 2024,
      "branch": "CSE",
      "rollNumber": "086324CSE012",
      "cgpa": 9.27
    },
    "professional": {
      "currentCompany": "Paytm",
      "designation": "Backend Developer",
      "currentSalary": 7,
      "workType": "FULL_TIME",
      "workLocation": "Hyderabad, India",
      "experienceYears": 1,
      "skills": [
        "JavaScript",
        "MySQL",
        "React",
        "MongoDB"
      ]
    },
    "contact": {
      "phone": "+915809950026",
      "address": {
        "city": "Hyderabad",
        "state": "India",
        "country": "India"
      }
    },
    "profile": {
      "profileImage": "http://localhost:8080/images/profiles/default_ishaan_nair.jpeg",
      "bio": "Ishaan is a dedicated Backend Developer at Paytm with 1 years of experience in the technology industry."
    },
    "socialLinks": {
      "linkedin": "https://linkedin.com/in/ishaan-nair",
      "github": "https://github.com/ishaannair",
      "portfolio": "https://ishaannair.dev"
    },
    "verification": {
      "emailVerified": true,
      "phoneVerified": true,
      "profileVerified": true
    },
    "createdAt": "2025-11-13T19:13:38.752Z",
    "updatedAt": "2025-11-13T19:13:38.752Z",
    "_class": "com.piemr.gradsync.entity.mongodb.User"
  },
  {
    "email": "pari.singh@piemr.edu.in",
    "password": "student123",
    "firstName": "Pari",
    "lastName": "Singh",
    "role": "ALUMNI",
    "status": "PENDING_VERIFICATION",
    "batchInfo": {
      "admissionYear": 2020,
      "graduationYear": 2024,
      "branch": "CSE",
      "rollNumber": "086324CSE013",
      "cgpa": 8.6
    },
    "professional": {
      "currentCompany": "Flipkart",
      "designation": "Software Engineer",
      "currentSalary": 8.5,
      "workType": "FULL_TIME",
      "workLocation": "Pune, India",
      "experienceYears": 1,
      "skills": [
        "Java",
        "AWS",
        "MySQL",
        "Python"
      ]
    },
    "contact": {
      "phone": "+913006895235",
      "address": {
        "city": "Pune",
        "state": "India",
        "country": "India"
      }
    },
    "profile": {
      "profileImage": "http://localhost:8080/images/profiles/default_pari_singh.jpeg",
      "bio": "Pari is a dedicated Software Engineer at Flipkart with 1 years of experience in the technology industry."
    },
    "socialLinks": {
      "linkedin": "https://linkedin.com/in/pari-singh",
      "github": "https://github.com/parisingh",
      "portfolio": "https://parisingh.dev"
    },
    "verification": {
      "emailVerified": true,
      "phoneVerified": true,
      "profileVerified": true
    },
    "createdAt": "2025-11-13T19:13:38.752Z",
    "updatedAt": "2025-11-13T19:13:38.752Z",
    "_class": "com.piemr.gradsync.entity.mongodb.User"
  },
  {
    "email": "aadhya.nair@piemr.edu.in",
    "password": "student123",
    "firstName": "Aadhya",
    "lastName": "Nair",
    "role": "ALUMNI",
    "status": "PENDING_VERIFICATION",
    "batchInfo": {
      "admissionYear": 2020,
      "graduationYear": 2024,
      "branch": "CSE",
      "rollNumber": "086324CSE014",
      "cgpa": 7.44
    },
    "professional": {
      "currentCompany": "Flipkart",
      "designation": "Software Engineer",
      "currentSalary": 8.5,
      "workType": "FULL_TIME",
      "workLocation": "Delhi, India",
      "experienceYears": 1,
      "skills": [
        "AWS",
        "Python",
        "JavaScript",
        "React"
      ]
    },
    "contact": {
      "phone": "+919951975285",
      "address": {
        "city": "Delhi",
        "state": "India",
        "country": "India"
      }
    },
    "profile": {
      "profileImage": "http://localhost:8080/images/profiles/default_aadhya_nair.jpeg",
      "bio": "Aadhya is a dedicated Software Engineer at Flipkart with 1 years of experience in the technology industry."
    },
    "socialLinks": {
      "linkedin": "https://linkedin.com/in/aadhya-nair",
      "github": "https://github.com/aadhyanair",
      "portfolio": "https://aadhyanair.dev"
    },
    "verification": {
      "emailVerified": false,
      "phoneVerified": true,
      "profileVerified": true
    },
    "createdAt": "2025-11-13T19:13:38.753Z",
    "updatedAt": "2025-11-13T19:13:38.753Z",
    "_class": "com.piemr.gradsync.entity.mongodb.User"
  },
  {
    "email": "shaurya.malhotra@piemr.edu.in",
    "password": "student123",
    "firstName": "Shaurya",
    "lastName": "Malhotra",
    "role": "ALUMNI",
    "status": "PENDING_VERIFICATION",
    "batchInfo": {
      "admissionYear": 2020,
      "graduationYear": 2024,
      "branch": "EEE",
      "rollNumber": "086324EEE015",
      "cgpa": 6.43
    },
    "professional": {
      "currentCompany": "Google",
      "designation": "Software Developer",
      "currentSalary": 15,
      "workType": "FULL_TIME",
      "workLocation": "Kolkata, India",
      "experienceYears": 1,
      "skills": [
        "Electrical Design",
        "AutoCAD",
        "Control Systems",
        "Power Systems",
        "MATLAB"
      ]
    },
    "contact": {
      "phone": "+917801870270",
      "address": {
        "city": "Kolkata",
        "state": "India",
        "country": "India"
      }
    },
    "profile": {
      "profileImage": "http://localhost:8080/images/profiles/default_shaurya_malhotra.jpeg",
      "bio": "Shaurya is a dedicated Software Developer at Google with 1 years of experience in the technology industry."
    },
    "socialLinks": {
      "linkedin": "https://linkedin.com/in/shaurya-malhotra",
      "github": "https://github.com/shauryamalhotra",
      "portfolio": "https://shauryamalhotra.dev"
    },
    "verification": {
      "emailVerified": true,
      "phoneVerified": false,
      "profileVerified": false
    },
    "createdAt": "2025-11-13T19:13:38.753Z",
    "updatedAt": "2025-11-13T19:13:38.753Z",
    "_class": "com.piemr.gradsync.entity.mongodb.User"
  },
  {
    "email": "priya.sinha@piemr.edu.in",
    "password": "student123",
    "firstName": "Priya",
    "lastName": "Sinha",
    "role": "ALUMNI",
    "status": "PENDING_VERIFICATION",
    "batchInfo": {
      "admissionYear": 2020,
      "graduationYear": 2024,
      "branch": "ECE",
      "rollNumber": "086324ECE016",
      "cgpa": 7.59
    },
    "professional": {
      "currentCompany": "Microsoft",
      "designation": "Software Engineer",
      "currentSalary": 12,
      "workType": "FULL_TIME",
      "workLocation": "Noida, India",
      "experienceYears": 1,
      "skills": [
        "Signal Processing",
        "VLSI Design"
      ]
    },
    "contact": {
      "phone": "+918848801071",
      "address": {
        "city": "Noida",
        "state": "India",
        "country": "India"
      }
    },
    "profile": {
      "profileImage": "http://localhost:8080/images/profiles/default_priya_sinha.jpeg",
      "bio": "Priya is a dedicated Software Engineer at Microsoft with 1 years of experience in the technology industry."
    },
    "socialLinks": {
      "linkedin": "https://linkedin.com/in/priya-sinha",
      "github": "https://github.com/priyasinha",
      "portfolio": "https://priyasinha.dev"
    },
    "verification": {
      "emailVerified": true,
      "phoneVerified": true,
      "profileVerified": true
    },
    "createdAt": "2025-11-13T19:13:38.753Z",
    "updatedAt": "2025-11-13T19:13:38.753Z",
    "_class": "com.piemr.gradsync.entity.mongodb.User"
  },
  {
    "email": "ananya.jain@piemr.edu.in",
    "password": "student123",
    "firstName": "Ananya",
    "lastName": "Jain",
    "role": "ALUMNI",
    "status": "PENDING_VERIFICATION",
    "batchInfo": {
      "admissionYear": 2020,
      "graduationYear": 2024,
      "branch": "CIVIL",
      "rollNumber": "086324CIVIL017",
      "cgpa": 9.95
    },
    "professional": {
      "currentCompany": "Paytm",
      "designation": "Backend Developer",
      "currentSalary": 7,
      "workType": "FULL_TIME",
      "workLocation": "Kochi, India",
      "experienceYears": 1,
      "skills": [
        "Construction Management",
        "AutoCAD",
        "Project Management"
      ]
    },
    "contact": {
      "phone": "+918485573195",
      "address": {
        "city": "Kochi",
        "state": "India",
        "country": "India"
      }
    },
    "profile": {
      "profileImage": "http://localhost:8080/images/profiles/default_ananya_jain.jpeg",
      "bio": "Ananya is a dedicated Backend Developer at Paytm with 1 years of experience in the technology industry."
    },
    "socialLinks": {
      "linkedin": "https://linkedin.com/in/ananya-jain",
      "github": "https://github.com/ananyajain",
      "portfolio": "https://ananyajain.dev"
    },
    "verification": {
      "emailVerified": true,
      "phoneVerified": false,
      "profileVerified": false
    },
    "createdAt": "2025-11-13T19:13:38.753Z",
    "updatedAt": "2025-11-13T19:13:38.753Z",
    "_class": "com.piemr.gradsync.entity.mongodb.User"
  },
  {
    "email": "kavya.agarwal@piemr.edu.in",
    "password": "student123",
    "firstName": "Kavya",
    "lastName": "Agarwal",
    "role": "ALUMNI",
    "status": "PENDING_VERIFICATION",
    "batchInfo": {
      "admissionYear": 2020,
      "graduationYear": 2024,
      "branch": "MECH",
      "rollNumber": "086324MECH018",
      "cgpa": 7.28
    },
    "professional": {
      "currentCompany": "Swiggy",
      "designation": "Software Engineer",
      "currentSalary": 7.5,
      "workType": "FULL_TIME",
      "workLocation": "Noida, India",
      "experienceYears": 1,
      "skills": [
        "Thermodynamics",
        "Machine Design",
        "SolidWorks"
      ]
    },
    "contact": {
      "phone": "+919394451785",
      "address": {
        "city": "Noida",
        "state": "India",
        "country": "India"
      }
    },
    "profile": {
      "profileImage": "http://localhost:8080/images/profiles/default_kavya_agarwal.jpeg",
      "bio": "Kavya is a dedicated Software Engineer at Swiggy with 1 years of experience in the technology industry."
    },
    "socialLinks": {
      "linkedin": "https://linkedin.com/in/kavya-agarwal",
      "github": "https://github.com/kavyaagarwal",
      "portfolio": "https://kavyaagarwal.dev"
    },
    "verification": {
      "emailVerified": true,
      "phoneVerified": false,
      "profileVerified": true
    },
    "createdAt": "2025-11-13T19:13:38.753Z",
    "updatedAt": "2025-11-13T19:13:38.753Z",
    "_class": "com.piemr.gradsync.entity.mongodb.User"
  }
]);

// Import 2025 batch alumni
db.users.insertMany([
  {
    "email": "arjun.goel@piemr.edu.in",
    "password": "student123",
    "firstName": "Arjun",
    "lastName": "Goel",
    "role": "ALUMNI",
    "status": "PENDING_VERIFICATION",
    "batchInfo": {
      "admissionYear": 2021,
      "graduationYear": 2025,
      "branch": "EEE",
      "rollNumber": "086325EEE001",
      "cgpa": 9.55
    },
    "professional": {
      "currentCompany": "Apple",
      "designation": "iOS Developer",
      "currentSalary": 16,
      "workType": "FULL_TIME",
      "workLocation": "Kochi, India",
      "experienceYears": 0,
      "skills": [
        "AutoCAD",
        "PLC Programming",
        "MATLAB"
      ]
    },
    "contact": {
      "phone": "+911750967986",
      "address": {
        "city": "Kochi",
        "state": "India",
        "country": "India"
      }
    },
    "profile": {
      "profileImage": "http://localhost:8080/images/profiles/default_arjun_goel.jpeg",
      "bio": "Arjun is a dedicated iOS Developer at Apple with 0 years of experience in the technology industry."
    },
    "socialLinks": {
      "linkedin": "https://linkedin.com/in/arjun-goel",
      "github": "https://github.com/arjungoel",
      "portfolio": "https://arjungoel.dev"
    },
    "verification": {
      "emailVerified": true,
      "phoneVerified": false,
      "profileVerified": true
    },
    "createdAt": "2025-11-13T19:13:38.753Z",
    "updatedAt": "2025-11-13T19:13:38.753Z",
    "_class": "com.piemr.gradsync.entity.mongodb.User"
  },
  {
    "email": "aditya.nair@piemr.edu.in",
    "password": "student123",
    "firstName": "Aditya",
    "lastName": "Nair",
    "role": "ALUMNI",
    "status": "PENDING_VERIFICATION",
    "batchInfo": {
      "admissionYear": 2021,
      "graduationYear": 2025,
      "branch": "MECH",
      "rollNumber": "086325MECH002",
      "cgpa": 9.57
    },
    "professional": {
      "currentCompany": "Oracle",
      "designation": "Software Engineer",
      "currentSalary": 9.5,
      "workType": "FULL_TIME",
      "workLocation": "Mumbai, India",
      "experienceYears": 0,
      "skills": [
        "CATIA",
        "Manufacturing",
        "AutoCAD"
      ]
    },
    "contact": {
      "phone": "+915444917769",
      "address": {
        "city": "Mumbai",
        "state": "India",
        "country": "India"
      }
    },
    "profile": {
      "profileImage": "http://localhost:8080/images/profiles/default_aditya_nair.jpeg",
      "bio": "Aditya is a dedicated Software Engineer at Oracle with 0 years of experience in the technology industry."
    },
    "socialLinks": {
      "linkedin": "https://linkedin.com/in/aditya-nair",
      "github": "https://github.com/adityanair",
      "portfolio": "https://adityanair.dev"
    },
    "verification": {
      "emailVerified": true,
      "phoneVerified": true,
      "profileVerified": true
    },
    "createdAt": "2025-11-13T19:13:38.753Z",
    "updatedAt": "2025-11-13T19:13:38.753Z",
    "_class": "com.piemr.gradsync.entity.mongodb.User"
  },
  {
    "email": "vivaan.tiwari@piemr.edu.in",
    "password": "student123",
    "firstName": "Vivaan",
    "lastName": "Tiwari",
    "role": "ALUMNI",
    "status": "PENDING_VERIFICATION",
    "batchInfo": {
      "admissionYear": 2021,
      "graduationYear": 2025,
      "branch": "MECH",
      "rollNumber": "086325MECH003",
      "cgpa": 8.02
    },
    "professional": {
      "currentCompany": "Salesforce",
      "designation": "Cloud Engineer",
      "currentSalary": 10.5,
      "workType": "FULL_TIME",
      "workLocation": "Hyderabad, India",
      "experienceYears": 0,
      "skills": [
        "SolidWorks",
        "Machine Design",
        "Manufacturing",
        "Thermodynamics"
      ]
    },
    "contact": {
      "phone": "+916543819287",
      "address": {
        "city": "Hyderabad",
        "state": "India",
        "country": "India"
      }
    },
    "profile": {
      "profileImage": "http://localhost:8080/images/profiles/default_vivaan_tiwari.jpeg",
      "bio": "Vivaan is a dedicated Cloud Engineer at Salesforce with 0 years of experience in the technology industry."
    },
    "socialLinks": {
      "linkedin": "https://linkedin.com/in/vivaan-tiwari",
      "github": "https://github.com/vivaantiwari",
      "portfolio": "https://vivaantiwari.dev"
    },
    "verification": {
      "emailVerified": true,
      "phoneVerified": true,
      "profileVerified": true
    },
    "createdAt": "2025-11-13T19:13:38.753Z",
    "updatedAt": "2025-11-13T19:13:38.753Z",
    "_class": "com.piemr.gradsync.entity.mongodb.User"
  },
  {
    "email": "anika.saxena@piemr.edu.in",
    "password": "student123",
    "firstName": "Anika",
    "lastName": "Saxena",
    "role": "ALUMNI",
    "status": "PENDING_VERIFICATION",
    "batchInfo": {
      "admissionYear": 2021,
      "graduationYear": 2025,
      "branch": "CSE",
      "rollNumber": "086325CSE004",
      "cgpa": 8.05
    },
    "professional": {
      "currentCompany": "Apple",
      "designation": "iOS Developer",
      "currentSalary": 16,
      "workType": "FULL_TIME",
      "workLocation": "Gurgaon, India",
      "experienceYears": 0,
      "skills": [
        "MongoDB",
        "JavaScript",
        "MySQL",
        "React",
        "Python",
        "Node.js"
      ]
    },
    "contact": {
      "phone": "+915805459855",
      "address": {
        "city": "Gurgaon",
        "state": "India",
        "country": "India"
      }
    },
    "profile": {
      "profileImage": "http://localhost:8080/images/profiles/default_anika_saxena.jpeg",
      "bio": "Anika is a dedicated iOS Developer at Apple with 0 years of experience in the technology industry."
    },
    "socialLinks": {
      "linkedin": "https://linkedin.com/in/anika-saxena",
      "github": "https://github.com/anikasaxena",
      "portfolio": "https://anikasaxena.dev"
    },
    "verification": {
      "emailVerified": false,
      "phoneVerified": false,
      "profileVerified": false
    },
    "createdAt": "2025-11-13T19:13:38.753Z",
    "updatedAt": "2025-11-13T19:13:38.753Z",
    "_class": "com.piemr.gradsync.entity.mongodb.User"
  },
  {
    "email": "myra.prasad@piemr.edu.in",
    "password": "student123",
    "firstName": "Myra",
    "lastName": "Prasad",
    "role": "ALUMNI",
    "status": "PENDING_VERIFICATION",
    "batchInfo": {
      "admissionYear": 2021,
      "graduationYear": 2025,
      "branch": "EEE",
      "rollNumber": "086325EEE005",
      "cgpa": 7.36
    },
    "professional": {
      "currentCompany": "Netflix",
      "designation": "Backend Engineer",
      "currentSalary": 14,
      "workType": "FULL_TIME",
      "workLocation": "Noida, India",
      "experienceYears": 0,
      "skills": [
        "Power Systems",
        "AutoCAD",
        "Electrical Design",
        "PLC Programming",
        "Control Systems"
      ]
    },
    "contact": {
      "phone": "+914528426643",
      "address": {
        "city": "Noida",
        "state": "India",
        "country": "India"
      }
    },
    "profile": {
      "profileImage": "http://localhost:8080/images/profiles/default_myra_prasad.jpeg",
      "bio": "Myra is a dedicated Backend Engineer at Netflix with 0 years of experience in the technology industry."
    },
    "socialLinks": {
      "linkedin": "https://linkedin.com/in/myra-prasad",
      "github": "https://github.com/myraprasad",
      "portfolio": "https://myraprasad.dev"
    },
    "verification": {
      "emailVerified": true,
      "phoneVerified": false,
      "profileVerified": false
    },
    "createdAt": "2025-11-13T19:13:38.753Z",
    "updatedAt": "2025-11-13T19:13:38.753Z",
    "_class": "com.piemr.gradsync.entity.mongodb.User"
  },
  {
    "email": "ayaan.agarwal@piemr.edu.in",
    "password": "student123",
    "firstName": "Ayaan",
    "lastName": "Agarwal",
    "role": "ALUMNI",
    "status": "PENDING_VERIFICATION",
    "batchInfo": {
      "admissionYear": 2021,
      "graduationYear": 2025,
      "branch": "MECH",
      "rollNumber": "086325MECH006",
      "cgpa": 9.64
    },
    "professional": {
      "currentCompany": "Salesforce",
      "designation": "Cloud Engineer",
      "currentSalary": 10.5,
      "workType": "FULL_TIME",
      "workLocation": "Chennai, India",
      "experienceYears": 0,
      "skills": [
        "Manufacturing",
        "AutoCAD"
      ]
    },
    "contact": {
      "phone": "+915851377652",
      "address": {
        "city": "Chennai",
        "state": "India",
        "country": "India"
      }
    },
    "profile": {
      "profileImage": "http://localhost:8080/images/profiles/default_ayaan_agarwal.jpeg",
      "bio": "Ayaan is a dedicated Cloud Engineer at Salesforce with 0 years of experience in the technology industry."
    },
    "socialLinks": {
      "linkedin": "https://linkedin.com/in/ayaan-agarwal",
      "github": "https://github.com/ayaanagarwal",
      "portfolio": "https://ayaanagarwal.dev"
    },
    "verification": {
      "emailVerified": true,
      "phoneVerified": true,
      "profileVerified": false
    },
    "createdAt": "2025-11-13T19:13:38.753Z",
    "updatedAt": "2025-11-13T19:13:38.753Z",
    "_class": "com.piemr.gradsync.entity.mongodb.User"
  },
  {
    "email": "sai.kapoor@piemr.edu.in",
    "password": "student123",
    "firstName": "Sai",
    "lastName": "Kapoor",
    "role": "ALUMNI",
    "status": "PENDING_VERIFICATION",
    "batchInfo": {
      "admissionYear": 2021,
      "graduationYear": 2025,
      "branch": "ECE",
      "rollNumber": "086325ECE007",
      "cgpa": 9.01
    },
    "professional": {
      "currentCompany": "Salesforce",
      "designation": "Cloud Engineer",
      "currentSalary": 10.5,
      "workType": "FULL_TIME",
      "workLocation": "Hyderabad, India",
      "experienceYears": 0,
      "skills": [
        "MATLAB",
        "Signal Processing",
        "PCB Design",
        "Embedded Systems",
        "VLSI Design"
      ]
    },
    "contact": {
      "phone": "+912370847828",
      "address": {
        "city": "Hyderabad",
        "state": "India",
        "country": "India"
      }
    },
    "profile": {
      "profileImage": "http://localhost:8080/images/profiles/default_sai_kapoor.jpeg",
      "bio": "Sai is a dedicated Cloud Engineer at Salesforce with 0 years of experience in the technology industry."
    },
    "socialLinks": {
      "linkedin": "https://linkedin.com/in/sai-kapoor",
      "github": "https://github.com/saikapoor",
      "portfolio": "https://saikapoor.dev"
    },
    "verification": {
      "emailVerified": true,
      "phoneVerified": false,
      "profileVerified": false
    },
    "createdAt": "2025-11-13T19:13:38.753Z",
    "updatedAt": "2025-11-13T19:13:38.753Z",
    "_class": "com.piemr.gradsync.entity.mongodb.User"
  },
  {
    "email": "krishna.iyer@piemr.edu.in",
    "password": "student123",
    "firstName": "Krishna",
    "lastName": "Iyer",
    "role": "ALUMNI",
    "status": "PENDING_VERIFICATION",
    "batchInfo": {
      "admissionYear": 2021,
      "graduationYear": 2025,
      "branch": "IT",
      "rollNumber": "086325IT008",
      "cgpa": 8.59
    },
    "professional": {
      "currentCompany": "Meta",
      "designation": "Software Engineer",
      "currentSalary": 18,
      "workType": "FULL_TIME",
      "workLocation": "Pune, India",
      "experienceYears": 0,
      "skills": [
        "System Administration",
        "Database Management",
        "C++",
        "Cloud Computing"
      ]
    },
    "contact": {
      "phone": "+918767059679",
      "address": {
        "city": "Pune",
        "state": "India",
        "country": "India"
      }
    },
    "profile": {
      "profileImage": "http://localhost:8080/images/profiles/default_krishna_iyer.jpeg",
      "bio": "Krishna is a dedicated Software Engineer at Meta with 0 years of experience in the technology industry."
    },
    "socialLinks": {
      "linkedin": "https://linkedin.com/in/krishna-iyer",
      "github": "https://github.com/krishnaiyer",
      "portfolio": "https://krishnaiyer.dev"
    },
    "verification": {
      "emailVerified": true,
      "phoneVerified": false,
      "profileVerified": true
    },
    "createdAt": "2025-11-13T19:13:38.753Z",
    "updatedAt": "2025-11-13T19:13:38.753Z",
    "_class": "com.piemr.gradsync.entity.mongodb.User"
  },
  {
    "email": "diya.malhotra@piemr.edu.in",
    "password": "student123",
    "firstName": "Diya",
    "lastName": "Malhotra",
    "role": "ALUMNI",
    "status": "PENDING_VERIFICATION",
    "batchInfo": {
      "admissionYear": 2021,
      "graduationYear": 2025,
      "branch": "CSE",
      "rollNumber": "086325CSE009",
      "cgpa": 7.81
    },
    "professional": {
      "currentCompany": "Adobe",
      "designation": "Software Developer",
      "currentSalary": 11,
      "workType": "FULL_TIME",
      "workLocation": "Noida, India",
      "experienceYears": 0,
      "skills": [
        "Java",
        "Python",
        "Node.js",
        "React",
        "MongoDB",
        "MySQL"
      ]
    },
    "contact": {
      "phone": "+919974506695",
      "address": {
        "city": "Noida",
        "state": "India",
        "country": "India"
      }
    },
    "profile": {
      "profileImage": "http://localhost:8080/images/profiles/default_diya_malhotra.jpeg",
      "bio": "Diya is a dedicated Software Developer at Adobe with 0 years of experience in the technology industry."
    },
    "socialLinks": {
      "linkedin": "https://linkedin.com/in/diya-malhotra",
      "github": "https://github.com/diyamalhotra",
      "portfolio": "https://diyamalhotra.dev"
    },
    "verification": {
      "emailVerified": false,
      "phoneVerified": true,
      "profileVerified": false
    },
    "createdAt": "2025-11-13T19:13:38.753Z",
    "updatedAt": "2025-11-13T19:13:38.753Z",
    "_class": "com.piemr.gradsync.entity.mongodb.User"
  },
  {
    "email": "myra.reddy@piemr.edu.in",
    "password": "student123",
    "firstName": "Myra",
    "lastName": "Reddy",
    "role": "ALUMNI",
    "status": "PENDING_VERIFICATION",
    "batchInfo": {
      "admissionYear": 2021,
      "graduationYear": 2025,
      "branch": "ECE",
      "rollNumber": "086325ECE010",
      "cgpa": 8.84
    },
    "professional": {
      "currentCompany": "Apple",
      "designation": "iOS Developer",
      "currentSalary": 16,
      "workType": "FULL_TIME",
      "workLocation": "Kolkata, India",
      "experienceYears": 0,
      "skills": [
        "Verilog",
        "MATLAB"
      ]
    },
    "contact": {
      "phone": "+913558522116",
      "address": {
        "city": "Kolkata",
        "state": "India",
        "country": "India"
      }
    },
    "profile": {
      "profileImage": "http://localhost:8080/images/profiles/default_myra_reddy.jpeg",
      "bio": "Myra is a dedicated iOS Developer at Apple with 0 years of experience in the technology industry."
    },
    "socialLinks": {
      "linkedin": "https://linkedin.com/in/myra-reddy",
      "github": "https://github.com/myrareddy",
      "portfolio": "https://myrareddy.dev"
    },
    "verification": {
      "emailVerified": true,
      "phoneVerified": true,
      "profileVerified": false
    },
    "createdAt": "2025-11-13T19:13:38.753Z",
    "updatedAt": "2025-11-13T19:13:38.753Z",
    "_class": "com.piemr.gradsync.entity.mongodb.User"
  },
  {
    "email": "avni.mishra@piemr.edu.in",
    "password": "student123",
    "firstName": "Avni",
    "lastName": "Mishra",
    "role": "ALUMNI",
    "status": "PENDING_VERIFICATION",
    "batchInfo": {
      "admissionYear": 2021,
      "graduationYear": 2025,
      "branch": "EEE",
      "rollNumber": "086325EEE011",
      "cgpa": 8.06
    },
    "professional": {
      "currentCompany": "IBM",
      "designation": "Full Stack Developer",
      "currentSalary": 8,
      "workType": "FULL_TIME",
      "workLocation": "Ahmedabad, India",
      "experienceYears": 0,
      "skills": [
        "PLC Programming",
        "Electrical Design",
        "AutoCAD"
      ]
    },
    "contact": {
      "phone": "+912655832030",
      "address": {
        "city": "Ahmedabad",
        "state": "India",
        "country": "India"
      }
    },
    "profile": {
      "profileImage": "http://localhost:8080/images/profiles/default_avni_mishra.jpeg",
      "bio": "Avni is a dedicated Full Stack Developer at IBM with 0 years of experience in the technology industry."
    },
    "socialLinks": {
      "linkedin": "https://linkedin.com/in/avni-mishra",
      "github": "https://github.com/avnimishra",
      "portfolio": "https://avnimishra.dev"
    },
    "verification": {
      "emailVerified": true,
      "phoneVerified": false,
      "profileVerified": false
    },
    "createdAt": "2025-11-13T19:13:38.753Z",
    "updatedAt": "2025-11-13T19:13:38.753Z",
    "_class": "com.piemr.gradsync.entity.mongodb.User"
  },
  {
    "email": "arjun.pandey@piemr.edu.in",
    "password": "student123",
    "firstName": "Arjun",
    "lastName": "Pandey",
    "role": "ALUMNI",
    "status": "PENDING_VERIFICATION",
    "batchInfo": {
      "admissionYear": 2021,
      "graduationYear": 2025,
      "branch": "ECE",
      "rollNumber": "086325ECE012",
      "cgpa": 8.69
    },
    "professional": {
      "currentCompany": "Meta",
      "designation": "Software Engineer",
      "currentSalary": 18,
      "workType": "FULL_TIME",
      "workLocation": "Hyderabad, India",
      "experienceYears": 0,
      "skills": [
        "VLSI Design",
        "Verilog",
        "Embedded Systems"
      ]
    },
    "contact": {
      "phone": "+919672032106",
      "address": {
        "city": "Hyderabad",
        "state": "India",
        "country": "India"
      }
    },
    "profile": {
      "profileImage": "http://localhost:8080/images/profiles/default_arjun_pandey.jpeg",
      "bio": "Arjun is a dedicated Software Engineer at Meta with 0 years of experience in the technology industry."
    },
    "socialLinks": {
      "linkedin": "https://linkedin.com/in/arjun-pandey",
      "github": "https://github.com/arjunpandey",
      "portfolio": "https://arjunpandey.dev"
    },
    "verification": {
      "emailVerified": true,
      "phoneVerified": false,
      "profileVerified": false
    },
    "createdAt": "2025-11-13T19:13:38.753Z",
    "updatedAt": "2025-11-13T19:13:38.753Z",
    "_class": "com.piemr.gradsync.entity.mongodb.User"
  },
  {
    "email": "advait.agarwal@piemr.edu.in",
    "password": "student123",
    "firstName": "Advait",
    "lastName": "Agarwal",
    "role": "ALUMNI",
    "status": "PENDING_VERIFICATION",
    "batchInfo": {
      "admissionYear": 2021,
      "graduationYear": 2025,
      "branch": "CIVIL",
      "rollNumber": "086325CIVIL013",
      "cgpa": 8.63
    },
    "professional": {
      "currentCompany": "Salesforce",
      "designation": "Cloud Engineer",
      "currentSalary": 10.5,
      "workType": "FULL_TIME",
      "workLocation": "Gurgaon, India",
      "experienceYears": 0,
      "skills": [
        "Project Management",
        "Construction Management",
        "AutoCAD"
      ]
    },
    "contact": {
      "phone": "+919083900645",
      "address": {
        "city": "Gurgaon",
        "state": "India",
        "country": "India"
      }
    },
    "profile": {
      "profileImage": "http://localhost:8080/images/profiles/default_advait_agarwal.jpeg",
      "bio": "Advait is a dedicated Cloud Engineer at Salesforce with 0 years of experience in the technology industry."
    },
    "socialLinks": {
      "linkedin": "https://linkedin.com/in/advait-agarwal",
      "github": "https://github.com/advaitagarwal",
      "portfolio": "https://advaitagarwal.dev"
    },
    "verification": {
      "emailVerified": true,
      "phoneVerified": false,
      "profileVerified": true
    },
    "createdAt": "2025-11-13T19:13:38.753Z",
    "updatedAt": "2025-11-13T19:13:38.753Z",
    "_class": "com.piemr.gradsync.entity.mongodb.User"
  },
  {
    "email": "saanvi.pandey@piemr.edu.in",
    "password": "student123",
    "firstName": "Saanvi",
    "lastName": "Pandey",
    "role": "ALUMNI",
    "status": "PENDING_VERIFICATION",
    "batchInfo": {
      "admissionYear": 2021,
      "graduationYear": 2025,
      "branch": "EEE",
      "rollNumber": "086325EEE014",
      "cgpa": 6.51
    },
    "professional": {
      "currentCompany": "IBM",
      "designation": "Full Stack Developer",
      "currentSalary": 8,
      "workType": "FULL_TIME",
      "workLocation": "Delhi, India",
      "experienceYears": 0,
      "skills": [
        "Control Systems",
        "PLC Programming",
        "Power Systems",
        "Electrical Design"
      ]
    },
    "contact": {
      "phone": "+911331859660",
      "address": {
        "city": "Delhi",
        "state": "India",
        "country": "India"
      }
    },
    "profile": {
      "profileImage": "http://localhost:8080/images/profiles/default_saanvi_pandey.jpeg",
      "bio": "Saanvi is a dedicated Full Stack Developer at IBM with 0 years of experience in the technology industry."
    },
    "socialLinks": {
      "linkedin": "https://linkedin.com/in/saanvi-pandey",
      "github": "https://github.com/saanvipandey",
      "portfolio": "https://saanvipandey.dev"
    },
    "verification": {
      "emailVerified": true,
      "phoneVerified": true,
      "profileVerified": true
    },
    "createdAt": "2025-11-13T19:13:38.753Z",
    "updatedAt": "2025-11-13T19:13:38.753Z",
    "_class": "com.piemr.gradsync.entity.mongodb.User"
  },
  {
    "email": "anika.pandey@piemr.edu.in",
    "password": "student123",
    "firstName": "Anika",
    "lastName": "Pandey",
    "role": "ALUMNI",
    "status": "PENDING_VERIFICATION",
    "batchInfo": {
      "admissionYear": 2021,
      "graduationYear": 2025,
      "branch": "CSE",
      "rollNumber": "086325CSE015",
      "cgpa": 9.23
    },
    "professional": {
      "currentCompany": "Netflix",
      "designation": "Backend Engineer",
      "currentSalary": 14,
      "workType": "FULL_TIME",
      "workLocation": "Pune, India",
      "experienceYears": 0,
      "skills": [
        "JavaScript",
        "React"
      ]
    },
    "contact": {
      "phone": "+912502662721",
      "address": {
        "city": "Pune",
        "state": "India",
        "country": "India"
      }
    },
    "profile": {
      "profileImage": "http://localhost:8080/images/profiles/default_anika_pandey.jpeg",
      "bio": "Anika is a dedicated Backend Engineer at Netflix with 0 years of experience in the technology industry."
    },
    "socialLinks": {
      "linkedin": "https://linkedin.com/in/anika-pandey",
      "github": "https://github.com/anikapandey",
      "portfolio": "https://anikapandey.dev"
    },
    "verification": {
      "emailVerified": true,
      "phoneVerified": true,
      "profileVerified": false
    },
    "createdAt": "2025-11-13T19:13:38.753Z",
    "updatedAt": "2025-11-13T19:13:38.753Z",
    "_class": "com.piemr.gradsync.entity.mongodb.User"
  },
  {
    "email": "aditya.jain@piemr.edu.in",
    "password": "student123",
    "firstName": "Aditya",
    "lastName": "Jain",
    "role": "ALUMNI",
    "status": "PENDING_VERIFICATION",
    "batchInfo": {
      "admissionYear": 2021,
      "graduationYear": 2025,
      "branch": "IT",
      "rollNumber": "086325IT016",
      "cgpa": 8.92
    },
    "professional": {
      "currentCompany": "Meta",
      "designation": "Software Engineer",
      "currentSalary": 18,
      "workType": "FULL_TIME",
      "workLocation": "Noida, India",
      "experienceYears": 0,
      "skills": [
        "Network Security",
        "Database Management",
        "Cloud Computing"
      ]
    },
    "contact": {
      "phone": "+914523214601",
      "address": {
        "city": "Noida",
        "state": "India",
        "country": "India"
      }
    },
    "profile": {
      "profileImage": "http://localhost:8080/images/profiles/default_aditya_jain.jpeg",
      "bio": "Aditya is a dedicated Software Engineer at Meta with 0 years of experience in the technology industry."
    },
    "socialLinks": {
      "linkedin": "https://linkedin.com/in/aditya-jain",
      "github": "https://github.com/adityajain",
      "portfolio": "https://adityajain.dev"
    },
    "verification": {
      "emailVerified": true,
      "phoneVerified": true,
      "profileVerified": true
    },
    "createdAt": "2025-11-13T19:13:38.753Z",
    "updatedAt": "2025-11-13T19:13:38.753Z",
    "_class": "com.piemr.gradsync.entity.mongodb.User"
  }
]);

// Create batch statistics for each year and branch

// Insert batch statistics for 2023 EEE
db.batches.insertOne({
    "graduationYear": 2023,
    "admissionYear": 2019,
    "branch": "EEE",
    "totalStudents": 5,
    "placedStudents": 5,
    "averagePackage": 3.80,
    "placementPercentage": 100.00,
    "isActive": true,
    "createdAt": new Date(),
    "updatedAt": new Date(),
    "_class": "com.piemr.gradsync.entity.mongodb.Batch"
});

// Insert batch statistics for 2023 MECH
db.batches.insertOne({
    "graduationYear": 2023,
    "admissionYear": 2019,
    "branch": "MECH",
    "totalStudents": 2,
    "placedStudents": 2,
    "averagePackage": 3.75,
    "placementPercentage": 100.00,
    "isActive": true,
    "createdAt": new Date(),
    "updatedAt": new Date(),
    "_class": "com.piemr.gradsync.entity.mongodb.Batch"
});

// Insert batch statistics for 2023 CIVIL
db.batches.insertOne({
    "graduationYear": 2023,
    "admissionYear": 2019,
    "branch": "CIVIL",
    "totalStudents": 4,
    "placedStudents": 4,
    "averagePackage": 3.72,
    "placementPercentage": 100.00,
    "isActive": true,
    "createdAt": new Date(),
    "updatedAt": new Date(),
    "_class": "com.piemr.gradsync.entity.mongodb.Batch"
});

// Insert batch statistics for 2023 ECE
db.batches.insertOne({
    "graduationYear": 2023,
    "admissionYear": 2019,
    "branch": "ECE",
    "totalStudents": 6,
    "placedStudents": 6,
    "averagePackage": 4.02,
    "placementPercentage": 100.00,
    "isActive": true,
    "createdAt": new Date(),
    "updatedAt": new Date(),
    "_class": "com.piemr.gradsync.entity.mongodb.Batch"
});

// Insert batch statistics for 2023 CSE
db.batches.insertOne({
    "graduationYear": 2023,
    "admissionYear": 2019,
    "branch": "CSE",
    "totalStudents": 1,
    "placedStudents": 1,
    "averagePackage": 4.10,
    "placementPercentage": 100.00,
    "isActive": true,
    "createdAt": new Date(),
    "updatedAt": new Date(),
    "_class": "com.piemr.gradsync.entity.mongodb.Batch"
});

// Insert batch statistics for 2023 IT
db.batches.insertOne({
    "graduationYear": 2023,
    "admissionYear": 2019,
    "branch": "IT",
    "totalStudents": 2,
    "placedStudents": 2,
    "averagePackage": 3.90,
    "placementPercentage": 100.00,
    "isActive": true,
    "createdAt": new Date(),
    "updatedAt": new Date(),
    "_class": "com.piemr.gradsync.entity.mongodb.Batch"
});


// Insert batch statistics for 2024 ECE
db.batches.insertOne({
    "graduationYear": 2024,
    "admissionYear": 2020,
    "branch": "ECE",
    "totalStudents": 3,
    "placedStudents": 3,
    "averagePackage": 10.83,
    "placementPercentage": 100.00,
    "isActive": true,
    "createdAt": new Date(),
    "updatedAt": new Date(),
    "_class": "com.piemr.gradsync.entity.mongodb.Batch"
});

// Insert batch statistics for 2024 CSE
db.batches.insertOne({
    "graduationYear": 2024,
    "admissionYear": 2020,
    "branch": "CSE",
    "totalStudents": 7,
    "placedStudents": 7,
    "averagePackage": 8.61,
    "placementPercentage": 100.00,
    "isActive": true,
    "createdAt": new Date(),
    "updatedAt": new Date(),
    "_class": "com.piemr.gradsync.entity.mongodb.Batch"
});

// Insert batch statistics for 2024 IT
db.batches.insertOne({
    "graduationYear": 2024,
    "admissionYear": 2020,
    "branch": "IT",
    "totalStudents": 4,
    "placedStudents": 4,
    "averagePackage": 8.57,
    "placementPercentage": 100.00,
    "isActive": true,
    "createdAt": new Date(),
    "updatedAt": new Date(),
    "_class": "com.piemr.gradsync.entity.mongodb.Batch"
});

// Insert batch statistics for 2024 CIVIL
db.batches.insertOne({
    "graduationYear": 2024,
    "admissionYear": 2020,
    "branch": "CIVIL",
    "totalStudents": 2,
    "placedStudents": 2,
    "averagePackage": 9.50,
    "placementPercentage": 100.00,
    "isActive": true,
    "createdAt": new Date(),
    "updatedAt": new Date(),
    "_class": "com.piemr.gradsync.entity.mongodb.Batch"
});

// Insert batch statistics for 2024 EEE
db.batches.insertOne({
    "graduationYear": 2024,
    "admissionYear": 2020,
    "branch": "EEE",
    "totalStudents": 1,
    "placedStudents": 1,
    "averagePackage": 15.00,
    "placementPercentage": 100.00,
    "isActive": true,
    "createdAt": new Date(),
    "updatedAt": new Date(),
    "_class": "com.piemr.gradsync.entity.mongodb.Batch"
});

// Insert batch statistics for 2024 MECH
db.batches.insertOne({
    "graduationYear": 2024,
    "admissionYear": 2020,
    "branch": "MECH",
    "totalStudents": 1,
    "placedStudents": 1,
    "averagePackage": 7.50,
    "placementPercentage": 100.00,
    "isActive": true,
    "createdAt": new Date(),
    "updatedAt": new Date(),
    "_class": "com.piemr.gradsync.entity.mongodb.Batch"
});


// Insert batch statistics for 2025 EEE
db.batches.insertOne({
    "graduationYear": 2025,
    "admissionYear": 2021,
    "branch": "EEE",
    "totalStudents": 4,
    "placedStudents": 4,
    "averagePackage": 11.50,
    "placementPercentage": 100.00,
    "isActive": true,
    "createdAt": new Date(),
    "updatedAt": new Date(),
    "_class": "com.piemr.gradsync.entity.mongodb.Batch"
});

// Insert batch statistics for 2025 MECH
db.batches.insertOne({
    "graduationYear": 2025,
    "admissionYear": 2021,
    "branch": "MECH",
    "totalStudents": 3,
    "placedStudents": 3,
    "averagePackage": 10.17,
    "placementPercentage": 100.00,
    "isActive": true,
    "createdAt": new Date(),
    "updatedAt": new Date(),
    "_class": "com.piemr.gradsync.entity.mongodb.Batch"
});

// Insert batch statistics for 2025 CSE
db.batches.insertOne({
    "graduationYear": 2025,
    "admissionYear": 2021,
    "branch": "CSE",
    "totalStudents": 3,
    "placedStudents": 3,
    "averagePackage": 13.67,
    "placementPercentage": 100.00,
    "isActive": true,
    "createdAt": new Date(),
    "updatedAt": new Date(),
    "_class": "com.piemr.gradsync.entity.mongodb.Batch"
});

// Insert batch statistics for 2025 ECE
db.batches.insertOne({
    "graduationYear": 2025,
    "admissionYear": 2021,
    "branch": "ECE",
    "totalStudents": 3,
    "placedStudents": 3,
    "averagePackage": 14.83,
    "placementPercentage": 100.00,
    "isActive": true,
    "createdAt": new Date(),
    "updatedAt": new Date(),
    "_class": "com.piemr.gradsync.entity.mongodb.Batch"
});

// Insert batch statistics for 2025 IT
db.batches.insertOne({
    "graduationYear": 2025,
    "admissionYear": 2021,
    "branch": "IT",
    "totalStudents": 2,
    "placedStudents": 2,
    "averagePackage": 18.00,
    "placementPercentage": 100.00,
    "isActive": true,
    "createdAt": new Date(),
    "updatedAt": new Date(),
    "_class": "com.piemr.gradsync.entity.mongodb.Batch"
});

// Insert batch statistics for 2025 CIVIL
db.batches.insertOne({
    "graduationYear": 2025,
    "admissionYear": 2021,
    "branch": "CIVIL",
    "totalStudents": 1,
    "placedStudents": 1,
    "averagePackage": 10.50,
    "placementPercentage": 100.00,
    "isActive": true,
    "createdAt": new Date(),
    "updatedAt": new Date(),
    "_class": "com.piemr.gradsync.entity.mongodb.Batch"
});


print("Successfully imported alumni data for batches 2023, 2024, and 2025!");
print("Total alumni imported: 54");
print("2023 batch: 20 alumni");
print("2024 batch: 18 alumni");
print("2025 batch: 16 alumni");
