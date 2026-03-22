# HASIRUMANE - Hosting & Deployment Guide

## 🚀 Quick Deployment Options

### Option 1: Vercel (Frontend) + Railway (Backend) - RECOMMENDED ✅
**Best for:** Easy setup, free tier available  
**Time:** ~15 minutes

### Option 2: Render (Full Stack)
**Best for:** All-in-one hosting  
**Time:** ~20 minutes

### Option 3: DigitalOcean/AWS
**Best for:** Full control, production-ready  
**Time:** ~1 hour

---

## 🎯 Option 1: Vercel + Railway (Easiest)

### Part A: Deploy Backend on Railway

1. **Sign up for Railway**
   - Go to https://railway.app
   - Sign up with GitHub

2. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Connect your GitHub account
   - Push your code to GitHub first

3. **Add MongoDB**
   - In Railway dashboard, click "+ New"
   - Select "Database" → "MongoDB"
   - Copy the MongoDB connection string

4. **Configure Backend**
   - Select your backend service
   - Go to "Variables" tab
   - Add these environment variables:
     ```
     PORT=5000
     MONGODB_URI=<your-railway-mongodb-url>
     JWT_SECRET=<generate-random-secret>
     NODE_ENV=production
     CLIENT_URL=<your-vercel-url>
     ```

5. **Set Root Directory**
   - Go to "Settings" tab
   - Set "Root Directory" to `server`
   - Set "Start Command" to `npm start`

6. **Deploy**
   - Railway will auto-deploy
   - Copy your backend URL (e.g., `https://yourapp.railway.app`)

### Part B: Deploy Frontend on Vercel

1. **Sign up for Vercel**
   - Go to https://vercel.com
   - Sign up with GitHub

2. **Import Project**
   - Click "Add New" → "Project"
   - Import your GitHub repository

3. **Configure Build Settings**
   - Framework Preset: Vite
   - Root Directory: `client`
   - Build Command: `npm run build`
   - Output Directory: `dist`

4. **Add Environment Variables**
   - In project settings, add:
     ```
     VITE_API_URL=<your-railway-backend-url>
     ```

5. **Update API Base URL**
   - Edit `client/src/utils/api.js`:
   ```javascript
   const API = axios.create({
     baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
   });
   ```

6. **Deploy**
   - Vercel will auto-deploy
   - Your site will be live at `https://yourapp.vercel.app`

---

## 🎯 Option 2: Render (All-in-One)

### Deploy Backend

1. **Sign up**
   - Go to https://render.com
   - Sign up with GitHub

2. **Create Web Service**
   - Dashboard → "New" → "Web Service"
   - Connect GitHub repo
   - Name: `hasirumane-backend`
   - Root Directory: `server`
   - Environment: Node
   - Build Command: `npm install`
   - Start Command: `npm start`

3. **Add MongoDB**
   - Use MongoDB Atlas (free tier)
   - Create cluster at https://cloud.mongodb.com
   - Get connection string

4. **Environment Variables**
   ```
   PORT=5000
   MONGODB_URI=<mongodb-atlas-url>
   JWT_SECRET=<random-secret>
   NODE_ENV=production
   CLIENT_URL=<frontend-url>
   ```

### Deploy Frontend

1. **Create Static Site**
   - Dashboard → "New" → "Static Site"
   - Connect GitHub repo
   - Name: `hasirumane-frontend`
   - Root Directory: `client`
   - Build Command: `npm install && npm run build`
   - Publish Directory: `dist`

2. **Environment Variables**
   ```
   VITE_API_URL=<backend-url>
   ```

---

## 🎯 Option 3: DigitalOcean/AWS (Production)

### Prerequisites
- Domain name (optional)
- DigitalOcean/AWS account

### Deploy Backend

1. **Create Droplet**
   - OS: Ubuntu 22.04
   - Size: Basic ($6/month)
   - Add SSH key

2. **SSH into Server**
   ```bash
   ssh root@your-server-ip
   ```

3. **Install Node.js & MongoDB**
   ```bash
   # Update system
   apt update && apt upgrade -y
   
   # Install Node.js 18
   curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
   apt install -y nodejs
   
   # Install MongoDB
   wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | apt-key add -
   echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/6.0 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-6.0.list
   apt update
   apt install -y mongodb-org
   systemctl start mongod
   systemctl enable mongod
   ```

4. **Clone & Setup Backend**
   ```bash
   cd /var/www
   git clone <your-repo-url>
   cd hasirumane/server
   npm install
   ```

5. **Create .env file**
   ```bash
   nano .env
   ```
   Add:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/hasirumane
   JWT_SECRET=<strong-random-secret>
   NODE_ENV=production
   CLIENT_URL=https://yourdomain.com
   ```

6. **Install PM2**
   ```bash
   npm install -g pm2
   pm2 start server.js --name hasirumane-backend
   pm2 startup
   pm2 save
   ```

7. **Configure Nginx**
   ```bash
   apt install -y nginx
   nano /etc/nginx/sites-available/hasirumane-api
   ```
   
   Add:
   ```nginx
   server {
       listen 80;
       server_name api.yourdomain.com;
       
       location / {
           proxy_pass http://localhost:5000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```
   
   ```bash
   ln -s /etc/nginx/sites-available/hasirumane-api /etc/nginx/sites-enabled/
   nginx -t
   systemctl restart nginx
   ```

8. **SSL Certificate**
   ```bash
   apt install -y certbot python3-certbot-nginx
   certbot --nginx -d api.yourdomain.com
   ```

### Deploy Frontend

1. **Build Frontend Locally**
   ```bash
   cd client
   npm run build
   ```

2. **Upload to Server**
   ```bash
   scp -r dist/* root@your-server-ip:/var/www/html/
   ```

3. **Configure Nginx for Frontend**
   ```bash
   nano /etc/nginx/sites-available/hasirumane
   ```
   
   Add:
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com www.yourdomain.com;
       root /var/www/html;
       index index.html;
       
       location / {
           try_files $uri $uri/ /index.html;
       }
   }
   ```
   
   ```bash
   ln -s /etc/nginx/sites-available/hasirumane /etc/nginx/sites-enabled/
   nginx -t
   systemctl restart nginx
   ```

4. **SSL Certificate**
   ```bash
   certbot --nginx -d yourdomain.com -d www.yourdomain.com
   ```

---

## 📋 Pre-Deployment Checklist

### Code Updates

- [ ] Update phone numbers in:
  - `client/src/components/WhatsAppButton.jsx`
  - `client/src/pages/Contact.jsx`
  - `client/src/components/Footer.jsx`

- [ ] Update email addresses

- [ ] Update Google Maps URLs in:
  - `client/src/pages/Home.jsx`
  - `client/src/pages/Contact.jsx`

- [ ] Change JWT_SECRET to strong random string

- [ ] Update CLIENT_URL in backend .env

- [ ] Remove or protect `/api/auth/create-admin` endpoint

### Security

- [ ] Generate strong JWT secret:
  ```bash
  node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
  ```

- [ ] Change admin password after first login

- [ ] Enable HTTPS/SSL

- [ ] Set up CORS properly

- [ ] Add rate limiting (optional)

### Database

- [ ] Backup MongoDB data
- [ ] Set up MongoDB Atlas for production
- [ ] Configure database backups

---

## 🔧 Update API URL in Frontend

Edit `client/src/utils/api.js`:

```javascript
import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default API;
```

---

## 🌐 Custom Domain Setup

### Railway/Render/Vercel

1. Go to project settings
2. Add custom domain
3. Update DNS records (CNAME):
   ```
   Type: CNAME
   Name: www
   Value: <provided-by-host>
   ```

### DigitalOcean/AWS

1. Point domain A record to server IP:
   ```
   Type: A
   Name: @
   Value: <your-server-ip>
   ```

2. Add www subdomain:
   ```
   Type: CNAME
   Name: www
   Value: yourdomain.com
   ```

---

## 📊 Post-Deployment

### Create Admin User

```bash
curl -X POST https://yourapi.com/api/auth/create-admin \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "email": "admin@hasirumane.com",
    "password": "SecurePassword123!"
  }'
```

### Test Endpoints

```bash
# Health check
curl https://yourapi.com/api/health

# Get rooms
curl https://yourapi.com/api/rooms

# Create booking
curl -X POST https://yourapi.com/api/bookings \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "1234567890",
    "checkIn": "2024-01-01",
    "checkOut": "2024-01-05",
    "roomType": "deluxe",
    "numberOfGuests": 2
  }'
```

---

## 🔍 Monitoring & Maintenance

### Railway/Render
- Built-in logs and monitoring
- Auto-scaling available
- Automatic SSL

### DigitalOcean/AWS
- Set up monitoring:
  ```bash
  pm2 install pm2-logrotate
  pm2 set pm2-logrotate:max_size 10M
  pm2 set pm2-logrotate:retain 7
  ```

- Monitor logs:
  ```bash
  pm2 logs hasirumane-backend
  pm2 monit
  ```

---

## 💰 Cost Comparison

| Option | Frontend | Backend | Database | Total/Month |
|--------|----------|---------|----------|-------------|
| Vercel + Railway | Free | $5 | $5 (MongoDB Atlas) | ~$10 |
| Render | Free | $7 | $5 (MongoDB Atlas) | ~$12 |
| DigitalOcean | $6 | $6 | Included | ~$12 |
| AWS/Heroku | $5-10 | $10-25 | $10 | ~$25+ |

---

## 🆘 Troubleshooting

### CORS Errors
Update `server/server.js`:
```javascript
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));
```

### Images Not Loading
- Check uploads folder permissions
- Verify static file serving:
  ```javascript
  app.use('/uploads', express.static('uploads'));
  ```

### MongoDB Connection Failed
- Check MongoDB connection string
- Verify IP whitelist (MongoDB Atlas)
- Check firewall rules

---

## 📞 Need Help?

- Railway Docs: https://docs.railway.app
- Vercel Docs: https://vercel.com/docs
- Render Docs: https://render.com/docs
- DigitalOcean Tutorials: https://www.digitalocean.com/community/tutorials

**Your HASIRUMANE website is ready to go live! 🚀**
