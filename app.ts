import express from 'express';
import 'express-async-errors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors, { CorsOptions } from 'cors';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import { v2 as cloudinary } from 'cloudinary';
// ROUTERS
import authRouter from './routes/auth.js';
import jobRouter from './routes/job.js';
import userRouter from './routes/user.js';
// Middlewares
import errorHandlerMiddleware from './middlewares/errorHandler.js';
import { authenticateUser } from './middlewares/auth.js';
// Access .env files
dotenv.config();
// Create HTTP Server
const app = express();
// Cors
// Allowed front-end origins, comma-separated in CLIENT_URL (e.g. "https://jobify.vercel.app,http://localhost:5173")
const allowedOrigins = (
  process.env.CLIENT_URL || 'https://jobify-e5da.onrender.com,http://localhost:5173'
)
  .split(',')
  .map((origin) => origin.trim());
const corsOptions: CorsOptions = {
  origin: allowedOrigins,
  credentials: true,
};
app.use(cors(corsOptions));
// Security Packages
app.use(helmet());
app.use(mongoSanitize());
// Setting up Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});
// Morgan Middleware for Development
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));
// Body Parser
app.use(express.json());
// Cookies Parser
app.use(cookieParser());
// API Routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', authenticateUser, jobRouter);
app.use('/api/v1/users', authenticateUser, userRouter);
// NOT FOUND Handler
app.use('*', (req, res, next) => {
  res.status(404).json({ message: 'Route not found.' });
});
// Global Error Handler
app.use(errorHandlerMiddleware);
// Connect to Database and Start listening
try {
  await mongoose.connect(process.env.MONGO_URI!);
  const port = process.env.PORT || 5000;
  app.listen(port, () =>
    console.log(`Server started listening on PORT ${port}...`)
  );
} catch (error) {
  console.log(error);
  process.exit(1);
}
