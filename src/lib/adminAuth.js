// Admin authorization utilities
export const isAdminEmail = (email) => {
  if (!email) return false;
  
  const adminEmails = process.env.NEXT_PUBLIC_ADMIN_EMAILS?.split(',') || [];
  const cleanedAdminEmails = adminEmails.map(email => email.trim().toLowerCase());
  
  return cleanedAdminEmails.includes(email.toLowerCase());
};

export const getAdminEmails = () => {
  return process.env.NEXT_PUBLIC_ADMIN_EMAILS?.split(',').map(email => email.trim()) || [];
};

export const validateAdminAccess = (user) => {
  if (!user || !user.email) {
    return {
      isValid: false,
      message: 'No user information found'
    };
  }

  if (!isAdminEmail(user.email)) {
    return {
      isValid: false,
      message: `Access denied. ${user.email} is not authorized for admin access.`
    };
  }

  return {
    isValid: true,
    message: 'Admin access granted'
  };
};