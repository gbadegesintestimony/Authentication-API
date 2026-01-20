# 🔐 Authentication API (Auth Service)

A **production-ready Authentication API** built with **Node.js, Express, MongoDB**, and **JWT**, featuring secure authentication flows, OTP-based password reset, and email delivery using **Resend**.

This project is designed with **clean architecture**, **feature-based modular structure**, and backend patterns inspired by **Go services**.

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
- OTP verification with expiry
- Reset password
- Logout (client-side JWT invalidation)

### Email

- OTP & security emails via **Resend**
- No SMTP setup required

---

## ⚡ Quick Start

### 1️⃣ Clone repository

```bash
git clone https://github.com/gbadegesintestimony/authentication-api.git
cd authentication-api
```

### 2️⃣ Install dependencies

--- npm install

### 3️⃣ Environment setup

--- Check .env.example

### 4️⃣ Run the server

--- npm run dev

### 📡 API Endpoints

Method Endpoint Description
POST /api/v1/users/register Register new user
POST api/v1/users/login login
POST api/v1/users/forgot-password Send OTP to email
POST api/v1/users/reset-password Reset password using OTP
POST api/v1/users/change-password Change password (auth required)

### 🧠 Architecture Overview

This project follows a feature-based architecture inspired by Go backend services:

Controllers → Handle HTTP (req / res)

Services → Business logic

Models → Database schemas

Middleware → Auth, error handling

Utils → JWT, hashing, email, OTP helpers

### 📌 Controllers never talk directly to the database.

## 🛠️ Tech Stack

Runtime: Node.js

Framework: Express.js

Database: MongoDB (Mongoose)

Authentication: JWT

Email: Resend

Security: bcrypt

Dev Tools: Nodemon, dotenv

### 👤 Author

Gbadegesin Testimony
Backend Developer (Node.js | Go | Security)
