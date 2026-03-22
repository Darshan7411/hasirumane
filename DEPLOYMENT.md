# HASIRUMANE Deployment Guide

This guide covers deploying your HASIRUMANE resort website to production.

## Table of Contents
1. [Preparation](#preparation)
2. [MongoDB Setup](#mongodb-setup)
3. [Backend Deployment](#backend-deployment)
4. [Frontend Deployment](#frontend-deployment)
5. [Post-Deployment](#post-deployment)

---

## Preparation

### 1. Update Configuration

**Update phone numbers and contact info:**
- `client/src/components/WhatsAppButton.jsx` - Line 4
- `client/src/pages/Contact.jsx` - Contact info section
- `client/src/components/Footer.jsx` - Footer contact

**Update Google Maps:**
- `client/src/pages/Home.jsx` - Map embed URL
- `client/src/pages/Contact.jsx` - Map embed URL

**Update colors (optional):**
- `client/tailwind.config.js` - Primary color scheme

### 2. Security Checklist
- [ ] Change JWT_SECRET to a strong random string
- [ ] Remove or protect `/api/auth/create-admin` endpoint
- [ ] Enable HTTPS
- [ ] Add rate limiting
- [ ] Sanitize user inputs
- [ ] Add CORS whitelist for production domains

---

## MongoDB Setup

### Option 1: MongoDB Atlas (Recommended)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create a database user
4. Whitelist your IP addresses (or 0.0.0.0/0 for all)
5. Get your connection string:
   ```
   mongodb+srv://username:password@cluster.mongodb.net/hasirumane?retryWrites=true&w=majority
   ```

### Option 2: Self-Hosted MongoDB

1. Install MongoDB on your server
2. Configure authentication
3. Set up firewall rules
4. Use connection string:
   ```
   mongodb://username:password@your-server:27017/hasirumane
   ```

---

## Backend Deployment

### Option 1: Railway

1. Install Railway CLI:
   ```bash
   npm i -g @railway/cli
   ```

2. Login and initialize:
   ```bash
   railway login
   cd server
   railway init
   ```

3. Add environment variables in Railway dashboard:
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_super_secret_key
   NODE_ENV=production
   CLIENT_URL=https://your-frontend-domain.com
   ```

4. Deploy:
   ```bash
   railway up
   ```

### Option 2: Heroku

1. Install Heroku CLI and login:
   ```bash
   heroku login
   ```

2. Create app and deploy:
   ```bash
   cd server
   heroku create hasirumane-api
   
   heroku config:set MONGODB_URI=your_mongodb_uri
   heroku config:set JWT_SECRET=your_secret
   heroku config:set NODE_ENV=production
   heroku config:set CLIENT_URL=https://your-frontend.com
   
   git init
   git add .
   git commit -m "Deploy backend"
   git push heroku main
   ```

### Option 3: DigitalOcean/VPS

1. SSH into your server
2. Install Node.js and MongoDB
3. Clone repository
4. Install dependencies:
   ```bash
   cd server
   npm install --production
   ```

5. Create `.env` file with production values

6. Set up PM2 for process management:
   ```bash
   npm install -g pm2
   pm2 start server.js --name hasirumane-api
   pm2 startup
   pm2 save
   ```

7. Set up Nginx reverse proxy:
   ```nginx
   server {
       listen 80;
       server_name api.hasirumane.com;
       
       location / {
           proxy_pass http://localhost:5000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
       
       location /uploads {
           alias /path/to/hasirumane/uploads;
       }
   }
   ```

8. Install SSL certificate:
   ```bash
   sudo certbot --nginx -d api.hasirumane.com
   ```

---

## Frontend Deployment

### Option 1: Vercel (Recommended)

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Build and deploy:
   ```bash
   cd client
   vercel
   ```

3. Update `src/utils/api.js` to use production API URL:
   ```javascript
   const api = axios.create({
     baseURL: 'https://your-backend-url.com/api',
     // ...
   });
   ```

4. Or use environment variables in Vercel:
   ```
   VITE_API_URL=https://your-backend-url.com/api
   ```

### Option 2: Netlify

1. Build the app:
   ```bash
   cd client
   npm run build
   ```

2. Deploy via Netlify CLI:
   ```bash
   npm install -g netlify-cli
   netlify deploy --prod --dir=dist
   ```

3. Or drag and drop the `dist` folder to Netlify dashboard

4. Add environment variables in Netlify dashboard:
   ```
   VITE_API_URL=https://your-backend-url.com/api
   ```

### Option 3: Traditional Hosting

1. Build the app:
   ```bash
   cd client
   npm run build
   ```

2. Upload `dist` folder to your server

3. Configure web server (Nginx):
   ```nginx
   server {
       listen 80;
       server_name hasirumane.com www.hasirumane.com;
       root /var/www/hasirumane/dist;
       index index.html;
       
       location / {
           try_files $uri $uri/ /index.html;
       }
       
       location /api {
           proxy_pass http://your-backend:5000/api;
       }
       
       location /uploads {
           proxy_pass http://your-backend:5000/uploads;
       }
   }
   ```

4. Install SSL:
   ```bash
   sudo certbot --nginx -d hasirumane.com -d www.hasirumane.com
   ```

---

## Post-Deployment

### 1. Create Admin User

Using PowerShell:
```powershell
$headers = @{
    "Content-Type" = "application/json"
}

$body = @{
    username = "admin"
    email = "admin@hasirumane.com"
    password = "SecurePassword123!"
} | ConvertTo-Json

Invoke-WebRequest -Uri "https://your-api-url.com/api/auth/create-admin" -Method POST -Headers $headers -Body $body
```

### 2. Test All Features

- [ ] Test user registration/login
- [ ] Test room booking flow
- [ ] Test image uploads
- [ ] Test all admin CRUD operations
- [ ] Test on mobile devices
- [ ] Test contact forms
- [ ] Test WhatsApp integration

### 3. Set Up Monitoring

**Backend:**
- Use PM2 monitoring for Node.js
- Set up error logging (e.g., Sentry)
- Monitor database performance

**Frontend:**
- Use Google Analytics
- Monitor with Vercel/Netlify analytics
- Set up error tracking

### 4. Set Up Backups

**Database:**
```bash
# MongoDB Atlas - automatic backups
# Self-hosted - use mongodump
mongodump --uri="mongodb://localhost:27017/hasirumane" --out=/backup/$(date +%Y%m%d)
```

**Images:**
```bash
# Backup uploads folder regularly
tar -czf uploads-backup-$(date +%Y%m%d).tar.gz uploads/
```

### 5. Performance Optimization

**Backend:**
- Enable compression middleware
- Add response caching for public routes
- Use CDN for static files
- Add database indexes

**Frontend:**
- Enable image lazy loading
- Optimize images (use WebP format)
- Enable code splitting
- Add service worker for PWA

### 6. Security Hardening

**Update server/.env:**
```env
NODE_ENV=production
JWT_SECRET=YourVerySecureRandomString123!@#
```

**Add rate limiting:**
```javascript
// server/server.js
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api/', limiter);
```

**Helmet for security headers:**
```bash
cd server
npm install helmet
```

```javascript
import helmet from 'helmet';
app.use(helmet());
```

---

## Troubleshooting

### Backend Issues

**CORS errors:**
- Update CLIENT_URL in .env
- Check CORS configuration in server.js

**Database connection:**
- Verify MongoDB connection string
- Check firewall/network settings
- Ensure IP is whitelisted (MongoDB Atlas)

**Image upload fails:**
- Check uploads folder permissions
- Verify file size limits
- Check disk space

### Frontend Issues

**API calls fail:**
- Update API base URL in utils/api.js
- Check CORS settings
- Verify API is running

**Build fails:**
- Clear node_modules and reinstall
- Check for syntax errors
- Update dependencies

---

## Maintenance

### Regular Tasks
- [ ] Weekly: Check server logs
- [ ] Weekly: Monitor disk space
- [ ] Monthly: Update dependencies
- [ ] Monthly: Review and clean up old bookings
- [ ] Monthly: Database backup verification
- [ ] Quarterly: Security audit
- [ ] Quarterly: Performance review

### Updates
```bash
# Update backend dependencies
cd server
npm update
npm audit fix

# Update frontend dependencies
cd client
npm update
npm audit fix
```

---

## Support

For deployment issues, refer to:
- Railway: https://docs.railway.app
- Vercel: https://vercel.com/docs
- MongoDB Atlas: https://docs.atlas.mongodb.com
- Nginx: https://nginx.org/en/docs

---

**Remember:** Always test in a staging environment before deploying to production!
