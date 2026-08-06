import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { InstagramIcon, FacebookIcon, TikTokIcon, PinterestIcon } from './SocialIcons';

export default function Footer() {
  return (
    <footer className="bg-forest text-cream">
      {/* Main Footer Links */}
      <div className="container mx-auto px-4 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Brand Column */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Image
              src="/images/logo-color-custom.png"
              alt="By Aurum Girls Logo"
              width={72}
              height={72}
              unoptimized
              className="w-18 h-18 object-contain"
            />
            <span className="font-display text-2xl lg:text-3xl font-bold tracking-tight text-cream">BY AURUM GIRLS</span>
          </div>
          <p className="text-cream/80 text-sm leading-relaxed">
            Kəndli qadınlarımızın əl əməyi ilə hazırlanan 100% təbii dağ balı, ev mürəbbələri və dağ çayları. Azərpoçt ilə bütün Azərbaycana çatdırılma.
          </p>
          <div className="flex space-x-4 pt-2">
            <a href="#" className="hover:text-terracotta transition-colors"><InstagramIcon className="w-5 h-5" /></a>
            <a href="#" className="hover:text-terracotta transition-colors"><FacebookIcon className="w-5 h-5" /></a>
            <a href="#" className="hover:text-terracotta transition-colors"><TikTokIcon className="w-5 h-5" /></a>
            <a href="#" className="hover:text-terracotta transition-colors"><PinterestIcon className="w-5 h-5" /></a>
          </div>
        </div>

        {/* Shop Column */}
        <div>
          <h3 className="font-display text-lg font-semibold mb-4 text-cream">Məhsullarımız</h3>
          <ul className="space-y-2.5 text-sm text-cream/80">
            <li><Link href="/product/dali-bal" className="hover:text-cream transition-colors">Təbii Dağ Balı (500q)</Link></li>
            <li><Link href="/product/murebbe" className="hover:text-cream transition-colors">Ev Mürəbbəsi (450q)</Link></li>
            <li><Link href="/product/keklikotu" className="hover:text-cream transition-colors">Kəklikotu (100q)</Link></li>
            <li><Link href="/product/sari-cicek" className="hover:text-cream transition-colors">Sarı Çiçək / Baf Çayı (80q)</Link></li>
            <li><Link href="/product/dag-cayi" className="hover:text-cream transition-colors">Dağ Çayı Blend (120q)</Link></li>
          </ul>
        </div>

        {/* Discover Column */}
        <div>
          <h3 className="font-display text-lg font-semibold mb-4 text-cream">Bizim İcma</h3>
          <ul className="space-y-2.5 text-sm text-cream/80">
            <li><Link href="/#icma" className="hover:text-cream transition-colors">İcma Haqqında</Link></li>
            <li><Link href="/about" className="hover:text-cream transition-colors">Qadınlarımızın Hekayəsi</Link></li>
            <li><Link href="/recipes" className="hover:text-cream transition-colors">Çay & Bal Reseptləri</Link></li>
            <li><Link href="/contact" className="hover:text-cream transition-colors">Sosial Təsirimiz</Link></li>
          </ul>
        </div>

        {/* Support Column */}
        <div>
          <h3 className="font-display text-lg font-semibold mb-4 text-cream">Çatdırılma & Dəstək</h3>
          <ul className="space-y-2.5 text-sm text-cream/80">
            <li><Link href="/contact" className="hover:text-cream transition-colors">Əlaqə</Link></li>
            <li><Link href="/contact" className="hover:text-cream transition-colors">Azərpoçt Çatdırılma Haqqında</Link></li>
            <li><Link href="/contact" className="hover:text-cream transition-colors">Saytda Onlayn Ödəniş</Link></li>
            <li><Link href="/contact" className="hover:text-cream transition-colors">Tez-tez Verilən Suallar</Link></li>
          </ul>
        </div>
      </div>

      {/* Bottom Payment & Copyright Bar */}
      <div className="border-t border-forest-light py-8">
        <div className="container mx-auto px-4 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-cream/70">
          <p>© {new Date().getFullYear()} By Aurum Girls. Bütün hüquqlar qorunur.</p>
          <div className="flex items-center gap-3">
            <span className="bg-forest-light px-3 py-1 rounded text-cream font-medium">📦 Azərpoçt Çatdırılma</span>
            <span className="bg-forest-light px-3 py-1 rounded text-cream font-medium">💳 Visa / Mastercard</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
