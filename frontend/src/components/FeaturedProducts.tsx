"use client";

import Link from 'next/link';
import Image from 'next/image';
import { featuredProducts } from '@/lib/data';
import { ArrowRight } from 'lucide-react';

export default function FeaturedProducts() {
  return (
    <section className="py-20 bg-linen">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-12">
          <h2 className="text-3xl md:text-4xl font-display text-forest">
            Our Skyr Lineup
          </h2>
          <Link href="/shop" className="hidden sm:flex items-center text-terracotta hover:text-terracotta-light font-semibold group">
            View all <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-soft-lg transition-shadow duration-300 group flex flex-col h-full">
              <Link href={`/product/${product.slug}`} className="block relative aspect-square" style={{ backgroundColor: product.flavorColor }}>
                {product.image ? (
                  <Image src={product.image} alt={product.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" unoptimized />
                ) : (
                  <div className="w-full h-full flex items-center justify-center opacity-30">
                    <span className="text-4xl font-display text-forest">PS</span>
                  </div>
                )}
              </Link>
              
              <div className="p-6 flex flex-col flex-grow">
                <div className="mb-4 flex-grow">
                  <div className="text-xs font-bold text-slate mb-1">{product.size}</div>
                  <h3 className="font-display text-xl text-charcoal mb-2">
                    <Link href={`/product/${product.slug}`} className="hover:text-forest transition-colors">
                      {product.name}
                    </Link>
                  </h3>
                  <p className="text-sm text-slate">${product.price.toFixed(2)}</p>
                </div>
                
                <button className="w-full py-3 bg-terracotta hover:bg-terracotta-light text-cream rounded-full font-semibold transition-colors mt-auto">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-8 text-center sm:hidden">
          <Link href="/shop" className="inline-flex items-center text-terracotta font-semibold">
            View all <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
