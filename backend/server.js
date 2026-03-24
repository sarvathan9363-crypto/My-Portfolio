import dotenv from "dotenv";
dotenv.config();

// ── Imports ────────────────────────────────────────────────────
import express from "express";
import cors from "cors";

import connectDB from "./config/db.js";
import messageRoutes from "./routes/messageRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import errorHandler from "./middleware/errorMiddleware.js";
import feedbackRoutes from "./routes/feedbackRoutes.js";

// ── DB ─────────────────────────────────────────────────────────
connectDB();

// ── App ────────────────────────────────────────────────────────
const app = express();

// ── CORS ───────────────────────────────────────────────────────
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://my-portfolio-eight-topaz-35.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

app.use(express.json());

// ── Routes ─────────────────────────────────────────────────────
app.use("/api/messages", messageRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/feedback", feedbackRoutes);

app.get("/", (req, res) => {
  res.send("Portfolio Backend API is running...");
});

app.use(errorHandler);

// ── Server ─────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});