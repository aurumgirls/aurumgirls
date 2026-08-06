"use client";

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function AboutCTA() {
  return (
    <section className="py-20 lg:py-32 bg-forest text-cream text-center">
      <div className="container mx-auto px-4 md:px-6 max-w-3xl flex flex-col items-center">
        <h2 className="text-4xl md:text-5xl font-display mb-6">Taste the Difference</h2>
        <p className="text-xl text-linen/90 mb-10">
          Experience the rich, creamy texture and powerful nutrition of our organic skyr, made straight from our family farm.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/shop" 
            className="inline-flex items-center justify-center bg-terracotta hover:bg-terracotta-light text-cream px-8 py-4 rounded-full font-medium transition-colors duration-300"
          >
            Shop Skyr
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
          <Link 
            href="/find-us" 
            className="inline-flex items-center justify-center bg-transparent border-2 border-cream hover:bg-cream hover:text-forest text-cream px-8 py-4 rounded-full font-medium transition-colors duration-300"
          >
            Find in Stores
          </Link>
        </div>
      </div>
    </section>
  );
}
