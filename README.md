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
- 📝 Rich task descriptions
- ✅ Task completion toggling

### Notification System
- 📧 Automated email reminders (1 day before due date)
- 🔔 Internal browser notifications with bell icon
- ⏰ Background scheduler running every hour
- 🎛️ User-controlled email preferences
- 📨 Professional HTML email templates

### UI/UX Experience
- 🌗 Dark/light theme toggle with persistence
- 🪟 Glassmorphism design with smooth animations
- 🎨 Modern, responsive interface
- 🖱️ Interactive filtering panel
- 📱 Mobile-friendly layout
- 🎭 Framer Motion animations

## 🛠️ Tech Stack

### Frontend
- **React** (v18.2.0) - JavaScript library for building user interfaces
- **Vite** (v5.1.4) - Next generation frontend tooling
- **Tailwind CSS** (v3.4.1) - Utility-first CSS framework
- **React Router** (v6.21.3) - Declarative routing for React
- **Framer Motion** (v11.0.3) - Production-ready animation library
- **Axios** (v1.6.7) - Promise based HTTP client
- **React Icons** (v5.0.1) - SVG icons for React projects
- **Lucide React** (v0.564.0) - Beautifully simple, consistent icons
- **React Toastify** (v10.0.4) - Highly customizable toast alerts

### Backend
- **Node.js** - JavaScript runtime environment
- **Express** (v5.2.1) - Fast, unopinionated, minimalist web framework for Node.js
- **MongoDB** (Mongoose v9.2.1) - NoSQL database with official MongoDB object modeling
- **JSON Web Tokens (JWT)** (v9.0.3) - Secure way to transmit information between parties
- **bcryptjs** (v3.0.3) - Library for hashing passwords
- **Dotenv** (v17.3.1) - Loads environment variables from .env file
- **CORS** (v2.8.6) - Enable Cross-Origin Resource Sharing
- **Helmet** (v8.1.0) - Helps secure Express apps with various HTTP headers
- **express-async-handler** - Wrapper to catch async errors in Express
- **Validator** - String validation and sanitization library
- **Node-cron** (v3.0.3) - Cron-like job scheduler for Node.js
- **Nodemailer** (v6.9.16) - Module for sending emails from Node.js applications
- **Googleapis** (v145.0.0) - Google APIs client library for OAuth2 support

## 🔧 Methods and Operations

### Authentication System
- **JWT-based Authentication** - Secure token-based authentication system
- **Password Hashing** - Uses bcrypt for secure password storage
- **Protected Routes** - Middleware to protect routes that require authentication
- **User Registration** - Secure sign-up with validation and password hashing
- **User Login** - Secure authentication with credential validation
- **Profile Management** - Ability to update user details

### Task Management System
- **CRUD Operations** - Create, Read, Update, Delete tasks with enhanced forms
- **User Authorization** - Ensures users can only access their own tasks
- **Real-time Search** - Server-side regex search functionality
- **Advanced Filtering** - Filter by priority level, date range, and completion status
- **Enhanced Task Creation** - Form with title, description, priority, and due date fields
- **Data Validation** - Comprehensive validation for all inputs

### Notification System
- **Email Configuration** - Gmail integration with App Password authentication
- **User Preferences** - Toggle email notifications on/off per user
- **Professional Email Templates** - Beautiful HTML email designs with task details
- **Gmail Integration** - Secure SMTP with App Password authentication

### Security Measures
- **Input Sanitization** - Prevents injection attacks
- **JWT Verification** - Secure token verification process
- **Password Encryption** - Strong password hashing with bcrypt
- **HTTP Security Headers** - Implemented with Helmet middleware
- **CORS Protection** - Configured to prevent unauthorized cross-origin requests

## 📁 Folder Structure

```
fullstack-app/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── taskController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── Task.js
│   │   └── User.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── taskRoutes.js
│   ├── services/
│   │   ├── emailService.js
│   │   └── reminderService.js
│   ├── .env
│   ├── .env.example
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/
│   │   │   │   ├── Button.jsx
│   │   │   │   ├── Card.jsx
│   │   │   │   └── Input.jsx
│   │   │   ├── PrivateRoute.jsx
│   │   │   └── TaskItem.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Profile.jsx
│   │   │   └── Register.jsx
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.js
│   └── tailwind.config.js
├── README.md
└── postman_collection.json
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account
- Gmail account with App Password (for email notifications)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/srinidhi9353/TaskNova.git
   cd TaskNova
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Configure environment variables**

   Create a `.env` file in the `backend` directory with the following variables:

   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   NODE_ENV=development

   # Email Configuration (Required for Notifications)
   EMAIL_USER=your_gmail_address@gmail.com
   EMAIL_PASS=your_gmail_app_password
   ```

   For the `.env.example` file:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   NODE_ENV=development

   # Email Configuration (Required for Notifications)
   EMAIL_USER=your_gmail_address@gmail.com
   EMAIL_PASS=your_gmail_app_password
   ```

### Email Configuration (Required for Notifications)

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate App Password**:
   - Go to Google Account → Security → 2-Step Verification → App passwords
   - Select "Mail" and generate a 16-character password
3. **Update .env file** with the generated App Password

### Running the Application

1. **Start the backend server**
   ```bash
   cd backend
   npm run dev
   ```

2. **Start the frontend server**
   ```bash
   cd frontend
   npm run dev
   ```

3. **Open your browser** and visit `http://localhost:5173`

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `PUT /api/auth/profile` - Update user profile
- `GET /api/auth/profile` - Get user profile

### Tasks
- `GET /api/tasks` - Get all tasks (with optional filters)
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task

## 📧 Email Notifications

The application includes an automated email reminder system that runs every hour. It will send email notifications to users for tasks due the next day.

## 🎨 Customization

### Theme Toggle
The application includes a theme toggle that allows users to switch between light and dark modes. The theme preference is saved in localStorage.

### Task Priorities
Tasks can be assigned one of three priority levels:
- High (red indicator)
- Medium (yellow indicator)
- Low (green indicator)

## 🔒 Security Features

- Passwords are hashed using bcrypt before being stored in the database
- JWT tokens are used for authentication and are stored in localStorage
- Input validation and sanitization are implemented on both frontend and backend
- CORS is configured to prevent unauthorized cross-origin requests
- HTTP security headers are implemented using Helmet

## 📊 Data Models

### User Model
- name (String, required)
- email (String, required, unique)
- password (String, required)
- emailNotifications (Boolean, default: true)

### Task Model
- title (String, required)
- description (String)
- priority (String, enum: ['low', 'medium', 'high'], default: 'medium')
- dueDate (Date)
- completed (Boolean, default: false)
- reminderSent (Boolean, default: false)
- user (ObjectId, ref: 'User', required)

## 🛠️ Development

### Running Tests
```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

### Building for Production
```bash
# Backend
cd backend
npm run build

# Frontend
cd frontend
npm run build
```

## 🚀 Deployment

### Frontend Deployment (Vercel)
The frontend can be easily deployed to Vercel with zero configuration.

#### Deploying to Vercel
1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

4. **Deploy to Vercel**
   ```bash
   vercel --prod
   ```

5. **Set environment variables in Vercel dashboard**
   - Go to your project settings in Vercel
   - Add environment variable: `VITE_API_URL` with your backend URL
   - Example: `https://your-backend.onrender.com/api` or `https://your-fly-app.fly.dev/api`

### Backend Deployment
The backend can be deployed to platforms like Heroku, Render, Railway, or Fly.io.

#### Deploying to Render (Recommended for backend)
1. **Create a Render account** at render.com
2. **Create a new Web Service**
3. **Connect your GitHub repository**
4. **Set build command**: `npm install`
5. **Set start command**: `node server.js`
6. **Add environment variables** in Render dashboard:
   - `MONGO_URI`: your MongoDB connection string
   - `JWT_SECRET`: your JWT secret key
   - `EMAIL_USER`: your Gmail address
   - `EMAIL_PASS`: your Gmail App Password
   - `NODE_ENV`: production

### Production Scaling Notes

For production deployment, consider the following optimizations:

- **Database**: Upgrade to a production-tier MongoDB Atlas cluster with backups and monitoring
- **Email Service**: Migrate from Gmail to a dedicated email service like SendGrid or AWS SES for better deliverability and rate limits
- **Security**: Implement rate limiting, add more comprehensive input validation, and set up proper logging
- **Performance**: Add caching mechanisms (Redis), optimize database queries, and implement CDN for static assets
- **Monitoring**: Set up error tracking and performance monitoring services
- **Vercel Specific**: Use Vercel's built-in features like Edge Functions, Image Optimization, and Analytics

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

If you have any questions or need help, please contact us at [your-email@example.com](mailto:your-email@example.com).

---

Made with ❤️ by Srinidhi