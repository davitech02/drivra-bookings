from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import db, Property, User
import uuid

properties_bp = Blueprint('properties', __name__)

def admin_required():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if not user or user.role != 'admin':
        return False
    return True

@properties_bp.route('', methods=['GET'])
def get_properties():
    """Get all active properties (public endpoint)"""
    try:
        properties = Property.query.filter_by(status='active').all()
        return jsonify([prop.to_dict() for prop in properties]), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@properties_bp.route('/<property_id>', methods=['GET'])
def get_property(property_id):
    """Get single property by ID"""
    try:
        property = Property.query.get(property_id)
        if not property:
            return jsonify({'error': 'Property not found'}), 404
        return jsonify(property.to_dict()), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@properties_bp.route('', methods=['POST'])
@jwt_required()
def create_property():
    """Admin creates a new property"""
    if not admin_required():
        return jsonify({'error': 'Admin access required'}), 403
    
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['name', 'location', 'price', 'images', 'type', 'guests', 'bedrooms', 'bathrooms']
        for field in required_fields:
            if field not in data:
                return jsonify({'error': f'Missing required field: {field}'}), 400
        
        property = Property(
            id=str(uuid.uuid4()),
            name=data['name'],
            location=data['location'],
            price=float(data['price']),
            rating=float(data.get('rating', 0.0)),
            images=data['images'],
            type=data['type'],
            guests=int(data['guests']),
            bedrooms=int(data['bedrooms']),
            bathrooms=int(data['bathrooms']),
            description=data.get('description', ''),
            amenities=data.get('amenities', []),
            status='active'
        )
        
        db.session.add(property)
        db.session.commit()
        
        return jsonify(property.to_dict()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@properties_bp.route('/<property_id>', methods=['PUT'])
@jwt_required()
def update_property(property_id):
    """Admin updates a property"""
    if not admin_required():
        return jsonify({'error': 'Admin access required'}), 403
    
    try:
        property = Property.query.get(property_id)
        if not property:
            return jsonify({'error': 'Property not found'}), 404
        
        data = request.get_json()
        
        # Update fields
        if 'name' in data:
            property.name = data['name']
        if 'location' in data:
            property.location = data['location']
        if 'price' in data:
            property.price = float(data['price'])
        if 'rating' in data:
            property.rating = float(data['rating'])
        if 'images' in data:
            property.images = data['images']
        if 'type' in data:
            property.type = data['type']
        if 'guests' in data:
            property.guests = int(data['guests'])
        if 'bedrooms' in data:
            property.bedrooms = int(data['bedrooms'])
        if 'bathrooms' in data:
            property.bathrooms = int(data['bathrooms'])
        if 'description' in data:
            property.description = data['description']
        if 'amenities' in data:
            property.amenities = data['amenities']
        
        db.session.commit()
        
        return jsonify(property.to_dict()), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@properties_bp.route('/<property_id>', methods=['DELETE'])
@jwt_required()
def delete_property(property_id):
    """Admin deletes a property"""
    if not admin_required():
        return jsonify({'error': 'Admin access required'}), 403
    
    try:
        property = Property.query.get(property_id)
        if not property:
            return jsonify({'error': 'Property not found'}), 404
        
        db.session.delete(property)
        db.session.commit()
        
        return jsonify({'message': 'Property deleted successfully'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@properties_bp.route('/<property_id>/status', methods=['PATCH'])
@jwt_required()
def toggle_property_status(property_id):
    """Admin toggles property active/inactive status"""
    if not admin_required():
        return jsonify({'error': 'Admin access required'}), 403
    
    try:
        property = Property.query.get(property_id)
        if not property:
            return jsonify({'error': 'Property not found'}), 404
        
        data = request.get_json()
        new_status = data.get('status', 'active')
        
        if new_status not in ['active', 'inactive']:
            return jsonify({'error': 'Invalid status. Must be active or inactive'}), 400
        
        property.status = new_status
        db.session.commit()
        
        return jsonify(property.to_dict()), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500