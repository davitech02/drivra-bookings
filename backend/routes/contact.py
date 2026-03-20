import os
import smtplib
import ssl
from flask import Blueprint, request, jsonify
from email.message import EmailMessage

contact_bp = Blueprint('contact', __name__)

SMTP_HOST = os.getenv('SMTP_HOST', 'mail.privateemail.com')
SMTP_PORT = int(os.getenv('SMTP_PORT', 587))
SMTP_USER = os.getenv('SMTP_USER', 'support@drivrabooking.com')
SMTP_PASS = os.getenv('SMTP_PASS', 'DrivraAdmin123@')
CONTACT_EMAIL = os.getenv('CONTACT_EMAIL', 'support@drivrabooking.com')

@contact_bp.route('/', methods=['POST'])
def send_contact_message():
    data = request.get_json() or {}

    first_name = (data.get('first_name') or '').strip()
    last_name = (data.get('last_name') or '').strip()
    sender_email = (data.get('email') or '').strip()
    phone = (data.get('phone') or '').strip() or 'Not provided'
    subject = (data.get('subject') or 'General Inquiry').strip()
    message_text = (data.get('message') or '').strip()

    if not sender_email or not message_text:
        return jsonify({'error': 'Email and message are required'}), 400

    full_name = f"{first_name} {last_name}".strip() or 'Guest'

    # Build message for support team
    support_msg = EmailMessage()
    support_msg['Subject'] = f"Contact form submitted: {subject}"
    support_msg['From'] = SMTP_USER
    support_msg['To'] = CONTACT_EMAIL
    support_msg['Reply-To'] = sender_email
    support_msg.set_content(
        f"New contact form submission\n\n"
        f"Name: {full_name}\n"
        f"Email: {sender_email}\n"
        f"Phone: {phone}\n"
        f"Subject: {subject}\n"
        f"Message:\n{message_text}\n"
    )

    # Build auto-reply to user
    user_msg = EmailMessage()
    user_msg['Subject'] = f"Re: {subject}"
    user_msg['From'] = SMTP_USER
    user_msg['To'] = sender_email
    user_msg.set_content(
        f"Hi {first_name or 'there'},\n\n"
        "Thanks for contacting Drivra Bookings. Your message has been received and our support team will get back to you within 24 hours.\n\n"
        "Here is the copy of your request:\n\n"
        f"{message_text}\n\n"
        "Best regards,\n"
        "Drivra Bookings Support"
    )

    try:
        if SMTP_PORT == 465:
            context = ssl.create_default_context()
            with smtplib.SMTP_SSL(SMTP_HOST, SMTP_PORT, context=context) as server:
                server.login(SMTP_USER, SMTP_PASS)
                server.send_message(support_msg)
                server.send_message(user_msg)
        else:
            with smtplib.SMTP(SMTP_HOST, SMTP_PORT) as server:
                server.starttls(context=ssl.create_default_context())
                server.login(SMTP_USER, SMTP_PASS)
                server.send_message(support_msg)
                server.send_message(user_msg)

        return jsonify({'message': 'Contact message sent successfully'}), 200

    except Exception as err:
        return jsonify({'error': f'Failed to send email: {err}'}), 500
