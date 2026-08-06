"use client";

import Image from 'next/image';

export default function AboutHero() {
  return (
    <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-24 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <div className="w-full lg:w-1/2 flex flex-col space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display text-forest leading-tight">
              Rooted in Family, Driven by Purpose
            </h1>
            <p className="text-lg md:text-xl text-slate max-w-xl">
              We are Stephanie and Hayley Painter, sisters on a mission to connect you to the source of your food through our family&apos;s organic skyr yogurt.
            </p>
          </div>
          
          <div className="w-full lg:w-1/2">
            <div className="relative aspect-[3/4] w-full max-w-md mx-auto rounded-2xl overflow-hidden shadow-soft-lg border-8 border-sand">
              <Image 
                src="/images/founders-portrait.jpg" 
                alt="Stephanie and Hayley Painter" 
                fill 
                className="object-cover"
                unoptimized
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
