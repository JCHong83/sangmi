import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// Placeholder for a hard-coded latest artwork (will be dynamic later)
const LATEST_WORK = {
  title: "Ethereal Descent",
  imageUrl: "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&w=1600&q=80",
  link: "/art-archive/ethereal-descent"
};

const HeroSection = () => {
  return (
    // Full screen section: h-screen, relative positioning
    <section className="h-screen h-[100svh] relative overflow-hidden flex items-center justify-center bg-gray-900">

      {/* 1. Full-Page Artwork (Fade In) */}
      <motion.div
        className="absolute inset-0"
        // Initial state: fully transparent
        initial={{ opacity: 0 }}
        // Animation state: fully opaque
        animate={{ opacity: 1 }}
        // Duration of the animation
        transition={{ duration: 1.5 }}
      >
        <img
          src={LATEST_WORK.imageUrl}
          alt={LATEST_WORK.title}
          className="w-full h-full object-cover opacity-60 md:opacity-70" // Softened image
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40 md:hidden" />
      </motion.div>

      {/* 2. Title Overlay (Fade In & Slide Up) */}
      <motion.div
        className="relative text-center z-10 px-6 w-full max-w-5xl"
        // Initial state: slightly down, fully transparent
        initial={{ y: 30, opacity: 0 }}
        // Animation State: slides up to final position, fully opaque
        animate={{ y: 0, opacity: 1 }}
        // Delay and duration for the sequential transition
        transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
      >
        <Link to={LATEST_WORK.link}>
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-light uppercase text-white tracking-tighter md:tracking-widest leading-[1.1] group-hover:text-accent transition duration-500">
            {LATEST_WORK.title}
          </h1>

          <div className="mt-6 flex flex-col items-center gap-2">
            <span className="text-xs md:text-sm uppercase tracking-[0.4em] text-gray-300 group-hover:text-white transition-colors">
              View Featured Work
            </span>

            {/* Aimated line for visual cue */}
            <motion.div
              className="h-px bg-accent w-12"
              initial={{ width: 0 }}
              animate={{ width: 48 }}
              transition={{ delay: 1.5, duration: 1 }}
            />
          </div>
        </Link>
      </motion.div>

      {/* 3. Scroll Indicator (Hidden on small mobile screens to save space) */}
      <motion.div
        className="absolute bottom-10 hidden md:block"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <div className="w-px h-16 bg-gradient-to-b from-accent to-transparent mx-auto" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
