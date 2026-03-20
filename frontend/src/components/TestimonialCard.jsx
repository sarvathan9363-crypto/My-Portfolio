import { useState } from "react";

export default function TestimonialCard({ quote, name, role, rating }) {
  const [hoveredStar, setHoveredStar] = useState(null);
  const [cardHovered, setCardHovered] = useState(false);

  const displayRating = hoveredStar !== null ? hoveredStar : rating;

  return (
    <div
      className="relative flex flex-col h-full transition-all duration-300"
      style={{
        background: cardHovered ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.02)",
        border: `1px solid ${cardHovered ? "rgba(212,175,55,0.35)" : "rgba(185,28,28,0.2)"}`,
        borderRadius: "16px",
        backdropFilter: "blur(12px)",
        padding: "1.5rem",
        boxShadow: cardHovered
          ? "0 12px 40px rgba(0,0,0,0.4), 0 0 24px rgba(212,175,55,0.06)"
          : "0 4px 20px rgba(0,0,0,0.25)",
        transform: cardHovered ? "translateY(-3px)" : "translateY(0)",
        transition: "all 0.35s ease",
      }}
      onMouseEnter={() => setCardHovered(true)}
      onMouseLeave={() => { setCardHovered(false); setHoveredStar(null); }}
    >
      {/* Top shimmer */}
      <div
        className="absolute top-0 left-0 right-0 h-px rounded-t-2xl"
        style={{ background: "linear-gradient(90deg, transparent, rgba(185,28,28,0.4), rgba(212,175,55,0.25), transparent)" }}
      />

      {/* ── Star rating row ── */}
      <div className="flex items-center gap-1 mb-4">
        {[1, 2, 3, 4, 5].map((star) => {
          const filled = star <= displayRating;
          return (
            <button
              key={star}
              type="button"
              onMouseEnter={() => setHoveredStar(star)}
              onMouseLeave={() => setHoveredStar(null)}
              className="focus:outline-none"
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "0 1px",
                transform: filled ? "scale(1.15)" : "scale(1)",
                filter: filled ? "drop-shadow(0 0 4px rgba(212,175,55,0.8))" : "none",
                transition: "transform 0.15s, filter 0.15s",
              }}
              title={`${star} star${star > 1 ? "s" : ""}`}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" style={{ display: "block" }}>
                {filled ? (
                  <path
                    d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                    fill="#d4af37" stroke="#d4af37" strokeWidth="1" strokeLinejoin="round"
                  />
                ) : (
                  <path
                    d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                    fill="none" stroke="rgba(185,28,28,0.3)" strokeWidth="1.5" strokeLinejoin="round"
                  />
                )}
              </svg>
            </button>
          );
        })}

        {/* Numeric — plain color, no gradient clip */}
        <span
          className="ml-1.5 text-xs font-bold tabular-nums"
          style={{ fontFamily: "'Sora', sans-serif", color: "#d4af37" }}
        >
          {displayRating}.0
        </span>
        <span
          className="text-xs"
          style={{ fontFamily: "'Outfit', sans-serif", color: "rgba(180,180,180,0.3)" }}
        >
          / 5.0
        </span>
      </div>

      {/* Quote block */}
      <div
        className="relative mb-5 flex-1 px-4 py-3 rounded-xl"
        style={{
          background: "rgba(185,28,28,0.04)",
          borderLeft: "2px solid rgba(212,175,55,0.28)",
        }}
      >
        {/* Opening quote mark */}
        <span
          className="absolute -top-2 -left-0.5 text-3xl leading-none select-none"
          style={{ color: "rgba(212,175,55,0.25)", fontFamily: "Georgia, serif" }}
        >
          "
        </span>
        <p
          className="text-sm leading-relaxed"
          style={{
            fontFamily: "'Outfit', sans-serif",
            color: "rgba(200,200,200,0.8)",
            lineHeight: 1.7,
          }}
        >
          {quote}
        </p>
      </div>

      {/* Author row */}
      <div
        className="flex items-center gap-3 pt-3"
        style={{ borderTop: "1px solid rgba(185,28,28,0.12)" }}
      >
        {/* Avatar */}
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm flex-shrink-0"
          style={{
            background: "linear-gradient(135deg, #7f1d1d, #b91c1c)",
            border: "1px solid rgba(212,175,55,0.3)",
            fontFamily: "'Sora', sans-serif",
            color: "#fff",
            boxShadow: "0 0 10px rgba(185,28,28,0.35)",
          }}
        >
          {name.charAt(0).toUpperCase()}
        </div>

        <div>
          {/* Name — plain color, no gradient clip */}
          <h4
            className="font-bold text-sm leading-tight text-white"
            style={{ fontFamily: "'Sora', sans-serif" }}
          >
            {name}
          </h4>
          <span
            className="text-xs"
            style={{ fontFamily: "'Outfit', sans-serif", color: "rgba(212,175,55,0.55)" }}
          >
            {role}
          </span>
        </div>
      </div>

      {/* Bottom shimmer */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px rounded-b-2xl"
        style={{ background: "linear-gradient(90deg, transparent, rgba(185,28,28,0.22), transparent)" }}
      />
    </div>
  );
}