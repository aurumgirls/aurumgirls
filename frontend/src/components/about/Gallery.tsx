"use client";

import { useTranslations } from 'next-intl';

export default function Gallery() {
  const t = useTranslations('about');

  const items = [
    { titleKey: 'gallery.item1', color: 'bg-[#C5E1A5]' },
    { titleKey: 'gallery.item2', color: 'bg-[#FFE082]' },
    { titleKey: 'gallery.item3', color: 'bg-[#F7C5C2]' },
    { titleKey: 'gallery.item4', color: 'bg-[#A5D6A7]' },
    { titleKey: 'gallery.item5', color: 'bg-[#F7F3E9]' },
    { titleKey: 'gallery.item6', color: 'bg-[#F9C7A1]' },
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
              className={`aspect-square rounded-2xl ${item.color} shadow-soft flex items-center justify-center p-6 transition-transform hover:scale-[1.02] duration-300`}
            >
              <h3 className="text-xl md:text-2xl font-display text-forest/80 text-center">
                {t(item.titleKey)}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
