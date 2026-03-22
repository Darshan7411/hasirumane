# HASIRUMANE API Testing Guide

This document provides examples for testing all API endpoints.

## Base URL
```
http://localhost:5000/api
```

## Authentication Endpoints

### 1. Create Admin User
```bash
POST /auth/create-admin

Body (JSON):
{
  "username": "admin",
  "email": "admin@hasirumane.com",
  "password": "admin123"
}
```

### 2. Login
```bash
POST /auth/login

Body (JSON):
{
  "email": "admin@hasirumane.com",
  "password": "admin123"
}

Response:
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "admin": {
    "id": "...",
    "username": "admin",
    "email": "admin@hasirumane.com",
    "role": "admin"
  }
}
```

### 3. Verify Token
```bash
GET /auth/verify

Headers:
Authorization: Bearer <your_token_here>
```

## Room Endpoints

### 1. Get All Rooms (Public)
```bash
GET /rooms
```

### 2. Get Single Room (Public)
```bash
GET /rooms/:id
```

### 3. Create Room (Admin)
```bash
POST /rooms

Headers:
Authorization: Bearer <your_token_here>
Content-Type: multipart/form-data

Form Data:
- name: "Deluxe Room"
- description: "Spacious room with mountain view"
- price: 3500
- capacity: 2
- roomType: "deluxe"
- amenities: ["WiFi", "AC", "TV", "Mini Bar"]
- features: ["Mountain View", "Balcony"]
- image: <file>
```

### 4. Update Room (Admin)
```bash
PUT /rooms/:id

Headers:
Authorization: Bearer <your_token_here>
Content-Type: multipart/form-data

Form Data:
- name: "Updated Room Name"
- price: 4000
- isAvailable: true
```

### 5. Delete Room (Admin)
```bash
DELETE /rooms/:id

Headers:
Authorization: Bearer <your_token_here>
```

## Booking Endpoints

### 1. Create Booking (Public)
```bash
POST /bookings

Body (JSON):
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+91 98765 43210",
  "checkIn": "2024-12-25",
  "checkOut": "2024-12-27",
  "roomType": "Deluxe Room",
  "numberOfGuests": 2,
  "specialRequests": "Late check-in please"
}
```

### 2. Get All Bookings (Admin)
```bash
GET /bookings

Headers:
Authorization: Bearer <your_token_here>
```

### 3. Update Booking Status (Admin)
```bash
PUT /bookings/:id

Headers:
Authorization: Bearer <your_token_here>

Body (JSON):
{
  "status": "confirmed",
  "totalAmount": 7000
}
```

### 4. Delete Booking (Admin)
```bash
DELETE /bookings/:id

Headers:
Authorization: Bearer <your_token_here>
```

## Gallery Endpoints

### 1. Get All Images (Public)
```bash
GET /gallery

# With category filter
GET /gallery?category=rooms
```

### 2. Get Hero Images (Public)
```bash
GET /gallery/hero
```

### 3. Upload Single Image (Admin)
```bash
POST /gallery/upload

Headers:
Authorization: Bearer <your_token_here>
Content-Type: multipart/form-data

Form Data:
- image: <file>
- title: "Beautiful sunset view"
- description: "Sunset from the resort"
- category: "nature"
- isHeroImage: false
```

### 4. Upload Multiple Images (Admin)
```bash
POST /gallery/upload-multiple

Headers:
Authorization: Bearer <your_token_here>
Content-Type: multipart/form-data

Form Data:
- images: <file1>
- images: <file2>
- images: <file3>
- category: "amenities"
```

### 5. Delete Image (Admin)
```bash
DELETE /gallery/:id

Headers:
Authorization: Bearer <your_token_here>
```

## Amenity Endpoints

### 1. Get All Amenities (Public)
```bash
GET /amenities

# With category filter
GET /amenities?category=outdoor
```

### 2. Create Amenity (Admin)
```bash
POST /amenities

Headers:
Authorization: Bearer <your_token_here>
Content-Type: multipart/form-data

Form Data:
- name: "Swimming Pool"
- description: "Olympic-size swimming pool"
- icon: "FaSwimmingPool"
- category: "outdoor"
- image: <file> (optional)
```

### 3. Update Amenity (Admin)
```bash
PUT /amenities/:id

Headers:
Authorization: Bearer <your_token_here>
Content-Type: multipart/form-data

Form Data:
- name: "Updated Pool"
- isAvailable: true
```

### 4. Delete Amenity (Admin)
```bash
DELETE /amenities/:id

Headers:
Authorization: Bearer <your_token_here>
```

## Testing with PowerShell

### Login and Get Token
```powershell
$loginBody = @{
    email = "admin@hasirumane.com"
    password = "admin123"
} | ConvertTo-Json

$loginResponse = Invoke-RestMethod -Uri "http://localhost:5000/api/auth/login" -Method POST -Body $loginBody -ContentType "application/json"

$token = $loginResponse.token
Write-Host "Token: $token"
```

### Get All Rooms
```powershell
Invoke-RestMethod -Uri "http://localhost:5000/api/rooms" -Method GET
```

### Create Booking
```powershell
$bookingBody = @{
    name = "Test User"
    email = "test@example.com"
    phone = "+91 9876543210"
    checkIn = "2024-12-25"
    checkOut = "2024-12-27"
    roomType = "Deluxe Room"
    numberOfGuests = 2
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:5000/api/bookings" -Method POST -Body $bookingBody -ContentType "application/json"
```

### Get All Bookings (with auth)
```powershell
$headers = @{
    Authorization = "Bearer $token"
}

Invoke-RestMethod -Uri "http://localhost:5000/api/bookings" -Method GET -Headers $headers
```

## Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `404` - Not Found
- `500` - Server Error

## Notes

1. All admin endpoints require JWT token in Authorization header
2. Image uploads use `multipart/form-data`
3. Arrays in form data should be JSON stringified
4. Dates should be in ISO format (YYYY-MM-DD)
5. File uploads are limited to 5MB per file
