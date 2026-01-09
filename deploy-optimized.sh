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
CLOUDFLARE_ZONE_ID="${CLOUDFLARE_ZONE_ID:-}"
CLOUDFLARE_API_TOKEN="${CLOUDFLARE_API_TOKEN:-}"

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

# Step 1: Git operations
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

# Step 2: Deploy to server using existing update.sh
print_step "Deploying to server..."
ssh -i "$SSH_KEY" "$SERVER_USER@$SERVER" << 'ENDSSH'
    set -e
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

# Step 4: Purge Cloudflare cache
if [ -n "$CLOUDFLARE_ZONE_ID" ] && [ -n "$CLOUDFLARE_API_TOKEN" ]; then
    print_step "Purging Cloudflare cache..."
    
    PURGE_RESPONSE=$(curl -s -X POST "https://api.cloudflare.com/client/v4/zones/$CLOUDFLARE_ZONE_ID/purge_cache" \
         -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
         -H "Content-Type: application/json" \
         --data '{"purge_everything":true}')
    
    if echo "$PURGE_RESPONSE" | grep -q '"success":[[:space:]]*true'; then
        print_success "Cloudflare cache purged successfully"
    else
        print_warning "Failed to purge Cloudflare cache automatically"
        echo "Response: $PURGE_RESPONSE"
        echo ""
        print_warning "Please purge manually at: https://dash.cloudflare.com"
    fi
else
    print_warning "Cloudflare credentials not set. Skipping cache purge."
    echo ""
    echo "To enable automatic cache purging, set environment variables:"
    echo "  export CLOUDFLARE_ZONE_ID='your-zone-id'"
    echo "  export CLOUDFLARE_API_TOKEN='your-api-token'"
    echo ""
    echo "Or purge manually at: https://dash.cloudflare.com"
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
