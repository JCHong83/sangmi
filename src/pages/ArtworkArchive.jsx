import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';


const ArtworkArchive = () => {
  const [artworks, setArtworks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch both categories and artworks (populated with category and image)
        const [catRes, artRes] = await Promise.all([
          axios.get('http://localhost:1337/api/categories'),
          axios.get('http://localhost:1337/api/artworks?populate=*')
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

    if (loading) return (
      <div className="min-h-screen flex items-center justify-center font-light tracking-widest uppercase text-gray-400">
        Loading Archive...
      </div>
    );

  return (
    <div className="bg-white min-h-screen">
      <Header />

      <main className="max-w-7xl mx-auto px-8 py-20">
        <header className="mb-16 text-center">
          <h1 className="text-5xl font-light tracking-tighter uppercase mb-8 text-gray-900">
            Archive
          </h1>

          {/* Filter Bar - Wrapped for vertical view */}
          <div className="flex flex-wrap justify-center gap-8 border-b border-gray-100 pb-6">
            <button
              onClick={() => setActiveFilter('all')}
              className={`text-xs uppercase tracking-widest font-bold transition-all duration-300 ${activeFilter === 'all'
                ? 'text-accent scale-110'
                : 'text-gray-400 hover:text-gray-900'}`}
            >
              All Works
            </button>

            {categories.map(cat => {
              const c = cat.attributes || cat;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveFilter(c.slug)}
                  className={`text-xs uppercase tracking-widest font-bold transition-all duration-300 ${activeFilter === c.slug
                    ? 'text-accent scale-110'
                    : 'text-gray-400 hover:text-gray-900'}`}
                >
                  {c.name}
                </button>
              );
            })}
          </div>
        </header>

        {/* Artwork Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12"
        >
          <AnimatePresence mode='popLayout'>
            {filteredArtworks.map((art) => {
              const a = art.attributes || art;
              const imageUrl = a.image?.url ||
                              a.image?.data?.attributes?.url;
              const categoryName = a.category?.name ||
                                  a.category?.data?.attributes?.name;
              
              return (
                <motion.div
                  key={art.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="group"
                >
                  <Link to={`/art-archive/${a.slug}`}>
                    <div className="aspect-4/5 overflow-hidden bg-gray-50 rounded-sm mb-4 relative shadow-sm group-hover:shadow-xl transition-shadow duration-500">
                      {imageUrl ? (
                        <img
                          src={`http://localhost:1337${imageUrl}`}
                          alt={a.title}
                          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-300 italic">
                          No Image
                        </div>
                      )}
                    </div>

                    <div className="space-y-1">
                      <h3 className="text-lg font-light text-gray-900 group-hover:text-accent transition-colors">
                        {a.title}
                      </h3>
                      <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400">
                        {categoryName || "Uncategorized"}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {filteredArtworks.length === 0 && (
          <div className="py-20 text-center text-gray-400 italic">
            No works found in this category.
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default ArtworkArchive;