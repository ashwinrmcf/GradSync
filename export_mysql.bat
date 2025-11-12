@echo off
echo 🐬 Exporting MySQL Database (gradsync_db)...

REM Create backup directory
if not exist "GradSync_Migration_Package\mysql_backup" mkdir "GradSync_Migration_Package\mysql_backup"

echo 📊 Exporting MySQL database...

REM Prompt for MySQL password
set /p mysql_password=Enter MySQL root password: 

REM Export complete database
mysqldump -u root -p%mysql_password% --single-transaction --routines --triggers gradsync_db > "GradSync_Migration_Package\mysql_backup\gradsync_db_complete.sql"

if %errorlevel% equ 0 (
    echo ✅ MySQL database exported successfully
) else (
    echo ❌ Failed to export MySQL database
    echo Please check:
    echo - MySQL is running
    echo - Password is correct
    echo - gradsync_db database exists
    pause
    exit /b 1
)

echo.
echo 🐬 MySQL Export Summary:
echo - Database: gradsync_db
echo - Tables: users, roles, user_roles, etc.
echo - Format: SQL dump
echo - Location: GradSync_Migration_Package\mysql_backup\gradsync_db_complete.sql
echo.
echo ✅ MySQL export completed!
pause
