import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { MapPin, Calendar, Clock, ChevronRight } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { API_URL, getStrapiMedia } from '../utils/api';


const ExhibitionsArchive = () => {
  const [exhibitions, setExhibitions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExhibitions = async () => {
      try {
        const url = `${API_URL}/exhibitions?populate=*&sort=createdAt:desc`;
        const response = await axios.get(url);
        setExhibitions(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching exhibitions:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchExhibitions();
    window.scroll(0, 0);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-[10px] uppercase tracking-[0.5em] text-gray-400 bg-white">
        Loading Exhibitions...
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <Header />

      <main className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
        {/* Header Section */}
        <header className="mb-16 md:mb-24 text-center space-y-4">
          <span className="text-[10px] uppercase tracking-[0.4em] text-accent font-bold">
            Public Viewings
          </span>
          <h1 className="text-4xl md:text-6xl font-light tracking-tighter uppercase text-gray-900">
            Exhibitions
          </h1>
          <div className="h-px w-12 bg-gray-200 mx-auto mt-6" />
        </header>

        <div className="space-y-12 md:space-y-24">
          {exhibitions.map((exhibit, index) => {
            const e = exhibit.attributes || exhibit;
            const posterUrl = getStrapiMedia(e.poster?.url || e.poster?.data?.attributes?.url);

            return (
              <motion.div
                key={exhibit.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="group grid grid-cols-1 lg:grid-cols-12 gap-0 bg-white border border-gray-100 rounded-sm overflow-hidden shadow-sm hover:shadow-md transition-all duration-500"
              >
                {/* Poster Side - Uses aspect-video on mobile for better vertical rhythm */}
                <div className="lg:col-span-5 bg-gray-50 overflow-hidden aspect-video lg:aspect-auto">
                  {posterUrl ? (
                    <img
                      src={posterUrl}
                      alt={e.title}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[10px] uppercase tracking-widest text-gray-300">
                      Poster Unavailable
                    </div>
                  )}
                </div>

                {/* Content Side */}
                <div className="lg:col-span-7 p-8 md:p-12 flex flex-col justify-center">
                  <div className="space-y-8">
                    <div className="space-y-3">
                      <h2 className="text-2xl md:text-4xl font-light text-gray-900 leading-tight tracking-tight group-hover:text-accent transition-colors duration-300">
                        {e.title}
                      </h2>
                      <div className="h-px w-8 bg-accent/30 group-hover:w-16 transiton-all duration-500" />
                    </div>

                    {/* Meta Info Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-4">
                      <div className="flex items-start gap-4">
                        <MapPin size={16} strokeWidth={1.5} className="text-accent shrink-0 mt-1" />
                        <div className="flex flex-col gap-1">
                          <span className="text-[9px] uppercase tracking-widest text-gray-400 font-bold">Location</span>
                          <span className="text-xs uppercase tracking-widest text-gray-600">{e.location}</span>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <Calendar size={16} strokeWidth={1.5} className="text-accent shrink-0 mt-1" />
                        <div className="flex flex-col gap-1">
                          <span className="text-[9px] uppercase tracking-widest text-gray-400 font-bold">Duration</span>
                          <span className="text-xs uppercase tracking-widest text-gray-600">{e.datePeriod}</span>
                        </div>
                      </div>
                      {e.openingTime && (
                        <div className="flex items-start gap-4">
                          <Clock size={16} strokeWidth={1.5} className="text-accent shrink-0 mt-1" />
                          <div className="flex flex-col gap-1">
                            <span className="text-[9px] uppercase tracking-widest text-gray-400 font-bold">Hours</span>
                            <span className="text-xs uppercase tracking-widest text-gray-600">{e.openingTime}</span>
                          </div>
                        </div>
                      )}
                    </div>

                    <Link
                      to={`/exhibitions/${e.slug}`}
                      className="inline-flex items-center gap-4 pt-6 group/link"
                    >
                      <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-900 group-hover/link:text-accent transition-colors">
                        View Details
                      </span>
                      <div className="p-2 border border-gray-100 rounded-full group-hover/link:border-accent transition-colors">
                       <ChevronRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                      </div>
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {exhibitions.lenght === 0 && (
          <div className="text-center py-40">
            <p className="text-[10px] uppercase tracking-[0.5em] text-gray-300">
              No upcoming exhibitions scheduled.
            </p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default ExhibitionsArchive;