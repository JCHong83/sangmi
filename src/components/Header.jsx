import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const navLinks = [
    { to: "/about", label: "About" },
    { to: "/art-archive", label: "Archive" },
    { to: "/exhibitions", label: "Exhibitions" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <>
      {/* 1. MOBILE MENU OVERLAY - z-[150] */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 w-full h-full bg-white z-[150] 
                       flex flex-col items-center justify-center"
          >
            <nav>
              <ul className="flex flex-col items-center space-y-10">
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.to}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <NavLink
                      to={link.to}
                      className={({ isActive }) => `
                        text-3xl uppercase tracking-[0.3em] font-light 
                        ${isActive ? 'text-accent' : 'text-gray-900'}
                      `}
                    >
                      {link.label}
                    </NavLink>
                  </motion.li>
                ))}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. HEADER BAR - z-[200] (Always on top) */}
      <header className="sticky top-0 w-full py-5 md:py-8 px-6 md:px-12 
                       flex justify-between items-center bg-white/90 
                       backdrop-blur-md z-[200] border-b border-gray-50">
        
        {/* Logo */}
        <Link 
          to="/" 
          className="relative text-lg md:text-xl font-light uppercase tracking-[0.4em] 
                     text-gray-900 z-[210]"
        >
          SangMi
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:block">
          <ul className="flex space-x-12 items-center">
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) => `
                    text-[10px] uppercase tracking-[0.3em] font-bold 
                    transition-all duration-300 pb-1 border-b-2
                    ${isActive 
                      ? 'text-gray-900 border-accent' 
                      : 'text-gray-400 border-transparent hover:text-gray-900'}
                  `}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile Toggle Button */}
        <button
          className="md:hidden relative p-2 text-gray-900 z-[210]"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
        </button>
      </header>
    </>
  );
};

export default Header;