import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';


const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu whenever the route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const navLinks = [
    { to: "/About", label: "About"},
    { to: "/art-archive", label: "Archive"},
    { to: "/exhibitions", label: "Exhibitions"},
    { to: "/contact", label: "Contact"},
  ];

  return (
    // Header setup: sticky, white background, shadow for lift, gold bottom border
    <header className="py-4 md:py-6 px-6 md:px-10 flex justify-between items-center bg-white sticky top-0 z-100 shadow-sm border-b border-accent/10">

      {/* Logo/Name (Uppercase for a sharp look) */}
      <div className="text-xl md:text-2xl font-light uppercase tracking-[0.3em] z-110">
        <Link to="/" className="text-gray-900 hover:text-accent transition duration-300">
          SANGMI
        </Link>
      </div>

      {/* Desktop Navigation (Hidden on Mobile) */}
      <nav className="hidden md:block">
        <ul className="flex space-x-10 items-center">
          {navLinks.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                className={({ isActive }) => `text-sm uppercase tracking-widest transition duration-300 ${isActive ? 'text-accent font-bold' : 'text-gray-500 hover:text-accent'}`}
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile Menu Toggle Button (Hidden on Desktop) */}
      <button
        className="md:hidden p-2 z-110 text-gray-900"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Menu"
      >
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 bg-white z-100 flex flex-col items-center justify-center"
          >
            <nav>
              <ul className="flex flex-col items-center space-y-8">
                {navLinks.map((link) => (
                  <li key={link.to}>
                    <NavLink
                      to={link.to}
                      className={({ isActive }) => `text-2xl uppercase tracking-[0.2em]font-light ${isActive ? 'text-accent' : 'text-gray-900'}`}
                    >
                      {link.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Optional: small social link or credit in mobile menu */}
            <div className="absolute bottom-12 text-[10px] uppercase tracking-widest text-gray-400">
              © 2026 Sangmi Art
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;