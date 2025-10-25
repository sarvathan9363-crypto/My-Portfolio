import React from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import { Code, Palette, Rocket, Cpu } from 'lucide-react'; // Changed Zap → Cpu

import 'swiper/css';
import 'swiper/css/pagination';

const HeroSection = () => {
  const slides = [
    {
      icon: Code,
      title: 'Full Stack Developer',
      subtitle: "Building Tomorrow's Web",
      description: 'Crafting innovative solutions with modern technologies',
    },
    {
      icon: Palette,
      title: 'UI/UX Designer',
      subtitle: 'Designing Digital Experiences',
      description: 'Creating intuitive and beautiful user interfaces',
    },
    {
      icon: Rocket,
      title: 'Tech Innovator',
      subtitle: 'Pushing Boundaries',
      description: 'Exploring cutting-edge technologies and frameworks',
    },
    {
      icon: Cpu, // replaced Zap with Cpu
      title: 'Problem Solver',
      subtitle: 'Turning Ideas Into Reality',
      description: 'Transforming complex challenges into elegant solutions',
    },
  ];

  return (
    <section id="home" className="h-screen relative overflow-hidden bg-cyber">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/5 via-transparent to-neon-purple/5"></div>
        <div className="absolute inset-0 bg-cyber-grid"></div>

        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-neon-cyan rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        loop={true}
        className="h-full"
      >
        {slides.map((slide, index) => {
          const IconComponent = slide.icon;

          return (
            <SwiperSlide key={index}>
              {({ isActive }) => (
                <div className="h-full flex items-center justify-center relative perspective-[1200px]">
                  <div className="text-center max-w-4xl px-4">
                    {/* Main Content */}
                    {isActive && (
                      <motion.div
                        key={slide.title}
                        initial={{ opacity: 0, rotateX: -100 }}
                        animate={{ opacity: 1, rotateX: 0 }}
                        exit={{ opacity: 0, rotateX: 100 }}
                        transition={{ duration: 1, ease: 'easeInOut' }}
                        className="mb-8 transform-gpu"
                      >
                        {/* Icon */}
                        <motion.div
                          className="text-neon-cyan mb-6 flex justify-center"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                        >
                          <IconComponent className="w-16 h-16" />
                        </motion.div>

                        {/* Name */}
                        <motion.h1
                          className="font-orbitron text-4xl sm:text-5xl md:text-7xl font-bold mb-4 text-gradient animate-glow"
                          initial={{ scale: 0.5, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.8, delay: 0.5 }}
                        >
                          SARVATHAN
                        </motion.h1>

                        {/* Title */}
                        <motion.h2
                          className="text-xl sm:text-2xl md:text-4xl font-bold text-white mb-2"
                          initial={{ opacity: 0, y: 50 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.8, delay: 0.7 }}
                        >
                          {slide.title}
                        </motion.h2>

                        {/* Subtitle */}
                        <motion.h3
                          className="text-base sm:text-lg md:text-xl text-neon-cyan mb-4"
                          initial={{ opacity: 0, y: -50 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.8, delay: 0.9 }}
                        >
                          {slide.subtitle}
                        </motion.h3>

                        {/* Description */}
                        <motion.p
                          className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto"
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.8, delay: 1.1 }}
                        >
                          {slide.description}
                        </motion.p>
                      </motion.div>
                    )}

                    {/* CTA Button */}
                    {isActive && (
                      <motion.button
                        onClick={() =>
                          document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })
                        }
                        className="glass-effect neon-border px-6 sm:px-8 py-3 sm:py-4 rounded-full text-neon-cyan font-semibold hover:bg-neon-cyan hover:text-dark-bg transition-all duration-300 transform hover:scale-105"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1.3 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Explore My Work
                      </motion.button>
                    )}
                  </div>
                </div>
              )}
            </SwiperSlide>
          );
        })}
      </Swiper>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-neon-cyan rounded-full flex justify-center">
          <div className="w-1 h-3 bg-neon-cyan rounded-full mt-2"></div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
