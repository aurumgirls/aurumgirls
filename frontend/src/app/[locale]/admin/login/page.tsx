"use client";

import { useState } from 'react';
import { useRouter } from '@/i18n/navigation';
import { adminLogin, ApiError } from '@/lib/api';
import { useAdminAuthStore } from '@/store/admin-auth-store';

export default function AdminLoginPage() {
  const router = useRouter();
  const setToken = useAdminAuthStore((s) => s.setToken);
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    try {
      const { token } = await adminLogin(password);
      setToken(token);
      router.replace('/admin/products');
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Login failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-6">
      <form onSubmit={handleSubmit} className="w-full max-w-sm bg-white p-8 rounded-2xl border border-sand shadow-soft space-y-4">
        <h1 className="text-2xl font-display text-forest mb-2">Admin Login</h1>
        <input
          type="password"
          required
          autoFocus
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full px-4 py-3 rounded-xl border border-sand focus:outline-none focus:border-terracotta bg-white"
        />
        {error && <p className="text-terracotta text-sm">{error}</p>}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 bg-terracotta hover:bg-terracotta-light disabled:opacity-60 text-cream rounded-full font-medium transition-colors"
        >
          {isSubmitting ? 'Logging in...' : 'Log In'}
        </button>
      </form>
    </div>
  );
}
