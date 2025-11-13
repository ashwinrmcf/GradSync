@echo off
echo 🔧 Fixing Git Issues
echo ===================

echo.
echo Step 1: Stopping any running processes...
echo Please make sure to stop your Spring Boot application (Ctrl+C)
pause

echo.
echo Step 2: Cleaning up log files...
if exist "backend\logs\gradsync.log" (
    del /f "backend\logs\gradsync.log" 2>nul
    echo ✅ Removed gradsync.log
) else (
    echo ✅ gradsync.log already removed
)

echo.
echo Step 3: Instructions for GitHub Desktop:
echo =======================================
echo 1. Open GitHub Desktop
echo 2. You should see the conflicted files
echo 3. Click "Discard all changes" or "Reset to this commit"
echo 4. Choose the latest commit to reset to
echo.
echo OR use Git Bash/Command Prompt:
echo git reset --hard HEAD
echo git clean -fd
echo.
echo Step 4: Restart your application:
echo ================================
echo 1. cd backend
echo 2. mvn spring-boot:run
echo.
echo ✅ Git issues should now be resolved!
echo.
pause
