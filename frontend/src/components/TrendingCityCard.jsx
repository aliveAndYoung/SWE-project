import React from 'react';
import { Link } from 'react-router-dom';

export default function TrendingCityCard({ city }) {
  return (
    <div
      className="group relative flex-shrink-0 w-72 h-64 rounded-2xl overflow-hidden shadow-xl cursor-pointer"
    >
      <img
        src={city.image}
        alt={city.name}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <Link
          to="/search-flights"
          className="bg-black/60 text-white text-lg font-semibold px-4 py-1 rounded-full mx-auto my-auto shadow-md pointer-events-auto select-none text-center hover:bg-black/80 transition-colors duration-200"
        >
          {city.name}
        </Link>
      </div>
      {/* Hover overlay */}
      <div className="absolute inset-0 bg-black/80 flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-full transition-all duration-300 ease-in-out">
        <Link
          to="/search-flights"
          className="px-5 py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold shadow-lg hover:scale-105 transition-transform duration-200 text-sm"
        >
          Show Flights
        </Link>
      </div>
    </div>
  );
} 