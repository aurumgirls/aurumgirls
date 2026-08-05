"use client";

import { useState } from "react";
import { Check, Heart, Share2, ShieldCheck, RotateCcw, Truck } from "lucide-react";
import QuantitySelector from "./QuantitySelector";
import type { ProductDetail } from "@/lib/product-detail";

export default function PurchasePanel({ product }: { product: ProductDetail }) {
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [saved, setSaved] = useState(false);
  const outOfStock = product.availability === "out-of-stock";

  const handleAddToCart = () => {
    if (outOfStock) return;
    setAdded(true);
    window.setTimeout(() => setAdded(false), 2200);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <span className="font-serif text-[34px] leading-none">
          {product.currency}
          {product.price}
        </span>
        <div className="flex items-center gap-2">
          <button
            aria-label="Save to wishlist"
            onClick={() => setSaved((s) => !s)}
            className={`h-10 w-10 rounded-pill border flex items-center justify-center transition-colors ${
              saved
                ? "bg-nar-soft border-nar text-nar"
                : "bg-cream border-black/12 text-ink hover:bg-sand"
            }`}
          >
            <Heart size={16} strokeWidth={1.8} className={saved ? "fill-nar" : ""} />
          </button>
          <button
            aria-label="Share this product"
            className="h-10 w-10 rounded-pill border border-black/12 bg-cream text-ink flex items-center justify-center hover:bg-sand transition-colors"
          >
            <Share2 size={16} strokeWidth={1.8} />
          </button>
        </div>
      </div>

      {product.availability === "low-stock" && (
        <p className="text-[13px] font-semibold text-aurum -mt-2">Only a few left — order soon.</p>
      )}
      {outOfStock && (
        <p className="text-[13px] font-semibold text-nar -mt-2">
          Currently out of stock. Join the waitlist to be notified.
        </p>
      )}

      <ul className="flex flex-col gap-2">
        {product.highlights.map((h) => (
          <li key={h} className="flex items-start gap-2.5 text-[14px] text-ink/90">
            <Check size={16} strokeWidth={2.4} className="text-olive mt-0.5 shrink-0" />
            {h}
          </li>
        ))}
      </ul>

      <div className="flex flex-col gap-3 pt-1">
        <div className="flex items-center gap-4">
          <span className="text-[13px] font-semibold text-stone tracking-wide uppercase">
            Quantity
          </span>
          <QuantitySelector value={qty} onChange={setQty} />
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleAddToCart}
            disabled={outOfStock}
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-sm border-[1.5px] border-olive text-grove text-[15px] font-semibold px-6 py-3.5 hover:bg-sage transition-colors disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent"
          >
            {added ? (
              <>
                <Check size={17} strokeWidth={2.4} /> Added to cart
              </>
            ) : outOfStock ? (
              "Notify me"
            ) : (
              "Add to Cart"
            )}
          </button>
          <button
            disabled={outOfStock}
            className="flex-1 inline-flex items-center justify-center rounded-sm bg-nar text-white text-[15px] font-semibold px-6 py-3.5 shadow-sm hover:bg-nar-deep transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Buy Now
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 pt-2">
        {[
          { icon: Truck, label: "Ships in 3–5 days" },
          { icon: RotateCcw, label: "14-day easy returns" },
          { icon: ShieldCheck, label: "Secure checkout" },
        ].map(({ icon: Icon, label }) => (
          <div
            key={label}
            className="flex flex-col items-center text-center gap-1.5 rounded-md bg-linen border border-black/10 px-2.5 py-3.5"
          >
            <Icon size={17} strokeWidth={1.6} className="text-olive" />
            <span className="text-[11px] text-stone leading-tight">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
