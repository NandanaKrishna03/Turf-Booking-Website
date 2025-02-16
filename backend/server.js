import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./src/config/db.js";
import { apiRouter } from "./src/routes/index.js";

const app = express();
app.use(express.json());
app.use(cookieParser());

const allowedOrigins = [
  "http://localhost:5173",
  "https://turf-booking-website-frontend.vercel.app",
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true, // Allows cookies to be sent
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // ✅ Ensuring PUT & DELETE are allowed
  allowedHeaders: ["Content-Type", "Authorization"],
}));

// ✅ Handle preflight requests properly
app.options("*", (req, res) => {
  res.header("Access-Control-Allow-Origin", allowedOrigins.includes(req.headers.origin) ? req.headers.origin : "");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.sendStatus(200);
});

const port = process.env.PORT || 5007; // Use 5007 instead of 3000

// Connect to Database
connectDB();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Routes
app.use("/api", apiRouter);

// Start Server
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
