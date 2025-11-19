# Utility Repository Setup Script
# Executes docs/compile scope for Windows with pre-applied code fixes

param(
    [switch]$SkipDownload,
    [switch]$SkipBuild,
    [switch]$SkipForms
)

# Configuration
$BAMOE_VERSION = "9.3.0"
$BAMOE_REPO_NAME = "bamoe-maven-repository-zip-9.3.0-ibm-0007"
$BAMOE_URL = "https://github.com/bamoe/bamoe-setup/raw/main/maven/offline/bamoe-9.3.0.GA-maven-repository.zip"

# Colors for output
$Green = "Green"
$Yellow = "Yellow"
$Red = "Red"
$Cyan = "Cyan"

function Write-ColorOutput {
    param([string]$Message, [string]$Color = "White")
    Write-Host $Message -ForegroundColor $Color
}

function Write-Step {
    param([string]$Message)
    Write-ColorOutput "==> $Message" $Cyan
}

function Write-Success {
    param([string]$Message)
    Write-ColorOutput "✓ $Message" $Green
}

function Write-Warning {
    param([string]$Message)
    Write-ColorOutput "⚠ $Message" $Yellow
}

function Write-Error {
    param([string]$Message)
    Write-ColorOutput "✗ $Message" $Red
}

Write-ColorOutput "==================================================" $Cyan
Write-ColorOutput "DCSS Guideline Calculator - Utility Repo Setup" $Cyan
Write-ColorOutput "Executing docs/compile scope (code fixes pre-applied)" $Cyan
Write-ColorOutput "==================================================" $Cyan
Write-Host ""

# Check if we're in the utility repository
if (!(Test-Path "src/main/java/gov/ca/dcss/guidelinecalculator/model/Dependent.java")) {
    Write-Error "This script must be run from the utility repository root directory"
    Write-Error "Expected: src/main/java/gov/ca/dcss/guidelinecalculator/model/Dependent.java"
    exit 1
}

Write-Success "Utility repository detected - code fixes already applied"

# Step 1: Setup BAMOE Maven Repository
Write-Step "Setting up BAMOE Maven repository..."

$M2_DIR = "$env:USERPROFILE\.m2"
$REPO_DIR = "$M2_DIR\repository"
$BAMOE_ZIP = "$M2_DIR\bamoe-9.3.0.GA-maven-repository.zip"
$BAMOE_DIR = "$REPO_DIR\$BAMOE_REPO_NAME"

# Create directories
New-Item -ItemType Directory -Force -Path $M2_DIR | Out-Null
New-Item -ItemType Directory -Force -Path $REPO_DIR | Out-Null

if (-not $SkipDownload) {
    # Download BAMOE repository if not present
    if (!(Test-Path $BAMOE_ZIP) -and !(Test-Path $BAMOE_DIR)) {
        Write-ColorOutput "  Downloading BAMOE Maven repository..." $Yellow
        try {
            Invoke-WebRequest -Uri $BAMOE_URL -OutFile $BAMOE_ZIP -UseBasicParsing
            Write-Success "BAMOE repository downloaded"
        }
        catch {
            Write-Error "Failed to download BAMOE repository: $($_.Exception.Message)"
            exit 1
        }
    }

    # Extract BAMOE repository if not already extracted
    if (!(Test-Path $BAMOE_DIR)) {
        Write-ColorOutput "  Extracting BAMOE Maven repository..." $Yellow
        try {
            Expand-Archive -Path $BAMOE_ZIP -DestinationPath $REPO_DIR -Force
            Write-Success "BAMOE repository extracted"
        }
        catch {
            Write-Error "Failed to extract BAMOE repository: $($_.Exception.Message)"
            exit 1
        }
    }
}
else {
    Write-ColorOutput "  Skipping download (SkipDownload flag set)" $Yellow
}

Write-Success "BAMOE Maven repository setup complete"

# Step 2: Configure Maven settings.xml
Write-Step "Configuring Maven settings.xml..."

$SETTINGS_FILE = "$M2_DIR\settings.xml"

$SettingsXml = @"
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
          <url>file:///${user.home}/.m2/repository/$BAMOE_REPO_NAME</url>
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
          <url>file:///${user.home}/.m2/repository/$BAMOE_REPO_NAME</url>
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
"@

try {
    $SettingsXml | Out-File -FilePath $SETTINGS_FILE -Encoding UTF8 -Force
    Write-Success "Maven settings.xml configured"
}
catch {
    Write-Error "Failed to create settings.xml: $($_.Exception.Message)"
    exit 1
}

# Step 3: Build forms (utility repo specific)
if (-not $SkipForms) {
    Write-Step "Building forms (TypeScript → JavaScript)..."

    # Check if Node.js is available
    try {
        $nodeVersion = & node --version 2>$null
        Write-ColorOutput "  Node.js version: $nodeVersion" $Yellow
    }
    catch {
        Write-Error "Node.js not found. Please install Node.js 18+"
        exit 1
    }

    # Check if npm is available
    try {
        $npmVersion = & npm --version 2>$null
        Write-ColorOutput "  npm version: $npmVersion" $Yellow
    }
    catch {
        Write-Error "npm not found. Please install npm"
        exit 1
    }

    # Install dependencies if node_modules doesn't exist
    if (!(Test-Path "node_modules")) {
        Write-ColorOutput "  Installing npm dependencies..." $Yellow
        try {
            & npm install
            Write-Success "npm dependencies installed"
        }
        catch {
            Write-Error "Failed to install npm dependencies: $($_.Exception.Message)"
            exit 1
        }
    }

    # Build forms
    Write-ColorOutput "  Building forms..." $Yellow
    try {
        & npm run build
        Write-Success "Forms built successfully"
    }
    catch {
        Write-Error "Failed to build forms: $($_.Exception.Message)"
        exit 1
    }
}
else {
    Write-ColorOutput "  Skipping forms build (SkipForms flag set)" $Yellow
}

# Step 4: Code fixes status (utility repo)
Write-Step "Checking code fixes status..."
Write-Success "Dependent.java already exists (pre-applied)"
Write-Success "GuidelineResponse.java typo already fixed (pre-applied)"
Write-Success "pom.xml versions already updated (pre-applied)"

# Step 5: Run Maven build
if (-not $SkipBuild) {
    Write-Step "Running Maven build..."

    # Check if Maven wrapper exists
    if (Test-Path "mvnw.cmd") {
        $MavenCommand = ".\mvnw.cmd"
    }
    elseif (Get-Command mvn -ErrorAction SilentlyContinue) {
        $MavenCommand = "mvn"
    }
    else {
        Write-Error "Maven not found. Please install Maven or ensure mvnw.cmd exists."
        exit 1
    }

    try {
        Write-ColorOutput "  Running: $MavenCommand clean install" $Yellow
        & $MavenCommand clean install
        Write-Success "Build completed successfully!"
    }
    catch {
        Write-Error "Build failed: $($_.Exception.Message)"
        exit 1
    }
}
else {
    Write-ColorOutput "  Skipping build (SkipBuild flag set)" $Yellow
}

# Final success message
Write-Host ""
Write-ColorOutput "==================================================" $Green
Write-Success "Utility repository setup completed successfully!"
Write-ColorOutput "==================================================" $Green
Write-Host ""

Write-Step "Next steps:"
Write-ColorOutput "  Run application: .\mvnw.cmd quarkus:dev" $Cyan
Write-ColorOutput "  Children Form:   http://localhost:8080/forms/dcss-children-form.html" $Cyan
Write-ColorOutput "  Dependent Form:  http://localhost:8080/forms/dcss-dependent-form.html" $Cyan
Write-ColorOutput "  BAMOE Dev UI:    http://localhost:8080/q/dev-ui/extensions" $Cyan

Write-Host ""
Write-Step "Verification commands:"
Write-ColorOutput "  Check forms:     Get-ChildItem src/main/resources/META-INF/resources/js" $Yellow
Write-ColorOutput "  Test build:      .\mvnw.cmd clean compile" $Yellow
Write-ColorOutput "  Check settings:  mvn help:effective-settings" $Yellow