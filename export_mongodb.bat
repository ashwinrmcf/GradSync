@echo off
echo 🚀 Exporting MongoDB Database (gradsyncdb)...

REM Create backup directory
if not exist "GradSync_Migration_Package\mongodb_backup" mkdir "GradSync_Migration_Package\mongodb_backup"

echo 📊 Exporting MongoDB collections...

REM Export users collection (contains all 46 alumni with profile images)
mongoexport --host localhost:27017 --db gradsyncdb --collection users --out "GradSync_Migration_Package\mongodb_backup\gradsyncdb_users.json" --pretty
if %errorlevel% equ 0 (
    echo ✅ Users collection exported successfully
) else (
    echo ❌ Failed to export users collection
)

REM Export batches collection
mongoexport --host localhost:27017 --db gradsyncdb --collection batches --out "GradSync_Migration_Package\mongodb_backup\gradsyncdb_batches.json" --pretty
if %errorlevel% equ 0 (
    echo ✅ Batches collection exported successfully
) else (
    echo ❌ Failed to export batches collection
)

REM Export companies collection
mongoexport --host localhost:27017 --db gradsyncdb --collection companies --out "GradSync_Migration_Package\mongodb_backup\gradsyncdb_companies.json" --pretty
if %errorlevel% equ 0 (
    echo ✅ Companies collection exported successfully
) else (
    echo ❌ Failed to export companies collection
)

REM Export placements collection
mongoexport --host localhost:27017 --db gradsyncdb --collection placements --out "GradSync_Migration_Package\mongodb_backup\gradsyncdb_placements.json" --pretty
if %errorlevel% equ 0 (
    echo ✅ Placements collection exported successfully
) else (
    echo ❌ Failed to export placements collection
)

echo.
echo 📊 MongoDB Export Summary:
echo - Database: gradsyncdb
echo - Collections: users, batches, companies, placements
echo - Format: JSON (human-readable)
echo - Location: GradSync_Migration_Package\mongodb_backup\
echo.
echo ✅ MongoDB export completed!
pause
