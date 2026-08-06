"use client";

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbsProps {
  items: { label: string; href?: string }[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="flex items-center text-sm mb-6 overflow-x-auto whitespace-nowrap pb-2">
      <Link href="/" className="text-slate hover:text-terracotta transition-colors">
        Home
      </Link>
      {items.map((item, index) => (
        <div key={index} className="flex items-center">
          <ChevronRight className="w-4 h-4 text-sand mx-2 flex-shrink-0" />
          {item.href ? (
            <Link href={item.href} className="text-slate hover:text-terracotta transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-forest font-medium">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  );
}
