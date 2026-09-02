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

```
```
