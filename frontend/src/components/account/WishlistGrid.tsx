"use client";

import { useState } from "react";
import Link from "next/link";
import { Heart, X } from "lucide-react";
import ProductCard from "@/components/shop/ProductCard";
import type { ShopProduct } from "@/lib/shop-data";

export default function WishlistGrid({ items }: { items: ShopProduct[] }) {
  const [ids, setIds] = useState(items.map((p) => p.id));
  const visible = items.filter((p) => ids.includes(p.id));

  if (visible.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-20 rounded-lg bg-cream border border-black/10">
        <Heart size={30} strokeWidth={1.4} className="text-stone mb-3" />
        <p className="font-serif text-[20px] text-ink">Your wishlist is empty</p>
        <p className="text-stone text-[14px] mt-1.5 max-w-[38ch]">
          Save pieces you love while browsing and they&rsquo;ll show up here.
        </p>
        <Link
          href="/shop"
          className="mt-5 inline-flex items-center rounded-pill bg-nar text-white text-[13.5px] font-semibold px-5 py-2.5 hover:bg-nar-deep transition-colors"
        >
          Browse the shop
        </Link>
      </div>
    );
  }

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {visible.map((product) => (
        <div key={product.id} className="relative pt-3 pr-3">
          <button
            onClick={() => setIds((prev) => prev.filter((id) => id !== product.id))}
            aria-label={`Remove ${product.name} from wishlist`}
            className="absolute top-0 right-0 z-10 h-7 w-7 rounded-pill bg-ink text-linen flex items-center justify-center shadow-sm hover:bg-nar transition-colors"
          >
            <X size={13} strokeWidth={2.4} />
          </button>
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
}
