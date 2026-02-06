import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Calendar, Clock } from 'lucide-react'; // Icons
import axios from 'axios';


const LatestExhibition = () => {
  const [exhibition, setExhibition] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestExhibition = async () => {
      try {
        // Query : Get only 1, sort by newest first
        const url = 'http://localhost:1337/api/exhibitions?populate=*&sort=createdAt:desc&pagination[limit=1';
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

  if (loading) return null; // Or a subtle skeleton loader
  if (!exhibition) return null; // Hide section if no exhibition exist

  // Data normalization for v4/v5
  const data = exhibition.attributes || exhibition;
  const posterUrl = data.poster?.url || data.poster?.data?.attributes?.url;

  return (
    <section className="max-w-6xl mx-auto py-24 px-8">
      <h2 className="text-4xl font-extrabold text-gray-900 mb-12 text-center">
        Latest Exhibition
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 border border-gray-200 rounded-xl overflow-hidden shadow-2xl">

        {/* Exhibition Poster */}
        <div className="md:col-span-1 bg-gray-100">
          {posterUrl && (
            <img
              src={`http://localhost:1337${posterUrl}`}
              alt={data.title}
              className="w-full h-full object-cover transform hover:scale-[1.02] transition duration-500"
            />
          )}
          
        </div>

        {/* Exhibition Metadata */}
        <div className="md:col-span-2 p-10 flex flex-col justify-center space-y-8">
          
            <h3 className="text-5xl font-light text-gray-900 hover:text-accent transition duration-300">
              {data.title}
            </h3>
          

          {/* Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
            <div className="flex items-center space-x-3">
              <MapPin className="text-accent w-6 h-6 shrink-0" />
              <p className="text-lg">{data.location}</p>
            </div>
            <div className="flex items-center space-x-3">
              <Calendar className="text-accent w-6 h-6 shrink-0" />
              <p className="text-lg">{data.dateText}</p>
            </div>
            <div className="flex items-center space-x-3">
              <Clock className="text-accent w-6 h-6 shrink-0" />
              <p className="text-lg">{data.timeText}</p>
            </div>
          </div>

          <Link
            to={`/exhibitions/${data.slug}`}
            className="mt-6 self-start py-3 px-8 text-lg bg-gray-900 text-white font-semibold rounded-full shadow-lg hover:bg-accent transition duration-300"
          >
            Exhibition Details
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LatestExhibition;