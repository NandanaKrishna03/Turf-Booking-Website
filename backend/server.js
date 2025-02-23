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

// ✅ Use cors middleware (no need for manual headers)
app.use(cors({
  origin: allowedOrigins,
  credentials: true, 
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

const port = process.env.PORT || 5005;

// ✅ Connect to Database
connectDB()
  .then(() => console.log("✅ Database connected successfully"))
  .catch((err) => {
    console.error("❌ Database connection failed:", err);
    process.exit(1); // Stop the server if DB fails
  });

// ✅ Test API Endpoint
app.get("/", (req, res) => {
  res.send("Hello from Backend!");
});

// ✅ Routes
app.use("/api", apiRouter);

// ✅ Start Server
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
