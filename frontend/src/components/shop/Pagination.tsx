"use client";

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

/**
 * First page, last page, and a window around the current one — with gaps
 * collapsed to an ellipsis. Rendering every page overflowed the row once the
 * catalog grew past a handful of pages.
 */
function buildPageList(currentPage: number, totalPages: number): (number | 'gap')[] {
  const SIBLINGS = 1;
  const pages = new Set<number>([1, totalPages]);

  for (let p = currentPage - SIBLINGS; p <= currentPage + SIBLINGS; p++) {
    if (p >= 1 && p <= totalPages) pages.add(p);
  }

  const sorted = [...pages].sort((a, b) => a - b);
  const result: (number | 'gap')[] = [];

  sorted.forEach((page, idx) => {
    if (idx > 0 && page - sorted[idx - 1] > 1) result.push('gap');
    result.push(page);
  });

  return result;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const t = useTranslations('shop');
  if (totalPages <= 1) return null;

  const pages = buildPageList(currentPage, totalPages);
  const arrowClass =
    "w-10 h-10 flex items-center justify-center rounded-full bg-white border border-sand text-slate transition-[color,border-color,transform] duration-200 ease-organic hover:text-terracotta hover:border-terracotta active:scale-90 disabled:opacity-50 disabled:hover:text-slate disabled:hover:border-sand disabled:active:scale-100 disabled:cursor-not-allowed";

  return (
    <nav className="flex items-center gap-2" aria-label={t('filters.title')}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={arrowClass}
        aria-label={t('pagination.previous')}
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {pages.map((page, idx) =>
        page === 'gap' ? (
          <span key={`gap-${idx}`} aria-hidden="true" className="w-6 text-center text-slate select-none">
            …
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            aria-current={currentPage === page ? 'page' : undefined}
            className={cn(
              "w-10 h-10 flex items-center justify-center rounded-full text-sm font-medium border transition-[background-color,color,border-color,transform] duration-200 ease-organic active:scale-90",
              currentPage === page
                ? "bg-terracotta text-white border-terracotta"
                : "bg-white text-charcoal border-sand hover:bg-linen hover:border-forest/30"
            )}
          >
            {page}
          </button>
        )
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={arrowClass}
        aria-label={t('pagination.next')}
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </nav>
  );
}
