# TypeRush - MERN Typing Speed Test

A full-stack typing speed test application built with the MERN stack (MongoDB, Express.js, React, Node.js) using Vite for the frontend and featuring real-time WPM calculation, user authentication, and personal records tracking.

## Features

- Real-time typing speed calculation (WPM)
- Live accuracy tracking
- 30-second typing tests
- Personal best WPM tracking
- User authentication (register/login)
- Modern UI with CSS
- Responsive design
- Random text snippets for varied tests

## Tech Stack

### Frontend
- React 18
- Vite (development server)
- CSS (styling)
- Axios (API calls)
- Context API (state management)

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT authentication
- bcryptjs (password hashing)
- CORS enabled

## Project Structure

```
typerush/
├── backend/
│   ├── models/
│   │   └── User.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── users.js
│   │   └── texts.js
│   ├── middleware/
│   │   └── auth.js
│   ├── server.js
│   ├── package.json
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Auth.jsx
│   │   │   ├── Header.jsx
│   │   │   └── TypingTest.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── utils/
│   │   │   └── typingUtils.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   └── vite.config.js
└── package.json (root)
```

## Installation & Setup

### Prerequisites
- Node.js (v20.19+ recommended)
- MongoDB Atlas account or local MongoDB installation
- Git

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/typerush.git
cd typerush
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment Configuration
Create a `.env` file in the `backend` directory by copying from the example:
```bash
cd backend
cp .env.example .env
```

Edit the `.env` file with your actual values:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/typerush?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_here
PORT=5000
NODE_ENV=development
```

**Important:** 
- Replace `username` and `password` with your MongoDB Atlas credentials
- Generate a strong JWT secret (recommended: 32+ characters)
- Never commit the `.env` file to version control

### 4. Start the application
```bash
npm run dev
```

This will start:
- Backend server: http://localhost:5000
- Frontend server: http://localhost:3000

## Project Structure
- Node.js (v16 or higher)
- MongoDB Atlas account (or local MongoDB)
- Git

### 1. Clone and Install Dependencies

```bash
npm install
npm run install-server
npm run install-client
```

### 2. Environment Configuration

Create a `.env` file in the `backend` folder with:

```env
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/typerush?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_here_make_it_very_long_and_random_for_security
```

Replace the MongoDB URI with your actual connection string from MongoDB Atlas.

### 3. MongoDB Atlas Setup

1. Create a free account at MongoDB Atlas (https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Create a database user with username and password
4. Whitelist your IP address (or use 0.0.0.0/0 for all IPs during development)
5. Get your connection string from the "Connect" button
6. Replace the MONGO_URI in your .env file

### 4. Running the Application

```bash
npm run dev
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/wpm` - Update user's highest WPM

### Texts
- `GET /api/texts/random` - Get random text for typing test
- `GET /api/texts/all` - Get all available texts

## Usage

1. Register/Login: Create an account or login with existing credentials
2. Start Typing: Begin typing the displayed text to start the 30-second timer
3. Real-time Feedback: See your WPM and accuracy update in real-time
4. Track Progress: Your highest WPM is automatically saved and displayed
5. Try Again: Click "Try Again" to start a new test with different text

## Features in Detail

### Typing Test
- 30-second duration
- Real-time WPM calculation
- Character-by-character feedback (correct/incorrect highlighting)
- Accuracy percentage tracking
- Automatic new record detection and saving

### User Authentication
- Secure JWT-based authentication
- Password hashing with bcrypt
- Persistent login sessions
- Protected API routes

### Responsive Design
- Mobile-friendly interface
- Clean, modern UI with CSS
- Color-coded text feedback
- Intuitive user experience

## Development Scripts

```bash
npm run dev              # Run both frontend and backend
npm run server          # Run backend only
npm run client          # Run frontend only
npm run install-server  # Install backend dependencies
npm run install-client  # Install frontend dependencies
npm run install-all     # Install all dependencies
npm run build           # Build frontend for production
npm start               # Start backend in production
```

## Deployment

### Frontend (Vercel/Netlify)
1. Build the frontend:
   ```bash
   cd frontend && npm run build
   ```
2. Deploy the `dist` folder to your hosting service

### Backend (Heroku/Railway/Render)
1. Set environment variables on your hosting platform
2. The backend is ready to deploy as-is

### Environment Variables for Production
- `MONGODB_URI`: Your MongoDB connection string
- `JWT_SECRET`: A secure JWT secret key
- `NODE_ENV`: Set to "production"
- `PORT`: Will be set automatically by most hosting services

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License
