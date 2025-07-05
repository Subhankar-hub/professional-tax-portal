# Professional Tax Portal - Deployment Guide

This guide provides step-by-step instructions for deploying the Professional Tax Portal using Docker and Vercel.

## Prerequisites

- Docker and Docker Compose installed
- Node.js 18+ (for local development)
- Java 17+ (for local development)
- PostgreSQL database
- Fast2SMS API account

## Environment Configuration

### Backend Environment Variables

Create a `.env` file in the project root:

```bash
# Database Configuration
DATABASE_URL=jdbc:postgresql://localhost:5432/professional_tax_db
DATABASE_USERNAME=ptax_user
DATABASE_PASSWORD=ptax_password

# Fast2SMS Configuration
FAST2SMS_API_KEY=qkb4hFHaKsSod8RX6pvMYPwc90ExltA5nVUWIfeizBu17QCGDyemc5QuFyR7zkOxAIglo6KqjU0EDtHh

# CORS Configuration
CORS_ALLOWED_ORIGINS=http://localhost:3000,https://frontend-professional-tax-portal.vercel.app
```

### Frontend Environment Variables

Create a `.env` file in the `frontend-professional-tax-portal` directory:

```bash
REACT_APP_API_BASE_URL=http://localhost:8080/api
REACT_APP_ENVIRONMENT=production
```

## Docker Deployment

### 1. Full Stack with Docker Compose

Deploy the complete application stack (database, backend, frontend, Redis):

```bash
# Clone the repository
git clone <repository-url>
cd projectprofessionaltax

# Set environment variables
export FAST2SMS_API_KEY="your_actual_api_key_here"

# Build and start all services
docker-compose up --build -d

# Check service status
docker-compose ps

# View logs
docker-compose logs -f backend
docker-compose logs -f frontend
```

### 2. Backend Only Deployment

To deploy only the backend service:

```bash
cd backend-professional-tax-portal

# Build the Docker image
docker build -t ptax-backend .

# Run the container
docker run -d \
  --name ptax_backend \
  -p 8080:8080 \
  -e DATABASE_URL=jdbc:postgresql://host.docker.internal:5432/professional_tax_db \
  -e DATABASE_USERNAME=ptax_user \
  -e DATABASE_PASSWORD=ptax_password \
  -e FAST2SMS_API_KEY=your_api_key_here \
  -e CORS_ALLOWED_ORIGINS=https://frontend-professional-tax-portal.vercel.app \
  ptax-backend
```

### 3. Database Setup

Initialize the PostgreSQL database:

```bash
# Start PostgreSQL container
docker run -d \
  --name ptax_postgres \
  -e POSTGRES_DB=professional_tax_db \
  -e POSTGRES_USER=ptax_user \
  -e POSTGRES_PASSWORD=ptax_password \
  -p 5432:5432 \
  -v postgres_data:/var/lib/postgresql/data \
  postgres:15-alpine

# Initialize database schema
docker exec -i ptax_postgres psql -U ptax_user -d professional_tax_db < setup_database.sql
docker exec -i ptax_postgres psql -U ptax_user -d professional_tax_db < update_database_schema.sql
```

## Vercel Deployment (Frontend)

### 1. Setup Vercel Project

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Navigate to frontend directory:
```bash
cd frontend-professional-tax-portal
```

4. Deploy to Vercel:
```bash
vercel --prod
```

### 2. Configure Environment Variables in Vercel

In your Vercel dashboard:

1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add the following variables:

```
REACT_APP_API_BASE_URL = https://your-backend-url.com/api
REACT_APP_ENVIRONMENT = production
```

### 3. Custom Domain Setup

1. In Vercel dashboard, go to "Domains"
2. Add your custom domain
3. Configure DNS settings as instructed

## Production Configuration

### Backend Production Settings

The backend uses the `application-production.properties` profile for production:

- Database connections are externalized via environment variables
- Logging is optimized for production
- Security headers are enabled
- Health checks are configured

### Frontend Production Settings

- Built with production optimizations
- Static assets are cached for 1 year
- Security headers are applied
- API calls are configured for production backend

## Fast2SMS Integration

### Development vs Production Mode

The Fast2SMS service has been updated for deployment compatibility:

**Development Mode (GET requests):**
- Uses query parameters
- Suitable for testing

**Production Mode (POST requests with JSON):**
- Uses POST with JSON body
- Required for live website deployment
- Supports proper authorization headers

### Configuration

Update your Fast2SMS configuration:

```properties
fast2sms.api.key=your_actual_api_key_here
fast2sms.api.url=https://www.fast2sms.com/dev/bulkV2
```

## Monitoring and Health Checks

### Health Check Endpoints

- Backend: `http://localhost:8080/api/health`
- Frontend: `http://localhost:3000/health`

### Docker Health Checks

All services include health checks:
- Database: PostgreSQL connection check
- Backend: HTTP health endpoint
- Frontend: Nginx status check
- Redis: Redis ping command

## Database Management

### Backup

```bash
# Create backup
docker exec ptax_postgres pg_dump -U ptax_user professional_tax_db > backup.sql
```

### Restore

```bash
# Restore from backup
docker exec -i ptax_postgres psql -U ptax_user -d professional_tax_db < backup.sql
```

## Troubleshooting

### Common Issues

1. **CORS Errors:**
   - Verify CORS_ALLOWED_ORIGINS includes your frontend URL
   - Check that backend is accessible from frontend domain

2. **Database Connection Issues:**
   - Ensure PostgreSQL is running and accessible
   - Verify connection string and credentials
   - Check network connectivity between containers

3. **Fast2SMS API Issues:**
   - Verify API key is correct and active
   - Check that deployment mode is used (POST with JSON)
   - Monitor API rate limits

4. **Frontend Build Issues:**
   - Ensure Node.js version is 18+
   - Clear npm cache: `npm cache clean --force`
   - Delete node_modules and reinstall

### Logs and Debugging

```bash
# View all service logs
docker-compose logs -f

# View specific service logs
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f db

# View application logs inside container
docker exec -it ptax_backend tail -f /app/logs/application.log
```

## Security Considerations

1. **Environment Variables:**
   - Never commit sensitive keys to repository
   - Use environment-specific configuration files
   - Rotate API keys regularly

2. **Database Security:**
   - Use strong passwords
   - Enable SSL connections in production
   - Regular security updates

3. **Application Security:**
   - HTTPS enabled in production
   - Security headers configured
   - Input validation and sanitization

## Performance Optimization

1. **Frontend:**
   - Static assets are cached for 1 year
   - Gzip compression enabled
   - Bundle optimization through React build process

2. **Backend:**
   - Database connection pooling
   - Query optimization
   - Response caching where appropriate

3. **Database:**
   - Proper indexing on frequently queried columns
   - Regular VACUUM and ANALYZE operations

## Scaling Considerations

1. **Horizontal Scaling:**
   - Backend can be scaled with load balancer
   - Database can use read replicas
   - Frontend scales automatically with CDN

2. **Resource Monitoring:**
   - Monitor CPU and memory usage
   - Database performance metrics
   - API response times

This deployment guide ensures a production-ready setup with proper security, monitoring, and scalability considerations.
