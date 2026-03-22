# HASIRUMANE - Resort Website

A complete full-stack resort website built with React, Node.js, Express, and MongoDB.

## 🌟 Features

### Frontend
- **Responsive Design**: Built with React and Tailwind CSS
- **Modern UI**: Smooth animations with Framer Motion
- **Pages**:
  - Home page with hero banner and resort overview
  - Rooms listing with filtering
  - Gallery with category filtering
  - Amenities showcase
  - Booking form with validation
  - Contact page with Google Maps
  - Admin panel for complete management

### Backend
- **RESTful API**: Built with Express.js
- **Database**: MongoDB with Mongoose
- **File Upload**: Image upload with Multer
- **Authentication**: JWT-based admin authentication
- **Features**:
  - Room management (CRUD)
  - Booking management
  - Gallery management
  - Amenities management
  - Admin user authentication

### Admin Panel
- Dashboard with statistics
- Room management (add/edit/delete)
- Booking management (view/update status/delete)
- Gallery management (upload/delete images)
- Amenities management (add/edit/delete)
- Protected routes with JWT authentication

## 📁 Project Structure

```
hasirumane/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   │   └── admin/     # Admin panel pages
│   │   ├── services/      # API service functions
│   │   ├── utils/         # Utility functions
│   │   ├── App.jsx        # Main app component
│   │   ├── main.jsx       # Entry point
│   │   └── index.css      # Global styles
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── server/                # Node.js backend
│   ├── config/           # Configuration files
│   ├── controllers/      # Route controllers
│   ├── middleware/       # Custom middleware
│   ├── models/           # Mongoose models
│   ├── routes/           # API routes
│   ├── server.js         # Server entry point
│   ├── package.json
│   └── .env.example
│
└── uploads/              # Uploaded images
```

## 🚀 Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (running locally or MongoDB Atlas)
- npm or yarn

### 1. Clone the Repository
```bash
cd hasirumane
```

### 2. Backend Setup

```bash
cd server
npm install
```

Create a `.env` file in the `server` directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/hasirumane
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
NODE_ENV=development
CLIENT_URL=http://localhost:3000
```

### 3. Frontend Setup

```bash
cd ../client
npm install
```

### 4. Create Admin User

Before starting the application, you need to create an admin user. You can do this by making a POST request to `/api/auth/create-admin`:

```bash
# Using curl (after starting the server)
curl -X POST http://localhost:5000/api/auth/create-admin \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "email": "admin@hasirumane.com",
    "password": "admin123"
  }'
```

Or use Postman/Thunder Client to make the request.

**⚠️ IMPORTANT**: After creating the admin user, remove or protect this endpoint in production!

## 🏃‍♂️ Running the Application

### Development Mode

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```
Server runs on `http://localhost:5000`

**Terminal 2 - Frontend:**
```bash
cd client
npm run dev
```
Frontend runs on `http://localhost:3000`

### Production Build

**Frontend:**
```bash
cd client
npm run build
```

**Backend:**
```bash
cd server
npm start
```

## 🔑 Default Credentials

After creating the admin user:
- **Email**: admin@hasirumane.com
- **Password**: admin123

**⚠️ Change these credentials in production!**

## 📱 Pages & Routes

### Public Routes
- `/` - Home page
- `/rooms` - Room listings
- `/gallery` - Photo gallery
- `/amenities` - Amenities and activities
- `/contact` - Contact information
- `/booking` - Booking form

### Admin Routes (Protected)
- `/admin/login` - Admin login
- `/admin` - Dashboard overview
- `/admin/rooms` - Manage rooms
- `/admin/bookings` - Manage bookings
- `/admin/gallery` - Manage gallery
- `/admin/amenities` - Manage amenities

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login
- `POST /api/auth/create-admin` - Create admin user
- `GET /api/auth/verify` - Verify JWT token

### Rooms
- `GET /api/rooms` - Get all rooms
- `GET /api/rooms/:id` - Get single room
- `POST /api/rooms` - Create room (Admin)
- `PUT /api/rooms/:id` - Update room (Admin)
- `DELETE /api/rooms/:id` - Delete room (Admin)

### Bookings
- `POST /api/bookings` - Create booking
- `GET /api/bookings` - Get all bookings (Admin)
- `PUT /api/bookings/:id` - Update booking (Admin)
- `DELETE /api/bookings/:id` - Delete booking (Admin)

### Gallery
- `GET /api/gallery` - Get all images
- `GET /api/gallery/hero` - Get hero images
- `POST /api/gallery/upload` - Upload single image (Admin)
- `POST /api/gallery/upload-multiple` - Upload multiple images (Admin)
- `DELETE /api/gallery/:id` - Delete image (Admin)

### Amenities
- `GET /api/amenities` - Get all amenities
- `POST /api/amenities` - Create amenity (Admin)
- `PUT /api/amenities/:id` - Update amenity (Admin)
- `DELETE /api/amenities/:id` - Delete amenity (Admin)

## 🎨 Tech Stack

### Frontend
- **React** - UI library
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **React Router** - Routing
- **Axios** - HTTP client
- **React Icons** - Icons
- **Vite** - Build tool

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Multer** - File upload
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin support

## 📝 Important Notes

1. **Image Upload**: Images are stored locally in the `/uploads` folder. You can replace them with your own images.

2. **Environment Variables**: Make sure to set all environment variables in the `.env` file before running the server.

3. **MongoDB**: Ensure MongoDB is running before starting the server. You can use MongoDB Atlas for cloud hosting.

4. **Security**: 
   - Change the JWT secret in production
   - Remove or protect the create-admin endpoint
   - Use HTTPS in production
   - Implement rate limiting for APIs

5. **WhatsApp & Phone**: Update phone numbers in:
   - `client/src/components/WhatsAppButton.jsx`
   - `client/src/pages/Contact.jsx`
   - `client/src/components/Footer.jsx`

6. **Google Maps**: Update the map embed URL in:
   - `client/src/pages/Home.jsx`
   - `client/src/pages/Contact.jsx`

## 🛠️ Customization

### Changing Colors
Edit `client/tailwind.config.js` to change the primary color scheme.

### Adding More Features
- Payment gateway integration
- Email notifications
- SMS notifications
- Multi-language support
- Reviews and ratings
- Special offers and discounts

## 📄 License

This project is created for HASIRUMANE resort. All rights reserved.

## 🤝 Support

For issues or questions, contact: info@hasirumane.com

---

**Built with ❤️ for HASIRUMANE Resort**
