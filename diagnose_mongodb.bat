@echo off
echo 🔍 MongoDB Diagnostic Script
echo ===========================

echo.
echo 📊 Step 1: Checking MongoDB Installation...
echo ==========================================

REM Check if mongo command exists
where mongo >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ mongo command found
    mongo --version
) else (
    echo ❌ mongo command not found in PATH
)

echo.
REM Check if mongoexport command exists
where mongoexport >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ mongoexport command found
    mongoexport --version
) else (
    echo ❌ mongoexport command not found in PATH
    echo 💡 MongoDB Database Tools may not be installed or not in PATH
)

echo.
echo 📊 Step 2: Testing MongoDB Connection...
echo =======================================

REM Test MongoDB connection
echo Testing connection to localhost:27017...
mongo --host localhost:27017 --eval "db.adminCommand('ismaster')" --quiet
if %errorlevel% equ 0 (
    echo ✅ MongoDB connection successful
) else (
    echo ❌ Cannot connect to MongoDB at localhost:27017
    echo 💡 Make sure MongoDB is running
)

echo.
echo 📊 Step 3: Checking Database and Collections...
echo ==============================================

REM List databases
echo Listing all databases...
mongo --host localhost:27017 --eval "db.adminCommand('listDatabases')" --quiet

echo.
echo Checking gradsyncdb database...
mongo --host localhost:27017 gradsyncdb --eval "db.stats()" --quiet
if %errorlevel% equ 0 (
    echo ✅ gradsyncdb database exists
) else (
    echo ❌ gradsyncdb database not found
)

echo.
echo Listing collections in gradsyncdb...
mongo --host localhost:27017 gradsyncdb --eval "db.getCollectionNames()" --quiet

echo.
echo Counting documents in users collection...
mongo --host localhost:27017 gradsyncdb --eval "db.users.count()" --quiet

echo.
echo 📊 Step 4: Testing mongoexport...
echo ================================

REM Test mongoexport with a simple query
echo Testing mongoexport with users collection...
mongoexport --host localhost:27017 --db gradsyncdb --collection users --limit 1 --out test_export.json
if %errorlevel% equ 0 (
    echo ✅ mongoexport test successful
    if exist test_export.json (
        echo ✅ Test file created
        type test_export.json
        del test_export.json
    )
) else (
    echo ❌ mongoexport test failed
    echo Error code: %errorlevel%
)

echo.
echo 🔍 Diagnostic Complete!
echo ======================
echo.
pause
