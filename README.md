# 🛒 Ecom-Site

A modern full-stack E-Commerce web application built using the MERN stack. The application provides a seamless shopping experience with secure authentication, role-based admin access, product management, cart functionality, wishlist, and order management.

---

## 🚀 Tech Stack

### Frontend
- React.js
- Vite
- Tailwind CSS
- React Router DOM
- Axios
- Context API

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- Bcrypt.js

### Tools
- Git & GitHub
- VS Code
- Postman
- MongoDB Atlas

---

# ✨ Features

## User Features

- User Registration & Login
- JWT Authentication
- Browse Products
- Search & Filter Products
- Add to Cart
- Update Cart Quantity
- Remove from Cart
- Wishlist / Favorites
- Place Orders
- View Order History
- Responsive UI

---

## Admin Features

- Secure Admin Login
- Add Products
- Update Products
- Delete Products
- View All Users
- Update User Roles
- Delete Users
- Protected Admin Routes

---

# 📂 Project Structure

```
ecom-site
│
├── src
│   ├── assets
│   ├── components
│   ├── context
│   ├── pages
│   ├── App.jsx
│   └── main.jsx
│
├── server
│   ├── config
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── data
│   ├── .env
│   ├── package.json
│   ├── seed.js
│   └── server.js
│
├── package.json
├── vite.config.js
└── README.md
```

---

# 📦 Installation

## 1. Clone Repository

```bash
git clone https://github.com/Vansh078/ecom-site.git
cd ecom-site
```

---

## 2. Install Frontend Dependencies

```bash
npm install
```

---

## 3. Install Backend Dependencies

```bash
cd server
npm install
```

---

# ⚙️ Environment Variables

Create a **server/.env** file

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

DB_NAME=ecom-site

JWT_SECRET=your_secret_key
```

---

If needed, create a **.env** file in the frontend root.

```env
VITE_API_URL=`${import.meta.env.VITE_API_URL}`
```

---

# ▶️ Running the Project

### Start Backend

```bash
cd server
npm run dev
```

Runs on

```
http://localhost:5000
```

---

### Start Frontend

```bash
npm run dev
```

Runs on

```
http://localhost:5173
```

---

# 🌱 Seed Database

To insert sample products and create the default admin account:

```bash
cd server
node seed.js
```

Default Admin Credentials

```
Email:
admin

Password:
admin
```

---

# 🔐 Authentication

The application uses:

- JWT Authentication
- Password Hashing using Bcrypt
- Protected Routes
- Role-Based Authorization (Admin/User)

---

# 📡 API Endpoints

## Authentication

| Method | Endpoint |
|----------|------------------------|
| POST | /api/auth/signup |
| POST | /api/auth/signin |

---

## Products

| Method | Endpoint |
|----------|--------------------------|
| GET | /api/products |
| GET | /api/products/:id |
| POST | /api/products |
| PUT | /api/products/:id |
| DELETE | /api/products/:id |

---

## Users (Admin)

| Method | Endpoint |
|----------|-----------------------|
| GET | /api/users |
| PUT | /api/users/:id |
| DELETE | /api/users/:id |

---

## Orders

| Method | Endpoint |
|----------|------------------------------|
| POST | /api/orders |
| GET | /api/orders/my-orders |
| GET | /api/orders/:id |

---

# 🖥️ Screenshots

Add screenshots here after deployment.

```
Home Page

Login Page

Admin Dashboard

Cart

Wishlist

Order History
```

---

# 🚀 Deployment

| Service | Status |
|----------|---------|
| Frontend | Vercel |
| Backend | Render |
| Database | MongoDB Atlas |

---

# 🔮 Future Improvements

- Razorpay / Stripe Payment Integration
- Product Reviews
- Product Ratings
- Image Upload using Cloudinary
- Pagination
- Coupons & Discounts
- Sales Dashboard
- Email Notifications
- Order Tracking

---

# 👨‍💻 Contributors

| Name | Role |
|------|------|
| **Vaishnavi Kharwade** | Frontend Developer |
| **Vansh** | Backend Developer |

---

# 📄 License

This project is licensed under the MIT License.

---

# ⭐ Support

If you found this project helpful, please consider giving it a ⭐ on GitHub.