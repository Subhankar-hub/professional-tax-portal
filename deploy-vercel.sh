#!/bin/bash

# Professional Tax Portal - Vercel Deployment Script
# This script automates the Vercel deployment process

set -e  # Exit on any error

echo "🚀 Professional Tax Portal - Vercel Deployment"
echo "=============================================="

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

# Check if Vercel CLI is installed
check_vercel_cli() {
    print_status "Checking Vercel CLI installation..."
    if ! command -v vercel &> /dev/null; then
        print_warning "Vercel CLI is not installed. Installing..."
        npm install -g vercel
        print_success "Vercel CLI installed successfully"
    else
        print_success "Vercel CLI is already installed"
    fi
}

# Login to Vercel
login_to_vercel() {
    print_status "Checking Vercel authentication..."
    if ! vercel whoami &> /dev/null; then
        print_warning "Not logged in to Vercel. Please login..."
        vercel login
        print_success "Successfully logged in to Vercel"
    else
        CURRENT_USER=$(vercel whoami)
        print_success "Already logged in as: $CURRENT_USER"
    fi
}

# Install dependencies
install_dependencies() {
    print_status "Installing root dependencies..."
    npm install
    
    print_status "Installing frontend dependencies..."
    cd frontend-professional-tax-portal
    npm install
    cd ..
    
    print_success "All dependencies installed"
}

# Build the project
build_project() {
    print_status "Building the project..."
    
    # Build frontend
    cd frontend-professional-tax-portal
    npm run build
    cd ..
    
    print_success "Project built successfully"
}

# Deploy to Vercel
deploy_to_vercel() {
    print_status "Deploying to Vercel..."
    
    # Deploy with production flag
    vercel --prod
    
    print_success "Deployment completed!"
}

# Set environment variables (optional)
set_environment_variables() {
    print_status "Setting up environment variables..."
    
    read -p "Do you want to set up environment variables? (y/N): " setup_env
    
    if [[ $setup_env =~ ^[Yy]$ ]]; then
        print_status "Please set the following environment variables in your Vercel dashboard:"
        echo ""
        echo "1. FAST2SMS_API_KEY=your_fast2sms_api_key"
        echo "2. REACT_APP_API_BASE_URL=https://your-project.vercel.app/api"
        echo "3. REACT_APP_ENVIRONMENT=production"
        echo ""
        print_warning "Go to: https://vercel.com/dashboard → Your Project → Settings → Environment Variables"
        echo ""
        read -p "Press Enter after setting up environment variables..."
        
        # Trigger a new deployment to use the environment variables
        print_status "Triggering new deployment with environment variables..."
        vercel --prod
    fi
}

# Test deployment
test_deployment() {
    print_status "Testing deployment..."
    
    # Get the deployment URL
    DEPLOYMENT_URL=$(vercel --prod --confirm 2>/dev/null | grep -o 'https://[^[:space:]]*')
    
    if [ -z "$DEPLOYMENT_URL" ]; then
        print_warning "Could not determine deployment URL. Please check manually."
        return
    fi
    
    print_status "Testing health endpoint..."
    if curl -f "${DEPLOYMENT_URL}/api/health" > /dev/null 2>&1; then
        print_success "Health check passed!"
    else
        print_warning "Health check failed. Check your deployment."
    fi
    
    echo ""
    print_success "🎉 Deployment completed successfully!"
    echo ""
    echo "Your application is available at:"
    echo "  Frontend: $DEPLOYMENT_URL"
    echo "  API Health: $DEPLOYMENT_URL/api/health"
    echo ""
    echo "API Endpoints:"
    echo "  Send OTP: $DEPLOYMENT_URL/api/otp/send"
    echo "  Verify OTP: $DEPLOYMENT_URL/api/otp/verify"
    echo "  Districts: $DEPLOYMENT_URL/api/master-data/districts"
    echo "  Categories: $DEPLOYMENT_URL/api/master-data/categories"
    echo ""
}

# Main deployment function
main() {
    echo "Starting Vercel deployment process..."
    
    check_vercel_cli
    login_to_vercel
    install_dependencies
    build_project
    deploy_to_vercel
    set_environment_variables
    test_deployment
    
    print_success "Vercel deployment script completed!"
}

# Handle script arguments
case "${1:-}" in
    "build")
        print_status "Building project only..."
        install_dependencies
        build_project
        print_success "Build completed"
        ;;
    "deploy")
        print_status "Deploying to Vercel..."
        deploy_to_vercel
        print_success "Deployment completed"
        ;;
    "test")
        print_status "Testing deployment..."
        test_deployment
        ;;
    *)
        main
        ;;
esac
