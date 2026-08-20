export const CURRENCY = '₼';
export const FALLBACK_SWATCH = '#F5EBE6';
export const ORDER_STATUSES = ['pending', 'paid', 'processing', 'shipped', 'completed', 'cancelled'] as const;

// Card payment integration isn't wired up to a processor yet — keep only Apple/Google Pay
// selectable at checkout. Flip back to true once card processing is ready.
export const CARD_PAYMENTS_ENABLED = false;

// The site is a portfolio/business-card site with a small embedded shop, not a full storefront.
// With only a handful of products, the dedicated /shop catalog page is deactivated in favor of
// showing everything in the homepage's featured section. Flip back to true to restore it.
export const SHOP_PAGE_ENABLED = false;
