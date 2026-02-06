import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Linkedin, Mail } from 'lucide-react';

// Simple, clean footer with navigation links and copyright
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    // Tailwind classes: white background, generous padding, accent border-top
    <footer className="bg-white pt-16 md:pt24 pb-10 px-6 md:px-10 border-t border-gray-100">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-12 mb-16">

        {/* Column 1: Brand/About */}
        <div className="space-y-4 text-center md:text-left flex flex-col items-center md:items-start">
          <h3 className="text-xl font-bold tracking-[0.3em] uppercase">SangMi</h3>
          <p className="text-gray-500 font-light leading-relaxed max-w-xs text-sm md:text-base">
            Viasual Artist exploring the boundaries between abstract geometry and emotional landscapes.
          </p>
        </div>

        {/* Column 2: Navigation Links */}
        <div className="flex flex-col items-center md:items-start space-y-4 md:space-y-3">
          <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-gray-400 mb-2">Navigation</h4>
          <Link to="/art-archive" className="text-sm uppercase tracking-widest hover:text-accent transition">Archive</Link>
          <Link to="/exhibitions" className="text-sm uppercase tracking-widest hover:text-accent transition">Exhibitions</Link>
          <Link to="/about" className="text-sm uppercase tracking-widest hover:text-accent transition">About</Link>
          <Link to="/contact" className="text-sm uppercase tracking-widest hover:text-accent transition">Contact</Link>
        </div>

        {/* Column 3: Contact & Socials */}
        <div className="space-y-8 md:space-y-6 text-center md:text-left flex flex-col items-center md:items-start">
          <div className="space-y-3">
            <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-gray-400">Get in touch</h4>
            <a href="mailto:hello@sangmi-art.com" className="text-lg font-light hover:text-accent transition flex items-center justify-center md:justify-start gap-2">
              <Mail size={18} /> studio@sangmi.art
            </a>
          </div>

          <div className="flex space-x-8 md:space-x-6 text-gray-900">
            <a href="#" className="hover:text-accent transition-all hover:-translate-y-1"><Instagram size={22} /></a>
            <a href="#" className="hover:text-accent transition-all hover:-translate-y-1"><Twitter size={22} /></a>
            <a href="#" className="hover:text-accent transition-all hover:-translate-y-1"><Linkedin size={22} /></a>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto pt-10 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] text-gray-400 uppercase tracking-[0.2em]">
        <p className="text-center">&copy; {currentYear} SangMi. All rights reserved.</p>
        <div className="flex space-x-8">
          <Link to="/privacy" className="hover:text-gray-900 transition-colors">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-gray-900 transition-colors">Terms of Service</Link>
        </div>
      </div>
      
    </footer>
  );
};

export default Footer;