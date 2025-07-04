#!/bin/bash

echo "Testing PTAX API Endpoints..."
echo "============================"

BASE_URL="http://localhost:8080/api"

echo "1. Testing Districts API:"
response=$(curl -s "$BASE_URL/master-data/districts")
echo "Success: $(echo "$response" | jq -r '.success')"
echo "Data count: $(echo "$response" | jq '.data | length')"
echo ""

echo "2. Testing Categories API:"
response=$(curl -s "$BASE_URL/master-data/categories")
echo "Success: $(echo "$response" | jq -r '.success')"
echo "Data count: $(echo "$response" | jq '.data | length')"
echo ""

echo "3. Testing Areas API (for West Tripura - 272):"
response=$(curl -s "$BASE_URL/master-data/areas/272")
echo "Success: $(echo "$response" | jq -r '.success')"
echo "Data count: $(echo "$response" | jq '.data | length')"
echo ""

echo "4. Testing Charges API (for AGT area):"
response=$(curl -s "$BASE_URL/master-data/charges/AGT")
echo "Success: $(echo "$response" | jq -r '.success')"
echo "Data count: $(echo "$response" | jq '.data | length')"
echo ""

echo "5. Testing Subcategories API (for Legal Profession - category 1):"
response=$(curl -s "$BASE_URL/master-data/subcategories/1")
echo "Success: $(echo "$response" | jq -r '.success')"
echo "Data count: $(echo "$response" | jq '.data | length')"
echo ""

echo "6. Testing Period of Standing API:"
response=$(curl -s "$BASE_URL/master-data/period-of-standing")
echo "Success: $(echo "$response" | jq -r '.success')"
echo "Data count: $(echo "$response" | jq '.data | length')"
echo ""

echo "7. Testing All Master Data API:"
curl -s "$BASE_URL/master-data/all" | jq '.success'
echo ""

echo "Test completed!"
