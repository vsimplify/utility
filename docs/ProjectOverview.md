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

### 5W & H Analysis: Deep Testing & Fixes

| Aspect | Details |
|--------|---------|
| **What** | Proactively identified and fixed hidden errors: 1) Backend logic mismatch (JSON vs int), 2) Mac metadata build failure, 3) Windows setup robustness. |
| **When** | During deep testing phase, prior to final delivery. |
| **Where** | `GuidelineCalculatorResource.java` (Logic), `pom.xml` (Build), `setup-windows.bat` (Setup). |
| **Why** | To ensure the application runs successfully on `mvn quarkus:dev` without errors, complying with strict quality standards and preventing runtime failures. |
| **How** | 1. Created `ChildrenCountRequest` DTO to match frontend JSON payload.<br>2. Configured `maven-clean-plugin` to clean `target/node` early, preventing `._*` file errors.<br>3. Added explicit clean steps to `setup-windows.bat`.<br>4. Validated with "Triple Validation" (3 successful consecutive builds). |
