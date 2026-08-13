"use client";

import { useState } from 'react';
import Image from 'next/image';
import { resolveImageUrl } from '@/lib/api';
import { FALLBACK_SWATCH } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface GalleryProps {
  images: string[];
  productName: string;
}

export function Gallery({ images, productName }: GalleryProps) {
  const t = useTranslations('product');
  const [activeIndex, setActiveIndex] = useState(0);

  const nextImage = () => setActiveIndex((prev) => (prev + 1) % images.length);
  const prevImage = () => setActiveIndex((prev) => (prev - 1 + images.length) % images.length);

  const activeImage = images[activeIndex];

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image */}
      <div
        className="relative aspect-square w-full rounded-2xl overflow-hidden flex items-center justify-center transition-colors duration-500"
        style={{ backgroundColor: FALLBACK_SWATCH }}
      >
        {activeImage ? (
          <Image
            src={resolveImageUrl(activeImage)}
            alt={productName}
            fill
            unoptimized
            className="object-contain p-8 transition-transform duration-500 hover:scale-105"
            priority
          />
        ) : (
          <div className="w-48 h-48 rounded-full bg-white/40 backdrop-blur-sm flex items-center justify-center shadow-soft">
            <span className="font-display text-forest text-xl text-center px-4 leading-tight">{productName}</span>
          </div>
        )}

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-forest flex items-center justify-center shadow-soft backdrop-blur-sm transition-all z-10"
              aria-label={t('gallery.previous')}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-forest flex items-center justify-center shadow-soft backdrop-blur-sm transition-all z-10"
              aria-label={t('gallery.next')}
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {images.map((img, idx) => (
            <button
              key={img}
              onClick={() => setActiveIndex(idx)}
              className={cn(
                "relative w-20 h-20 shrink-0 rounded-xl overflow-hidden transition-all flex items-center justify-center",
                activeIndex === idx
                  ? "border-2 border-terracotta ring-4 ring-terracotta/30"
                  : "border border-transparent opacity-70 hover:opacity-100"
              )}
              style={{ backgroundColor: FALLBACK_SWATCH }}
            >
              <Image
                src={resolveImageUrl(img)}
                alt={productName}
                fill
                unoptimized
                className="object-contain p-2"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
