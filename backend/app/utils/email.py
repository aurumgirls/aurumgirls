import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

SMTP_HOST = os.getenv("SMTP_HOST", "smtp.gmail.com")
SMTP_PORT = int(os.getenv("SMTP_PORT", 587))
SMTP_USER = os.getenv("SMTP_USER")
SMTP_PASSWORD = os.getenv("SMTP_PASSWORD")
EMAIL_FROM = os.getenv("EMAIL_FROM", SMTP_USER)


def send_order_confirmation_email(to_email: str, order):
    """
    Sends a plain-text order confirmation to the customer after an order is
    created. Called from routers/orders.py right after the order is committed
    to the database. Failures are logged, not raised — a broken email
    shouldn't fail the whole order-creation request.
    """
    items_lines = "\n".join(
        f"- {item.product_name} x{item.quantity} — {item.price} AZN"
        for item in order.items
    )

    body = f"""Salam, {order.customer_name}!

Sifarişiniz qəbul edildi (№{order.id}).

Sifariş tərkibi:
{items_lines}

Ümumi məbləğ: {order.total_price} AZN
Çatdırılma ünvanı: {order.customer_address}, {order.city}

Sifarişinizin statusunu izləmək üçün:
https://final-project-holberton-x1le.vercel.app/orders/{order.id}

Təşəkkür edirik!
By Aurum Girls
"""

    msg = MIMEMultipart()
    msg["From"] = EMAIL_FROM
    msg["To"] = to_email
    msg["Subject"] = f"Sifarişiniz qəbul edildi — №{order.id}"
    msg.attach(MIMEText(body, "plain", "utf-8"))

    try:
        with smtplib.SMTP(SMTP_HOST, SMTP_PORT) as server:
            server.starttls()
            server.login(SMTP_USER, SMTP_PASSWORD)
            server.send_message(msg)
    except Exception as e:
        # Intentionally swallowed: a failed email shouldn't roll back or
        # error out an otherwise-successful order.
        print(f"[EMAIL ERROR] Failed to send order confirmation: {e}")
