import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { InstagramIcon, FacebookIcon, TikTokIcon, PinterestIcon } from './SocialIcons';

export default function Footer() {
  const t = useTranslations('common');

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
            {t('footer.brandDescription')}
          </p>
          <div className="flex space-x-4 pt-2">
            <a href="#" className="hover:text-terracotta transition-colors"><InstagramIcon className="w-5 h-5" /></a>
            <a href="#" className="hover:text-terracotta transition-colors"><FacebookIcon className="w-5 h-5" /></a>
            <a href="#" className="hover:text-terracotta transition-colors"><TikTokIcon className="w-5 h-5" /></a>
            <a href="#" className="hover:text-terracotta transition-colors"><PinterestIcon className="w-5 h-5" /></a>
          </div>
        </div>

        {/* Offerings Column */}
        <div>
          <h3 className="font-display text-lg font-semibold mb-4 text-cream">{t('footer.offeringsHeading')}</h3>
          <ul className="space-y-2.5 text-sm text-cream/80">
            <li><Link href="/telimler" className="hover:text-cream transition-colors">{t('footer.trainings')}</Link></li>
            <li><Link href="/ekoloji-dusarge" className="hover:text-cream transition-colors">{t('footer.ecoCamp')}</Link></li>
            <li><Link href="/shop?category=set" className="hover:text-cream transition-colors">{t('footer.giftSet')}</Link></li>
            <li><Link href="/shop?category=individual" className="hover:text-cream transition-colors">{t('footer.individualProducts')}</Link></li>
          </ul>
        </div>

        {/* Community Column */}
        <div>
          <h3 className="font-display text-lg font-semibold mb-4 text-cream">{t('footer.communityHeading')}</h3>
          <ul className="space-y-2.5 text-sm text-cream/80">
            <li><Link href="/about" className="hover:text-cream transition-colors">{t('footer.aboutLink')}</Link></li>
          </ul>
        </div>

        {/* Support Column */}
        <div>
          <h3 className="font-display text-lg font-semibold mb-4 text-cream">{t('footer.contactHeading')}</h3>
          <ul className="space-y-2.5 text-sm text-cream/80">
            <li><Link href="/contact" className="hover:text-cream transition-colors">{t('footer.contactLink')}</Link></li>
            <li><Link href="/contact" className="hover:text-cream transition-colors">{t('footer.faq')}</Link></li>
          </ul>
        </div>
      </div>

      {/* Bottom Payment & Copyright Bar */}
      <div className="border-t border-forest-light py-8">
        <div className="container mx-auto px-4 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-cream/70">
          <p>© {new Date().getFullYear()} By Aurum Girls. {t('footer.copyright')}</p>
          <div className="flex items-center gap-3">
            <span className="bg-forest-light px-3 py-1 rounded text-cream font-medium">{t('footer.deliveryBadge')}</span>
            <span className="bg-forest-light px-3 py-1 rounded text-cream font-medium">{t('footer.paymentBadge')}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
