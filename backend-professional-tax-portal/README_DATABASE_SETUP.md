# PTAX Backend Database Setup Guide

This guide explains how to set up and run the Professional Tax Portal backend with automatic database initialization.

## Features

- **Automatic Database Initialization**: The backend automatically creates the required schema and populates master data on startup
- **Manual Database Operations**: Admin endpoints for manual database management
- **Database Schema Management**: Complete schema with all required tables
- **Master Data Population**: Automatic population of districts, areas, charges, roles, and categories

## Database Schema

The system uses PostgreSQL with the following key tables:

### Master Tables
- `mas_district` - District information for Tripura
- `mtbl_area` - Area codes and names
- `mtbl_charge` - Charge information
- `mtbl_role` - User roles and permissions
- `mtbl_ptax_category` - Professional tax categories
- `mtbl_ptax_category_subcategory` - Subcategories for tax types

### Application Tables
- `mtbl_users_taxpayers` - Taxpayer user accounts
- `ttbl_applicant_enrolment_details` - Enrollment applications
- `ttbl_applicant_profession_details` - Professional details
- `ttbl_applicant_trade_details` - Trade details
- `ttbl_applicant_calling_details` - Calling details
- `ttbl_applicant_employment_details` - Employment details
- `ttbl_enrolment_application_status` - Application status tracking

### Temporary Tables
- `ttbl_temp_applicant_enrolment_details` - Temporary enrollment data
- `ttbl_temp_applicant_profession_details` - Temporary professional data
- `ttbl_temp_applicant_trade_details` - Temporary trade data
- `ttbl_temp_applicant_calling_details` - Temporary calling data
- `ttbl_temp_applicant_employment_details` - Temporary employment data

## Prerequisites

1. **PostgreSQL Database**: Version 12 or higher
2. **Java**: Version 17 or higher
3. **Maven**: Version 3.6 or higher

## Database Setup

### Option 1: Automatic Setup (Recommended)

The backend will automatically create the database schema and populate master data on startup.

1. **Create Database and User**:
   ```sql
   CREATE DATABASE professional_tax_db;
   CREATE USER ptax WITH PASSWORD 'password';
   GRANT ALL PRIVILEGES ON DATABASE professional_tax_db TO ptax;
   ```

2. **Update Configuration** (if needed):
   Edit `src/main/resources/application.properties`:
   ```properties
   spring.datasource.url=jdbc:postgresql://localhost:5432/professional_tax_db
   spring.datasource.username=ptax
   spring.datasource.password=password
   ```

3. **Run the Application**:
   ```bash
   cd backend-professional-tax-portal
   mvn spring-boot:run
   ```

The database will be automatically initialized with all tables and master data.

### Option 2: Manual Setup

If you prefer to set up the database manually:

1. **Create Database and User** (same as above)

2. **Run Schema Script**:
   ```bash
   psql -h localhost -U ptax -d professional_tax_db -f src/main/resources/schema.sql
   ```

3. **Run Data Script**:
   ```bash
   psql -h localhost -U ptax -d professional_tax_db -f src/main/resources/data.sql
   ```

## Running the Application

1. **Start the Backend**:
   ```bash
   cd backend-professional-tax-portal
   mvn spring-boot:run
   ```

2. **Verify Database Setup**:
   ```bash
   curl http://localhost:8080/api/admin/database/status
   ```

3. **Test Master Data Endpoints**:
   ```bash
   # Test districts
   curl http://localhost:8080/api/master-data/districts
   
   # Test areas
   curl http://localhost:8080/api/master-data/areas
   
   # Test categories
   curl http://localhost:8080/api/master-data/categories
   ```

## Database Admin Endpoints

The backend provides several admin endpoints for database management:

### GET /api/admin/database/status
Check if the database is properly initialized.

### POST /api/admin/database/initialize
Manually initialize the database (creates schema and populates data).

### POST /api/admin/database/reset
Reset the database (drops and recreates all tables).

### GET /api/admin/database/verify
Verify that all tables are properly created and populated.

## Master Data

The system automatically populates the following master data:

### Districts (8 districts)
- Dhalai, North Tripura, South Tripura, West Tripura
- Khowai, Sepahijala, Gomati, Unakoti

### Areas (8 areas)
- Agartala, Bishalgarh, Udaipur, Belonia
- Teliamura, Ambassa, Kailasahar, Dharmanagar

### Charges (15 charges)
- Various charge offices across different areas

### Roles (8 roles)
- Administrator, Commissioner, Superintendent, Inspector
- Senior Computer Assistant, Clerk, Enrolled User, Registered User

### Categories (21 categories)
- Legal Profession, Medical Profession, Consultants
- Engineering Profession, Technicians, Agents
- Service Providers, Contractors, Directors
- And more...

### Subcategories (44+ subcategories)
- Detailed subcategories for each profession type

## Configuration

Key configuration properties in `application.properties`:

```properties
# Database
spring.datasource.url=jdbc:postgresql://localhost:5432/professional_tax_db
spring.datasource.username=ptax
spring.datasource.password=password

# JPA
spring.jpa.hibernate.ddl-auto=update
spring.jpa.properties.hibernate.default_schema=ptax

# Initialization
spring.sql.init.mode=always
spring.sql.init.continue-on-error=true
spring.sql.init.schema-locations=classpath:schema.sql
spring.sql.init.data-locations=classpath:data.sql
```

## Testing

Use the provided test script to verify the setup:

```bash
./test_database_setup.sh
```

This script will:
- Test the health endpoint
- Verify database status
- Test all master data endpoints

## Troubleshooting

### Database Connection Issues
- Ensure PostgreSQL is running
- Check database name, username, and password
- Verify the database exists and user has proper permissions

### Schema Creation Issues
- Check application logs for SQL errors
- Ensure the `ptax` schema is created
- Verify table creation in PostgreSQL

### Data Population Issues
- Check for constraint violations in logs
- Verify master data is not already present
- Use the reset endpoint to clean and reinitialize

## Development

For development, you can:

1. **Reset Database**:
   ```bash
   curl -X POST http://localhost:8080/api/admin/database/reset
   ```

2. **Verify Setup**:
   ```bash
   curl http://localhost:8080/api/admin/database/verify
   ```

3. **Check Logs**:
   Monitor the application logs for initialization status and any errors.

## Production Deployment

For production deployment:

1. Use environment-specific database credentials
2. Set `spring.sql.init.mode=never` after initial setup
3. Use proper database backup and recovery procedures
4. Monitor database performance and optimize as needed

## Support

For issues or questions:
- Check application logs for detailed error messages
- Use the admin endpoints to verify database status
- Ensure all prerequisites are met
- Test with the provided test script
