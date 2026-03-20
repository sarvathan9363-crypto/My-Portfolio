import { useState } from "react";

export default function ProjectCard({
  title,
  description,
  tech,
  liveDemo,
  github,
  linkedinPost,
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative flex flex-col h-full transition-all duration-350"
      style={{
        background: "rgba(255,255,255,0.02)",
        border: `1px solid ${hovered ? "rgba(212,175,55,0.4)" : "rgba(185,28,28,0.22)"}`,
        borderRadius: "16px",
        backdropFilter: "blur(12px)",
        boxShadow: hovered
          ? "0 12px 40px rgba(0,0,0,0.5), 0 0 30px rgba(212,175,55,0.07), 0 0 0 1px rgba(212,175,55,0.06)"
          : "0 4px 20px rgba(0,0,0,0.3)",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        transition: "all 0.35s ease",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Top shimmer line */}
      <div
        className="absolute top-0 left-0 right-0 h-px rounded-t-2xl transition-all duration-300"
        style={{
          background: hovered
            ? "linear-gradient(90deg, transparent 0%, #d4af37 40%, #b91c1c 60%, transparent 100%)"
            : "linear-gradient(90deg, transparent 0%, #b91c1c 50%, transparent 100%)",
        }}
      />

      {/* ── Project banner ── */}
      <div
        className="relative h-36 flex items-center justify-center overflow-hidden mx-4 mt-5 rounded-xl"
        style={{
          background: hovered
            ? "linear-gradient(135deg, #1e0505 0%, #2d0a0a 40%, #1a0804 100%)"
            : "linear-gradient(135deg, #160404 0%, #250707 40%, #160404 100%)",
          border: `1px solid ${hovered ? "rgba(212,175,55,0.2)" : "rgba(185,28,28,0.2)"}`,
          transition: "all 0.35s ease",
        }}
      >
        {/* Subtle dot grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(rgba(185,28,28,0.15) 1px, transparent 1px)",
            backgroundSize: "18px 18px",
            opacity: 0.6,
          }}
        />

        {/* Centre glow */}
        <div
          className="absolute inset-0 pointer-events-none transition-all duration-400"
          style={{
            background: hovered
              ? "radial-gradient(circle, rgba(212,175,55,0.1) 0%, transparent 65%)"
              : "radial-gradient(circle, rgba(185,28,28,0.08) 0%, transparent 65%)",
          }}
        />

        {/* Project title in banner — plain color, no gradient clip on hover */}
        <p
          className="relative z-10 text-center px-4 font-bold text-base leading-tight"
          style={{
            fontFamily: "'Sora', sans-serif",
            color: hovered ? "#ffffff" : "#d4af37",
            letterSpacing: "0.02em",
            transition: "color 0.3s ease",
          }}
        >
          {title}
        </p>
      </div>

      {/* ── Card body ── */}
      <div className="flex flex-col flex-1 px-5 pt-4 pb-5">

        {/* Gold top accent rule */}
        <div
          className="w-6 h-0.5 mb-4 rounded-full"
          style={{ background: "linear-gradient(90deg, #d4af37, transparent)" }}
        />

        {/* Title */}
        <h3
          className="font-bold mb-2.5 leading-tight text-white"
          style={{
            fontFamily: "'Sora', sans-serif",
            fontSize: "17px",
            minHeight: "44px",
            display: "flex",
            alignItems: "flex-start",
          }}
        >
          {title}
        </h3>

        {/* Description */}
        <p
          className="mb-4 text-sm leading-relaxed"
          style={{
            fontFamily: "'Outfit', sans-serif",
            color: "rgba(180,180,180,0.7)",
            lineHeight: 1.7,
            minHeight: "64px",
          }}
        >
          {description}
        </p>

        {/* Tech stack badges */}
        <div className="flex flex-wrap gap-2 mb-5" style={{ minHeight: "60px" }}>
          {tech.map((item, index) => (
            <span
              key={index}
              className="px-3 py-1 text-xs font-medium rounded-full transition-all duration-200"
              style={{
                fontFamily: "'Outfit', sans-serif",
                background: "rgba(185,28,28,0.08)",
                border: "1px solid rgba(185,28,28,0.25)",
                color: "rgba(252,165,165,0.8)",
              }}
            >
              {item}
            </span>
          ))}
        </div>

        {/* ── Action buttons ── */}
        <div className="flex flex-wrap gap-2 mt-auto">

          {liveDemo && (
            <a
              href={liveDemo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-300"
              style={{
                fontFamily: "'Outfit', sans-serif",
                background: "linear-gradient(135deg, #991b1b 0%, #b91c1c 100%)",
                border: "1px solid rgba(185,28,28,0.5)",
                color: "#fff",
                boxShadow: "0 2px 12px rgba(185,28,28,0.25)",
                letterSpacing: "0.02em",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 4px 20px rgba(185,28,28,0.5)";
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "0 2px 12px rgba(185,28,28,0.25)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <span>▶</span> Live Demo
            </a>
          )}

          {github && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-300"
              style={{
                fontFamily: "'Outfit', sans-serif",
                background: "rgba(212,175,55,0.06)",
                border: "1px solid rgba(212,175,55,0.32)",
                color: "#d4af37",
                letterSpacing: "0.02em",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(212,175,55,0.12)";
                e.currentTarget.style.boxShadow = "0 4px 16px rgba(212,175,55,0.15)";
                e.currentTarget.style.borderColor = "rgba(212,175,55,0.65)";
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(212,175,55,0.06)";
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.borderColor = "rgba(212,175,55,0.32)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.11.82-.26.82-.577v-2.03c-3.338.724-4.033-1.61-4.033-1.61-.546-1.385-1.333-1.753-1.333-1.753-1.09-.745.083-.73.083-.73 1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.805 1.304 3.49.997.107-.775.42-1.305.762-1.605-2.665-.305-5.467-1.334-5.467-5.933 0-1.31.468-2.38 1.235-3.22-.123-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.3 1.23a11.52 11.52 0 0 1 3-.405c1.02.005 2.046.138 3 .405 2.29-1.552 3.296-1.23 3.296-1.23.655 1.653.243 2.873.12 3.176.77.84 1.234 1.91 1.234 3.22 0 4.61-2.807 5.625-5.48 5.922.431.372.815 1.103.815 2.222v3.293c0 .32.217.694.825.576C20.565 21.796 24 17.298 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
              GitHub
            </a>
          )}

          {linkedinPost && (
            <a
              href={linkedinPost}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-300"
              style={{
                fontFamily: "'Outfit', sans-serif",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(185,28,28,0.18)",
                color: "rgba(200,200,200,0.55)",
                letterSpacing: "0.02em",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(185,28,28,0.07)";
                e.currentTarget.style.color = "#fff";
                e.currentTarget.style.borderColor = "rgba(185,28,28,0.4)";
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                e.currentTarget.style.color = "rgba(200,200,200,0.55)";
                e.currentTarget.style.borderColor = "rgba(185,28,28,0.18)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              Post
            </a>
          )}
        </div>
      </div>

      {/* Bottom shimmer line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px rounded-b-2xl transition-all duration-300"
        style={{
          background: hovered
            ? "linear-gradient(90deg, transparent 0%, #d4af37 40%, #b91c1c 60%, transparent 100%)"
            : "linear-gradient(90deg, transparent 0%, rgba(185,28,28,0.25) 50%, transparent 100%)",
        }}
      />
    </div>
  );
}