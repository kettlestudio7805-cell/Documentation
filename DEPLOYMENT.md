# Deployment Guide for Vercel

## Prerequisites

1. ✅ Supabase project created and configured
2. ✅ Database password obtained
3. ✅ Environment variables configured

## Step 1: Update .env with Real Password

Replace `[YOUR-PASSWORD]` in your `.env` file with your actual Supabase database password:

```env
DATABASE_URL=postgresql://postgres:YOUR_ACTUAL_PASSWORD@db.ysrjtiwfmxvwoxzmohpl.supabase.co:5432/postgres
```

## Step 2: Test Database Connection Locally

```bash
npm run db:push
```

This should create migration files in the `migrations/` folder.

## Step 3: Deploy to Vercel

### Option A: Deploy via Vercel CLI

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy:
```bash
vercel --prod
```

### Option B: Deploy via Vercel Dashboard

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Configure build settings:
   - **Framework Preset**: Other
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

## Step 4: Configure Environment Variables on Vercel

In your Vercel project dashboard:

1. Go to **Settings** → **Environment Variables**
2. Add these variables:

```
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@db.ysrjtiwfmxvwoxzmohpl.supabase.co:5432/postgres
SUPABASE_URL=https://ysrjtiwfmxvwoxzmohpl.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlzcmp0aXdmbXh2d294em1vaHBsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU4NDE2OTAsImV4cCI6MjA3MTQxNzY5MH0.JW1GU4PqUmz46GeLGhmCEuzwbPvoWtcPSCd4p-fw23E
NODE_ENV=production
```

## Step 5: Database Setup on Supabase

1. Go to your Supabase dashboard
2. Navigate to **SQL Editor**
3. Run the SQL from `supabase-setup.sql`:

```sql
-- Enable the pgcrypto extension for gen_random_uuid()
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Create the certificates table
CREATE TABLE IF NOT EXISTS certificates (
  id VARCHAR(36) PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  issuer TEXT,
  expiry_date TIMESTAMP NOT NULL,
  uploaded_at TIMESTAMP DEFAULT NOW() NOT NULL,
  file_name TEXT NOT NULL,
  file_size INTEGER NOT NULL,
  ocr_text TEXT
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_certificates_expiry_date ON certificates(expiry_date);
CREATE INDEX IF NOT EXISTS idx_certificates_uploaded_at ON certificates(uploaded_at);
CREATE INDEX IF NOT EXISTS idx_certificates_name ON certificates(name);
```

## Step 6: Test Your Deployed App

1. Visit your Vercel deployment URL
2. Try uploading a certificate
3. Check if data is being stored in Supabase

## Troubleshooting

### Common Issues:

1. **Build Fails**: Check if all dependencies are in `package.json`
2. **Database Connection Error**: Verify environment variables on Vercel
3. **File Upload Issues**: Files are stored locally - consider moving to Supabase Storage
4. **CORS Issues**: Check if Supabase allows your Vercel domain

### Check Logs:

- Vercel: Project → Functions → View Function Logs
- Supabase: Database → Logs

## Next Steps

After successful deployment:

1. **File Storage**: Consider moving file uploads to Supabase Storage
2. **Monitoring**: Set up Supabase monitoring and alerts
3. **Backup**: Configure automated database backups
4. **Security**: Review and configure Row Level Security (RLS) policies

## Support

- [Vercel Documentation](https://vercel.com/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Drizzle ORM Documentation](https://orm.drizzle.team/)
