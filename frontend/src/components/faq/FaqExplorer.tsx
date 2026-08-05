"use client";

import { useMemo, useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import { faqCategories, faqItems } from "@/lib/faq-data";

export default function FaqExplorer() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("all");
  const [openId, setOpenId] = useState<string | null>("shipping-time");

  const filtered = useMemo(() => {
    return faqItems.filter((item) => {
      const matchesCategory = category === "all" || item.category === category;
      const q = query.trim().toLowerCase();
      const matchesQuery =
        q.length === 0 || item.question.toLowerCase().includes(q) || item.answer.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [query, category]);

  const counts = useMemo(() => {
    const base: Record<string, number> = { all: faqItems.length };
    faqCategories.forEach((c) => {
      base[c.slug] = faqItems.filter((i) => i.category === c.slug).length;
    });
    return base;
  }, []);

  return (
    <div className="flex flex-col gap-8">
      <div className="relative max-w-[560px] mx-auto w-full">
        <Search size={17} strokeWidth={2} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search questions — shipping, returns, selling…"
          className="w-full rounded-pill bg-cream border border-black/12 shadow-sm pl-11 pr-4 py-3.5 text-[14.5px] text-ink placeholder:text-stone/70 outline-none focus:ring-2 focus:ring-aurum focus:border-aurum transition-shadow"
        />
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2">
        <button
          onClick={() => setCategory("all")}
          className={`rounded-pill px-4 py-2 text-[13px] font-semibold transition-colors border ${
            category === "all" ? "bg-nar text-white border-nar" : "bg-cream text-ink border-black/12 hover:bg-sand"
          }`}
        >
          All topics <span className="opacity-70">({counts.all})</span>
        </button>
        {faqCategories.map((c) => (
          <button
            key={c.slug}
            onClick={() => setCategory(c.slug)}
            className={`rounded-pill px-4 py-2 text-[13px] font-semibold transition-colors border ${
              category === c.slug ? "bg-nar text-white border-nar" : "bg-cream text-ink border-black/12 hover:bg-sand"
            }`}
          >
            {c.name} <span className="opacity-70">({counts[c.slug]})</span>
          </button>
        ))}
      </div>

      {filtered.length > 0 ? (
        <div className="rounded-lg bg-cream border border-black/10 shadow-sm divide-y divide-black/8 overflow-hidden">
          {filtered.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div key={item.id}>
                <button
                  onClick={() => setOpenId(isOpen ? null : item.id)}
                  className="w-full flex items-center justify-between gap-4 px-5 sm:px-7 py-4.5 sm:py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="text-[15px] font-medium text-ink">{item.question}</span>
                  <ChevronDown
                    size={18}
                    strokeWidth={2}
                    className={`shrink-0 text-stone transition-transform ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 sm:px-7 pb-5 -mt-1">
                    <p className="text-[14px] text-stone leading-relaxed max-w-[68ch]">{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="rounded-lg bg-cream border border-black/10 shadow-sm px-6 py-14 text-center">
          <p className="text-[15px] text-ink font-medium">No results for &ldquo;{query}&rdquo;</p>
          <p className="text-[13.5px] text-stone mt-1.5">
            Try a different search, or browse a topic above.
          </p>
        </div>
      )}
    </div>
  );
}
