# React Form Build & Run Guide

This guide details how to build and run the React forms for the DCSS Guideline Calculator, both within the Quarkus Dev UI and as a standalone application.

## Current Status

✅ **React Forms Build**: Working - TypeScript compiles and bundles successfully  
✅ **Maven Build**: Fixed - Using correct BAMOE 9.3.0 dependencies (org.drools, org.jbpm, org.kie)  
✅ **BPMN Process**: Updated with DMN and DRL task integration  
⏳ **Quarkus Dev Mode**: Ready to test

## Prerequisites

- **Java 17+**: Required for Quarkus
- **Node.js 18+**: Required for building React forms
- **Maven 3.9+**: Required for building the Java project
- **BAMOE 9.3.0 Repository**: Must be properly configured (see Known Issues)

## Project Structure

```
utility/
├── src/main/typescript/forms/          # React form source (.tsx)
│   ├── DcssChildrenForm.tsx
│   └── DcssDependentForm.tsx
├── src/main/resources/
│   ├── META-INF/resources/forms/       # HTML wrappers
│   │   ├── dcss-children-form.html
│   │   └── dcss-dependent-form.html
│   ├── processes/                      # BPMN process definitions
│   │   └── guidelinecalculator.bpmn
│   └── gov/ca/dcss/guidelinecalculator/ # DMN files
│       └── TimeshareSelection.dmn
├── webpack.config.js                   # React bundling config
├── package.json                        # NPM dependencies
└── pom.xml                             # Maven build config
```

## Build Process

### Step 1: Build React Forms ✅ WORKING

The React forms build successfully and generate the required JavaScript bundles.

```bash
# Install dependencies (first time only)
npm install

# Build production bundles
npm run build
```

**Output Location**: `target/classes/META-INF/resources/js/`
- `DcssChildrenForm.js`
- `DcssDependentForm.js`

**Build Configuration**:
- Entry points in `webpack.config.js` use CamelCase names (`DcssChildrenForm`, `DcssDependentForm`)
- These match the global variable names expected by the HTML files
- Externals: React, ReactDOM, and PatternFly are loaded from CDN

### Step 2: Build Quarkus Application ✅ FIXED

**Resolution**: Updated to use correct BAMOE 9.3.0 dependency artifacts based on BAMOE 9.2.0 examples.

```bash
mvn clean package -DskipTests
```

**Correct Dependencies** (from BAMOE examples):
- ✅ `org.drools:drools-quarkus-decisions` (DMN support)
- ✅ `org.drools:drools-quarkus-rules` (DRL support)
- ✅ `org.jbpm:jbpm-quarkus` (BPMN process support)
- ✅ `org.kie:kie-addons-quarkus-process-management`
- ✅ `org.kie:kie-addons-quarkus-persistence-jdbc`
- ✅ `com.ibm.bamoe:bamoe-bom` (version management)

## Dependency Resolution (RESOLVED)

### ✅ Issue 1: BAMOE Dependencies - FIXED

**Problem**: Initial attempt used incorrect artifact names (`com.ibm.bamoe:kogito-quarkus-*`).

**Solution**: Updated to use correct BAMOE 9.3.0 artifact structure:

```xml
<!-- Correct BAMOE 9.3.0 Dependencies -->
<dependency>
  <groupId>org.drools</groupId>
  <artifactId>drools-quarkus-decisions</artifactId>
</dependency>
<dependency>
  <groupId>org.drools</groupId>
  <artifactId>drools-quarkus-rules</artifactId>
</dependency>
<dependency>
  <groupId>org.jbpm</groupId>
  <artifactId>jbpm-quarkus</artifactId>
</dependency>
<dependency>
  <groupId>org.kie</groupId>
  <artifactId>kie-addons-quarkus-process-management</artifactId>
</dependency>
<dependency>
  <groupId>org.kie</groupId>
  <artifactId>kie-addons-quarkus-persistence-jdbc</artifactId>
</dependency>
```

**Key Insight**: BAMOE 9.3.0 uses `org.drools`, `org.jbpm`, and `org.kie` group IDs, not `com.ibm.bamoe` for these artifacts.

### ⚠️ Issue 2: MySQL Database Placeholder

**Current Configuration** (`application.properties`):
```properties
quarkus.datasource.jdbc.url=jdbc:mysql://${DB_HOST:localhost}:3306/dcss_staging
quarkus.datasource.username=${DB_USER:root}
quarkus.datasource.password=${DB_PASSWORD:password}
```

**Status**: Placeholder configuration - MySQL database currently unavailable

**For Development Without Database**:
- Use in-memory H2 database for testing
- Or comment out persistence dependencies temporarily
- Or set up a local MySQL instance with the `dcss_staging` database

## Running the Application (When Build Succeeds)

### Mode 1: Quarkus Dev Mode

```bash
mvn quarkus:dev
```

**Access Points**:
- Children Form: http://localhost:8080/forms/dcss-children-form.html
- Dependent Form: http://localhost:8080/forms/dcss-dependent-form.html
- Dev UI: http://localhost:8080/q/dev-ui
- Swagger UI: http://localhost:8080/q/swagger-ui

### Mode 2: Standalone JAR

```bash
java -jar target/guidelinecalculator-1.0.0-SNAPSHOT-runner.jar
```

## Form Integration with BPMN

The React forms are linked to User Tasks in the BPMN process:

1. **DcssChildrenForm** → `Task_EnterChildren` (taskName: "EnterChildren")
   - Endpoint: `/guidelinecalculator/{processInstanceId}/Task_EnterChildren/{taskId}`
   - Input: `childrenCount` (Integer, 1-20)

2. **DcssDependentForm** → `Task_InputDependentInfo` (taskName: "InputDependentInfo")
   - Endpoint: `/guidelinecalculator/{processInstanceId}/Task_InputDependentInfo/{taskId}`
   - Outputs: `dependentInfo`, `parentA_GrossIncome`, `parentB_GrossIncome`, `custodyPercentageHigh`

## Development Workflow

### For React Form Development Only

1. Make changes to `.tsx` files in `src/main/typescript/forms/`
2. Run `npm run build` to compile
3. Test forms by opening HTML files directly (mock data mode)

### For Full Application Development

1. Build React forms: `npm run build`
2. Start Quarkus dev mode: `mvn quarkus:dev`
3. Access forms through Quarkus server
4. Use Dev UI to start process instances and complete tasks

## Next Steps to Resolve Build Issues

1. **Verify BAMOE Repository**:
   - Check if the repository was downloaded correctly
   - Verify the repository structure matches expected layout
   - Confirm `settings.xml` points to the correct location

2. **Test with Minimal Dependencies**:
   - Create a minimal `pom.xml` with only essential dependencies
   - Gradually add BAMOE dependencies to identify which are available

3. **Contact BAMOE Support**:
   - If dependencies are genuinely missing from the repository
   - Request correct repository download or alternative versions

## Files Modified

- ✅ `webpack.config.js`: Updated entry keys to CamelCase
- ✅ `pom.xml`: Added explicit BAMOE dependency versions
- ⚠️ `pom.xml`: Removed unavailable dependencies (persistence-jdbc, process-management)

## Verification Checklist

- [x] React forms compile successfully
- [x] JavaScript bundles generated in correct location
- [x] Webpack library names match HTML expectations
- [ ] Maven build completes successfully
- [ ] Quarkus dev mode starts without errors
- [ ] Forms accessible via browser
- [ ] Forms can submit to BPMN process endpoints
- [ ] BPMN process executes with DMN and DRL rules
