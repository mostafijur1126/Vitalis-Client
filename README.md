# 💪 Vitalis - Fitness & Gym Management Platform

Vitalis is a modern full-stack fitness and gym management platform that connects fitness enthusiasts, trainers, and administrators in one place. Users can explore fitness classes, book sessions securely with Stripe, participate in the community forum, and manage their fitness journey. Trainers can create classes and share knowledge, while administrators oversee the entire platform.

---

## 🌐 Live Demo

### Client

https://vitalis-client-pi.vercel.app

### Server

https://vitalis-server.vercel.app

---

## 🔗 GitHub Repository

### Client Repository

https://github.com/your-username/vitalis-client

### Server Repository

https://github.com/your-username/vitalis-server

> Replace the repository links with your actual GitHub repositories.

---

# ✨ Key Features

- 🔐 Secure authentication using Better Auth
- 🔑 JWT authentication with HTTPOnly Cookies
- 👤 Role-based Dashboard (User, Trainer, Admin)
- 💳 Stripe Payment Integration
- 🏋️ Browse and search fitness classes
- ❤️ Add or remove favorite classes
- 📅 Book fitness classes securely
- 📝 Trainer application system
- 📢 Community Forum with Like, Dislike & Comments
- 🧑‍🏫 Trainer class management
- 📊 Dashboard statistics
- 👨‍💼 Admin user management
- ✅ Approve/Reject trainer applications
- 📚 Manage fitness classes
- 📄 Pagination for Classes and Forum
- 🔍 Search & Category Filter
- 📱 Fully Responsive Design
- 🎨 Modern UI with Tailwind CSS & DaisyUI
- ⚡ Loading Skeletons & Custom 404 Page

---

# 👥 User Roles

## User

- Register/Login
- Browse classes
- Book classes
- Save favorite classes
- Apply as Trainer
- Read and interact in Community Forum
- Manage bookings & favorites

---

## Trainer

- Create fitness classes
- Update/Delete own classes
- View enrolled students
- Create forum posts
- Manage own forum posts

---

## Admin

- Manage users
- Block/Unblock users
- Promote users to Admin
- Approve/Reject trainer applications
- Manage trainers
- Manage classes
- Manage forum posts
- View Stripe transactions

---

# 🛠️ Technologies Used

## Frontend

- Next.js
- React
- Tailwind CSS
- DaisyUI
- Framer Motion
- React Hook Form
- React Hot Toast
- Axios
- Better Auth
- Stripe
- React Icons

---

## Backend

- Node.js
- Express.js
- MongoDB
- JWT
- Better Auth
- Stripe
- CORS
- Cookie Parser
- Dotenv

---

# 📦 NPM Packages

### Client

```bash
next
react
tailwindcss
daisyui
better-auth
axios
react-hook-form
react-hot-toast
framer-motion
react-icons
@stripe/react-stripe-js
@stripe/stripe-js
```

### Server

```bash
express
mongodb
jsonwebtoken
better-auth
stripe
cors
dotenv
cookie-parser
```

---

# 📁 Project Structure

```
client/
│
├── app/
├── components/
├── hooks/
├── lib/
├── providers/
├── public/
└── styles/

server/
│
├── middleware/
├── routes/
├── utils/
├── config/
└── index.js
```

# 🚀 Installation

## Clone the repositories

```bash
git clone <client_repository>

git clone <server_repository>
```

---

## Install dependencies

### Client

```bash
cd client
npm install
```

### Server

```bash
cd server
npm install
```

---

## Run the development server

### Backend

```bash
npm run dev
```

### Frontend

```bash
npm run dev
```

---

# 💳 Payment

Stripe is used for secure class booking payments.

After successful payment:

- Booking is saved to the database
- User is redirected to Dashboard
- Booking count is updated automatically

---

# 🔐 Authentication

- Better Auth
- Google Login
- Email & Password Login
- JWT Token
- HTTPOnly Cookie Authentication
- Protected Routes
- Role-based Authorization

---

# 📊 Dashboard Features

### User Dashboard

- Overview
- Booked Classes
- Favorite Classes
- Apply as Trainer

### Trainer Dashboard

- Overview
- Add Class
- My Classes
- Add Forum Post
- My Forum Posts

### Admin Dashboard

- Overview
- Manage Users
- Applied Trainers
- Manage Trainers
- Manage Classes
- Transactions
- Forum Management

---

# 📱 Responsive Design

The application is fully responsive across:

- Mobile
- Tablet
- Laptop
- Desktop

---

# ⭐ Future Improvements

- Dark/Light Theme
- Push Notifications
- Email Notifications
- Advanced Analytics
- Trainer Ratings
- Fitness Progress Tracking

---

# 👨‍💻 Developed By

**Mostafijur Rahman**

Full Stack Developer

---

## ⭐ If you like this project, don't forget to give it a star!
