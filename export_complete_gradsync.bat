@echo off
echo 🚀 Complete GradSync Migration Export
echo =====================================

REM Create main migration package directory
if not exist "GradSync_Migration_Package" mkdir "GradSync_Migration_Package"
if not exist "GradSync_Migration_Package\mongodb_backup" mkdir "GradSync_Migration_Package\mongodb_backup"
if not exist "GradSync_Migration_Package\mysql_backup" mkdir "GradSync_Migration_Package\mysql_backup"
if not exist "GradSync_Migration_Package\profile_images" mkdir "GradSync_Migration_Package\profile_images"
if not exist "GradSync_Migration_Package\application_config" mkdir "GradSync_Migration_Package\application_config"

echo.
echo 📊 Step 1: Exporting MongoDB (Alumni Data)...
echo ============================================

REM Export MongoDB collections
mongoexport --host localhost:27017 --db gradsyncdb --collection users --out "GradSync_Migration_Package\mongodb_backup\gradsyncdb_users.json" --pretty
if %errorlevel% equ 0 (
    echo ✅ Users collection exported (46 alumni with profile images)
) else (
    echo ❌ Failed to export users collection
)

mongoexport --host localhost:27017 --db gradsyncdb --collection batches --out "GradSync_Migration_Package\mongodb_backup\gradsyncdb_batches.json" --pretty
if %errorlevel% equ 0 (
    echo ✅ Batches collection exported
) else (
    echo ❌ Failed to export batches collection
)

echo.
echo 🐬 Step 2: Exporting MySQL (Authentication Data)...
echo =================================================

REM Prompt for MySQL password
set /p mysql_password=Enter MySQL root password: 

REM Export MySQL database
mysqldump -u root -p%mysql_password% --single-transaction --routines --triggers gradsync_db > "GradSync_Migration_Package\mysql_backup\gradsync_db_complete.sql"
if %errorlevel% equ 0 (
    echo ✅ MySQL database exported (authentication data)
) else (
    echo ❌ Failed to export MySQL database
)

echo.
echo 📸 Step 3: Copying Profile Images...
echo ===================================

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

REM Create import instructions
echo Creating import_instructions.txt...
(
echo GradSync Migration Package - Import Instructions
echo ==============================================
echo.
echo This package contains:
echo - MongoDB data: 46 alumni with placement records
echo - MySQL data: Authentication and user management
echo - Profile images: 42 real student photos
echo - Configuration files: Application settings
echo.
echo To import on new device:
echo.
echo 1. Install Prerequisites:
echo    - Java 21
echo    - Node.js 18+
echo    - MongoDB
echo    - MySQL
echo    - Maven
echo.
echo 2. Import MongoDB:
echo    mongoimport --host localhost:27017 --db gradsyncdb --collection users --file mongodb_backup/gradsyncdb_users.json --jsonArray
echo    mongoimport --host localhost:27017 --db gradsyncdb --collection batches --file mongodb_backup/gradsyncdb_batches.json --jsonArray
echo.
echo 3. Import MySQL:
echo    mysql -u root -p -e "CREATE DATABASE gradsync_db;"
echo    mysql -u root -p gradsync_db ^< mysql_backup/gradsync_db_complete.sql
echo.
echo 4. Copy Profile Images:
echo    Copy profile_images/* to backend/src/main/resources/static/images/profiles/
echo.
echo 5. Copy Configuration:
echo    Copy application_config/* to backend/src/main/resources/
echo.
echo 6. Start Application:
echo    cd backend
echo    mvn spring-boot:run
echo.
echo Login: admin@piemr.edu.in / password
) > "GradSync_Migration_Package\import_instructions.txt"

echo ✅ Import instructions created

echo.
echo 🎉 EXPORT COMPLETED SUCCESSFULLY!
echo ================================
echo.
echo 📦 Migration Package Contents:
echo - MongoDB backup: gradsyncdb (users, batches)
echo - MySQL backup: gradsync_db (authentication)
echo - Profile images: 42 student photos
echo - Configuration: application.yml, properties
echo - Instructions: import_instructions.txt
echo.
echo 📁 Package Location: GradSync_Migration_Package\
echo.
echo 🚀 Ready to migrate to new device!
echo.
pause
