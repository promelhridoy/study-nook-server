# 🏫 Study Nook - Server

Live API: https://study-nook-kappa.vercel.app

This is the backend server for the **Study Nook** project.  
It provides REST APIs for room management, booking system, authentication, and advanced filtering using MongoDB.

---

## 🚀 Features

- 🔍 Advanced room search using MongoDB `$regex`
- 🧰 Filtering system using `$in`, `$gte`, `$lte`
- 🏢 Room management (Create, Read, Update, Delete)
- 📅 Booking system for study rooms
- ⚠️ Booking API with authentication protection
- 🔐 JWT-based authentication middleware
- 🗄️ MongoDB database integration
- 🌐 CORS enabled for frontend communication

---

## ⚙️ Tech Stack

- Node.js
- Express.js
- MongoDB (Native Driver)
- JWT Authentication (JOSE)
- dotenv
- cors

---

## 📌 API Endpoints

### 🏢 Rooms

- GET `/rooms` → Get all rooms (with filters)
- GET `/rooms/:id` → Get single room
- POST `/rooms` → Create new room (Protected)
- PATCH `/rooms/:id` → Update room (Protected)
- DELETE `/rooms/:id` → Delete room (Protected)

---

### 📅 Bookings

- POST `/bookings` → Create booking (Protected)
- GET `/bookings/:userId` → Get user bookings (Protected)
- DELETE `/booking/:bookingId` → Cancel booking (Protected)

---

## 🔍 Query Filters (Rooms API)

You can use query params like:

### Supported Filters:

- 🔍 search → room name (`$regex`)
- 🏷️ badge → popular / new / best
- 🏢 floor → floor filter
- 👥 capacity → number of users
- 🧰 amenities → `$in` operator
- 💰 minPrice / maxPrice → `$gte` / `$lte`

---

## 🔐 Authentication

- JWT token required for protected routes
- Token verified using JOSE + JWKS
- Unauthorized requests return `401`
- Invalid token returns `403`

---

## 📦 Installation & Setup

```bash
git clone <https://github.com/promelhridoy/study-nook-server>
cd server
npm install