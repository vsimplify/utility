@echo off
echo ========================================
echo DCSS Guideline Calculator Forms Setup
echo ========================================
echo.

echo Step 1: Cleaning previous builds...
call npm run clean
if %errorlevel% neq 0 (
    echo WARNING: Clean failed or nothing to clean. Continuing...
)

echo Step 2: Installing Node.js dependencies...
call npm install
if %errorlevel% neq 0 (
    echo ERROR: npm install failed
    pause
    exit /b 1
)
echo ✓ Node.js dependencies installed
echo.

echo Step 2: Building forms...
call npm run build
if %errorlevel% neq 0 (
    echo ERROR: npm run build failed
    pause
    exit /b 1
)
echo ✓ Forms built successfully
echo.

echo Step 3: Starting application...
echo.
echo Application will be available at:
echo - Children Form: http://localhost:8080/forms/dcss-children-form.html
echo - Dependent Form: http://localhost:8080/forms/dcss-dependent-form.html
echo - BAMOE Dev UI: http://localhost:8080/q/dev-ui/extensions
echo.
echo Press Ctrl+C to stop the application
echo.

call mvn quarkus:dev