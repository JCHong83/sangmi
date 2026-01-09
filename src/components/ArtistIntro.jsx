import React from 'react';
import { Link } from 'react-router-dom';

const ArtistIntro = () => {
  return (
    <section className="max-w-6xl mx-auto py-24 px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

      {/* Picture of the Artist (Placeholder) */}
      <div className="order-2 md:order-1">
        <div className="w-full h-[400px] bg-gray-200 rounded-lg overflow-hidden shadow-xl">
          <img 
            // This is a high-quality artist studio portrait from Unsplash
            src="https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=800&q=80" 
            alt="Sangmi in her studio" 
            className="w-full h-[500px] object-cover hover:scale-105 transition-transform duration-700"
          />
        </div>
      </div>

      {/* Greeting and Link (Fade In Slide Up from Hero) */}
      <div className="order-1 md:order-2 space-y-6">
        <h2 className="text-4xl font-light text-gray-900">Hello, I'm SangMi</h2>
        <p className="text-xl leading-relaxed text-gray-700">
          I am a visual artist exploring Colors and Materials through the Canvas. My work is a journey through abstract form and emotional colors.
        </p>
        <Link
          to="/about"
          className="inline-block mt-4 text-xl text-accent border-b-2 border-accent hover:border-gray-900 hover:text-gray-900 transition duration-300"
        >
          Discover My Story →
        </Link>
      </div>
    </section>
  );
};

export default ArtistIntro;