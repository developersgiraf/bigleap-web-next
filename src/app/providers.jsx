"use client";

import { SessionProvider } from 'next-auth/react';

export default function Providers({ children, session }) {
  return (
    <SessionProvider 
      session={session}
      // Reduce polling frequency - only poll every 15 minutes instead of default 4 minutes
      refetchInterval={15 * 60}
      // Don't poll when window is not focused
      refetchOnWindowFocus={false}
    >
      {children}
    </SessionProvider>
  );
}