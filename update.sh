#!/bin/bash
# update.sh - Server-side update script for EC2
# This file should be copied to /home/ubuntu/apps/internet-colombia/ on your EC2 server

echo "🔄 Pulling latest changes from Git..."
git pull origin main

if [ $? -ne 0 ]; then
  echo "❌ Git pull failed. Check your repository access."
  exit 1
fi

echo "📦 Installing production dependencies..."
npm install --production

if [ $? -ne 0 ]; then
  echo "❌ npm install failed."
  exit 1
fi

echo "🔄 Restarting application with PM2..."
pm2 restart internet-colombia

if [ $? -ne 0 ]; then
  echo "⚠️  PM2 restart failed, trying to start..."
  pm2 start npm --name "internet-colombia" -- start
  pm2 save
fi

echo ""
echo "✅ Update complete!"
echo "📊 Application status:"
pm2 status
echo ""
echo "🌐 Your site should be running at: http://3.138.110.50"
echo ""
