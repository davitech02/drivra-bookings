import os
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from datetime import datetime

# ── Twilio (SMS) ──────────────────────────────────────────────
try:
    from twilio.rest import Client as TwilioClient
    TWILIO_AVAILABLE = True
except ImportError:
    TWILIO_AVAILABLE = False

TWILIO_ACCOUNT_SID = os.getenv('TWILIO_ACCOUNT_SID')
TWILIO_AUTH_TOKEN  = os.getenv('TWILIO_AUTH_TOKEN')
TWILIO_FROM_NUMBER = os.getenv('TWILIO_FROM_NUMBER')   # e.g. +12345678900

# ── SMTP (Email) ──────────────────────────────────────────────
SMTP_HOST     = os.getenv('SMTP_HOST', 'smtp.gmail.com')
SMTP_PORT     = int(os.getenv('SMTP_PORT', 587))
SMTP_USER     = os.getenv('SMTP_USER')
SMTP_PASSWORD = os.getenv('SMTP_PASSWORD')
SMTP_FROM     = os.getenv('SMTP_FROM', SMTP_USER)
APP_NAME      = os.getenv('APP_NAME', 'Drivra')


# ─────────────────────────────────────────────────────────────
#  EMAIL
# ─────────────────────────────────────────────────────────────

def _build_email_html(booking: dict) -> str:
    """Return a styled HTML email body for booking confirmation."""
    check_in  = booking.get('check_in',  'N/A')
    check_out = booking.get('check_out', 'N/A')
    guests    = booking.get('guests',    'N/A')
    price     = booking.get('total_price', 0)
    ref       = booking.get('booking_ref', 'N/A')
    prop_name = booking.get('property_name', 'N/A')
    prop_loc  = booking.get('property_location', 'N/A')
    guest_name = booking.get('guest_name', 'Guest')

    return f"""
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Booking Confirmation – {APP_NAME}</title>
</head>
<body style="margin:0;padding:0;background:#f7f7f7;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f7f7f7;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0"
               style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

          <!-- Header -->
          <tr>
            <td style="background:#FF385C;padding:36px 40px;text-align:center;">
              <h1 style="margin:0;color:#ffffff;font-size:28px;font-weight:700;letter-spacing:-0.5px;">
                {APP_NAME}
              </h1>
              <p style="margin:8px 0 0;color:rgba(255,255,255,0.85);font-size:15px;">
                Booking Confirmed ✓
              </p>
            </td>
          </tr>

          <!-- Greeting -->
          <tr>
            <td style="padding:36px 40px 0;">
              <h2 style="margin:0 0 8px;color:#222222;font-size:22px;font-weight:600;">
                Hi {guest_name}, your booking is confirmed!
              </h2>
              <p style="margin:0;color:#717171;font-size:15px;line-height:1.6;">
                Thank you for choosing {APP_NAME}. Here are your booking details below.
                Please save this email for your records.
              </p>
            </td>
          </tr>

          <!-- Booking Reference Banner -->
          <tr>
            <td style="padding:24px 40px 0;">
              <div style="background:#fff5f6;border:2px dashed #FF385C;border-radius:12px;
                          padding:20px;text-align:center;">
                <p style="margin:0 0 4px;color:#717171;font-size:13px;text-transform:uppercase;
                           letter-spacing:1px;">Booking Reference</p>
                <p style="margin:0;color:#FF385C;font-size:28px;font-weight:700;
                           letter-spacing:3px;">{ref}</p>
              </div>
            </td>
          </tr>

          <!-- Details Grid -->
          <tr>
            <td style="padding:28px 40px 0;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding-bottom:20px;vertical-align:top;width:50%;">
                    <p style="margin:0 0 4px;color:#717171;font-size:12px;text-transform:uppercase;
                               letter-spacing:0.8px;">Property</p>
                    <p style="margin:0;color:#222222;font-size:15px;font-weight:600;">{prop_name}</p>
                    <p style="margin:4px 0 0;color:#717171;font-size:13px;">📍 {prop_loc}</p>
                  </td>
                  <td style="padding-bottom:20px;vertical-align:top;width:50%;">
                    <p style="margin:0 0 4px;color:#717171;font-size:12px;text-transform:uppercase;
                               letter-spacing:0.8px;">Guests</p>
                    <p style="margin:0;color:#222222;font-size:15px;font-weight:600;">{guests} guest(s)</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding-bottom:20px;vertical-align:top;">
                    <p style="margin:0 0 4px;color:#717171;font-size:12px;text-transform:uppercase;
                               letter-spacing:0.8px;">Check-in</p>
                    <p style="margin:0;color:#222222;font-size:15px;font-weight:600;">{check_in}</p>
                    <p style="margin:4px 0 0;color:#717171;font-size:13px;">From 3:00 PM</p>
                  </td>
                  <td style="padding-bottom:20px;vertical-align:top;">
                    <p style="margin:0 0 4px;color:#717171;font-size:12px;text-transform:uppercase;
                               letter-spacing:0.8px;">Check-out</p>
                    <p style="margin:0;color:#222222;font-size:15px;font-weight:600;">{check_out}</p>
                    <p style="margin:4px 0 0;color:#717171;font-size:13px;">By 11:00 AM</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding:0 40px;">
              <hr style="border:none;border-top:1px solid #eeeeee;margin:0;" />
            </td>
          </tr>

          <!-- Total -->
          <tr>
            <td style="padding:20px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="color:#222222;font-size:16px;font-weight:600;">Total Amount Paid</td>
                  <td align="right" style="color:#FF385C;font-size:22px;font-weight:700;">
                    ${price:,.2f} USD
                  </td>
                </tr>
                <tr>
                  <td colspan="2" style="padding-top:6px;">
                    <span style="display:inline-block;background:#ecfdf5;color:#059669;
                                 font-size:13px;font-weight:600;padding:4px 12px;border-radius:20px;">
                      ✓ Payment Successful
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f7f7f7;padding:28px 40px;text-align:center;
                       border-top:1px solid #eeeeee;">
              <p style="margin:0 0 8px;color:#717171;font-size:13px;">
                Need help? Contact our support team.
              </p>
              <p style="margin:0;color:#aaaaaa;font-size:12px;">
                © {datetime.utcnow().year} {APP_NAME}. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
"""


def send_booking_confirmation_email(to_email: str, booking: dict) -> dict:
    """
    Send a booking confirmation email via SMTP.
    Returns {'success': True} or {'success': False, 'error': '...'}.
    """
    if not SMTP_USER or not SMTP_PASSWORD:
        return {'success': False, 'error': 'SMTP credentials not configured'}

    try:
        msg = MIMEMultipart('alternative')
        msg['Subject'] = f"Booking Confirmed – {booking.get('booking_ref', '')} | {APP_NAME}"
        msg['From']    = f"{APP_NAME} <{SMTP_FROM}>"
        msg['To']      = to_email

        # Plain-text fallback
        plain = (
            f"Hi {booking.get('guest_name', 'Guest')},\n\n"
            f"Your booking is confirmed!\n\n"
            f"Reference : {booking.get('booking_ref', 'N/A')}\n"
            f"Property  : {booking.get('property_name', 'N/A')}\n"
            f"Location  : {booking.get('property_location', 'N/A')}\n"
            f"Check-in  : {booking.get('check_in', 'N/A')}\n"
            f"Check-out : {booking.get('check_out', 'N/A')}\n"
            f"Guests    : {booking.get('guests', 'N/A')}\n"
            f"Total Paid: ${booking.get('total_price', 0):,.2f} USD\n\n"
            f"Thank you for choosing {APP_NAME}!\n"
        )

        msg.attach(MIMEText(plain, 'plain'))
        msg.attach(MIMEText(_build_email_html(booking), 'html'))

        with smtplib.SMTP(SMTP_HOST, SMTP_PORT) as server:
            server.ehlo()
            server.starttls()
            server.login(SMTP_USER, SMTP_PASSWORD)
            server.sendmail(SMTP_FROM, to_email, msg.as_string())

        print(f"[Notifications] Email sent to {to_email}")
        return {'success': True}

    except Exception as e:
        print(f"[Notifications] Email error: {e}")
        return {'success': False, 'error': str(e)}


# ─────────────────────────────────────────────────────────────
#  SMS
# ─────────────────────────────────────────────────────────────

def send_booking_confirmation_sms(to_phone: str, booking: dict) -> dict:
    """
    Send a booking confirmation SMS via Twilio.
    Returns {'success': True} or {'success': False, 'error': '...'}.
    """
    if not TWILIO_AVAILABLE:
        return {'success': False, 'error': 'Twilio library not installed'}

    if not TWILIO_ACCOUNT_SID or not TWILIO_AUTH_TOKEN or not TWILIO_FROM_NUMBER:
        return {'success': False, 'error': 'Twilio credentials not configured'}

    # Normalise phone: ensure it starts with +
    phone = to_phone.strip()
    if not phone.startswith('+'):
        phone = '+' + phone

    body = (
        f"[{APP_NAME}] Booking Confirmed!\n"
        f"Ref: {booking.get('booking_ref', 'N/A')}\n"
        f"Property: {booking.get('property_name', 'N/A')}\n"
        f"Check-in: {booking.get('check_in', 'N/A')}\n"
        f"Check-out: {booking.get('check_out', 'N/A')}\n"
        f"Total: ${booking.get('total_price', 0):,.2f} USD\n"
        f"Thank you for booking with us!"
    )

    try:
        client = TwilioClient(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)
        message = client.messages.create(
            body=body,
            from_=TWILIO_FROM_NUMBER,
            to=phone
        )
        print(f"[Notifications] SMS sent to {phone} – SID: {message.sid}")
        return {'success': True, 'sid': message.sid}

    except Exception as e:
        print(f"[Notifications] SMS error: {e}")
        return {'success': False, 'error': str(e)}


# ─────────────────────────────────────────────────────────────
#  COMBINED HELPER
# ─────────────────────────────────────────────────────────────

def send_booking_notifications(booking_obj) -> dict:
    """
    Accepts a Booking model instance (or dict with the same keys).
    Sends both email and SMS and returns a combined result dict.
    """
    # Build a flat dict that both senders understand
    if hasattr(booking_obj, 'guest_email'):
        # SQLAlchemy model instance
        prop = booking_obj.property
        booking = {
            'booking_ref':       booking_obj.booking_ref,
            'guest_name':        booking_obj.guest_name,
            'guest_email':       booking_obj.guest_email,
            'guest_phone':       booking_obj.guest_phone,
            'check_in':          booking_obj.check_in,
            'check_out':         booking_obj.check_out,
            'guests':            booking_obj.guests,
            'total_price':       booking_obj.total_price,
            'property_name':     prop.name     if prop else 'N/A',
            'property_location': prop.location if prop else 'N/A',
        }
    else:
        booking = booking_obj  # already a dict

    email_result = send_booking_confirmation_email(booking['guest_email'], booking)
    sms_result   = send_booking_confirmation_sms(booking['guest_phone'],  booking)

    return {
        'email': email_result,
        'sms':   sms_result,
    }
