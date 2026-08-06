"use client";

import { Leaf, Heart, Truck, CreditCard, Gift } from 'lucide-react';
import FadeUp from '@/components/motion/FadeUp';

export default function ValuePillars() {
  const pillars = [
    { icon: Leaf, title: '100% Təbii Qida', description: 'Heç bir qatqı maddəsi istifadə olunmayan təbii kənd məhsulları' },
    { icon: Heart, title: 'Qadın Əməyi', description: 'Kəndli qadınlarımızın el sənəti və iqtisadi müstəqilliyi' },
    { icon: Truck, title: 'Azərpoçt Çatdırılma', description: 'Bütün Azərbaycan rayonlarına etibarlı poçt vasitəsilə çatdırılma' },
    { icon: CreditCard, title: 'Saytda Onlayn Ödəniş', description: 'Sayt üzərindən təhlükəsiz bank kartı (Visa/Mastercard) ödənişi' },
    { icon: Gift, title: 'Hədiyyə Setləri', description: '5 məhsul bir yerdə xüsusi dizaynlı qutuda təqdim olunur' },
  ];

  return (
    <section className="py-16 bg-linen/30 border-y border-sand">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-forest">Niyə By Aurum Girls?</h2>
          <p className="text-slate text-sm mt-2">Milli dəyərlərimiz və sənətkar qadınlarımızın zəhməti ilə yaradılan platforma</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <FadeUp key={idx} delay={0.1 * idx}>
                <div className="bg-cream p-6 rounded-2xl border border-sand shadow-soft text-center h-full flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-forest/10 text-forest flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-display font-semibold text-forest text-base mb-2">{item.title}</h3>
                  <p className="text-slate text-xs leading-relaxed">{item.description}</p>
                </div>
              </FadeUp>
            );
          })}
        </div>
      </div>
    </section>
  );
}
