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
    <section className="h-screen relative overflow-hidden flex items-center justify-center bg-gray-900">

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
          className="w-full h-full object-cover opacity-70" // Softened image
        />
      </motion.div>

      {/* 2. Title Overlay (Fade In & Slide Up) */}
      <motion.div
        className="relative text-center z-10 p-4"
        // Initial state: slightly down, fully transparent
        initial={{ y: 50, opacity: 0 }}
        // Animation State: slides up to final position, fully opaque
        animate={{ y: 0, opacity: 1 }}
        // Delay and duration for the sequential transition
        transition={{ delay: 1, duration: 0.8, ease: "easeOut" }}
      >
        <Link to={LATEST_WORK.link}>
          <h1 className="text-7xl md:text-8xl font-extrabold uppercase text-white tracking-widest cursor-pointer hover:text-accent transition duration-300">
            {LATEST_WORK.title}
          </h1>
          <p className="text-xl text-gray-200 mt-2">View Work →</p>
        </Link>
      </motion.div>
    </section>
  );
};

export default HeroSection;
