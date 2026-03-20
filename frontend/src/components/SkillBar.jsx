import { useEffect, useRef, useState } from "react";

export default function SkillBar({ name, level }) {
  const [animated, setAnimated] = useState(false);
  const ref = useRef(null);

  // Trigger fill animation when bar enters viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setAnimated(true); },
      { threshold: 0.4 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const barColor =
    level >= 85
      ? "linear-gradient(90deg, #991b1b, #dc2626, #d4af37)"
      : level >= 65
      ? "linear-gradient(90deg, #7f1d1d, #b91c1c, #ef4444)"
      : "linear-gradient(90deg, #7f1d1d, #991b1b)";

  const glowColor =
    level >= 85 ? "rgba(212,175,55,0.5)" : "rgba(185,28,28,0.5)";

  const dotColor = level >= 85 ? "#d4af37" : "#dc2626";
  const dotGlow  = level >= 85
    ? "0 0 6px rgba(212,175,55,0.8)"
    : "0 0 6px rgba(185,28,28,0.8)";
  const levelColor = level >= 85 ? "#d4af37" : "#ef4444";

  return (
    <div className="mb-5" ref={ref}>

      {/* Label row — plain color, NO WebkitBackgroundClip */}
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2">
          <span
            className="w-1.5 h-1.5 rounded-full flex-shrink-0"
            style={{ background: dotColor, boxShadow: dotGlow }}
          />
          <span
            className="text-sm font-medium"
            style={{ fontFamily: "'Outfit', sans-serif", color: "rgba(215,215,215,0.85)" }}
          >
            {name}
          </span>
        </div>

        <div className="flex items-center gap-0.5">
          <span
            className="text-xs font-bold tabular-nums"
            style={{ fontFamily: "'Sora', sans-serif", color: levelColor }}
          >
            {level}
          </span>
          <span
            className="text-xs"
            style={{ fontFamily: "'Outfit', sans-serif", color: "rgba(185,28,28,0.45)" }}
          >
            %
          </span>
        </div>
      </div>

      {/* Track */}
      <div
        className="relative w-full h-2 overflow-hidden rounded-full"
        style={{
          background: "rgba(185,28,28,0.1)",
          border: "1px solid rgba(185,28,28,0.18)",
        }}
      >
        {/* Fill bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            height: "100%",
            width: animated ? `${level}%` : "0%",
            background: barColor,
            borderRadius: "999px",
            transition: "width 1.2s cubic-bezier(0.25, 1, 0.5, 1)",
            boxShadow: animated ? `2px 0 12px ${glowColor}` : "none",
          }}
        />

        {/* Leading edge glow dot */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: animated ? `${level}%` : "0%",
            transform: "translate(-50%, -50%)",
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            background: level >= 85 ? "#d4af37" : "#ef4444",
            boxShadow: level >= 85
              ? "0 0 8px rgba(212,175,55,0.9), 0 0 16px rgba(212,175,55,0.4)"
              : "0 0 8px rgba(239,68,68,0.9), 0 0 16px rgba(185,28,28,0.4)",
            transition: "left 1.2s cubic-bezier(0.25, 1, 0.5, 1)",
            opacity: animated ? 1 : 0,
          }}
        />
      </div>

      {/* Tick markers */}
      <div className="relative w-full flex justify-between mt-1">
        {[25, 50, 75, 100].map((tick) => (
          <div key={tick} style={{ width: "1px" }}>
            <div
              className="w-px h-1"
              style={{
                background: level >= tick
                  ? "rgba(185,28,28,0.45)"
                  : "rgba(255,255,255,0.07)",
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}