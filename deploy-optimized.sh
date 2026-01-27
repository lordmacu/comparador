#!/bin/bash
# deploy-optimized.sh - Simple deploy using server's update.sh + Cloudflare purge

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
SERVER="3.138.110.50"
SERVER_USER="ubuntu"
SSH_KEY="/Users/cristian/Downloads/comparador.pem"
APP_DIR="/home/ubuntu/apps/comparador"
DOMAIN="comparadorinternet.co"

# Function to print colored messages
print_step() {
    echo -e "${BLUE}▶${NC} $1"
}

print_success() {
    echo -e "${GREEN}✓${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

# Check if commit message is provided
if [ -z "$1" ]; then
  print_error "Debes proporcionar un mensaje de commit"
  echo "Uso: ./deploy-optimized.sh \"tu mensaje de commit\""
  exit 1
fi

COMMIT_MSG="$1"

# Step 1: Build locally
print_step "Building project locally..."
if npm run build; then
    print_success "Build successful!"
else
    print_error "Build failed. Fix errors and try again."
    exit 1
fi

# Step 2: Git operations
print_step "Committing changes..."
git add .
if git commit -m "$COMMIT_MSG"; then
    print_success "Changes committed"
else
    print_warning "No changes to commit"
fi

print_step "Pushing to remote repository..."
if git push origin main; then
    print_success "Pushed to remote"
else
    print_error "Push failed"
    exit 1
fi

# Step 3: Deploy to server using existing update.sh
print_step "Deploying to server..."
ssh -i "$SSH_KEY" "$SERVER_USER@$SERVER" << 'ENDSSH'
    set -e
    
    # Limpiar .next antes de hacer pull para evitar conflictos
    cd /home/ubuntu/apps/comparador
    echo "🧹 Limpiando directorio .next para evitar conflictos..."
    git checkout -- .next/ 2>/dev/null || true
    rm -rf .next/cache 2>/dev/null || true
    cd /home/ubuntu/apps/comparador
    
    echo "🚀 Running update script..."
    bash update.sh
ENDSSH

print_success "Deployed to server"

# Step 3: Health check
print_step "Performing health check..."
sleep 3
HTTP_STATUS=$(curl -o /dev/null -s -w "%{http_code}" "https://$DOMAIN")

if [ "$HTTP_STATUS" -eq 200 ]; then
    print_success "Site is responding (HTTP $HTTP_STATUS)"
else
    print_error "Site returned HTTP $HTTP_STATUS"
    print_warning "You may need to check the logs: ssh -i $SSH_KEY $SERVER_USER@$SERVER 'pm2 logs nextjs-app --lines 50'"
    exit 1
fi

# Final summary
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
print_success "Deployment completed successfully!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "🌐 Site: https://$DOMAIN"
echo "📊 PM2: ssh -i $SSH_KEY $SERVER_USER@$SERVER 'pm2 monit'"
echo "📋 Logs: ssh -i $SSH_KEY $SERVER_USER@$SERVER 'pm2 logs nextjs-app'"
echo ""
