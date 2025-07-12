
# Professional Tax Portal - Comprehensive Documentation

## Overview
The Professional Tax Portal is a full-stack web application for managing professional tax registration for Tripura State, India. It enables users to enroll, update, and view tax-related details through a secure, multi-step process. The backend is built with Java (Spring Boot), and the frontend uses React (TypeScript) with Vite and Tailwind CSS.

## Architecture
- **Frontend**: React.js (TypeScript), Vite, Tailwind CSS, Radix UI, shadcn/ui
- **Backend**: Spring Boot (Java 17+), PostgreSQL, RESTful APIs
- **Database**: PostgreSQL with automatic schema and master data initialization
- **Deployment**: Docker, Vercel (frontend), local and cloud support

## Key Features
- 8-step enrollment process with OTP verification
- Multi-step wizard UI with real-time validation and progress indicator
- Responsive, government-standard design
- Automatic database setup and master data population
- REST API endpoints for all major operations
- Secure session management and input validation
- Admin endpoints for database management

## Project Structure
- **api/**: Node.js/Express serverless functions for backend endpoints
- **backend-professional-tax-portal/**: Spring Boot backend, database schema, and resources
- **frontend-professional-tax-portal/**: React frontend, UI components, pages, hooks, and types

## Database Schema
Master tables:
- `mas_district`: Districts of Tripura
- `mtbl_area`: Administrative areas
- `mtbl_charge`: Charge offices
- `mtbl_role`: User roles
- `mtbl_ptax_category`: Professional tax categories
- `mtbl_ptax_category_subcategory`: Subcategories for detailed classification
Application tables:
- `mtbl_users_taxpayers`: User accounts
- `ttbl_applicant_enrolment_details`: Enrollment applications
- `ttbl_applicant_profession_details`, `ttbl_applicant_trade_details`, `ttbl_applicant_calling_details`, `ttbl_applicant_employment_details`: Detailed applicant info
Temporary tables for draft applications and OTP verification

## API Endpoints
### Master Data
- `GET /api/master-data/all` - All master data
- `GET /api/master-data/districts` - Districts
- `GET /api/master-data/areas/{districtId}` - Areas by district
- `GET /api/master-data/charges/{areaId}` - Charges by area
- `GET /api/master-data/categories` - Categories
- `GET /api/master-data/subcategories/{categoryId}` - Subcategories
### Enrollment
- `POST /api/enrollment/submit` - Submit application
- `POST /api/enrollment/verify-otp` - Verify OTP
- `GET /api/enrollment/status/{applicationId}` - Application status
### OTP
- `POST /api/otp/send` - Send OTP
- `POST /api/otp/verify` - Verify OTP
### Admin
- `GET /api/admin/database/status` - Check DB status
- `POST /api/admin/database/initialize` - Manual DB init
- `POST /api/admin/database/reset` - Reset DB
- `GET /api/admin/database/verify` - Verify DB setup

## Setup & Deployment
### Prerequisites
- Java 17+, Node.js 18+, PostgreSQL 12+, Docker, Git

### Quick Setup
1. Clone repo: `git clone <repository-url>`
2. Database: `./setup_postgres.sh` or manual SQL scripts
3. Backend: `cd backend-professional-tax-portal && ./mvnw spring-boot:run`
4. Frontend: `cd frontend-professional-tax-portal && npm install && npm start`

### Docker Deployment
- Full stack: `docker-compose up --build -d`
- Backend only: `docker build -t ptax-backend . && docker run ...`
- Database: `docker run -d --name ptax_postgres ...`

### Vercel Deployment (Frontend)
1. Install Vercel CLI: `npm install -g vercel`
2. Deploy: `vercel --prod`
3. Configure environment variables in Vercel dashboard

## Security & Performance
- OTP-based verification, CSRF/session protection
- Input validation (Zod, server-side)
- HTTPS, security headers, CORS
- Database connection pooling, query optimization
- Static asset caching, bundle optimization

## Troubleshooting
- Check logs: `docker-compose logs -f backend` / `frontend`
- Database issues: verify connection string, credentials, container status
- CORS errors: check allowed origins
- Frontend build: clear npm cache, reinstall modules
- Use admin endpoints for DB reset/verify

## Example Flow
1. User fills out multi-step form in frontend
2. Frontend sends data to backend via REST API
3. Backend validates, saves, and responds with status
4. Frontend displays confirmation and next steps

## License & Support
- MIT License
- Developed for Government of Tripura, Commissionerate of Taxes & Excise
- For issues: check logs, use admin endpoints, review troubleshooting section
