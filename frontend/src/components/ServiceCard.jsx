import { useState } from "react";

export default function ServiceCard({ title, description }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative flex flex-col h-full"
      style={{
        background: hovered ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.018)",
        border: `1px solid ${hovered ? "rgba(212,175,55,0.38)" : "rgba(185,28,28,0.2)"}`,
        borderRadius: "16px",
        backdropFilter: "blur(12px)",
        boxShadow: hovered
          ? "0 12px 40px rgba(0,0,0,0.45), 0 0 28px rgba(212,175,55,0.06)"
          : "0 4px 20px rgba(0,0,0,0.25)",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        transition: "all 0.35s ease",
        padding: "1.6rem",
        cursor: "default",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Top shimmer */}
      <div
        className="absolute top-0 left-0 right-0 h-px rounded-t-2xl transition-all duration-300"
        style={{
          background: hovered
            ? "linear-gradient(90deg, transparent 0%, #d4af37 40%, #b91c1c 60%, transparent 100%)"
            : "linear-gradient(90deg, transparent 0%, rgba(185,28,28,0.45) 50%, transparent 100%)",
        }}
      />

      {/* ── Status dot + label ── */}
      <div className="flex items-center gap-2 mb-5">
        <span
          className="w-2 h-2 rounded-full flex-shrink-0"
          style={{
            background: hovered ? "#d4af37" : "#dc2626",
            boxShadow: hovered ? "0 0 8px rgba(212,175,55,0.85)" : "0 0 6px rgba(185,28,28,0.65)",
            transition: "all 0.3s",
          }}
        />
        <div
          className="flex-1 h-px"
          style={{
            background: hovered ? "rgba(212,175,55,0.18)" : "rgba(185,28,28,0.12)",
            transition: "background 0.3s",
          }}
        />
      </div>

      {/* ── Title — FIX: plain color transition avoids white-box clip bug ── */}
      <h3
        className="font-bold mb-3 leading-tight"
        style={{
          fontFamily: "'Sora', sans-serif",
          fontSize: "18px",
          color: hovered ? "#d4af37" : "#ffffff",
          transition: "color 0.3s ease",
        }}
      >
        {title}
      </h3>

      {/* Gold accent rule */}
      <div
        className="w-8 h-0.5 mb-4 rounded-full transition-all duration-300"
        style={{
          background: hovered
            ? "linear-gradient(90deg, #d4af37, transparent)"
            : "linear-gradient(90deg, rgba(185,28,28,0.5), transparent)",
        }}
      />

      {/* ── Description ── */}
      <p
        className="text-sm leading-relaxed mb-7 flex-1"
        style={{
          fontFamily: "'Outfit', sans-serif",
          color: "rgba(180,180,180,0.7)",
          lineHeight: 1.75,
        }}
      >
        {description}
      </p>

      {/* ── CTA button ── */}
      <a
        href="#contact"
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold mt-auto self-start transition-all duration-300"
        style={{
          fontFamily: "'Outfit', sans-serif",
          background: hovered
            ? "linear-gradient(135deg, #991b1b 0%, #b91c1c 100%)"
            : "rgba(185,28,28,0.08)",
          border: `1px solid ${hovered ? "rgba(212,175,55,0.45)" : "rgba(185,28,28,0.3)"}`,
          color: hovered ? "#ffffff" : "rgba(239,68,68,0.75)",
          boxShadow: hovered ? "0 4px 18px rgba(185,28,28,0.35)" : "none",
          letterSpacing: "0.03em",
        }}
      >
        <span
          style={{
            display: "inline-block",
            transition: "transform 0.3s",
            transform: hovered ? "translateX(3px)" : "translateX(0)",
          }}
        >
          →
        </span>
        Let's Talk
      </a>

      {/* Bottom shimmer */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px rounded-b-2xl transition-all duration-300"
        style={{
          background: hovered
            ? "linear-gradient(90deg, transparent 0%, #d4af37 40%, #b91c1c 60%, transparent 100%)"
            : "linear-gradient(90deg, transparent 0%, rgba(185,28,28,0.18) 50%, transparent 100%)",
        }}
      />
    </div>
  );
}