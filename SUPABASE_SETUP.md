# Supabase Storage Setup Guide for Document Expiry Project

This guide will help you set up Supabase storage for your **Document Expiry** certificate management system to store and serve PDF files.

## ✅ **Already Configured**

Great news! Your Supabase project is already set up with the following details:
- **Project Name**: Document Expiry
- **Project ID**: ysrjtiwfmxvwoxzmohpl
- **Project URL**: https://ysrjtiwfmxvwoxzmohpl.supabase.co
- **Storage Bucket**: `certificates` (already created)

## 🔑 **Your Credentials**

### Environment Variables (Copy to your .env file)
```bash
# Database Configuration
DATABASE_URL="postgresql://postgres:KettleStudio@100@db.ysrjtiwfmxvwoxzmohpl.supabase.co:5432/postgres"

# Supabase Configuration
SUPABASE_URL="https://ysrjtiwfmxvwoxzmohpl.supabase.co"
SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlzcmp0aXdmbXh2d294em1vaHBsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU4NDE2OTAsImV4cCI6MjA3MTQxNzY5MH0.JW1GU4PqUmz46GeLGhmCEuzwbPvoWtcPSCd4p-fw23E"
SUPABASE_SERVICE_ROLE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlzcmp0aXdmbXh2d294em1vaHBsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NTg0MTY5MCwiZXhwIjoyMDcxNDE3NjkwfQ.mcj5lAImir3PW7smJMG3sUacUUb9XjZ4vEo89JAUqM0"

# Frontend Environment Variables
VITE_SUPABASE_URL="https://ysrjtiwfmxvwoxzmohpl.supabase.co"
VITE_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlzcmp0aXdmbXh2d294em1vaHBsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU4NDE2OTAsImV4cCI6MjA3MTQxNzY5MH0.JW1GU4PqUmz46GeLGhmCEuzwbPvoWtcPSCd4p-fw23E"

PORT=5000
```

## 📋 **Setup Steps**

### Step 1: Create .env File
1. Copy the environment variables above
2. Create a `.env` file in your project root
3. Paste the variables (make sure there are no extra spaces)

### Step 2: Verify Storage Bucket
1. Go to [https://ysrjtiwfmxvwoxzmohpl.supabase.co](https://ysrjtiwfmxvwoxzmohpl.supabase.co)
2. Sign in with your credentials
3. Navigate to **Storage** → **Buckets**
4. Verify the `certificates` bucket exists and is public

### Step 3: Check Storage Policies
1. Go to **Storage** → **Policies**
2. Ensure the `certificates` bucket has a public read policy:
   - **Policy name**: `Public read access`
   - **Allowed operation**: SELECT
   - **Target roles**: `public`
   - **Policy definition**: `true`

### Step 4: Update Database Schema
Run this SQL in your Supabase SQL Editor to add the `file_path` column:

```sql
-- Add file_path column if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'certificates' AND column_name = 'file_path'
    ) THEN
        ALTER TABLE certificates ADD COLUMN file_path TEXT NOT NULL DEFAULT '';
    END IF;
END $$;
```

## 🧪 **Test Your Setup**

### Run the Storage Test
```bash
node test-storage.js
```

This will verify that:
- ✅ Environment variables are correct
- ✅ Supabase connection works
- ✅ Storage bucket is accessible
- ✅ File upload/download works

## 🚀 **Start Your Application**

After setup:
1. **Install dependencies**: `npm install`
2. **Start the server**: `npm run dev`
3. **Test file upload**: Upload a certificate
4. **Verify storage**: Check Supabase Storage bucket
5. **Test download**: Download the certificate

## 🔧 **Troubleshooting**

### Common Issues

1. **"Bucket not found" error**
   - The `certificates` bucket should already exist
   - If not, create it in your Supabase dashboard

2. **"Permission denied" error**
   - Check that your environment variables are correct
   - Ensure no extra spaces in the .env file
   - Verify the bucket is public

3. **"Connection failed" error**
   - Check your internet connection
   - Verify the project URL is correct
   - Ensure your IP is allowed in Supabase settings

4. **Password issues with special characters**
   - The password `KettleStudio@100` contains special characters
   - Make sure it's properly escaped in the connection string
   - If issues persist, try URL encoding: `KettleStudio%40100`

### Debug Steps
1. ✅ Check environment variables are set correctly
2. ✅ Verify Supabase project URL and keys
3. ✅ Run the test script: `node test-storage.js`
4. ✅ Check browser console for errors
5. ✅ Verify file exists in Supabase Storage bucket

## 📊 **Monitor Your Storage**

- **Dashboard**: [https://ysrjtiwfmxvwoxzmohpl.supabase.co](https://ysrjtiwfmxvwoxzmohpl.supabase.co)
- **Storage Usage**: Check Storage → Buckets → certificates
- **Database**: Check Table Editor → certificates table
- **API Logs**: Check Logs for any errors

## 🎯 **What Happens Next**

After successful setup:
1. **File uploads** will go to Supabase Storage
2. **File paths** will be stored in the database
3. **Downloads** will work without 404 errors
4. **Files** will be automatically cleaned up when certificates are deleted

## 🆘 **Need Help?**

If you encounter issues:
1. Check the troubleshooting section above
2. Run the test script: `node test-storage.js`
3. Check your Supabase dashboard for errors
4. Verify all environment variables are set correctly

Your Document Expiry project is now ready for production use with reliable file storage! 🎉
