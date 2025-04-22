// index.js
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import guestRoutes from "./routes/guestRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();

// ✅ CORS Setup: Allow Vercel frontend (replace with your real Vercel domain later)
app.use(
  cors({
    origin: ["http://localhost:5173", "https://jayrmira.netlify.app"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ✅ Body Parser Middleware
app.use(express.json());

// ✅ MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ Root Route (for Render health check)
app.get("/", (req, res) => {
  res.send("🎉 Wedding API is running on Render!");
});

// ✅ API Routes
app.use("/api/guests", guestRoutes);
app.use("/api/users", userRoutes);

// ✅ Port (support Render auto-assigning PORT)
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
