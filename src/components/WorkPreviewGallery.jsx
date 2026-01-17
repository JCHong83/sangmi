import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';

const WorkPreviewGallery = () => {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] =useState(true);

  useEffect(() => {
    const getArtworks = async () => {
      try {
        // We use ?populate=* to include the image data
        const response = await axios.get('http://localhost:1337/api/artworks?populate=*&sort=createdAt:desc&pagination[limit]=4');
        setArtworks(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching from Strapi:", error);
        setLoading(false);
      }
    };
    getArtworks();
  }, []);

  if (loading) return <div className="py-24 text-center">Loading Gallery...</div>


  return (
    <section className="py-24 px-8 bg-gray-50">
      <h2 className="text-4xl font-extrabold text-gray-900 text-center mb-16">
        Latest Work Preview
      </h2>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {artworks.map((work) => (
          // Framer Motion applied for floating and hover scale effect
          <motion.div
            key={work.id}
            className="group relative overflow-hidden rounded-lg shadow-xl cursor-pointer"
            // Hover effect: scale up to 1.05
            whileHover={{ scale: 1.15, zIndex: 10, boxShadow: "0 30px 60px -12px rgba(0, 0, 0, 0.3)"}}
            transition={{ duration: 0.3 }}
          >
            <Link to={work.link}>
              <div className="aspect-square overflow-hidden">
                <img
                  // Strapi stores images in /uploads
                  src={`http://localhost:1337${work.image.url}`}
                  alt={work.title}
                  className="w-full h-full object-cover transition duration-500 group-hover:brightness-75"
                />
              </div>

              {/* Overlay with Title */}
              <div className="absolute inset-0 bg-gray-900/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-white text-xl font-semibold tracking-wider p-10">
                  {work.title}
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default WorkPreviewGallery;