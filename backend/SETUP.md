# Drivra Backend - Setup & Configuration Guide

## What I've Fixed

✅ **Fixed Route Bug**: Corrected the admin user delete route URL parameter in `routes/admin.py`  
✅ **Verified Notifications**: Confirmed `notifications.py` is fully implemented with email and SMS support  
✅ **Verified Payments**: Confirmed `routes/payments.py` has complete Flutterwave integration  
✅ **Backend .env Created**: Generated `.env` file with Supabase configuration template

## ✅ First User as Admin - Already Implemented!

The authentication system is already set up correctly. When you register the first user, they will automatically become an admin:

```python
# From routes/auth.py - automatic first user admin logic:
user_count = User.query.count()
role = 'admin' if user_count == 0 else 'user'
```

## Essential Setup Steps

### 1. Get Your Supabase Database Connection String

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Select your project (sfnlibxdxqfikbhmjcvw)
3. Navigate to **Settings > Database**
4. Copy the **Connection String (URI)** - it looks like:

```
postgresql://postgres:[PASSWORD]@sfnlibxdxqfikbhmjcvw.supabase.co:5432/postgres
```

### 2. Update Backend .env File

Edit `backend/.env` and replace:

```env
DATABASE_URL=postgresql://postgres:[YOUR_DB_PASSWORD]@sfnlibxdxqfikbhmjcvw.supabase.co:5432/postgres
JWT_SECRET_KEY=change-this-to-a-random-secret-key-in-production
APP_NAME=Drivra
FRONTEND_URL=http://localhost:5173
```

### 3. (Optional) Configure Email Notifications with Gmail

To enable booking confirmation emails:

1. Enable 2-factor authentication in your Google Account
2. Generate an [App Password](https://myaccount.google.com/apppasswords)
3. Update `.env`:

```env
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
SMTP_FROM=your-email@gmail.com
```

### 4. (Optional) Configure SMS Notifications with Twilio

To enable SMS booking confirmations:

1. Sign up at [Twilio](https://www.twilio.com)
2. Get your Account SID and Auth Token
3. Update `.env`:

```env
TWILIO_ACCOUNT_SID=your-account-sid
TWILIO_AUTH_TOKEN=your-auth-token
TWILIO_FROM_NUMBER=+1234567890  # Your Twilio number
```

### 5. (Optional) Configure Flutterwave Payment Gateway

To enable online payments:

1. Sign up at [Flutterwave](https://flutterwave.com)
2. Get your Public and Secret Keys
3. Update `.env`:

```env
FLUTTERWAVE_PUBLIC_KEY=your-public-key
FLUTTERWAVE_SECRET_KEY=your-secret-key
```

## Starting the Backend

```bash
# Navigate to backend directory
cd backend

# Install Python dependencies (if not done)
pip install -r requirements.txt

# Run the Flask server
python app.py
```

Backend will run on: **http://localhost:5000**

## API Endpoints Summary

### Authentication

- `POST /api/auth/register` - Register new user (first user becomes **admin**)
- `POST /api/auth/login` - Login with credentials

### Properties (Admin Only)

- `GET /api/properties` - Get all active properties (public)
- `GET /api/properties/<id>` - Get single property
- `POST /api/properties` - Create property
- `PUT /api/properties/<id>` - Update property
- `DELETE /api/properties/<id>` - Delete property
- `PATCH /api/properties/<id>/status` - Toggle active/inactive

### Bookings

- `POST /api/bookings` - Create booking (admin only)
- `GET /api/bookings` - Get all bookings (admin only)
- `GET /api/bookings/user` - Get user's own bookings
- `PATCH /api/bookings/<id>/status` - Update booking status (admin only)
- `DELETE /api/bookings/<id>` - Delete booking (admin only)

### Payments

- `POST /api/payments/initiate` - Start Flutterwave payment
- `POST /api/payments/verify` - Verify payment transaction
- `POST /api/payments/generate-link` - Generate shareable payment link
- `GET /api/payments/callback` - Payment callback handler

### Admin Dashboard

- `GET /api/admin/stats` - Get dashboard statistics (admin only)
- `GET /api/admin/users` - Get all users with booking counts (admin only)
- `DELETE /api/admin/users/<id>` - Delete user (admin only)

### Analytics

- `POST /api/analytics/visit` - Track page visit (called automatically by frontend)
- `GET /api/analytics/visitors` - Get visitor stats (admin only)

## Database Schema

All tables are automatically created on first run:

- **users** - User accounts with roles (admin/user)
- **properties** - Vacation rental properties
- **bookings** - Property bookings with guest info
- **page_visits** - Website visitor analytics

## Testing the Backend

curl the endpoints:

```bash
# Check if backend is running
curl http://localhost:5000/api/health

# Register first user (becomes admin automatically)
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Admin User",
    "email": "admin@example.com",
    "password": "secure-password"
  }'

# Get properties
curl http://localhost:5000/api/properties
```

## Troubleshooting

**Issue**: Database connection error

- **Solution**: Verify DATABASE_URL is correct and Supabase is accessible

**Issue**: First user not becoming admin

- **Solution**: Check that no users exist yet OR verify the User.query.count() logic

**Issue**: Email/SMS not sending

- **Solution**: Verify SMTP_USER/SMTP_PASSWORD and TWILIO credentials are correct

**Issue**: Payments not working

- **Solution**: Verify Flutterwave API keys are correct and network requests work

---

**Status**: ✅ Backend is ready for production use once you add your credentials!
