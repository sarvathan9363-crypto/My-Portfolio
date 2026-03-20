import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema(
  {
    name:    { type: String, required: true, trim: true },
    role:    { type: String, required: true, trim: true },
    message: { type: String, required: true, trim: true },
    rating:  { type: Number, required: true, min: 1, max: 5, default: 5 },
    email:   { type: String, trim: true, default: null },
    approved:{ type: Boolean, default: true },
  },
  { timestamps: true }
);

const Feedback = mongoose.model("Feedback", feedbackSchema);
export default Feedback;