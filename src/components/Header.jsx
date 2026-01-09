import React from 'react';
import { Link, NavLink } from 'react-router-dom';

// Reusable component for navigation links
const NavItem = ({ to, children }) => (
  <li>
    <NavLink
      to={to}
      className={({ isActive }) => 
        // Base styles: dark gray text, transition
        `text-lg font-normal tracking-wide transition duration-150 ease-in-out
        ${isActive
          // Active/Current Page: Gold text and a subtle gold underline
          ? 'text-accent border-b-2 border-accent'
          // Inactive/Hover: Hover state uses gold text
          : 'text-gray-900 hover:text-accent'
        }`
      }
    >
      {children}
    </NavLink>
  </li>
);

const Header = () => {
  return (
    // Header setup: sticky, white background, shadow for lift, gold bottom border
    <header className="py-6 px-10 flex justify-between items-center bg-white sticky top-0 z-10 shadow-md border-b-2 border-accent/20 z-99">

      {/* Logo/Name (Uppercase for a sharp look) */}
      <div className="text-2xl font-light uppercase tracking-widest">
        <Link to="/" className="text-gray-900 hover:text-accent transition duration-300">
          SANGMI
        </Link>
      </div>

      {/* Navigation Menu */}
      <nav>
        {/* Horizontal list with spaced items */}
        <ul className="list-none flex space-x-10">
          <NavItem to="/about">About</NavItem>
          <NavItem to="/art-archive">Archive</NavItem>
          <NavItem to="/exhibitions">Exhibitions</NavItem>
          <NavItem to="/blog">Blog</NavItem>
          <NavItem to="/contact">Contact</NavItem>
        </ul>
      </nav>
    </header>
  );
};

export default Header;