import { motion } from "framer-motion";
import { User, MapPin, Calendar, Award } from "lucide-react";
import ProfilePhoto from "../assets/professional-photo.jpg";

const AboutSection = () => {
  const stats = [
    { icon: <Award className="w-5 h-5" />, label: "Projects Delivered", value: "8" },
    { icon: <User className="w-5 h-5" />, label: "Experience", value: "2+ Years" },
    { icon: <MapPin className="w-5 h-5" />, label: "Location", value: "Tiruppur" },
    { icon: <Calendar className="w-5 h-5" />, label: "Availability", value: "Freelance Open" },
  ];

  return (
    <section
      id="about"
      className="relative py-28 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #080808 0%, #0e0505 50%, #080808 100%)" }}
    >
      {/* ── Subtle noise texture overlay ── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`,
        }}
      />

      {/* ── Radial gradient accents ── */}
      <div
        className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(185,28,28,0.07) 0%, transparent 65%)", transform: "translateY(-30%)" }}
      />
      <div
        className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(212,175,55,0.05) 0%, transparent 65%)", transform: "translateY(30%)" }}
      />

      {/* ── Fine horizontal rule lines for depth ── */}
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="absolute left-0 right-0 pointer-events-none"
          style={{
            top: `${12 + i * 16}%`,
            height: "1px",
            background: "linear-gradient(90deg, transparent 0%, rgba(185,28,28,0.04) 30%, rgba(185,28,28,0.04) 70%, transparent 100%)",
          }}
        />
      ))}

      <div className="relative max-w-6xl mx-auto px-6 lg:px-10">

        {/* ── Section header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-3">
            <div className="w-10 h-px" style={{ background: "linear-gradient(90deg, transparent, #b91c1c)" }} />
            <span
              className="text-xs tracking-[0.35em] uppercase font-semibold"
              style={{ color: "#d4af37", fontFamily: "'Outfit', sans-serif", letterSpacing: "0.35em" }}
            >
              About Me
            </span>
            <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, rgba(212,175,55,0.3) 0%, transparent 60%)" }} />
          </div>
          <h2
            className="text-5xl font-bold"
            style={{
              fontFamily: "'Sora', sans-serif",
              background: "linear-gradient(135deg, #ffffff 0%, #f0f0f0 40%, #d4af37 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              lineHeight: 1.1,
            }}
          >
            The Person
            <span style={{ WebkitTextFillColor: "transparent", background: "linear-gradient(90deg, #b91c1c, #ef4444)", WebkitBackgroundClip: "text" }}> Behind the Code</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 items-center">

          {/* ── LEFT — Profile image ── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <div className="relative">

              {/* Outer gold frame lines */}
              <div
                className="absolute -inset-5 rounded-3xl pointer-events-none"
                style={{
                  border: "1px solid rgba(212,175,55,0.15)",
                  borderRadius: "20px",
                }}
              />

              {/* Animated corner accents */}
              {[
                { top: "-8px", left: "-8px", borderTop: true, borderLeft: true },
                { top: "-8px", right: "-8px", borderTop: true, borderRight: true },
                { bottom: "-8px", left: "-8px", borderBottom: true, borderLeft: true },
                { bottom: "-8px", right: "-8px", borderBottom: true, borderRight: true },
              ].map((pos, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }}
                  viewport={{ once: true }}
                  className="absolute w-6 h-6 pointer-events-none"
                  style={{
                    ...pos,
                    borderTopWidth: pos.borderTop ? "2px" : "0",
                    borderBottomWidth: pos.borderBottom ? "2px" : "0",
                    borderLeftWidth: pos.borderLeft ? "2px" : "0",
                    borderRightWidth: pos.borderRight ? "2px" : "0",
                    borderStyle: "solid",
                    borderColor: "#d4af37",
                    borderRadius: "3px",
                  }}
                />
              ))}

              {/* Main glow */}
              <div
                className="absolute -inset-1 rounded-2xl pointer-events-none"
                style={{ boxShadow: "0 0 40px rgba(185,28,28,0.2), 0 0 80px rgba(185,28,28,0.08)" }}
              />

              {/* Image container */}
              <div
                className="relative rounded-2xl overflow-hidden"
                style={{ border: "1px solid rgba(185,28,28,0.35)" }}
              >
                <img
                  src={ProfilePhoto}
                  alt="Sarvathan"
                  className="w-80 block"
                  style={{ filter: "brightness(0.9) contrast(1.06) saturate(0.95)" }}
                />

                {/* Subtle colour-grade overlay */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: "linear-gradient(160deg, rgba(212,175,55,0.04) 0%, transparent 45%, rgba(185,28,28,0.07) 100%)",
                  }}
                />

                {/* Bottom info strip */}
                <div
                  className="absolute bottom-0 left-0 right-0 px-4 py-3 flex items-center justify-between"
                  style={{
                    background: "linear-gradient(0deg, rgba(0,0,0,0.88) 0%, transparent 100%)",
                    backdropFilter: "blur(4px)",
                  }}
                >
                  <div>
                    <p className="text-xs font-semibold text-white" style={{ fontFamily: "'Outfit', sans-serif" }}>Sarvathan C</p>
                    <p className="text-xs" style={{ color: "rgba(212,175,55,0.7)", fontFamily: "'Outfit', sans-serif" }}>Full Stack Developer</p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400" style={{ boxShadow: "0 0 6px rgba(74,222,128,0.9)" }} />
                    <span className="text-xs" style={{ color: "rgba(74,222,128,0.8)", fontFamily: "'Outfit', sans-serif" }}>Available</span>
                  </div>
                </div>
              </div>

              {/* Floating badge — top left */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                viewport={{ once: true }}
                className="absolute -top-4 -left-4 px-3 py-1.5 rounded-lg text-xs font-semibold"
                style={{
                  background: "rgba(10,4,4,0.95)",
                  border: "1px solid rgba(185,28,28,0.5)",
                  color: "#ef4444",
                  fontFamily: "'Outfit', sans-serif",
                  backdropFilter: "blur(10px)",
                  boxShadow: "0 4px 20px rgba(185,28,28,0.15)",
                }}
              >
                Full Stack Dev
              </motion.div>

              {/* Floating badge — bottom right */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                viewport={{ once: true }}
                className="absolute -bottom-4 -right-4 px-3 py-1.5 rounded-lg text-xs font-semibold"
                style={{
                  background: "rgba(10,4,4,0.95)",
                  border: "1px solid rgba(212,175,55,0.4)",
                  color: "#d4af37",
                  fontFamily: "'Outfit', sans-serif",
                  backdropFilter: "blur(10px)",
                  boxShadow: "0 4px 20px rgba(212,175,55,0.1)",
                }}
              >
                EEE Student
              </motion.div>
            </div>
          </motion.div>

          {/* ── RIGHT — Content ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* Bio card */}
            <div
              className="rounded-2xl p-6 mb-7"
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(185,28,28,0.18)",
                backdropFilter: "blur(12px)",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.03), 0 8px 40px rgba(0,0,0,0.3)",
              }}
            >
              {/* Gold top accent */}
              <div
                className="w-8 h-0.5 mb-4 rounded-full"
                style={{ background: "linear-gradient(90deg, #d4af37, transparent)" }}
              />
              <p
                className="leading-relaxed mb-4 text-sm"
                style={{ color: "rgba(215,215,215,0.85)", fontFamily: "'Outfit', sans-serif", lineHeight: 1.8 }}
              >
                I'm <span style={{ color: "#fff", fontWeight: 600 }}>Sarvathan C</span>, a Full Stack Developer and Electrical Engineering
                student. I build clean, fast, and scalable web applications for
                businesses and startups.
              </p>
              <p
                className="leading-relaxed text-sm"
                style={{ color: "rgba(215,215,215,0.75)", fontFamily: "'Outfit', sans-serif", lineHeight: 1.8 }}
              >
                My engineering mindset helps me solve problems analytically and
                deliver reliable digital products using modern web technologies.
              </p>

              {/* Skill tags */}
              <div className="flex flex-wrap gap-2 mt-5">
                {["Full Stack", "Deployment", "UI Systems"].map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-3 py-1 rounded-full font-medium"
                    style={{
                      background: "rgba(185,28,28,0.1)",
                      border: "1px solid rgba(185,28,28,0.3)",
                      color: "rgba(252,165,165,0.85)",
                      fontFamily: "'Outfit', sans-serif",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* LinkedIn CTA */}
            <div className="mb-8">
              <a
                href="https://www.linkedin.com/in/sarvathan-c-923789315"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 group"
                style={{
                  background: "linear-gradient(135deg, rgba(212,175,55,0.1) 0%, rgba(212,175,55,0.05) 100%)",
                  border: "1px solid rgba(212,175,55,0.45)",
                  color: "#d4af37",
                  fontFamily: "'Outfit', sans-serif",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = "linear-gradient(135deg, rgba(212,175,55,0.18) 0%, rgba(212,175,55,0.08) 100%)";
                  e.currentTarget.style.boxShadow = "0 0 24px rgba(212,175,55,0.2), 0 4px 20px rgba(0,0,0,0.3)";
                  e.currentTarget.style.transform = "translateY(-1px)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = "linear-gradient(135deg, rgba(212,175,55,0.1) 0%, rgba(212,175,55,0.05) 100%)";
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                View LinkedIn Profile
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-3">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -2 }}
                  className="relative rounded-xl p-4 text-center overflow-hidden cursor-default group"
                  style={{
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(185,28,28,0.2)",
                    backdropFilter: "blur(8px)",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = "rgba(212,175,55,0.4)";
                    e.currentTarget.style.background = "rgba(212,175,55,0.03)";
                    e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,0.3), 0 0 20px rgba(212,175,55,0.07)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = "rgba(185,28,28,0.2)";
                    e.currentTarget.style.background = "rgba(255,255,255,0.02)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  {/* Top shimmer line */}
                  <div
                    className="absolute top-0 left-0 right-0 h-px"
                    style={{ background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.3), transparent)" }}
                  />

                  <div className="flex justify-center mb-2" style={{ color: "#b91c1c" }}>
                    {stat.icon}
                  </div>

                  <div
                    className="text-2xl font-bold mb-0.5"
                    style={{
                      fontFamily: "'Sora', sans-serif",
                      background: "linear-gradient(135deg, #ffffff 0%, #d4af37 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    {stat.value}
                  </div>

                  <div
                    className="text-xs font-medium tracking-wide"
                    style={{ color: "rgba(180,180,180,0.55)", fontFamily: "'Outfit', sans-serif" }}
                  >
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Bottom divider ── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent 0%, rgba(185,28,28,0.35) 30%, rgba(212,175,55,0.25) 50%, rgba(185,28,28,0.35) 70%, transparent 100%)" }}
      />
    </section>
  );
};

export default AboutSection;