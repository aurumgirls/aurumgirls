"use client";

import Image from 'next/image';
import { ArrowRight, Heart, ShieldCheck, Truck } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import FadeUp from '@/components/motion/FadeUp';

export default function Hero() {
  const t = useTranslations('home');

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center bg-cream overflow-hidden py-20 lg:py-32">
      {/* Background Image / Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-banner.jpg"
          alt={t('communityIntro.imageAlt')}
          fill
          priority
          unoptimized
          className="object-cover object-center opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-cream/90 via-cream/80 to-cream" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center max-w-4xl">
        <FadeUp delay={0.1}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-forest/10 text-forest text-xs sm:text-sm font-semibold mb-6">
            <Heart className="w-4 h-4 text-terracotta fill-terracotta" />
            <span>{t('hero.badge')}</span>
          </div>
        </FadeUp>

        <FadeUp delay={0.2}>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-forest mb-6 leading-tight">
            {t('hero.title')}
          </h1>
        </FadeUp>

        <FadeUp delay={0.3}>
          <p className="text-slate text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
            {t('hero.subtitle')}
          </p>
        </FadeUp>

        <FadeUp delay={0.4}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
            <Link href="/#icma" className="btn-primary w-full sm:w-auto">
              {t('hero.ctaCommunity')} <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/#products" className="btn-outline w-full sm:w-auto">
              {t('hero.ctaShop')}
            </Link>
          </div>
        </FadeUp>

        {/* Feature Badges */}
        <FadeUp delay={0.5}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-sand/80 max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-2 text-xs font-semibold text-forest">
              <span className="w-2 h-2 rounded-full bg-terracotta" />
              <span>{t('hero.badge1')}</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-xs font-semibold text-forest">
              <span className="w-2 h-2 rounded-full bg-honey" />
              <span>{t('hero.badge2')}</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-xs font-semibold text-forest">
              <Truck className="w-4 h-4 text-forest" />
              <span>{t('hero.badge3')}</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-xs font-semibold text-forest">
              <ShieldCheck className="w-4 h-4 text-forest" />
              <span>{t('hero.badge4')}</span>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
