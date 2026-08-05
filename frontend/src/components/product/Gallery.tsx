"use client";

import { useState } from "react";
import Image from "next/image";
import { ZoomIn } from "lucide-react";
import type { ProductDetail } from "@/lib/product-detail";

export default function Gallery({
  images,
  productName,
}: {
  images: ProductDetail["gallery"];
  productName: string;
}) {
  const [active, setActive] = useState(0);
  const current = images[active];

  return (
    <div className="flex flex-col gap-4">
      <div className="relative h-[440px] sm:h-[520px] lg:h-[580px] rounded-lg overflow-hidden border border-black/10 shadow-sm bg-cream group">
        {current.type === "photo" && current.src ? (
          <Image
            src={current.src}
            alt={productName}
            fill
            priority
            className="object-cover"
          />
        ) : (
          <div
            className="absolute inset-0 transition-transform duration-500 group-hover:scale-105"
            style={{
              background: `linear-gradient(${current.angle}deg, ${current.swatch[0]}, ${current.swatch[1]})`,
            }}
          />
        )}
        <div className="absolute inset-0 opacity-[0.08] mix-blend-overlay bg-[radial-gradient(circle_at_30%_20%,#fff,transparent_60%)]" />

        <span className="absolute top-4 left-4 rounded-pill bg-cream/95 border border-black/10 px-3 py-1.5 text-[11.5px] font-semibold text-ink shadow-sm">
          {current.label}
        </span>
        <span className="absolute top-4 right-4 h-9 w-9 rounded-pill bg-cream/95 border border-black/10 flex items-center justify-center text-ink shadow-sm">
          <ZoomIn size={16} strokeWidth={1.8} />
        </span>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {images.map((img, i) => (
          <button
            key={img.label}
            onClick={() => setActive(i)}
            aria-label={`Show ${img.label} image`}
            aria-current={i === active}
            className={`relative h-20 sm:h-24 rounded-md overflow-hidden border transition-all ${
              i === active
                ? "border-nar ring-2 ring-nar/30"
                : "border-black/10 hover:border-black/25"
            }`}
          >
            {img.type === "photo" && img.src ? (
              <Image src={img.src} alt="" fill className="object-cover" />
            ) : (
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(${img.angle}deg, ${img.swatch[0]}, ${img.swatch[1]})`,
                }}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
