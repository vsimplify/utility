# Windows Setup: Execute docs/compile Scope with Utility Repository

This guide provides steps to execute the scope documented in `docs/compile` using the code cloned from the `utility` repository, adapted for Windows environment where `.m2` repository contents differ.

## 📋 Prerequisites

- **Windows 10/11** with PowerShell
- **Java 17** (OpenJDK or Oracle JDK)
- **Maven 3.8+**
- **Git**
- **Node.js 18+** and **npm** (for form compilation)

## 🎯 Scope Overview (Adapted for Utility Repo)

The `docs/compile` script performs these tasks, but the **utility repository already includes most fixes**:

1. ✅ **Setup BAMOE Maven Repository** - Download and configure offline repository
2. ✅ **Configure Maven Settings** - Create settings.xml with BAMOE repository paths
3. ✅ **Apply Code Fixes** - **ALREADY APPLIED** in utility repo (Dependent.java exists, versions updated)
4. ✅ **Run Maven Build** - Compile and package the application

## 🚀 Quick Start (Utility Repository)

### Step 1: Clone and Setup

```bash
# Clone the utility repository
git clone https://github.com/vsimplify/utility.git
cd utility

# Install Node.js dependencies (for form compilation)
npm install
```

### Step 2: Setup BAMOE Maven Repository

```powershell
# Open PowerShell as Administrator
# Setup BAMOE repository (same as docs/compile)

$BAMOE_URL = "https://github.com/bamoe/bamoe-setup/raw/main/maven/offline/bamoe-9.3.0.GA-maven-repository.zip"
$BAMOE_ZIP = "$env:USERPROFILE\.m2\bamoe-9.3.0.GA-maven-repository.zip"
$BAMOE_DIR = "$env:USERPROFILE\.m2\repository\bamoe-maven-repository-zip-9.3.0-ibm-0007"

# Create directories
New-Item -ItemType Directory -Force -Path "$env:USERPROFILE\.m2"
New-Item -ItemType Directory -Force -Path "$env:USERPROFILE\.m2\repository"

# Download if not exists
if (!(Test-Path $BAMOE_ZIP) -and !(Test-Path $BAMOE_DIR)) {
    Write-Host "Downloading BAMOE Maven repository..."
    Invoke-WebRequest -Uri $BAMOE_URL -OutFile $BAMOE_ZIP
}

# Extract if not already extracted
if (!(Test-Path $BAMOE_DIR)) {
    Write-Host "Extracting BAMOE Maven repository..."
    Expand-Archive -Path $BAMOE_ZIP -DestinationPath "$env:USERPROFILE\.m2\repository"
}
```

### Step 3: Configure Maven Settings

Create `%USERPROFILE%\.m2\settings.xml`:

```xml
<settings xmlns="http://maven.apache.org/SETTINGS/1.0.0"
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          xsi:schemaLocation="http://maven.apache.org/SETTINGS/1.0.0
                              https://maven.apache.org/xsd/settings-1.0.0.xsd">
  <profiles>
    <profile>
      <id>ibm-bamoe-enterprise-maven-repository</id>
      <repositories>
        <repository>
          <id>ibm-bamoe-enterprise-maven-repository</id>
          <url>file:///${user.home}/.m2/repository/bamoe-maven-repository-zip-9.3.0-ibm-0007</url>
          <releases>
            <enabled>true</enabled>
          </releases>
          <snapshots>
            <enabled>false</enabled>
          </snapshots>
        </repository>
      </repositories>
      <pluginRepositories>
        <pluginRepository>
          <id>ibm-bamoe-enterprise-maven-repository</id>
          <url>file:///${user.home}/.m2/repository/bamoe-maven-repository-zip-9.3.0-ibm-0007</url>
          <releases>
            <enabled>true</enabled>
          </releases>
          <snapshots>
            <enabled>false</enabled>
          </snapshots>
        </pluginRepository>
      </pluginRepositories>
    </profile>
  </profiles>
  <activeProfiles>
    <activeProfile>ibm-bamoe-enterprise-maven-repository</activeProfile>
  </activeProfiles>
</settings>
```

### Step 4: Build Forms (Utility Repo Specific)

```bash
# Build TypeScript forms to JavaScript (utility repo only)
npm run build
```

### Step 5: Run Maven Build

```bash
# Clean and build (same as docs/compile)
mvn clean install
```

### Step 6: Run Application

```bash
# Start the application
mvn quarkus:dev
```

## 🔄 Key Differences: Utility Repo vs Original docs/compile

| **Task** | **Original docs/compile** | **Utility Repository** | **Status** |
|----------|---------------------------|-------------------------|------------|
| **Create Dependent.java** | ✅ Creates file | ✅ **Already exists** | **SKIP** |
| **Fix GuidelineResponse.java** | ✅ Fixes typo | ✅ **Already fixed** | **SKIP** |
| **Update pom.xml versions** | ✅ Updates to 3.20.2.2 | ✅ **Already updated** | **SKIP** |
| **Setup BAMOE repo** | ✅ Downloads & extracts | ✅ **Same steps needed** | **REQUIRED** |
| **Configure Maven** | ✅ Creates settings.xml | ✅ **Same steps needed** | **REQUIRED** |
| **Build forms** | ❌ Not included | ✅ **npm run build needed** | **REQUIRED** |
| **Maven build** | ✅ mvn clean install | ✅ **Same command** | **REQUIRED** |

## 🎯 Utility Repository Advantages

### ✅ **Pre-Applied Code Fixes**
- **Dependent.java**: Already created and included
- **GuidelineResponse.java**: Typo already fixed
- **pom.xml**: Versions already updated to 3.20.2.2
- **Forms**: TypeScript compiled to JavaScript

### ✅ **Windows-Optimized**
- **No macOS resource forks**: Clean for Windows deployment
- **Maven wrapper**: `mvnw.cmd` included
- **Setup script**: `setup-windows.bat` provided

### ✅ **Complete Package**
- **All source code**: Java, TypeScript, resources
- **Build system**: webpack + Maven configuration
- **Documentation**: Comprehensive README with diagrams

## 🚀 Automated Setup (Recommended)

Use the provided setup script:

```bash
# Automated setup (builds forms and configures everything)
setup-windows.bat
```

Or use the PowerShell script from docs:

```powershell
# Copy and run the PowerShell script
.\docs\windows-setup.ps1 -SkipDownload  # If BAMOE repo already downloaded
```

## 📊 Expected Results

After successful setup:
- ✅ BAMOE Maven repository configured
- ✅ Maven settings.xml created
- ✅ **Code fixes already applied** (utility repo)
- ✅ **Forms already compiled** (utility repo)
- ✅ Project builds successfully
- ✅ Application starts on http://localhost:8080

## 🎯 Access Points

- **Children Form**: http://localhost:8080/forms/dcss-children-form.html
- **Dependent Form**: http://localhost:8080/forms/dcss-dependent-form.html
- **BAMOE Dev UI**: http://localhost:8080/q/dev-ui/extensions

## 🚨 Troubleshooting

### Build Fails
```bash
# Check Maven settings
mvn help:effective-settings

# Clean and retry
mvn clean
npm run build
mvn install
```

### Repository Issues
```powershell
# Verify BAMOE repository
Test-Path "$env:USERPROFILE\.m2\repository\bamoe-maven-repository-zip-9.3.0-ibm-0007"
```

### Form Compilation Issues
```bash
# Rebuild forms
npm install
npm run build
```

## 📋 Verification Steps

1. **Check repository setup:**
   ```cmd
   dir "%USERPROFILE%\.m2\repository\bamoe-maven-repository-zip-9.3.0-ibm-0007"
   ```

2. **Verify forms built:**
   ```cmd
   dir "src\main\resources\META-INF\resources\js"
   ```

3. **Test Maven:**
   ```cmd
   mvn clean compile
   ```

4. **Run application:**
   ```cmd
   mvn quarkus:dev
   ```

---

**The utility repository streamlines the `docs/compile` process by pre-applying all code fixes, making Windows setup much simpler!** 🎉

## ✅ Verification Automation

To ensure that your `main` branch is correctly synced with the required forms and configuration, run the provided verification script:

```cmd
verify-sync.bat
```

This script checks for:
1. Presence of all React form files (`.tsx`, `.config`)
2. Presence of the `.swidtag` file
3. Correct H2 database configuration in `application.properties`

If the script reports **[SUCCESS]**, you are ready to build!



## 💻 Command Reference (Cheatsheet)

For manual execution or troubleshooting, here are the individual commands required to build the project components.

### 1. Build React Forms
**Required whenever you change `.tsx` files.**
```cmd
npm install
npm run build
```
*Note: This compiles TypeScript forms in `src/main/resources/custom-forms-dev` into JavaScript in `src/main/resources/META-INF/resources/js`.*

### 2. Build Java Application
**Required whenever you change `.java`, `.bpmn`, `.dmn`, or `.drl` files.**
```cmd
mvn clean install
```

### 3. Run Application
```cmd
mvn quarkus:dev
```

### ⚡ Shortcuts
- **`setup-utility.bat`**: Runs ALL of the above (Setup Repo + Build Forms + Build App). Use for first-time setup.
- **`setup-windows.bat`**: Runs `npm install` + `npm run build` + `mvn quarkus:dev`. Use for daily development.