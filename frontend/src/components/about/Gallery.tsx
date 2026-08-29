"use client";

import Image from 'next/image';
import { useTranslations } from 'next-intl';

export default function Gallery() {
  const t = useTranslations('about');

  const items = [
    { titleKey: 'gallery.item1', image: '/images/gallery-mountain-pastures.jpg', color: 'bg-[#C5E1A5]' },
    { titleKey: 'gallery.item2', image: '/images/gallery-straining-honey.jpg', color: 'bg-[#FFE082]' },
    { titleKey: 'gallery.item3', image: null, color: 'bg-[#F7C5C2]' },
    { titleKey: 'gallery.item4', image: '/images/gallery-hand-harvesting.jpg', color: 'bg-[#A5D6A7]' },
    { titleKey: 'gallery.item5', image: '/images/gallery-packaging.jpg', color: 'bg-[#F7F3E9]' },
    { titleKey: 'gallery.item6', image: '/images/gallery-community-gatherings.jpg', color: 'bg-[#F9C7A1]' },
  ];

  return (
    <section className="py-20 bg-linen">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-display text-forest mb-4">{t('gallery.title')}</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {items.map((item, idx) => (
            <div
              key={idx}
              className={`relative aspect-square rounded-2xl overflow-hidden shadow-soft transition-transform hover:scale-[1.02] duration-300 ${item.image ? '' : item.color}`}
            >
              {item.image ? (
                <>
                  <Image
                    src={item.image}
                    alt={t(item.titleKey)}
                    fill
                    unoptimized
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest/70 via-forest/0 to-transparent" />
                  <h3 className="absolute bottom-4 left-4 right-4 text-lg md:text-xl font-display text-cream text-center">
                    {t(item.titleKey)}
                  </h3>
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center p-6">
                  <h3 className="text-xl md:text-2xl font-display text-forest/80 text-center">
                    {t(item.titleKey)}
                  </h3>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
