import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { API_URL, getStrapiMedia } from '../utils/api';


const ArtworkArchive = () => {
  const [artworks, setArtworks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catRes, artRes] = await Promise.all([
          axios.get(`${API_URL}/categories`),
          axios.get(`${API_URL}/artworks?populate=*&sort=createdAt:desc`)
        ]);
        setCategories(catRes.data.data);
        setArtworks(artRes.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching archive data:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Filter Logic
  const filteredArtworks = activeFilter === 'all'
    ? artworks
    : artworks.filter(art => {
      const item = art.attributes || art;
      const catSlug = item.category?.slug ||
                      item.category?.data?.attributes?.slug;
      return catSlug === activeFilter;
    });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-[10px] uppercase tracking-[0.5em]">
        Accessing Archive...
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <Header />

      <main className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-20">
        <header className="mb-12 md:mb-20 text-center">
          <div className="space-y-2 mb-8 md:mb-12">
            <span className="text-[10px] uppercase tracking-[0.4em] text-accent font-bold">
              Catalogue
            </span>
            <h1 className="text-4xl md:text-6xl font-light tracking-tighter uppercase text-gray-900">
              Art Archive
            </h1>
          </div>

          {/* Filter Bar - Horizontal scroll on Mobile */}
          <div className="relative border-b border-gray-100">
            <div className="flex overflow-x-auto no-scrollbar justify-start md:justify-center gap-8 pb-4 scroll-smooth px-4">
              <button
                onClick={() => setActiveFilter('all')}
                className={`text-[10px] uppercase tracking-[0.3em] font-bold whitespace-nowrap transition-all duration-300 border-b-2
                  ${activeFilter === 'all'
                  ? 'text-gray-900 border-accent'
                  : 'text-gray-400 border-transparent hover:text-gray-900'}`}
              >
                All Works
              </button>

              {categories.map(cat => {
                const c = cat.attributes || cat;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveFilter(c.slug)}
                    className={`text-[10px] uppercase tracking-[0.3em] font-bold whitespace-nowrap transition-all duration-300 border-b-2
                      ${activeFilter === c.slug
                      ? 'text-gray-900 border-accent'
                      : 'text-gray-400 border-transparent hover:text-gray-900'}`}
                  >
                    {c.name}
                  </button>
                );
              })}
            </div>
          </div>

        </header>

        {/* Artwork Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-16"
        >
          <AnimatePresence mode='popLayout'>
            {filteredArtworks.map((art) => {
              const a = art.attributes || art;
              const imageUrl = getStrapiMedia(a.image?.url ||
                              a.image?.data?.attributes?.url);
              const categoryName = a.category?.name ||
                                  a.category?.data?.attributes?.name;
              
              return (
                <motion.div
                  key={art.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5 }}
                  className="group"
                >
                  <Link to={`/art-archive/${a.slug}`}>
                    <div className="aspect-4/5 overflow-hidden bg-gray-50 rounded-sm mb-6 relative shadow-sm group-hover:shadow-sm transition-all duration-500">
                      {imageUrl ? (
                        <img
                          src={imageUrl}
                          alt={a.title}
                          className="w-full h-full object-cover grayscale md:grayscale-0 group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[10px] uppercase tracking-widest text-gray-300">
                          Pending Image
                        </div>
                      )}
                    </div>

                    <div className="space-y-1 text-center md:text-left px-2">
                      <h3 className="text-sm md:text-lg font-light text-gray-900 group-hover:text-accent transition-colors">
                        {a.title}
                      </h3>
                      <div className="flex items-center justify-center md:justify-start gap-3">
                        <span className="text-[9px] uppercase tracking-[0.2em] text-gray-400 font-bold">
                          {categoryName || "Art"}
                        </span>
                        <span className="text-[9px] text-gray-300">-</span>
                        <span className="text-[9px] uppercase tracking-[0.2em] text-gray-400">
                          {a.year || "2026"}
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {filteredArtworks.length === 0 && (
          <div className="py-40 text-center text-[10px] uppercase tracking-[0.5em] text-gray-300">
            No works found in this category.
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default ArtworkArchive;