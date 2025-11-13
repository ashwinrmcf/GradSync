/**
 * Script to create alumni data for multiple batch years (2023, 2024, 2025)
 * This script generates sample alumni data in the MongoDB format for different batches
 */

const fs = require('fs');
const path = require('path');

// Sample companies for different years
const companies2023 = [
    { name: "TCS", designation: "Software Engineer", salary: 3.5 },
    { name: "Infosys", designation: "System Engineer", salary: 4.0 },
    { name: "Wipro", designation: "Project Engineer", salary: 3.8 },
    { name: "Cognizant", designation: "Programmer Analyst", salary: 4.2 },
    { name: "Accenture", designation: "Application Developer", salary: 4.5 },
    { name: "HCL Technologies", designation: "Software Developer", salary: 3.6 },
    { name: "Tech Mahindra", designation: "Associate Software Engineer", salary: 3.7 },
    { name: "Capgemini", designation: "Analyst", salary: 4.1 }
];

const companies2024 = [
    { name: "Microsoft", designation: "Software Engineer", salary: 12.0 },
    { name: "Google", designation: "Software Developer", salary: 15.0 },
    { name: "Amazon", designation: "SDE-1", salary: 10.0 },
    { name: "Flipkart", designation: "Software Engineer", salary: 8.5 },
    { name: "Paytm", designation: "Backend Developer", salary: 7.0 },
    { name: "Zomato", designation: "Full Stack Developer", salary: 6.5 },
    { name: "Swiggy", designation: "Software Engineer", salary: 7.5 },
    { name: "Ola", designation: "Product Engineer", salary: 6.8 }
];

const companies2025 = [
    { name: "Meta", designation: "Software Engineer", salary: 18.0 },
    { name: "Apple", designation: "iOS Developer", salary: 16.0 },
    { name: "Netflix", designation: "Backend Engineer", salary: 14.0 },
    { name: "Uber", designation: "Software Engineer", salary: 12.5 },
    { name: "Adobe", designation: "Software Developer", salary: 11.0 },
    { name: "Salesforce", designation: "Cloud Engineer", salary: 10.5 },
    { name: "Oracle", designation: "Software Engineer", salary: 9.5 },
    { name: "IBM", designation: "Full Stack Developer", salary: 8.0 }
];

// Sample names for different batches
const firstNames = [
    "Aarav", "Vivaan", "Aditya", "Vihaan", "Arjun", "Sai", "Reyansh", "Ayaan",
    "Krishna", "Ishaan", "Shaurya", "Atharv", "Advait", "Vedant", "Kabir", "Shivansh",
    "Ananya", "Diya", "Priya", "Kavya", "Anika", "Riya", "Saanvi", "Aadhya",
    "Kiara", "Myra", "Sara", "Avni", "Pari", "Navya", "Ira", "Tara"
];

const lastNames = [
    "Sharma", "Verma", "Gupta", "Singh", "Kumar", "Patel", "Jain", "Agarwal",
    "Reddy", "Nair", "Iyer", "Rao", "Prasad", "Sinha", "Mishra", "Pandey",
    "Chopra", "Malhotra", "Kapoor", "Arora", "Bansal", "Goel", "Saxena", "Tiwari"
];

const branches = ["CSE", "IT", "ECE", "EEE", "MECH", "CIVIL"];
const locations = [
    "Bangalore, India", "Hyderabad, India", "Chennai, India", "Mumbai, India",
    "Pune, India", "Delhi, India", "Gurgaon, India", "Noida, India",
    "Kolkata, India", "Ahmedabad, India", "Kochi, India", "Coimbatore, India"
];

// Function to generate random alumni data
function generateAlumniData(batchYear, count = 15) {
    const alumni = [];
    const companies = batchYear === 2023 ? companies2023 : 
                     batchYear === 2024 ? companies2024 : companies2025;
    
    for (let i = 0; i < count; i++) {
        const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
        const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
        const branch = branches[Math.floor(Math.random() * branches.length)];
        const company = companies[Math.floor(Math.random() * companies.length)];
        const location = locations[Math.floor(Math.random() * locations.length)];
        
        // Generate roll number based on batch year and branch
        const rollPrefix = `${batchYear.toString().slice(-2)}${branch}`;
        const rollSuffix = String(i + 1).padStart(3, '0');
        const rollNumber = `0863${rollPrefix}${rollSuffix}`;
        
        // Generate email
        const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@piemr.edu.in`;
        
        const alumniData = {
            email: email,
            password: "student123", // Default password
            firstName: firstName,
            lastName: lastName,
            role: "ALUMNI",
            status: "PENDING_VERIFICATION",
            batchInfo: {
                admissionYear: batchYear - 4,
                graduationYear: batchYear,
                branch: branch,
                rollNumber: rollNumber,
                cgpa: Math.round((6.0 + Math.random() * 4.0) * 100) / 100 // 6.0 to 10.0
            },
            professional: {
                currentCompany: company.name,
                designation: company.designation,
                currentSalary: company.salary,
                workType: "FULL_TIME",
                workLocation: location,
                experienceYears: new Date().getFullYear() - batchYear,
                skills: generateSkills(branch)
            },
            contact: {
                phone: `+91${Math.floor(Math.random() * 9000000000) + 1000000000}`,
                address: {
                    city: location.split(',')[0],
                    state: "India",
                    country: "India"
                }
            },
            profile: {
                profileImage: `http://localhost:8080/images/profiles/default_${firstName.toLowerCase()}_${lastName.toLowerCase()}.jpeg`,
                bio: `${firstName} is a dedicated ${company.designation} at ${company.name} with ${new Date().getFullYear() - batchYear} years of experience in the technology industry.`
            },
            socialLinks: {
                linkedin: `https://linkedin.com/in/${firstName.toLowerCase()}-${lastName.toLowerCase()}`,
                github: `https://github.com/${firstName.toLowerCase()}${lastName.toLowerCase()}`,
                portfolio: `https://${firstName.toLowerCase()}${lastName.toLowerCase()}.dev`
            },
            verification: {
                emailVerified: Math.random() > 0.3, // 70% verified
                phoneVerified: Math.random() > 0.5, // 50% verified
                profileVerified: Math.random() > 0.4  // 60% verified
            },
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            "_class": "com.piemr.gradsync.entity.mongodb.User"
        };
        
        alumni.push(alumniData);
    }
    
    return alumni;
}

// Function to generate skills based on branch
function generateSkills(branch) {
    const skillSets = {
        CSE: ["Java", "Python", "JavaScript", "React", "Node.js", "MongoDB", "MySQL", "AWS"],
        IT: ["Java", "C++", "Database Management", "System Administration", "Network Security", "Cloud Computing"],
        ECE: ["VLSI Design", "Embedded Systems", "Signal Processing", "MATLAB", "Verilog", "PCB Design"],
        EEE: ["Power Systems", "Control Systems", "MATLAB", "AutoCAD", "PLC Programming", "Electrical Design"],
        MECH: ["AutoCAD", "SolidWorks", "CATIA", "Manufacturing", "Thermodynamics", "Machine Design"],
        CIVIL: ["AutoCAD", "Structural Analysis", "Project Management", "Construction Management", "Surveying"]
    };
    
    const branchSkills = skillSets[branch] || skillSets.CSE;
    const numSkills = Math.floor(Math.random() * 4) + 3; // 3-6 skills
    const selectedSkills = [];
    
    for (let i = 0; i < numSkills; i++) {
        const skill = branchSkills[Math.floor(Math.random() * branchSkills.length)];
        if (!selectedSkills.includes(skill)) {
            selectedSkills.push(skill);
        }
    }
    
    return selectedSkills;
}

// Generate data for all batch years
const batch2023Alumni = generateAlumniData(2023, 20);
const batch2024Alumni = generateAlumniData(2024, 18);
const batch2025Alumni = generateAlumniData(2025, 16);

// Create output directory
const outputDir = path.join(__dirname, '..', 'generated-alumni-data');
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// Write data to JSON files
fs.writeFileSync(
    path.join(outputDir, 'batch-2023-alumni.json'),
    JSON.stringify(batch2023Alumni, null, 2)
);

fs.writeFileSync(
    path.join(outputDir, 'batch-2024-alumni.json'),
    JSON.stringify(batch2024Alumni, null, 2)
);

fs.writeFileSync(
    path.join(outputDir, 'batch-2025-alumni.json'),
    JSON.stringify(batch2025Alumni, null, 2)
);

// Create combined file
const allAlumni = [...batch2023Alumni, ...batch2024Alumni, ...batch2025Alumni];
fs.writeFileSync(
    path.join(outputDir, 'all-new-batches-alumni.json'),
    JSON.stringify(allAlumni, null, 2)
);

// Create MongoDB import script
const mongoImportScript = `
// MongoDB Import Script for Multi-Batch Alumni Data
// Run this script in MongoDB shell or MongoDB Compass

// Switch to your database
use gradsync;

// Import 2023 batch alumni
db.users.insertMany(${JSON.stringify(batch2023Alumni, null, 2)});

// Import 2024 batch alumni  
db.users.insertMany(${JSON.stringify(batch2024Alumni, null, 2)});

// Import 2025 batch alumni
db.users.insertMany(${JSON.stringify(batch2025Alumni, null, 2)});

// Create batch statistics for each year and branch
${generateBatchStatistics(batch2023Alumni, 2023)}
${generateBatchStatistics(batch2024Alumni, 2024)}
${generateBatchStatistics(batch2025Alumni, 2025)}

print("Successfully imported alumni data for batches 2023, 2024, and 2025!");
print("Total alumni imported: ${allAlumni.length}");
print("2023 batch: ${batch2023Alumni.length} alumni");
print("2024 batch: ${batch2024Alumni.length} alumni");
print("2025 batch: ${batch2025Alumni.length} alumni");
`;

fs.writeFileSync(
    path.join(outputDir, 'import-alumni-to-mongodb.js'),
    mongoImportScript
);

console.log('✅ Alumni data generation completed!');
console.log(`📁 Output directory: ${outputDir}`);
console.log(`📊 Generated data:`);
console.log(`   - 2023 batch: ${batch2023Alumni.length} alumni`);
console.log(`   - 2024 batch: ${batch2024Alumni.length} alumni`);
console.log(`   - 2025 batch: ${batch2025Alumni.length} alumni`);
console.log(`   - Total: ${allAlumni.length} alumni`);
console.log(`\n📋 Files created:`);
console.log(`   - batch-2023-alumni.json`);
console.log(`   - batch-2024-alumni.json`);
console.log(`   - batch-2025-alumni.json`);
console.log(`   - all-new-batches-alumni.json`);
console.log(`   - import-alumni-to-mongodb.js`);

// Function to generate batch statistics
function generateBatchStatistics(alumni, year) {
    const branchStats = {};
    
    alumni.forEach(alum => {
        const branch = alum.batchInfo.branch;
        if (!branchStats[branch]) {
            branchStats[branch] = {
                totalStudents: 0,
                placedStudents: 0,
                totalSalary: 0,
                salaryCount: 0
            };
        }
        
        branchStats[branch].totalStudents++;
        if (alum.professional && alum.professional.currentCompany) {
            branchStats[branch].placedStudents++;
            if (alum.professional.currentSalary) {
                branchStats[branch].totalSalary += alum.professional.currentSalary;
                branchStats[branch].salaryCount++;
            }
        }
    });
    
    let batchInserts = '';
    Object.keys(branchStats).forEach(branch => {
        const stats = branchStats[branch];
        const avgPackage = stats.salaryCount > 0 ? stats.totalSalary / stats.salaryCount : 0;
        const placementPercentage = (stats.placedStudents / stats.totalStudents) * 100;
        
        batchInserts += `
// Insert batch statistics for ${year} ${branch}
db.batches.insertOne({
    "graduationYear": ${year},
    "admissionYear": ${year - 4},
    "branch": "${branch}",
    "totalStudents": ${stats.totalStudents},
    "placedStudents": ${stats.placedStudents},
    "averagePackage": ${avgPackage.toFixed(2)},
    "placementPercentage": ${placementPercentage.toFixed(2)},
    "isActive": true,
    "createdAt": new Date(),
    "updatedAt": new Date(),
    "_class": "com.piemr.gradsync.entity.mongodb.Batch"
});
`;
    });
    
    return batchInserts;
}
