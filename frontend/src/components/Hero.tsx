"use client";

import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative w-full min-h-[70vh] md:min-h-[85vh] flex items-center justify-center overflow-hidden bg-forest">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-banner.jpg"
          alt="Painterland Sisters Farm"
          fill
          className="object-cover opacity-60"
          unoptimized
          priority
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center animate-in fade-in slide-in-from-bottom-8 duration-1000">
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          <span className="px-3 py-1 bg-cream/90 text-forest text-xs font-bold uppercase tracking-wider rounded-full shadow-soft">USDA Organic</span>
          <span className="px-3 py-1 bg-cream/90 text-forest text-xs font-bold uppercase tracking-wider rounded-full shadow-soft">High Protein</span>
          <span className="px-3 py-1 bg-cream/90 text-forest text-xs font-bold uppercase tracking-wider rounded-full shadow-soft">Lactose Free</span>
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-display text-cream mb-6 drop-shadow-md">
          Organic Icelandic-Style Skyr
        </h1>
        
        <p className="text-lg md:text-2xl text-cream/90 mb-10 max-w-2xl font-body drop-shadow">
          Made with organic milk from our family farm in Pennsylvania
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center">
          <Link href="/shop" className="px-8 py-4 bg-terracotta hover:bg-terracotta-light text-cream rounded-full font-semibold transition-colors shadow-soft-lg flex items-center justify-center">
            Shop Skyr
          </Link>
          <Link href="/find-us" className="px-8 py-4 bg-transparent border-2 border-white hover:bg-white/10 text-white rounded-full font-semibold transition-colors flex items-center justify-center">
            Find in Stores
          </Link>
        </div>
      </div>
    </section>
  );
}
