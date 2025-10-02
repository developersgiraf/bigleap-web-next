const bcrypt = require('bcryptjs');

// Default admin password - change this!
const password = 'admin123';

bcrypt.hash(password, 10, (err, hash) => {
  if (err) {
    console.error('Error hashing password:', err);
    return;
  }
  
  console.log('Password:', password);
  console.log('Hashed password:', hash);
  console.log('\nUpdate your data/users/index.json with this hash.');
});