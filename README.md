# Authentication API (Auth Service)

A **production-ready Authentication API** built with **Node.js, Express, MongoDB**, and **JWT**, featuring secure authentication flows, OTP-based password reset, and email delivery using **Resend**.

This project is designed with **clean architecture**, **feature-based modular structure**, and patterns inspired by **Go backend services**.

---

## 🚀 Features

### Core Authentication

- User registration
- User login
- Secure password hashing
- JWT-based authentication
- Protected routes

### Security & Account Management

- Change password
- Forgot password (OTP via email)
- Verify OTP
- Reset password
- Logout (JWT invalidation strategy)

### Email

- OTP & security emails via **Resend**
- No SMTP setup required

---

## Run


npm install
npm run dev

---

## 🧠 Architecture Overview

This project follows a **feature-based architecture** (similar to Go backend services):

- Controllers handle HTTP (req/res)
- Services contain business logic
- Models define data schemas
- Middleware handles cross-cutting concerns
- Utilities provide reusable helpers

📌 Controllers **never talk directly to the database**.

---

## 🛠️ Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (Mongoose)
- **Auth:** JWT
- **Email:** Resend
- **Security:** bcrypt
- **Validation:** Joi / Zod
- **Dev Tools:** Nodemon, dotenv

---

## ⚙️ Environment Variables

Create a `.env` file using `.env.example` as reference:

## env

PORT=8000
MONGODB_URL=mongodb://localhost:27017/auth_api
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d

RESEND_API_KEY=your_resend_api_key
EMAIL_FROM=no-reply@yourdomain.com

----

👤 Author
Gbadegesin Testimony
Backend Developer (Node.js | Go| Security)
