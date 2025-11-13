@echo off
echo Checking MongoDB Export Files
echo =============================

echo.
echo Checking export directory...
if not exist "GradSync_Migration_Package\mongodb_backup" (
    echo Directory missing - creating it...
    mkdir "GradSync_Migration_Package\mongodb_backup"
    echo Directory created: GradSync_Migration_Package\mongodb_backup
) else (
    echo Directory exists: GradSync_Migration_Package\mongodb_backup
)

echo.
echo Checking exported files...
echo =========================

if exist "GradSync_Migration_Package\mongodb_backup\gradsyncdb_users.json" (
    echo [✓] gradsyncdb_users.json - Found
) else (
    echo [X] gradsyncdb_users.json - Missing
)

if exist "GradSync_Migration_Package\mongodb_backup\gradsyncdb_batches.json" (
    echo [✓] gradsyncdb_batches.json - Found  
) else (
    echo [X] gradsyncdb_batches.json - Missing
)

if exist "GradSync_Migration_Package\mongodb_backup\gradsyncdb_companies.json" (
    echo [✓] gradsyncdb_companies.json - Found
) else (
    echo [X] gradsyncdb_companies.json - Missing
)

if exist "GradSync_Migration_Package\mongodb_backup\gradsyncdb_placements.json" (
    echo [✓] gradsyncdb_placements.json - Found
) else (
    echo [X] gradsyncdb_placements.json - Missing
)

echo.
echo MongoDB Compass Export Instructions:
echo ====================================
echo 1. Open MongoDB Compass
echo 2. Connect to mongodb://localhost:27017
echo 3. Click on 'gradsyncdb' database
echo 4. For each collection (users, batches, companies, placements):
echo    - Click on collection name
echo    - Click 'Export Data' button
echo    - Choose JSON format
echo    - Save to: %CD%\GradSync_Migration_Package\mongodb_backup\
echo    - Name: gradsyncdb_[collection].json
echo.
echo After exporting, run this script again to verify.
echo.
pause
