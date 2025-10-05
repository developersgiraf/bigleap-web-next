// Simple password helper for .env configuration

// Function to display password info
function displayPasswordInfo(password) {
  console.log(`Password: ${password}`);
  console.log('Add this to your .env.local file as:');
  console.log(`ADMIN_PASSWORD=${password}\n`);
  return password;
}

// If called directly from command line with password argument
if (require.main === module) {
  const password = process.argv[2];
  
  if (!password) {
    console.log('Usage: node scripts/generate-password.js <password>');
    console.log('Example: node scripts/generate-password.js myNewPassword123');
    console.log('\nThis will help you set up the ADMIN_PASSWORD in .env.local');
    console.log('Current default password is "admin123"');
    process.exit(1);
  }
  
  displayPasswordInfo(password);
}

module.exports = { displayPasswordInfo };