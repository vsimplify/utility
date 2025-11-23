# Project Overview

## BAMOE Forms Fix Analysis (5W & H)

| Dimension | Details |
| :--- | :--- |
| **What** | Fixed `Malformed POM` error on Windows and enabled React forms in Quarkus Dev UI. |
| **Who** | Sr. IBM BAMOE Developer |
| **When** | November 22, 2025. |
| **Where** | `main` branch (Windows) and `mac-fix-forms-ui-v2` branch (Mac). |
| **Why** | Windows build failed with `Unrecognised tag: 'resource'` because it was not wrapped in `<resources>`. Mac builds failed due to metadata file interference. |
| **How** | 1. **Fixed POM Structure**: Wrapped `<resource>` tag in `<resources>` on both branches.<br>2. **Restored Files**: Restored missing React form files.<br>3. **Configured DB**: Added H2 DataSource config to `application.properties`.<br>4. **Mac Optimization**: Maintained `._*` exclusions on Mac branch. |

## Branching Strategy
- **`main`**: Windows target. Contains all source code, `verify-sync.bat`, and standard `pom.xml` (fixed).
- **`mac-fix-forms-ui-v2`**: Mac target. Derived from `main`, adds `pom.xml` exclusions for `._*` files.

## Key Changes
- **POM Fix**: Corrected `<build><resources><resource>...</resource></resources></build>` structure.
- **Files Restored**: `Guidelinecalculator.tsx`, `*.config`, `.swidtag`.
- **Configuration**: Added `quarkus.datasource` (H2) to `application.properties`.
- **Mac Optimization**: Added resource exclusions in `pom.xml` on Mac branch.
