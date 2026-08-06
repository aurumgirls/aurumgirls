"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Search } from 'lucide-react';

export default function StoreLocatorBanner() {
  return (
    <section className="relative py-24 bg-forest overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/farm-landscape.jpg"
          alt="Farm landscape"
          fill
          className="object-cover opacity-20"
          unoptimized
        />
      </div>
      
      <div className="relative z-10 container mx-auto px-4 max-w-3xl text-center">
        <h2 className="text-3xl md:text-5xl font-display text-cream mb-4">
          Find Painterland Sisters Near You
        </h2>
        <p className="text-lg text-cream/80 mb-8">
          Available in grocers and specialty markets nationwide.
        </p>
        
        <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-6" onSubmit={(e) => e.preventDefault()}>
          <div className="relative flex-grow">
            <input 
              type="text" 
              placeholder="Enter Zip Code" 
              className="w-full px-6 py-4 rounded-full text-charcoal focus:outline-none focus:ring-2 focus:ring-terracotta"
            />
          </div>
          <button type="submit" className="px-8 py-4 bg-terracotta hover:bg-terracotta-light text-cream rounded-full font-semibold transition-colors flex items-center justify-center whitespace-nowrap">
            <Search className="w-5 h-5 mr-2" /> Search
          </button>
        </form>
        
        <Link href="/find-us" className="text-cream hover:text-terracotta transition-colors font-medium">
          Or browse all stores →
        </Link>
      </div>
    </section>
  );
}
