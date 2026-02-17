# TaskNova - Advanced Task Management System

A full-stack task management application with advanced features including email notifications, dark/light theme, and real-time task tracking.

## 🌟 Features

### Authentication & Security
- 🔐 Secure JWT-based authentication system
- 🔒 Password hashing with bcrypt
- 🛡️ Protected routes and middleware
- 📱 Responsive design for all devices

### Task Management
- ✅ Full CRUD operations with enhanced forms
- 🔍 Real-time search functionality
- 🎯 Advanced filtering by priority, date, and status
- 📅 Due date management with visual indicators
- ⭐ Priority levels (High, Medium, Low)

### Notification System
- 📧 Automated email reminders (1 day before due date)
- 🔔 Internal browser notifications
- ⏰ Background scheduler

## 🛠️ Tech Stack

- **Frontend**: React, Vite, Tailwind CSS, Framer Motion
- **Backend**: Node.js, Express, MongoDB, JWT
- **Deployment**: Render (Backend), Any static hosting (Frontend)

## 🚀 Running Locally

1. **Clone and Install**
   ```bash
   git clone https://github.com/srinidhi9353/TaskNova.git
   cd TaskNova
   npm install # Installs dependencies for root, frontend, and backend if using workspaces, otherwise install separately
   ```

2. **Environment Setup**
   Create a `.env` file in `backend/` based on `.env.example`.

3. **Start Development Servers**
   ```bash
   # Backend
   cd backend
   npm run dev

   # Frontend
   cd frontend
   npm run dev
   ```

## 🌐 Deployment

### Backend Deployment (Render)
1. **Create a Render account** at render.com
2. **Create a new Web Service**
3. **Connect your GitHub repository**
4. **Configure the service:**
   - **Name**: tasknova-backend
   - **Runtime**: Node
   - **Build command**: `npm install`
   - **Start command**: `node server.js`
   - **Root directory**: `backend`
5. **Add environment variables** in Render dashboard:
   - `MONGO_URI`: your MongoDB connection string
   - `JWT_SECRET`: your JWT secret key
   - `EMAIL_USER`: your Gmail address
   - `EMAIL_PASS`: your Gmail App Password
   - `NODE_ENV`: production

### Frontend Deployment
The frontend can be deployed to platforms like Netlify, GitHub Pages, or Vercel.

## 📁 Project Structure

Values regarding the project structure...