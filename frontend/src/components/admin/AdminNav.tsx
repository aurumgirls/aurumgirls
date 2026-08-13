"use client";

import { Link, usePathname } from '@/i18n/navigation';
import { cn } from '@/lib/utils';

export function AdminNav({ onLogout }: { onLogout: () => void }) {
  const pathname = usePathname();

  const linkClass = (href: string) =>
    cn(
      "px-4 py-2 rounded-full text-sm font-medium transition-colors",
      pathname.startsWith(href)
        ? "bg-forest text-cream"
        : "text-forest hover:bg-forest/10"
    );

  return (
    <div className="border-b border-sand bg-white">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-display text-lg text-forest mr-4">By Aurum Girls Admin</span>
          <Link href="/admin/products" className={linkClass('/admin/products')}>Products</Link>
          <Link href="/admin/orders" className={linkClass('/admin/orders')}>Orders</Link>
        </div>
        <button
          onClick={onLogout}
          className="text-sm text-slate hover:text-terracotta transition-colors"
        >
          Log Out
        </button>
      </div>
    </div>
  );
}
