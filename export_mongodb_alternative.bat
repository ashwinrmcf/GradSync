@echo off
echo 🚀 Alternative MongoDB Export (Using mongosh/mongo)
echo ==================================================

REM Create backup directory
if not exist "GradSync_Migration_Package\mongodb_backup" mkdir "GradSync_Migration_Package\mongodb_backup"

echo.
echo 📊 Method 1: Using mongosh/mongo with JavaScript...
echo ==================================================

REM Determine which MongoDB client to use
where mongosh >nul 2>&1
if %errorlevel% equ 0 (
    set MONGOCLIENT=mongosh
    echo ✅ Using mongosh (MongoDB Shell)
) else (
    where mongo >nul 2>&1
    if %errorlevel% equ 0 (
        set MONGOCLIENT=mongo
        echo ✅ Using mongo (Legacy MongoDB Shell)
    ) else (
        echo ❌ No MongoDB client found
        goto :MANUAL_METHOD
    )
)

echo.
echo Exporting users collection...
%MONGOCLIENT% --host localhost:27017 gradsyncdb --eval "printjson(db.users.find().toArray())" --quiet > "GradSync_Migration_Package\mongodb_backup\gradsyncdb_users.json"
if exist "GradSync_Migration_Package\mongodb_backup\gradsyncdb_users.json" (
    echo ✅ Users exported via %MONGOCLIENT%
) else (
    echo ❌ Users export failed
)

echo Exporting batches collection...
%MONGOCLIENT% --host localhost:27017 gradsyncdb --eval "printjson(db.batches.find().toArray())" --quiet > "GradSync_Migration_Package\mongodb_backup\gradsyncdb_batches.json"
if exist "GradSync_Migration_Package\mongodb_backup\gradsyncdb_batches.json" (
    echo ✅ Batches exported via %MONGOCLIENT%
) else (
    echo ❌ Batches export failed
)

echo Exporting companies collection...
%MONGOCLIENT% --host localhost:27017 gradsyncdb --eval "printjson(db.companies.find().toArray())" --quiet > "GradSync_Migration_Package\mongodb_backup\gradsyncdb_companies.json"
if exist "GradSync_Migration_Package\mongodb_backup\gradsyncdb_companies.json" (
    echo ✅ Companies exported via %MONGOCLIENT%
) else (
    echo ❌ Companies export failed
)

echo Exporting placements collection...
%MONGOCLIENT% --host localhost:27017 gradsyncdb --eval "printjson(db.placements.find().toArray())" --quiet > "GradSync_Migration_Package\mongodb_backup\gradsyncdb_placements.json"
if exist "GradSync_Migration_Package\mongodb_backup\gradsyncdb_placements.json" (
    echo ✅ Placements exported via %MONGOCLIENT%
) else (
    echo ❌ Placements export failed
)

goto :VERIFY

:MANUAL_METHOD
echo.
echo 📊 Method 2: Manual Export Instructions...
echo =========================================
echo.
echo Since MongoDB command line tools are not available, please use MongoDB Compass:
echo.
echo 1. Open MongoDB Compass
echo 2. Connect to mongodb://localhost:27017
echo 3. Navigate to gradsyncdb database
echo 4. For each collection (users, batches, companies, placements):
echo    - Click on the collection
echo    - Click "Export Data" button
echo    - Choose "Export Full Collection"
echo    - Select "JSON" format
echo    - Save to GradSync_Migration_Package\mongodb_backup\
echo    - Name files: gradsyncdb_users.json, gradsyncdb_batches.json, etc.
echo.
echo Alternatively, you can use MongoDB Studio 3T or any other MongoDB GUI tool.
echo.
pause
goto :END

:VERIFY
echo.
echo 📊 Verification...
echo =================

echo Checking exported files:
for %%f in (users batches companies placements) do (
    if exist "GradSync_Migration_Package\mongodb_backup\gradsyncdb_%%f.json" (
        for %%A in ("GradSync_Migration_Package\mongodb_backup\gradsyncdb_%%f.json") do (
            if %%~zA gtr 100 (
                echo ✅ gradsyncdb_%%f.json (%%~zA bytes)
            ) else (
                echo ⚠️ gradsyncdb_%%f.json (%%~zA bytes - seems too small)
            )
        )
    ) else (
        echo ❌ gradsyncdb_%%f.json missing
    )
)

echo.
echo 🎉 Alternative Export Complete!
echo ==============================

:END
pause
