import express from "express";
import { createMessage, getMessages } from "../controllers/messageController.js";

const router = express.Router();

router.post("/", (req, res, next) => {
  console.log("Message route hit");
  console.log(req.body);
  next();
}, createMessage);

router.get("/", getMessages);

export default router;