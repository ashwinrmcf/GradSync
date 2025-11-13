@echo off
echo 🚀 Fixed MongoDB Export Script
echo =============================

REM Create backup directory
if not exist "GradSync_Migration_Package\mongodb_backup" mkdir "GradSync_Migration_Package\mongodb_backup"

echo.
echo 📊 Step 1: Checking Prerequisites...
echo ===================================

REM Check if mongoexport exists
where mongoexport >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ mongoexport not found in PATH
    echo.
    echo 💡 Trying alternative locations...
    
    REM Try common MongoDB installation paths
    if exist "C:\Program Files\MongoDB\Server\8.0\bin\mongoexport.exe" (
        set MONGOEXPORT="C:\Program Files\MongoDB\Server\8.0\bin\mongoexport.exe"
        echo ✅ Found mongoexport at MongoDB 8.0 location
    ) else if exist "C:\Program Files\MongoDB\Server\7.0\bin\mongoexport.exe" (
        set MONGOEXPORT="C:\Program Files\MongoDB\Server\7.0\bin\mongoexport.exe"
        echo ✅ Found mongoexport at MongoDB 7.0 location
    ) else if exist "C:\Program Files\MongoDB\Tools\100\bin\mongoexport.exe" (
        set MONGOEXPORT="C:\Program Files\MongoDB\Tools\100\bin\mongoexport.exe"
        echo ✅ Found mongoexport in MongoDB Tools
    ) else (
        echo ❌ mongoexport not found in common locations
        echo.
        echo Please install MongoDB Database Tools:
        echo https://www.mongodb.com/try/download/database-tools
        pause
        exit /b 1
    )
) else (
    set MONGOEXPORT=mongoexport
    echo ✅ mongoexport found in PATH
)

echo.
echo 📊 Step 2: Testing MongoDB Connection...
echo =======================================

REM Test connection using mongo or mongosh
where mongosh >nul 2>&1
if %errorlevel% equ 0 (
    set MONGOCLIENT=mongosh
) else (
    set MONGOCLIENT=mongo
)

%MONGOCLIENT% --host localhost:27017 --eval "db.adminCommand('ping')" --quiet >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ MongoDB connection successful
) else (
    echo ❌ Cannot connect to MongoDB
    echo Please ensure MongoDB is running on localhost:27017
    pause
    exit /b 1
)

echo.
echo 📊 Step 3: Checking Database and Collections...
echo ==============================================

REM Check if gradsyncdb exists
%MONGOCLIENT% --host localhost:27017 gradsyncdb --eval "db.stats()" --quiet >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ gradsyncdb database found
) else (
    echo ❌ gradsyncdb database not found
    echo Available databases:
    %MONGOCLIENT% --host localhost:27017 --eval "db.adminCommand('listDatabases').databases.forEach(function(db) { print(db.name); })" --quiet
    pause
    exit /b 1
)

REM Count documents in users collection
for /f %%i in ('%MONGOCLIENT% --host localhost:27017 gradsyncdb --eval "db.users.countDocuments()" --quiet') do set USER_COUNT=%%i
echo ✅ Found %USER_COUNT% users in database

echo.
echo 📊 Step 4: Exporting Collections...
echo ==================================

REM Export users collection
echo Exporting users collection (%USER_COUNT% documents)...
%MONGOEXPORT% --host localhost:27017 --db gradsyncdb --collection users --out "GradSync_Migration_Package\mongodb_backup\gradsyncdb_users.json" --jsonArray --pretty
if %errorlevel% equ 0 (
    if exist "GradSync_Migration_Package\mongodb_backup\gradsyncdb_users.json" (
        echo ✅ Users collection exported successfully
        for %%A in ("GradSync_Migration_Package\mongodb_backup\gradsyncdb_users.json") do echo    File size: %%~zA bytes
    ) else (
        echo ❌ Export command succeeded but file not created
    )
) else (
    echo ❌ Failed to export users collection (Error: %errorlevel%)
)

REM Export batches collection
echo Exporting batches collection...
%MONGOEXPORT% --host localhost:27017 --db gradsyncdb --collection batches --out "GradSync_Migration_Package\mongodb_backup\gradsyncdb_batches.json" --jsonArray --pretty
if %errorlevel% equ 0 (
    if exist "GradSync_Migration_Package\mongodb_backup\gradsyncdb_batches.json" (
        echo ✅ Batches collection exported successfully
        for %%A in ("GradSync_Migration_Package\mongodb_backup\gradsyncdb_batches.json") do echo    File size: %%~zA bytes
    ) else (
        echo ❌ Export command succeeded but file not created
    )
) else (
    echo ❌ Failed to export batches collection (Error: %errorlevel%)
)

REM Export companies collection
echo Exporting companies collection...
%MONGOEXPORT% --host localhost:27017 --db gradsyncdb --collection companies --out "GradSync_Migration_Package\mongodb_backup\gradsyncdb_companies.json" --jsonArray --pretty
if %errorlevel% equ 0 (
    if exist "GradSync_Migration_Package\mongodb_backup\gradsyncdb_companies.json" (
        echo ✅ Companies collection exported successfully
        for %%A in ("GradSync_Migration_Package\mongodb_backup\gradsyncdb_companies.json") do echo    File size: %%~zA bytes
    ) else (
        echo ❌ Export command succeeded but file not created
    )
) else (
    echo ❌ Failed to export companies collection (Error: %errorlevel%)
)

REM Export placements collection
echo Exporting placements collection...
%MONGOEXPORT% --host localhost:27017 --db gradsyncdb --collection placements --out "GradSync_Migration_Package\mongodb_backup\gradsyncdb_placements.json" --jsonArray --pretty
if %errorlevel% equ 0 (
    if exist "GradSync_Migration_Package\mongodb_backup\gradsyncdb_placements.json" (
        echo ✅ Placements collection exported successfully
        for %%A in ("GradSync_Migration_Package\mongodb_backup\gradsyncdb_placements.json") do echo    File size: %%~zA bytes
    ) else (
        echo ❌ Export command succeeded but file not created
    )
) else (
    echo ❌ Failed to export placements collection (Error: %errorlevel%)
)

echo.
echo 📊 Step 5: Verification...
echo =========================

echo Checking exported files:
if exist "GradSync_Migration_Package\mongodb_backup\gradsyncdb_users.json" (
    echo ✅ gradsyncdb_users.json
) else (
    echo ❌ gradsyncdb_users.json missing
)

if exist "GradSync_Migration_Package\mongodb_backup\gradsyncdb_batches.json" (
    echo ✅ gradsyncdb_batches.json
) else (
    echo ❌ gradsyncdb_batches.json missing
)

if exist "GradSync_Migration_Package\mongodb_backup\gradsyncdb_companies.json" (
    echo ✅ gradsyncdb_companies.json
) else (
    echo ❌ gradsyncdb_companies.json missing
)

if exist "GradSync_Migration_Package\mongodb_backup\gradsyncdb_placements.json" (
    echo ✅ gradsyncdb_placements.json
) else (
    echo ❌ gradsyncdb_placements.json missing
)

echo.
echo 🎉 MongoDB Export Complete!
echo ==========================
pause
