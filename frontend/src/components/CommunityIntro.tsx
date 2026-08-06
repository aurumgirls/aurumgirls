"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Heart, Sparkles, ArrowRight } from 'lucide-react';
import FadeUp from '@/components/motion/FadeUp';

export function CommunityIntro() {
  return (
    <section id="icma" className="py-20 lg:py-28 bg-linen/50 border-y border-sand scroll-mt-20">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column: Image Collage */}
          <FadeUp delay={0.1}>
            <div className="relative">
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-soft-lg border-4 border-cream">
                <Image
                  src="/images/founders-portrait.jpg"
                  alt="By Aurum Girls İcması"
                  fill
                  unoptimized
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-forest text-cream p-6 rounded-3xl shadow-soft max-w-xs hidden sm:block">
                <div className="flex items-center gap-3 mb-2">
                  <Heart className="w-6 h-6 text-terracotta fill-terracotta" />
                  <h4 className="font-display font-semibold text-lg text-cream">İcma Hərəkatı</h4>
                </div>
                <p className="text-xs text-cream/80 leading-relaxed">
                  Hər bir məhsul kəndli qadınlarımızın iqtisadi müstəqilliyinə və ailə rifahına birbaşa töhfə verir.
                </p>
              </div>
            </div>
          </FadeUp>

          {/* Right Column: Community Story & Transition to Market */}
          <FadeUp delay={0.2}>
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-forest/10 text-forest text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-honey" />
                <span>Biz Kimik? · İcma Haqqında</span>
              </div>

              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-forest leading-tight">
                Qadın İcmasının Sevgi və Əl Əməyi İlə Hazırladığı Təbii Qidalar
              </h2>

              <p className="text-slate text-base md:text-lg leading-relaxed">
                <strong>By Aurum Girls</strong> — yüksək dağ kəndlərində yaşayan sənətkar qadınlarımızı bir araya gətirən sosial-iqtisadi icma layihəsidir. Biz əcdadlarımızdan miras qalan ənənəvi reseptləri və 100% təbii toplanma üsullarını qoruyaraq süfrənizə çatdırırıq.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4">
                <div className="p-4 rounded-2xl bg-cream border border-sand">
                  <h4 className="font-display text-forest font-semibold mb-1">🌿 100% Təbii Toplanma</h4>
                  <p className="text-xs text-slate">Dağ yaylalarından kimyəvi qatqısız əllə toplanan bitkilər və dağ balı.</p>
                </div>
                <div className="p-4 rounded-2xl bg-cream border border-sand">
                  <h4 className="font-display text-forest font-semibold mb-1">👩‍🌾 Qadın Məşğulluğu</h4>
                  <p className="text-xs text-slate">Kəndli qadınlarımızın öz zəhməti ilə qazanc əldə etməsi və dəstəklənməsi.</p>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-4 items-center">
                <Link href="/shop" className="btn-primary w-full sm:w-auto">
                  Marketə Keç və Məhsulları İncələ <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/about" className="text-forest hover:text-terracotta text-sm font-semibold underline underline-offset-4">
                  Ətraflı Hekayəmizi Oxu →
                </Link>
              </div>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
export default CommunityIntro;
