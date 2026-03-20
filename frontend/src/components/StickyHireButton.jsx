export default function StickyHireButton() {
  return (
    <a
      href="#contact"
      className="fixed bottom-0 left-0 right-0 md:hidden z-50 flex items-center justify-center gap-2.5 py-4 text-sm font-semibold transition-all duration-300"
      style={{
        fontFamily: "'Outfit', sans-serif",
        background: "linear-gradient(135deg, #7f1d1d 0%, #991b1b 50%, #b91c1c 100%)",
        borderTop: "1px solid rgba(212,175,55,0.35)",
        color: "#ffffff",
        boxShadow: "0 -4px 24px rgba(185,28,28,0.4), 0 -1px 0 rgba(212,175,55,0.15)",
        letterSpacing: "0.04em",
      }}
      onTouchStart={(e) => {
        e.currentTarget.style.background = "linear-gradient(135deg, #991b1b 0%, #b91c1c 50%, #dc2626 100%)";
        e.currentTarget.style.boxShadow = "0 -4px 32px rgba(185,28,28,0.65), 0 -1px 0 rgba(212,175,55,0.3)";
      }}
      onTouchEnd={(e) => {
        e.currentTarget.style.background = "linear-gradient(135deg, #7f1d1d 0%, #991b1b 50%, #b91c1c 100%)";
        e.currentTarget.style.boxShadow = "0 -4px 24px rgba(185,28,28,0.4), 0 -1px 0 rgba(212,175,55,0.15)";
      }}
    >
      {/* Top shimmer line */}
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: "linear-gradient(90deg, transparent 0%, #d4af37 40%, rgba(185,28,28,0.8) 60%, transparent 100%)" }}
      />

      {/* Pulsing dot */}
      <span
        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
        style={{
          background: "#d4af37",
          boxShadow: "0 0 8px rgba(212,175,55,0.9)",
          animation: "hirePulse 1.8s ease-in-out infinite",
        }}
      />

      Hire Me

      {/* Arrow */}
      <span style={{ opacity: 0.8 }}>→</span>

      <style>{`
        @keyframes hirePulse {
          0%, 100% { opacity: 1; box-shadow: 0 0 6px rgba(212,175,55,0.8); }
          50%       { opacity: 0.4; box-shadow: 0 0 14px rgba(212,175,55,0.3); }
        }
      `}</style>
    </a>
  );
}