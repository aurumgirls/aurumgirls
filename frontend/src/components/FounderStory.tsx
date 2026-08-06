"use client";

import Image from 'next/image';
import Link from 'next/link';

export default function FounderStory() {
  return (
    <section className="py-20 bg-cream">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
          <div className="w-full md:w-1/2 order-2 md:order-1 relative aspect-[3/4] rounded-2xl overflow-hidden shadow-soft-lg">
            <Image 
              src="/images/founders-portrait.jpg" 
              alt="Stephanie and Hayley Painter" 
              fill 
              className="object-cover" 
              unoptimized
            />
          </div>
          
          <div className="w-full md:w-1/2 order-1 md:order-2">
            <h2 className="text-3xl md:text-5xl font-display text-forest mb-6">Meet the Sisters</h2>
            <p className="text-lg text-slate mb-6 font-body leading-relaxed">
              We are Stephanie and Hayley Painter, 5th generation dairy farmers from Tioga County, PA. We started Painterland Sisters to sustain our family farm and share the incredible nutrition of our organic milk with the world.
            </p>
            <p className="text-lg text-slate mb-8 font-body leading-relaxed">
              Our skyr is crafted with love, using regenerative farming practices that nourish the earth while bringing you thick, creamy, protein-packed yogurt.
            </p>
            <Link href="/about" className="inline-block px-8 py-4 border-2 border-forest text-forest hover:bg-forest hover:text-cream rounded-full font-semibold transition-colors">
              Read Our Story
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
