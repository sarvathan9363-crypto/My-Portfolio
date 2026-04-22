import { useEffect, useRef, useState } from "react";

const stats = [
  { value: "11",   label: "Projects Delivered", suffix: ""  },
  { value: "2",   label: "Years Coding",        suffix: "+" },
  { value: "100", label: "Client Satisfaction", suffix: "%" },
];

export default function StatsCounter() {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="flex gap-3 mt-8">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="relative flex flex-col items-center text-center flex-1 py-4 px-3 rounded-xl transition-all duration-300"
          style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(185,28,28,0.2)",
            backdropFilter: "blur(8px)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "rgba(212,175,55,0.4)";
            e.currentTarget.style.background = "rgba(212,175,55,0.025)";
            e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.3), 0 0 16px rgba(212,175,55,0.07)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "rgba(185,28,28,0.2)";
            e.currentTarget.style.background = "rgba(255,255,255,0.02)";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          {/* Top shimmer */}
          <div
            className="absolute top-0 left-0 right-0 h-px rounded-t-xl"
            style={{ background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.3), transparent)" }}
          />

          {/* Value — plain color, NO WebkitBackgroundClip (it's animated via opacity/transform) */}
          <h3
            className="font-black leading-none mb-1"
            style={{
              fontFamily: "'Sora', sans-serif",
              fontSize: "26px",
              color: "#d4af37",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(8px)",
              transition: `opacity 0.6s ease ${index * 0.15}s, transform 0.6s ease ${index * 0.15}s`,
            }}
          >
            {stat.value}{stat.suffix}
          </h3>

          {/* Label */}
          <p
            className="text-xs font-medium tracking-wide"
            style={{
              fontFamily: "'Outfit', sans-serif",
              color: "rgba(180,180,180,0.55)",
              opacity: visible ? 1 : 0,
              transition: `opacity 0.6s ease ${index * 0.15 + 0.1}s`,
            }}
          >
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  );
}