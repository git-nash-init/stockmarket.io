// Script to set admin custom claim for financewithmehul@gmail.com
// Run this once after creating the admin user in Firebase Console

const { initializeApp } = require('firebase-admin/app');
const { getAuth } = require('firebase-admin/auth');

// Initialize Firebase Admin SDK
const admin = require('firebase-admin');

// Initialize the app with service account (you'll need to download service account key)
// For now, we'll use the default credentials
admin.initializeApp({
  projectId: 'thestockmarket-290b4'
});

const ADMIN_EMAIL = 'financewithmehul@gmail.com';

async function setAdminClaim() {
  try {
    console.log('🔍 Looking for user with email:', ADMIN_EMAIL);
    
    // Get user by email
    const user = await getAuth().getUserByEmail(ADMIN_EMAIL);
    console.log('✅ Found user:', user.uid);
    
    // Set custom claims
    await getAuth().setCustomUserClaims(user.uid, { admin: true });
    console.log('🎉 Successfully set admin custom claim for:', ADMIN_EMAIL);
    
    // Verify the claim was set
    const updatedUser = await getAuth().getUser(user.uid);
    console.log('✅ Verified custom claims:', updatedUser.customClaims);
    
  } catch (error) {
    console.error('❌ Error setting admin claim:', error.message);
    
    if (error.code === 'auth/user-not-found') {
      console.log('💡 Please create the admin user first in Firebase Console:');
      console.log('   1. Go to https://console.firebase.google.com/project/thestockmarket-290b4/authentication/users');
      console.log('   2. Click "Add user"');
      console.log('   3. Email:', ADMIN_EMAIL);
      console.log('   4. Set a strong password');
      console.log('   5. Run this script again');
    }
  }
}

// Run the script
setAdminClaim();