"use client";

import { impactStats } from '@/lib/data';

export default function ImpactStats() {
  return (
    <section className="py-16 bg-forest text-cream">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-forest-light">
          {impactStats.map((stat, idx) => (
            <div key={idx} className="px-4 border-l-0 first:border-l-0 border-forest-light">
              <div className="text-4xl md:text-5xl font-display font-bold text-honey mb-2">
                {stat.value}
              </div>
              <div className="text-sm md:text-base font-medium opacity-90">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
