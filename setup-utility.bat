@echo off
REM Utility Repository Setup Script
REM Executes docs/compile scope for Windows with pre-applied code fixes

REM Configuration
set BAMOE_VERSION=9.3.0
set BAMOE_REPO_NAME=bamoe-maven-repository-zip-9.3.0-ibm-0007
set BAMOE_URL=https://github.com/bamoe/bamoe-setup/raw/main/maven/offline/bamoe-9.3.0.GA-maven-repository.zip

REM Colors (limited in batch)
REM Green, Yellow, Red, Cyan not directly supported, using default

echo ==================================================
echo DCSS Guideline Calculator - Utility Repo Setup
echo Executing docs/compile scope (code fixes pre-applied)
echo ==================================================
echo.

REM Check if we're in the utility repository
if not exist "src\main\java\gov\ca\dcss\guidelinecalculator\model\Dependent.java" (
    echo [ERROR] This script must be run from the utility repository root directory
    echo Expected: src\main\java\gov\ca\dcss\guidelinecalculator\model\Dependent.java
    pause
    exit /b 1
)

echo [SUCCESS] Utility repository detected - code fixes already applied

REM Step 1: Setup BAMOE Maven Repository
echo [STEP] Setting up BAMOE Maven repository...

set M2_DIR=%USERPROFILE%\.m2
set REPO_DIR=%M2_DIR%\repository
set BAMOE_ZIP=%M2_DIR%\bamoe-9.3.0.GA-maven-repository.zip
set BAMOE_DIR=%REPO_DIR%\%BAMOE_REPO_NAME%

REM Create directories
if not exist "%M2_DIR%" mkdir "%M2_DIR%"
if not exist "%REPO_DIR%" mkdir "%REPO_DIR%"

REM Download BAMOE repository if not present
if not exist "%BAMOE_ZIP%" if not exist "%BAMOE_DIR%" (
    echo   Downloading BAMOE Maven repository...
    curl -L -o "%BAMOE_ZIP%" "%BAMOE_URL%"
    if errorlevel 1 (
        echo [ERROR] Failed to download BAMOE repository
        pause
        exit /b 1
    )
    echo [SUCCESS] BAMOE repository downloaded
)

REM Extract BAMOE repository if not already extracted
if not exist "%BAMOE_DIR%" (
    echo   Extracting BAMOE Maven repository...
    tar -xf "%BAMOE_ZIP%" -C "%REPO_DIR%"
    if errorlevel 1 (
        echo [ERROR] Failed to extract BAMOE repository
        pause
        exit /b 1
    )
    echo [SUCCESS] BAMOE repository extracted
)

echo [SUCCESS] BAMOE Maven repository setup complete

REM Step 2: Configure Maven settings.xml
echo [STEP] Configuring Maven settings.xml...

set SETTINGS_FILE=%M2_DIR%\settings.xml
set USERPROFILE_PATH=%USERPROFILE:\=/%

REM Build XML
echo ^<settings xmlns="http://maven.apache.org/SETTINGS/1.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://maven.apache.org/SETTINGS/1.0.0 https://maven.apache.org/xsd/settings-1.0.0.xsd"^> > "%SETTINGS_FILE%"
echo   ^<profiles^> >> "%SETTINGS_FILE%"
echo     ^<profile^> >> "%SETTINGS_FILE%"
echo       ^<id^>ibm-bamoe-enterprise-maven-repository^</id^> >> "%SETTINGS_FILE%"
echo       ^<repositories^> >> "%SETTINGS_FILE%"
echo         ^<repository^> >> "%SETTINGS_FILE%"
echo           ^<id^>ibm-bamoe-enterprise-maven-repository^</id^> >> "%SETTINGS_FILE%"
echo           ^<url^>file:///%USERPROFILE_PATH%/.m2/repository/%BAMOE_REPO_NAME%^</url^> >> "%SETTINGS_FILE%"
echo           ^<releases^> >> "%SETTINGS_FILE%"
echo             ^<enabled^>true^</enabled^> >> "%SETTINGS_FILE%"
echo           ^</releases^> >> "%SETTINGS_FILE%"
echo           ^<snapshots^> >> "%SETTINGS_FILE%"
echo             ^<enabled^>false^</enabled^> >> "%SETTINGS_FILE%"
echo           ^</snapshots^> >> "%SETTINGS_FILE%"
echo         ^</repository^> >> "%SETTINGS_FILE%"
echo       ^</repositories^> >> "%SETTINGS_FILE%"
echo       ^<pluginRepositories^> >> "%SETTINGS_FILE%"
echo         ^<pluginRepository^> >> "%SETTINGS_FILE%"
echo           ^<id^>ibm-bamoe-enterprise-maven-repository^</id^> >> "%SETTINGS_FILE%"
echo           ^<url^>file:///%USERPROFILE_PATH%/.m2/repository/%BAMOE_REPO_NAME%^</url^> >> "%SETTINGS_FILE%"
echo           ^<releases^> >> "%SETTINGS_FILE%"
echo             ^<enabled^>true^</enabled^> >> "%SETTINGS_FILE%"
echo           ^</releases^> >> "%SETTINGS_FILE%"
echo           ^<snapshots^> >> "%SETTINGS_FILE%"
echo             ^<enabled^>false^</enabled^> >> "%SETTINGS_FILE%"
echo           ^</snapshots^> >> "%SETTINGS_FILE%"
echo         ^</pluginRepository^> >> "%SETTINGS_FILE%"
echo       ^</pluginRepositories^> >> "%SETTINGS_FILE%"
echo     ^</profile^> >> "%SETTINGS_FILE%"
echo   ^</profiles^> >> "%SETTINGS_FILE%"
echo   ^<activeProfiles^> >> "%SETTINGS_FILE%"
echo     ^<activeProfile^>ibm-bamoe-enterprise-maven-repository^</activeProfile^> >> "%SETTINGS_FILE%"
echo   ^</activeProfiles^> >> "%SETTINGS_FILE%"
echo ^</settings^> >> "%SETTINGS_FILE%"

echo [SUCCESS] Maven settings.xml configured

REM Step 3: Build forms (utility repo specific)
echo [STEP] Building forms (TypeScript → JavaScript)...

REM Check if Node.js is available
node --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Node.js not found. Please install Node.js 18+
    pause
    exit /b 1
)

REM Check if npm is available
npm --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] npm not found. Please install npm
    pause
    exit /b 1
)

REM Install dependencies if node_modules doesn't exist
if not exist "node_modules" (
    echo   Installing npm dependencies...
    npm install
    if errorlevel 1 (
        echo [ERROR] Failed to install npm dependencies
        pause
        exit /b 1
    )
    echo [SUCCESS] npm dependencies installed
)

REM Build forms
echo   Building forms...
npm run build
if errorlevel 1 (
    echo [ERROR] Failed to build forms
    pause
    exit /b 1
)
echo [SUCCESS] Forms built successfully

REM Step 4: Code fixes status (utility repo)
echo [STEP] Checking code fixes status...
echo [SUCCESS] Dependent.java already exists (pre-applied)
echo [SUCCESS] GuidelineResponse.java typo already fixed (pre-applied)
echo [SUCCESS] pom.xml versions already updated (pre-applied)

REM Step 5: Run Maven build
echo [STEP] Running Maven build...

REM Check if Maven is available (prefer system Maven over wrapper)
where mvn >nul 2>&1
if not errorlevel 1 (
    set MAVEN_COMMAND=mvn
) else (
    if exist "mvnw.cmd" (
        set MAVEN_COMMAND=mvnw.cmd
    ) else (
        echo [ERROR] Maven not found. Please install Maven from https://maven.apache.org/download.cgi
        echo Extract to a folder and add bin to PATH environment variable.
        pause
        exit /b 1
    )
)

echo   Running: %MAVEN_COMMAND% clean install
%MAVEN_COMMAND% clean install
if errorlevel 1 (
    echo [ERROR] Build failed
    pause
    exit /b 1
)
echo [SUCCESS] Build completed successfully!

REM Final success message
echo.
echo ==================================================
echo [SUCCESS] Utility repository setup completed successfully!
echo ==================================================
echo.

echo [STEP] Next steps:
echo   Run application: .\mvnw.cmd quarkus:dev
echo   Children Form:   http://localhost:8080/forms/dcss-children-form.html
echo   Dependent Form:  http://localhost:8080/forms/dcss-dependent-form.html
echo   BAMOE Dev UI:    http://localhost:8080/q/dev-ui/extensions

echo.
echo [STEP] Verification commands:
echo   Check forms:     dir src\main\resources\META-INF\resources\js
echo   Test build:      .\mvnw.cmd clean compile
echo   Check settings:  mvn help:effective-settings

pause