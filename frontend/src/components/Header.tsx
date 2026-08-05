"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Heart, Menu, Search, ShoppingBag, User, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Shop", href: "/shop" },
  { label: "Makers", href: "/makers" },
  { label: "Gifts", href: "/gifts" },
  { label: "Our Story", href: "/about" },
  { label: "Journal", href: "/journal" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Announcement bar */}
      <div className="bg-grove text-sage text-center text-xs sm:text-[13px] font-medium tracking-wide py-2 px-4">
        Free shipping across Azerbaijan on orders over ₼60 · Every purchase pays a maker directly
      </div>

      <div className="sticky top-0 z-40 bg-linen/90 backdrop-blur-md border-b border-black/10">
        <div className="mx-auto max-w-[1160px] px-5 sm:px-7">
          <div className="flex h-[64px] items-center gap-4">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 shrink-0" aria-label="By Aurum Girls — Home">
              <Image
                src="/images/logo-color.png"
                alt="By Aurum Girls"
                width={38}
                height={38}
                className="h-9 w-9"
                priority
              />
              <span className="hidden sm:block font-serif text-lg leading-none">
                By Aurum Girls
              </span>
            </Link>

            {/* Primary nav */}
            <nav className="hidden lg:flex items-center gap-7 ml-4 text-[14px] font-medium">
              {NAV_LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="text-stone hover:text-ink transition-colors"
                >
                  {l.label}
                </Link>
              ))}
            </nav>

            {/* Utilities */}
            <div className="ml-auto flex items-center gap-1.5 sm:gap-2.5">
              <button
                aria-label="Search"
                className="hidden sm:inline-flex h-9 w-9 items-center justify-center rounded-pill hover:bg-sand transition-colors text-ink"
              >
                <Search size={18} strokeWidth={1.8} />
              </button>

              <div className="hidden md:flex items-center text-xs font-semibold text-stone tracking-wide px-2">
                <span className="hover:text-ink cursor-pointer">AZ</span>
                <span className="mx-1 opacity-40">/</span>
                <span className="text-ink cursor-pointer">EN</span>
                <span className="mx-2 opacity-30">|</span>
                <span className="text-ink cursor-pointer">₼</span>
              </div>

              <button
                aria-label="Wishlist"
                className="hidden sm:inline-flex h-9 w-9 items-center justify-center rounded-pill hover:bg-sand transition-colors text-ink"
              >
                <Heart size={18} strokeWidth={1.8} />
              </button>

              <button
                aria-label="Account"
                className="hidden sm:inline-flex h-9 w-9 items-center justify-center rounded-pill hover:bg-sand transition-colors text-ink"
              >
                <User size={18} strokeWidth={1.8} />
              </button>

              <Link
                href="/cart"
                aria-label="View cart, 5 items"
                className="relative inline-flex h-9 w-9 items-center justify-center rounded-pill hover:bg-sand transition-colors text-ink"
              >
                <ShoppingBag size={18} strokeWidth={1.8} />
                <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-pill bg-nar text-white text-[9.5px] font-bold flex items-center justify-center">
                  5
                </span>
              </Link>

              <Link
                href="/sell"
                className="hidden md:inline-flex items-center rounded-pill bg-nar text-white text-[13px] font-semibold px-4 py-2 shadow-sm hover:bg-nar-deep transition-colors ml-1"
              >
                Sell with us
              </Link>

              <button
                aria-label="Open menu"
                className="lg:hidden inline-flex h-9 w-9 items-center justify-center rounded-pill hover:bg-sand transition-colors text-ink"
                onClick={() => setOpen(true)}
              >
                <Menu size={20} strokeWidth={1.8} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            aria-label="Close menu"
            className="absolute inset-0 bg-ink/40"
            onClick={() => setOpen(false)}
          />
          <div className="absolute right-0 top-0 h-full w-[82%] max-w-[340px] bg-cream shadow-md p-6 flex flex-col">
            <div className="flex items-center justify-between mb-8">
              <Image src="/images/logo-color.png" alt="By Aurum Girls" width={34} height={34} />
              <button aria-label="Close menu" onClick={() => setOpen(false)} className="p-1">
                <X size={22} />
              </button>
            </div>
            <nav className="flex flex-col gap-1">
              {NAV_LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="py-3 border-b border-black/10 text-[16px] font-medium text-ink"
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </Link>
              ))}
            </nav>
            <Link
              href="/sell"
              className="mt-6 inline-flex justify-center items-center rounded-pill bg-nar text-white text-sm font-semibold px-5 py-3"
            >
              Sell with us
            </Link>
            <div className="mt-auto flex items-center gap-4 pt-6 text-sm text-stone">
              <span>AZ / EN</span>
              <span>·</span>
              <span>Currency ₼</span>
            </div>
          </div>
        </div>
      )}

      {/* Mobile bottom tab bar */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-cream border-t border-black/10 flex items-stretch justify-around h-[58px]">
        {[
          { label: "Home", icon: null, href: "/" },
          { label: "Shop", icon: null, href: "/shop" },
          { label: "Search", icon: Search, href: "/search" },
          { label: "Wishlist", icon: Heart, href: "/account/wishlist" },
          { label: "Account", icon: User, href: "/account" },
        ].map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="flex flex-col items-center justify-center gap-0.5 flex-1 text-[10.5px] font-medium text-stone"
          >
            {item.icon ? <item.icon size={18} strokeWidth={1.8} /> : <span className="h-[18px]" />}
            {item.label}
          </Link>
        ))}
      </nav>
    </>
  );
}
