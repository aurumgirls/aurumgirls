"use client";

import { Leaf, RefreshCcw, Heart } from 'lucide-react';

const certifications = [
  { icon: Leaf, title: 'USDA Organic', desc: 'No synthetic pesticides or fertilizers. Just pure, organic goodness from our farm to your fridge.' },
  { icon: RefreshCcw, title: 'Regeneratively Farmed', desc: 'Farming practices that restore soil health, improve water cycles, and draw carbon from the atmosphere.' },
  { icon: Heart, title: 'Women Owned', desc: 'Founded and led by sisters Stephanie and Hayley, empowering women in agriculture.' },
];

export default function GiftCollections() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-display text-forest text-center mb-12">
          Certifications & Quality
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {certifications.map((cert, idx) => {
            const Icon = cert.icon;
            return (
              <div key={idx} className="bg-linen p-8 rounded-2xl flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-cream rounded-full flex items-center justify-center mb-6 text-terracotta shadow-soft">
                  <Icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-display text-forest mb-3">{cert.title}</h3>
                <p className="text-slate text-sm">{cert.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
