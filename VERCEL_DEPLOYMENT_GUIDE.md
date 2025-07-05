# Professional Tax Portal - Vercel Deployment Guide

This guide provides step-by-step instructions for deploying both the frontend and backend to Vercel with Fast2SMS OTP integration.

## 🚀 Quick Deployment

### Prerequisites

1. **Vercel Account**: Sign up at [https://vercel.com](https://vercel.com)
2. **Fast2SMS Account**: Get your API key from [https://www.fast2sms.com](https://www.fast2sms.com)
3. **Git Repository**: Push your code to GitHub, GitLab, or Bitbucket

### Step 1: Prepare Your Repository

Ensure your project structure looks like this:

```
projectprofessionaltax/
├── api/                          # Backend serverless functions
│   ├── health.js
│   ├── otp/
│   │   ├── send.js
│   │   └── verify.js
│   └── master-data/
│       ├── districts.js
│       ├── areas.js
│       ├── charges.js
│       ├── categories.js
│       ├── subcategories.js
│       ├── subcategories/[categoryId].js
│       └── charges/[areaId].js
├── frontend-professional-tax-portal/  # React frontend
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vercel.json
├── vercel.json                   # Main Vercel configuration
├── package.json                 # Root package.json
└── README.md
```

### Step 2: Install Vercel CLI

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login
```

### Step 3: Deploy to Vercel

#### Option A: Automatic Deployment (Recommended)

1. **Push to Git Repository**:
   ```bash
   git add .
   git commit -m "Initial commit for Vercel deployment"
   git push origin main
   ```

2. **Connect Repository to Vercel**:
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your Git repository
   - Vercel will automatically detect the configuration

#### Option B: Manual Deployment

```bash
# From project root directory
vercel --prod
```

### Step 4: Configure Environment Variables

In your Vercel dashboard, go to **Project Settings → Environment Variables** and add:

#### Production Environment Variables:

```bash
# Fast2SMS Configuration
FAST2SMS_API_KEY=qkb4hFHaKsSod8RX6pvMYPwc90ExltA5nVUWIfeizBu17QCGDyemc5QuFyR7zkOxAIglo6KqjU0EDtHh

# Frontend Configuration  
REACT_APP_API_BASE_URL=https://your-project.vercel.app/api
REACT_APP_ENVIRONMENT=production

# Optional: Database URL (if using external database)
DATABASE_URL=your_database_connection_string
```

**Important**: Replace `your-project.vercel.app` with your actual Vercel domain.

### Step 5: Update Frontend API Base URL

The frontend will automatically use the production API URL when deployed to Vercel due to the environment variable configuration.

## 🔧 Configuration Details

### Vercel Configuration (`vercel.json`)

```json
{
  "version": 2,
  "name": "professional-tax-portal",
  "builds": [
    {
      "src": "frontend-professional-tax-portal/package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "build"
      }
    },
    {
      "src": "api/**/*.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/api/$1"
    },
    {
      "src": "/(.*)",
      "dest": "/frontend-professional-tax-portal/$1"
    }
  ]
}
```

### API Endpoints

After deployment, your API will be available at:

- **Health Check**: `https://your-project.vercel.app/api/health`
- **Send OTP**: `https://your-project.vercel.app/api/otp/send`
- **Verify OTP**: `https://your-project.vercel.app/api/otp/verify`
- **Master Data**: 
  - Districts: `https://your-project.vercel.app/api/master-data/districts`
  - Categories: `https://your-project.vercel.app/api/master-data/categories`
  - Subcategories: `https://your-project.vercel.app/api/master-data/subcategories/1`
  - Areas: `https://your-project.vercel.app/api/master-data/areas`
  - Charges: `https://your-project.vercel.app/api/master-data/charges/AGT`

## 📱 Fast2SMS Integration

### OTP Send API

**Endpoint**: `POST /api/otp/send`

**Request Body**:
```json
{
  "mobile": "9999999999",
  "type": "mobile"
}
```

**Response**:
```json
{
  "success": true,
  "message": "OTP sent successfully",
  "data": "OTP sent to 9999999999"
}
```

### OTP Verify API

**Endpoint**: `POST /api/otp/verify`

**Request Body**:
```json
{
  "mobile": "9999999999",
  "otp": "123456",
  "type": "mobile"
}
```

**Response**:
```json
{
  "success": true,
  "message": "OTP verified successfully",
  "data": "Verified"
}
```

### Fast2SMS Configuration

The API uses Fast2SMS in **deployment mode** with POST requests and JSON body:

```javascript
const response = await fetch('https://www.fast2sms.com/dev/bulkV2', {
  method: 'POST',
  headers: {
    'authorization': process.env.FAST2SMS_API_KEY,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    route: 'otp',
    variables_values: otp,
    numbers: mobile,
    flash: '0'
  })
});
```

## 🎯 Testing Your Deployment

### 1. Test API Health

```bash
curl https://your-project.vercel.app/api/health
```

### 2. Test OTP Functionality

```bash
# Send OTP
curl -X POST https://your-project.vercel.app/api/otp/send \
  -H "Content-Type: application/json" \
  -d '{"mobile":"9999999999"}'

# Verify OTP (use the OTP received)
curl -X POST https://your-project.vercel.app/api/otp/verify \
  -H "Content-Type: application/json" \
  -d '{"mobile":"9999999999","otp":"123456"}'
```

### 3. Test Master Data APIs

```bash
# Get districts
curl https://your-project.vercel.app/api/master-data/districts

# Get categories
curl https://your-project.vercel.app/api/master-data/categories

# Get subcategories for category 1
curl https://your-project.vercel.app/api/master-data/subcategories/1
```

## 🔐 Security & Best Practices

### Environment Variables Security

1. **Never commit API keys** to your repository
2. **Use Vercel's Environment Variables** for sensitive data
3. **Rotate API keys regularly**
4. **Use different keys** for development and production

### CORS Configuration

The API includes CORS headers to allow cross-origin requests:

```javascript
res.setHeader('Access-Control-Allow-Origin', '*');
res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
```

### Rate Limiting

The OTP API includes basic rate limiting:
- 1 OTP per mobile number every 2 minutes
- OTP expires after 5 minutes

## 🚨 Troubleshooting

### Common Issues

1. **API Key Not Working**:
   - Verify the Fast2SMS API key is correct
   - Check that it's properly set in Vercel environment variables
   - Ensure the key has sufficient balance

2. **CORS Errors**:
   - Check that the frontend URL is correct
   - Verify CORS headers are properly set in API functions

3. **OTP Not Received**:
   - Check Fast2SMS API response in Vercel function logs
   - Verify mobile number format (Indian format: 10 digits starting with 6-9)
   - Check Fast2SMS account balance

4. **Build Errors**:
   - Ensure all dependencies are listed in package.json
   - Check that Node.js version is 18+
   - Verify file paths are correct

### Viewing Logs

1. Go to Vercel Dashboard
2. Select your project
3. Click on "Functions" tab
4. Click on any function to view logs
5. Check the "Invocations" section for errors

### Local Development

To test locally before deploying:

```bash
# Install dependencies
npm install

# Start local development server
vercel dev

# Test API endpoints
curl http://localhost:3000/api/health
```

## 📊 Monitoring & Analytics

### Vercel Analytics

Enable Vercel Analytics in your dashboard for:
- Page views and performance metrics
- API function execution stats
- Error tracking
- User geographical data

### Function Logs

Monitor your serverless functions:
- Execution time
- Memory usage
- Error rates
- Request patterns

## 🔄 Continuous Deployment

### Automatic Deployments

Once connected to Git:
1. **Push to main branch** → Automatic production deployment
2. **Push to other branches** → Preview deployments
3. **Pull requests** → Preview deployments with unique URLs

### Deployment Domains

- **Production**: `https://your-project.vercel.app`
- **Preview**: `https://your-project-git-branch.vercel.app`
- **Custom Domain**: Configure in Vercel dashboard

## 📈 Scaling Considerations

### Serverless Limitations

- **Execution Time**: Max 10 seconds per function call
- **Memory**: Max 1024MB per function
- **Concurrent Executions**: Auto-scaling with limits

### Database Considerations

For production, consider:
- **Vercel Postgres** for managed database
- **PlanetScale** for MySQL
- **MongoDB Atlas** for NoSQL
- **Supabase** for PostgreSQL with real-time features

This guide provides everything you need to deploy your Professional Tax Portal to Vercel with full Fast2SMS OTP integration!
