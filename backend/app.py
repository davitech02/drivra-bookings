from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from models import db
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

# Configuration
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', 'postgresql://postgres:Davitech2002%23%40%24%24@localhost:5432/vacation_rental')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY', 'dev-secret-key')
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = False

db.init_app(app)
jwt = JWTManager(app)
CORS(app, resources={r"/api/*": {"origins": "*"}}, supports_credentials=True)

# Register Blueprints
from routes.auth import auth_bp
from routes.properties import properties_bp
from routes.bookings import bookings_bp
from routes.payments import payments_bp
from routes.admin import admin_bp
from routes.analytics import analytics_bp

app.register_blueprint(auth_bp, url_prefix='/api/auth')
app.register_blueprint(properties_bp, url_prefix='/api/properties')
app.register_blueprint(bookings_bp, url_prefix='/api/bookings')
app.register_blueprint(payments_bp, url_prefix='/api/payments')
app.register_blueprint(admin_bp, url_prefix='/api/admin')
app.register_blueprint(analytics_bp, url_prefix='/api/analytics')

with app.app_context():
    try:
        db.create_all()
        # Create page_visits table manually for raw SQL analytics
        from sqlalchemy import text
        db.session.execute(text("""
            CREATE TABLE IF NOT EXISTS page_visits (
                id SERIAL PRIMARY KEY,
                ip_address VARCHAR(50),
                user_agent TEXT,
                page_url VARCHAR(500),
                visited_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """))
        db.session.commit()
        print("Database tables created successfully")
    except Exception as e:
        print(f"Warning: Could not create database tables: {e}")
        print("Make sure your DATABASE_URL is correct and the database is accessible")
        print("You can create tables manually later with: python -c \"from app import db; db.create_all()\"")
if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)