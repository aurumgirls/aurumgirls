"use client";

import Image from 'next/image';
import Link from 'next/link';
import { recipes } from '@/lib/data';
import { Clock, HeartPulse } from 'lucide-react';

export default function JournalTeasers() {
  const displayRecipes = recipes.slice(0, 3);
  
  return (
    <section className="py-20 bg-linen">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-12">
          <h2 className="text-3xl md:text-4xl font-display text-forest">
            Skyr Recipes
          </h2>
          <Link href="/recipes" className="hidden sm:inline-flex text-terracotta hover:text-terracotta-light font-semibold">
            View all recipes →
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {displayRecipes.map((recipe, idx) => (
            <Link key={idx} href="/recipes" className="group bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-soft-lg transition-all duration-300">
              <div className="relative aspect-[16/9] bg-vanilla">
                {recipe.image ? (
                  <Image src={recipe.image} alt={recipe.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" unoptimized />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-vanilla to-peach opacity-50" />
                )}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-forest">
                  {recipe.category}
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-display text-xl text-charcoal mb-3 group-hover:text-terracotta transition-colors">{recipe.title}</h3>
                <div className="flex gap-4 text-sm text-slate font-medium">
                  <span className="flex items-center"><Clock className="w-4 h-4 mr-1" /> {recipe.prepTime}</span>
                  <span className="flex items-center"><HeartPulse className="w-4 h-4 mr-1" /> {recipe.protein}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="mt-8 text-center sm:hidden">
          <Link href="/recipes" className="inline-flex text-terracotta font-semibold">
            View all recipes →
          </Link>
        </div>
      </div>
    </section>
  );
}
