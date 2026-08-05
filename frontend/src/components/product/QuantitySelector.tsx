"use client";

import { Minus, Plus } from "lucide-react";

export default function QuantitySelector({
  value,
  onChange,
  max = 20,
}: {
  value: number;
  onChange: (value: number) => void;
  max?: number;
}) {
  return (
    <div className="inline-flex items-center rounded-pill border border-black/15 bg-cream overflow-hidden">
      <button
        type="button"
        aria-label="Decrease quantity"
        onClick={() => onChange(Math.max(1, value - 1))}
        disabled={value <= 1}
        className="h-11 w-11 flex items-center justify-center text-ink hover:bg-sand transition-colors disabled:opacity-30 disabled:hover:bg-transparent"
      >
        <Minus size={15} strokeWidth={2} />
      </button>
      <span className="w-10 text-center text-[15px] font-semibold tabular-nums" aria-live="polite">
        {value}
      </span>
      <button
        type="button"
        aria-label="Increase quantity"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        className="h-11 w-11 flex items-center justify-center text-ink hover:bg-sand transition-colors disabled:opacity-30 disabled:hover:bg-transparent"
      >
        <Plus size={15} strokeWidth={2} />
      </button>
    </div>
  );
}
