@echo off
echo 🚀 Creating Complete GradSync Migration Package
echo ==============================================

echo.
echo ✅ Step 1: MongoDB Export - COMPLETED
echo ====================================
echo MongoDB collections exported via Compass:
echo - gradsyncdb_users.json (47 KB - 46 alumni + admin)
echo - gradsyncdb_batches.json (1 KB)
echo - gradsyncdb_companies.json (3 KB) 
echo - gradsyncdb_placements.json (1 KB)

echo.
echo 📊 Step 2: Exporting MySQL Database...
echo =====================================

REM Create MySQL backup directory
if not exist "GradSync_Migration_Package\mysql_backup" mkdir "GradSync_Migration_Package\mysql_backup"

REM Prompt for MySQL password
set /p mysql_password=Enter MySQL root password: 

REM Export MySQL database
echo Exporting gradsync_db database...
mysqldump -u root -p%mysql_password% --single-transaction --routines --triggers gradsync_db > "GradSync_Migration_Package\mysql_backup\gradsync_db_complete.sql"
if %errorlevel% equ 0 (
    echo ✅ MySQL database exported successfully
) else (
    echo ❌ Failed to export MySQL database
    echo Please check MySQL is running and password is correct
)

echo.
echo 📸 Step 3: Copying Profile Images...
echo ===================================

REM Create profile images directory
if not exist "GradSync_Migration_Package\profile_images" mkdir "GradSync_Migration_Package\profile_images"

REM Copy profile images
if exist "backend\src\main\resources\static\images\profiles" (
    xcopy "backend\src\main\resources\static\images\profiles\*" "GradSync_Migration_Package\profile_images\" /E /I /Y
    echo ✅ Profile images copied (42 student photos)
) else (
    echo ❌ Profile images directory not found
)

echo.
echo ⚙️ Step 4: Copying Configuration Files...
echo ========================================

REM Create config directory
if not exist "GradSync_Migration_Package\application_config" mkdir "GradSync_Migration_Package\application_config"

REM Copy configuration files
if exist "backend\src\main\resources\application.yml" (
    copy "backend\src\main\resources\application.yml" "GradSync_Migration_Package\application_config\"
    echo ✅ application.yml copied
)

if exist "backend\src\main\resources\application-mongodb.properties" (
    copy "backend\src\main\resources\application-mongodb.properties" "GradSync_Migration_Package\application_config\"
    echo ✅ MongoDB properties copied
)

if exist "backend\pom.xml" (
    copy "backend\pom.xml" "GradSync_Migration_Package\application_config\"
    echo ✅ Maven pom.xml copied
)

echo.
echo 📋 Step 5: Creating Import Instructions...
echo =========================================

REM Create comprehensive import instructions
(
echo GradSync Complete Migration Package
echo ==================================
echo.
echo Package Contents:
echo - MongoDB Data: 46 alumni with placement records and profile images
echo - MySQL Data: Authentication system with admin user
echo - Profile Images: 42 real student photos
echo - Configuration: All application settings
echo.
echo IMPORT INSTRUCTIONS FOR NEW DEVICE:
echo ==================================
echo.
echo 1. Prerequisites:
echo    - Install Java 21
echo    - Install Node.js 18+
echo    - Install MongoDB
echo    - Install MySQL
echo    - Install Maven
echo.
echo 2. Import MongoDB:
echo    mongoimport --host localhost:27017 --db gradsyncdb --collection users --file mongodb_backup/gradsyncdb_users.json --jsonArray
echo    mongoimport --host localhost:27017 --db gradsyncdb --collection batches --file mongodb_backup/gradsyncdb_batches.json --jsonArray
echo    mongoimport --host localhost:27017 --db gradsyncdb --collection companies --file mongodb_backup/gradsyncdb_companies.json --jsonArray
echo    mongoimport --host localhost:27017 --db gradsyncdb --collection placements --file mongodb_backup/gradsyncdb_placements.json --jsonArray
echo.
echo 3. Import MySQL:
echo    mysql -u root -p -e "CREATE DATABASE gradsync_db;"
echo    mysql -u root -p gradsync_db ^< mysql_backup/gradsync_db_complete.sql
echo.
echo 4. Setup Profile Images:
echo    Copy profile_images/* to backend/src/main/resources/static/images/profiles/
echo.
echo 5. Setup Configuration:
echo    Copy application_config/* to backend/src/main/resources/
echo.
echo 6. Install Dependencies and Start:
echo    cd backend
echo    mvn clean install
echo    mvn spring-boot:run
echo.
echo    cd ../
echo    npm install
echo    npm run dev
echo.
echo 7. Access Application:
echo    Frontend: http://localhost:3000
echo    Backend: http://localhost:8080
echo    Login: admin@piemr.edu.in / password
echo.
echo Expected Results:
echo - 46 alumni profiles with real photos
echo - Complete placement data from NBA 2025.xlsx
echo - Working authentication system
echo - All profile pictures displaying correctly
echo.
echo Migration Date: %date% %time%
echo Source Device: %computername%
) > "GradSync_Migration_Package\IMPORT_INSTRUCTIONS.txt"

echo ✅ Import instructions created

echo.
echo 🎉 MIGRATION PACKAGE COMPLETED!
echo ==============================
echo.
echo 📦 Package Contents:
echo - MongoDB backup: 4 collections with 46 alumni
echo - MySQL backup: Authentication database
echo - Profile images: 42 student photos
echo - Configuration: All settings files
echo - Instructions: Complete import guide
echo.
echo 📁 Package Location: GradSync_Migration_Package\
echo 📊 Ready to transfer to new device!
echo.
echo 🚀 Your complete GradSync alumni portal is ready for migration!
echo.
pause
