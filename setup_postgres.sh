#!/bin/bash

# Professional Tax Portal - PostgreSQL Database Setup Script

echo "Setting up PostgreSQL database for Professional Tax Portal..."

# Check if PostgreSQL is installed
if ! command -v psql &> /dev/null; then
    echo "PostgreSQL is not installed. Please install PostgreSQL first."
    echo "On Ubuntu/Debian: sudo apt-get install postgresql postgresql-contrib"
    echo "On CentOS/RHEL: sudo yum install postgresql postgresql-server"
    echo "On macOS: brew install postgresql"
    exit 1
fi

# Check if PostgreSQL service is running
if ! systemctl is-active --quiet postgresql 2>/dev/null; then
    echo "Starting PostgreSQL service..."
    sudo systemctl start postgresql
    sudo systemctl enable postgresql
fi

echo "Creating database and user..."

# Run the SQL setup script as postgres user
sudo -u postgres psql -f setup_database.sql

if [ $? -eq 0 ]; then
    echo "Database setup completed successfully!"
    echo ""
    echo "Database Details:"
    echo "  Database: professional_tax_db"
    echo "  Username: ptax_user"
    echo "  Password: ptax_password"
    echo "  Host: localhost"
    echo "  Port: 5432"
    echo ""
    echo "You can now start the Spring Boot application."
    echo "The application will create the necessary tables automatically."
else
    echo "Database setup failed. Please check the error messages above."
    exit 1
fi
