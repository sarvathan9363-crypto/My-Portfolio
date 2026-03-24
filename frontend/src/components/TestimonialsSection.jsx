import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import TestimonialCard from "./TestimonialCard";

export default function TestimonialsSection() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    email: "",
    message: "",
    rating: 5,
  });
  const [isSubmitting, setIsSubmitting] = useState(false); // ✅ Added loading state
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(""); // ✅ Added error state
  const [hoveredStar, setHoveredStar] = useState(null);

  // ✅ Correct: VITE_API_URL must include https:// in your .env / Vercel env vars
  const API_URL = `${import.meta.env.VITE_API_URL || "https://my-portfolio-pgwb.onrender.com"}/api/feedback`;

  useEffect(() => {
    fetch(API_URL)
      .then((res) => {
        // ✅ Guard against HTML error pages
        const contentType = res.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Non-JSON response from server");
        }
        return res.json();
      })
      .then((data) => {
        if (data.success) setFeedbacks(data.feedbacks);
      })
      .catch((error) => console.error("Feedback fetch error:", error));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.role.trim() || !formData.message.trim()) return;
    if (isSubmitting) return; // ✅ Prevent double-submit

    setIsSubmitting(true);
    setError(""); // ✅ Clear previous error

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      // ✅ Guard against HTML error pages
      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error(`Server returned unexpected response (status ${res.status})`);
      }

      const data = await res.json();

      if (data.success) {
        setFeedbacks([data.feedback, ...feedbacks]);
        setFormData({ name: "", role: "", email: "", message: "", rating: 5 });
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 3500);
      } else {
        setError(data.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Feedback submit error:", error);
      setError("Failed to submit review. Please try again later.");
    }

    setIsSubmitting(false);
  };

  const fieldBase = {
    width: "100%",
    padding: "13px 16px",
    background: "rgba(0,0,0,0.4)",
    border: "1px solid rgba(185,28,28,0.25)",
    borderRadius: "12px",
    color: "rgba(220,220,220,0.9)",
    fontFamily: "'Outfit', sans-serif",
    fontSize: "14px",
    outline: "none",
    transition: "border-color 0.25s, box-shadow 0.25s",
  };

  const handleFocus = (e) => {
    e.target.style.borderColor = "rgba(212,175,55,0.55)";
    e.target.style.boxShadow = "0 0 0 3px rgba(212,175,55,0.06)";
  };
  const handleBlur = (e) => {
    e.target.style.borderColor = "rgba(185,28,28,0.25)";
    e.target.style.boxShadow = "none";
  };

  const displayRating = hoveredStar !== null ? hoveredStar : formData.rating;

  return (
    <section
      id="feedback"
      className="relative py-28 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #0e0505 0%, #080808 50%, #0e0505 100%)",
      }}
    >
      {/* Ambient glows */}
      <div
        className="absolute top-1/4 left-0 w-[400px] h-[400px] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(185,28,28,0.07) 0%, transparent 65%)",
        }}
      />
      <div
        className="absolute bottom-1/4 right-0 w-[350px] h-[350px] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(212,175,55,0.05) 0%, transparent 65%)",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6 lg:px-10">
        {/* ── Section header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex items-center gap-4 mb-3">
            <div
              className="w-10 h-px"
              style={{
                background: "linear-gradient(90deg, transparent, #b91c1c)",
              }}
            />
            <span
              className="text-xs tracking-[0.35em] uppercase font-semibold"
              style={{ color: "#d4af37", fontFamily: "'Outfit', sans-serif" }}
            >
              Feedback
            </span>
            <div
              className="flex-1 h-px"
              style={{
                background:
                  "linear-gradient(90deg, rgba(212,175,55,0.3) 0%, transparent 60%)",
              }}
            />
            <span
              className="text-xs font-medium"
              style={{
                color: "rgba(212,175,55,0.4)",
                fontFamily: "'Outfit', sans-serif",
              }}
            >
              {feedbacks.length} reviews
            </span>
          </div>

          <h2
            className="text-5xl font-bold"
            style={{
              fontFamily: "'Sora', sans-serif",
              background:
                "linear-gradient(135deg, #ffffff 0%, #f0f0f0 40%, #d4af37 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              lineHeight: 1.1,
            }}
          >
            Client
            <span
              style={{
                background: "linear-gradient(90deg, #b91c1c, #ef4444)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {" "}
              Feedback
            </span>
          </h2>
        </motion.div>

        {/* ── Submit form panel ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="relative rounded-2xl p-8 mb-10"
          style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(185,28,28,0.2)",
            backdropFilter: "blur(12px)",
            boxShadow:
              "0 8px 40px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.03)",
          }}
        >
          {/* Top shimmer */}
          <div
            className="absolute top-0 left-0 right-0 h-px rounded-t-2xl"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, #b91c1c 35%, #d4af37 50%, #b91c1c 65%, transparent 100%)",
            }}
          />

          {/* Panel header */}
          <div className="mb-6">
            <div
              className="w-8 h-0.5 mb-3 rounded-full"
              style={{
                background: "linear-gradient(90deg, #d4af37, transparent)",
              }}
            />
            <h3
              className="text-xl font-bold text-white"
              style={{ fontFamily: "'Sora', sans-serif" }}
            >
              Leave a Review
            </h3>
          </div>

          {/* Success banner */}
          {submitted && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-5 flex items-center gap-3 p-3.5 rounded-xl"
              style={{
                background: "rgba(34,197,94,0.06)",
                border: "1px solid rgba(34,197,94,0.22)",
                borderLeft: "3px solid rgba(34,197,94,0.55)",
              }}
            >
              <span
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{
                  background: "#22c55e",
                  boxShadow: "0 0 6px rgba(34,197,94,0.8)",
                }}
              />
              <span
                className="text-sm font-medium"
                style={{ color: "#4ade80", fontFamily: "'Outfit', sans-serif" }}
              >
                Thank you for your feedback! Check your email for a confirmation.
              </span>
            </motion.div>
          )}

          {/* ✅ Error banner */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-5 flex items-center gap-3 p-3.5 rounded-xl"
              style={{
                background: "rgba(239,68,68,0.07)",
                border: "1px solid rgba(239,68,68,0.25)",
                borderLeft: "3px solid #ef4444",
              }}
            >
              <span
                className="text-sm font-medium"
                style={{
                  color: "#f87171",
                  fontFamily: "'Outfit', sans-serif",
                }}
              >
                {error}
              </span>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name + Role */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label
                  className="block text-xs font-semibold mb-1.5"
                  style={{
                    color: "rgba(212,175,55,0.6)",
                    fontFamily: "'Outfit', sans-serif",
                    letterSpacing: "0.05em",
                  }}
                >
                  Your Name <span style={{ color: "#ef4444" }}>*</span>
                </label>
                <input
                  type="text"
                  placeholder="Full name"
                  value={formData.name}
                  style={fieldBase}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  required
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
              <div>
                <label
                  className="block text-xs font-semibold mb-1.5"
                  style={{
                    color: "rgba(212,175,55,0.6)",
                    fontFamily: "'Outfit', sans-serif",
                    letterSpacing: "0.05em",
                  }}
                >
                  Your Role <span style={{ color: "#ef4444" }}>*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Startup Founder"
                  value={formData.role}
                  style={fieldBase}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  required
                  onChange={(e) =>
                    setFormData({ ...formData, role: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Email — optional */}
            <div>
              <label
                className="block text-xs font-semibold mb-1.5"
                style={{
                  color: "rgba(212,175,55,0.6)",
                  fontFamily: "'Outfit', sans-serif",
                  letterSpacing: "0.05em",
                }}
              >
                Email Address
                <span
                  className="ml-1.5 font-normal"
                  style={{ color: "rgba(180,180,180,0.4)" }}
                >
                  (optional — receive a thank-you email)
                </span>
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                style={fieldBase}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>

            {/* Message */}
            <div>
              <label
                className="block text-xs font-semibold mb-1.5"
                style={{
                  color: "rgba(212,175,55,0.6)",
                  fontFamily: "'Outfit', sans-serif",
                  letterSpacing: "0.05em",
                }}
              >
                Your Feedback <span style={{ color: "#ef4444" }}>*</span>
              </label>
              <textarea
                placeholder="Share your experience working with Sarvathan..."
                value={formData.message}
                rows={4}
                style={{ ...fieldBase, resize: "none" }}
                onFocus={handleFocus}
                onBlur={handleBlur}
                required
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
              />
            </div>

            {/* Star rating */}
            <div
              className="flex items-center gap-4 px-4 py-3 rounded-xl"
              style={{
                background: "rgba(185,28,28,0.04)",
                border: "1px solid rgba(185,28,28,0.18)",
              }}
            >
              <span
                className="text-xs font-semibold flex-shrink-0"
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  color: "rgba(212,175,55,0.6)",
                  letterSpacing: "0.05em",
                }}
              >
                Rating
              </span>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => {
                  const filled = star <= displayRating;
                  return (
                    <button
                      key={star}
                      type="button"
                      onMouseEnter={() => setHoveredStar(star)}
                      onMouseLeave={() => setHoveredStar(null)}
                      onClick={() =>
                        setFormData({ ...formData, rating: Number(star) })
                      }
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        padding: "0 2px",
                        transform: filled ? "scale(1.2)" : "scale(1)",
                        filter: filled
                          ? "drop-shadow(0 0 5px rgba(212,175,55,0.8))"
                          : "none",
                        transition: "transform 0.15s, filter 0.15s",
                      }}
                    >
                      <svg
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        style={{ display: "block" }}
                      >
                        {filled ? (
                          <path
                            d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                            fill="#d4af37"
                            stroke="#d4af37"
                            strokeWidth="1"
                            strokeLinejoin="round"
                          />
                        ) : (
                          <path
                            d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                            fill="none"
                            stroke="rgba(185,28,28,0.35)"
                            strokeWidth="1.5"
                            strokeLinejoin="round"
                          />
                        )}
                      </svg>
                    </button>
                  );
                })}
              </div>
              <span
                className="text-sm font-bold tabular-nums"
                style={{ fontFamily: "'Sora', sans-serif", color: "#d4af37" }}
              >
                {displayRating}.0
              </span>
              <span
                className="text-xs"
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  color: "rgba(180,180,180,0.3)",
                }}
              >
                / 5.0
              </span>
            </div>

            {/* ✅ Submit button with loading state */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-7 py-3.5 rounded-xl text-sm font-semibold transition-all duration-300"
              style={{
                fontFamily: "'Outfit', sans-serif",
                background: isSubmitting
                  ? "rgba(185,28,28,0.25)"
                  : "linear-gradient(135deg, #991b1b 0%, #b91c1c 100%)",
                border: "1px solid rgba(185,28,28,0.5)",
                color: isSubmitting ? "rgba(255,255,255,0.4)" : "#fff",
                boxShadow: isSubmitting
                  ? "none"
                  : "0 4px 18px rgba(185,28,28,0.3)",
                cursor: isSubmitting ? "not-allowed" : "pointer",
                letterSpacing: "0.03em",
              }}
              onMouseEnter={(e) => {
                if (!isSubmitting) {
                  e.currentTarget.style.boxShadow =
                    "0 4px 28px rgba(185,28,28,0.55), 0 0 0 1px rgba(212,175,55,0.3)";
                  e.currentTarget.style.transform = "translateY(-1px)";
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 4px 18px rgba(185,28,28,0.3)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              {isSubmitting ? "Submitting…" : "Submit Review"}
            </button>
          </form>
        </motion.div>

        {/* ── Feedback cards grid ── */}
        <div className="grid md:grid-cols-2 gap-6">
          {feedbacks.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <TestimonialCard
                quote={item.message}
                name={item.name}
                role={item.role}
                rating={item.rating}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Section dividers */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(185,28,28,0.3) 30%, rgba(212,175,55,0.2) 50%, rgba(185,28,28,0.3) 70%, transparent 100%)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(185,28,28,0.3) 30%, rgba(212,175,55,0.2) 50%, rgba(185,28,28,0.3) 70%, transparent 100%)",
        }}
      />
    </section>
  );
}