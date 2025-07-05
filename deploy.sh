#!/bin/bash

# Professional Tax Portal Deployment Script
# This script automates the deployment process for the Professional Tax Portal

set -e  # Exit on any error

echo "🚀 Professional Tax Portal Deployment Script"
echo "============================================="

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Docker is installed
check_docker() {
    print_status "Checking Docker installation..."
    if ! command -v docker &> /dev/null; then
        print_error "Docker is not installed. Please install Docker and try again."
        exit 1
    fi
    
    if ! command -v docker-compose &> /dev/null; then
        print_error "Docker Compose is not installed. Please install Docker Compose and try again."
        exit 1
    fi
    
    print_success "Docker and Docker Compose are installed"
}

# Setup environment variables
setup_environment() {
    print_status "Setting up environment variables..."
    
    if [ ! -f .env ]; then
        print_warning ".env file not found. Creating default .env file..."
        cat > .env << EOF
# Database Configuration
DATABASE_URL=jdbc:postgresql://db:5432/professional_tax_db
DATABASE_USERNAME=ptax_user
DATABASE_PASSWORD=ptax_password

# Fast2SMS Configuration (Replace with your actual API key)
FAST2SMS_API_KEY=qkb4hFHaKsSod8RX6pvMYPwc90ExltA5nVUWIfeizBu17QCGDyemc5QuFyR7zkOxAIglo6KqjU0EDtHh

# CORS Configuration
CORS_ALLOWED_ORIGINS=http://localhost:3000,https://frontend-professional-tax-portal.vercel.app
EOF
        print_warning "Please update the .env file with your actual Fast2SMS API key before running the application"
    fi
    
    if [ ! -f frontend-professional-tax-portal/.env ]; then
        print_status "Creating frontend .env file..."
        cat > frontend-professional-tax-portal/.env << EOF
REACT_APP_API_BASE_URL=http://localhost:8080/api
REACT_APP_ENVIRONMENT=development
EOF
    fi
    
    print_success "Environment files configured"
}

# Build and start services
deploy_stack() {
    print_status "Building and starting Docker services..."
    
    # Stop any existing containers
    docker-compose down --remove-orphans
    
    # Build and start services
    docker-compose up --build -d
    
    print_success "Docker services started"
}

# Wait for services to be healthy
wait_for_services() {
    print_status "Waiting for services to become healthy..."
    
    # Wait for database
    print_status "Waiting for database..."
    for i in {1..30}; do
        if docker-compose exec -T db pg_isready -U ptax_user -d professional_tax_db > /dev/null 2>&1; then
            print_success "Database is ready"
            break
        fi
        if [ $i -eq 30 ]; then
            print_error "Database failed to start"
            exit 1
        fi
        sleep 2
    done
    
    # Wait for backend
    print_status "Waiting for backend..."
    for i in {1..60}; do
        if curl -f http://localhost:8080/api/health > /dev/null 2>&1; then
            print_success "Backend is ready"
            break
        fi
        if [ $i -eq 60 ]; then
            print_error "Backend failed to start"
            exit 1
        fi
        sleep 3
    done
    
    # Wait for frontend
    print_status "Waiting for frontend..."
    for i in {1..30}; do
        if curl -f http://localhost:3000/health > /dev/null 2>&1; then
            print_success "Frontend is ready"
            break
        fi
        if [ $i -eq 30 ]; then
            print_error "Frontend failed to start"
            exit 1
        fi
        sleep 2
    done
}

# Display service status
show_status() {
    print_status "Service Status:"
    docker-compose ps
    
    echo ""
    print_success "🎉 Deployment completed successfully!"
    echo ""
    echo "Access your application:"
    echo "  Frontend: http://localhost:3000"
    echo "  Backend API: http://localhost:8080/api"
    echo "  Database: localhost:5432"
    echo ""
    echo "Useful commands:"
    echo "  View logs: docker-compose logs -f"
    echo "  Stop services: docker-compose down"
    echo "  Restart services: docker-compose restart"
    echo ""
}

# Main deployment function
main() {
    echo "Starting deployment process..."
    
    check_docker
    setup_environment
    deploy_stack
    wait_for_services
    show_status
    
    print_success "Deployment script completed!"
}

# Handle script arguments
case "${1:-}" in
    "stop")
        print_status "Stopping all services..."
        docker-compose down
        print_success "All services stopped"
        ;;
    "restart")
        print_status "Restarting all services..."
        docker-compose restart
        print_success "All services restarted"
        ;;
    "logs")
        print_status "Showing logs..."
        docker-compose logs -f
        ;;
    "status")
        print_status "Service status:"
        docker-compose ps
        ;;
    "clean")
        print_status "Cleaning up Docker resources..."
        docker-compose down --volumes --remove-orphans
        docker system prune -f
        print_success "Cleanup completed"
        ;;
    *)
        main
        ;;
esac
