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
