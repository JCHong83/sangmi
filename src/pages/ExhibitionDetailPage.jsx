import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { X, ChevronLeft, MapPin, Calendar, Clock, ZoomIn } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { API_URL, getStrapiMedia } from '../utils/api';

const ExhibitionDetailPage = () => {
  const { slug } = useParams();
  const [exhibit, setExhibit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImg, setSelectedImg] = useState(null);

  useEffect(() => {
    const fetchExhibit = async () => {
      try {
        const url = `${API_URL}/exhibitions?filters[slug][$eq]=${slug}&populate=*`;
        const response = await axios.get(url);
        if (response.data.data.length > 0) {
          setExhibit(response.data.data[0]);
        }
      } catch (error) {
        console.error("Error fetching exhibition:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchExhibit();
    window.scrollTo(0, 0);
  }, [slug]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center 
                    text-[10px] uppercase tracking-[0.5em] text-gray-400">
      Loading Exhibition Detail...
    </div>
  );

  if (!exhibit) return <div className="min-h-screen pt-40 text-center uppercase tracking-widest text-xs">Exhibition not found.</div>;

  const e = exhibit.attributes || exhibit;
  const posterUrl = getStrapiMedia(e.poster?.data?.attributes?.url || e.poster?.url);
  const galleryData = e.gallery?.data || e.gallery || [];

  return (
    <div className="bg-white min-h-screen">
      <Header />

      <main>
        {/* 1. HERO POSTER SECTION - Dynamic Height */}
        <section className="relative w-full h-[60vh] md:h-[80vh] bg-gray-950 overflow-hidden">
          {posterUrl && (
            <>
              <img
                src={posterUrl}
                alt={e.title}
                className="w-full h-full object-cover opacity-30 blur-md scale-110"
              />
              <div className="absolute inset-0 flex items-center justify-center p-6 md:p-12">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="h-full max-w-full shadow-2xl rounded-sm overflow-hidden bg-white"
                >
                  <img
                    src={posterUrl}
                    alt={e.title}
                    className="h-full w-auto object-contain mx-auto"
                  />
                </motion.div>
              </div>
            </>
          )}

          <Link
            to="/exhibitions"
            className="absolute top-6 left-6 md:top-8 md:left-8 z-10 
                       flex items-center gap-2 text-[10px] uppercase 
                       tracking-widest text-white/50 hover:text-white transition-colors"
          >
            <ChevronLeft size={14} /> Back
          </Link>
        </section>

        {/* 2. INFORMATION SECTION */}
        <section className="max-w-6xl mx-auto py-16 md:py-24 px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">

            {/* Metadata Sidebar - Moves to bottom on mobile, stays left on desktop */}
            <div className="lg:col-span-4 space-y-10 order-2 lg:order-1 lg:border-r lg:border-gray-100 lg:pr-12">
              <div className="space-y-2">
                <h1 className="text-3xl md:text-5xl font-light text-gray-900 tracking-tighter uppercase leading-tight">
                  {e.title}
                </h1>
                <div className="h-px w-12 bg-accent" />
              </div>

              <div className="space-y-6">
                 <div className="flex items-start gap-4">
                  <MapPin size={18} strokeWidth={1.5} className="text-accent shrink-0 mt-1" />
                  <div className="flex flex-col gap-1">
                    <span className="text-[9px] uppercase tracking-widest text-gray-400 font-bold">Location</span>
                    <span className="text-xs uppercase tracking-widest text-gray-600 leading-relaxed">{e.location}</span>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Calendar size={18} strokeWidth={1.5} className="text-accent shrink-0 mt-1" />
                  <div className="flex flex-col gap-1">
                    <span className="text-[9px] uppercase tracking-widest text-gray-400 font-bold">Dates</span>
                    <span className="text-xs uppercase tracking-widest text-gray-600">{e.datePeriod}</span>
                  </div>
                </div>
                {e.openingTime && (
                  <div className="flex items-start gap-4">
                    <Clock size={18} strokeWidth={1.5} className="text-accent shrink-0 mt-1" />
                    <div className="flex flex-col gap-1">
                      <span className="text-[9px] uppercase tracking-widest text-gray-400 font-bold">Viewing Hours</span>
                      <span className="text-xs uppercase tracking-widest text-gray-600">{e.openingTime}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Description - Moves to top on mobile */}
            <div className="lg:col-span-8 order-1 lg:order-2">
              <div className="text-gray-600 font-light leading-relaxed whitespace-pre-line text-base md:text-lg">
                {Array.isArray(e.description) ? (
                  e.description.map((block, index) => {
                    if (block.type === 'paragraph') {
                      return (
                        <p key={index} className="mb-6 last:mb-0">
                          {block.children.map((child, i) => (
                            <span key={i} className={child.bold ? 'font-bold text-gray-900' : ''}>
                              {child.text}
                            </span>
                          ))}
                        </p>
                      );
                    }
                    if (block.type === 'heading') {
                      const Level = `h${block.level || 2}`;
                      return (
                        <Level key={index} className="text-gray-900 font-normal uppercase tracking-widest mt-12 mb-6">
                          {block.children[0].text}
                        </Level>
                      );
                    }
                    return null;
                  })
                ) : (
                  <p className="italic text-gray-400">"{e.description || "No curatorial statement provided."}"</p>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* 3. PHOTO GALLERY GRID */}
        {galleryData.length > 0 && (
          <section className="max-w-7xl mx-auto px-6 md:px-12 pb-24 md:pb-40">
            <div className="flex items-center gap-8 mb-16">
              <span className="text-[10px] uppercase tracking-[0.5em] text-gray-400 font-bold whitespace-nowrap">
                Installation Views
              </span>
              <div className="h-px w-full bg-gray-100" />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {galleryData.map((img, idx) => {
                const url = getStrapiMedia(img.attributes?.url || img.url);
                return (
                  <motion.div
                    key={idx}
                    whileHover={{ y: -5 }}
                    className="relative aspect-4/5 md:aspect-square cursor-zoom-in group overflow-hidden bg-gray-50 rounded-sm"
                    onClick={() => setSelectedImg(url)}
                  >
                    <img
                      src={url}
                      alt={`Installation view ${idx}`}
                      className="w-full h-full object-cover transition-all duration-700 md:grayscale group-hover:grayscale-0 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="bg-white/90 p-3 rounded-full shadow-lg">
                        <ZoomIn className="text-gray-900" size={18} />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </section>
        )}
      </main>

      {/* 4. LIGHTBOX OVERLAY */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-200 bg-white flex items-center justify-center p-4 md:p-12"
          >
            <button 
              className="absolute top-6 right-6 md:top-10 md:right-10 text-gray-900 z-210 p-2"
              onClick={() => setSelectedImg(null)}
            >
              <X size={32} strokeWidth={1} />
            </button>
            <motion.img
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              src={selectedImg}
              className="max-w-full max-h-full object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default ExhibitionDetailPage;