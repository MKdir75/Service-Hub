# ServiceHub Backend

The ServiceHub backend is a RESTful API built with Node.js and Express.js.

It provides authentication, authorization, service management, booking workflows, reviews, image uploads, and database access for the ServiceHub marketplace.

---

## 🚀 Features

### Authentication

* User registration
* User login
* JWT authentication
* Password hashing
* Logout support
* Protected routes

### Authorization

* Role-based authorization
* Customer role
* Provider role
* Resource ownership authorization

### Services

* Create service
* Get services
* Get service by ID
* Update service
* Delete service
* Get provider's own services
* Search and filtering support

### Bookings

* Create booking
* View bookings
* Manage booking status
* Provider booking management
* Customer booking tracking

### Reviews

* Submit reviews
* Ratings
* Service reviews

### File Storage

* Image upload
* Multer multipart handling
* AWS S3 integration
* S3-based image storage

---

## 🛠️ Technology Stack

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcryptjs
* Multer
* AWS SDK for JavaScript
* dotenv
* CORS
* Cookie Parser

---

## 📁 Project Structure

```text
servicehub-backend/
│
├── src/
│   ├── config/
│   │
│   ├── controllers/
│   │
│   ├── middleware/
│   │
│   ├── models/
│   │
│   ├── routes/
│   │
│   ├── services/
│   │
│   └── server.js
│
├── .env
├── .gitignore
├── Dockerfile
├── package.json
└── README.md
```

---

## 🔐 Authentication Architecture

Registration:

```text
Client
  ↓
POST /api/auth/register
  ↓
Validate user data
  ↓
Hash password with bcrypt
  ↓
Create user
  ↓
Return response
```

Login:

```text
Client
  ↓
POST /api/auth/login
  ↓
Find user
  ↓
Compare password
  ↓
Generate JWT
  ↓
Return user + token
```

---

## 🪪 JWT Authorization

Protected requests include:

```text
Authorization: Bearer <token>
```

The authentication middleware:

```text
Request
   ↓
Read Authorization header
   ↓
Extract JWT
   ↓
Verify token
   ↓
Identify user
   ↓
Allow / Reject request
```

---

## 👥 Role-Based Authorization

ServiceHub has two main roles:

```text
customer
provider
```

Example:

```text
Customer
  ├── Browse services
  ├── Create bookings
  └── Submit reviews

Provider
  ├── Create services
  ├── Update own services
  ├── Delete own services
  └── Manage bookings
```

---

## 🔒 Resource Ownership

Role authorization alone is not enough.

ServiceHub also verifies resource ownership.

Example:

```text
Provider A
    │
    └── Service A

Provider B
    │
    └── Service B
```

Provider A cannot update or delete Service B.

This prevents unauthorized modification of another provider's resources.

---

## 🔌 API Structure

Base URL:

```text
/api
```

Authentication:

```text
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
```

Services:

```text
GET    /api/services
GET    /api/services/:id
POST   /api/services
PUT    /api/services/:id
DELETE /api/services/:id
GET    /api/services/my-services
```

> Additional booking, review, upload, and user endpoints can be documented here as they are finalized.

---

## 🗄️ Database

ServiceHub uses MongoDB Atlas with Mongoose.

Primary entities include:

```text
User
Service
Booking
Review
```

Relationship concept:

```text
User
 │
 ├── Customer
 │      └── Bookings
 │
 └── Provider
        └── Services
              │
              ├── Bookings
              └── Reviews
```

---

## ☁️ AWS S3

AWS S3 is used for service image storage.

Upload flow:

```text
Frontend
   ↓
Multipart request
   ↓
Express API
   ↓
Multer
   ↓
AWS S3
   ↓
Stored image
   ↓
Image URL
   ↓
MongoDB
```

---

## ⚙️ Environment Variables

Create:

```text
.env
```

Example:

```env
PORT=5000

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

AWS_REGION=your_aws_region
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_S3_BUCKET=your_bucket_name
```

### Security

Never commit `.env`.

The `.gitignore` should contain:

```text
.env
.env.local
```

Never expose:

* MongoDB credentials
* AWS access keys
* JWT secrets
* Other production credentials

---

## 💻 Local Development

Install dependencies:

```bash
npm install
```

Create `.env`.

Start development server:

```bash
npm run dev
```

Production start:

```bash
npm start
```

Backend:

```text
http://localhost:5000
```

API:

```text
http://localhost:5000/api
```

---

## 🐳 Docker

Build image:

```bash
docker build -t servicehub-backend .
```

Run container:

```bash
docker run -p 5000:5000 --env-file .env servicehub-backend
```

---

## 🐳 Docker Compose

From the root project:

```bash
docker compose up -d --build
```

Check containers:

```bash
docker compose ps
```

Backend logs:

```bash
docker compose logs -f backend
```

Stop:

```bash
docker compose down
```

---

## 🔄 CI/CD

The backend is designed to be included in the CI/CD pipeline:

```text
GitHub
   ↓
GitHub Actions
   ↓
Install dependencies
   ↓
Run tests/checks
   ↓
Build Docker image
   ↓
Push image to registry
   ↓
AWS EC2
   ↓
Pull latest image
   ↓
Restart container
```

---

## 📌 Future Improvements

* Automated API tests
* Jest/Supertest integration
* Redis caching
* Rate limiting
* Request validation
* Centralized error handling
* API documentation with Swagger
* Elasticsearch
* Background jobs
* Monitoring
* Structured logging
* Load balancing

```
```
