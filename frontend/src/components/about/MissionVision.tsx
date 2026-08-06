"use client";

import { Heart, Compass } from 'lucide-react';

export default function MissionVision() {
  return (
    <section className="py-16 bg-linen">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
          
          <div className="bg-cream p-10 rounded-3xl shadow-soft border border-sand flex flex-col items-center text-center space-y-6 transition-transform hover:-translate-y-2 duration-300">
            <div className="w-16 h-16 bg-terracotta/20 rounded-full flex items-center justify-center text-terracotta">
              <Heart size={32} />
            </div>
            <h3 className="text-2xl font-display text-forest">Our Mission</h3>
            <p className="text-slate text-lg">
              To connect consumers to the source of their food, providing deeply nourishing organic skyr while sustaining our family farm and honoring the land.
            </p>
          </div>
          
          <div className="bg-cream p-10 rounded-3xl shadow-soft border border-sand flex flex-col items-center text-center space-y-6 transition-transform hover:-translate-y-2 duration-300">
            <div className="w-16 h-16 bg-honey/20 rounded-full flex items-center justify-center text-honey">
              <Compass size={32} />
            </div>
            <h3 className="text-2xl font-display text-forest">Our Vision</h3>
            <p className="text-slate text-lg">
              A future where family farms thrive by producing nutrient-dense, organic foods using regenerative practices that heal the earth for generations to come.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
