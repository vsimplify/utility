@echo off
echo ==========================================
echo BAMOE 9.3 Windows Setup & Build Script
echo ==========================================

echo [1/4] Checking Java version...
java -version
if %errorlevel% neq 0 (
    echo Error: Java is not installed or not in PATH.
    exit /b 1
)

echo [2/4] Cleaning previous builds...
call mvn clean
if %errorlevel% neq 0 (
    echo Error: Maven clean failed.
    exit /b 1
)

echo [3/4] Installing frontend dependencies...
cd .
call npm install
if %errorlevel% neq 0 (
    echo Error: npm install failed.
    exit /b 1
)

echo [4/4] Building project...
call mvn install -DskipTests
if %errorlevel% neq 0 (
    echo Error: Maven install failed.
    exit /b 1
)

echo ==========================================
echo Build Successful!
echo Run 'mvn quarkus:dev' to start the application.
echo ==========================================
pause