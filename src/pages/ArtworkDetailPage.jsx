import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { X, ZoomIn, ChevronLeft } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { API_URL, getStrapiMedia } from '../utils/api';


const ArtworkDetailPage = () => {
  const { slug } = useParams();
  const [artwork, setArtwork] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  useEffect(() => {
    const fetchArtwork = async () => {
      try {
        const url = `${API_URL}/artworks?filters[slug][$eq]=${slug}&populate=*`;
        const response = await axios.get(url);
        if (response.data.data.length > 0) {
          setArtwork(response.data.data[0]);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching artwork:", error);
        setLoading(false);
      }
    };
    fetchArtwork();
    window.scrollTo(0, 0); // Reset scroll on entry
  }, [slug]);

  if (loading) return (
    <div className="h-screen flex items-center justify-center text-[10px] uppercase tracking-[0.5em] text-gray-400">
      Loading Piece...
    </div>
  );

  if (!artwork) retrun (
    <div className="h-screen flex items-center justify-center uppercase tracking-widest">
      Piece not found.
    </div>
  );

  const a = artwork.attributes || artwork;
  const imageUrl = getStrapiMedia(a.image?.url || a.image?.data?.attributes?.url);
  const categoryName = a.category?.name || a.category?.data?.attributes?.name;

  return (
    <div className="bg-white min-h-screen">
      <Header />

      <main>

        {/* 1. HERO VIEW: Optimized for mobile viewports */}
        <section className="relative w-full h-[70vh] md:h-[calc(100svh-96px)] bg-gray-50/50 flex items-center justify-center p-6 md:p-12 overflow-hidden">
          
          <Link
            to="/art-archive"
            className="absolute top-6 left-6 md:top-8 md:left-8 z-10 flex items-center gap-2 text-[9px] md:text-xs uppercase tracking-[0.2em] text-gray-400 hover:text-gray-900 transition-colors"
          >
            <ChevronLeft size={14} /> Back to Archive
          </Link>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative h-full w-full flex items-center justify-center group cursor-zoom-in"
            onClick={() => setIsLightboxOpen(true)}
          >
            <img
              src={imageUrl}
              alt={a.title}
              className="max-h-full max-w-full object-contain shadow-2xl transition-transform duration-700"
            />

            {/* Hover Indicator */}
            <div className="absolute inset-0 hidden md:flex items-center justify-center bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="bg-white/90 p-4 rounded-full shadow-xl">
                <ZoomIn size={20} className="text-gray-900" />
              </div>
            </div>
          </motion.div>
        </section>

        {/* 2. DETAILS SECTION */}
        <section className="max-w-5xl mx-auto py-16 md:py-24 px-8 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16">

            {/* Header Column */}
            <div className="lg:col-span-12 border-b border-gray-100 pb-12">
              <span className="text-[10px] uppercase tracking-[0.4em] text-accent font-bold mb-4 block">
                {categoryName || "Original Work"}
              </span>
              <h1 className="text-4xl md:text-7xl font-light text-gray-900 tracking-tighter uppercase leading-none">
                {a.title}
              </h1>
            </div>

            {/* Technical Column */}
            <div className="lg:col-span-4 space-y-8 order-2 lg:order-1">
              <div className="grid grid-cols-2 lg:grid-cols-1 gap-8">
                <div className="space-y-1">
                  <span className="block text-[10px] uppercase tracking-widest text-gray-400 font-bold">Year</span>
                  <p className="text-sm text-gray-900 font-light">{a.year || "2026"}</p>
                </div>
                <div className="space-y-1">
                  <span className="block text-[10px] uppercase tracking-widest text-gray-400 font-bold">Medium</span>
                  <p className="text-sm text-gray-900 font-light">{a.medium}</p>
                </div>
                <div className="space-y-1">
                  <span className="block text-[10px] uppercase tracking-widest text-gray-400 font-bold">Dimensions</span>
                  <p className="text-sm text-gray-900 font-light">{a.dimensions}</p>
                </div>
              </div>
            </div>

            {/* Description Column */}
            <div className="lg:col-span-8 order-1 lg:order-2">
              <p className="text-lg md:text-xl text-gray-600 font-light leading-relaxed whitespace-pre-line italic">
                "{a.description ? `"${a.description}"` : "Description pending."}"
              </p>
            </div>

          </div>
        </section>
      </main>

      {/* 3. LIGHTBOX OVERLAY */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-200 bg-white flex items-center justify-center p-4 md:p-12"
          >
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="absolute top-6 right-6 md:top-10 md:right-10 text-gray-400 hover:text-gray-900 transition-colors"
            >
              <X size={32} strokeWidth={1} />
            </button>

            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              src={imageUrl}
              alt={a.title}
              className="max-w-full max-h-full object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default ArtworkDetailPage;