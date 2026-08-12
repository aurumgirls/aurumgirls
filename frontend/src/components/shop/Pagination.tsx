"use client";

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const t = useTranslations('shop');
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-sand text-slate hover:text-terracotta hover:border-terracotta disabled:opacity-50 disabled:hover:text-slate disabled:hover:border-sand transition-colors"
        aria-label={t('pagination.previous')}
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      
      {Array.from({ length: totalPages }).map((_, i) => {
        const page = i + 1;
        return (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={cn(
              "w-10 h-10 flex items-center justify-center rounded-full text-sm font-medium transition-colors border",
              currentPage === page
                ? "bg-terracotta text-white border-terracotta"
                : "bg-white text-charcoal border-sand hover:bg-linen"
            )}
          >
            {page}
          </button>
        );
      })}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-sand text-slate hover:text-terracotta hover:border-terracotta disabled:opacity-50 disabled:hover:text-slate disabled:hover:border-sand transition-colors"
        aria-label={t('pagination.next')}
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}
