# Vercel Deployment Guide

## Files Created/Updated for Vercel Deployment:

### 1. API Structure
- `api/login.js` - Serverless function for admin login
- `vercel.json` - Vercel configuration
- `.env` - Environment variables (DO NOT commit to git)
- `.gitignore` - Excludes sensitive files

### 2. Updated Files
- `login-script.js` - Updated to use Vercel API endpoint
- `package.json` - Updated for Vercel deployment
- `test-login.js` - Updated to test Vercel endpoint

## Deployment Steps:

### 1. Environment Variables in Vercel Dashboard
Go to your Vercel project settings and add these environment variables:
```
ADMIN_USERNAME=Sundaram
ADMIN_PASSWORD=CK@454()
```

### 2. Deploy to Vercel
```bash
# If using Vercel CLI
vercel --prod

# Or push to your connected Git repository
git add .
git commit -m "Add Vercel API support"
git push origin main
```

### 3. Test the Deployment
- Visit: https://bombayguardservice.vercel.app
- Try admin login with:
  - Username: Sundaram
  - Password: CK@454()

## API Endpoints:
- Login: `https://bombayguardservice.vercel.app/api/login`

## Troubleshooting:
1. Check Vercel function logs in dashboard
2. Ensure environment variables are set
3. Verify CORS headers are working
4. Test API endpoint directly

## Admin Credentials:
- Username: Sundaram
- Password: CK@454()