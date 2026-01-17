import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Linkedin, Mail } from 'lucide-react';

// Simple, clean footer with navigation links and copyright
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    // Tailwind classes: white background, generous padding, accent border-top
    <footer className="bg-white pt-20 pb-10 px-8 border-t border-gray-100">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">

        {/* Column 1: Brand/About */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold tracking-widest uppercase">SangMi</h3>
          <p className="text-gray-500 font-light leading-relaxed max-w-xs">
            Viasual Artist exploring the boundaries between abstract geometry and emotional landscapes.
          </p>
        </div>

        {/* Column 2: Navigation Links */}
        <div className="flex flex-col space-y-3">
          <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-gray-400 mb-2">Navigation</h4>
          <Link to="/art-archive" className="hover:text-accent transition">Archive</Link>
          <Link to="/exhibitions" className="hover:text-accent transition">Exhibitions</Link>
          <Link to="/about" className="hover:text-accent transition">About</Link>
          <Link to="/contact" className="hover:text-accent transition">Contact</Link>
        </div>

        {/* Column 3: Contact & Socials */}
        <div className="space-y-6">
          <div className="space-y-2">
            <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-gray-400">Get in touch</h4>
            <a href="mailto:hello@sangmi-art.com" className="text-lg hover:text-accent transition flex items-center gap-2">
              <Mail size={18} /> studio@sangmi.art
            </a>
          </div>

          <div className="flex space-x-5 text-gray-900">
            <a href="#" className="hover:text-accent transition-transform hover:-translate-y-1"><Instagram size={22} /></a>
            <a href="#" className="hover:text-accent transition-transform hover:-translate-y-1"><Twitter size={22} /></a>
            <a href="#" className="hover:text-accent transition-transform hover:-translate-y-1"><Linkedin size={22} /></a>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto pt-8 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-400 uppercase tracking-widest">
        <p>&copy; {currentYear} SangMi. All rights reserved.</p>
        <div className="flex space-x-6">
          <Link to="/privacy" className="hover:text-gray-900">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-gray-900">Terms of Service</Link>
        </div>
      </div>
      
    </footer>
  );
};

export default Footer;