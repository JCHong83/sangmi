import React from 'react';
import { Link } from 'react-router-dom';

// Simple, clean footer with navigation links and copyright
const Footer = () => (
  // Tailwind classes: white background, generous padding, accent border-top
  <footer className="bg-white p-10 border-t-2 border-accent/50">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-gray-700">

      {/* Copyright */}
      <p className="text-sm font-light order-2 md:order-1 mt-4 md:mt-0">
        &copy; {new Date().getFullYear()} SANGMI. All Rights Reserved.
      </p>

      {/* Footer Navigation (Optional, use if you want links at the bottom) */}
      <nav className="order-1 md:order-2">
        <ul className="flex space-x-6 text-sm">
          <li><Link to="#" className="hover:text-accent transition">Privacy</Link></li>
          <li><Link to="#" className="hover:text-accent transition">Terms</Link></li>
          <li><Link to="#" className="hover:text-accent transition">FAQs</Link></li>
        </ul>
      </nav>
    </div>
  </footer>
)

export default Footer;