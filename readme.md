# 💬 Real-Time Chat Application

A full-stack real-time chat application built with **React**, **Zustand**, **Socket.IO**, and **MongoDB (via Prisma)**. It allows users to register, log in, send messages instantly, and see read receipts ("seen" status). This app also handles profile pictures, email verification, and responsive design.

---

## 🧰 Tech Stack

### Frontend
- ⚛️ React 18
- 🔁 **TanStack React Query** (data fetching & caching)
- 🧠 Zustand (state management)
- 🔌 Socket.IO Client
- 🧭 React Router
- 📦 Axios
- 🎨 Tailwind CSS
- 🧮 Formik + Yup (form validation)
- 📅 Moment.js
- 🔔 React Toastify
- 🧪 TypeScript

### Backend
- 🚀 Express.js
- 📦 Prisma ORM (MongoDB)
- 🔐 JWT (authentication)
- 🔑 Bcrypt (password hashing)
- 📧 Nodemailer (email verification)
- 🌩️ Cloudinary (profile image upload)
- 🔌 Socket.IO
- 🧪 Zod (schema validation)

---

## 📄 Project Description
This project is a full-stack real-time chat application designed to offer a complete and modern messaging experience. It includes user authentication, real-time communication, error handling, and offline capabilities.

---

## ✅ Main Features

### 🔐 Authentication & Validation
- Displays user-friendly error messages for invalid emails or passwords.
- Prevents registration if a user already exists.
- Secure login and registration using JWT.

### 📧 Email Verification
- After registration, a verification email is automatically sent to activate the account.
- Unverified users cannot access the chat interface.

### 🧑‍💻 User Profile
- Users can upload and update their profile picture via Cloudinary.
- Users can also update their status message or bio in real time.

### 💬 Real-Time Chat (Socket.IO)
- Instantly send and receive messages with full-duplex communication.
- Visual indicator for unread messages.
- Messages are marked as seen when the recipient views them.

### 🔁 Password Reset
- Forgot password functionality allows users to reset their password securely via email.

### ⚙️ PWA (Progressive Web App)
- The application is installable on any device (desktop, mobile, tablet).
- Works offline with service workers and responsive design.
- Looks and feels like a native app when installed.

- ✅ User registration & login
- ✉️ Real-time messaging (Socket.IO)
- 👁️ Message seen indicator
- 📩 Email verification system
- 📷 Profile picture upload (Cloudinary)
- 🔒 Authentication with JWT
- 🧠 Zustand for local state management
- 📁 File upload with Multer
- 🧪 TypeScript (frontend + backend)

---
## 🚀 Getting Started

### 1. Clone the repository

```
git clone https://github.com/Saadaoui-Forkan/WhatsApp-clone.git
cd chat-app 
```
### 2. Setup Backend
```
cd backend
npm i
cp .env.example .env
```
create __.env__ 
```
NODE_ENV=
DATABASE_URL=
PORT=8000
ACCESS_TOKEN_SECRET=
ACCESS_TOKEN_SECRET_EXPIRES_IN=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

EMAIL_ADDRESS=
EMAIL_PASSWORD=

CLIENT_DEVELOPMENT_DOMAIN=
CLIENT_PRODUCTION_DOMAIN=
```

__Then__
```
npx prisma generate
npx prisma db push
npm run server
```

### 3. Setup Frontend
```
cd frontend
npm install
npm start
```

update __.env__
```
REACT_APP_API_URL=http//http://localhost:8000/api
REACT_APP_BACKEND_URL=http//http://localhost:8000
```

