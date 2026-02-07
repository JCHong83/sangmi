import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Calendar, Clock, ArrowRight } from 'lucide-react'; // Icons
import axios from 'axios';
import { API_URL, getStrapiMedia } from '../utils/api';


const LatestExhibition = () => {
  const [exhibition, setExhibition] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestExhibition = async () => {
      try {
        // Query : Get only 1, sort by newest first
        const url = `${API_URL}/exhibitions?populate=*&sort=createdAt:desc&pagination[limit]=1`;
        const response = await axios.get(url);

        if (response.data.data.length > 0) {
          setExhibition(response.data.data[0]);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching exhibition:", error);
        setLoading(false);
      }
    };
    fetchLatestExhibition();
  }, []);

  if (loading || !exhibition) return null;

  // Data normalization for v4/v5
  const data = exhibition.attributes || exhibition;
  const posterUrl = getStrapiMedia (
    data.poster?.url || data.poster?.data?.attributes?.url
  );

  return (
    <section className="py-24 px-6 md:px-10 bg-gray-50/50">
      <div className="max-w-6xl mx-auto">

        {/* Section Label */}
        <div className="text-center mb-16 md:mb-20">
          <span className="text-[10px] uppercase tracking-[0.5em] text-accent font-bold">
            Current / Upcoming
          </span>
          <h2 className="text-3xl md:text-5xl font-light text-gray-900 uppercase tracking-tighter mt-4">
            Latest Exhibition
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 bg-white border-gray-100 rounded-sm overflow-hidden shadow-sm">

          {/* Exhibition Poster - 5 Columns */}
          <div className="lg:col-span-5 aspect-3/4 lg:aspect-auto overflow-hidden">
            {posterUrl && (
              <img
                src={posterUrl}
                alt={data.title}
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
              />
            )}
          </div>

          {/* Exhibition Metadata */}
          <div className="md:col-span-7 p-8 md:p-16 flex flex-col justify-center">

            <div className="space-y-6">
              <h3 className="text-3xl md:text-5xl font-light text-gray-900 tracking-tighter leading-tight">
                {data.title}
              </h3>

              {/* Details Grid */}
              <div className="space-y-4 text-gray-500 uppercase tracking-widest text-[10px] md:text-xs">
                <div className="flex items-center gap-4">
                  <MapPin size={16} className="text-accent" />
                  <span>{data.location}</span>
                </div>
                <div className="flex items-center gap-4">
                  <Calendar size={16} className="text-accent" />
                  <span>{data.datePeriod || date.dateText}</span>
                </div>
                <div className="flex items-center gap-4">
                  <Clock size={16} className="text-accent" />
                  <span>{data.openingTime || data.timeText}</span>
                </div>
              </div>

              <div className="pt-8">
                <Link
                  to={`/exhibitions/${data.slug}`}
                  className="inline-flex items-center gap-4 group"
                >
                  <span className="text-xs uppercase tracking-[0.3em] font-bold text-gray-900 group-hover:text-accent transition-colors">
                    View Exhibition Details
                  </span>
                  <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default LatestExhibition;