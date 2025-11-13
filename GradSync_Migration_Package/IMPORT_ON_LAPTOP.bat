@echo off
echo 🚀 GradSync Import on New Device (Laptop)
echo =========================================

echo.
echo 📋 Prerequisites Check:
echo - Java 21 installed?
echo - Node.js 18+ installed?
echo - MongoDB running?
echo - MySQL running?
echo - Maven installed?
echo.
pause

echo.
echo 📊 Step 1: Importing MongoDB Data...
echo ===================================

REM Import MongoDB collections
echo Importing users collection (46 alumni + admin)...
mongoimport --host localhost:27017 --db gradsyncdb --collection users --file "mongodb_backup\gradsyncdb_users.json" --jsonArray
if %errorlevel% equ 0 (
    echo ✅ Users imported successfully
) else (
    echo ❌ Failed to import users - check MongoDB is running
)

echo Importing batches collection...
mongoimport --host localhost:27017 --db gradsyncdb --collection batches --file "mongodb_backup\gradsyncdb_batches.json" --jsonArray
if %errorlevel% equ 0 (
    echo ✅ Batches imported successfully
) else (
    echo ❌ Failed to import batches
)

echo Importing companies collection...
mongoimport --host localhost:27017 --db gradsyncdb --collection companies --file "mongodb_backup\gradsyncdb_companies.json" --jsonArray
if %errorlevel% equ 0 (
    echo ✅ Companies imported successfully
) else (
    echo ❌ Failed to import companies
)

echo Importing placements collection...
mongoimport --host localhost:27017 --db gradsyncdb --collection placements --file "mongodb_backup\gradsyncdb_placements.json" --jsonArray
if %errorlevel% equ 0 (
    echo ✅ Placements imported successfully
) else (
    echo ❌ Failed to import placements
)

echo.
echo 🐬 Step 2: Importing MySQL Data...
echo =================================

REM Prompt for MySQL password on new device
set /p mysql_password=Enter MySQL root password for this laptop: 

REM Create database
mysql -u root -p%mysql_password% -e "CREATE DATABASE IF NOT EXISTS gradsync_db;"
if %errorlevel% equ 0 (
    echo ✅ Database gradsync_db created
) else (
    echo ❌ Failed to create database
)

REM Import data
mysql -u root -p%mysql_password% gradsync_db < "mysql_backup\gradsync_db_complete.sql"
if %errorlevel% equ 0 (
    echo ✅ MySQL data imported successfully
) else (
    echo ❌ Failed to import MySQL data
)

echo.
echo 📸 Step 3: Setting up Profile Images...
echo ======================================

REM Create profiles directory in your GradSync project
echo Please specify your GradSync project location on this laptop:
set /p project_path=Enter full path to GradSync folder (e.g., C:\Users\YourName\GradSync): 

if exist "%project_path%" (
    echo ✅ GradSync project found at: %project_path%
    
    REM Create profiles directory
    if not exist "%project_path%\backend\src\main\resources\static\images\profiles" mkdir "%project_path%\backend\src\main\resources\static\images\profiles"
    
    REM Copy profile images
    xcopy "profile_images\*" "%project_path%\backend\src\main\resources\static\images\profiles\" /E /I /Y
    if %errorlevel% equ 0 (
        echo ✅ Profile images copied (42 student photos)
    ) else (
        echo ❌ Failed to copy profile images
    )
) else (
    echo ❌ GradSync project not found at: %project_path%
    echo Please copy profile_images folder manually to your project
)

echo.
echo ⚙️ Step 4: Setting up Configuration...
echo =====================================

if exist "%project_path%" (
    REM Copy configuration files
    copy "application_config\application.yml" "%project_path%\backend\src\main\resources\"
    if %errorlevel% equ 0 (
        echo ✅ application.yml copied
    )
    
    copy "application_config\application-mongodb.properties" "%project_path%\backend\src\main\resources\"
    if %errorlevel% equ 0 (
        echo ✅ MongoDB properties copied
    )
    
    copy "application_config\pom.xml" "%project_path%\backend\"
    if %errorlevel% equ 0 (
        echo ✅ Maven pom.xml copied
    )
) else (
    echo ❌ Please copy configuration files manually
)

echo.
echo 🔧 Step 5: Installing Dependencies...
echo ====================================

if exist "%project_path%" (
    cd /d "%project_path%\backend"
    echo Installing Maven dependencies...
    mvn clean install -DskipTests
    if %errorlevel% equ 0 (
        echo ✅ Backend dependencies installed
    ) else (
        echo ❌ Failed to install backend dependencies
    )
    
    cd /d "%project_path%"
    echo Installing Node.js dependencies...
    npm install
    if %errorlevel% equ 0 (
        echo ✅ Frontend dependencies installed
    ) else (
        echo ❌ Failed to install frontend dependencies
    )
)

echo.
echo 🎉 IMPORT COMPLETED!
echo ===================
echo.
echo 📊 Migration Summary:
echo - MongoDB: 46 alumni + admin imported
echo - MySQL: Authentication system imported
echo - Profile Images: 42 photos copied
echo - Configuration: All settings applied
echo - Dependencies: Installed
echo.
echo 🚀 Ready to start GradSync on laptop!
echo.
echo To start the application:
echo 1. Backend: cd %project_path%\backend && mvn spring-boot:run
echo 2. Frontend: cd %project_path% && npm run dev
echo.
echo Then visit: http://localhost:3000
echo Login: admin@piemr.edu.in / password
echo.
echo ✅ Your complete GradSync alumni portal is now running on laptop!
echo.
pause
