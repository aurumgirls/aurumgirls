"use client";

import { useState } from "react";
import { Check, Tag, X } from "lucide-react";
import type { Coupon } from "@/lib/cart-data";

export default function CouponForm({
  applied,
  error,
  onApply,
  onRemove,
}: {
  applied: Coupon | null;
  error: string | null;
  onApply: (code: string) => void;
  onRemove: () => void;
}) {
  const [code, setCode] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;
    onApply(code.trim());
    setCode("");
  };

  if (applied) {
    return (
      <div className="flex items-center justify-between gap-3 rounded-sm bg-sage border border-olive/25 px-4 py-3">
        <span className="inline-flex items-center gap-2 text-[13.5px] font-semibold text-grove">
          <Check size={15} strokeWidth={2.4} />
          {applied.code} applied — {applied.label}
        </span>
        <button
          onClick={onRemove}
          aria-label="Remove coupon"
          className="text-grove hover:text-nar transition-colors"
        >
          <X size={16} strokeWidth={2} />
        </button>
      </div>
    );
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex items-stretch gap-2">
        <div className="relative flex-1">
          <Tag
            size={15}
            strokeWidth={1.8}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone pointer-events-none"
          />
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Coupon code"
            aria-label="Coupon code"
            className="w-full rounded-sm bg-linen border border-black/15 pl-9 pr-3 py-2.5 text-[13.5px] text-ink placeholder:text-stone outline-none focus:ring-2 focus:ring-aurum focus:border-aurum uppercase"
          />
        </div>
        <button
          type="submit"
          className="rounded-sm border-[1.5px] border-olive text-grove text-[13px] font-semibold px-5 hover:bg-sage transition-colors shrink-0"
        >
          Apply
        </button>
      </form>
      {error && <p className="text-[12.5px] text-nar mt-2">{error}</p>}
      <p className="text-[11.5px] text-stone mt-2">Try <span className="font-semibold">AURUM10</span> for 10% off.</p>
    </div>
  );
}
