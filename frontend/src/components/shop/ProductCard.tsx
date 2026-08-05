"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, Star } from "lucide-react";
import type { ShopProduct } from "@/lib/shop-data";

export default function ProductCard({ product }: { product: ShopProduct }) {
  const outOfStock = product.availability === "out-of-stock";
  const lowStock = product.availability === "low-stock";

  return (
    <div className="group rounded-lg overflow-hidden bg-cream border border-black/10 shadow-sm hover:shadow-md transition-shadow flex flex-col">
      <div className="relative">
        <Link href={`/product/${product.slug}`} className="block relative h-44">
          {product.image ? (
            <Image src={product.image} alt={product.name} fill className="object-cover" />
          ) : (
            <div
              className="absolute inset-0 transition-transform duration-300 group-hover:scale-105"
              style={{
                background: `linear-gradient(135deg, ${product.swatch[0]}, ${product.swatch[1]})`,
              }}
            />
          )}
          {outOfStock && (
            <div className="absolute inset-0 bg-ink/45 flex items-center justify-center">
              <span className="text-linen text-[12px] font-semibold tracking-wide uppercase bg-ink/70 px-3 py-1.5 rounded-pill">
                Out of stock
              </span>
            </div>
          )}
        </Link>

        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5">
          {product.isNew && (
            <span className="text-[10px] font-bold tracking-wide uppercase bg-olive text-linen px-2 py-1 rounded-xs">
              New
            </span>
          )}
          {lowStock && (
            <span className="text-[10px] font-bold tracking-wide uppercase bg-aurum text-linen px-2 py-1 rounded-xs">
              Low stock
            </span>
          )}
        </div>

        <button
          aria-label={`Save ${product.name} to wishlist`}
          className="absolute top-2.5 right-2.5 h-8 w-8 rounded-pill bg-cream/95 border border-black/10 flex items-center justify-center shadow-sm hover:text-nar transition-colors"
        >
          <Heart size={15} strokeWidth={1.8} />
        </button>

        <div className="absolute left-2.5 bottom-2.5 flex items-center gap-1.5 bg-cream/95 rounded-pill pl-1 pr-2.5 py-1 text-[11px] font-semibold shadow-sm">
          <span className="h-5 w-5 rounded-pill bg-sage" />
          {product.maker}
        </div>
      </div>

      <div className="p-4 flex flex-col gap-2 flex-1">
        <span className="text-[10.5px] font-semibold tracking-[0.1em] uppercase text-aurum">
          {product.region}
        </span>
        <Link href={`/product/${product.slug}`} className="font-medium text-[14.5px] leading-snug hover:text-nar transition-colors">
          {product.name}
        </Link>
        <div className="flex items-center gap-1 text-[12px] text-stone">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={12}
              className={i < Math.round(product.rating) ? "fill-aurum text-aurum" : "text-sand"}
            />
          ))}
          <span className="ml-1">({product.reviews})</span>
        </div>
        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="font-serif text-[19px]">
            {product.currency}
            {product.price}
          </span>
          <button
            disabled={outOfStock}
            className="rounded-pill bg-nar text-white text-[12.5px] font-semibold px-3.5 py-2 hover:bg-nar-deep transition-colors disabled:bg-sand disabled:text-stone disabled:cursor-not-allowed"
          >
            {outOfStock ? "Notify me" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}
