import { motion } from "framer-motion";
import { services } from "../utils/constants";
import ServiceCard from "./ServiceCard";

export default function ServicesSection() {
  return (
    <section
      id="services"
      className="relative py-28 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #0e0505 0%, #080808 50%, #0e0505 100%)" }}
    >
      {/* Ambient glows */}
      <div
        className="absolute top-1/3 left-0 w-[400px] h-[400px] pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(185,28,28,0.07) 0%, transparent 65%)" }}
      />
      <div
        className="absolute bottom-1/3 right-0 w-[350px] h-[350px] pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(212,175,55,0.05) 0%, transparent 65%)" }}
      />

      <div className="relative max-w-6xl mx-auto px-6 lg:px-10">

        {/* ── Section header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mb-14"
        >
          <div className="flex items-center gap-4 mb-3">
            <div className="w-10 h-px" style={{ background: "linear-gradient(90deg, transparent, #b91c1c)" }} />
            <span
              className="text-xs tracking-[0.35em] uppercase font-semibold"
              style={{ color: "#d4af37", fontFamily: "'Outfit', sans-serif" }}
            >
              Services
            </span>
            <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, rgba(212,175,55,0.3) 0%, transparent 60%)" }} />
            <span
              className="text-xs font-medium"
              style={{ color: "rgba(212,175,55,0.4)", fontFamily: "'Outfit', sans-serif" }}
            >
              {services.length} available
            </span>
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
            What I Can
            <span
              style={{
                WebkitTextFillColor: "transparent",
                background: "linear-gradient(90deg, #b91c1c, #ef4444)",
                WebkitBackgroundClip: "text",
              }}
            >
              {" "}Build for You
            </span>
          </h2>
        </motion.div>

        {/* ── Service cards grid — all original logic preserved ── */}
        <div className="grid md:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="h-full"
            >
              <ServiceCard
                title={service.title}
                description={service.description}
              />
            </motion.div>
          ))}
        </div>
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
    </section>
  );
}