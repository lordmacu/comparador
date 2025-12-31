#!/bin/bash
# deploy.sh - Build locally and push to Git repository

# Check if commit message is provided
if [ -z "$1" ]; then
  echo "❌ Error: Debes proporcionar un mensaje de commit"
  echo "Uso: ./deploy.sh \"tu mensaje de commit\""
  exit 1
fi

COMMIT_MSG="$1"

echo "🏗️  Building project locally..."
npm run build

if [ $? -ne 0 ]; then
  echo "❌ Build failed. Fix errors and try again."
  exit 1
fi

echo "✅ Build successful!"
echo ""
echo "📦 Adding files to Git..."
git add .

echo "💾 Committing changes..."
git commit -m "$COMMIT_MSG"

if [ $? -ne 0 ]; then
  echo "⚠️  No changes to commit or commit failed"
  exit 1
fi

echo "📤 Pushing to remote repository..."
git push origin main -f

if [ $? -ne 0 ]; then
  echo "❌ Push failed. Check your Git configuration."
  exit 1
fi

echo ""
echo "✅ Deployment complete!"
echo ""
echo "📋 Next steps on your EC2 server (3.138.110.50):"
echo "   1. SSH into server: ssh -i ~/Downloads/internet-colombia-key.pem ubuntu@3.138.110.50"
echo "   2. Navigate to app: cd /home/ubuntu/apps/internet-colombia"
echo "   3. Run update script: ./update.sh"
echo ""
