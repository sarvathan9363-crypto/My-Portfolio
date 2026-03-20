import express from "express";
import {
createFeedback,
getFeedbacks,
approveFeedback
} from "../controllers/feedbackController.js";

const router = express.Router();

router.get("/", getFeedbacks);
router.post("/", createFeedback);
router.patch("/:id/approve", approveFeedback);

export default router;
