"use client";

import { Heart, Compass } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { StaggerGroup, StaggerItem } from '@/components/motion/Stagger';

export default function MissionVision() {
  const t = useTranslations('about');

  return (
    <section className="py-16 bg-linen">
      <div className="container mx-auto px-4 md:px-6">
        <StaggerGroup className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">

          <StaggerItem className="bg-cream p-10 rounded-3xl shadow-soft border border-sand flex flex-col items-center text-center space-y-6 transition-[transform,box-shadow] duration-300 ease-organic hover:-translate-y-2 hover:shadow-card-hover">
            <div className="w-16 h-16 bg-terracotta/20 rounded-full flex items-center justify-center text-terracotta">
              <Heart size={32} />
            </div>
            <h3 className="text-2xl font-display text-forest">{t('missionVision.missionTitle')}</h3>
            <p className="text-slate text-lg">
              {t('missionVision.missionText')}
            </p>
          </StaggerItem>

          <StaggerItem className="bg-cream p-10 rounded-3xl shadow-soft border border-sand flex flex-col items-center text-center space-y-6 transition-[transform,box-shadow] duration-300 ease-organic hover:-translate-y-2 hover:shadow-card-hover">
            <div className="w-16 h-16 bg-honey/20 rounded-full flex items-center justify-center text-honey">
              <Compass size={32} />
            </div>
            <h3 className="text-2xl font-display text-forest">{t('missionVision.visionTitle')}</h3>
            <p className="text-slate text-lg">
              {t('missionVision.visionText')}
            </p>
          </StaggerItem>

        </StaggerGroup>
      </div>
    </section>
  );
}
