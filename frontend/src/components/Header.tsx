"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ShoppingBag, Search, User } from 'lucide-react';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed w-full top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-cream/90 backdrop-blur-md shadow-sm' : 'bg-transparent'}`}>
      {/* Announcement Bar */}
      <div className="bg-forest text-cream py-2 text-center text-sm font-medium overflow-hidden relative h-10 flex items-center justify-center">
        <div className="animate-slide-announcement whitespace-nowrap">
          <span>Free shipping on all orders over $50! ✨ Try our new Meadow Berry flavor today.</span>
        </div>
      </div>

      {/* Main Nav */}
      <nav className="container mx-auto px-4 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden text-forest p-2"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Left Nav (Desktop) */}
          <div className="hidden lg:flex items-center space-x-8 text-forest font-medium text-[15px]">
            <Link href="/shop" className="hover:text-terracotta transition-colors">Skyr Yogurt</Link>
            <Link href="/about" className="hover:text-terracotta transition-colors">Our Story</Link>
            <Link href="/farm" className="hover:text-terracotta transition-colors">Our Farm</Link>
            <Link href="/recipes" className="hover:text-terracotta transition-colors">Recipes</Link>
            <Link href="/find-us" className="hover:text-terracotta transition-colors">Where to Buy</Link>
          </div>

          {/* Logo */}
          <Link href="/" className="absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0">
            <span className="font-display font-semibold text-2xl lg:text-3xl text-forest tracking-tight">Painterland Sisters</span>
          </Link>

          {/* Right Nav */}
          <div className="flex items-center space-x-4 lg:space-x-6 text-forest">
            <button className="hover:text-terracotta transition-colors hidden sm:block">
              <Search className="w-5 h-5 lg:w-6 lg:h-6" />
            </button>
            <Link href="/account" className="hover:text-terracotta transition-colors hidden sm:block">
              <User className="w-5 h-5 lg:w-6 lg:h-6" />
            </Link>
            <button className="hover:text-terracotta transition-colors relative flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 lg:w-6 lg:h-6" />
              <span className="absolute -top-1 -right-2 bg-terracotta text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">0</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div className={`fixed inset-0 bg-charcoal/50 z-50 transition-opacity duration-300 lg:hidden ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className={`absolute top-0 left-0 h-full w-4/5 max-w-sm bg-cream p-6 transition-transform duration-300 transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="flex justify-between items-center mb-8">
            <span className="font-display font-semibold text-xl text-forest">Menu</span>
            <button onClick={() => setIsMobileMenuOpen(false)} className="text-forest p-2">
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <div className="flex flex-col space-y-6 text-forest font-medium text-lg">
            <Link href="/shop" onClick={() => setIsMobileMenuOpen(false)}>Skyr Yogurt</Link>
            <Link href="/about" onClick={() => setIsMobileMenuOpen(false)}>Our Story</Link>
            <Link href="/farm" onClick={() => setIsMobileMenuOpen(false)}>Our Farm</Link>
            <Link href="/recipes" onClick={() => setIsMobileMenuOpen(false)}>Recipes</Link>
            <Link href="/find-us" onClick={() => setIsMobileMenuOpen(false)}>Where to Buy</Link>
            
            <hr className="border-sand my-4" />
            
            <Link href="/account" className="flex items-center gap-3" onClick={() => setIsMobileMenuOpen(false)}>
              <User className="w-5 h-5" /> Account
            </Link>
            <button className="flex items-center gap-3 text-left">
              <Search className="w-5 h-5" /> Search
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
