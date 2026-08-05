// Mock FAQ content for the MVP. Grounded in the same facts used across the
// Checkout, Cart, and Seller Dashboard pages (shipping threshold, coupons, etc).

export type FaqCategory = {
  slug: string;
  name: string;
};

export const faqCategories: FaqCategory[] = [
  { slug: "orders-shipping", name: "Orders & Shipping" },
  { slug: "payments-pricing", name: "Payments & Pricing" },
  { slug: "returns-exchanges", name: "Returns & Exchanges" },
  { slug: "selling", name: "Selling on By Aurum Girls" },
  { slug: "account-trust", name: "Account & Trust" },
];

export type FaqItem = {
  id: string;
  category: string; // FaqCategory slug
  question: string;
  answer: string;
};

export const faqItems: FaqItem[] = [
  {
    id: "shipping-time",
    category: "orders-shipping",
    question: "How long does shipping take?",
    answer:
      "Most orders ship from the maker's village within 2–4 business days, then arrive within 5–10 days domestically or 10–18 days internationally, depending on destination.",
  },
  {
    id: "free-shipping",
    category: "orders-shipping",
    question: "Do you offer free shipping?",
    answer:
      "Yes — orders over ₼60 ship free across Azerbaijan. Orders under that get a flat ₼6 shipping rate, shown at checkout before you pay.",
  },
  {
    id: "multi-seller-order",
    category: "orders-shipping",
    question: "Can I order from more than one maker at once?",
    answer:
      "Yes. Your cart can hold items from multiple sellers — each maker ships her own items separately, so a single order may arrive in more than one package.",
  },
  {
    id: "track-order",
    category: "orders-shipping",
    question: "How do I track my order?",
    answer:
      "Once a maker marks your order as shipped, tracking details appear under Orders in your account dashboard, along with the current status of each item.",
  },
  {
    id: "how-payment-works",
    category: "payments-pricing",
    question: "How do I know my payment goes directly to the maker?",
    answer:
      "Every seller on By Aurum Girls sets her own prices and receives the majority of each sale directly. We only take a small platform fee to cover payments and shipping support.",
  },
  {
    id: "coupons",
    category: "payments-pricing",
    question: "Can I use a discount code?",
    answer:
      "Yes, coupon codes can be applied in your shopping cart before checkout. We regularly run codes for first-time buyers and seasonal collections.",
  },
  {
    id: "payment-methods",
    category: "payments-pricing",
    question: "What payment methods are accepted?",
    answer:
      "We accept major debit and credit cards, along with local Azerbaijani payment methods at checkout. All payments are processed securely.",
  },
  {
    id: "price-changes",
    category: "payments-pricing",
    question: "Why do prices vary between makers for similar items?",
    answer:
      "Each maker sets her own price based on materials, time, and skill involved. Handmade goods aren't mass-produced, so pricing reflects the individual maker's work.",
  },
  {
    id: "returns-policy",
    category: "returns-exchanges",
    question: "Can I return or exchange an item?",
    answer:
      "Yes — most items can be returned within 14 days of delivery. Since everything is handmade, small variations in color or pattern aren't considered defects.",
  },
  {
    id: "damaged-item",
    category: "returns-exchanges",
    question: "What if my order arrives damaged?",
    answer:
      "Contact us within 48 hours of delivery with a photo of the item and packaging. We'll arrange a replacement or refund directly with the maker.",
  },
  {
    id: "refund-time",
    category: "returns-exchanges",
    question: "How long do refunds take to process?",
    answer:
      "Once a return is received and approved, refunds are issued to your original payment method within 5–7 business days.",
  },
  {
    id: "become-seller",
    category: "selling",
    question: "I'm a woman artisan in Azerbaijan — how do I start selling?",
    answer:
      'Click "Sell with us" in the header or "Become a Seller" on our About page to start your application. Our team reviews every shop before it goes live.',
  },
  {
    id: "seller-fees",
    category: "selling",
    question: "What fees do sellers pay?",
    answer:
      "We take a small platform fee per sale to cover payment processing and platform upkeep. Sellers keep the large majority of every sale and set their own prices.",
  },
  {
    id: "seller-payout",
    category: "selling",
    question: "When do sellers get paid?",
    answer:
      "Payouts are released to a seller's linked bank account on a rolling basis once an order is marked fulfilled, visible from her Seller Dashboard.",
  },
  {
    id: "account-security",
    category: "account-trust",
    question: "Is my personal information kept private?",
    answer:
      "Yes. We only share the information necessary to fulfill your order — your name and shipping address go to the maker fulfilling it, nothing more.",
  },
  {
    id: "verify-makers",
    category: "account-trust",
    question: "How are makers verified before joining?",
    answer:
      "Every maker's shop is reviewed by our team before it goes live, and we periodically check in on shops to make sure listings and photos stay accurate.",
  },
  {
    id: "delete-account",
    category: "account-trust",
    question: "Can I delete my account?",
    answer:
      "Yes, you can request account deletion from Account Settings at any time. Order history required for tax or legal purposes may be retained as required by law.",
  },
];
