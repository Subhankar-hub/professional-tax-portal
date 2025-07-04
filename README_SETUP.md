# Professional Tax Portal - Setup Guide

A comprehensive Professional Tax Enrolment system for Tripura State, India.

## 🏗️ Architecture

- **Frontend**: React.js with modern responsive design
- **Backend**: Spring Boot 3.x with Java 17
- **Database**: PostgreSQL
- **State**: Tripura, India (8 districts with proper area codes and charges)

## 📋 Prerequisites

1. **Java 17** or higher
2. **Node.js 16+** and npm
3. **PostgreSQL 12+**
4. **Git**

## 🚀 Quick Setup

### 1. Clone and Navigate
```bash
git clone <repository-url>
cd projectprofessionaltax
```

### 2. Database Setup

#### Option A: Automated Setup (Linux/macOS)
```bash
./setup_postgres.sh
```

#### Option B: Manual Setup
```bash
# Install PostgreSQL (Ubuntu/Debian)
sudo apt-get update
sudo apt-get install postgresql postgresql-contrib

# Start PostgreSQL service
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Run database setup
sudo -u postgres psql -f setup_database.sql
```

### 3. Backend Setup
```bash
cd backend-professional-tax-portal

# Add PostgreSQL dependency to pom.xml if not present
# <dependency>
#     <groupId>org.postgresql</groupId>
#     <artifactId>postgresql</artifactId>
#     <scope>runtime</scope>
# </dependency>

# Build and run
./mvnw clean install
./mvnw spring-boot:run
```

Backend will be available at: `http://localhost:8080`

### 4. Frontend Setup
```bash
cd frontend-professional-tax-portal

# Install dependencies
npm install

# Start development server
npm start
```

Frontend will be available at: `http://localhost:3000`

## 📊 Database Configuration

The application is configured to use PostgreSQL with the following settings:

```properties
# Database
spring.datasource.url=jdbc:postgresql://localhost:5432/professional_tax_db
spring.datasource.username=ptax_user
spring.datasource.password=ptax_password

# JPA Configuration
spring.jpa.hibernate.ddl-auto=update
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect
```

## 🗺️ Tripura State Data

The system includes comprehensive data for Tripura state:

### Districts (8)
- Dhalai (LGD: 269)
- Gomati (LGD: 654)
- Khowai (LGD: 652)
- North Tripura (LGD: 270)
- Sepahijala (LGD: 653)
- South Tripura (LGD: 271)
- Unakoti (LGD: 655)
- West Tripura (LGD: 272)

### Areas of Jurisdiction
- Agartala (AGT) - 8 charges (I-VIII)
- Bishalgarh (BSL)
- Udaipur (UDP)
- Belonia (BLN)
- Teliamura (TLM)
- Ambassa (AMB)
- Kailasahar (KLS)
- Dharmanagar (DMN)

### Professional Tax Categories (21)
1. Legal Profession
2. Medical Profession
3. Consultants
4. Engineering Profession
5. Technicians
6. Agents
7. Service Providers
8. Contractors or Suppliers
9. Directors
10. Employers or Establishment
11. Dealer, Person, Tax Payer, Traders
12. Agents and Distributors
13. Licensed Vendor
14. Owners or Lessees or Licensees or Occupiers
15. Societies
16. Companies
17. Partnership Firms
18. Transport Vehicle Holders
19. Individuals or Institutions
20. Others
21. Salary & Wage Earner

## 🎯 Features

### 8-Step Enrollment Process
1. **Personal Details** - Name, PAN, contact info with captcha
2. **OTP Verification** - Mobile number verification
3. **Establishment Details** - Business/workplace information
4. **Choose Type** - Profession/Trade/Calling/Employment
5. **Type-Specific Details** - Detailed forms based on selection
6. **Review & Submit** - Final review with declaration
7. **Final OTP** - Email/SMS confirmation
8. **Confirmation** - Application ID and success message

### Form Features
- Multi-step wizard with progress indicator
- Real-time validation
- Responsive design matching government portal standards
- Captcha integration
- File upload support
- Dynamic dropdowns based on selections
- Comprehensive error handling

## 🎨 Design Specifications

The frontend follows the design specifications from the provided screenshots:

- **Header**: Government logos with Professional Tax branding
- **Color Scheme**: Blue gradient header, yellow call-to-action buttons
- **Typography**: Clean, readable fonts with proper hierarchy
- **Layout**: Responsive grid system with proper spacing
- **Form Elements**: Styled inputs, dropdowns, and buttons
- **Progress Indicator**: Visual step tracker

## 📡 API Endpoints

### Master Data
- `GET /api/master-data/all` - Get all master data
- `GET /api/master-data/districts` - Get districts
- `GET /api/master-data/areas/{districtId}` - Get areas by district
- `GET /api/master-data/charges/{areaId}` - Get charges by area
- `GET /api/master-data/categories` - Get categories
- `GET /api/master-data/subcategories/{categoryId}` - Get subcategories

### Enrollment
- `POST /api/enrollment/submit` - Submit enrollment application
- `POST /api/enrollment/verify-otp` - Verify OTP
- `GET /api/enrollment/status/{applicationId}` - Check application status

## 🐛 Troubleshooting

### Common Issues

1. **PostgreSQL Connection Failed**
   ```bash
   # Check if PostgreSQL is running
   sudo systemctl status postgresql
   
   # Restart if needed
   sudo systemctl restart postgresql
   ```

2. **Backend Port Already in Use**
   ```bash
   # Kill process on port 8080
   sudo lsof -ti:8080 | xargs sudo kill -9
   ```

3. **Frontend Build Issues**
   ```bash
   # Clear npm cache and reinstall
   cd frontend-professional-tax-portal
   rm -rf node_modules package-lock.json
   npm cache clean --force
   npm install
   ```

4. **Database Tables Not Created**
   - Ensure `spring.jpa.hibernate.ddl-auto=update` in application.properties
   - Check database permissions for ptax_user
   - Verify PostgreSQL version compatibility

## 📦 Production Deployment

### Environment Variables
```bash
# Database
export DB_HOST=your-db-host
export DB_PORT=5432
export DB_NAME=professional_tax_db
export DB_USER=ptax_user
export DB_PASSWORD=your-secure-password

# Application
export SERVER_PORT=8080
export FRONTEND_URL=https://your-domain.com
```

### Docker Deployment (Optional)
```bash
# Build backend
cd backend-professional-tax-portal
docker build -t ptax-backend .

# Build frontend
cd frontend-professional-tax-portal
docker build -t ptax-frontend .

# Run with docker-compose
docker-compose up -d
```

## 📞 Support

For issues and questions:
1. Check the troubleshooting section above
2. Review application logs in `backend-professional-tax-portal/logs/`
3. Check browser console for frontend issues
4. Verify database connectivity

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**Developed for**: Government of Tripura, Commissionerate of Taxes & Excise  
**Technology Stack**: React.js + Spring Boot + PostgreSQL  
**Target State**: Tripura, India
