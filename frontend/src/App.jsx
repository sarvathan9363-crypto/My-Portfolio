import React, { useEffect, useState } from "react";

import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import ServicesSection from "./components/ServicesSection";
import SkillsSection from "./components/SkillsSection";
import ProjectsSection from "./components/ProjectsSection";
import TestimonialsSection from "./components/TestimonialsSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import ChatWidget from "./components/ChatWidget";
import StickyHireButton from "./components/StickyHireButton";

function App() {
  const [bootDone, setBootDone] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setBootDone(true), 1400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* ── Intro splash ── */}
      {!bootDone && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "#060202",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: "14px",
            animation: "splashFade 0.45s ease 0.95s forwards",
            opacity: 1,
          }}
        >
          {/* Name — static, safe to use gradient clip */}
          <div
            style={{
              fontFamily: "'Sora', sans-serif",
              fontSize: "24px",
              fontWeight: 800,
              letterSpacing: "0.18em",
              background: "linear-gradient(90deg, #ffffff, #d4af37)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              animation: "splashText 0.55s ease 0.1s both",
            }}
          >
            SARVATHAN.C
          </div>

          {/* Tagline — plain color, not animated gradient */}
          <div
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: "11px",
              color: "rgba(185,28,28,0.65)",
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              animation: "splashText 0.55s ease 0.28s both",
            }}
          >
            Full Stack Developer
          </div>

          {/* Loading bar */}
          <div
            style={{
              width: "160px",
              height: "2px",
              background: "rgba(185,28,28,0.18)",
              borderRadius: "999px",
              overflow: "hidden",
              marginTop: "6px",
            }}
          >
            <div
              style={{
                height: "100%",
                background: "linear-gradient(90deg, #991b1b, #d4af37)",
                borderRadius: "999px",
                animation: "splashBar 1s ease 0.2s both",
                width: "0%",
              }}
            />
          </div>
        </div>
      )}

      {/* ── Main app ── */}
      <div
        className="min-h-screen scroll-smooth relative"
        style={{
          background: "#0a0404",
          color: "rgba(220,220,220,0.88)",
          opacity: bootDone ? 1 : 0,
          transition: "opacity 0.5s ease",
        }}
      >
        {/* Global subtle red grid */}
        <div
          className="fixed inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(185,28,28,0.022) 1px, transparent 1px), linear-gradient(90deg, rgba(185,28,28,0.022) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            zIndex: 0,
          }}
        />

        {/* Global top ambient glow */}
        <div
          className="fixed top-0 left-1/2 -translate-x-1/2 pointer-events-none"
          style={{
            width: "800px",
            height: "280px",
            background: "radial-gradient(ellipse, rgba(185,28,28,0.055) 0%, transparent 68%)",
            zIndex: 0,
          }}
        />

        <div className="relative" style={{ zIndex: 1 }}>
          <Navbar />
          <HeroSection />
          <AboutSection />
          <ServicesSection />
          <SkillsSection />
          <ProjectsSection />
          <TestimonialsSection />
          <ContactSection />
          <Footer />
          <ChatWidget />
          <StickyHireButton />
        </div>
      </div>

      <style>{`
        @keyframes splashFade {
          to { opacity: 0; pointer-events: none; }
        }
        @keyframes splashText {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes splashBar {
          from { width: 0%; }
          to   { width: 100%; }
        }
      `}</style>
    </>
  );
}

export default App;