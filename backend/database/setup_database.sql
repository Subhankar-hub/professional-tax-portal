-- Create database and user for Professional Tax Portal
-- Run this script as PostgreSQL superuser

-- Create database
CREATE DATABASE professional_tax_db;

-- Create user
CREATE USER ptax_user WITH PASSWORD 'ptax_password';

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE professional_tax_db TO ptax_user;

-- Connect to the database
\c professional_tax_db;

-- Grant schema privileges
GRANT ALL ON SCHEMA public TO ptax_user;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO ptax_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO ptax_user;

-- Additional privileges for table creation
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO ptax_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO ptax_user;

-- Verification
SELECT current_database();
SELECT current_user;
