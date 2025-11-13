@echo off
echo 🔄 MongoDB Database Merge Process
echo ================================
echo.

echo Step 1: Importing old database to temporary collection...
echo --------------------------------------------------------
cd "D:\GradSync\GradSync_Migration_Package\mongodb_backup"
mongoimport --db gradsyncdb --collection users_old --file gradsyncdb_users.json --jsonArray

echo.
echo Step 2: Running merge script...
echo ------------------------------
cd "D:\GradSync"
mongosh gradsyncdb merge_users.js

echo.
echo ✅ Database merge completed!
echo.
echo 🚀 You can now restart your Spring Boot application
echo    All users from both databases are now available
echo.
pause
