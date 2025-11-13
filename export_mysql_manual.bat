@echo off
echo 🐬 Manual MySQL Export
echo =====================

echo.
echo 📁 Searching for MySQL installation...

REM Check common MySQL installation paths
for %%v in (8.0 8.1 8.2 5.7) do (
    if exist "C:\Program Files\MySQL\MySQL Server %%v\bin\mysqldump.exe" (
        echo ✅ Found MySQL %%v at: C:\Program Files\MySQL\MySQL Server %%v\bin\
        set MYSQL_PATH="C:\Program Files\MySQL\MySQL Server %%v\bin\mysqldump.exe"
        goto :FOUND
    )
)

REM Check XAMPP installation
if exist "C:\xampp\mysql\bin\mysqldump.exe" (
    echo ✅ Found MySQL in XAMPP at: C:\xampp\mysql\bin\
    set MYSQL_PATH="C:\xampp\mysql\bin\mysqldump.exe"
    goto :FOUND
)

REM Check WAMP installation
if exist "C:\wamp64\bin\mysql\mysql8.0.31\bin\mysqldump.exe" (
    echo ✅ Found MySQL in WAMP
    set MYSQL_PATH="C:\wamp64\bin\mysql\mysql8.0.31\bin\mysqldump.exe"
    goto :FOUND
)

echo ❌ mysqldump not found in common locations
echo.
echo 💡 Please use phpMyAdmin instead:
echo 1. Open phpMyAdmin
echo 2. Select gradsync_db database
echo 3. Click Export tab
echo 4. Choose SQL format
echo 5. Save as: gradsync_db_complete.sql
echo 6. Move to: %CD%\GradSync_Migration_Package\mysql_backup\
goto :END

:FOUND
echo.
echo 📊 Exporting MySQL database...
set /p mysql_password=Enter MySQL root password: 

%MYSQL_PATH% -u root -p%mysql_password% --single-transaction --routines --triggers gradsync_db > "GradSync_Migration_Package\mysql_backup\gradsync_db_complete.sql"
if %errorlevel% equ 0 (
    echo ✅ MySQL database exported successfully!
) else (
    echo ❌ Export failed - please use phpMyAdmin method
)

:END
pause
