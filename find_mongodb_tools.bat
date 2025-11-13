@echo off
echo 🔍 Finding MongoDB Tools Installation
echo ====================================

echo.
echo 📁 Searching common MongoDB installation paths...

REM Check MongoDB Server installations
for %%v in (8.0 8.1 8.2 7.0 6.0) do (
    if exist "C:\Program Files\MongoDB\Server\%%v\bin\mongo.exe" (
        echo ✅ Found MongoDB %%v Server at: C:\Program Files\MongoDB\Server\%%v\bin\
        set MONGO_SERVER_PATH=C:\Program Files\MongoDB\Server\%%v\bin
    )
    if exist "C:\Program Files\MongoDB\Server\%%v\bin\mongosh.exe" (
        echo ✅ Found mongosh %%v at: C:\Program Files\MongoDB\Server\%%v\bin\
        set MONGOSH_PATH=C:\Program Files\MongoDB\Server\%%v\bin
    )
)

REM Check MongoDB Tools installations
for %%v in (100 101 102) do (
    if exist "C:\Program Files\MongoDB\Tools\%%v\bin\mongoexport.exe" (
        echo ✅ Found MongoDB Tools %%v at: C:\Program Files\MongoDB\Tools\%%v\bin\
        set MONGO_TOOLS_PATH=C:\Program Files\MongoDB\Tools\%%v\bin
    )
)

REM Check MongoDB Database Tools
if exist "C:\Program Files\MongoDB\Tools\bin\mongoexport.exe" (
    echo ✅ Found MongoDB Database Tools at: C:\Program Files\MongoDB\Tools\bin\
    set MONGO_TOOLS_PATH=C:\Program Files\MongoDB\Tools\bin
)

echo.
echo 🔧 To add MongoDB tools to PATH temporarily:
echo ===========================================

if defined MONGOSH_PATH (
    echo set PATH=%%PATH%%;"%MONGOSH_PATH%"
)
if defined MONGO_SERVER_PATH (
    echo set PATH=%%PATH%%;"%MONGO_SERVER_PATH%"
)
if defined MONGO_TOOLS_PATH (
    echo set PATH=%%PATH%%;"%MONGO_TOOLS_PATH%"
)

echo.
echo 💡 If MongoDB Database Tools are missing:
echo ========================================
echo Download from: https://www.mongodb.com/try/download/database-tools
echo Install to: C:\Program Files\MongoDB\Tools\
echo.
pause
