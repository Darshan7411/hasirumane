# HASIRUMANE - Setup Verification Checklist

Use this checklist to verify your setup is complete and working correctly.

## ✅ Pre-Installation Checklist

- [ ] Node.js installed (v14 or higher)
  - Run: `node --version`
- [ ] npm installed
  - Run: `npm --version`
- [ ] MongoDB installed and running
  - Run: `mongod --version`
- [ ] Git installed (optional, for version control)
  - Run: `git --version`

## ✅ Installation Checklist

- [ ] Project downloaded/cloned to `c:\hasirumane`
- [ ] Backend dependencies installed
  - Run: `cd server && npm install`
- [ ] Frontend dependencies installed
  - Run: `cd client && npm install`
- [ ] Server `.env` file created and configured
  - File: `server/.env`
  - Contains: PORT, MONGODB_URI, JWT_SECRET, NODE_ENV, CLIENT_URL

## ✅ Server Verification

- [ ] MongoDB is running
  - Check: Windows Services or run `mongod`
- [ ] Backend server starts without errors
  - Run: `cd server && npm run dev`
  - Should show: "MongoDB Connected" and "Server running on port 5000"
- [ ] Health check endpoint works
  - Visit: http://localhost:5000/api/health
  - Should return: `{"success":true,"message":"HASIRUMANE API is running",...}`

## ✅ Admin User Setup

- [ ] Admin user created successfully
  - Run: `.\create-admin.ps1` (from project root)
  - Should show: "✓ Admin user created successfully!"
- [ ] Admin login works
  - Visit: http://localhost:3000/admin/login
  - Use: admin@hasirumane.com / admin123
  - Should redirect to admin dashboard

## ✅ Frontend Verification

- [ ] Frontend server starts without errors
  - Run: `cd client && npm run dev`
  - Should show: "Local: http://localhost:3000"
- [ ] Home page loads correctly
  - Visit: http://localhost:3000
  - Should see: HASIRUMANE hero banner
- [ ] All navigation links work
  - Test: Home, Rooms, Gallery, Amenities, Contact, Booking
- [ ] Responsive design works
  - Test: Resize browser window
  - Test: Mobile menu appears on small screens

## ✅ Feature Testing

### Public Features
- [ ] **Home Page**
  - [ ] Hero banner displays
  - [ ] Navigation menu works
  - [ ] All sections visible (About, Rooms, Amenities, Location)
  - [ ] Book Now button works
  - [ ] Call button works
  - [ ] Map displays

- [ ] **Rooms Page**
  - [ ] Rooms list displays (empty if no rooms added yet)
  - [ ] Filter buttons work
  - [ ] Room cards display properly

- [ ] **Gallery Page**
  - [ ] Gallery grid displays (empty if no images yet)
  - [ ] Category filters work
  - [ ] Lightbox opens when clicking image

- [ ] **Amenities Page**
  - [ ] Amenities display (default or from database)
  - [ ] Category filters work

- [ ] **Contact Page**
  - [ ] Contact information displays
  - [ ] Map displays
  - [ ] Call/Email/WhatsApp buttons work

- [ ] **Booking Page**
  - [ ] Form displays
  - [ ] All fields present
  - [ ] Validation works (try submitting empty form)
  - [ ] Date validation works (try past date)

- [ ] **WhatsApp Button**
  - [ ] Floating button visible on all pages
  - [ ] Opens WhatsApp when clicked

### Admin Features

- [ ] **Login Page**
  - [ ] Login form displays
  - [ ] Invalid credentials show error
  - [ ] Valid credentials redirect to dashboard

- [ ] **Dashboard**
  - [ ] Statistics display (zeros if no data yet)
  - [ ] Sidebar navigation works
  - [ ] Recent bookings table displays

- [ ] **Rooms Management**
  - [ ] Add room form works
  - [ ] Can upload room image
  - [ ] Room appears in list after adding
  - [ ] Edit room works
  - [ ] Delete room works with confirmation

- [ ] **Bookings Management**
  - [ ] Bookings list displays
  - [ ] Filter buttons work
  - [ ] Can update booking status
  - [ ] Can delete booking

- [ ] **Gallery Management**
  - [ ] Can upload single image
  - [ ] Can upload multiple images
  - [ ] Category filters work
  - [ ] Can delete images
  - [ ] Hero image flag works

- [ ] **Amenities Management**
  - [ ] Can add new amenity
  - [ ] Can edit amenity
  - [ ] Can delete amenity
  - [ ] Category selection works

- [ ] **Logout**
  - [ ] Logout button works
  - [ ] Redirects to home page
  - [ ] Cannot access admin routes after logout

## ✅ API Testing

Test these endpoints (use API_TESTING.md for details):

- [ ] `GET /api/health` - Health check
- [ ] `POST /api/auth/login` - Admin login
- [ ] `GET /api/rooms` - Get all rooms
- [ ] `POST /api/bookings` - Create booking
- [ ] `GET /api/gallery` - Get gallery images
- [ ] `GET /api/amenities` - Get amenities

## ✅ Database Verification

- [ ] MongoDB database created
  - Check: MongoDB Compass or `show dbs` in mongo shell
  - Database name: `hasirumane`
- [ ] Collections created (after adding data):
  - [ ] adminusers
  - [ ] rooms
  - [ ] bookings
  - [ ] galleryimages
  - [ ] amenities

## ✅ File Upload Testing

- [ ] Room image upload works
  - [ ] File saved in `/uploads` folder
  - [ ] Image displays in rooms list
  - [ ] Image accessible via URL

- [ ] Gallery image upload works
  - [ ] Single image upload
  - [ ] Multiple images upload
  - [ ] Files saved in `/uploads` folder
  - [ ] Images display in gallery

## ✅ Integration Testing

Complete workflow tests:

- [ ] **Booking Workflow**
  1. User visits home page
  2. Clicks "Book Now"
  3. Fills booking form
  4. Submits successfully
  5. Admin sees booking in dashboard
  6. Admin updates booking status
  7. Status reflects correctly

- [ ] **Room Management Workflow**
  1. Admin logs in
  2. Adds new room with image
  3. Room appears on public rooms page
  4. User can book the room
  5. Admin edits room details
  6. Changes reflect on public page

- [ ] **Gallery Workflow**
  1. Admin uploads images
  2. Images appear in public gallery
  3. Category filter works
  4. Images can be deleted by admin

## ✅ Error Handling

- [ ] 404 page for invalid routes
- [ ] API errors show user-friendly messages
- [ ] Form validation errors display properly
- [ ] Image upload errors handled (wrong format, too large)
- [ ] Database connection errors handled gracefully

## ✅ Performance Checks

- [ ] Pages load within 3 seconds
- [ ] Images load properly (no broken images)
- [ ] No console errors in browser
- [ ] No JavaScript errors
- [ ] Smooth animations
- [ ] Responsive on different screen sizes

## ✅ Security Checks

- [ ] Admin routes protected (cannot access without login)
- [ ] JWT token required for admin API calls
- [ ] Passwords hashed in database (not plain text)
- [ ] File upload validates file types
- [ ] CORS configured correctly
- [ ] Environment variables not exposed to frontend

## ✅ Documentation Review

- [ ] README.md reviewed
- [ ] QUICKSTART.md reviewed
- [ ] API_TESTING.md reviewed
- [ ] DEPLOYMENT.md reviewed
- [ ] All scripts (.ps1) are executable

## ✅ Pre-Deployment Checklist

Before deploying to production:

- [ ] Update phone numbers in code
- [ ] Update email addresses
- [ ] Update Google Maps embed URLs
- [ ] Change JWT_SECRET to strong random string
- [ ] Change admin password
- [ ] Remove or protect create-admin endpoint
- [ ] Add real resort images
- [ ] Test all features again
- [ ] Set up MongoDB Atlas
- [ ] Configure production environment variables
- [ ] Test on staging environment
- [ ] Set up SSL certificate
- [ ] Configure domain name

## 🎯 Common Issues & Solutions

### Issue: MongoDB connection failed
**Solution:** 
- Ensure MongoDB is running
- Check MONGODB_URI in .env
- Verify MongoDB service is started

### Issue: Port already in use
**Solution:**
- Change PORT in server/.env
- Kill existing process on that port
- Use different port number

### Issue: Images not showing
**Solution:**
- Check uploads folder exists
- Verify file permissions
- Check image path in database
- Ensure backend server is running

### Issue: Admin login fails
**Solution:**
- Verify admin user was created
- Check credentials are correct
- Check JWT_SECRET is set in .env
- Check MongoDB has adminusers collection

### Issue: Frontend can't reach backend
**Solution:**
- Verify backend is running on port 5000
- Check proxy settings in vite.config.js
- Verify CORS settings in server.js
- Check API base URL in utils/api.js

## 📞 Need Help?

If you encounter issues not covered here:
1. Check the console for error messages
2. Review the relevant documentation file
3. Verify all environment variables are set
4. Ensure all dependencies are installed
5. Try restarting both servers

---

## ✅ Final Checklist Before Launch

- [ ] All features tested and working
- [ ] All customizations complete
- [ ] Security measures implemented
- [ ] Production environment configured
- [ ] Backups configured
- [ ] Monitoring set up
- [ ] SSL certificate installed
- [ ] Domain configured
- [ ] DNS records updated
- [ ] Final testing on production

---

**Once all items are checked, your HASIRUMANE website is ready! 🎉**
