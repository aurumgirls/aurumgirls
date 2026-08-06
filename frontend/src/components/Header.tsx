"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, ShoppingBag, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Marketplace", href: "/marketplace" },
  { label: "Contact", href: "/contact" },
];

/**
 * Global navigation. On pages with a full-bleed hero image directly beneath
 * it, pass `transparentOnTop` so the header starts transparent with a light
 * (cream) logo + nav, then crossfades to a frosted cream bar with charcoal
 * text once the user scrolls past 50px. Pages without a dark hero (e.g.
 * Marketplace, Cart, Contact) should omit the prop and get the solid,
 * always-legible bar.
 */
export default function Header({ transparentOnTop = false }: { transparentOnTop?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const light = transparentOnTop && !scrolled;
  const textColor = light ? "text-aurum-cream" : "text-aurum-charcoal";

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          light ? "bg-transparent" : "bg-aurum-cream/90 backdrop-blur-md shadow-soft"
        }`}
      >
        <div className="mx-auto max-w-7xl h-20 lg:h-24 px-6 lg:px-12 grid grid-cols-[1fr_auto_1fr] items-center">
          {/* Left: hamburger (mobile) / logo (desktop) */}
          <div className="flex items-center">
            <button
              aria-label="Open menu"
              onClick={() => setOpen(true)}
              className={`lg:hidden inline-flex h-9 w-9 items-center justify-center -ml-2 ${textColor}`}
            >
              <Menu size={22} strokeWidth={1.5} />
            </button>
            <Link
              href="/"
              className={`hidden lg:flex items-center gap-2.5 ${textColor}`}
              aria-label="By Aurum Girls — Home"
            >
              <Image
                src={light ? "/images/logo-white.png" : "/images/logo-color.png"}
                alt="By Aurum Girls"
                width={36}
                height={36}
                className="h-9 w-9"
                priority
              />
              <span className="font-serif text-lg tracking-wide">By Aurum Girls</span>
            </Link>
          </div>

          {/* Center: logo (mobile) / nav links (desktop) */}
          <div className="flex items-center justify-center">
            <Link
              href="/"
              className={`lg:hidden flex items-center gap-2 ${textColor}`}
              aria-label="By Aurum Girls — Home"
            >
              <Image
                src={light ? "/images/logo-white.png" : "/images/logo-color.png"}
                alt="By Aurum Girls"
                width={30}
                height={30}
                className="h-7 w-7"
                priority
              />
              <span className="font-serif text-base tracking-wide">By Aurum Girls</span>
            </Link>
            <nav className={`hidden lg:flex items-center gap-8 text-sm font-medium ${textColor}`}>
              {NAV_LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="transition-colors duration-300 hover:text-aurum-clay"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Right: cart */}
          <div className="flex items-center justify-end">
            <Link
              href="/cart"
              aria-label="View cart"
              className={`relative inline-flex h-9 w-9 items-center justify-center ${textColor} transition-colors duration-300 hover:text-aurum-clay`}
            >
              <ShoppingBag size={20} strokeWidth={1.5} />
              <span className="absolute top-0 right-0 h-4 w-4 rounded-pill bg-aurum-clay text-aurum-cream text-[9px] font-bold flex items-center justify-center">
                2
              </span>
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <button
            aria-label="Close menu"
            className="absolute inset-0 bg-aurum-charcoal/40"
            onClick={() => setOpen(false)}
          />
          <div className="absolute left-0 top-0 h-full w-[82%] max-w-[320px] bg-aurum-cream shadow-soft-lg p-6 flex flex-col">
            <div className="flex items-center justify-between mb-10">
              <Image src="/images/logo-color.png" alt="By Aurum Girls" width={32} height={32} className="h-8 w-8" />
              <button aria-label="Close menu" onClick={() => setOpen(false)} className="p-1 text-aurum-charcoal">
                <X size={22} strokeWidth={1.5} />
              </button>
            </div>
            <nav className="flex flex-col gap-1">
              {NAV_LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="py-3.5 border-b border-aurum-sand text-base font-medium text-aurum-charcoal transition-colors duration-300 hover:text-aurum-clay"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
