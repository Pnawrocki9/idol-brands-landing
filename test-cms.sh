#!/bin/bash

# Test script to verify CMS is working correctly

echo "🧪 Testing Idol Brands CMS..."
echo ""

# Test 1: Check if server is running
echo "Test 1: Checking if server is running..."
if curl -s -o /dev/null -w "%{http_code}" http://localhost:3000 | grep -q "200\|301\|302"; then
    echo "✅ Server is running"
else
    echo "❌ Server is not running. Please start it with: npm start"
    exit 1
fi
echo ""

# Test 2: Check if API is accessible
echo "Test 2: Checking API endpoint..."
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/api/cms-content)
if [ "$HTTP_CODE" = "200" ]; then
    echo "✅ API is accessible"
else
    echo "❌ API returned HTTP $HTTP_CODE"
    exit 1
fi
echo ""

# Test 3: Test POST to save data
echo "Test 3: Testing data save..."
RESPONSE=$(curl -s -X POST http://localhost:3000/api/cms-content \
    -H "Content-Type: application/json" \
    -d '{"testKey":"Test CMS Value","plHeroTitle":"Test Hero Title"}')
    
if echo "$RESPONSE" | grep -q "success"; then
    echo "✅ Data saved successfully"
else
    echo "❌ Failed to save data"
    echo "Response: $RESPONSE"
    exit 1
fi
echo ""

# Test 4: Test GET to retrieve data
echo "Test 4: Testing data retrieval..."
DATA=$(curl -s http://localhost:3000/api/cms-content)
if echo "$DATA" | grep -q "testKey"; then
    echo "✅ Data retrieved successfully"
    echo "Sample data: $(echo $DATA | head -c 100)..."
else
    echo "❌ Failed to retrieve data"
    exit 1
fi
echo ""

# Test 5: Check if cms-data.json was created
echo "Test 5: Checking if cms-data.json exists..."
if [ -f "cms-data.json" ]; then
    echo "✅ CMS data file created"
    echo "File size: $(wc -c < cms-data.json) bytes"
else
    echo "❌ CMS data file not found"
    exit 1
fi
echo ""

# Test 6: Verify HTML files have cms-sync.js
echo "Test 6: Checking if HTML files have cms-sync.js..."
COUNT=$(grep -l "cms-sync.js" *.html 2>/dev/null | wc -l)
if [ "$COUNT" -gt 15 ]; then
    echo "✅ CMS sync script found in $COUNT HTML files"
else
    echo "❌ CMS sync script found in only $COUNT files (expected 15+)"
    exit 1
fi
echo ""

echo "🎉 All tests passed! CMS is working correctly."
echo ""
echo "Next steps:"
echo "1. Open http://localhost:3000/admin.html"
echo "2. Login with: admin / idoladmin2025"
echo "3. Edit content and click 'Publikuj Zmiany Online'"
echo "4. Open http://localhost:3000/index-pl.html in incognito mode"
echo "5. Verify your changes are visible!"
