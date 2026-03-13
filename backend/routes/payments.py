from flask import Blueprint, request, jsonify
import requests, os, secrets
from models import db, Booking
from notifications import send_booking_notifications

payments_bp = Blueprint('payments', __name__)

@payments_bp.route('/initiate', methods=['POST'])
def initiate():
    data = request.get_json()
    booking = Booking.query.get(data['booking_id'])
    
    payload = {
        "tx_ref": f"TX-{secrets.token_hex(4)}",
        "amount": booking.total_price,
        "currency": "USD",
        "redirect_url": "http://localhost:5173/dashboard",
        "customer": {"email": data['customer_email'], "name": data['customer_name']},
        "meta": {"booking_id": booking.id}
    }
    
    headers = {'Authorization': f"Bearer {os.getenv('FLUTTERWAVE_SECRET_KEY')}"}
    res = requests.post('https://api.flutterwave.com/v3/payments', json=payload, headers=headers)
    return jsonify(res.json())

@payments_bp.route('/verify', methods=['POST'])
def verify():
    tx_id = request.json.get('transaction_id')
    headers = {'Authorization': f"Bearer {os.getenv('FLUTTERWAVE_SECRET_KEY')}"}
    res = requests.get(f'https://api.flutterwave.com/v3/transactions/{tx_id}/verify', headers=headers)
    
    data = res.json()
    if data['status'] == 'success' and data['data']['status'] == 'successful':
        booking_id = data['data']['meta']['booking_id']
        booking = Booking.query.get(booking_id)
        booking.status = 'confirmed'
        db.session.commit()
        send_booking_notifications(booking) # Send Email/SMS
        return jsonify({'success': True})
    return jsonify({'success': False}), 400