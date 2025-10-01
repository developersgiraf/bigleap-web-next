"use client";

import { usePathname } from 'next/navigation';

const ConditionalLayout = ({ children, excludeComponents = [] }) => {
  const pathname = usePathname();
  
  // Check if current page is admin page
  const isAdminPage = pathname?.startsWith('/giraf/admin');
  
  // If it's an admin page and this component should be excluded, don't render
  if (isAdminPage && excludeComponents.length > 0) {
    return null;
  }
  
  return <>{children}</>;
};

export default ConditionalLayout;