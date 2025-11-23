@echo off
setlocal EnableDelayedExpansion

echo ========================================================
echo BAMOE Forms Sync Verification Script
echo ========================================================
echo.

set "MISSING_FILES=0"
set "ERRORS=0"

:: 1. Verify Root Files
call :CheckFile "ibm.com_lBM_Decision_Manager_Open_Edition-9.3.0.swidtag"

:: 2. Verify Custom Forms Files
set "FORMS_DIR=src\main\resources\custom-forms-dev"
call :CheckFile "%FORMS_DIR%\Guidelinecalculator.config"
call :CheckFile "%FORMS_DIR%\Guidelinecalculator.tsx"
call :CheckFile "%FORMS_DIR%\guidelinecalculator_Calculate_Child_Support.config"
call :CheckFile "%FORMS_DIR%\guidelinecalculator_Calculate_Child_Support.tsx"
call :CheckFile "%FORMS_DIR%\guidelinecalculator_EnterChildren.config"
call :CheckFile "%FORMS_DIR%\guidelinecalculator_EnterChildren.tsx"
call :CheckFile "%FORMS_DIR%\guidelinecalculator_lnputDependentlnfo.config"
call :CheckFile "%FORMS_DIR%\guidelinecalculator_lnputDependentlnfo.tsx"

:: 2b. Verify POM Structure (Fix for Malformed POM)
findstr /C:"<resources>" "pom.xml" >nul
if !errorlevel! neq 0 (
    echo [FAIL] pom.xml: Missing 'resources' wrapper tag. Please 'git pull'.
    set /a ERRORS+=1
) else (
    echo [OK] pom.xml: Found 'resources' tag (Malformed POM fix verified)
)

:: 3. Verify Application Properties Configuration
set "APP_PROP=src\main\resources\application.properties"
call :CheckFile "%APP_PROP%"

if exist "%APP_PROP%" (
    findstr /C:"quarkus.datasource.db-kind=h2" "%APP_PROP%" >nul
    if !errorlevel! neq 0 (
        echo [FAIL] application.properties: Missing 'quarkus.datasource.db-kind=h2'
        set /a ERRORS+=1
    ) else (
        echo [OK] application.properties: Found H2 datasource config
    )

    findstr /C:"kogito.service.url=http://localhost:8080" "%APP_PROP%" >nul
    if !errorlevel! neq 0 (
        echo [FAIL] application.properties: Missing 'kogito.service.url'
        set /a ERRORS+=1
    ) else (
        echo [OK] application.properties: Found Kogito Service URL
    )

    findstr /C:"quarkus.http.cors.origins=*" "%APP_PROP%" >nul
    if !errorlevel! neq 0 (
        echo [FAIL] application.properties: Missing 'quarkus.http.cors.origins=*'
        set /a ERRORS+=1
    ) else (
        echo [OK] application.properties: Found CORS Origins config
    )
)

echo.
echo ========================================================
if %MISSING_FILES% equ 0 (
    if %ERRORS% equ 0 (
        echo [SUCCESS] All files present and configured correctly.
        echo You can now safely proceed with 'mvn clean install'.
    ) else (
        echo [FAIL] Configuration errors detected.
    )
) else (
    echo [FAIL] %MISSING_FILES% required files are missing.
)
echo ========================================================

goto :eof

:CheckFile
if exist "%~1" (
    echo [OK] Found %~1
) else (
    echo [MISSING] %~1
    set /a MISSING_FILES+=1
)
goto :eof
