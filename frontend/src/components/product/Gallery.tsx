"use client";

import { useState } from 'react';
import Image from 'next/image';
import { ProductDetail } from '@/lib/product-detail';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface GalleryProps {
  images: ProductDetail['gallery'];
  productName: string;
  flavorColor: string;
}

export function Gallery({ images, productName, flavorColor }: GalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextImage = () => setActiveIndex((prev) => (prev + 1) % images.length);
  const prevImage = () => setActiveIndex((prev) => (prev - 1 + images.length) % images.length);

  const activeImage = images[activeIndex];

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image */}
      <div 
        className="relative aspect-square w-full rounded-2xl overflow-hidden flex items-center justify-center transition-colors duration-500"
        style={{ backgroundColor: activeImage?.type === 'swatch' && activeImage.swatch ? activeImage.swatch[0] : flavorColor || '#F5EBE6' }}
      >
        {activeImage.src ? (
          <Image
            src={activeImage.src}
            alt={`${productName} - ${activeImage.label}`}
            fill
            unoptimized
            className="object-contain p-8 transition-transform duration-500 hover:scale-105"
            priority
          />
        ) : activeImage.type === 'swatch' && activeImage.swatch ? (
          <div 
            className="w-full h-full"
            style={{ 
              background: `linear-gradient(${activeImage.angle}deg, ${activeImage.swatch[0]} 0%, ${activeImage.swatch[1]} 100%)` 
            }}
          />
        ) : (
          <div className="w-48 h-48 rounded-full bg-white/40 backdrop-blur-sm flex items-center justify-center shadow-soft">
            <span className="font-display text-forest text-2xl text-center px-4 leading-tight">Painterland<br/>Sisters</span>
          </div>
        )}

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button 
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-forest flex items-center justify-center shadow-soft backdrop-blur-sm transition-all z-10"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button 
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-forest flex items-center justify-center shadow-soft backdrop-blur-sm transition-all z-10"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}
        
        {/* Image Badge */}
        {activeImage.label && (
          <div className="absolute bottom-4 left-4 bg-cream/95 text-charcoal px-3 py-1 rounded-pill text-xs font-medium backdrop-blur-sm shadow-soft">
            {activeImage.label}
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={cn(
                "relative w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden transition-all flex items-center justify-center",
                activeIndex === idx 
                  ? "border-2 border-terracotta ring-4 ring-terracotta/30" 
                  : "border border-transparent opacity-70 hover:opacity-100"
              )}
              style={{ backgroundColor: img.type === 'swatch' && img.swatch ? img.swatch[0] : flavorColor || '#F5EBE6' }}
            >
              {img.src ? (
                <Image
                  src={img.src}
                  alt={img.label}
                  fill
                  unoptimized
                  className="object-contain p-2"
                />
              ) : img.type === 'swatch' && img.swatch ? (
                <div 
                  className="w-full h-full"
                  style={{ 
                    background: `linear-gradient(${img.angle}deg, ${img.swatch[0]} 0%, ${img.swatch[1]} 100%)` 
                  }}
                />
              ) : (
                <span className="text-[10px] font-display text-forest text-center leading-tight">Painterland</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
