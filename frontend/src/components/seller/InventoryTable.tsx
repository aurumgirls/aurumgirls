"use client";

import { useState } from "react";
import Image from "next/image";
import { AlertTriangle, Minus, Plus } from "lucide-react";
import { stockFor, LOW_STOCK_THRESHOLD } from "@/lib/seller-data";
import type { ShopProduct } from "@/lib/shop-data";

export default function InventoryTable({ products }: { products: ShopProduct[] }) {
  const [stock, setStock] = useState<Record<number, number>>(
    Object.fromEntries(products.map((p) => [p.id, stockFor(p)]))
  );

  const adjust = (id: number, delta: number) => {
    setStock((prev) => ({ ...prev, [id]: Math.max(0, (prev[id] ?? 0) + delta) }));
  };

  return (
    <div className="rounded-lg bg-cream border border-black/10 shadow-sm overflow-hidden">
      <div className="hidden sm:grid grid-cols-[3fr_1fr_1.4fr] gap-3 px-6 py-3 text-[11px] font-bold tracking-[0.08em] uppercase text-stone border-b border-black/10">
        <span>Product</span>
        <span>SKU</span>
        <span>Stock on hand</span>
      </div>
      <div className="divide-y divide-black/10">
        {products.map((p) => {
          const qty = stock[p.id] ?? 0;
          const low = qty > 0 && qty <= LOW_STOCK_THRESHOLD;
          const out = qty === 0;
          return (
            <div key={p.id} className="grid grid-cols-1 sm:grid-cols-[3fr_1fr_1.4fr] gap-3 px-5 sm:px-6 py-4 items-center">
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

              <span className="text-[12.5px] text-stone font-mono">AG-{String(p.id).padStart(4, "0")}</span>

              <div className="flex items-center gap-3">
                <div className="inline-flex items-center rounded-pill border border-black/15 bg-linen overflow-hidden">
                  <button
                    onClick={() => adjust(p.id, -1)}
                    aria-label={`Decrease stock for ${p.name}`}
                    className="h-8 w-8 flex items-center justify-center hover:bg-sand transition-colors text-ink"
                  >
                    <Minus size={13} strokeWidth={2} />
                  </button>
                  <span className="w-9 text-center text-[13px] font-semibold tabular-nums">{qty}</span>
                  <button
                    onClick={() => adjust(p.id, 1)}
                    aria-label={`Increase stock for ${p.name}`}
                    className="h-8 w-8 flex items-center justify-center hover:bg-sand transition-colors text-ink"
                  >
                    <Plus size={13} strokeWidth={2} />
                  </button>
                </div>

                {out ? (
                  <span className="text-[11.5px] font-semibold text-nar">Out of stock</span>
                ) : low ? (
                  <span className="inline-flex items-center gap-1 text-[11.5px] font-semibold text-aurum">
                    <AlertTriangle size={12} strokeWidth={2} />
                    Low stock
                  </span>
                ) : (
                  <span className="text-[11.5px] text-olive font-semibold">In stock</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
