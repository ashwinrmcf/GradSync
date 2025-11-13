@echo off
echo 🔍 Finding MongoDB Installation...
echo ================================

echo Checking common MongoDB installation paths...

set MONGO_FOUND=0

REM Check Program Files
if exist "C:\Program Files\MongoDB\Server\*\bin\mongosh.exe" (
    for /d %%i in ("C:\Program Files\MongoDB\Server\*") do (
        if exist "%%i\bin\mongosh.exe" (
            echo ✅ Found MongoDB at: %%i\bin\
            set "MONGO_PATH=%%i\bin"
            set MONGO_FOUND=1
            goto :found
        )
    )
)

REM Check Program Files (x86)
if exist "C:\Program Files (x86)\MongoDB\Server\*\bin\mongosh.exe" (
    for /d %%i in ("C:\Program Files (x86)\MongoDB\Server\*") do (
        if exist "%%i\bin\mongosh.exe" (
            echo ✅ Found MongoDB at: %%i\bin\
            set "MONGO_PATH=%%i\bin"
            set MONGO_FOUND=1
            goto :found
        )
    )
)

REM Check if MongoDB Tools are separate
if exist "C:\Program Files\MongoDB\Tools\*\bin\mongoimport.exe" (
    for /d %%i in ("C:\Program Files\MongoDB\Tools\*") do (
        if exist "%%i\bin\mongoimport.exe" (
            echo ✅ Found MongoDB Tools at: %%i\bin\
            set "MONGO_TOOLS_PATH=%%i\bin"
        )
    )
)

:found
if %MONGO_FOUND%==0 (
    echo ❌ MongoDB not found in standard locations
    echo.
    echo 💡 Please install MongoDB or use MongoDB Compass method
    echo    Download from: https://www.mongodb.com/try/download/community
    pause
    exit /b 1
)

echo.
echo 🚀 Creating updated merge script with correct paths...

REM Create new batch file with correct paths
(
echo @echo off
echo echo 🔄 MongoDB Database Merge Process
echo echo ================================
echo echo.
echo.
echo echo Step 1: Importing old database to temporary collection...
echo echo --------------------------------------------------------
echo cd "D:\GradSync\GradSync_Migration_Package\mongodb_backup"
if defined MONGO_TOOLS_PATH (
    echo "%MONGO_TOOLS_PATH%\mongoimport.exe" --db gradsyncdb --collection users_old --file gradsyncdb_users.json --jsonArray
) else (
    echo "%MONGO_PATH%\mongoimport.exe" --db gradsyncdb --collection users_old --file gradsyncdb_users.json --jsonArray
)
echo.
echo echo Step 2: Running merge script...
echo echo ------------------------------
echo cd "D:\GradSync"
echo "%MONGO_PATH%\mongosh.exe" gradsyncdb merge_users.js
echo.
echo echo ✅ Database merge completed!
echo echo.
echo pause
) > "D:\GradSync\merge_databases_fixed.bat"

echo ✅ Created: merge_databases_fixed.bat
echo.
echo 🎯 You can now run: merge_databases_fixed.bat
echo.
pause
