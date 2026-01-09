import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// Mock data for 4 latest works
const MOCK_WORKS = [
  { id: 1, title: "Form in Flux", imageUrl: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=600&q=80", link: "/work/1" },
  { id: 2, title: "Silent Watcher", imageUrl: "https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&w=600&q=80", link: "/work/2" },
  { id: 3, title: "Echo Chamber", imageUrl: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=600&q=80", link: "/work/3" },
  { id: 4, title: "Chromatic Dream", imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80", link: "/work/4" },
];

const WorkPreviewGallery = () => {
  // // Simple floating animation definition
  // const floatVariants = {
  //   // Start position: slightly high
  //   initial: { y: 0 },
  //   // Animated state: move 10px up/down over 6 seconds
  //   animate: {
  //     y: [0, -10, 0],
  //     transition: {
  //       duration: 6,
  //       ease: "easeInOut",
  //       repeat: Infinity,
  //       repeatType: "loop",
  //     },
  //   },
  // };

  return (
    <section className="py-24 px-8 bg-gray-50">
      <h2 className="text-4xl font-extrabold text-gray-900 text-center mb-16">
        Latest Work Preview
      </h2>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {MOCK_WORKS.map((work) => (
          // Framer Motion applied for floating and hover scale effect
          <motion.div
            key={work.id}
            // initial="initial"
            // animate="animate"
            // variants={floatVariants}
            // style={{ animationDelay: `${index * 0.5}s` }} // staggered delay for floating
            className="group relative overflow-hidden rounded-lg shadow-xl cursor-pointer"
            // Hover effect: scale up to 1.05
            whileHover={{ scale: 1.15, zIndex: 10, boxShadow: "0 30px 60px -12px rgba(0, 0, 0, 0.3)"}}
            transition={{ duration: 0.3 }}
          >
            <Link to={work.link}>
              <div className="aspect-square overflow-hidden">
                <img
                  src={work.imageUrl}
                  alt={work.title}
                  className="w-full h-full object-cover transition duration-500 group-hover:brightness-75"
                />
              </div>

              {/* Overlay with Title */}
              <div className="absolute inset-0 bg-gray-900/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-white text-xl font-semibold tracking-wider p-4 border-2 border-white">
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