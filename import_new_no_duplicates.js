// Import New Users Without Duplicates
// This script adds new users to existing collection, skipping duplicates

print("🔄 Importing New Users (No Duplicates)...");
print("==========================================");

// Switch to the database
use gradsyncdb;

// Get current count
const currentCount = db.users.countDocuments();
print(`📊 Current users in database: ${currentCount}`);
print("");

// Track statistics
let addedCount = 0;
let skippedCount = 0;
let errorCount = 0;

// Get all users from new_users collection (we'll import new data here first)
print("🔍 Processing new users...");
const newUsers = db.new_users.find().toArray();

print(`📥 Found ${newUsers.length} users to process`);
print("");

// Process each new user
newUsers.forEach((newUser, index) => {
    try {
        // Check if user exists by email
        const existingUser = db.users.findOne({ email: newUser.email });
        
        if (existingUser) {
            // User exists, skip
            skippedCount++;
            if (index % 10 === 0) {
                print(`⏭️  Skipped ${newUser.email} (already exists)`);
            }
        } else {
            // User doesn't exist, add them
            // Remove the _id to let MongoDB generate a new one
            delete newUser._id;
            
            // Ensure proper role
            if (!newUser.role) {
                newUser.role = "ALUMNI";
            }
            
            // Insert the user
            db.users.insertOne(newUser);
            addedCount++;
            print(`➕ Added ${newUser.email}`);
        }
    } catch (error) {
        errorCount++;
        print(`❌ Error processing ${newUser.email}: ${error.message}`);
    }
});

print("");
print("🎉 Import Process Complete!");
print("===========================");
print(`✅ New users added: ${addedCount}`);
print(`⏭️  Users skipped (duplicates): ${skippedCount}`);
print(`❌ Errors encountered: ${errorCount}`);

// Get final count
const finalCount = db.users.countDocuments();
print(`📊 Total users after import: ${finalCount}`);
print(`📈 Net increase: ${finalCount - currentCount}`);

print("");
print("🧹 Cleaning up temporary collection...");
db.new_users.drop();
print("✅ Temporary collection 'new_users' removed");

print("");
print("🎯 Import completed successfully!");
print("Your database now has all users with no duplicates!");
