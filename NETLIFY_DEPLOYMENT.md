# 🚀 Netlify Deployment Guide for CertTrackr

## 📋 **Prerequisites**
- GitHub/GitLab repository with your code
- Netlify account (free tier available)
- Backend hosting service (Render, Railway, Heroku, etc.)

## 🔧 **Step 1: Prepare Your Backend**

Since Netlify is primarily for static sites, you'll need to host your Express server separately:

### **Option A: Render (Recommended - Free)**
1. Go to [render.com](https://render.com)
2. Connect your GitHub repository
3. Create a new Web Service
4. Set build command: `npm install && npm run build`
5. Set start command: `npm start`
6. Get your backend URL (e.g., `https://your-app.onrender.com`)

### **Option B: Railway**
1. Go to [railway.app](https://railway.app)
2. Connect your GitHub repository
3. Deploy as a web service
4. Get your backend URL

## 🌐 **Step 2: Update Environment Variables**

Before deploying, update your client environment variables:

1. Create `client/.env.production`:
```env
VITE_API_BASE_URL=https://your-backend-url.onrender.com
VITE_SUPABASE_URL=https://ysrjtiwfmxvwoxzmohpl.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlzcmp0aXdmbXh2d294em1vaHBsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU4NDE2OTAsImV4cCI6MjA3MTQxNzY5MH0.JW1GU4PqUmz46GeLGhmCEuzwbPvoWtcPSCd4p-fw23E
```

2. Update `client/src/lib/api.ts` to use the environment variable:
```typescript
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
```

## 📦 **Step 3: Deploy to Netlify**

### **Method A: Git Integration (Recommended)**

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Prepare for Netlify deployment"
   git push origin main
   ```

2. **Connect to Netlify:**
   - Go to [netlify.com](https://netlify.com)
   - Click "New site from Git"
   - Choose your repository
   - Set build settings:
     - **Build command:** `cd client && npm install && npm run build`
     - **Publish directory:** `client/dist`
     - **Base directory:** Leave empty

3. **Environment Variables in Netlify:**
   - Go to Site settings → Environment variables
   - Add:
     - `VITE_API_BASE_URL`: Your backend URL
     - `VITE_SUPABASE_URL`: Your Supabase URL
     - `VITE_SUPABASE_ANON_KEY`: Your Supabase key

### **Method B: Manual Upload**

1. **Build locally:**
   ```bash
   cd client
   npm install
   npm run build
   ```

2. **Upload to Netlify:**
   - Drag and drop the `client/dist` folder to Netlify
   - Or use Netlify CLI: `netlify deploy --prod --dir=client/dist`

## ⚙️ **Step 4: Configure Netlify**

### **Redirects (for SPA routing):**
Create `client/public/_redirects`:
```
/*    /index.html   200
```

### **Headers:**
Create `client/public/_headers`:
```
/*
  X-Frame-Options: DENY
  X-XSS-Protection: 1; mode=block
  X-Content-Type-Options: nosniff
```

## 🔍 **Step 5: Test Your Deployment**

1. **Check your Netlify URL** (e.g., `https://your-app.netlify.app`)
2. **Test login functionality**
3. **Verify API calls work**
4. **Check console for errors**

## 🚨 **Common Issues & Solutions**

### **API Calls Failing:**
- Ensure `VITE_API_BASE_URL` is correct
- Check CORS settings on your backend
- Verify backend is running and accessible

### **Build Failures:**
- Check Node.js version (use 18+)
- Ensure all dependencies are in `package.json`
- Check for TypeScript errors

### **Routing Issues:**
- Ensure `_redirects` file is in `client/public`
- Check that all routes redirect to `index.html`

## 📱 **Custom Domain (Optional)**

1. Go to Site settings → Domain management
2. Add your custom domain
3. Configure DNS records
4. Enable HTTPS (automatic on Netlify)

## 🔄 **Continuous Deployment**

With Git integration:
- Every push to `main` branch triggers automatic deployment
- Preview deployments for pull requests
- Easy rollback to previous versions

## 💰 **Costs**

- **Netlify:** Free tier (100GB bandwidth/month)
- **Render:** Free tier (750 hours/month)
- **Total:** $0 for small to medium applications

## 🎯 **Next Steps**

1. Deploy your backend first
2. Update environment variables
3. Deploy frontend to Netlify
4. Test thoroughly
5. Set up custom domain (optional)

Your CertTrackr app will be live and accessible worldwide! 🌍
