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
        print(f"[EMAIL ERROR] Failed to send order confirmation: {e}")