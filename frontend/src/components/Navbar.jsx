import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home",     href: "#home"     },
    { name: "About",    href: "#about"    },
    { name: "Services", href: "#services" },
    { name: "Projects", href: "#projects" },
    { name: "Feedback", href: "#feedback" },
    { name: "Contact",  href: "#contact"  },
  ];

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) element.scrollIntoView({ behavior: "smooth" });
    setActiveSection(href.replace("#", ""));
    setIsOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(6,2,2,0.93)" : "transparent",
        borderBottom: scrolled ? "1px solid rgba(185,28,28,0.2)" : "1px solid transparent",
        backdropFilter: scrolled ? "blur(18px)" : "none",
        boxShadow: scrolled ? "0 4px 30px rgba(0,0,0,0.5)" : "none",
      }}
    >
      {/* Top shimmer line */}
      <div
        className="absolute top-0 left-0 right-0 h-px transition-opacity duration-300"
        style={{
          background: "linear-gradient(90deg, transparent 0%, #b91c1c 35%, #d4af37 50%, #b91c1c 65%, transparent 100%)",
          opacity: scrolled ? 1 : 0.4,
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-16">

          {/* ── Logo ── */}
          <motion.button
            onClick={() => scrollToSection("#home")}
            whileHover={{ scale: 1.02 }}
            className="relative flex items-center gap-2.5"
            style={{ background: "none", border: "none", cursor: "pointer" }}
          >
            {/* Red dot accent */}
            <div
              className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{
                background: "linear-gradient(135deg, #7f1d1d 0%, #b91c1c 100%)",
                border: "1px solid rgba(212,175,55,0.4)",
                boxShadow: "0 0 10px rgba(185,28,28,0.55)",
              }}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-white opacity-90" />
            </div>

            <div className="flex items-baseline gap-0.5">
              <span
                className="text-base font-bold tracking-widest"
                style={{
                  fontFamily: "'Sora', sans-serif",
                  background: "linear-gradient(90deg, #ffffff 0%, #d4af37 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Sarvathan
              </span>
              <span
                className="text-base font-bold"
                style={{ fontFamily: "'Sora', sans-serif", color: "rgba(185,28,28,0.9)" }}
              >
                .C
              </span>
            </div>
          </motion.button>

          {/* ── Desktop nav ── */}
          <div className="hidden md:flex items-center gap-0.5">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.replace("#", "");
              return (
                <motion.button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  whileHover={{ scale: 1.04 }}
                  className="relative px-4 py-2 text-sm font-medium tracking-wide transition-all duration-300"
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    color: isActive ? "#d4af37" : "rgba(200,200,200,0.6)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) e.currentTarget.style.color = "#ffffff";
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) e.currentTarget.style.color = "rgba(200,200,200,0.6)";
                  }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="navUnderline"
                      className="absolute bottom-0 left-3 right-3 h-px rounded-full"
                      style={{ background: "linear-gradient(90deg, transparent, #d4af37, transparent)" }}
                    />
                  )}
                  {item.name}
                </motion.button>
              );
            })}

            {/* Hire Me CTA */}
            <a
              href="#contact"
              className="ml-3 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300"
              style={{
                fontFamily: "'Outfit', sans-serif",
                background: "linear-gradient(135deg, #991b1b 0%, #b91c1c 100%)",
                border: "1px solid rgba(185,28,28,0.6)",
                color: "#fff",
                boxShadow: "0 0 14px rgba(185,28,28,0.3)",
                letterSpacing: "0.03em",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 0 24px rgba(185,28,28,0.55), 0 0 0 1px rgba(212,175,55,0.3)";
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "0 0 14px rgba(185,28,28,0.3)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              Hire Me
            </a>
          </div>

          {/* ── Mobile menu button ── */}
          <div className="md:hidden">
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300"
              style={{
                background: "rgba(185,28,28,0.1)",
                border: "1px solid rgba(185,28,28,0.35)",
                color: isOpen ? "#d4af37" : "rgba(220,220,220,0.8)",
              }}
            >
              {isOpen ? <X size={18} /> : <Menu size={18} />}
            </motion.button>
          </div>
        </div>

        {/* ── Mobile dropdown ── */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8, scaleY: 0.96 }}
              animate={{ opacity: 1, y: 0, scaleY: 1 }}
              exit={{ opacity: 0, y: -8, scaleY: 0.96 }}
              transition={{ duration: 0.2 }}
              className="md:hidden mt-2 mb-3 rounded-2xl overflow-hidden"
              style={{
                background: "rgba(8,3,3,0.97)",
                border: "1px solid rgba(185,28,28,0.25)",
                backdropFilter: "blur(18px)",
                boxShadow: "0 12px 40px rgba(0,0,0,0.6), 0 0 30px rgba(185,28,28,0.08)",
              }}
            >
              {/* Top shimmer */}
              <div
                className="h-px"
                style={{ background: "linear-gradient(90deg, transparent, #b91c1c, #d4af37, #b91c1c, transparent)" }}
              />

              <div className="px-4 pt-4 pb-4 space-y-1">
                {navItems.map((item, i) => (
                  <motion.button
                    key={item.name}
                    onClick={() => scrollToSection(item.href)}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                    className="flex items-center gap-3 w-full text-left px-3 py-3 rounded-xl text-sm font-medium transition-all duration-200"
                    style={{
                      fontFamily: "'Outfit', sans-serif",
                      color: "rgba(200,200,200,0.7)",
                      background: "none",
                      border: "none",
                      borderBottom: "1px solid rgba(185,28,28,0.08)",
                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "#d4af37";
                      e.currentTarget.style.background = "rgba(212,175,55,0.04)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "rgba(200,200,200,0.7)";
                      e.currentTarget.style.background = "none";
                    }}
                  >
                    <span
                      className="text-xs font-semibold w-5 text-right flex-shrink-0"
                      style={{ color: "rgba(185,28,28,0.45)", fontFamily: "'Outfit', sans-serif" }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {item.name}
                  </motion.button>
                ))}

                {/* Mobile Hire Me */}
                <a
                  href="#contact"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-2 mt-3 py-3 rounded-xl text-sm font-semibold transition-all duration-300"
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    background: "linear-gradient(135deg, #991b1b 0%, #b91c1c 100%)",
                    border: "1px solid rgba(185,28,28,0.5)",
                    color: "#fff",
                    boxShadow: "0 0 16px rgba(185,28,28,0.25)",
                    letterSpacing: "0.03em",
                  }}
                >
                  Hire Me →
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom accent line on scroll */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px transition-opacity duration-300"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(185,28,28,0.3), rgba(212,175,55,0.2), rgba(185,28,28,0.3), transparent)",
          opacity: scrolled ? 1 : 0,
        }}
      />
    </motion.nav>
  );
};

export default Navbar;