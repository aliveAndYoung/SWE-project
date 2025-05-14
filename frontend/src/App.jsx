import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const navItems = [
  { to: '/', label: 'Home', icon: '🏠' },
  { to: '/search-flights', label: 'Search Flights', icon: '✈️' },
  { to: '/account', label: 'Account', icon: '👤' },
];

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <nav className="bg-gray-800 text-white flex justify-around py-4">
        {navItems.map(({ to, label, icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex flex-col items-center px-4 py-2 rounded hover:bg-gray-700 ${isActive ? 'bg-gray-900' : ''}`
            }
            end={to === '/'}
          >
            <span className="text-2xl">{icon}</span>
            <span className="text-xs mt-1">{label}</span>
          </NavLink>
        ))}
      </nav>
      <main className="flex-1 p-4">
        <Outlet />
      </main>
    </div>
  );
} 