# 📦 Database Migration Guide - Export & Import

## 🎯 Objective
Export MongoDB and MySQL databases from current device and import them on another device to migrate your complete GradSync application with all real data.

## 📊 Current Database Status
- **MongoDB**: `gradsyncdb` - Contains 46 alumni with profile images
- **MySQL**: `gradsync_db` - Contains authentication and user management data

---

## 🗄️ **PART 1: MongoDB Export (Alumni Data)**

### **Step 1: Export MongoDB Database**

#### **Option A: Using MongoDB Compass (GUI)**
1. Open MongoDB Compass
2. Connect to `mongodb://localhost:27017`
3. Select `gradsyncdb` database
4. For each collection (`users`, `batches`, `companies`, `placements`):
   - Click on collection
   - Click "Export Data" 
   - Choose JSON format
   - Save as `gradsyncdb_users.json`, `gradsyncdb_batches.json`, etc.

#### **Option B: Using Command Line (mongodump)**
```bash
# Export entire gradsyncdb database
mongodump --host localhost:27017 --db gradsyncdb --out ./mongodb_backup

# This creates a folder structure:
# mongodb_backup/
#   gradsyncdb/
#     users.bson
#     users.metadata.json
#     batches.bson
#     batches.metadata.json
#     etc.
```

#### **Option C: Export as JSON (human-readable)**
```bash
# Export each collection as JSON
mongoexport --host localhost:27017 --db gradsyncdb --collection users --out gradsyncdb_users.json --pretty
mongoexport --host localhost:27017 --db gradsyncdb --collection batches --out gradsyncdb_batches.json --pretty
mongoexport --host localhost:27017 --db gradsyncdb --collection companies --out gradsyncdb_companies.json --pretty
mongoexport --host localhost:27017 --db gradsyncdb --collection placements --out gradsyncdb_placements.json --pretty
```

---

## 🐬 **PART 2: MySQL Export (Authentication Data)**

### **Step 1: Export MySQL Database**

#### **Option A: Using phpMyAdmin (GUI)**
1. Open phpMyAdmin
2. Select `gradsync_db` database
3. Click "Export" tab
4. Choose "Custom" export method
5. Select all tables
6. Format: SQL
7. Click "Go" to download `gradsync_db.sql`

#### **Option B: Using Command Line (mysqldump)**
```bash
# Export entire gradsync_db database
mysqldump -u root -p gradsync_db > gradsync_db_backup.sql

# Export with specific options for better compatibility
mysqldump -u root -p --single-transaction --routines --triggers gradsync_db > gradsync_db_complete.sql
```

#### **Option C: Export specific tables only**
```bash
# Export only essential tables
mysqldump -u root -p gradsync_db users roles user_roles > gradsync_db_auth.sql
```

---

## 📁 **PART 3: Export Profile Images**

### **Copy Profile Images Folder**
```bash
# Copy the entire profiles folder
cp -r "backend/src/main/resources/static/images/profiles" ./profile_images_backup/

# Or using Windows PowerShell
Copy-Item "backend\src\main\resources\static\images\profiles" -Destination ".\profile_images_backup" -Recurse
```

---

## 📦 **PART 4: Create Complete Migration Package**

### **Create Migration Folder Structure**
```
GradSync_Migration_Package/
├── mongodb_backup/
│   ├── gradsyncdb_users.json
│   ├── gradsyncdb_batches.json
│   ├── gradsyncdb_companies.json
│   └── gradsyncdb_placements.json
├── mysql_backup/
│   └── gradsync_db_complete.sql
├── profile_images/
│   └── [42 profile image files]
├── application_config/
│   ├── application.yml
│   ├── application-mongodb.properties
│   └── pom.xml
└── migration_scripts/
    ├── import_mongodb.sh
    ├── import_mysql.sh
    └── setup_new_device.md
```

---

## 🚀 **PART 5: Import on New Device**

### **Step 1: Setup New Environment**
```bash
# Install required software
# - Java 21
# - Node.js 18+
# - MongoDB
# - MySQL
# - Maven
```

### **Step 2: Import MongoDB Data**
```bash
# Option A: Using mongorestore (from mongodump)
mongorestore --host localhost:27017 --db gradsyncdb ./mongodb_backup/gradsyncdb/

# Option B: Using mongoimport (from JSON exports)
mongoimport --host localhost:27017 --db gradsyncdb --collection users --file gradsyncdb_users.json --jsonArray
mongoimport --host localhost:27017 --db gradsyncdb --collection batches --file gradsyncdb_batches.json --jsonArray
mongoimport --host localhost:27017 --db gradsyncdb --collection companies --file gradsyncdb_companies.json --jsonArray
mongoimport --host localhost:27017 --db gradsyncdb --collection placements --file gradsyncdb_placements.json --jsonArray
```

### **Step 3: Import MySQL Data**
```bash
# Create database
mysql -u root -p -e "CREATE DATABASE gradsync_db;"

# Import data
mysql -u root -p gradsync_db < gradsync_db_complete.sql
```

### **Step 4: Copy Profile Images**
```bash
# Copy profile images to new backend
cp -r ./profile_images_backup/* ./backend/src/main/resources/static/images/profiles/
```

### **Step 5: Update Configuration**
```bash
# Copy configuration files
cp application.yml ./backend/src/main/resources/
cp application-mongodb.properties ./backend/src/main/resources/
```

---

## 🔧 **Quick Export Script**

### **Create Export Script**
```bash
#!/bin/bash
# export_gradsync.sh

echo "🚀 Exporting GradSync Databases..."

# Create backup directory
mkdir -p GradSync_Migration_Package/{mongodb_backup,mysql_backup,profile_images,application_config}

# Export MongoDB
echo "📊 Exporting MongoDB..."
mongoexport --host localhost:27017 --db gradsyncdb --collection users --out GradSync_Migration_Package/mongodb_backup/gradsyncdb_users.json --pretty
mongoexport --host localhost:27017 --db gradsyncdb --collection batches --out GradSync_Migration_Package/mongodb_backup/gradsyncdb_batches.json --pretty

# Export MySQL
echo "🐬 Exporting MySQL..."
mysqldump -u root -p --single-transaction gradsync_db > GradSync_Migration_Package/mysql_backup/gradsync_db_complete.sql

# Copy profile images
echo "📸 Copying profile images..."
cp -r backend/src/main/resources/static/images/profiles/* GradSync_Migration_Package/profile_images/

# Copy configuration
echo "⚙️ Copying configuration..."
cp backend/src/main/resources/application.yml GradSync_Migration_Package/application_config/
cp backend/src/main/resources/application-mongodb.properties GradSync_Migration_Package/application_config/

echo "✅ Export complete! Package ready in GradSync_Migration_Package/"
```

---

## 📋 **Migration Checklist**

### **Before Export:**
- [ ] Stop GradSync application
- [ ] Close Excel files (NBA 2025.xlsx)
- [ ] Ensure MongoDB is running
- [ ] Ensure MySQL is running
- [ ] Verify all 46 alumni are in MongoDB
- [ ] Verify admin user exists in MySQL

### **Export Package Contents:**
- [ ] MongoDB JSON files (users, batches, companies, placements)
- [ ] MySQL SQL dump file
- [ ] 42 profile image files
- [ ] Configuration files (application.yml, properties)
- [ ] Import scripts for new device

### **After Import on New Device:**
- [ ] MongoDB contains 46 alumni records
- [ ] MySQL contains admin user
- [ ] Profile images accessible at `/images/profiles/`
- [ ] Application starts without errors
- [ ] Login works with admin@piemr.edu.in / password
- [ ] Directory page shows real profile pictures

---

## 🎯 **Expected Results**

After successful migration:
- ✅ **Complete GradSync application** running on new device
- ✅ **All 46 alumni** with real profile pictures
- ✅ **Authentication system** working
- ✅ **NBA 2025 placement data** preserved
- ✅ **Profile images** displaying correctly

Your entire GradSync alumni portal will be fully functional on the new device! 🚀
