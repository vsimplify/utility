# Project Overview

## Database Configuration
The application uses MySQL for production-like environments. However, for local development (`dev` profile), it is configured to use an in-memory H2 database to avoid the need for a local MySQL instance or Docker.

### Development Mode (H2)
- **Database Kind**: H2
- **URL**: `jdbc:h2:mem:testdb`
- **Credentials**: `sa` / `password`
- **Flyway**: Disabled for `dev` profile to avoid migration errors with H2.

### Production Mode (MySQL)
- **Database Kind**: MySQL
- **URL**: `jdbc:mysql://${DB_HOST:localhost}:3306/dcss_staging`
- **Credentials**: `${DB_USER:root}` / `${DB_PASSWORD:password}`
- **Flyway**: Enabled.

## Deployment to Azure Red Hat OpenShift (ARO)

### 5W & H Analysis for Test/Prod Deployment

| Aspect | Details |
|--------|---------|
| **Who** | DevOps Engineer / Platform Operations Team |
| **What** | Deploy Quarkus application JAR to ARO cluster using OpenShift build/deployment process |
| **When** | After successful testing in dev environment, before production release |
| **Where** | Azure cloud infrastructure running Red Hat OpenShift Container Platform |
| **Why** | To provide scalable, managed Kubernetes environment for production application hosting with enterprise security and monitoring |
| **How** | 1. Build application with `mvn clean package -Dquarkus.profile=prod`<br>2. Create OpenShift build config from JAR<br>3. Deploy using `oc` CLI or OpenShift web console<br>4. Configure environment variables for DB connection<br>5. Set up health checks and scaling policies<br>6. Enable monitoring and logging integration |

## React Form UI Fixes (Windows & Mac)

### 5W & H Analysis: Build & Dev UI Form Fixes

| Aspect | Details |
|--------|---------|
| **What** | Fixed build errors on Windows/Mac and ensured React forms are correctly built and referenced. |
| **When** | During the "Fixing Dev UI Forms" phase. |
| **Where** | `pom.xml` (Build), `setup-windows.bat` (Setup), HTML files (References). |
| **Why** | To resolve `npm run clean` failure on Windows (missing `rimraf` before install), ensure `mvn clean install` builds the frontend (missing phases), and fix cross-platform case sensitivity issues. |
| **How** | 1. Reordered `setup-windows.bat` to run `npm install` before `npm run clean`.<br>2. Bound `frontend-maven-plugin` goals to `generate-resources` phase in `pom.xml`.<br>3. Updated HTML script tags to match `webpack` output filename case (`DcssChildrenForm.js`).<br>4. Validated with "Triple Validation" (3 successful consecutive builds).

### 5W & H Analysis: Fix for BAMOE Quarkus Dev UI Forms (Windows/Mac)

| Aspect | Details |
|--------|---------|
| **What** | Fixed configuration to ensure React forms are generated in `src/main/resources/custom-forms-dev` and accessible in Dev UI. |
| **When** | During the "Fixing Dev UI Forms" phase. |
| **Where** | `webpack.config.js` (Output Path), `src/main/resources/custom-forms-dev` (File Location). |
| **Why** | To resolve errors where forms were not visible in BAMOE Quarkus Dev UI extension because they were missing from the expected directory. |
| **How** | 1. Updated `webpack.config.js` to output built JS files to `src/main/resources/custom-forms-dev`.<br>2. Cleaned up incorrect `.tsx` files from `custom-forms-dev`.<br>3. Copied `forms.json` and HTML wrappers to `custom-forms-dev`.<br>4. Removed Mac metadata files (`._*`) to prevent build errors. |
 |
