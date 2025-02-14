import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { connectDB } from './src/config/db.js';
import { apiRouter } from './src/routes/index.js';

const app = express();
const port = process.env.PORT || 5007; // Use 5001 instead of 3000

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Connect to Database
connectDB();

// CORS Configuration
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5174","https://turf-booking-website-5h4nu5482-nandana-krishnas-projects.vercel.app"], // Allow both origins
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use((req, res, next) => {
  const allowedOrigins = ["http://localhost:5173", "http://localhost:5174"];
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin); // Dynamically set the origin
  }

  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});
// Routes
app.use("/api", apiRouter);

// Start Server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
