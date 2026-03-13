# Vacation Rental Backend - Flask + PostgreSQL

## Setup Instructions

### 1. Install PostgreSQL
Make sure PostgreSQL is installed and running on your system.

### 2. Create Database
```bash
psql -U postgres
CREATE DATABASE vacation_rental;
\q
```

### 3. Install Python Dependencies
```bash
cd backend
pip install -r requirements.txt
```

### 4. Configure Environment Variables
Create a `.env` file in the backend directory:
```
DATABASE_URL=postgresql://postgres:yourpassword@localhost/vacation_rental
JWT_SECRET_KEY=your-secret-key-change-in-production
FLUTTERWAVE_PUBLIC_KEY=your-flutterwave-public-key
FLUTTERWAVE_SECRET_KEY=your-flutterwave-secret-key
```

### 5. Run the Backend
```bash
python app.py
```

The backend will run on `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user (first user becomes admin)
- `POST /api/auth/login` - Login user

### Properties
- `GET /api/properties` - Get all active properties (public)
- `GET /api/properties/:id` - Get single property
- `POST /api/properties` - Create property (admin only)
- `PUT /api/properties/:id` - Update property (admin only)
- `DELETE /api/properties/:id` - Delete property (admin only)
- `PATCH /api/properties/:id/status` - Toggle property status (admin only)

### Bookings
- `POST /api/bookings` - Create booking (admin only)
- `GET /api/bookings` - Get all bookings (admin only)
- `GET /api/bookings/user` - Get user's own bookings (authenticated)
- `PATCH /api/bookings/:id/status` - Update booking status (admin only)
- `DELETE /api/bookings/:id` - Delete booking (admin only)

## Database Schema

### Users Table
- id (UUID, Primary Key)
- name (String)
- email (String, Unique)
- phone (String)
- password_hash (String)
- role (String: 'admin' or 'user')
- created_at (DateTime)

### Properties Table
- id (UUID, Primary Key)
- name (String)
- location (String)
- price (Float)
- rating (Float)
- images (JSON Array)
- type (String)
- guests (Integer)
- bedrooms (Integer)
- bathrooms (Integer)
- description (Text)
- amenities (JSON Array)
- status (String: 'active' or 'inactive')
- created_at (DateTime)

### Bookings Table
- id (UUID, Primary Key)
- user_id (UUID, Foreign Key)
- property_id (UUID, Foreign Key)
- guest_name (String)
- guest_email (String)
- guest_phone (String)
- check_in (String)
- check_out (String)
- guests (Integer)
- total_price (Float)
- status (String: 'pending', 'confirmed', 'completed', 'cancelled')
- booking_ref (String, Unique)
- payment_link_token (String)
- created_at (DateTime)

## First Admin Account
The first account you register will automatically become the admin account. All subsequent registrations will be regular users.