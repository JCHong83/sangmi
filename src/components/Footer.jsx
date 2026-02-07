import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white pt-20 md:pt-32 pb-10 px-6 md:px-12 border-t border-gray-50">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 mb-20">

        {/* 1. BRAND / MISSION */}
        <div className="flex flex-col items-center md:items-start space-y-6">
          <h3 className="text-lg md:text-xl font-light tracking-[0.4em] uppercase text-gray-900">
            SangMi
          </h3>
          <p className="text-gray-400 font-light leading-relaxed max-w-xs 
                        text-xs md:text-sm text-center md:text-left">
            Visual Artist exploring the boundaries between abstract 
            geometry and emotional landscapes. Based in Seoul.
          </p>
        </div>

        {/* 2. NAVIGATION LINKS */}
        <div className="flex flex-col items-center md:items-start space-y-4">
          <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-accent mb-2">
            Explore
          </h4>
          <div className="flex flex-col items-center md:items-start space-y-3">
            {['Archive', 'Exhibitions', 'About', 'Contact'].map((item) => (
              <Link 
                key={item}
                to={`/${item.toLowerCase().replace(' ', '-')}`} 
                className="text-xs uppercase tracking-[0.2em] text-gray-500 
                           hover:text-gray-900 transition-colors duration-300"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>

        {/* 3. CONTACT & SOCIALS */}
        <div className="flex flex-col items-center md:items-start space-y-8">
          <div className="space-y-4 text-center md:text-left">
            <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-accent">
              Connect
            </h4>
            <a 
              href="mailto:studio@sangmi.art" 
              className="group flex items-center gap-3 text-gray-500 
                         hover:text-gray-900 transition-colors"
            >
              <Mail size={16} strokeWidth={1.5} className="group-hover:text-accent" />
              <span className="text-xs uppercase tracking-widest font-light">
                studio@sangmi.art
              </span>
            </a>
          </div>

          <div className="flex space-x-8 text-gray-400">
            {[Instagram, Twitter, Linkedin].map((Icon, idx) => (
              <a 
                key={idx} 
                href="#" 
                className="hover:text-accent transition-all duration-300 
                           hover:-translate-y-1"
              >
                <Icon size={20} strokeWidth={1.5} />
              </a>
            ))}
          </div>
        </div>

      </div>

      {/* BOTTOM BAR */}
      <div className="max-w-7xl mx-auto pt-10 border-t border-gray-50 
                      flex flex-col md:flex-row justify-between items-center 
                      gap-6 text-[9px] text-gray-400 uppercase tracking-[0.3em]">
        
        <p className="text-center">
          &copy; {currentYear} SangMi Studio.
        </p>

        <div className="flex space-x-8">
          <Link to="/privacy" className="hover:text-gray-900 transition-colors">
            Privacy
          </Link>
          <Link to="/terms" className="hover:text-gray-900 transition-colors">
            Terms
          </Link>
        </div>
      </div>
      
    </footer>
  );
};

export default Footer;