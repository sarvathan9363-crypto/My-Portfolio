import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Send, CheckCircle } from "lucide-react";
import api from "../utils/api";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await api.post("/messages", formData);
      if (response.data.success) {
        setSubmitted(true);
        setFormData({ name: "", email: "", projectType: "", message: "" });
        setTimeout(() => setSubmitted(false), 4000);
      } else {
        setError(response.data.message || "Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error("Submit error:", err);
      setError("Failed to send message. Please try again later.");
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
    e.target.style.boxShadow = "0 0 0 3px rgba(212,175,55,0.06), 0 0 20px rgba(212,175,55,0.08)";
  };
  const handleBlur = (e) => {
    e.target.style.borderColor = "rgba(185,28,28,0.25)";
    e.target.style.boxShadow = "none";
  };

  return (
    <section
      id="contact"
      className="relative py-28 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #080808 0%, #0e0505 50%, #080808 100%)" }}
    >
      {/* Ambient glows */}
      <div
        className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(185,28,28,0.07) 0%, transparent 65%)", transform: "translateY(-30%)" }}
      />
      <div
        className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(212,175,55,0.05) 0%, transparent 65%)", transform: "translateY(30%)" }}
      />

      <div className="relative max-w-6xl mx-auto px-6 lg:px-10">

        {/* ── Section header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-3">
            <div className="w-10 h-px" style={{ background: "linear-gradient(90deg, transparent, #b91c1c)" }} />
            <span
              className="text-xs tracking-[0.35em] uppercase font-semibold"
              style={{ color: "#d4af37", fontFamily: "'Outfit', sans-serif" }}
            >
              Contact
            </span>
            <div className="w-10 h-px" style={{ background: "linear-gradient(90deg, #b91c1c, transparent)" }} />
          </div>
          <h2
            className="text-5xl font-bold mb-4"
            style={{
              fontFamily: "'Sora', sans-serif",
              background: "linear-gradient(135deg, #ffffff 0%, #f0f0f0 40%, #d4af37 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              lineHeight: 1.1,
            }}
          >
            Let's Work
            <span
              style={{
                WebkitTextFillColor: "transparent",
                background: "linear-gradient(90deg, #b91c1c, #ef4444)",
                WebkitBackgroundClip: "text",
              }}
            >
              {" "}Together
            </span>
          </h2>
          <p
            className="text-sm max-w-xl mx-auto"
            style={{ color: "rgba(180,180,180,0.6)", fontFamily: "'Outfit', sans-serif", lineHeight: 1.7 }}
          >
            Ready to build your next website or web application? Send your idea and I'll get back to you.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">

          {/* ── LEFT — Form panel ── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="relative rounded-2xl p-8"
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(185,28,28,0.2)",
              backdropFilter: "blur(12px)",
              boxShadow: "0 8px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.03)",
            }}
          >
            {/* Top shimmer */}
            <div
              className="absolute top-0 left-0 right-0 h-px rounded-t-2xl"
              style={{ background: "linear-gradient(90deg, transparent 0%, #b91c1c 40%, #d4af37 60%, transparent 100%)" }}
            />

            <div className="mb-6">
              <div className="w-8 h-0.5 mb-3 rounded-full" style={{ background: "linear-gradient(90deg, #d4af37, transparent)" }} />
              <h3 className="text-xl font-bold text-white" style={{ fontFamily: "'Sora', sans-serif" }}>
                Send a Message
              </h3>
            </div>

            {/* Success state */}
            {submitted && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-5 flex items-center gap-3 p-4 rounded-xl"
                style={{
                  background: "rgba(34,197,94,0.07)",
                  border: "1px solid rgba(34,197,94,0.25)",
                  borderLeft: "3px solid #22c55e",
                }}
              >
                <CheckCircle className="text-green-400 flex-shrink-0" size={18} />
                <span className="text-sm font-medium" style={{ color: "#4ade80", fontFamily: "'Outfit', sans-serif" }}>
                  Message sent successfully!
                </span>
              </motion.div>
            )}

            {/* Error state */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-5 flex items-center gap-3 p-4 rounded-xl"
                style={{
                  background: "rgba(239,68,68,0.07)",
                  border: "1px solid rgba(239,68,68,0.25)",
                  borderLeft: "3px solid #ef4444",
                }}
              >
                <span className="text-sm font-medium" style={{ color: "#f87171", fontFamily: "'Outfit', sans-serif" }}>
                  {error}
                </span>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold mb-1.5" style={{ color: "rgba(212,175,55,0.6)", fontFamily: "'Outfit', sans-serif", letterSpacing: "0.05em" }}>
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your name"
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  style={fieldBase}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1.5" style={{ color: "rgba(212,175,55,0.6)", fontFamily: "'Outfit', sans-serif", letterSpacing: "0.05em" }}>
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="you@example.com"
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  style={fieldBase}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1.5" style={{ color: "rgba(212,175,55,0.6)", fontFamily: "'Outfit', sans-serif", letterSpacing: "0.05em" }}>
                  Project Type
                </label>
                <select
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleInputChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  style={{ ...fieldBase, cursor: "pointer" }}
                >
                  <option value="" style={{ background: "#0a0a0a" }}>Select a project type</option>
                  <option style={{ background: "#0a0a0a" }}>Landing Page</option>
                  <option style={{ background: "#0a0a0a" }}>Business Website</option>
                  <option style={{ background: "#0a0a0a" }}>Full Stack Web App</option>
                  <option style={{ background: "#0a0a0a" }}>REST API</option>
                  <option style={{ background: "#0a0a0a" }}>Admin Dashboard</option>
                  <option style={{ background: "#0a0a0a" }}>E-Commerce Store</option>
                  <option style={{ background: "#0a0a0a" }}>Other</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1.5" style={{ color: "rgba(212,175,55,0.6)", fontFamily: "'Outfit', sans-serif", letterSpacing: "0.05em" }}>
                  Message
                </label>
                <textarea
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell me about your project..."
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  style={{ ...fieldBase, resize: "none" }}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 flex justify-center items-center gap-2.5 text-sm font-semibold rounded-xl transition-all duration-300"
                style={{
                  background: isSubmitting
                    ? "rgba(185,28,28,0.25)"
                    : "linear-gradient(135deg, #991b1b 0%, #b91c1c 100%)",
                  border: "1px solid rgba(185,28,28,0.5)",
                  color: isSubmitting ? "rgba(255,255,255,0.4)" : "#fff",
                  cursor: isSubmitting ? "not-allowed" : "pointer",
                  fontFamily: "'Outfit', sans-serif",
                  boxShadow: isSubmitting ? "none" : "0 4px 20px rgba(185,28,28,0.3)",
                  letterSpacing: "0.03em",
                }}
                onMouseEnter={(e) => {
                  if (!isSubmitting) {
                    e.currentTarget.style.boxShadow = "0 4px 30px rgba(185,28,28,0.5), 0 0 0 1px rgba(212,175,55,0.3)";
                    e.currentTarget.style.transform = "translateY(-1px)";
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "0 4px 20px rgba(185,28,28,0.3)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <Send size={15} />
                {isSubmitting ? "Sending…" : "Send Message"}
              </button>
            </form>
          </motion.div>

          {/* ── RIGHT — Direct contact panel ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            viewport={{ once: true }}
            className="flex flex-col gap-6"
          >
            <div
              className="relative rounded-2xl p-8 flex-1"
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(185,28,28,0.2)",
                backdropFilter: "blur(12px)",
                boxShadow: "0 8px 40px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.03)",
              }}
            >
              <div
                className="absolute top-0 left-0 right-0 h-px rounded-t-2xl"
                style={{ background: "linear-gradient(90deg, transparent 0%, #b91c1c 40%, #d4af37 60%, transparent 100%)" }}
              />
              <div className="mb-7">
                <div className="w-8 h-0.5 mb-3 rounded-full" style={{ background: "linear-gradient(90deg, #d4af37, transparent)" }} />
                <h3 className="text-xl font-bold text-white" style={{ fontFamily: "'Sora', sans-serif" }}>Direct Contact</h3>
              </div>

              <div className="space-y-4">
                {/* Email */}
                <div
                  className="flex gap-4 items-center p-4 rounded-xl transition-all duration-300 cursor-default"
                  style={{ background: "rgba(185,28,28,0.04)", border: "1px solid rgba(185,28,28,0.18)", borderLeft: "3px solid rgba(185,28,28,0.5)" }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderLeftColor = "#d4af37"; e.currentTarget.style.background = "rgba(212,175,55,0.03)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.2)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderLeftColor = "rgba(185,28,28,0.5)"; e.currentTarget.style.background = "rgba(185,28,28,0.04)"; e.currentTarget.style.boxShadow = "none"; }}
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(185,28,28,0.12)", border: "1px solid rgba(185,28,28,0.3)" }}>
                    <Mail size={16} style={{ color: "#ef4444" }} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold mb-0.5" style={{ color: "rgba(212,175,55,0.55)", fontFamily: "'Outfit', sans-serif", letterSpacing: "0.08em" }}>EMAIL</p>
                    <span className="text-sm" style={{ color: "rgba(220,220,220,0.85)", fontFamily: "'Outfit', sans-serif" }}>Sarvathan9363@gmail.com</span>
                  </div>
                </div>

                {/* Location */}
                <div
                  className="flex gap-4 items-center p-4 rounded-xl transition-all duration-300 cursor-default"
                  style={{ background: "rgba(185,28,28,0.04)", border: "1px solid rgba(185,28,28,0.18)", borderLeft: "3px solid rgba(185,28,28,0.5)" }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderLeftColor = "#d4af37"; e.currentTarget.style.background = "rgba(212,175,55,0.03)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.2)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderLeftColor = "rgba(185,28,28,0.5)"; e.currentTarget.style.background = "rgba(185,28,28,0.04)"; e.currentTarget.style.boxShadow = "none"; }}
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(185,28,28,0.12)", border: "1px solid rgba(185,28,28,0.3)" }}>
                    <MapPin size={16} style={{ color: "#ef4444" }} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold mb-0.5" style={{ color: "rgba(212,175,55,0.55)", fontFamily: "'Outfit', sans-serif", letterSpacing: "0.08em" }}>LOCATION</p>
                    <span className="text-sm" style={{ color: "rgba(220,220,220,0.85)", fontFamily: "'Outfit', sans-serif" }}>Tiruppur, Tamil Nadu, India</span>
                  </div>
                </div>

                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/in/sarvathan-c-923789315"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex gap-4 items-center p-4 rounded-xl transition-all duration-300"
                  style={{ background: "rgba(185,28,28,0.04)", border: "1px solid rgba(185,28,28,0.18)", borderLeft: "3px solid rgba(185,28,28,0.5)", textDecoration: "none", display: "flex" }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderLeftColor = "#d4af37"; e.currentTarget.style.background = "rgba(212,175,55,0.03)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.2)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderLeftColor = "rgba(185,28,28,0.5)"; e.currentTarget.style.background = "rgba(185,28,28,0.04)"; e.currentTarget.style.boxShadow = "none"; }}
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(185,28,28,0.12)", border: "1px solid rgba(185,28,28,0.3)" }}>
                    <svg className="w-4 h-4" fill="#ef4444" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-semibold mb-0.5" style={{ color: "rgba(212,175,55,0.55)", fontFamily: "'Outfit', sans-serif", letterSpacing: "0.08em" }}>LINKEDIN</p>
                    <span className="text-sm" style={{ color: "rgba(212,175,55,0.8)", fontFamily: "'Outfit', sans-serif" }}>View LinkedIn Profile →</span>
                  </div>
                </a>
              </div>

              {/* Availability badge */}
              <div className="mt-6 p-4 flex items-center gap-3 rounded-xl" style={{ background: "rgba(34,197,94,0.04)", border: "1px solid rgba(34,197,94,0.15)", borderLeft: "3px solid rgba(34,197,94,0.45)" }}>
                <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: "#22c55e", boxShadow: "0 0 8px rgba(34,197,94,0.8)", animation: "statusPulse 2s ease-in-out infinite" }} />
                <p className="text-xs font-medium" style={{ color: "rgba(74,222,128,0.75)", fontFamily: "'Outfit', sans-serif" }}>Available for freelance projects</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent 0%, rgba(185,28,28,0.35) 30%, rgba(212,175,55,0.25) 50%, rgba(185,28,28,0.35) 70%, transparent 100%)" }} />

      <style>{`
        @keyframes statusPulse {
          0%, 100% { opacity: 1; box-shadow: 0 0 6px rgba(34,197,94,0.8); }
          50%       { opacity: 0.5; box-shadow: 0 0 14px rgba(34,197,94,0.4); }
        }
        select option { background: #0a0505; color: #ddd; }
      `}</style>
    </section>
  );
};

export default ContactSection;