const bcrypt = require('bcryptjs');

// New secure admin password - change this to your desired password!
const password = '2255';

bcrypt.hash(password, 10, (err, hash) => {
  if (err) {
    console.error('Error hashing password:', err);
    return;
  }
  
  console.log('Password:', password);
  console.log('Hashed password:', hash);
  console.log('\nUpdate your data/users/index.json with this hash.');
});

// run : node scripts/generate-password.js