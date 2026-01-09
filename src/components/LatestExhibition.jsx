import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Calendar, Clock } from 'lucide-react'; // Icons

// Mock data for the exhibition
const EXHIBITION = {
  title: "Retrospective: Shifting Grounds",
  location: "Guggenheim Museum, NYC",
  date: "October 12, 2025 - January 5, 2026",
  time: "10:00 AM - 6:00 PM (Daily)",
  posterUrl: "https://images.unsplash.com/photo-1536924940846-227afb31e2a5?auto=format&fit=crop&w=800&q=80",
  link: "/exhibitions/retrospective-shifting-grounds"
};

const LatestExhibition = () => {
  return (
    <section className="max-w-6xl mx-auto py-24 px-8">
      <h2 className="text-4xl font-extrabold text-gray-900 mb-12 text-center">
        Latest Exhibition
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 border border-gray-200 rounded-xl overflow-hidden shadow-2xl">

        {/* Exhibition Poster */}
        <div className="md:col-span-1 bg-gray-100">
          <Link to={EXHIBITION.link}>
            <img
              src={EXHIBITION.posterUrl}
              alt={`poster for ${EXHIBITION.title}`}
              className="w-full h-full object-cover transform hover:scale-[1.02] transition duration-500"
            />
          </Link>
        </div>

        {/* Exhibition Metadata */}
        <div className="md:col-span-2 p-10 flex flex-col justify-center space-y-8">
          <Link to={EXHIBITION.link}>
            <h3 className="text-5xl font-light text-gray-900 hover:text-accent transition duration-300">
              {EXHIBITION.title}
            </h3>
          </Link>

          {/* Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
            <div className="flex items-center space-x-3">
              <MapPin className="text-accent w-6 h-6 shrink-0" />
              <p className="text-lg">{EXHIBITION.location}</p>
            </div>
            <div className="flex items-center space-x-3">
              <Calendar className="text-accent w-6 h-6 shrink-0" />
              <p className="text-lg">{EXHIBITION.date}</p>
            </div>
            <div className="flex items-center space-x-3">
              <Clock className="text-accent w-6 h-6 shrink-0" />
              <p className="text-lg">{EXHIBITION.time}</p>
            </div>
          </div>

          <Link to={EXHIBITION.link} className="mt-6 self-start py-3 px-8 text-lg bg-gray-900 text-white font-semibold rounded-full shadow-lg hover:bg-accent transition duration-300">
            More Details
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LatestExhibition;