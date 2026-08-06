"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Gift, ArrowRight } from 'lucide-react';
import FadeUp from '@/components/motion/FadeUp';
import { useCartStore } from '@/store/cart-store';
import { shopProducts } from '@/lib/shop-data';

export function GiftSetBanner() {
  const { addItem } = useCartStore();
  const giftSet = shopProducts.find((p) => p.slug === 'hadiyya-seti') || shopProducts[0];

  return (
    <section className="py-20 bg-forest text-cream relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column: Text & Features */}
          <FadeUp delay={0.1}>
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-honey/20 text-honey text-xs font-semibold">
                <Gift className="w-4 h-4 text-honey" />
                <span>Xüsusi Təklif · 5 Məhsul Bir Qutuda</span>
              </div>

              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-cream leading-tight">
                Xüsusi Hədiyyə Seti (5-i 1-ində)
              </h2>

              <p className="text-cream/90 text-base md:text-lg leading-relaxed">
                Təbii dağ balı, ev mürəbbəsi, kəklikotu, sarı çiçək baf çayı və dağ çayı — bütün 5 təbii kənd məhsulumuz xüsusi hazırlanmış əl işi kraft qutusunda!
              </p>

              {/* Set contents list */}
              <div className="space-y-2 pt-2">
                <div className="flex items-center gap-3 text-sm text-cream/90">
                  <span className="w-5 h-5 rounded-full bg-honey/30 text-honey flex items-center justify-center font-bold text-xs">1</span>
                  <span><strong>Təbii Dağ Balı (500q)</strong> — Xalis süzmə bal</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-cream/90">
                  <span className="w-5 h-5 rounded-full bg-honey/30 text-honey flex items-center justify-center font-bold text-xs">2</span>
                  <span><strong>Ev Mürəbbəsi (450q)</strong> — Meşə giləmeyvələri mürəbbəsi</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-cream/90">
                  <span className="w-5 h-5 rounded-full bg-honey/30 text-honey flex items-center justify-center font-bold text-xs">3</span>
                  <span><strong>Kəklikotu (100q)</strong> — Əllə toplanmış dağ kəklikotusu</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-cream/90">
                  <span className="w-5 h-5 rounded-full bg-honey/30 text-honey flex items-center justify-center font-bold text-xs">4</span>
                  <span><strong>Sarı Çiçək / Baf Çayı (80q)</strong> — Sakitləşdirici bitki çayı</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-cream/90">
                  <span className="w-5 h-5 rounded-full bg-honey/30 text-honey flex items-center justify-center font-bold text-xs">5</span>
                  <span><strong>Dağ Çayı Blend (120q)</strong> — Təbii dağ çayı qarışığı</span>
                </div>
              </div>

              {/* Price & Action */}
              <div className="pt-4 flex items-center gap-6">
                <div>
                  <span className="text-xs text-cream/70 block">Xüsusi Set Qiyməti</span>
                  <div className="flex items-baseline gap-3">
                    <span className="font-display text-4xl font-bold text-honey">42 ₼</span>
                    <span className="text-sm text-cream/50 line-through">48 ₼</span>
                  </div>
                </div>

                <button
                  onClick={() => addItem(giftSet)}
                  className="btn-secondary font-semibold"
                >
                  Səbətə Əlavə Et <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </FadeUp>

          {/* Right Column: Real Box Photo */}
          <FadeUp delay={0.2}>
            <div className="relative aspect-square max-w-md mx-auto rounded-3xl overflow-hidden border-4 border-cream/20 shadow-soft-lg group">
              <Image
                src="/images/aurum-gift-set-real.jpg"
                alt="By Aurum Girls Hədiyyə Seti"
                fill
                unoptimized
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 right-4 bg-terracotta text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
                6 ₼ Qənaət Et!
              </div>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
export default GiftSetBanner;
