from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import db, Booking, Property, User
import uuid

bookings_bp = Blueprint('bookings', __name__)

def admin_required():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if not user or user.role != 'admin':
        return False
    return True

@bookings_bp.route('', methods=['POST'])
@jwt_required()
def create_booking():
    """Admin creates a booking with guest info"""
    if not admin_required():
        return jsonify({'error': 'Admin access required'}), 403
    
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['propertyId', 'guestName', 'guestEmail', 'guestPhone', 'checkIn', 'checkOut', 'guests', 'totalPrice']
        for field in required_fields:
            if field not in data:
                return jsonify({'error': f'Missing required field: {field}'}), 400
        
        # Check if property exists
        property = Property.query.get(data['propertyId'])
        if not property:
            return jsonify({'error': 'Property not found'}), 404
        
        # Get admin user ID
        admin_id = get_jwt_identity()
        
        # Generate unique booking reference
        booking_ref = Booking.generate_booking_ref()
        while Booking.query.filter_by(booking_ref=booking_ref).first():
            booking_ref = Booking.generate_booking_ref()
        
        booking = Booking(
            id=str(uuid.uuid4()),
            user_id=admin_id,
            property_id=data['propertyId'],
            guest_name=data['guestName'],
            guest_email=data['guestEmail'],
            guest_phone=data['guestPhone'],
            check_in=data['checkIn'],
            check_out=data['checkOut'],
            guests=int(data['guests']),
            total_price=float(data['totalPrice']),
            status='pending',
            booking_ref=booking_ref
        )
        
        db.session.add(booking)
        db.session.commit()
        
        return jsonify(booking.to_dict()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@bookings_bp.route('', methods=['GET'])
@jwt_required()
def get_bookings():
    """Admin fetches all bookings"""
    if not admin_required():
        return jsonify({'error': 'Admin access required'}), 403
    
    try:
        bookings = Booking.query.order_by(Booking.created_at.desc()).all()
        return jsonify([booking.to_dict() for booking in bookings]), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@bookings_bp.route('/user', methods=['GET'])
@jwt_required()
def get_user_bookings():
    """Authenticated user fetches their own bookings"""
    try:
        user_id = get_jwt_identity()
        bookings = Booking.query.filter_by(user_id=user_id).order_by(Booking.created_at.desc()).all()
        return jsonify([booking.to_dict() for booking in bookings]), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@bookings_bp.route('/<booking_id>/status', methods=['PATCH'])
@jwt_required()
def update_booking_status(booking_id):
    """Admin updates booking status"""
    if not admin_required():
        return jsonify({'error': 'Admin access required'}), 403
    
    try:
        booking = Booking.query.get(booking_id)
        if not booking:
            return jsonify({'error': 'Booking not found'}), 404
        
        data = request.get_json()
        new_status = data.get('status')
        
        if new_status not in ['pending', 'confirmed', 'completed', 'cancelled']:
            return jsonify({'error': 'Invalid status'}), 400
        
        booking.status = new_status
        db.session.commit()
        
        return jsonify(booking.to_dict()), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@bookings_bp.route('/<booking_id>', methods=['DELETE'])
@jwt_required()
def delete_booking(booking_id):
    """Admin deletes a booking"""
    if not admin_required():
        return jsonify({'error': 'Admin access required'}), 403
    
    try:
        booking = Booking.query.get(booking_id)
        if not booking:
            return jsonify({'error': 'Booking not found'}), 404
        
        db.session.delete(booking)
        db.session.commit()
        
        return jsonify({'message': 'Booking deleted successfully'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500