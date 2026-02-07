import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { API_URL, getStrapiMedia } from '../utils/api';

const WorkPreviewGallery = () => {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] =useState(true);

  useEffect(() => {
    const getArtworks = async () => {
      try {
        // Fetching 4 latest works using the central API_URL
        const response = await axios.get(`${API_URL}/artworks?populate=*&sort=createdAt:desc&pagination[limit]=4`);
        setArtworks(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching from Strapi:", error);
        setLoading(false);
      }
    };
    getArtworks();
  }, []);

  if (loading) {
    return (
      <div className="py-24 text-center uppercase tracking-widest text-xs text-gray-400">Loading Gallery...</div>
    );
  }


  return (
    <section className="py-20 md:py-32 px-6 md:px-10 bg-white">
      <div className="max-w-7xl mx-auto">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-20 gap-4">
          <div className="space-y-2">
            <span className="text-[10px] uppercase tracking-[0.4em] text-accent font-bold">
              Selected Work
            </span>
            <h2 className="text-3xl md:text-5xl font-light text-gray-900 tracking-tighter uppercase">
              Latest Creations
            </h2>
          </div>
          <Link
            to="/art-archive"
            className="text-[10px] uppercase tracking-widest font-bold border-b border-gray-900 pb-1 hover:text-accent hover:border-accent transition-all"
          >
            Explore Full Archive
          </Link>
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-4">
          {artworks.map((work) => {
            const item = work.attributes || work;
            // Using our utility to handle local vs production URLs
            const imageUrl = getStrapiMedia(
              item.image?.data?.attributes?.url || item.image?.url
            );

            return (
            // Framer Motion applied for floating and hover scale effect
            <motion.div
              key={work.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
            >
              <Link to={`/art-archive/${item.slug}`}>
                <div className="relative aspect-3/4 overflow-hidden bg-gray-100 rounded-sm">
                  <img
                    src={imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Minimalist Mobile/Hover Overlay */}
                  <div className="absolute inset-0 bg-black/40 flex flex-col opacity-0 group-hover:opacity-100 transition-opacity duration-500 justify-end p-6 z-10">
                    <p className="text-white text-xs uppercase tracking-[0.3em] font-bold mb-1">
                      View Detail
                    </p>
                    <p className="text-white text-lg uppercase tracking-widest font-light">
                      {item.title}
                    </p>
                  </div>
                </div>

                {/* Title Visible on Mobile (outside the image for clarity) */}
                <div className="mt-4 md:hidden">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold">
                    {item.year || "2026"}
                  </p>
                  <p className="text-sm uppercase tracking-widest text-gray-900">
                    {item.title}
                  </p>
                </div>

              </Link>
            </motion.div>
          );
          })}
        </div>
      </div>
    </section>
  );
};

export default WorkPreviewGallery;