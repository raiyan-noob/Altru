"use client";
import React, { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { FiHeart } from 'react-icons/fi';

export default function PrivateRoute({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !user) {
      // Store redirect target
      try {
        sessionStorage.setItem('altru_redirect', pathname);
      } catch (e) {}
      router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
    }
  }, [user, loading, router, pathname]);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-4 px-4">
        <div className="relative flex items-center justify-center">
          <div className="w-16 h-16 rounded-full border-4 border-emerald-500/30 border-t-emerald-600 animate-spin"></div>
          <FiHeart className="w-6 h-6 text-emerald-600 absolute animate-pulse" />
        </div>
        <div className="text-center">
          <p className="font-bold text-base text-base-content">Authenticating Volunteer Session...</p>
          <p className="text-xs text-base-content/60">Verifying secure community credentials</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return <>{children}</>;
}

