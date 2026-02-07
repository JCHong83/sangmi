import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_URL, getStrapiMedia } from '../utils/api';

const HeroSection = () => {
  const [featuredWork, setFeaturedWork] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestWork = async () => {
      try {
        // Fetch the latest 1 artwork, sorted by creation date
        const response = await axios.get(`${API_URL}/artworks?populate=*&sort=createdAt:desc&pagination[limit]=1`);
        if (response.data.data.length > 0) {
          setFeaturedWork(response.data.data[0]);
        }
      } catch (error) {
        console.error("Error fetching hero artwork:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestWork();
  }, []);

  // While loading or if no data, show a clean dark background
  if (loading || !featuredWork) {
    return <section className="h-svh bg-gray-900" />
  }

  const work = featuredWork.attributes || featuredWork;
  const imageUrl = getStrapiMedia(work.image?.data?.attributes?.url || work.image?.url);

  return (
    // Full screen section: h-screen, relative positioning
    <section className="h-svh relative overflow-hidden flex items-center justify-center bg-gray-900">

      <AnimatePresence>

        {/* 1. Dynamic Background Image */}
        <motion.div
        key="hero-image"
          className="absolute inset-0"
          // Initial state: fully transparent
          initial={{ opacity: 0 }}
          // Animation state: fully opaque
          animate={{ opacity: 1 }}
          // Duration of the animation
          transition={{ duration: 1.5 }}
        >
          {imageUrl && (
            <img
              src={imageUrl}
              alt={work.title}
              className="w-full h-full object-cover opacity-50 md:opacity-60" // Softened image
            />
          )}
          {/* Mobile gradient for text contrast */}
          <div className="absolute inset-0 bg-linear-to-b from-black/40 via-transparent to-black/60 md:hidden" />
        </motion.div>

      </AnimatePresence>

      {/* 2. Content Overlay */}
      <motion.div
        className="relative text-center z-10 px-8 w-full max-w-5xl"
        // Initial state: slightly down, fully transparent
        initial={{ y: 30, opacity: 0 }}
        // Animation State: slides up to final position, fully opaque
        animate={{ y: 0, opacity: 1 }}
        // Delay and duration for the sequential transition
        transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
      >
        <Link to={`/art-archive/${work.slug}`} className="group inline-block">
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-light uppercase text-white tracking-tight md:tracking-widest leading-tight group-hover:text-accent transition duration-500">
            {work.title}
          </h1>

          <div className="mt-8 flex flex-col items-center gap-3">
            <span className="text-[10px] md:text-xs uppercase tracking-[0.5em] text-gray-300 group-hover:text-white transition-colors font-bold">
              View Featured Work
            </span>

            {/* Aimated line for visual cue */}
            <motion.div
              className="h-px bg-accent w-12"
              initial={{ width: 0 }}
              animate={{ width: 48 }}
              transition={{ delay: 1, duration: 1 }}
            />
          </div>
        </Link>
      </motion.div>

      {/* 3. Scroll Indicator */}
      <motion.div
        className="absolute bottom-10 hidden md:flex flex-col items-center gap-4"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <span className="text-[9px] uppercase tracking-[0.3em] text-gray-500 rotate-90 mb-8">Scroll</span>
        <div className="w-px h-12 bg-linear-to-b from-accent to-transparent" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
