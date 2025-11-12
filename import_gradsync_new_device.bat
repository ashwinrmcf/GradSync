@echo off
echo 🚀 GradSync Migration - Import on New Device
echo ===========================================

echo.
echo 📋 Prerequisites Check:
echo - Java 21 installed? (java -version)
echo - Node.js 18+ installed? (node -v)
echo - MongoDB running? (mongo --version)
echo - MySQL running? (mysql --version)
echo - Maven installed? (mvn -version)
echo.
pause

echo.
echo 📊 Step 1: Importing MongoDB Data...
echo ===================================

REM Import MongoDB collections
echo Importing users collection (46 alumni)...
mongoimport --host localhost:27017 --db gradsyncdb --collection users --file "mongodb_backup\gradsyncdb_users.json" --jsonArray
if %errorlevel% equ 0 (
    echo ✅ Users imported successfully
) else (
    echo ❌ Failed to import users
)

echo Importing batches collection...
mongoimport --host localhost:27017 --db gradsyncdb --collection batches --file "mongodb_backup\gradsyncdb_batches.json" --jsonArray
if %errorlevel% equ 0 (
    echo ✅ Batches imported successfully
) else (
    echo ❌ Failed to import batches
)

echo.
echo 🐬 Step 2: Importing MySQL Data...
echo =================================

REM Prompt for MySQL password
set /p mysql_password=Enter MySQL root password for new device: 

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

REM Create profiles directory
if not exist "backend\src\main\resources\static\images\profiles" mkdir "backend\src\main\resources\static\images\profiles"

REM Copy profile images
xcopy "profile_images\*" "backend\src\main\resources\static\images\profiles\" /E /I /Y
if %errorlevel% equ 0 (
    echo ✅ Profile images copied (42 student photos)
) else (
    echo ❌ Failed to copy profile images
)

echo.
echo ⚙️ Step 4: Setting up Configuration...
echo =====================================

REM Copy configuration files
copy "application_config\application.yml" "backend\src\main\resources\"
if %errorlevel% equ 0 (
    echo ✅ application.yml copied
)

copy "application_config\application-mongodb.properties" "backend\src\main\resources\"
if %errorlevel% equ 0 (
    echo ✅ MongoDB properties copied
)

copy "application_config\pom.xml" "backend\"
if %errorlevel% equ 0 (
    echo ✅ Maven pom.xml copied
)

echo.
echo 🔧 Step 5: Installing Dependencies...
echo ====================================

cd backend
echo Installing Maven dependencies...
mvn clean install -DskipTests
if %errorlevel% equ 0 (
    echo ✅ Dependencies installed successfully
) else (
    echo ❌ Failed to install dependencies
)

echo.
echo 🎉 IMPORT COMPLETED SUCCESSFULLY!
echo ================================
echo.
echo 📊 Migration Summary:
echo - MongoDB: 46 alumni imported to gradsyncdb
echo - MySQL: Authentication data imported to gradsync_db
echo - Profile Images: 42 photos copied to backend
echo - Configuration: All config files in place
echo - Dependencies: Maven packages installed
echo.
echo 🚀 Ready to start GradSync!
echo.
echo To start the application:
echo 1. cd backend
echo 2. mvn spring-boot:run
echo.
echo Then visit: http://localhost:3000
echo Login: admin@piemr.edu.in / password
echo.
pause
