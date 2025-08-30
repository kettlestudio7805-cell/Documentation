// Test script to verify Supabase storage setup for Document Expiry Project
// Run with: node test-storage.js

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

async function testStorage() {
  console.log('🧪 Testing Supabase Storage Setup for Document Expiry Project...\n');

  // Check environment variables
  const requiredVars = ['SUPABASE_URL', 'SUPABASE_SERVICE_ROLE_KEY'];
  const missingVars = requiredVars.filter(varName => !process.env[varName]);
  
  if (missingVars.length > 0) {
    console.error('❌ Missing environment variables:', missingVars.join(', '));
    console.log('Please check your .env file and ensure all variables are set.');
    console.log('Refer to SUPABASE_SETUP.md for the correct values.');
    return;
  }

  try {
    // Initialize Supabase client
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    console.log('✅ Supabase client initialized');
    console.log(`🔗 Project URL: ${process.env.SUPABASE_URL}`);

    // Test bucket access
    console.log('📦 Checking storage buckets...');
    const { data: buckets, error: bucketError } = await supabase.storage.listBuckets();
    
    if (bucketError) {
      console.error('❌ Failed to list buckets:', bucketError.message);
      console.log('This might be a permissions issue. Check your service role key.');
      return;
    }

    console.log('✅ Successfully connected to Supabase storage');
    console.log('📦 Available buckets:', buckets.map(b => b.name).join(', '));

    // Check if certificates bucket exists
    const certificatesBucket = buckets.find(b => b.name === 'certificates');
    
    if (!certificatesBucket) {
      console.log('⚠️  Certificates bucket not found. Please create it in your Supabase dashboard.');
      console.log('   - Go to Storage → Create new bucket');
      console.log('   - Name: certificates');
      console.log('   - Public bucket: checked');
      console.log('   - File size limit: 10 MB');
      console.log('   - Allowed types: PDF, JPG, PNG');
      return;
    } else {
      console.log('✅ Certificates bucket found');
      
      // Test file operations
      const testFileName = `test-${Date.now()}.txt`;
      const testContent = 'This is a test file for Document Expiry project storage';
      
      console.log(`📝 Testing file upload: ${testFileName}`);
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('certificates')
        .upload(testFileName, testContent, {
          contentType: 'text/plain',
          upsert: false
        });

      if (uploadError) {
        console.error('❌ File upload failed:', uploadError.message);
        console.log('This might be a permissions issue. Check your storage policies.');
        return;
      }

      console.log('✅ Test file uploaded successfully');

      // Get public URL
      const { data: urlData } = supabase.storage
        .from('certificates')
        .getPublicUrl(testFileName);

      console.log('🔗 Public URL:', urlData.publicUrl);

      // Test file download
      console.log('📥 Testing file download...');
      const { data: downloadData, error: downloadError } = await supabase.storage
        .from('certificates')
        .download(testFileName);

      if (downloadError) {
        console.error('❌ File download failed:', downloadError.message);
      } else {
        console.log('✅ File download test successful');
      }

      // Clean up test file
      console.log('🧹 Cleaning up test file...');
      const { error: deleteError } = await supabase.storage
        .from('certificates')
        .remove([testFileName]);

      if (deleteError) {
        console.error('⚠️  Failed to delete test file:', deleteError.message);
      } else {
        console.log('✅ Test file cleaned up');
      }
    }

    console.log('\n🎉 Storage setup test completed successfully!');
    console.log('Your Document Expiry application should now be able to upload and serve files.');
    console.log('\n📋 Next steps:');
    console.log('1. Start your application: npm run dev');
    console.log('2. Test file upload with a real certificate');
    console.log('3. Verify files appear in your Supabase storage bucket');
    console.log('4. Test download functionality');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.log('\n🔧 Troubleshooting tips:');
    console.log('1. Check your environment variables in .env file');
    console.log('2. Verify your Supabase project URL and keys');
    console.log('3. Ensure your IP is allowed in Supabase settings');
    console.log('4. Check the SUPABASE_SETUP.md guide for detailed instructions');
    console.log('5. Verify the certificates bucket exists and is public');
    
    if (error.message.includes('fetch')) {
      console.log('\n🌐 Network issues detected:');
      console.log('- Check your internet connection');
      console.log('- Verify the project URL is accessible');
      console.log('- Check if Supabase is experiencing downtime');
    }
  }
}

// Run the test
testStorage();
