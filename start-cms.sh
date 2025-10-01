#!/bin/bash

# Idol Brands CMS - Quick Start Script
# This script installs dependencies and starts the CMS server

echo "🚀 Starting Idol Brands CMS..."
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo ""
fi

# Check if server is already running
if lsof -Pi :3000 -sTCP:LISTEN -t >/dev/null 2>&1 ; then
    echo "⚠️  Server is already running on port 3000"
    echo ""
    echo "To stop the server, run: pkill -f 'node server.js'"
    echo "Or use a different port: PORT=8000 npm start"
    exit 1
fi

echo "✅ Starting CMS server..."
echo ""
echo "📍 Server will be available at: http://localhost:3000"
echo "📍 Admin panel: http://localhost:3000/admin.html"
echo "📍 Default login: admin / idoladmin2025"
echo ""
echo "🔵 Press Ctrl+C to stop the server"
echo ""

# Start the server
npm start
