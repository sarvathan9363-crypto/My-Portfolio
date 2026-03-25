import dotenv from "dotenv";
dotenv.config();

// ── Imports ────────────────────────────────────────────────────
import express from "express";
import cors from "cors";

import connectDB from "./config/db.js";
import messageRoutes from "./routes/messageRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import feedbackRoutes from "./routes/feedbackRoutes.js";
import errorHandler from "./middleware/errorMiddleware.js";

// ── Connect Database ───────────────────────────────────────────
connectDB();

// ── App ────────────────────────────────────────────────────────
const app = express();

// ── Allowed Origins ────────────────────────────────────────────
const allowedOrigins = [
  "http://localhost:5173",
  "https://my-portfolio-eight-topaz-35.vercel.app",
];

// ── CORS Configuration ─────────────────────────────────────────
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS not allowed"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// ── Middleware ─────────────────────────────────────────────────
app.use(express.json());

// ── Health Check Route (required for keep-alive ping) ──────────
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
});

// ── Root Route ─────────────────────────────────────────────────
app.get("/", (req, res) => {
  res.send("Portfolio Backend API is running...");
});

// ── Routes ─────────────────────────────────────────────────────
app.use("/api/messages", messageRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/feedback", feedbackRoutes);

// ── Error Middleware ───────────────────────────────────────────
app.use(errorHandler);

// ── Server Start ───────────────────────────────────────────────
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);

  // ── Keep Render awake (ping every 14 minutes) ──────────────
  // Render free tier sleeps after 15 min of inactivity.
  // This self-ping prevents cold starts.
  const RENDER_URL = "https://my-portfolio-pgwb.onrender.com";

  setInterval(async () => {
    try {
      const res = await fetch(`${RENDER_URL}/api/health`);
      const data = await res.json();
      console.log(`[Keep-Alive] Ping OK at ${data.timestamp}`);
    } catch (err) {
      console.log(`[Keep-Alive] Ping failed: ${err.message}`);
    }
  }, 14 * 60 * 1000); // every 14 minutes
});