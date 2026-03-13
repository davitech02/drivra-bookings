from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import db
from datetime import datetime, timedelta
from sqlalchemy import text

analytics_bp = Blueprint('analytics', __name__)

def admin_required():
    user_id = get_jwt_identity()
    from models import User
    user = User.query.get(user_id)
    if not user or user.role != 'admin':
        return False
    return True

@analytics_bp.route('/visit', methods=['POST'])
def track_visit():
    """Track page visit (called on frontend app load)"""
    try:
        # Get visitor info
        ip_address = request.headers.get('X-Forwarded-For', request.remote_addr)
        user_agent = request.headers.get('User-Agent', '')
        page_url = request.json.get('page_url', '/')
        
        # Insert visit record
        query = text("""
            INSERT INTO page_visits (ip_address, user_agent, page_url, visited_at)
            VALUES (:ip, :ua, :url, :visited_at)
        """)
        
        db.session.execute(query, {
            'ip': ip_address,
            'ua': user_agent,
            'url': page_url,
            'visited_at': datetime.utcnow()
        })
        db.session.commit()
        
        return jsonify({'message': 'Visit tracked'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@analytics_bp.route('/visitors', methods=['GET'])
@jwt_required()
def get_visitors_data():
    """Get visitor count data for admin dashboard chart"""
    if not admin_required():
        return jsonify({'error': 'Admin access required'}), 403
    
    try:
        # Get period parameter (default: 7 days)
        period = request.args.get('period', '7')
        days = int(period)
        
        # Calculate date range
        end_date = datetime.utcnow().date()
        start_date = end_date - timedelta(days=days-1)
        
        # Query visitor counts per day
        query = text("""
            SELECT 
                DATE(visited_at) as visit_date,
                COUNT(DISTINCT ip_address) as unique_visitors,
                COUNT(*) as total_visits
            FROM page_visits
            WHERE DATE(visited_at) BETWEEN :start_date AND :end_date
            GROUP BY DATE(visited_at)
            ORDER BY visit_date ASC
        """)
        
        result = db.session.execute(query, {
            'start_date': start_date,
            'end_date': end_date
        })
        
        # Format data for chart
        visitors_data = []
        for row in result:
            visitors_data.append({
                'date': row.visit_date.strftime('%Y-%m-%d'),
                'unique_visitors': row.unique_visitors,
                'total_visits': row.total_visits
            })
        
        # Fill missing dates with zero counts
        all_dates = []
        current_date = start_date
        while current_date <= end_date:
            date_str = current_date.strftime('%Y-%m-%d')
            existing = next((item for item in visitors_data if item['date'] == date_str), None)
            if existing:
                all_dates.append(existing)
            else:
                all_dates.append({
                    'date': date_str,
                    'unique_visitors': 0,
                    'total_visits': 0
                })
            current_date += timedelta(days=1)
        
        return jsonify(all_dates), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500