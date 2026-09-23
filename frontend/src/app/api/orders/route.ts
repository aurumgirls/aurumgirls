import { NextResponse } from 'next/server';
import { createOrder, ApiError, type CreateOrderInput, type Order } from '@/lib/api';
import { createGmailTransport, escapeHtml, stripControlChars, GMAIL_USER } from '@/lib/mailer';

// Places the order with the backend, then emails the customer a confirmation via
// Gmail. The email is built only from the order the backend returns, so this
// route can't be used to send arbitrary mail — every email maps to a real order.
export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as CreateOrderInput | null;
  if (!body || typeof body !== 'object') {
    return NextResponse.json({ message: 'Invalid request body' }, { status: 400 });
  }

  let order: Order;
  try {
    order = await createOrder(body);
  } catch (err) {
    if (err instanceof ApiError) {
      return NextResponse.json({ message: err.message }, { status: err.status });
    }
    console.error('Order creation failed:', err);
    return NextResponse.json({ message: 'Failed to place order' }, { status: 502 });
  }

  // Order placement must never fail because of the email.
  try {
    await sendOrderConfirmation(order);
  } catch (err) {
    console.error('Order confirmation email failed to send:', err);
  }

  return NextResponse.json(order, { status: 201 });
}

async function sendOrderConfirmation(order: Order) {
  if (!order.customerEmail) return;
  const transporter = createGmailTransport();
  if (!transporter) {
    console.warn('GMAIL_APP_PASSWORD is not configured; skipping order confirmation email.');
    return;
  }

  const shortId = order.id.slice(0, 8).toUpperCase();
  const itemsText = order.items
    .map((item) => `${item.productName} x${item.quantity} — ${(item.price * item.quantity).toFixed(2)} ₼`)
    .join('\n');
  const itemsHtml = order.items
    .map(
      (item) => `
        <tr>
          <td style="padding: 8px 0;">${escapeHtml(item.productName)} × ${item.quantity}</td>
          <td style="padding: 8px 0; text-align: right;">${(item.price * item.quantity).toFixed(2)} ₼</td>
        </tr>`
    )
    .join('');

  await transporter.sendMail({
    from: { name: 'Aurum Girls', address: GMAIL_USER },
    to: { name: stripControlChars(order.customerName), address: order.customerEmail },
    replyTo: GMAIL_USER,
    subject: `Aurum Girls — Order #${shortId} confirmed`,
    text: `Hi ${order.customerName},\n\nThank you for your order #${shortId}.\n\n${itemsText}\n\nTotal: ${order.totalPrice.toFixed(2)} ₼\n\nShipping to: ${order.customerAddress}, ${order.city}\n\nAurum Girls`,
    html: `
      <div style="font-family: sans-serif; padding: 24px; color: #1f2937; max-width: 600px; border: 1px solid #e5e7eb; border-radius: 16px;">
        <h2 style="color: #2E4B3D; margin-top: 0; border-bottom: 2px solid #D96B43; padding-bottom: 12px;">Thank you for your order!</h2>
        <p>Hi ${escapeHtml(order.customerName)},</p>
        <p>We've received your order <strong>#${shortId}</strong>.</p>
        <table style="width: 100%; border-collapse: collapse; border-top: 1px solid #e5e7eb; margin: 16px 0;">
          ${itemsHtml}
          <tr style="border-top: 1px solid #e5e7eb;">
            <td style="padding: 12px 0;"><strong>Total</strong></td>
            <td style="padding: 12px 0; text-align: right;"><strong>${order.totalPrice.toFixed(2)} ₼</strong></td>
          </tr>
        </table>
        <p style="margin: 12px 0;"><strong>Shipping to:</strong> ${escapeHtml(order.customerAddress)}, ${escapeHtml(order.city)}</p>
        <p style="color: #6b7280;">Questions? Just reply to this email.</p>
      </div>
    `,
  });
}
