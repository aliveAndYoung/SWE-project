import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-950 text-white">
      <h1 className="text-5xl font-bold mb-4">404</h1>
      <p className="text-xl mb-6">Page Not Found</p>
      <Link
        to="/"
        className="px-6 py-2 rounded-full bg-gradient-to-r from-blue-900 to-purple-900 text-white font-bold shadow hover:scale-105 transition"
      >
        Go Home
      </Link>
    </div>
  );
} 