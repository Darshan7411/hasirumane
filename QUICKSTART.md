# HASIRUMANE - Quick Start Guide

## First Time Setup

### 1. Install Dependencies

```bash
# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

### 2. Setup Environment Variables

Create `server/.env` file:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/hasirumane
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
NODE_ENV=development
CLIENT_URL=http://localhost:3000
```

### 3. Start MongoDB

Make sure MongoDB is running on your system:
```bash
# Windows (if installed as service)
# MongoDB should auto-start

# Or start manually
mongod
```

### 4. Create Admin User

Start the backend server first:
```bash
cd server
npm run dev
```

Then create admin user using PowerShell:
```powershell
$headers = @{
    "Content-Type" = "application/json"
}

$body = @{
    username = "admin"
    email = "admin@hasirumane.com"
    password = "admin123"
} | ConvertTo-Json

Invoke-WebRequest -Uri "http://localhost:5000/api/auth/create-admin" -Method POST -Headers $headers -Body $body
```

### 5. Start Development Servers

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd client
npm run dev
```

### 6. Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Admin Panel**: http://localhost:3000/admin/login

**Admin Credentials:**
- Email: admin@hasirumane.com
- Password: admin123

## Common Tasks

### Add Sample Room
1. Login to admin panel
2. Go to "Rooms" section
3. Click "Add Room"
4. Fill in details and upload image
5. Click "Add Room"

### Add Gallery Images
1. Login to admin panel
2. Go to "Gallery" section
3. Click "Upload Images"
4. Select one or multiple images
5. Choose category
6. Click "Upload"

### View Bookings
1. Login to admin panel
2. Go to "Bookings" section
3. Filter by status (pending, confirmed, etc.)
4. Update booking status or delete

## Troubleshooting

### MongoDB Connection Error
- Make sure MongoDB is running
- Check the MONGODB_URI in .env file

### Port Already in Use
```bash
# Change port in server/.env
PORT=5001

# Change port in client/vite.config.js
server: {
  port: 3001
}
```

### Images Not Showing
- Make sure the uploads folder exists
- Check file permissions
- Verify the image path in the database

## Next Steps

1. Replace placeholder images with actual resort photos
2. Update contact information (phone, email, address)
3. Update Google Maps embed URL
4. Customize colors in tailwind.config.js
5. Add actual content for rooms and amenities
6. Set up production environment

## Production Deployment

### Backend
1. Set NODE_ENV=production in .env
2. Use MongoDB Atlas for database
3. Deploy to Heroku/Railway/DigitalOcean
4. Set up SSL certificate

### Frontend
1. Build the frontend: `npm run build`
2. Serve the build folder with nginx/apache
3. Or deploy to Vercel/Netlify

For detailed documentation, see README.md
