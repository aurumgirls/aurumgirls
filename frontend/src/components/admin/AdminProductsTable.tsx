"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Flag, Search, Star, Trash2 } from "lucide-react";
import { SelectField } from "@/components/checkout/Field";
import { shopCategories } from "@/lib/shop-data";
import type { ShopProduct } from "@/lib/shop-data";

type Row = ShopProduct & { flagged: boolean };

export default function AdminProductsTable({
  products,
  flaggedIds,
}: {
  products: ShopProduct[];
  flaggedIds: Set<number>;
}) {
  const [rows, setRows] = useState<Row[]>(products.map((p) => ({ ...p, flagged: flaggedIds.has(p.id) })));
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All categories");
  const [flaggedOnly, setFlaggedOnly] = useState(false);

  const toggleFlag = (id: number) => {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, flagged: !r.flagged } : r)));
  };

  const remove = (id: number) => {
    setRows((prev) => prev.filter((r) => r.id !== id));
  };

  const filtered = useMemo(() => {
    return rows.filter((r) => {
      const matchesQuery =
        query.trim().length === 0 ||
        r.name.toLowerCase().includes(query.toLowerCase()) ||
        r.maker.toLowerCase().includes(query.toLowerCase());
      const matchesCategory =
        category === "All categories" || shopCategories.find((c) => c.slug === r.category)?.name === category;
      const matchesFlagged = !flaggedOnly || r.flagged;
      return matchesQuery && matchesCategory && matchesFlagged;
    });
  }, [rows, query, category, flaggedOnly]);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-end gap-3">
        <div className="flex-1">
          <label htmlFor="product-search" className="block text-[12.5px] font-semibold text-stone mb-1.5">
            Search
          </label>
          <div className="relative">
            <Search size={15} strokeWidth={2} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone" />
            <input
              id="product-search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by product or seller…"
              className="w-full rounded-sm bg-linen border border-black/15 pl-10 pr-3.5 py-2.5 text-[14px] text-ink outline-none focus:ring-2 focus:ring-aurum focus:border-aurum transition-shadow"
            />
          </div>
        </div>
        <div className="w-full sm:w-[200px]">
          <SelectField
            label="Category"
            name="category-filter"
            options={["All categories", ...shopCategories.map((c) => c.name)]}
            value={category}
            onChange={setCategory}
            required={false}
          />
        </div>
        <label className="flex items-center gap-2.5 cursor-pointer pb-2.5 shrink-0">
          <span className="relative inline-flex h-6 w-11">
            <input type="checkbox" checked={flaggedOnly} onChange={(e) => setFlaggedOnly(e.target.checked)} className="peer sr-only" />
            <span className="absolute inset-0 rounded-pill bg-sand peer-checked:bg-nar transition-colors" />
            <span className="absolute top-0.5 left-0.5 h-5 w-5 rounded-pill bg-cream shadow-sm transition-transform peer-checked:translate-x-5" />
          </span>
          <span className="text-[13px] font-medium text-ink">Flagged only</span>
        </label>
      </div>

      <div className="rounded-lg bg-cream border border-black/10 shadow-sm overflow-hidden">
        <div className="hidden lg:grid grid-cols-[3fr_1.6fr_0.9fr_0.8fr_1fr_1.2fr] gap-3 px-6 py-3 text-[11px] font-bold tracking-[0.08em] uppercase text-stone border-b border-black/10">
          <span>Product</span>
          <span>Seller</span>
          <span>Price</span>
          <span>Rating</span>
          <span>Status</span>
          <span className="text-right">Actions</span>
        </div>
        <div className="divide-y divide-black/10">
          {filtered.map((row) => (
            <div
              key={row.id}
              className="grid grid-cols-1 lg:grid-cols-[3fr_1.6fr_0.9fr_0.8fr_1fr_1.2fr] gap-3 px-5 sm:px-6 py-4 items-center"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="relative h-12 w-12 shrink-0 rounded-md overflow-hidden border border-black/10 bg-linen">
                  {row.image ? (
                    <Image src={row.image} alt={row.name} fill className="object-cover" />
                  ) : (
                    <div
                      className="absolute inset-0"
                      style={{ background: `linear-gradient(135deg, ${row.swatch[0]}, ${row.swatch[1]})` }}
                    />
                  )}
                </div>
                <div className="min-w-0">
                  <p className="text-[13.5px] font-medium text-ink truncate">{row.name}</p>
                  <p className="text-[11.5px] text-stone truncate">
                    {shopCategories.find((c) => c.slug === row.category)?.name ?? row.category}
                  </p>
                </div>
              </div>

              <span className="text-[13px] text-ink truncate">{row.maker}</span>

              <span className="text-[13.5px] text-ink">₼{row.price}</span>

              <span className="inline-flex items-center gap-1 text-[13px] text-ink">
                <Star size={12} className="fill-aurum text-aurum" />
                {row.rating}
              </span>

              <span
                className={`inline-flex items-center rounded-pill text-[11.5px] font-semibold px-3 py-1 w-fit ${
                  row.flagged ? "bg-nar-soft text-nar-deep" : "bg-sage text-grove"
                }`}
              >
                {row.flagged ? "Flagged" : "Live"}
              </span>

              <div className="flex items-center justify-start lg:justify-end gap-2">
                <Link
                  href={`/product/${row.slug}`}
                  className="h-8 w-8 inline-flex items-center justify-center rounded-pill bg-sand text-ink hover:bg-kraft/40 transition-colors"
                  aria-label={`View ${row.name}`}
                >
                  <ExternalLink size={13} strokeWidth={1.9} />
                </Link>
                <button
                  onClick={() => toggleFlag(row.id)}
                  className={`h-8 w-8 inline-flex items-center justify-center rounded-pill transition-colors ${
                    row.flagged ? "bg-nar text-white" : "bg-sand text-ink hover:bg-nar hover:text-white"
                  }`}
                  aria-label={`Flag ${row.name}`}
                >
                  <Flag size={13} strokeWidth={1.9} />
                </button>
                <button
                  onClick={() => remove(row.id)}
                  className="h-8 w-8 inline-flex items-center justify-center rounded-pill bg-sand text-ink hover:bg-nar hover:text-white transition-colors"
                  aria-label={`Remove ${row.name}`}
                >
                  <Trash2 size={13} strokeWidth={1.9} />
                </button>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="px-6 py-10 text-center text-[13.5px] text-stone">No products match your filters.</div>
          )}
        </div>
      </div>
    </div>
  );
}
