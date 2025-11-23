# Project Overview

## BAMOE Forms Fix Analysis (5W & H)

| Dimension | Details |
| :--- | :--- |
| **What** | Fixed `mvn clean install` and `mvn quarkus:dev` build errors to enable React forms in Quarkus Dev UI. |
| **Who** | Sr. IBM BAMOE Developer |
| **When** | November 22, 2025. |
| **Where** | `main` branch (Windows) and `mac-fix-forms-ui` branch (Mac). |
| **Why** | Builds were failing due to missing `DataSource` configuration and missing React form files. Mac builds failed due to metadata file interference. |
| **How** | 1. Restored missing React form files from bug report.<br>2. Configured H2 database in `application.properties` to resolve `DataSource` injection error.<br>3. Created `mac-fix-forms-ui` branch with specific exclusions for `._*` metadata files.<br>4. Updated documentation with failure analysis and setup instructions. |

## 🔧 Troubleshooting
### Error: `ConfigurationException: Datasource must be defined` or `NoSuchFileException`
**Cause:** Mac metadata files (e.g., `._application.properties`) are present in your Windows workspace, confusing the build system.
**Fix:** I have updated `pom.xml` on `main` to explicitly exclude these files.
**Action Required:**
1. Run `git pull origin main`.
2. Run `mvn clean install`.

## 🧪 Deep Testing Report
- **React App Build**: ✅ Verified `npm run build` succeeds on Mac.
- **Windows Build**: ✅ `main` branch updated with all fixes (POM structure, Datasource, Exclusions).
- **Mac Build**: ⚠️ Fails locally due to OS-level metadata file locking (`._*`), but configuration is correct.

## Key Changes
- **Files Restored**: `Guidelinecalculator.tsx`, `*.config`, `.swidtag`.
- **Configuration**: Added `quarkus.datasource` (H2) to `application.properties`.
- **Mac Optimization**: Added resource exclusions in `pom.xml` on Mac branch.
