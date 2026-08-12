import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export function CheckoutFooter() {
  const t = useTranslations('checkout');

  return (
    <footer className="border-t border-sand bg-white py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate">
        <p>© {new Date().getFullYear()} By Aurum Girls. {t('footer.rights')}</p>
        <div className="flex gap-6">
          <Link href="/terms" className="hover:text-terracotta transition-colors">{t('footer.terms')}</Link>
          <Link href="/privacy" className="hover:text-terracotta transition-colors">{t('footer.privacy')}</Link>
          <Link href="/contact" className="hover:text-terracotta transition-colors">{t('footer.contact')}</Link>
        </div>
      </div>
    </footer>
  );
}
