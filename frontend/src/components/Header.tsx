"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, ShoppingBag, Search, User } from 'lucide-react';
import { useCartStore } from '@/store/cart-store';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { items } = useCartStore();
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 transition-all duration-300">
      {/* Announcement Bar */}
      <div className="bg-forest text-cream text-xs py-2 px-4 text-center font-medium tracking-wide">
        <span>🌿 Kəndli Qadınlarımızın Təbii Məhsulları — Azərpoçt İlə Qapınıza Çatdırılma!</span>
      </div>

      {/* Main Navigation */}
      <nav
        className={`transition-all duration-300 border-b border-sand ${
          isScrolled ? 'bg-cream/95 backdrop-blur-md shadow-soft py-3' : 'bg-cream py-4'
        }`}
      >
        <div className="container mx-auto px-4 lg:px-8 flex items-center justify-between">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-forest hover:text-terracotta focus:outline-none"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Left Nav Links (Desktop) */}
          <div className="hidden lg:flex items-center space-x-8 text-sm font-medium text-forest">
            <Link href="/#icma" className="hover:text-terracotta transition-colors">
              İcma Haqqında
            </Link>
            <Link href="/shop" className="hover:text-terracotta transition-colors">
              Market / Məhsullar
            </Link>
            <Link href="/about" className="hover:text-terracotta transition-colors">
              Bizim Hekayə
            </Link>
            <Link href="/contact" className="hover:text-terracotta transition-colors">
              Əlaqə
            </Link>
          </div>

          {/* Center Brand Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <Image
              src="/images/logo-color-custom.png"
              alt="By Aurum Girls Logo"
              width={40}
              height={40}
              unoptimized
              className="w-10 h-10 object-contain group-hover:scale-105 transition-transform"
            />
            <span className="font-display text-xl lg:text-2xl font-bold text-forest tracking-tight">
              BY AURUM GIRLS
            </span>
          </Link>

          {/* Right Action Icons */}
          <div className="flex items-center space-x-4">
            <Link
              href="/cart"
              className="p-2 text-forest hover:text-terracotta transition-colors relative"
              aria-label="Səbət"
            >
              <ShoppingBag size={22} />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-terracotta text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-cream">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-cream border-t border-sand px-4 pt-4 pb-6 space-y-4 shadow-soft-lg animate-in slide-in-from-top">
            <Link
              href="/#icma"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-forest hover:text-terracotta font-medium text-base py-1"
            >
              İcma Haqqında
            </Link>
            <Link
              href="/shop"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-forest hover:text-terracotta font-medium text-base py-1"
            >
              Market / Məhsullar
            </Link>
            <Link
              href="/about"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-forest hover:text-terracotta font-medium text-base py-1"
            >
              Bizim Hekayə
            </Link>
            <Link
              href="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-forest hover:text-terracotta font-medium text-base py-1"
            >
              Əlaqə & Poçt Çatdırılması
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
