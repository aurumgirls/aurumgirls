"use client";

import { MapPin, Mail, Phone, Clock } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { InstagramIcon } from '@/components/SocialIcons';

export default function ContactInfoCard() {
  const t = useTranslations('contact');

  return (
    <div className="bg-white p-8 rounded-3xl shadow-soft border border-sand">
      <h3 className="text-2xl font-display text-forest mb-8">{t('info.title')}</h3>

      <div className="space-y-6">
        <div className="flex items-start gap-4 text-slate">
          <div className="mt-1 text-terracotta shrink-0">
            <MapPin size={24} />
          </div>
          <div>
            <p className="font-medium text-forest">{t('info.locationLabel')}</p>
            <p>{t('info.locationValue1')}</p>
            <p>{t('info.locationValue2')}</p>
          </div>
        </div>

        <div className="flex items-start gap-4 text-slate">
          <div className="mt-1 text-terracotta shrink-0">
            <Mail size={24} />
          </div>
          <div>
            <p className="font-medium text-forest">{t('info.emailLabel')}</p>
            <a href={`mailto:${t('info.email')}`} className="hover:text-terracotta transition-colors">
              {t('info.email')}
            </a>
          </div>
        </div>

        <div className="flex items-start gap-4 text-slate">
          <div className="mt-1 text-terracotta shrink-0">
            <Phone size={24} />
          </div>
          <div>
            <p className="font-medium text-forest">{t('info.phoneLabel')}</p>
            <a href={`tel:${t('info.phone').replace(/\s/g, '')}`} className="hover:text-terracotta transition-colors">
              {t('info.phone')}
            </a>
          </div>
        </div>

        <div className="flex items-start gap-4 text-slate">
          <div className="mt-1 text-terracotta shrink-0">
            <Clock size={24} />
          </div>
          <div>
            <p className="font-medium text-forest">{t('info.hoursLabel')}</p>
            <p>{t('info.hoursValue')}</p>
          </div>
        </div>
      </div>

      <div className="mt-10 pt-8 border-t border-sand">
        <p className="font-medium text-forest mb-4">{t('info.followLabel')}</p>
        <div className="flex gap-4">
          <a href="https://instagram.com/aurum_girls" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-linen flex items-center justify-center text-forest hover:bg-terracotta hover:text-cream transition-colors">
            <InstagramIcon className="w-5 h-5" />
          </a>
        </div>
      </div>
    </div>
  );
}
