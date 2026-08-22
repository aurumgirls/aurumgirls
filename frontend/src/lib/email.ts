import emailjs from '@emailjs/browser';

const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

type OrderConfirmationInput = {
  toEmail: string;
  toName: string;
  orderId: string;
  totalPrice: number;
  items: { name: string; quantity: number; price: number }[];
};

// Sends the post-checkout confirmation email directly from the browser via EmailJS —
// no backend involved. Requires an EmailJS account with the service/template above
// configured to accept: to_email, to_name, order_id, total_price, order_items.
// Silently no-ops (order placement must never fail because of this) until those
// env vars are set, since there's no EmailJS account wired up yet.
export function sendOrderConfirmationEmail(input: OrderConfirmationInput): void {
  if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) return;

  const orderItems = input.items.map((item) => `${item.name} x${item.quantity} — ${item.price.toFixed(2)} ₼`).join('\n');

  emailjs
    .send(
      SERVICE_ID,
      TEMPLATE_ID,
      {
        to_email: input.toEmail,
        to_name: input.toName,
        order_id: input.orderId,
        total_price: input.totalPrice.toFixed(2),
        order_items: orderItems,
      },
      { publicKey: PUBLIC_KEY }
    )
    .catch((err) => {
      console.error('Order confirmation email failed to send:', err);
    });
}
