import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import StatsCounter from "./StatsCounter";

const roles = [
  "Full Stack Developer",
  "Electrical Engineer",
  "Freelancer",
  "Backend Architect",
  "Problem Solver",
];

const HeroSection = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    const current = roles[roleIndex];
    let timeout;

    if (typing) {
      if (displayed.length < current.length) {
        timeout = setTimeout(() => {
          setDisplayed(current.slice(0, displayed.length + 1));
        }, 58);
      } else {
        timeout = setTimeout(() => setTyping(false), 1900);
      }
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => {
          setDisplayed(displayed.slice(0, -1));
        }, 30);
      } else {
        setRoleIndex((i) => (i + 1) % roles.length);
        setTyping(true);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayed, typing, roleIndex]);

  return (
    <section
      id="home"
      className="relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #060202 0%, #0a0404 50%, #080303 100%)" }}
    >
      {/* ── Ambient radial glows ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(185,28,28,0.1) 0%, transparent 65%)" }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(212,175,55,0.06) 0%, transparent 65%)" }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(185,28,28,0.04) 0%, transparent 55%)" }}
        />
      </div>

      {/* ── Subtle horizontal depth lines ── */}
      {[15, 35, 55, 75].map((pct) => (
        <div
          key={pct}
          className="absolute left-0 right-0 pointer-events-none"
          style={{
            top: `${pct}%`,
            height: "1px",
            background: "linear-gradient(90deg, transparent 0%, rgba(185,28,28,0.05) 20%, rgba(185,28,28,0.05) 80%, transparent 100%)",
          }}
        />
      ))}

      {/* ── Main content ──
          Mobile: natural height, pt just clears navbar, pb clears sticky bar
          Desktop: min-h-screen with flex centering for full-screen feel
      ── */}
      <div
        className="max-w-6xl mx-auto px-6 lg:px-10 relative z-10
                   grid md:grid-cols-2 gap-8 md:gap-12 md:items-center
                   pt-24 pb-20
                   md:min-h-screen md:pt-0 md:pb-0"
      >

        {/* ── LEFT — Text ── */}
        <div className="md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Availability badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full"
              style={{
                background: "rgba(34,197,94,0.06)",
                border: "1px solid rgba(34,197,94,0.22)",
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{
                  background: "#22c55e",
                  boxShadow: "0 0 6px rgba(34,197,94,0.9)",
                  animation: "statusPulse 2s ease-in-out infinite",
                }}
              />
              <span
                className="text-xs font-semibold tracking-wide"
                style={{ fontFamily: "'Outfit', sans-serif", color: "rgba(74,222,128,0.85)" }}
              >
                Available for Freelance
              </span>
            </motion.div>

            {/* Heading block */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mb-4"
            >
              {/* Eyebrow */}
              <p
                className="text-xs font-semibold tracking-[0.2em] uppercase mb-3"
                style={{ fontFamily: "'Outfit', sans-serif", color: "rgba(212,175,55,0.5)" }}
              >
                Engineering · Development · Freelance
              </p>

              {/* Main headline */}
              <h1
                className="font-bold leading-none mb-4"
                style={{
                  fontFamily: "'Sora', sans-serif",
                  fontSize: "clamp(2rem, 7vw, 3.6rem)",
                  lineHeight: 1.07,
                }}
              >
                <span style={{ background: "linear-gradient(135deg, #ffffff 0%, #e8e8e8 50%, #d4af37 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", display: "block" }}>
                  Building Digital
                </span>
                <span style={{ background: "linear-gradient(135deg, #f0f0f0 0%, #e0e0e0 60%, #d4af37 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", display: "block" }}>
                  Products That
                </span>
                <span style={{ background: "linear-gradient(135deg, #b91c1c 0%, #dc2626 45%, #ef4444 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", display: "block" }}>
                  Actually Work.
                </span>
              </h1>

              {/* Animated role switcher */}
              <div className="flex items-center gap-3 mt-5" style={{ minHeight: "44px" }}>
                <div
                  className="w-0.5 h-8 rounded-full flex-shrink-0"
                  style={{ background: "linear-gradient(180deg, #d4af37 0%, rgba(185,28,28,0.6) 100%)" }}
                />
                <div className="flex items-center">
                  <span
                    className="font-bold"
                    style={{
                      fontFamily: "'Sora', sans-serif",
                      fontSize: "clamp(0.95rem, 3.5vw, 1.35rem)",
                      color: "#d4af37",
                      letterSpacing: "0.02em",
                      minWidth: "10ch",
                    }}
                  >
                    {displayed}
                  </span>
                  <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 0.8, repeat: Infinity, ease: "steps(1)" }}
                    style={{
                      display: "inline-block",
                      width: "2px",
                      height: "1.2em",
                      background: "#d4af37",
                      marginLeft: "3px",
                      borderRadius: "1px",
                      verticalAlign: "middle",
                      flexShrink: 0,
                      boxShadow: "0 0 8px rgba(212,175,55,0.65)",
                    }}
                  />
                </div>
              </div>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="max-w-lg mb-7 text-sm"
              style={{ fontFamily: "'Outfit', sans-serif", color: "rgba(180,180,180,0.62)", lineHeight: 1.88 }}
            >
              Engineering student turned developer. I design and build scalable
              web applications — from polished frontends to robust APIs — for
              businesses that need things done right.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-wrap gap-3 mb-10"
            >
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300"
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  background: "linear-gradient(135deg, #991b1b 0%, #b91c1c 100%)",
                  border: "1px solid rgba(185,28,28,0.6)",
                  color: "#fff",
                  boxShadow: "0 4px 20px rgba(185,28,28,0.35)",
                  letterSpacing: "0.03em",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = "0 4px 30px rgba(185,28,28,0.55), 0 0 0 1px rgba(212,175,55,0.3)";
                  e.currentTarget.style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "0 4px 20px rgba(185,28,28,0.35)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                Hire Me →
              </a>

              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300"
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  background: "rgba(212,175,55,0.06)",
                  border: "1px solid rgba(212,175,55,0.35)",
                  color: "#d4af37",
                  letterSpacing: "0.03em",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(212,175,55,0.12)";
                  e.currentTarget.style.boxShadow = "0 4px 24px rgba(212,175,55,0.15)";
                  e.currentTarget.style.borderColor = "rgba(212,175,55,0.65)";
                  e.currentTarget.style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(212,175,55,0.06)";
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.borderColor = "rgba(212,175,55,0.35)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                View My Work
              </a>
            </motion.div>

            <StatsCounter />
          </motion.div>
        </div>

        {/* ── RIGHT — SC profile visual ── */}
        <div className="flex justify-center items-center py-10 md:py-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="relative flex items-center justify-center"
          >
            <style>{`
              @media (max-width: 767px) {
                .sc-visual-wrapper { transform: scale(0.62) !important; }
              }
              @media (min-width: 768px) and (max-width: 1023px) {
                .sc-visual-wrapper { transform: scale(0.78) !important; }
              }
            `}</style>

            <div
              className="sc-visual-wrapper relative flex items-center justify-center"
              style={{ width: "320px", height: "320px" }}
            >
              {/* Outer rotating dashed ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute w-80 h-80 rounded-full"
                style={{ border: "1px dashed rgba(185,28,28,0.25)" }}
              />

              {/* Mid counter-rotating ring */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute w-64 h-64 rounded-full"
                style={{ border: "1px solid rgba(212,175,55,0.18)" }}
              />

              {/* Tick marks */}
              {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
                <div
                  key={deg}
                  className="absolute w-80 h-80 rounded-full flex items-start justify-center pointer-events-none"
                  style={{ transform: `rotate(${deg}deg)` }}
                >
                  <div
                    className="w-px h-3 mt-1"
                    style={{ background: deg % 90 === 0 ? "rgba(185,28,28,0.6)" : "rgba(185,28,28,0.25)" }}
                  />
                </div>
              ))}

              {/* Pulsing rings */}
              <motion.div
                animate={{ scale: [1, 1.05, 1], opacity: [0.5, 0.9, 0.5] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute w-56 h-56 rounded-full"
                style={{ border: "1px solid rgba(185,28,28,0.35)", boxShadow: "0 0 24px rgba(185,28,28,0.12)" }}
              />
              <motion.div
                animate={{ scale: [1, 1.04, 1], opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute w-44 h-44 rounded-full"
                style={{ border: "1px solid rgba(212,175,55,0.2)" }}
              />

              {/* Center circle */}
              <motion.div
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="relative w-40 h-40 rounded-full flex items-center justify-center z-10"
                style={{
                  background: "linear-gradient(135deg, #180404 0%, #2a0606 50%, #180404 100%)",
                  border: "2px solid rgba(185,28,28,0.55)",
                  boxShadow: "0 0 32px rgba(185,28,28,0.35), 0 0 64px rgba(185,28,28,0.12), inset 0 0 28px rgba(185,28,28,0.08)",
                }}
              >
                <div
                  className="absolute inset-3 rounded-full"
                  style={{
                    background: "radial-gradient(circle, rgba(185,28,28,0.18) 0%, transparent 70%)",
                    animation: "innerGlow 2.5s ease-in-out infinite",
                  }}
                />
                <span
                  className="relative text-4xl font-black z-10"
                  style={{
                    fontFamily: "'Sora', sans-serif",
                    background: "linear-gradient(135deg, #ffffff 0%, #d4af37 60%, #ef4444 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    letterSpacing: "0.05em",
                  }}
                >
                  SC
                </span>
                <div
                  className="absolute inset-2 rounded-full pointer-events-none"
                  style={{ border: "1px solid rgba(212,175,55,0.12)" }}
                />
              </motion.div>

              {/* Floating badges */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="absolute -top-4 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap"
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  background: "rgba(10,4,4,0.92)",
                  border: "1px solid rgba(185,28,28,0.4)",
                  color: "rgba(239,68,68,0.85)",
                  backdropFilter: "blur(8px)",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.4)",
                }}
              >
                Full Stack Developer
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap"
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  background: "rgba(10,4,4,0.92)",
                  border: "1px solid rgba(212,175,55,0.32)",
                  color: "rgba(212,175,55,0.75)",
                  backdropFilter: "blur(8px)",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.4)",
                }}
              >
                Electrical Engineer
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.0 }}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 px-2 py-1.5 rounded-lg text-xs font-medium"
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  background: "rgba(10,4,4,0.92)",
                  border: "1px solid rgba(185,28,28,0.28)",
                  color: "rgba(185,28,28,0.65)",
                  backdropFilter: "blur(8px)",
                  writingMode: "vertical-rl",
                  textOrientation: "mixed",
                }}
              >
                React · Node
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.1 }}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 px-2 py-1.5 rounded-lg text-xs font-medium"
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  background: "rgba(10,4,4,0.92)",
                  border: "1px solid rgba(212,175,55,0.22)",
                  color: "rgba(212,175,55,0.55)",
                  backdropFilter: "blur(8px)",
                  writingMode: "vertical-rl",
                  textOrientation: "mixed",
                }}
              >
                Mongo · SQL
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator — desktop only */}
      <motion.div
        className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
      >
        <div
          className="w-5 h-9 rounded-full flex justify-center pt-1.5"
          style={{ border: "1px solid rgba(185,28,28,0.35)" }}
        >
          <motion.div
            animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            className="w-0.5 h-2.5 rounded-full"
            style={{ background: "#dc2626" }}
          />
        </div>
        <span
          className="text-xs tracking-widest uppercase"
          style={{ fontFamily: "'Outfit', sans-serif", color: "rgba(185,28,28,0.35)", letterSpacing: "0.25em" }}
        >
          Scroll
        </span>
      </motion.div>

      <style>{`
        @keyframes statusPulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.3; }
        }
        @keyframes innerGlow {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50%       { opacity: 1; transform: scale(1.08); }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;