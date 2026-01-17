import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { MapPin, Calendar, Clock, ChevronRight } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';


const ExhibitionsArchive = () => {
  const [exhibitions, setExhibitions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExhibitions = async () => {
      try {
        // Fetching all exhibitions, sorted by the most recent creation
        const url = 'http://localhost:1337/api/exhibitions?populate=*&sort=createdAt:desc';
        const response = await axios.get(url);
        setExhibitions(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching exhibitions:", error);
        setLoading(false);
      }
    };
    fetchExhibitions();
  }, []);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center uppercase tracking-widest text-gray-400">
      Loading Exhibitions...
    </div>
  );

  return (
    <div className="bg-white min-h-screen">
      <Header />

      <main className="max-w-6xl mx-auto px-8 py-20">
        <header className="mb-20 text-center">
          <h1 className="text-5xl font-light tracking-tighter uppercase mb-4 text-gray-900">
            Exhibitions
          </h1>
          <p className="text-gray-500 uppercase tracking-widest text-xs">
            Past, Present, and Upcoming
          </p>
        </header>

        <div className="space-y-16">
          {exhibitions.map((exhibit, index) => {
            const e = exhibit.attributes || exhibit;
            const posterUrl = e.poster?.url || e.poster?.data?.attributes?.url;

            return (
              <motion.div
                key={exhibit.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group grid grid-cols-1 md:grid-cols-12 gap-0 border border-gray-100 rounded-sm overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-500"
              >
                {/* Poster Side (4 Columns) */}
                <div className="md:col-span-4 bg-gray-50 overflow-hidden aspect-3/4 md:aspect-auto">
                  {posterUrl && (
                    <img
                      src={`http://localhost:1337${posterUrl}`}
                      alt={e.title}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                  )}
                </div>

                {/* Content Side (8 Columns) */}
                <div className="md:col-span-8 p-8 md:p-12 flex flex-col justify-center">
                  <div className="space-y-6">
                    <h2 className="text-3xl md:text-4xl font-light text-gray-900 group-hover:text-accent transition-colors">
                      {e.title}
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-500 uppercase tracking-wider">
                      <div className="flex items-center gap-3">
                        <MapPin size={16} className="text-accent" />
                        <span>{e.location}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Calendar size={16} className="text-accent" />
                        <span>{e.datePeriod}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock size={16} className="text-accent" />
                        <span>{e.openingTime}</span>
                      </div>
                    </div>

                    <Link
                      to={`/exhibitions/${e.slug}`}
                      className="inline-flex items-center gap-2 pt-4 text-xs font-bold uppercase tracking-widest text-gray-900 hover:text-accent transition-colors"
                    >
                      View Exhibition Details <ChevronRight size={14} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {exhibitions.lenght === 0 && (
          <div className="text-center py-20 text-grey-400 italic">
            No exhibitions listed at this time.
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default ExhibitionsArchive;