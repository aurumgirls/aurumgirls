"use client";

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { retailers } from '@/lib/data';
import { Search, MapPin, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default function FindUsPage() {
  const [zip, setZip] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Searching for locations near ${zip}...`);
  };

  return (
    <>
      <Header />
      <main className="bg-cream min-h-screen pt-32 pb-20">
        
        {/* Search Section */}
        <section className="bg-forest py-16 mb-16 border-y-8 border-sand">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center text-cream">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display mb-6">
                Find Painterland Sisters Near You
              </h1>
              <p className="text-lg text-linen/90 mb-10">
                Enter your zip code to find our organic skyr in a store near you.
              </p>
              
              <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
                <div className="relative flex-1">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate" size={20} />
                  <input 
                    type="text" 
                    placeholder="Enter Zip Code" 
                    value={zip}
                    onChange={(e) => setZip(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 rounded-full text-charcoal focus:outline-none focus:ring-2 focus:ring-terracotta"
                    required
                  />
                </div>
                <div className="w-full sm:w-auto relative">
                  <select className="w-full px-6 py-4 rounded-full text-charcoal focus:outline-none focus:ring-2 focus:ring-terracotta appearance-none bg-white">
                    <option value="10">10 Miles</option>
                    <option value="25">25 Miles</option>
                    <option value="50">50 Miles</option>
                  </select>
                </div>
                <button type="submit" className="bg-terracotta hover:bg-terracotta-light text-cream px-8 py-4 rounded-full font-medium transition-colors flex items-center justify-center gap-2">
                  <Search size={20} />
                  Search
                </button>
              </form>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          
          <div className="mb-20">
            <h2 className="text-3xl font-display text-forest text-center mb-10">Our Retail Partners</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {retailers.map((retailer, idx) => (
                <div key={idx} className="bg-white p-6 rounded-2xl shadow-soft border border-sand flex items-center justify-center text-center h-24 hover:border-terracotta/50 transition-colors">
                  <span className="font-display text-lg text-forest">{retailer}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-linen p-8 rounded-3xl border border-sand">
              <h3 className="text-2xl font-display text-forest mb-4">Order Online</h3>
              <p className="text-slate mb-6">Can&apos;t make it to the store? Get our skyr delivered straight to your door.</p>
              <div className="flex gap-4">
                <Link href="#" className="flex items-center gap-2 bg-white text-forest px-6 py-3 rounded-full font-medium hover:bg-forest hover:text-white transition-colors border border-sand">
                  Instacart <ExternalLink size={16} />
                </Link>
                <Link href="#" className="flex items-center gap-2 bg-white text-forest px-6 py-3 rounded-full font-medium hover:bg-forest hover:text-white transition-colors border border-sand">
                  FreshDirect <ExternalLink size={16} />
                </Link>
              </div>
            </div>

            <div className="bg-terracotta/10 p-8 rounded-3xl border border-terracotta/20">
              <h3 className="text-2xl font-display text-forest mb-4">Don&apos;t see us?</h3>
              <p className="text-slate mb-6">Print our product request form and give it to the dairy manager at your favorite local store.</p>
              <Link href="#" className="inline-flex items-center bg-forest text-cream px-6 py-3 rounded-full font-medium hover:bg-forest-light transition-colors">
                Download Request Form
              </Link>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
