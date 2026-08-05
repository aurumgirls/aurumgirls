"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Eye, Plus, Star, Trash2, X } from "lucide-react";
import { TextField, SelectField } from "@/components/checkout/Field";
import { shopCategories } from "@/lib/shop-data";
import type { ShopProduct } from "@/lib/shop-data";

type Row = ShopProduct & { active: boolean; views: number };

export default function ProductManagementTable({ products }: { products: ShopProduct[] }) {
  const [rows, setRows] = useState<Row[]>(
    products.map((p, i) => ({
      ...p,
      active: p.availability !== "out-of-stock",
      views: 120 + p.id * 37 + i * 11,
    }))
  );
  const [adding, setAdding] = useState(false);

  const toggleActive = (id: number) => {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, active: !r.active } : r)));
  };

  const remove = (id: number) => {
    setRows((prev) => prev.filter((r) => r.id !== id));
  };

  const handleAdd = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = String(form.get("new-name") || "Untitled product");
    const price = Number(form.get("new-price") || 0);
    const category = String(form.get("new-category") || shopCategories[0].slug);
    const newRow: Row = {
      id: Date.now(),
      name,
      slug: name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      category,
      price,
      currency: "₼",
      maker: rows[0]?.maker ?? "",
      region: rows[0]?.region ?? "",
      rating: 5,
      reviews: 0,
      availability: "in-stock",
      swatch: ["#C9A87C", "#EFE4D0"],
      active: true,
      views: 0,
    };
    setRows((prev) => [newRow, ...prev]);
    setAdding(false);
    e.currentTarget.reset();
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-end">
        <button
          onClick={() => setAdding((a) => !a)}
          className="inline-flex items-center gap-2 rounded-sm bg-nar text-white text-[13.5px] font-semibold px-4 py-2.5 hover:bg-nar-deep transition-colors"
        >
          {adding ? <X size={15} strokeWidth={2.2} /> : <Plus size={15} strokeWidth={2.2} />}
          {adding ? "Cancel" : "Add product"}
        </button>
      </div>

      {adding && (
        <form onSubmit={handleAdd} className="rounded-lg bg-cream border border-black/10 shadow-sm p-6">
          <h3 className="text-[17px] mb-4">New listing</h3>
          <div className="grid sm:grid-cols-3 gap-4">
            <TextField label="Product name" name="new-name" placeholder="Woven wool throw" span="full" />
            <SelectField
              label="Category"
              name="new-category"
              options={shopCategories.map((c) => c.name)}
              defaultValue={shopCategories[0].name}
            />
            <TextField label="Price (₼)" name="new-price" type="number" placeholder="45" />
          </div>
          <button
            type="submit"
            className="inline-flex items-center rounded-sm bg-nar text-white text-[14px] font-semibold px-6 py-3 mt-5 hover:bg-nar-deep transition-colors"
          >
            Publish listing
          </button>
        </form>
      )}

      <div className="rounded-lg bg-cream border border-black/10 shadow-sm overflow-hidden">
        <div className="hidden lg:grid grid-cols-[3fr_1fr_1fr_1fr_1fr_1.2fr] gap-3 px-6 py-3 text-[11px] font-bold tracking-[0.08em] uppercase text-stone border-b border-black/10">
          <span>Product</span>
          <span>Price</span>
          <span>Rating</span>
          <span>Views</span>
          <span>Status</span>
          <span className="text-right">Actions</span>
        </div>
        <div className="divide-y divide-black/10">
          {rows.map((row) => (
            <div
              key={row.id}
              className="grid grid-cols-1 lg:grid-cols-[3fr_1fr_1fr_1fr_1fr_1.2fr] gap-3 px-5 sm:px-6 py-4 items-center"
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

              <span className="text-[13.5px] text-ink lg:text-left">₼{row.price}</span>

              <span className="inline-flex items-center gap-1 text-[13px] text-ink">
                <Star size={12} className="fill-aurum text-aurum" />
                {row.rating}
              </span>

              <span className="inline-flex items-center gap-1.5 text-[13px] text-stone">
                <Eye size={13} strokeWidth={1.8} />
                {row.views}
              </span>

              <button
                onClick={() => toggleActive(row.id)}
                className="justify-self-start"
                aria-label={row.active ? "Set to draft" : "Set to active"}
              >
                <span className="relative inline-flex h-6 w-11">
                  <span className={`absolute inset-0 rounded-pill transition-colors ${row.active ? "bg-olive" : "bg-sand"}`} />
                  <span
                    className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-pill bg-cream shadow-sm transition-transform ${
                      row.active ? "translate-x-5" : ""
                    }`}
                  />
                </span>
                <span className="text-[11px] text-stone ml-1 align-middle">{row.active ? "Active" : "Draft"}</span>
              </button>

              <div className="flex items-center justify-start lg:justify-end gap-2">
                <Link
                  href={`/product/${row.slug}`}
                  className="h-8 w-8 inline-flex items-center justify-center rounded-pill bg-sand text-ink hover:bg-kraft/40 transition-colors"
                  aria-label={`View ${row.name} live`}
                >
                  <ExternalLink size={13} strokeWidth={1.9} />
                </Link>
                <button
                  onClick={() => remove(row.id)}
                  className="h-8 w-8 inline-flex items-center justify-center rounded-pill bg-sand text-ink hover:bg-nar hover:text-white transition-colors"
                  aria-label={`Delete ${row.name}`}
                >
                  <Trash2 size={13} strokeWidth={1.9} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
