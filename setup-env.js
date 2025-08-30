// Setup script to create .env file for Document Expiry Project
// Run with: node setup-env.js

const fs = require('fs');
const path = require('path');

const envContent = `# Database Configuration
DATABASE_URL="postgresql://postgres:KettleStudio@100@db.ysrjtiwfmxvwoxzmohpl.supabase.co:5432/postgres"

# Supabase Configuration
SUPABASE_URL="https://ysrjtiwfmxvwoxzmohpl.supabase.co"
SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlzcmp0aXdmbXh2d294em1vaHBsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU4NDE2OTAsImV4cCI6MjA3MTQxNzY5MH0.JW1GU4PqUmz46GeLGhmCEuzwbPvoWtcPSCd4p-fw23E"
SUPABASE_SERVICE_ROLE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlzcmp0aXdmbXh2d294em1vaHBsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NTg0MTY5MCwiZXhwIjoyMDcxNDE3NjkwfQ.mcj5lAImir3PW7smJMG3sUacUUb9XjZ4vEo89JAUqM0"

# Frontend Environment Variables (VITE_ prefix)
VITE_SUPABASE_URL="https://ysrjtiwfmxvwoxzmohpl.supabase.co"
VITE_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlzcmp0aXdmbXh2d294em1vaHBsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU4NDE2OTAsImV4cCI6MjA3MTQxNzY5MH0.JW1GU4PqUmz46GeLGhmCEuzwbPvoWtcPSCd4p-fw23E"

PORT=5000
`;

function createEnvFile() {
  const envPath = path.join(process.cwd(), '.env');
  
  try {
    // Check if .env already exists
    if (fs.existsSync(envPath)) {
      console.log('⚠️  .env file already exists!');
      console.log('Current .env file will be backed up as .env.backup');
      
      // Create backup
      const backupPath = path.join(process.cwd(), '.env.backup');
      fs.copyFileSync(envPath, backupPath);
      console.log('✅ Backup created: .env.backup');
    }
    
    // Write new .env file
    fs.writeFileSync(envPath, envContent);
    console.log('✅ .env file created successfully!');
    console.log('📁 Location:', envPath);
    
    console.log('\n🔑 Environment variables configured:');
    console.log('   • DATABASE_URL (Supabase PostgreSQL)');
    console.log('   • SUPABASE_URL (Project URL)');
    console.log('   • SUPABASE_ANON_KEY (Public key)');
    console.log('   • SUPABASE_SERVICE_ROLE_KEY (Service key)');
    console.log('   • VITE_SUPABASE_URL (Frontend)');
    console.log('   • VITE_SUPABASE_ANON_KEY (Frontend)');
    
    console.log('\n🚀 Next steps:');
    console.log('1. Test the setup: node test-storage.js');
    console.log('2. Start your application: npm run dev');
    console.log('3. Upload a certificate to test file storage');
    
  } catch (error) {
    console.error('❌ Failed to create .env file:', error.message);
    console.log('\n🔧 Manual setup:');
    console.log('1. Create a .env file in your project root');
    console.log('2. Copy the content from env.example');
    console.log('3. Replace placeholder values with your actual credentials');
  }
}

// Run the setup
createEnvFile();




