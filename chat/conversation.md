# Database Connection Fix

### Problem
The application failed to start with a `java.net.ConnectException` due to a database connection issue.

### Outcome
The `java.net.ConnectException` was caused by the application attempting to connect to a local MySQL database that was not running. Docker was also unavailable.

**Resolution:**
1.  **H2 Database**: Configured an in-memory H2 database for the `dev` profile in `application.properties` and added the `quarkus-jdbc-h2` dependency in `pom.xml`.
2.  **Build Fix**: Identified and resolved a build failure caused by macOS metadata files (`._*`) by excluding them in `pom.xml` (on `mac` branch).

**Branch Strategy:**
-   **`main`**: Targets Windows. Contains only the H2 database configuration.
-   **`mac`**: Targets macOS. Contains the H2 database configuration AND the metadata file exclusion.

**Verification:**
-   Verified application startup 3 times on macOS (using `mac` branch).
-   Verified accessibility of React Form UI.
