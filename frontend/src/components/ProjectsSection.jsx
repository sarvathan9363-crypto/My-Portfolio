import { motion } from "framer-motion";
import { projects } from "../utils/constants";
import ProjectCard from "./ProjectCard";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

export default function ProjectsSection() {
  return (
    <section
      id="projects"
      className="relative py-28 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #080808 0%, #0e0505 50%, #080808 100%)" }}
    >
      {/* Ambient glows */}
      <div
        className="absolute top-0 left-1/3 w-[500px] h-[300px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(185,28,28,0.07) 0%, transparent 65%)", transform: "translateY(-20%)" }}
      />
      <div
        className="absolute bottom-0 right-1/3 w-[400px] h-[300px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(212,175,55,0.05) 0%, transparent 65%)", transform: "translateY(20%)" }}
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
              Projects
            </span>
            <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, rgba(212,175,55,0.3) 0%, transparent 60%)" }} />
            <span
              className="text-xs font-medium"
              style={{ color: "rgba(212,175,55,0.45)", fontFamily: "'Outfit', sans-serif" }}
            >
              {projects.length} delivered
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
            Featured
            <span
              style={{
                WebkitTextFillColor: "transparent",
                background: "linear-gradient(90deg, #b91c1c, #ef4444)",
                WebkitBackgroundClip: "text",
              }}
            >
              {" "}Work
            </span>
          </h2>
        </motion.div>

        {/* ── Swiper — all original logic preserved ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={24}
            pagination={{ clickable: true }}
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            breakpoints={{
              320:  { slidesPerView: 1 },
              768:  { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            style={{ paddingBottom: "52px" }}
          >
            {projects.map((project, index) => (
              <SwiperSlide key={index}>
                <ProjectCard
                  title={project.title}
                  description={project.description}
                  tech={project.tech}
                  liveDemo={project.liveDemo}
                  github={project.github}
                  linkedinPost={project.linkedinPost}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
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

      {/* ── Swiper pagination overrides ── */}
      <style>{`
        .swiper-pagination-bullet {
          width: 8px;
          height: 3px;
          border-radius: 999px;
          background: rgba(185,28,28,0.35);
          opacity: 1;
          transition: all 0.3s ease;
        }
        .swiper-pagination-bullet-active {
          width: 28px;
          background: linear-gradient(90deg, #b91c1c, #d4af37);
          box-shadow: 0 0 8px rgba(185,28,28,0.5);
        }
      `}</style>
    </section>
  );
}