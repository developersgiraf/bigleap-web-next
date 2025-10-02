# Admin Users

## Default Admin User
- **Username:** `admin`
- **Password:** `secret123`
- **Email:** `admin@bigleap.ae`

## Adding New Users
To add a new admin user:

1. Generate a password hash:
```javascript
const bcrypt = require('bcrypt');
const hashedPassword = await bcrypt.hash('your-password', 10);
console.log(hashedPassword);
```

2. Add to `data/users.json`:
```json
{
  "id": "unique-id",
  "username": "newadmin",
  "password": "hashed-password-here",
  "name": "New Admin",
  "email": "newadmin@bigleap.ae", 
  "role": "admin",
  "createdAt": "2025-10-02T00:00:00Z"
}
```

## Security Notes
- Passwords are hashed using bcrypt
- Default password should be changed after first login
- Users.json should not be committed to version control in production