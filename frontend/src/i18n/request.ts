import { getRequestConfig } from 'next-intl/server';
import { routing, type Locale } from './routing';

const namespaces = [
  'common',
  'home',
  'about',
  'shop',
  'product',
  'cart',
  'checkout',
  'contact',
  'telimler',
  'ekolojiDusarge',
] as const;

function isSupportedLocale(value: string | undefined): value is Locale {
  return !!value && (routing.locales as readonly string[]).includes(value);
}

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale: Locale = isSupportedLocale(requested) ? requested : routing.defaultLocale;

  const loaded = await Promise.all(
    namespaces.map(async (ns) => {
      const mod = await import(`../../messages/${locale}/${ns}.json`);
      return [ns, mod.default] as const;
    })
  );

  return {
    locale,
    messages: Object.fromEntries(loaded),
  };
});
