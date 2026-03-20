import Feedback from "../models/Feedback.js";
import {
  sendFeedbackNotificationToOwner,
  sendFeedbackThankYouToClient,
} from "../services/emailService.js";

export const createFeedback = async (req, res) => {
  try {
    const { name, role, message, rating, email } = req.body;

    if (!name || !role || !message) {
      return res.status(400).json({
        success: false,
        error: "Name, role and message are required.",
      });
    }

    const clampedRating = Math.min(5, Math.max(1, Number(rating) || 5));

    // Save to database
    const feedback = await Feedback.create({
      name,
      role,
      message,
      rating: clampedRating,
      email: email || null,
    });

    // Send emails concurrently — don't block response
    Promise.allSettled([
      sendFeedbackNotificationToOwner({ name, role, message, rating: clampedRating }),
      sendFeedbackThankYouToClient({ name, email, rating: clampedRating }),
    ]).then((results) => {
      results.forEach((result, i) => {
        if (result.status === "rejected") {
          console.error(
            `❌ Feedback email ${i === 0 ? "owner notification" : "client thank-you"} failed:`,
            result.reason?.message
          );
        }
      });
    });

    return res.status(201).json({
      success: true,
      message: "Feedback submitted! Thank you.",
      feedback,
    });

  } catch (error) {
    console.error("createFeedback error:", error.message);
    return res.status(500).json({
      success: false,
      error: "Something went wrong. Please try again.",
    });
  }
};

export const getFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find({
      approved: { $ne: false },
    }).sort({ createdAt: -1 });

    return res.status(200).json({ success: true, feedbacks });
  } catch (error) {
    console.error("getFeedbacks error:", error.message);
    return res.status(500).json({
      success: false,
      error: "Failed to fetch feedback.",
    });
  }
};

export const approveFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findByIdAndUpdate(
      req.params.id,
      { approved: true },
      { new: true }
    );

    if (!feedback) {
      return res.status(404).json({ success: false, error: "Feedback not found." });
    }

    return res.status(200).json({ success: true, feedback });
  } catch (error) {
    return res.status(500).json({ success: false, error: "Failed to approve feedback." });
  }
};