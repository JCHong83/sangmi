import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_URL, getStrapiMedia } from '../utils/api';

const ArtistIntro = () => {
  const [content, setContent] = useState(null);

  useEffect(() => {
    const fetchIntro = async () => {
      try {
        // We fetch the "About" page data or a "Global" setting from Strapi
        const response = await axios.get(`${API_URL}/about?populate=*`);
        if (response.data.data) {
          setContent(response.data.data.attributes || response.data.data);
        }
      } catch (error) {
        console.error("Error fetching artist intro:", error);
      }
    };
    fetchIntro();
  }, []);

  // Use dynamic data if available, otherwise fallback to the artist's name
  const introText = content?.shortBio || "I am a visual artist exploring Colors and Materials through the Canvas. My work is a journey through abstract form and emotional colors."
  const portraitUrl = getStrapiMedia(content?.portrait?.data?.attributes?.url || content?.portrait?.url);

  return (
    <section className="max-w-7xl mx-auto py-16 md:py-32 px-6 md:px-12 lg:px-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">

        {/* Image Container - Becomes second on mobile for better flow */}
        <div className="order-2 md:order-1">
          <div className="relative aspect-4/5 md:aspect-square overflow-hidden bg-gray-100 rounded-sm group">
            {portraitUrl ? (
              <img 
                src={portraitUrl}
                alt="Artist Portrait" 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full bg-gray-50 flex itens-center justify-center text-gray-300 uppercase tracking-widest text-xs">
                Portrait Placeholder
              </div>
            )}
            {/* Subtle frame effect */}
            <div className="absolute inset-0 border border-black/5 pointer-events-none" />
          </div>
        </div>

        {/* Text Content - Stays first on mobile to introduce the name immediately */}
        <div className="order-1 lg:order-2 space-y-8 text-center lg:text-left">
          <div className="space-y-2">
            <span className="text-[10px] uppercase tracking-[0.4em] text-accent font-bold">
              Biographical
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 tracking-tighter">
              {content?.greeting || "Hello, I'm SangMi"}
            </h2>
          </div>

          <p className="text-xl md:text-xl leading-relaxed text-gray-600 font-light max-w-xl mx-auto lg:mx-0">
            {introText}
          </p>

          <div className="pt-4">
            <Link
              to="/about"
              className="inline-flex items-center gap-4 group"
            >
              <span className="text-xs uppercase tracking-[0.3em] font-bold text-gray-900 group-hover:text-accent transition-colors">
                Discover My Story →
              </span>
              <div className="h-px w-8 bg-gray-900 group-hover:bg-accent group-hover:w-12 transition-all" />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ArtistIntro;