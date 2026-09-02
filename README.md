# ServiceHub — On-Demand Service Marketplace

ServiceHub is a full-stack on-demand service marketplace that connects customers with service providers.

Customers can discover services, make bookings, track booking status, and leave reviews. Service providers can create and manage their services, manage bookings, and maintain their provider profile.

The project is built with a MERN-style architecture and is containerized with Docker for consistent development and deployment.

---

## 🚀 Features

### Customer Features

* Customer registration and login
* JWT-based authentication
* Browse available services
* Search and filter services
* View service details
* Book services
* Track booking status
* Review and rate completed services
* Customer dashboard

### Service Provider Features

* Provider registration and login
* Provider profile management
* Create services
* Update services
* Delete services
* Upload service images
* Manage customer bookings
* Update booking status
* Provider dashboard

### Authentication & Authorization

* JWT authentication
* Password hashing with bcrypt
* Role-based authorization
* Customer and provider roles
* Protected API routes
* Resource ownership authorization

### Infrastructure

* Dockerized frontend
* Dockerized backend
* Docker Compose
* Nginx for frontend serving
* AWS S3 for image storage
* MongoDB Atlas
* GitHub Actions CI/CD
* AWS EC2 deployment ready

---

## 🏗️ Architecture

```text
                         ┌─────────────────────┐
                         │       Customer      │
                         │   / Service Provider│
                         └──────────┬──────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │   React Frontend    │
                         │   Tailwind CSS      │
                         └──────────┬──────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │       Nginx         │
                         │   Docker Container   │
                         └──────────┬──────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │   Express Backend   │
                         │    Node.js API      │
                         └───────┬───────┬─────┘
                                 │       │
                    ┌────────────┘       └─────────────┐
                    ▼                                  ▼
          ┌─────────────────┐                 ┌─────────────────┐
          │  MongoDB Atlas  │                 │     AWS S3      │
          │    Database     │                 │  Image Storage  │
          └─────────────────┘                 └─────────────────┘
```

---

## 🛠️ Technology Stack

### Frontend

* React.js
* React Router
* Tailwind CSS
* Axios
* JavaScript
* Create React App

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcryptjs
* Multer
* AWS SDK for JavaScript

### DevOps & Cloud

* Docker
* Docker Compose
* Nginx
* GitHub Actions
* AWS EC2
* AWS S3
* MongoDB Atlas

---

## 📁 Project Structure

```text
Service-Hub/
│
├── README.md
├── .gitignore
├── docker-compose.yml
│
├── servicehub-frontend/
│   ├── README.md
│   ├── Dockerfile
│   ├── nginx.conf
│   ├── package.json
│   ├── public/
│   └── src/
│
└── servicehub-backend/
    ├── README.md
    ├── Dockerfile
    ├── package.json
    └── src/
        ├── config/
        ├── controllers/
        ├── middleware/
        ├── models/
        ├── routes/
        ├── services/
        └── server.js
```

---

## 🔐 Authentication Flow

```text
User
 │
 ▼
Register / Login
 │
 ▼
Express API
 │
 ▼
Password verification
 │
 ▼
JWT generated
 │
 ▼
Frontend stores token
 │
 ▼
Axios interceptor
 │
 ▼
Authorization: Bearer <token>
 │
 ▼
Protected API
```

---

## 👥 Role-Based Authorization

ServiceHub supports two primary roles:

```text
Customer
   │
   ├── Browse services
   ├── Book services
   └── Review services

Provider
   │
   ├── Create services
   ├── Manage own services
   └── Manage bookings
```

A provider can only manage resources that belong to that provider.

For example:

```text
Provider A
   └── Service A

Provider B
   └── Service B
```

Provider A cannot modify or delete Provider B's service.

---

## 🐳 Running with Docker

Make sure Docker Desktop is installed and running.

From the project root:

```bash
docker compose up -d --build
```

Check containers:

```bash
docker compose ps
```

Stop containers:

```bash
docker compose down
```

View logs:

```bash
docker compose logs -f
```

View backend logs:

```bash
docker compose logs -f backend
```

View frontend logs:

```bash
docker compose logs -f frontend
```

---

## 🌐 Local URLs

Frontend:

```text
http://localhost:3000
```

Backend:

```text
http://localhost:5000
```

API base URL:

```text
http://localhost:5000/api
```

---

## ⚙️ Environment Variables

Environment variables should never be committed to Git.

Create:

```text
servicehub-backend/.env
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

Never commit:

```text
.env
.env.local
```

---

## 🔄 CI/CD

The project is designed for a production CI/CD workflow:

```text
Developer
    │
    ▼
Git Push
    │
    ▼
GitHub
    │
    ▼
GitHub Actions
    │
    ├── Install dependencies
    ├── Run checks
    ├── Build frontend
    ├── Build Docker images
    └── Push Docker images
              │
              ▼
       Docker Registry
              │
              ▼
          AWS EC2
              │
              ▼
      Docker Containers
              │
              ▼
           Nginx
              │
              ▼
         ServiceHub
```

---

## 🧪 Development

Frontend:

```bash
cd servicehub-frontend
npm install
npm start
```

Backend:

```bash
cd servicehub-backend
npm install
npm run dev
```

---

## 📌 Future Improvements

* Redis caching
* Real-time notifications
* Payment gateway integration
* Elasticsearch-based service search
* Automated testing
* Monitoring and logging
* Load balancing
* HTTPS with SSL
* Production domain
* Kubernetes deployment

---

## 👨‍💻 Project

**ServiceHub — On-Demand Service Marketplace**

A full-stack marketplace project focused on authentication, authorization, service management, booking workflows, cloud storage, containerization, and CI/CD.

````

---

# 2️⃣ Frontend `README.md`

Location:

```text
servicehub-frontend/README.md
````

# ServiceHub Frontend

The ServiceHub frontend is a React-based web application for the On-Demand Service Marketplace.

It provides interfaces for customers and service providers to interact with the ServiceHub platform.

---

## 🚀 Features

* User registration
* User login
* JWT authentication
* Customer dashboard
* Provider dashboard
* Service listing
* Service search
* Service filtering
* Service details
* Service creation
* Service editing
* Service deletion
* Booking management
* Reviews and ratings
* Role-based navigation
* Protected routes
* Responsive UI

---

## 🛠️ Technology Stack

* React.js
* React Router
* Tailwind CSS
* Axios
* JavaScript
* Create React App

---

## 📁 Project Structure

```text
servicehub-frontend/
│
├── public/
│
├── src/
│   ├── components/
│   │   ├── common/
│   │   └── layout/
│   │
│   ├── context/
│   │
│   ├── pages/
│   │
│   ├── services/
│   │   ├── api.js
│   │   └── authService.js
│   │
│   ├── App.js
│   └── index.js
│
├── .env
├── .gitignore
├── Dockerfile
├── nginx.conf
├── package.json
└── README.md
```

---

## 🔌 API Integration

The frontend communicates with the Express backend through Axios.

API configuration:

```text
src/services/api.js
```

Example:

```js
import axios from "axios";

const api = axios.create({
  baseURL:
    process.env.REACT_APP_API_URL ||
    "http://localhost:5000/api",
});

export default api;
```

Authentication services are handled through:

```text
src/services/authService.js
```

Example:

```js
registerUser()
loginUser()
logoutUser()
```

---

## 🔐 Authentication

The frontend uses JWT authentication.

After successful login:

```text
Login
  ↓
Backend validates credentials
  ↓
JWT returned
  ↓
Token stored in localStorage
  ↓
Axios interceptor adds token
  ↓
Protected API requests
```

Authorization header:

```text
Authorization: Bearer <token>
```

---

## 👥 Role-Based UI

The application supports:

### Customer

```text
/customer/dashboard
```

### Provider

```text
/provider/dashboard
```

The user's role determines the dashboard and available functionality.

---

## ⚙️ Environment Variables

Create:

```text
.env
```

Example:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

Do not commit `.env` to Git.

---

## 💻 Local Development

Install dependencies:

```bash
npm install
```

Start development server:

```bash
npm start
```

Application:

```text
http://localhost:3000
```

---

## 🐳 Docker

Build image:

```bash
docker build -t servicehub-frontend .
```

Run container:

```bash
docker run -p 3000:80 servicehub-frontend
```

The production image uses:

```text
React Build
    ↓
Nginx
    ↓
Port 80
```

---

## 🌐 Production Build

Create a production build:

```bash
npm run build
```

The build output is generated in:

```text
build/
```

---

## 🔄 Docker Compose

From the root project:

```bash
docker compose up -d --build
```

Frontend:

```text
http://localhost:3000
```

---

## 🧪 Testing

Before deployment, verify:

* Registration
* Login
* Logout
* Protected routes
* Customer dashboard
* Provider dashboard
* Service listing
* Service creation
* Service update
* Service deletion
* Booking flow
* API connectivity

---

## 📌 Future Improvements

* Better loading states
* Error boundaries
* Frontend unit tests
* E2E testing
* React performance optimization
* Progressive Web App support
* Real-time notifications

````

---

# 3️⃣ Backend `README.md`

Location:

```text
servicehub-backend/README.md
````

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

````
