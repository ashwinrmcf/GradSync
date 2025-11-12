// Profile Image Mapping Script
// This helps map image filenames to student names in the database

const imageToNameMapping = {
  // Direct filename matches
  "AbhinaySharma_SynapsesXTL.jpeg": "Abhinay Sharma",
  "AmanKumarBamaliya_AspireMarketingSolutions.jpeg": "Aman Kumar Bamaliya", 
  "AnirudhKulkarni_CareerDreams.jpeg": "Anirudh Kulkarni",
  "AnjaliDubey_Infosys.jpeg": "Anjali Dubey",
  "AnkurNagle_Infosys.jpeg": "Ankur Nagle",
  "ArslanShaikh_Softude.jpeg": "Arslan Shaikh",
  "AshutoshSoni_Capgemini.jpeg": "Ashutosh Soni",
  "AshwiniRawat_Yardi.jpeg": "Ashwini Rawat",
  "ChandanRajput_Rakuten.jpeg": "Chandan Rajput",
  "DanishUllah_Bitcot.jpeg": "Danish Ullah",
  "DhairyaSavaner_PBO.jpeg": "Dhairya Savaner",
  "GarvitSharma_ThoughtWinITsolution.jpeg": "Garvit Sharma",
  "JaiKumarRaghuwanshi_ICICI_Lombard.jpeg": "Jai Kumar Raghuwanshi",
  "JayeshAgrawal_LivegageINC.jpeg": "Jayesh Agrawal",
  "LakhanSinghThakur_iTechCloudSolutions.jpeg": "Lakhan Singh Thakur",
  "NandiniWadekar_Zelite.jpeg": "Nandini Wadekar",
  "NiraliUpadhyay_Rakuten.jpeg": "Nirali Upadhyay",
  "PrachiGangwani_TheSnapTech.jpeg": "Prachi Gangwani",
  "PrachiSahu_WebiWorkTechnologies.jpeg": "Prachi Sahu",
  "RadheShreePatil_FittoniaTechnologies.jpeg": "Radhe Shree Patil",
  "RajaKhan_VisionWaves.jpeg": "Raja Khan",
  "RitikKhatri_Oracle.jpeg": "Ritik Khatri",
  "RohanKhera_GlobalLogicIndia.jpeg": "Rohan Khera",
  "RupaliNimbalkar_Zehntech.jpeg": "Rupali Nimbalkar",
  "ShubhamSoni_Innogent.jpeg": "Shubham Soni",
  "SohamVyas_AvalonSolutionsIndia.jpeg": "Soham Vyas",
  "VishwasKatiyar_Deloitte.jpeg": "Vishwas Katiyar",
  
  // Special case mappings
  "anishshrivastava.jpg": "Anish Shrivastva",
  "ashishbercha.png": "Ashish Bercha", 
  "chetan solanki.png": "Chetan Solanki",
  "eklavyamalviya.jpg": "Eklavya Malviya",
  "ishikabangar.jpg": "Ishika Bangar",
  "kuldeep.jpg": "Kuldeep",
  "mainkarajput.jpg": "Mainka Rajput",
  "meet chauhan.jpg": "Meet Singh Chouhan",
  "nandinisharma.jpg": "Nandini Sharma",
  "piyushjain.jpg": "Piyush Jain",
  "pradyum dharva.jpg": "Pradyum Dharwa",
  "sagarsankhere.png": "Sagar Sankhere",
  "sakshikothari.jpg": "Sakshi Kothari",
  "vivekchoudhary.jpg": "Vivek Choudhary",
  "wassaif khan.jpg": "Wassaif Khan"
};

// Students from NBA 2025.xlsx (for reference)
const studentsInDatabase = [
  "Abhinay Sharma", "Aman Kumar Bamaliya", "Anirudh Kulkarni", "Anish Shrivastva",
  "Anjali Dubey", "Ankur Nagle", "Arslan Shaikh", "Ashish Bercha", 
  "Ashutosh Soni", "Ashwini Rawat", "Chandan Rajput", "Chetan Solanki",
  "Danish Ullah", "Dhairya Savaner", "Eklavya Malviya", "Garvit Sharma",
  "Ishika Bangar", "Jai Kumar Raghuwanshi", "Jayesh Agrawal", "Kuldeep",
  "Lakhan Singh Thakur", "Mainka Rajput", "Meet Singh Chouhan", "Nandini Sharma",
  "Nandini Wadekar", "Nirali Upadhyay", "Piyush Jain", "Prachi Gangwani",
  "Prachi Sahu", "Pradyum Dharwa", "Pragati Chouhan", "Radhe Shree Patil",
  "Raja Khan", "Ritik Khatri", "Rohan Khera", "Rupali Nimbalkar",
  "Sagar Sankhere", "Sakshi Kothari", "Shantanu Mishra", "Shubham Soni",
  "Sneha Vishwakarma", "Soham Vyas", "Vishwas Katiyar", "Vivek Choudhary",
  "Wassaif Khan", "Yash Kumar"
];

console.log("Profile Image Mapping:");
console.log("======================");
console.log(`Total images: ${Object.keys(imageToNameMapping).length}`);
console.log(`Total students in DB: ${studentsInDatabase.length}`);

// Find students without images
const studentsWithImages = Object.values(imageToNameMapping);
const studentsWithoutImages = studentsInDatabase.filter(student => 
  !studentsWithImages.includes(student)
);

console.log("\nStudents WITHOUT profile images:");
studentsWithoutImages.forEach(student => console.log(`- ${student}`));

console.log(`\nMissing images: ${studentsWithoutImages.length}`);
console.log(`Students with images: ${studentsWithImages.length}`);

module.exports = { imageToNameMapping, studentsInDatabase };
