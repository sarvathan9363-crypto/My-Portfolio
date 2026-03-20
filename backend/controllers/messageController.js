import Message from "../models/Message.js";
import {
  sendContactNotificationToOwner,
  sendContactConfirmationToClient,
} from "../services/emailService.js";

// ── POST /api/messages ────────────────────────────────────────
export const createMessage = async (req, res) => {
  try {
    const { name, email, projectType, message } = req.body;

    if (!name || !email || !projectType || !message) {
      return res.status(400).json({
        success: false,
        error: "Name, email, project type and message are required.",
      });
    }

    // 1. Save to database
    const newMessage = await Message.create({ name, email, projectType, message });

    // 2. Send emails concurrently (don't block response if email fails)
    Promise.allSettled([
      sendContactNotificationToOwner({ name, email, projectType, message }),
      sendContactConfirmationToClient({ name, email, projectType }),
    ]).then((results) => {
      results.forEach((result, i) => {
        if (result.status === "rejected") {
          console.error(
            `❌ Email ${i === 0 ? "owner notification" : "client confirmation"} failed:`,
            result.reason?.message
          );
        }
      });
    });

    return res.status(201).json({
      success: true,
      message: "Message received! You'll get a confirmation email shortly.",
      data: newMessage,
    });

  } catch (error) {
    console.error("createMessage error:", error.message);
    return res.status(500).json({
      success: false,
      error: "Something went wrong. Please try again.",
    });
  }
};

// ── GET /api/messages ─────────────────────────────────────────
export const getMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    return res.status(200).json({ success: true, messages });
  } catch (error) {
    console.error("getMessages error:", error.message);
    return res.status(500).json({ success: false, error: "Failed to fetch messages." });
  }
};