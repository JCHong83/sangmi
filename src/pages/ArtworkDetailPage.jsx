import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { X, ZoomIn, ChevronLeft } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';


const ArtworkDetailPage = () => {
  const { slug } = useParams();
  const [artwork, setArtwork] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  useEffect(() => {
    const fetchArtwork = async () => {
      try {
        // Query by slug instead of ID
        const url = `http://localhost:1337/api/artworks?filters[slug][$eq]=${slug}&populate=*`;
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
  }, [slug]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center uppercase tracking-widest text-gray-400">
      Loading Piece...
    </div>
  );

  if (!artwork) retrun (
    <div className="min-h-screen flex items-center justify-center">
      Piece not found.
    </div>
  );

  const a = artwork.attributes || artwork;
  const imageUrl = a.image?.url || a.image?.data?.attributes?.url;
  const categoryName = a.category?.name || a.category?.data?.attributes?.name;

  return (
    <div className="bg-white min-h-screen">
      <Header />

      <main>

        {/* 1. HERO VIEW: 100vh - Header (h-20/80px) */}
        <section className="relative w-full h-[calc(100vh-80px)] bg-gray-50 flex items-center justify-center p-4 md:p-12 overflow-hidden">
          
          <Link
            to="/art-archive"
            className="absolute top-8 left-8 z-10 flex items-center gap-2 text-xs uppercase tracking-widest text-gray-400 hover:text-gray-900 transition-colors"
          >
            <ChevronLeft size={16} /> Back to Archive
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative h-full max-w-full group cursor-zoom-in"
            onClick={() => setIsLightboxOpen(true)}
          >
            <img
              src={`http://localhost:1337${imageUrl}`}
              alt={a.title}
              className="h-full w-auto object-contain shadow-2xl"
            />
            {/* Hover Indicator */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="bg-white/90 p-3 rounded-full shadow-lg">
                <ZoomIn size={24} className="text-gray-900" />
              </div>
            </div>
          </motion.div>

        </section>

        {/* 2. GALLERY CARD VIEW: Details below the fold */}
        <section className="max-w-4xl mx-auto py-24 px-8">
          <div className="border-l-2 border-accent pl-8 md:pl-16 space-y-8">
            <header className="space-y-2">
              <p className="text-xs uppercase tracking-[0.3em] text-accent font-bold">
                {categoryName}
              </p>
              <h1 className="text-5xl font-light text-gray-900 tracking-tighter uppercase">
                {a.title}
              </h1>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-8">
              {/* Technical Details Column */}
              <div className="md:col-span-1 text-sm space-y-4 text-gray-500 uppercase tracking-widest">
                <div>
                  <span className="block font-bold text-gray-900 mb-1">Year</span>
                  {a.year || "2024"}
                </div>
                <div>
                  <span className="block font-bold text-gray-900 mb-1">Medium</span>
                  {a.medium || "Mixed Media on Canvas"}
                </div>
                <div>
                  <span className="block font-bold text-gray-900 mb-1">Dimensions</span>
                  {a.dimensions || "Variable Dimensions"}
                </div>
              </div>

              {/* Description Column */}
              <div className="md:col-span-2">
                <p className="text-lg text-gray-600 font-light leading-relaxed whitespace-pre-line italic">
                  "{a.description || "No description provided for this piece."}"
                </p>
              </div>
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
            className="fixed inset-0 z-100 bg-white flex items-center justify-center p-4"
          >
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="absolute top-8 right-8 text-gray-400 hover:text-gray-900 transition-colors p-2"
            >
              <X size={32} />
            </button>

            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              src={`http://localhost:1337${imageUrl}`}
              alt={a.title}
              className="max-w-full max-h-full object-contain shadow-2xl"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default ArtworkDetailPage;