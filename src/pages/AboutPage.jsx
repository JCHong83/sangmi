import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Award, GraduationCap, Building2, MapPin } from 'lucide-react';

const AboutPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        // We use deep population to get the nested CV items and the image
        const url = 'http://localhost:1337/api/about-page?populate[0]=portrait&populate[1]=cv_sections.items';
        const response = await axios.get(url);
        setData(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching about page:", error);
        setLoading(false);
      }
    };
    fetchAboutData();
  }, []);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!data) return null;

  // Helper to map icons to category titles
  const getIcon = (title) => {
    const t = title.toLowerCase();
    if (t.includes('education')) return <GraduationCap className="text-accent" />;
    if (t.includes('exhibition')) return <Building2 className="text-accent" />;
    return <Award className="text-accent" />
  };

  const attr = data.attributes || data; // Handle v4 vs v5
  const portraitUrl = attr.portrait?.url || attr.portrait?.data?.attributes?.url;

  return (
    <div className="bg-white min-h-screen">
      <Header />

      <main className="max-w-6xl mx-auto px-8 py-20">

        {/* 1. Biography Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start mb-32">
          <div className="space-y-8">
            <h1 className="text-5xl font-light tracking-tighter text-gray-900 uppercase">
              {attr.title || "About"}
            </h1>
            <div className="space-y-6 text-lg text-gray-600 font-light leading-relaxed whitespace-pre-line">
              {attr.biography}
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-400 uppercase tracking-widest pt-4">
              <MapPin size={16} /> {attr.location}
            </div>
          </div>

          <div className="relative group">
            <div className="absolute -inset-4 border border-accent/20 rounded-sm -z-10 translate-x-2 translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-500"></div>
            {portraitUrl && (
              <img
                src={`http://localhost:1337${portraitUrl}`}
                alt="Artist Portrait"
                className="w-full h-[600px] object-cover rounded-sm grayscayle hover:grayscale-0 transition-all duration-700 shadow-2xl"
              />
            )}
          </div>
        </section>

        {/* 2. Curriculum Section */}
        <section className="border-t border-gray-100 pt-20">
          <h2 className="text-3xl font-light text-gray-900 mb-16 uppercase tracking-widest text-center">
            Curriculum Vitae
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {attr.cv_sections?.map((section, idx) => (
              <div key={idx} className="space-y-6">
                <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
                  {getIcon(section.category_title)}
                  <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-gray-800">
                    {section.category_title}
                  </h3>
                </div>
                <ul className="space-y-6">
                  {section.items?.map((item, i) => (
                    <li key={i} className="flex gap-4 items-start">
                      <span className="text-xs font-bold text-accent pt-1">{item.year}</span>
                      <span className="text-gray-600 font-light text-sm leading-snug">{item.detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;