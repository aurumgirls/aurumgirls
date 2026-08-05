"use client";

import { Search } from "lucide-react";

export default function SearchBar({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <form
      role="search"
      onSubmit={(e) => e.preventDefault()}
      className="relative w-full max-w-[560px]"
    >
      <Search
        size={18}
        strokeWidth={1.8}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-stone pointer-events-none"
      />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search products, makers, regions…"
        aria-label="Search products"
        className="w-full rounded-pill bg-cream border border-black/12 pl-11 pr-5 py-3.5 text-[14.5px] text-ink placeholder:text-stone shadow-sm outline-none focus:ring-2 focus:ring-aurum focus:border-aurum transition-shadow"
      />
    </form>
  );
}
