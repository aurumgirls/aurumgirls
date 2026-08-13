"use client";

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type AdminAuthStore = {
  token: string | null;
  setToken: (token: string | null) => void;
};

export const useAdminAuthStore = create<AdminAuthStore>()(
  persist(
    (set) => ({
      token: null,
      setToken: (token) => set({ token }),
    }),
    { name: 'admin-auth' }
  )
);
