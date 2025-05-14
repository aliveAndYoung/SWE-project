import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaBell, FaUser } from 'react-icons/fa';

const navItems = [
  { to: '/', label: 'Home', icon: <FaHome /> },
  { to: '/search-flights', label: 'Notifications', icon: <FaBell /> }, // Use Search Flights path for demo
  { to: '/account', label: 'Profile', icon: <FaUser /> },
];

export default function NavBar() {
  return (
    <nav className="mx-auto mt-8 flex w-fit max-w-full items-center gap-6 sm:gap-8 rounded-2xl bg-zinc-900/90 px-4 sm:px-8 py-2 sm:py-3 shadow-lg border border-zinc-700 backdrop-blur-md">
      {navItems.map(({ to, label, icon }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            `flex items-center gap-1 sm:gap-2 text-sm sm:text-base font-medium transition-colors duration-200 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-lg 
            ${isActive ? 'text-orange-400 bg-gradient-to-r from-orange-900/30 to-transparent shadow-[0_0_16px_2px_rgba(255,140,0,0.2)]' : 'text-white hover:text-orange-300'}`
          }
          end={to === '/'}
        >
          <span className="text-lg sm:text-xl">{icon}</span>
          <span>{label}</span>
        </NavLink>
      ))}
    </nav>
  );
} 