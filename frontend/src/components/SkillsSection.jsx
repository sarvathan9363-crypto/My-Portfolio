import React from "react";
import { motion } from "framer-motion";
import SkillBar from "./SkillBar";
import { skills } from "../utils/constants";

const SkillsSection = () => {
  const techTags = [
    "React", "Node.js", "MongoDB", "Express",
    "REST API", "GitHub", "Tailwind CSS", "JavaScript",
  ];

  return (
    <section
      id="skills"
      className="relative py-28 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #080808 0%, #0e0505 50%, #080808 100%)" }}
    >
      {/* Ambient glows */}
      <div
        className="absolute top-1/4 right-0 w-[400px] h-[400px] pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(185,28,28,0.07) 0%, transparent 65%)" }}
      />
      <div
        className="absolute bottom-1/4 left-0 w-[350px] h-[350px] pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(212,175,55,0.05) 0%, transparent 65%)" }}
      />

      <div className="relative max-w-6xl mx-auto px-6 lg:px-10">

        {/* ── Section header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="flex items-center justify-center gap-4 mb-3">
            <div className="w-10 h-px" style={{ background: "linear-gradient(90deg, transparent, #b91c1c)" }} />
            <span
              className="text-xs tracking-[0.35em] uppercase font-semibold"
              style={{ color: "#d4af37", fontFamily: "'Outfit', sans-serif" }}
            >
              Skills
            </span>
            <div className="w-10 h-px" style={{ background: "linear-gradient(90deg, #b91c1c, transparent)" }} />
          </div>

          {/* Static heading — WebkitBackgroundClip is safe here, no hover transition */}
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
            Skills &{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #b91c1c, #ef4444)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Technologies
            </span>
          </h2>

          <p
            className="max-w-xl mx-auto text-sm"
            style={{
              fontFamily: "'Outfit', sans-serif",
              color: "rgba(180,180,180,0.6)",
              lineHeight: 1.7,
            }}
          >
            Technologies I use to build scalable and modern web applications.
          </p>
        </motion.div>

        {/* ── Skills panel ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative rounded-2xl p-8 mb-10"
          style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(185,28,28,0.2)",
            backdropFilter: "blur(12px)",
            boxShadow: "0 8px 40px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.03)",
          }}
        >
          {/* Top shimmer */}
          <div
            className="absolute top-0 left-0 right-0 h-px rounded-t-2xl"
            style={{ background: "linear-gradient(90deg, transparent 0%, #b91c1c 35%, #d4af37 50%, #b91c1c 65%, transparent 100%)" }}
          />

          {/* Panel header */}
          <div className="flex items-center gap-3 mb-7">
            <span
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{
                background: "#dc2626",
                boxShadow: "0 0 6px rgba(185,28,28,0.8)",
                animation: "statusPulse 2s ease-in-out infinite",
              }}
            />
            {/* Plain color label — no gradient clip */}
            <span
              className="text-xs font-semibold tracking-widest uppercase"
              style={{ fontFamily: "'Outfit', sans-serif", color: "rgba(212,175,55,0.65)" }}
            >
              Skill Matrix
            </span>
            <div className="flex-1 h-px" style={{ background: "rgba(185,28,28,0.15)" }} />
            <span
              className="text-xs font-medium"
              style={{ fontFamily: "'Outfit', sans-serif", color: "rgba(74,222,128,0.6)" }}
            >
              ● Operational
            </span>
          </div>

          {/* Skills grid — original logic preserved */}
          <div className="grid md:grid-cols-2 gap-x-10 gap-y-1">
            {skills.map((skill, index) => (
              <SkillBar key={index} name={skill.name} level={skill.level} />
            ))}
          </div>

          {/* Bottom shimmer */}
          <div
            className="absolute bottom-0 left-0 right-0 h-px rounded-b-2xl"
            style={{ background: "linear-gradient(90deg, transparent 0%, #b91c1c 35%, #d4af37 50%, #b91c1c 65%, transparent 100%)" }}
          />
        </motion.div>

        {/* ── Tech tag pills — original logic preserved ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3"
        >
          {techTags.map((tech, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, scale: 0.88 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.06 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.06, y: -2 }}
              className="px-4 py-2 text-xs font-medium rounded-full cursor-default transition-all duration-300"
              style={{
                fontFamily: "'Outfit', sans-serif",
                background: "rgba(185,28,28,0.08)",
                border: "1px solid rgba(185,28,28,0.25)",
                /* Plain color — no gradient clip on interactive element */
                color: "rgba(239,68,68,0.75)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(212,175,55,0.08)";
                e.currentTarget.style.borderColor = "rgba(212,175,55,0.4)";
                e.currentTarget.style.color = "#d4af37";
                e.currentTarget.style.boxShadow = "0 0 14px rgba(212,175,55,0.12)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(185,28,28,0.08)";
                e.currentTarget.style.borderColor = "rgba(185,28,28,0.25)";
                e.currentTarget.style.color = "rgba(239,68,68,0.75)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              {tech}
            </motion.span>
          ))}
        </motion.div>
      </div>

      {/* Section dividers */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent 0%, rgba(185,28,28,0.3) 30%, rgba(212,175,55,0.2) 50%, rgba(185,28,28,0.3) 70%, transparent 100%)" }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent 0%, rgba(185,28,28,0.3) 30%, rgba(212,175,55,0.2) 50%, rgba(185,28,28,0.3) 70%, transparent 100%)" }}
      />

      <style>{`
        @keyframes statusPulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.3; }
        }
      `}</style>
    </section>
  );
};

export default SkillsSection;