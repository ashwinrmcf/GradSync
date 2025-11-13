@echo off
echo 🔍 Verifying MongoDB Exports
echo ============================

echo.
echo 📁 Checking export directory...
if not exist "GradSync_Migration_Package\mongodb_backup" (
    echo ❌ Export directory doesn't exist
    echo Creating directory...
    mkdir "GradSync_Migration_Package\mongodb_backup"
    echo ✅ Directory created: GradSync_Migration_Package\mongodb_backup
) else (
    echo ✅ Export directory exists
)

echo.
echo 📊 Checking exported files...
echo =============================

set TOTAL_FILES=0
set TOTAL_SIZE=0

for %%f in (users batches companies placements) do (
    if exist "GradSync_Migration_Package\mongodb_backup\gradsyncdb_%%f.json" (
        for %%A in ("GradSync_Migration_Package\mongodb_backup\gradsyncdb_%%f.json") do (
            set /a TOTAL_FILES=TOTAL_FILES+1
            echo ✅ gradsyncdb_%%f.json (%%~zA bytes)
        )
    ) else (
        echo ❌ gradsyncdb_%%f.json - Missing
        echo    Export this collection from MongoDB Compass
    )
)

echo.
echo 📊 Export Summary:
echo ==================
echo Files found: %TOTAL_FILES%/4
echo Total size: %TOTAL_SIZE% bytes

if %TOTAL_FILES% equ 4 (
    echo ✅ All collections exported successfully!
    echo 🚀 Ready to proceed with complete migration
) else (
    echo ❌ Some collections missing
    echo 👉 Please export missing collections using MongoDB Compass
)

echo.
echo 📋 MongoDB Compass Export Instructions:
echo =======================================
echo 1. Open MongoDB Compass
echo 2. Connect to mongodb://localhost:27017
echo 3. Click on 'gradsyncdb' database
echo 4. For each missing collection:
echo    - Click on collection name
echo    - Click 'Export Data' button
echo    - Choose JSON format
echo    - Save to: %CD%\GradSync_Migration_Package\mongodb_backup\
echo    - Name: gradsyncdb_[collection].json
echo.
pause
