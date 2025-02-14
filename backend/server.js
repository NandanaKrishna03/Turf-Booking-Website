import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { connectDB } from './src/config/db.js';
import { apiRouter } from './src/routes/index.js';

const app = express();
app.use(express.json());

const allowedOrigins = [
  "http://localhost:5173",
  "https://turf-booking-website-frontend.onrender.com"
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  
}));

app.use(cookieParser());
const port = process.env.PORT || 5007; // Use 5007 instead of 3000

connectDB();

app.get("/", (req, res) => {
  res.send("Hello World!");
});
// Routes
app.use("/api", apiRouter);

// Start Server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
