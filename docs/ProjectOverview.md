# Project Overview

## BAMOE Forms Fix Analysis (5W & H)

| Dimension | Details |
| :--- | :--- |
| **What** | Fixed `mvn clean install` and `mvn quarkus:dev` build errors to enable React forms in Quarkus Dev UI. |
| **Who** | Sr. IBM BAMOE Developer |
| **When** | November 22, 2025. |
| **Where** | `main` branch (Windows) and `mac-fix-forms-ui-v2` branch (Mac). |
| **Why** | Builds were failing due to missing `DataSource` configuration and missing React form files. Mac builds failed due to metadata file interference. |
| **How** | 1. Restored missing React form files from bug report.<br>2. Configured H2 database in `application.properties` to resolve `DataSource` injection error.<br>3. Created `mac-fix-forms-ui-v2` branch with specific exclusions for `._*` metadata files.<br>4. Updated documentation with failure analysis and setup instructions. |

## Branching Strategy
- **`main`**: Windows target. Contains all source code, `verify-sync.bat`, and standard `pom.xml`.
- **`mac-fix-forms-ui-v2`**: Mac target. Derived from `main`, adds `pom.xml` exclusions for `._*` files.

## Key Changes
- **Files Restored**: `Guidelinecalculator.tsx`, `*.config`, `.swidtag`.
- **Configuration**: Added `quarkus.datasource` (H2) to `application.properties`.
- **Mac Optimization**: Added resource exclusions in `pom.xml` on Mac branch.
