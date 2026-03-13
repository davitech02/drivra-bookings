from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import db, User, Property, Booking
from sqlalchemy import func
from datetime import datetime, timedelta

admin_bp = Blueprint('admin', __name__)

def admin_required():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if not user or user.role != 'admin':
        return False
    return True

@admin_bp.route('/stats', methods=['GET'])
@jwt_required()
def get_admin_stats():
    """Get admin dashboard statistics"""
    if not admin_required():
        return jsonify({'error': 'Admin access required'}), 403
    
    try:
        # Total properties
        total_properties = Property.query.count()
        
        # Total bookings
        total_bookings = Booking.query.count()
        
        # Total registered users
        total_users = User.query.count()
        
        # Total revenue (sum of confirmed and completed bookings)
        revenue_result = db.session.query(func.sum(Booking.total_price)).filter(
            Booking.status.in_(['confirmed', 'completed'])
        ).scalar()
        total_revenue = float(revenue_result) if revenue_result else 0.0
        
        # Bookings by status
        pending_bookings = Booking.query.filter_by(status='pending').count()
        confirmed_bookings = Booking.query.filter_by(status='confirmed').count()
        completed_bookings = Booking.query.filter_by(status='completed').count()
        cancelled_bookings = Booking.query.filter_by(status='cancelled').count()
        
        return jsonify({
            'total_properties': total_properties,
            'total_bookings': total_bookings,
            'total_users': total_users,
            'total_revenue': total_revenue,
            'bookings_by_status': {
                'pending': pending_bookings,
                'confirmed': confirmed_bookings,
                'completed': completed_bookings,
                'cancelled': cancelled_bookings
            }
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@admin_bp.route('/users', methods=['GET'])
@jwt_required()
def get_all_users():
    """Get all registered users with booking counts"""
    if not admin_required():
        return jsonify({'error': 'Admin access required'}), 403
    
    try:
        # Query users with booking counts
        users = db.session.query(
            User,
            func.count(Booking.id).label('booking_count')
        ).outerjoin(Booking, User.id == Booking.user_id)\
         .group_by(User.id)\
         .order_by(User.created_at.desc())\
         .all()
        
        users_data = []
        for user, booking_count in users:
            user_dict = user.to_dict()
            user_dict['booking_count'] = booking_count
            users_data.append(user_dict)
        
        return jsonify(users_data), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@admin_bp.route('/users/<user_id>', methods=['DELETE'])
@jwt_required()
def delete_user(user_id):
    """Admin deletes a user"""
    if not admin_required():
        return jsonify({'error': 'Admin access required'}), 403
    
    try:
        user = User.query.get(user_id)
        if not user:
            return jsonify({'error': 'User not found'}), 404
        
        # Prevent deleting admin users
        if user.role == 'admin':
            return jsonify({'error': 'Cannot delete admin users'}), 403
        
        # Delete user's bookings first
        Booking.query.filter_by(user_id=user_id).delete()
        
        # Delete user
        db.session.delete(user)
        db.session.commit()
        
        return jsonify({'message': 'User deleted successfully'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500