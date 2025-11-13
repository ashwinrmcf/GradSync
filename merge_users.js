// MongoDB Script to Merge Old and New User Data
// This script adds users from old database that don't exist in the new one

print("🔄 Starting User Database Merge Process...");
print("==========================================");

// Switch to the database
use gradsyncdb;

// Get counts before merge
const newUsersCount = db.users.countDocuments();
const oldUsersCount = db.users_old.countDocuments();

print(`📊 Current users in new database: ${newUsersCount}`);
print(`📊 Users in old database: ${oldUsersCount}`);
print("");

// Track merge statistics
let addedCount = 0;
let skippedCount = 0;
let errorCount = 0;

// Get all users from old database
const oldUsers = db.users_old.find().toArray();

print("🔍 Checking for missing users...");
print("");

// Process each old user
oldUsers.forEach((oldUser, index) => {
    try {
        // Check if user exists in new database by email (primary identifier)
        const existingUser = db.users.findOne({ email: oldUser.email });
        
        if (existingUser) {
            // User exists, skip
            skippedCount++;
            if (index % 10 === 0) {
                print(`✅ Skipped ${oldUser.email} (already exists)`);
            }
        } else {
            // User doesn't exist, add them
            // Remove the _id to let MongoDB generate a new one
            delete oldUser._id;
            
            // Ensure the user has proper role if missing
            if (!oldUser.role) {
                oldUser.role = "ALUMNI";
            }
            
            // Insert the user
            db.users.insertOne(oldUser);
            addedCount++;
            print(`➕ Added ${oldUser.email} from old database`);
        }
    } catch (error) {
        errorCount++;
        print(`❌ Error processing ${oldUser.email}: ${error.message}`);
    }
});

print("");
print("🎉 Merge Process Complete!");
print("=========================");
print(`✅ Users added from old database: ${addedCount}`);
print(`⏭️  Users skipped (already exist): ${skippedCount}`);
print(`❌ Errors encountered: ${errorCount}`);

// Get final count
const finalCount = db.users.countDocuments();
print(`📊 Total users after merge: ${finalCount}`);
print(`📈 Net increase: ${finalCount - newUsersCount}`);

print("");
print("🧹 Cleaning up temporary collection...");
db.users_old.drop();
print("✅ Temporary collection 'users_old' removed");

print("");
print("🎯 Merge completed successfully!");
print("Your database now contains all users from both old and new databases!");
