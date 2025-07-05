#!/bin/sh

# Replace environment variables in nginx config and JavaScript files
# This allows runtime configuration of React app

# Default values
API_BASE_URL=${REACT_APP_API_BASE_URL:-"http://localhost:8080/api"}
ENVIRONMENT=${REACT_APP_ENVIRONMENT:-"production"}

echo "Setting up environment variables..."
echo "API_BASE_URL: $API_BASE_URL"
echo "ENVIRONMENT: $ENVIRONMENT"

# Find and replace environment variables in built JavaScript files
find /usr/share/nginx/html -name "*.js" -exec sed -i "s|REACT_APP_API_BASE_URL_PLACEHOLDER|$API_BASE_URL|g" {} \;
find /usr/share/nginx/html -name "*.js" -exec sed -i "s|REACT_APP_ENVIRONMENT_PLACEHOLDER|$ENVIRONMENT|g" {} \;

# Start nginx
exec "$@"
