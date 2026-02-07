import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Award, GraduationCap, Building2, MapPin } from 'lucide-react';
import { API_URL, getStrapiMedia } from '../utils/api';

const AboutPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const url = `${API_URL}/about?populate[0]=portrait&populate[1]=cv_sections.items`;
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-[10px] uppercase tracking-[0.5em]">
        Loading Artist Profile...
      </div>
    );
  }
  if (!data) return null;

  const getIcon = (title) => {
    const t = title.toLowerCase();
    if (t.includes('education')) return <GraduationCap size={18} strokeWidth={1.5} />;
    if (t.includes('exhibition')) return <Building2 size={18} strokeWidth={1.5} />;
    return <Award size={18} strokeWidth={1.5} />;
  };

  const attr = data.attributes || data; // Handle v4 vs v5
  const portraitUrl = getStrapiMedia(
    attr.portrait?.url || attr.portrait?.data?.attributes?.url
  );

  return (
    <div className="bg-white min-h-screen">
      <Header />

      <main className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-16 md:py-24">

        {/* 1. Biography Section */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-20 items-start mb-24 md:mb-40">

          {/* Header & Bio - 7 Columns on Desktop */}
          <div className="lg:col-span-7 space-y-8 order-2 lg:order-1">
            <div className="space-y-2">
              <span className="text-[10px] uppercase tracking-[0.4em] text-accent font-bold">
                Artist Profile
              </span>
              <h1 className="text-4xl md:text-6xl font-light tracking-tighter text-gray-900 uppercase">
                {attr.title || "SangMi"}
              </h1>
            </div>

            <div className="space-y-6 text-base md:text-lg text-gray-600 font-light leading-relaxed whitespace-pre-line max-w-2xl">
              {attr.biography}
            </div>

            {attr.location && (
              <div className="flex items-center gap-3 text-[10px] text-gray-400 uppercase tracking-[0.3em] pt-6">
                <MapPin size={14} className="text-accent" /> {attr.location}
              </div>
            )}
          </div>

          {/* Portrait - 5 Columns on Desktop */}
          <div className="lg:col-span-5 order-1 lg:order-2">
            <div className="relative group">
              {/* Decorative Frame */}
              <div className="absolute -inset-3 border border-accent/10 rounded-sm -z-10 translate-x-1 translate-y-1 md:translate-x-4 md:translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-700"></div>
              {portraitUrl && (
                <div className="aspect-4/5 overflow-hidden bg-gray-50 rounded-sm shadow-sm">
                  <img
                    src={portraitUrl}
                    alt="Artist Portrait"
                    className="w-full h-full object-cover grayscayle hover:grayscale-0 transition-all duration-1000"
                  />
                </div>
              )}
            </div>
          </div>
        </section>

        {/* 2. Curriculum Section */}
        <section className="border-t border-gray-100 pt-20">
          <div className="flex flex-col items-center mb-16 space-y-2">
            <h2 className="text-2xl md:text-3xl font-light text-gray-900 uppercase tracking-[0.2em]">
              Curriculum Vitae
            </h2>
            <div className="h-px w-12 bg-accent/40" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
            {attr.cv_sections?.map((section, idx) => (
              <div key={idx} className="space-y-8">
                <div className="flex items-center gap-4 border-b border-gray-50 pb-4">
                  <span className="text-accent">
                    {getIcon(section.category_title)}
                  </span>
                  <h3 className="text-[11px] font-bold uppercase tracking-[0.3em] text-gray-900">
                    {section.category_title}
                  </h3>
                </div>

                <ul className="space-y-8">
                  {section.items?.map((item, i) => (
                    <li key={i} className="flex gap-6 items-start group">
                      <span className="text-[10px] font-bold text-accent pt-1 min-w-10 tracking-widest">
                        {item.year}
                      </span>
                      <span className="text-gray-500 font-light text-sm leading-relaxed group-hover:text-gray-900 transition-colors">
                        {item.detail}
                      </span>
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