#!/bin/bash

# Test script to verify database initialization
echo "Testing Database Initialization..."

# Set base URL
BASE_URL="http://localhost:8080"

# Test health endpoint
echo "1. Testing health endpoint..."
curl -s "$BASE_URL/api/health" | jq .

# Test database status
echo "2. Testing database status..."
curl -s "$BASE_URL/api/admin/database/status" | jq .

# Test master data endpoints
echo "3. Testing master data endpoints..."

echo "   - Testing districts endpoint..."
curl -s "$BASE_URL/api/master-data/districts" | jq .

echo "   - Testing areas endpoint..."
curl -s "$BASE_URL/api/master-data/areas" | jq .

echo "   - Testing categories endpoint..."
curl -s "$BASE_URL/api/master-data/categories" | jq .

echo "   - Testing charges endpoint..."
curl -s "$BASE_URL/api/master-data/charges" | jq .

echo "   - Testing subcategories endpoint..."
curl -s "$BASE_URL/api/master-data/subcategories" | jq .

echo "Database initialization test completed!"
