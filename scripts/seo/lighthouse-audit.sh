#!/bin/bash
# Lighthouse audit script for key pages

echo "Starting Lighthouse audit..."

# Create output directory
mkdir -p /workspace/seo/lighthouse

# Start a simple HTTP server in background
cd /workspace
python3 -m http.server 8765 &
SERVER_PID=$!
echo "Started HTTP server on port 8765 (PID: $SERVER_PID)"

# Wait for server to start
sleep 2

# Key pages to test
declare -a pages=(
    "index.html"
    "about.html"
    "how-it-works.html"
    "blog.html"
    "success-stories.html"
)

# Run Lighthouse for each page
for page in "${pages[@]}"
do
    echo "Testing: $page"
    lighthouse "http://localhost:8765/$page" \
        --output=json \
        --output-path="/workspace/seo/lighthouse/${page%.html}-report.json" \
        --only-categories=performance,seo,best-practices,accessibility \
        --chrome-flags="--headless --no-sandbox --disable-gpu" \
        --quiet 2>&1 | grep -E "(Performance|SEO|Best Practices|Accessibility|score)"
    
    if [ $? -eq 0 ]; then
        echo "✓ Completed: $page"
    else
        echo "✗ Failed: $page"
    fi
    echo "---"
done

# Kill the HTTP server
kill $SERVER_PID 2>/dev/null
echo "Stopped HTTP server"

echo "Lighthouse audit completed. Reports saved to /workspace/seo/lighthouse/"
