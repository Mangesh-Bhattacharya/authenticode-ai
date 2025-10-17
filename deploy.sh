#!/bin/bash

# AuthentiCode AI - Quick Deploy Script
# This script helps you deploy the application quickly

echo "🚀 AuthentiCode AI - Quick Deploy"
echo "=================================="

# Check if required tools are installed
command -v node >/dev/null 2>&1 || { echo "❌ Node.js is required but not installed. Aborting." >&2; exit 1; }
command -v npm >/dev/null 2>&1 || { echo "❌ npm is required but not installed. Aborting." >&2; exit 1; }
command -v git >/dev/null 2>&1 || { echo "❌ git is required but not installed. Aborting." >&2; exit 1; }

echo "✅ Prerequisites check passed"

# Frontend deployment
echo ""
echo "📦 Setting up Frontend..."
cd frontend

# Install dependencies
echo "Installing dependencies..."
npm install

# Build the project
echo "Building frontend..."
npm run build

echo "✅ Frontend build completed!"

# Backend setup
echo ""
echo "🐍 Setting up Backend..."
cd ../backend

# Check if Python is available
command -v python3 >/dev/null 2>&1 || { echo "❌ Python 3 is required but not installed. Aborting." >&2; exit 1; }

# Create virtual environment if it doesn't exist
if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
echo "Activating virtual environment..."
source venv/bin/activate

# Install dependencies
echo "Installing Python dependencies..."
pip install -r requirements.txt

echo "✅ Backend setup completed!"

echo ""
echo "🎉 Local setup complete!"
echo ""
echo "Next steps:"
echo "1. Set up your environment variables (.env file)"
echo "2. Deploy frontend to Vercel"
echo "3. Deploy backend to Render"
echo "4. Configure your database in Supabase"
echo ""
echo "For detailed instructions, see DEPLOYMENT_GUIDE.md"