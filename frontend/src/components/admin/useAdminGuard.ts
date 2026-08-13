"use client";

import { useEffect } from 'react';
import { useRouter } from '@/i18n/navigation';
import { useAdminAuthStore } from '@/store/admin-auth-store';

export function useAdminGuard() {
  const router = useRouter();
  const token = useAdminAuthStore((s) => s.token);
  const setToken = useAdminAuthStore((s) => s.setToken);

  useEffect(() => {
    if (!token) {
      router.replace('/admin/login');
    }
  }, [token, router]);

  const logout = () => {
    setToken(null);
    router.replace('/admin/login');
  };

  return { token, ready: !!token, logout };
}
