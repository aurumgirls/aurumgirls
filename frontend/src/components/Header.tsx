"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Menu, X, ShoppingBag, ChevronDown } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname, useRouter } from '@/i18n/navigation';
import { useCartStore } from '@/store/cart-store';

export default function Header() {
  const t = useTranslations('common');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isOfferingsOpen, setIsOfferingsOpen] = useState(false);
  const [isMobileOfferingsOpen, setIsMobileOfferingsOpen] = useState(false);
  const offeringsRef = useRef<HTMLDivElement>(null);

  const { items } = useCartStore();
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (offeringsRef.current && !offeringsRef.current.contains(event.target as Node)) {
        setIsOfferingsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const switchLocale = (nextLocale: 'az' | 'en') => {
    router.replace(pathname, { locale: nextLocale });
  };

  const offeringsLinks = [
    { href: '/telimler' as const, label: t('nav.trainings') },
    { href: '/ekoloji-dusarge' as const, label: t('nav.ecoCamp') },
    { href: '/shop' as const, label: t('nav.products') },
  ];

  return (
    <header className="sticky top-0 z-50 transition-all duration-300">
      {/* Announcement Bar */}
      <div className="bg-forest text-cream text-xs py-2 px-4 text-center font-medium tracking-wide">
        <span>{t('announcement')}</span>
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
            aria-label={t('toggleMenu')}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Left Nav Links (Desktop) */}
          <div className="hidden lg:flex items-center space-x-8 text-sm font-medium text-forest">
            <Link href="/" className="hover:text-terracotta transition-colors">
              {t('nav.home')}
            </Link>
            <Link href="/about" className="hover:text-terracotta transition-colors">
              {t('nav.about')}
            </Link>

            <div className="relative" ref={offeringsRef}>
              <button
                onClick={() => setIsOfferingsOpen((open) => !open)}
                className="flex items-center gap-1 hover:text-terracotta transition-colors"
                aria-expanded={isOfferingsOpen}
              >
                {t('nav.offerings')}
                <ChevronDown className={`w-4 h-4 transition-transform ${isOfferingsOpen ? 'rotate-180' : ''}`} />
              </button>

              {isOfferingsOpen && (
                <div className="absolute left-0 mt-3 w-56 bg-cream border border-sand rounded-2xl shadow-soft-lg py-2 z-20">
                  {offeringsLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOfferingsOpen(false)}
                      className="block px-5 py-2.5 text-sm text-forest hover:bg-linen hover:text-terracotta transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="/contact" className="hover:text-terracotta transition-colors">
              {t('nav.contact')}
            </Link>
          </div>

          {/* Center Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <Image
              src="/images/logo-color-custom.png"
              alt="By Aurum Girls Logo"
              width={80}
              height={80}
              unoptimized
              className="w-20 h-20 object-contain group-hover:scale-105 transition-transform"
            />
            <span className="font-display text-2xl lg:text-3xl font-bold text-forest tracking-tight">
              BY AURUM GIRLS
            </span>
          </Link>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Language Switcher */}
            <div className="hidden sm:flex items-center gap-1 text-xs font-semibold" aria-label={t('language.label')}>
              <button
                onClick={() => switchLocale('az')}
                className={`px-2 py-1 rounded-full transition-colors ${
                  locale === 'az' ? 'bg-forest text-cream' : 'text-forest hover:bg-forest/10'
                }`}
              >
                {t('language.az')}
              </button>
              <span className="text-sand">/</span>
              <button
                onClick={() => switchLocale('en')}
                className={`px-2 py-1 rounded-full transition-colors ${
                  locale === 'en' ? 'bg-forest text-cream' : 'text-forest hover:bg-forest/10'
                }`}
              >
                {t('language.en')}
              </button>
            </div>

            <Link
              href="/cart"
              className="p-2 text-forest hover:text-terracotta transition-colors relative"
              aria-label={t('cart')}
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
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-forest hover:text-terracotta font-medium text-base py-1"
            >
              {t('nav.home')}
            </Link>
            <Link
              href="/about"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-forest hover:text-terracotta font-medium text-base py-1"
            >
              {t('nav.about')}
            </Link>

            <div>
              <button
                onClick={() => setIsMobileOfferingsOpen((open) => !open)}
                className="w-full flex items-center justify-between text-forest hover:text-terracotta font-medium text-base py-1"
                aria-expanded={isMobileOfferingsOpen}
              >
                {t('nav.offerings')}
                <ChevronDown className={`w-4 h-4 transition-transform ${isMobileOfferingsOpen ? 'rotate-180' : ''}`} />
              </button>
              {isMobileOfferingsOpen && (
                <div className="pl-4 mt-2 space-y-2 border-l-2 border-sand">
                  {offeringsLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block text-forest/90 hover:text-terracotta font-medium text-sm py-1"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-forest hover:text-terracotta font-medium text-base py-1"
            >
              {t('nav.contact')}
            </Link>

            <div className="flex items-center gap-2 pt-2 border-t border-sand text-sm font-semibold">
              <span className="text-slate">{t('language.label')}:</span>
              <button
                onClick={() => switchLocale('az')}
                className={`px-3 py-1 rounded-full transition-colors ${
                  locale === 'az' ? 'bg-forest text-cream' : 'text-forest bg-linen'
                }`}
              >
                {t('language.az')}
              </button>
              <button
                onClick={() => switchLocale('en')}
                className={`px-3 py-1 rounded-full transition-colors ${
                  locale === 'en' ? 'bg-forest text-cream' : 'text-forest bg-linen'
                }`}
              >
                {t('language.en')}
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
