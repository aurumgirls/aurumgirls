"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { AlertTriangle, Bell, Search } from "lucide-react";
import { shopCategories } from "@/lib/shop-data";
import type { ShopProduct } from "@/lib/shop-data";
import { stockFor, LOW_STOCK_THRESHOLD } from "@/lib/admin-data";

type Severity = "all" | "low" | "out";

export default function AdminInventoryTable({ products }: { products: ShopProduct[] }) {
  const [query, setQuery] = useState("");
  const [severity, setSeverity] = useState<Severity>("all");
  const [notified, setNotified] = useState<Set<number>>(new Set());

  const rows = useMemo(() => {
    return products
      .map((p) => ({ product: p, stock: stockFor(p) }))
      .filter((r) => r.stock <= LOW_STOCK_THRESHOLD)
      .sort((a, b) => a.stock - b.stock);
  }, [products]);

  const filtered = rows.filter((r) => {
    const matchesQuery =
      query.trim().length === 0 ||
      r.product.name.toLowerCase().includes(query.toLowerCase()) ||
      r.product.maker.toLowerCase().includes(query.toLowerCase());
    const matchesSeverity =
      severity === "all" || (severity === "out" ? r.stock === 0 : r.stock > 0 && r.stock <= LOW_STOCK_THRESHOLD);
    return matchesQuery && matchesSeverity;
  });

  const notify = (id: number) => {
    setNotified((prev) => new Set(prev).add(id));
    window.setTimeout(() => {
      setNotified((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }, 2400);
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <div className="flex items-center gap-1.5 rounded-pill bg-cream border border-black/10 p-1 shadow-sm w-fit">
          {([
            { label: "All low stock", value: "all" },
            { label: "Low", value: "low" },
            { label: "Out of stock", value: "out" },
          ] as { label: string; value: Severity }[]).map((t) => (
            <button
              key={t.value}
              onClick={() => setSeverity(t.value)}
              className={`rounded-pill px-4 py-2 text-[13px] font-semibold transition-colors ${
                severity === t.value ? "bg-nar text-white" : "text-ink hover:bg-sand"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
        <div className="relative flex-1 sm:max-w-[280px] sm:ml-auto">
          <Search size={15} strokeWidth={2} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search product or seller…"
            className="w-full rounded-sm bg-linen border border-black/15 pl-10 pr-3.5 py-2.5 text-[14px] text-ink outline-none focus:ring-2 focus:ring-aurum focus:border-aurum transition-shadow"
          />
        </div>
      </div>

      <div className="rounded-lg bg-cream border border-black/10 shadow-sm overflow-hidden">
        <div className="hidden lg:grid grid-cols-[2.6fr_1.4fr_1fr_1fr_1fr_1.2fr] gap-3 px-6 py-3 text-[11px] font-bold tracking-[0.08em] uppercase text-stone border-b border-black/10">
          <span>Product</span>
          <span>Seller</span>
          <span>Category</span>
          <span>Stock</span>
          <span>Status</span>
          <span className="text-right">Action</span>
        </div>
        <div className="divide-y divide-black/10">
          {filtered.map(({ product: p, stock }) => {
            const out = stock === 0;
            return (
              <div
                key={p.id}
                className="grid grid-cols-1 lg:grid-cols-[2.6fr_1.4fr_1fr_1fr_1fr_1.2fr] gap-3 px-5 sm:px-6 py-4 items-center"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="relative h-12 w-12 shrink-0 rounded-md overflow-hidden border border-black/10 bg-linen">
                    {p.image ? (
                      <Image src={p.image} alt={p.name} fill className="object-cover" />
                    ) : (
                      <div
                        className="absolute inset-0"
                        style={{ background: `linear-gradient(135deg, ${p.swatch[0]}, ${p.swatch[1]})` }}
                      />
                    )}
                  </div>
                  <p className="text-[13.5px] font-medium text-ink truncate">{p.name}</p>
                </div>

                <span className="text-[13px] text-ink truncate">{p.maker}</span>

                <span className="text-[13px] text-stone truncate">
                  {shopCategories.find((c) => c.slug === p.category)?.name ?? p.category}
                </span>

                <span className="text-[13.5px] font-semibold tabular-nums text-ink">{stock}</span>

                {out ? (
                  <span className="text-[11.5px] font-semibold text-nar">Out of stock</span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[11.5px] font-semibold text-aurum">
                    <AlertTriangle size={12} strokeWidth={2} />
                    Low stock
                  </span>
                )}

                <div className="flex items-center justify-start lg:justify-end">
                  <button
                    onClick={() => notify(p.id)}
                    className={`inline-flex items-center gap-1.5 rounded-pill px-3.5 py-1.5 text-[12px] font-semibold transition-colors ${
                      notified.has(p.id) ? "bg-olive text-white" : "bg-sand text-ink hover:bg-kraft/40"
                    }`}
                  >
                    <Bell size={12} strokeWidth={2} />
                    {notified.has(p.id) ? "Notified" : "Notify seller"}
                  </button>
                </div>
              </div>
            );
          })}
          {filtered.length === 0 && (
            <div className="px-6 py-10 text-center text-[13.5px] text-stone">No inventory issues match your filters.</div>
          )}
        </div>
      </div>
    </div>
  );
}
