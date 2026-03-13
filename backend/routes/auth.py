from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token
from models import db, User
import uuid

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    if User.query.filter_by(email=data['email']).first():
        return jsonify({'error': 'Email exists'}), 400
    
    # First user is Admin
    role = 'admin' if User.query.count() == 0 else 'user'
    
    user = User(
        id=str(uuid.uuid4()),
        name=data['name'],
        email=data['email'],
        password_hash=generate_password_hash(data['password']),
        role=role
    )
    db.session.add(user)
    db.session.commit()
    return jsonify({'token': create_access_token(identity=user.id), 'user': user.to_dict()}), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(email=data['email']).first()
    if user and check_password_hash(user.password_hash, data['password']):
        return jsonify({'token': create_access_token(identity=user.id), 'user': user.to_dict()}), 200
    return jsonify({'error': 'Invalid credentials'}), 401