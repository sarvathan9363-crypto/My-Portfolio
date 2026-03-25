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
  "https://my-portfolio-eight-topaz-35.vercel.app"
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

// ── Routes ─────────────────────────────────────────────────────
app.use("/api/messages", messageRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/feedback", feedbackRoutes);

// ── Root Route ────────────────────────────────────────────────
app.get("/", (req, res) => {
  res.send("Portfolio Backend API is running...");
});

// ── Error Middleware ───────────────────────────────────────────
app.use(errorHandler);

// ── Server Start ───────────────────────────────────────────────
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});