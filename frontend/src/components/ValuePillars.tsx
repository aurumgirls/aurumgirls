"use client";

import { valuePillars } from '@/lib/data';
import { ShieldCheck, Droplets, HeartPulse, Leaf, Milk, Heart } from 'lucide-react';

const iconMap = {
  protein: HeartPulse,
  lactose: Droplets,
  probiotic: ShieldCheck,
  organic: Leaf,
  milk: Milk,
  women: Heart,
};

export default function ValuePillars() {
  return (
    <section className="py-16 md:py-24 bg-cream">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-display text-forest text-center mb-12">
          Why Painterland Sisters?
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8">
          {valuePillars.map((pillar, idx) => {
            const Icon = iconMap[pillar.icon as keyof typeof iconMap] || Leaf;
            return (
              <div key={idx} className="flex flex-col items-center text-center group">
                <div className="w-16 h-16 rounded-full bg-forest-light/10 flex items-center justify-center mb-4 text-forest group-hover:bg-forest group-hover:text-cream transition-colors duration-300">
                  <Icon className="w-8 h-8" />
                </div>
                <h3 className="font-display font-semibold text-charcoal mb-2">{pillar.title}</h3>
                <p className="text-sm text-slate">{pillar.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
