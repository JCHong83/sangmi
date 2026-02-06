import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { X, ChevronLeft, MapPin, Calendar, Clock, ZoomIn } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';


const ExhibitionDetailPage = () => {
  const { slug } = useParams();
  const [exhibit, setExhibit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImg, setSelectedImg] = useState(null);

  useEffect(() => {
    const fetchExhibit = async () => {
      try {
        const url =`http://localhost:1337/api/exhibitions?filters[slug][$eq]=${slug}&populate=*`;
        const response = await axios.get(url);
        if (response.data.data.length > 0) {
          setExhibit(response.data.data[0]);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching exhibition:", error);
        setLoading(false);
      }
    };
    fetchExhibit();
  }, [slug]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center uppercase tracking-widest text-gray-400">
      Loading Exhibition...
    </div>
  );

  if (!exhibit) return <div className="min-h-screen pt-40 text-center">Exhibition not found.</div>

  const e = exhibit.attributes || exhibit;
  const posterUrl = e.poster?.url || e.gallery || [];

  // Extract gallery images for v4/v5
  const galleryData = e.gallery?.data || e.gallery || [];

  return (
    <div className="bg-white min-h-screen">
      <Header />

      <main>
        {/* 1. HERO POSTER SECTION */}
        <section className="relative w-full h-[70vh] bg-gray-900 overflow-hidden">
          {posterUrl && (
            <img
              src={`http://localhost:1337${posterUrl}`}
              alt={e.title}
              className="w-full h-full object-cover opacity-60 blur-sm scale-110"
            />
          )}
          <div className="absolute inset-0 flex items-center justify-center p-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="h-full shadow-2xl rounded-sm overflow-hidden"
            >
              <img
                src={`http://localhost:1337${posterUrl}`}
                alt={e.title}
                className="h-full w-auto object-contain bg-white"
              />
            </motion.div>
          </div>

          <Link
            to="/exhibitions"
            className="absolute top-8 left-8 flex items-center gap-2 text-xs uppercase tracking-widest text-white/70 hover:text-white transition-colors"
          >
            <ChevronLeft size={16} /> Back to Exhibitions
          </Link>
        </section>

        {/* 2. INFORMATION SECTION */}
        <section className="max-w-5xl mx-auto py-20 px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">

            {/* Metadata Sidebar */}
            <div className="md:col-span-1 space-y-8 border-r border-gray-100 pr-8">
              <div>
                <h1 className="text-4xl font-light text-gray-900 tracking-tighter uppercase mb-2">
                  {e.title}
                </h1>
                <p className="text-accent font-bold uppercase tracking-widest text-xs">
                  Event Details
                </p>
              </div>

              <div className="space-y-6 text-sm text-gray-500 uppercase tracking-widest">
                <div className="flex items-start gap-3">
                  <MapPin size={18} className="text-accent shrink-0" />
                  <span>{e.location}</span>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar size={18} className="text-accent shrink-0" />
                  <span>{e.datePeriod}</span>
                </div>
                <div className="flex items-start gap-3">
                  <Clock size={18} className="text-accent shrink-0" />
                  <span>{e.openingTime}</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <div className="prose prose-gray max-w-none text-gray-600 font-light leading-relaxed whitespace-pre-line text-lg">
                {Array.isArray(e.description) ? (
                  e.description.map((block, index) => {
                    // 1. Handle Paragraphs
                    if (block.type === 'paragraph') {
                      return (
                        <p key={index}>
                          {block.children.map((child, i) => (
                            <span
                              key={i}
                              className={child.bold ? 'font-bold text-gray-900' : ''}
                            >
                              {child.text}
                            </span>
                          ))}
                        </p>
                      );
                    }

                    // 2. Handle Headings (h1, h2, etc.)
                    if (block.type === 'heading') {
                      const Level = `h${block.level}`;
                      return (
                        <Level key={index} className="font-medium text-gray-900 mt-8 mb-4">
                          {block.children[0].text}
                        </Level>
                      );
                    }

                    // 3. Handle Lists
                    if (block.type === 'List') {
                      const ListTag = block.format === 'ordered' ? 'ol' : 'ul';
                      return (
                        <ListTag key={index} className="list-inside list-disc ml-4 space-y-2">
                          {block.children.map((item, i) => (
                            <li key={i}>{item.children[0].text}</li>
                          ))}
                        </ListTag>
                      );
                    }

                    return null;
                  })
                ) : (
                  // Fallback if description is just a string or missing
                  <p>{e.description || "No description provided."}</p>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* 3. PHOTO GALLERY GRID */}
        {galleryData.length > 0 && (
          <section className="max-w-7xl mx-auto px-8 pb-32">
            <h3 className="text-xs uppercase tracking-[0.4em] text-gray-400 mb-12 text-center border-t border-gray-100 pt-20">
              Installation Views
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {galleryData.map((img, idx) => {
                const url = img.attributes?.url || img.url;
                return (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.02 }}
                    className="relative aspect-square cursor-zoom-in group overflow-hidden bg-gray-100 rounded-sm"
                    onClick={() => setSelectedImg(url)}
                  >
                    <img
                      src={`http://localhost:1337${url}`}
                      alt={`Gallery view ${idx}`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <ZoomIn className="text-white" size={24} />
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
            className="fixed inset-0 z-100 bg-white flex items-center justify-center p-4"
            onClick={() => setSelectedImg(null)}
          >
            <button className="absolute top-8 right-8 text-gray-900 p-2">
              <X size={32} />
            </button>
            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              src={`http://localhost:1337${selectedImg}`}
              className="max-w-full max-h-full object-contain shadow-2xl"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default ExhibitionDetailPage;