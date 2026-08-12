import { ShieldCheck } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export function CheckoutHeader() {
  const t = useTranslations('checkout');

  return (
    <header className="border-b border-sand bg-white py-6 px-6 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link href="/" className="font-display text-2xl text-forest font-medium">
          By Aurum Girls
        </Link>
        <div className="flex items-center gap-2 text-slate text-sm font-medium">
          <ShieldCheck className="w-5 h-5 text-forest-light" />
          {t('secureCheckout')}
        </div>
      </div>
    </header>
  );
}
