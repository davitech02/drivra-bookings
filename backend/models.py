from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import secrets

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.String(36), primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    phone = db.Column(db.String(20))
    password_hash = db.Column(db.String(255), nullable=False)
    role = db.Column(db.String(20), default='user') # 'admin' or 'user'
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    bookings = db.relationship('Booking', backref='user', lazy=True, cascade='all, delete-orphan')

    def to_dict(self):
        return {'id': self.id, 'name': self.name, 'email': self.email, 'phone': self.phone, 'role': self.role}

class Property(db.Model):
    __tablename__ = 'properties'
    id = db.Column(db.String(36), primary_key=True)
    name = db.Column(db.String(200), nullable=False)
    location = db.Column(db.String(200), nullable=False)
    price = db.Column(db.Float, nullable=False)
    rating = db.Column(db.Float, default=0.0)
    images = db.Column(db.JSON, nullable=False) # List of URLs
    type = db.Column(db.String(50), nullable=False)
    guests = db.Column(db.Integer, nullable=False)
    bedrooms = db.Column(db.Integer, nullable=False)
    bathrooms = db.Column(db.Integer, nullable=False)
    description = db.Column(db.Text)
    amenities = db.Column(db.JSON)
    status = db.Column(db.String(20), default='active')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}

class Booking(db.Model):
    __tablename__ = 'bookings'
    id = db.Column(db.String(36), primary_key=True)
    user_id = db.Column(db.String(36), db.ForeignKey('users.id'), nullable=False)
    property_id = db.Column(db.String(36), db.ForeignKey('properties.id'), nullable=False)
    guest_name = db.Column(db.String(100), nullable=False)
    guest_email = db.Column(db.String(120), nullable=False)
    guest_phone = db.Column(db.String(20), nullable=False)
    check_in = db.Column(db.String(20), nullable=False)
    check_out = db.Column(db.String(20), nullable=False)
    guests = db.Column(db.Integer, nullable=False)
    total_price = db.Column(db.Float, nullable=False)
    status = db.Column(db.String(20), default='pending') # pending, confirmed, cancelled
    booking_ref = db.Column(db.String(20), unique=True, nullable=False)
    payment_link_token = db.Column(db.String(100))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    @staticmethod
    def generate_booking_ref():
        return f"BK{secrets.token_hex(4).upper()}"

    def to_dict(self):
        return {
            'id': self.id, 'bookingRef': self.booking_ref, 'status': self.status,
            'totalPrice': self.total_price, 'checkIn': self.check_in, 'checkOut': self.check_out,
            'propertyTitle': self.property.name if self.property else "Deleted Property"
        }