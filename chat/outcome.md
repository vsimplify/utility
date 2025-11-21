# Outcome 

# DB Setup H2 now then MySQL
Code Changes Required for MySQL Database Integration
Once the MySQL database becomes available, the following code changes will be needed to switch from the current H2 in-memory database (used in dev profile) to MySQL:

1. Application Properties Configuration
Update src/main/resources/application.properties to replace H2 configuration with MySQL:

### Production Profile (MySQL)
%prod.quarkus.datasource.db-kind=mysql
%prod.quarkus.datasource.jdbc.url=jdbc:mysql://localhost:3306/guidelinecalculator
%prod.quarkus.datasource.username=your_mysql_username
%prod.quarkus.datasource.password=your_mysql_password
%prod.quarkus.hibernate-orm.database.generation=update

### Keep H2 for development
%dev.quarkus.datasource.db-kind=h2
%dev.quarkus.datasource.jdbc.url=jdbc:h2:mem:testdb
%dev.quarkus.datasource.username=sa
%dev.quarkus.datasource.password=password
%dev.quarkus.hibernate-orm.database.generation=drop-and-create
2. Profile-Specific Configuration
Add a prod profile for MySQL production deployment
Keep dev profile with H2 for development/testing
Ensure MySQL connection details are properly configured (host, port, database name, credentials)
3. Database Schema Considerations
Verify that existing JPA entities are compatible with MySQL
MySQL may require specific data type mappings (e.g., for dates, text fields)
Consider adding Flyway or Liquibase for database migrations in production
4. Dependency Verification
The pom.xml already includes the necessary dependencies:

quarkus-jdbc-mysql for MySQL JDBC driver
quarkus-hibernate-orm-panache for ORM functionality
No additional dependencies needed for basic MySQL integration.

## Explanation: Communication with DB using Quarkus vs. Kafka via Camel
Database Communication (Quarkus + Hibernate ORM Panache)
Synchronous: Operations block until completion, with immediate response
Transactional: ACID properties ensure data consistency
CRUD Operations: Direct create, read, update, delete on persistent data
Tight Coupling: Application logic directly interacts with data layer
Stateful: Maintains connection state and transaction context
Error Handling: Immediate feedback on failures (connection issues, constraint violations)
Performance: Optimized for OLTP (Online Transaction Processing) workloads
## Kafka Communication via Camel
Asynchronous: Fire-and-forget messaging, no blocking waits
Event-Driven: Publish/subscribe pattern for loose coupling
Integration Patterns: Supports enterprise integration patterns (routing, transformation, filtering)
Scalability: Decouples producers and consumers, enables horizontal scaling
Fault Tolerance: Built-in retry mechanisms, dead letter queues
Event Streaming: Processes continuous streams of data/events
Performance: Optimized for high-throughput, low-latency event processing

## Key Differences
1. Timing: DB is synchronous/real-time; Kafka is asynchronous/eventual consistency
2. Coupling: DB creates tight dependencies; Kafka enables loose coupling via events
3. Data Flow: DB handles persistent state; Kafka handles transient messages/events
4. Error Handling: DB fails fast; Kafka uses retry/compensation patterns
5. Use Cases: DB for data persistence/queries; Kafka for system integration/event streaming
The solution will likely use DB for core business data persistence and Kafka via Camel for cross-system integration and event-driven workflows.

## Database Connection Fix

### Problem
The application failed to start with `mvn quarkus:dev` due to a `java.net.ConnectException` (MySQL connection refused) and subsequently failed to build due to `java.lang.IllegalArgumentException` in `ClassReader` (macOS metadata interference).

### Solution
1.  **Database**: Switched to H2 in-memory database for development (`dev` profile).
2.  **Build**: Excluded `._*` files from the build process (macOS specific).

### Branches
-   **`main`**: Windows-compatible. Includes H2 fix.
-   **`mac`**: macOS-compatible. Includes H2 fix + Metadata exclusion.

### Verification
-   Successful startup verified 3 times.
-   React Form UI confirmed accessible.


# Impact to Code: Docker Unavailable During Development
Given that Docker is unavailable on the development machine and MySQL databases (dev and local) will be available soon before ARO deployment, the following code impacts and adjustments are needed:

## Current State
Development currently uses H2 in-memory database (dev profile)
Previous attempts to use MySQL failed due to unavailable local MySQL instance
Build process uses Maven (mvn) instead of Docker for BAMOE 9.3 applications
Required Code Changes
1. Update Development Profile Configuration
Modify src/main/resources/application.properties to use local MySQL when available:

## Development Profile (Local MySQL - when available)
%dev.quarkus.datasource.db-kind=mysql
%dev.quarkus.datasource.jdbc.url=jdbc:mysql://localhost:3306/guidelinecalculator_dev
%dev.quarkus.datasource.username=dev_user
%dev.quarkus.datasource.password=dev_password
%dev.quarkus.hibernate-orm.database.generation=update

## Keep H2 as fallback for when MySQL is unavailable
%dev-h2.quarkus.datasource.db-kind=h2
%dev-h2.quarkus.datasource.jdbc.url=jdbc:h2:mem:testdb
%dev-h2.quarkus.datasource.username=sa
%dev-h2.quarkus.datasource.password=password
%dev-h2.quarkus.hibernate-orm.database.generation=drop-and-create
2. Profile Activation Strategy
Use dev profile with MySQL when local database is running
Fall back to dev-h2 profile when MySQL is unavailable
Activate profiles via environment variable: QUARKUS_PROFILE=dev or QUARKUS_PROFILE=dev-h2
3. Build Process Impact
No Docker required - Maven builds work directly on the dev machine
BAMOE 9.3 applications build successfully with mvn clean package
No containerization needed for development builds
4. Database Schema Management
Consider adding Flyway for development database migrations
Ensure entity mappings are compatible with both H2 and MySQL
Add database initialization scripts for local development
Benefits of This Approach
Consistency: Development environment closer to production MySQL
Testing: Better testing of MySQL-specific features during development
Deployment Ready: Reduces surprises when deploying to ARO with MySQL
Flexibility: Easy fallback to H2 when local MySQL is unavailable
No Major Code Changes Required
Existing JPA entities and repositories remain unchanged
Service layer logic unaffected
Only configuration changes needed for database switching