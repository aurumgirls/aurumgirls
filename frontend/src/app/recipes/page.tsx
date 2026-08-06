"use client";

import { useState } from 'react';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { recipes } from '@/lib/data';
import { Clock, Dumbbell } from 'lucide-react';

export default function RecipesPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  
  const categories = ['All', 'Breakfast', 'Smoothies', 'Dips & Savory', 'Desserts'];

  const filteredRecipes = activeCategory === 'All' 
    ? recipes 
    : recipes.filter(r => r.category === activeCategory);

  return (
    <>
      <Header />
      <main className="bg-cream min-h-screen pt-24 pb-16">
        {/* Hero Section */}
        <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden mb-12">
          <Image 
            src="/images/recipe-hero.jpg" 
            alt="Delicious skyr recipes" 
            fill 
            className="object-cover"
            priority
            unoptimized
          />
          <div className="absolute inset-0 bg-forest/40"></div>
          <div className="relative z-10 text-center text-cream px-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display mb-4">
              Fuel Your Day: Skyr Recipes
            </h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto opacity-90">
              Discover how to incorporate our protein-packed, creamy skyr into your daily meals.
            </p>
          </div>
        </section>

        <div className="container mx-auto px-4 md:px-6">
          {/* Filters */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                  activeCategory === cat 
                    ? 'bg-forest text-cream shadow-md' 
                    : 'bg-linen text-slate hover:bg-terracotta/20 hover:text-forest'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Recipes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRecipes.map((recipe, idx) => (
              <div key={idx} className="bg-white rounded-3xl overflow-hidden shadow-soft border border-sand group cursor-pointer transition-transform duration-300 hover:-translate-y-2">
                <div className="relative aspect-[4/3] bg-linen overflow-hidden">
                  {recipe.image ? (
                    <Image 
                      src={recipe.image} 
                      alt={recipe.title} 
                      fill 
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      unoptimized
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-terracotta/20 to-honey/20">
                      <span className="text-forest/40 font-display text-2xl">{recipe.category}</span>
                    </div>
                  )}
                  <div className="absolute top-4 left-4">
                    <span className="bg-cream/90 backdrop-blur-sm text-forest text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      {recipe.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-display text-forest mb-2 group-hover:text-terracotta transition-colors">
                    {recipe.title}
                  </h3>
                  <p className="text-slate text-sm mb-6 line-clamp-2">
                    {recipe.description}
                  </p>
                  
                  <div className="flex items-center gap-4 pt-4 border-t border-sand">
                    <div className="flex items-center text-slate text-sm">
                      <Clock size={16} className="mr-1.5 text-terracotta" />
                      {recipe.prepTime}
                    </div>
                    <div className="flex items-center text-slate text-sm">
                      <Dumbbell size={16} className="mr-1.5 text-terracotta" />
                      {recipe.protein} Protein
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {filteredRecipes.length === 0 && (
            <div className="text-center py-20 text-slate">
              <p className="text-xl">No recipes found for this category yet.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
