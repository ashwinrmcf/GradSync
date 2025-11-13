// Add Specific Batches from new_users to users
// Target: 2023 graduates (2019-2023) and 2024 graduates (2020-2024)

print("🎯 Adding Specific Batches to Users Collection");
print("=============================================");

use gradsyncdb;

// Check current counts
var currentUsersCount = db.users.countDocuments();
var newUsersCount = db.new_users.countDocuments();

print(`📊 Current users collection: ${currentUsersCount}`);
print(`📊 New users collection: ${newUsersCount}`);
print("");

// Track statistics
var addedCount = 0;
var skippedCount = 0;
var errorCount = 0;

// Define target batches
var targetBatches = [
    { admissionYear: 2019, graduationYear: 2023 },
    { admissionYear: 2020, graduationYear: 2024 }
];

print("🎯 Target Batches:");
targetBatches.forEach(batch => {
    print(`   - Admission: ${batch.admissionYear}, Graduation: ${batch.graduationYear}`);
});
print("");

// Process each target batch
targetBatches.forEach(batch => {
    print(`🔍 Processing batch ${batch.admissionYear}-${batch.graduationYear}...`);
    
    // Find users from new_users with matching batch info
    var batchUsers = db.new_users.find({
        $or: [
            { "batchInfo.admissionYear": batch.admissionYear, "batchInfo.graduationYear": batch.graduationYear },
            { "admissionYear": batch.admissionYear, "graduationYear": batch.graduationYear },
            { "batchYear": batch.graduationYear } // Sometimes stored as graduation year only
        ]
    }).toArray();
    
    print(`   Found ${batchUsers.length} users for batch ${batch.admissionYear}-${batch.graduationYear}`);
    
    // Process each user in this batch
    batchUsers.forEach(newUser => {
        try {
            // Check if user already exists by email
            var existingUser = db.users.findOne({ email: newUser.email });
            
            if (existingUser) {
                skippedCount++;
                print(`   ⏭️  Skipped ${newUser.email} (already exists)`);
            } else {
                // Remove _id to let MongoDB generate new one
                delete newUser._id;
                
                // Ensure proper role
                if (!newUser.role) {
                    newUser.role = "ALUMNI";
                }
                
                // Standardize batch info structure
                if (!newUser.batchInfo) {
                    newUser.batchInfo = {
                        admissionYear: batch.admissionYear,
                        graduationYear: batch.graduationYear,
                        branch: newUser.branch || "CSE"
                    };
                }
                
                // Insert user
                db.users.insertOne(newUser);
                addedCount++;
                print(`   ➕ Added ${newUser.email} (${batch.admissionYear}-${batch.graduationYear})`);
            }
        } catch (error) {
            errorCount++;
            print(`   ❌ Error processing ${newUser.email}: ${error.message}`);
        }
    });
    
    print("");
});

print("🎉 Batch Import Complete!");
print("========================");
print(`✅ Users added: ${addedCount}`);
print(`⏭️  Users skipped (duplicates): ${skippedCount}`);
print(`❌ Errors encountered: ${errorCount}`);

// Get final counts
var finalUsersCount = db.users.countDocuments();
print(`📊 Final users count: ${finalUsersCount}`);
print(`📈 Net increase: ${finalUsersCount - currentUsersCount}`);

// Show batch-specific counts
print("");
print("📊 Batch-specific counts in users collection:");
targetBatches.forEach(batch => {
    var batchCount = db.users.countDocuments({
        $or: [
            { "batchInfo.graduationYear": batch.graduationYear },
            { "graduationYear": batch.graduationYear },
            { "batchYear": batch.graduationYear }
        ]
    });
    print(`   - Batch ${batch.admissionYear}-${batch.graduationYear}: ${batchCount} users`);
});

print("");
print("🎯 Specific batch import completed successfully!");
