"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

function pageList(current: number, total: number): (number | "…")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages = new Set<number>([1, total, current, current - 1, current + 1]);
  const sorted = [...pages].filter((p) => p >= 1 && p <= total).sort((a, b) => a - b);
  const out: (number | "…")[] = [];
  let prev = 0;
  for (const p of sorted) {
    if (prev && p - prev > 1) out.push("…");
    out.push(p);
    prev = p;
  }
  return out;
}

export default function Pagination({
  page,
  totalPages,
  onChange,
}: {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}) {
  if (totalPages <= 1) return null;

  return (
    <nav aria-label="Pagination" className="flex items-center justify-center gap-1.5 pt-4">
      <button
        aria-label="Previous page"
        disabled={page === 1}
        onClick={() => onChange(page - 1)}
        className="h-9 w-9 inline-flex items-center justify-center rounded-pill border border-black/10 bg-cream text-ink hover:bg-sand transition-colors disabled:opacity-35 disabled:hover:bg-cream disabled:cursor-not-allowed"
      >
        <ChevronLeft size={16} strokeWidth={2} />
      </button>

      {pageList(page, totalPages).map((p, i) =>
        p === "…" ? (
          <span key={`e-${i}`} className="h-9 w-9 inline-flex items-center justify-center text-stone text-sm">
            …
          </span>
        ) : (
          <button
            key={p}
            onClick={() => onChange(p)}
            aria-current={p === page ? "page" : undefined}
            className={`h-9 w-9 inline-flex items-center justify-center rounded-pill text-[13.5px] font-semibold transition-colors ${
              p === page
                ? "bg-nar text-white shadow-sm"
                : "bg-cream border border-black/10 text-ink hover:bg-sand"
            }`}
          >
            {p}
          </button>
        )
      )}

      <button
        aria-label="Next page"
        disabled={page === totalPages}
        onClick={() => onChange(page + 1)}
        className="h-9 w-9 inline-flex items-center justify-center rounded-pill border border-black/10 bg-cream text-ink hover:bg-sand transition-colors disabled:opacity-35 disabled:hover:bg-cream disabled:cursor-not-allowed"
      >
        <ChevronRight size={16} strokeWidth={2} />
      </button>
    </nav>
  );
}
