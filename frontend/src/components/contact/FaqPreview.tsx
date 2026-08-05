"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

const FAQS = [
  {
    q: "How do I know my payment goes directly to the maker?",
    a: "Every seller on By Aurum Girls sets her own prices and receives the majority of each sale directly. We only take a small platform fee to cover payments and shipping support.",
  },
  {
    q: "How long does shipping take?",
    a: "Most orders ship from the maker's village within 2–4 business days, then arrive within 5–10 days domestically or 10–18 days internationally, depending on destination.",
  },
  {
    q: "Can I return or exchange an item?",
    a: "Yes — most items can be returned within 14 days of delivery. Since everything is handmade, small variations in color or pattern aren't considered defects.",
  },
  {
    q: "I'm a woman artisan in Azerbaijan — how do I start selling?",
    a: "Click \"Sell with us\" in the header or \"Become a Seller\" below to start your application. Our team reviews every shop before it goes live.",
  },
];

export default function FaqPreview() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div>
      <div className="flex items-end justify-between mb-6">
        <div>
          <span className="text-[11.5px] font-semibold tracking-[0.14em] uppercase text-aurum">
            Before you reach out
          </span>
          <h2 className="text-[24px] sm:text-[28px] mt-1">Frequently asked questions</h2>
        </div>
        <Link href="/faq" className="text-sm font-semibold text-nar hover:text-nar-deep hidden sm:inline-block">
          View full FAQ →
        </Link>
      </div>

      <div className="rounded-lg bg-cream border border-black/10 shadow-sm divide-y divide-black/8 overflow-hidden">
        {FAQS.map((item, i) => {
          const isOpen = open === i;
          return (
            <div key={item.q}>
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                className="w-full flex items-center justify-between gap-4 px-5 sm:px-6 py-4 text-left"
                aria-expanded={isOpen}
              >
                <span className="text-[14.5px] font-medium text-ink">{item.q}</span>
                <ChevronDown
                  size={17}
                  strokeWidth={2}
                  className={`shrink-0 text-stone transition-transform ${isOpen ? "rotate-180" : ""}`}
                />
              </button>
              {isOpen && (
                <div className="px-5 sm:px-6 pb-4 -mt-1">
                  <p className="text-[13.5px] text-stone leading-relaxed max-w-[68ch]">{item.a}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <Link
        href="/faq"
        className="sm:hidden inline-flex items-center text-[13.5px] font-semibold text-nar hover:text-nar-deep mt-5"
      >
        View full FAQ →
      </Link>
    </div>
  );
}
