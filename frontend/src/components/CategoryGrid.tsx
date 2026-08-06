"use client";

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function CategoryGrid() {
  return (
    <section className="py-20 bg-cream">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-display text-forest text-center mb-12">
          Shop by Size
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Link href="/shop?category=single-serve" className="group relative rounded-2xl overflow-hidden aspect-[4/3] flex items-center justify-center p-8 bg-gradient-to-br from-vanilla to-peach shadow-soft hover:shadow-soft-lg transition-all duration-300">
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
            <div className="relative z-10 text-center">
              <h3 className="text-3xl font-display text-charcoal mb-4">Single Serve</h3>
              <p className="text-charcoal/80 mb-6 font-medium">5.3oz Cups</p>
              <span className="inline-flex items-center text-forest font-bold bg-white/50 backdrop-blur-sm px-6 py-3 rounded-full group-hover:bg-white transition-colors">
                Shop Cups <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </Link>
          
          <Link href="/shop?category=multi-serve" className="group relative rounded-2xl overflow-hidden aspect-[4/3] flex items-center justify-center p-8 bg-gradient-to-br from-blueberry to-meadowberry shadow-soft hover:shadow-soft-lg transition-all duration-300">
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
            <div className="relative z-10 text-center">
              <h3 className="text-3xl font-display text-charcoal mb-4">Multi-Serve</h3>
              <p className="text-charcoal/80 mb-6 font-medium">24oz Tubs</p>
              <span className="inline-flex items-center text-forest font-bold bg-white/50 backdrop-blur-sm px-6 py-3 rounded-full group-hover:bg-white transition-colors">
                Shop Tubs <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
