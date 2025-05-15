import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Account() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      navigate('/login', { replace: true });
    }
  }, [navigate]);

  function handleSignOut() {
    localStorage.removeItem('user');
    navigate('/login', { replace: true });
  }

  if (!user) return null;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full text-white">
      <div className="bg-white/10 rounded-2xl shadow-xl p-8 max-w-md w-full flex flex-col items-center gap-4">
        <h2 className="text-3xl font-bold mb-2">Profile</h2>
        <p className="text-lg">Welcome, <span className="font-semibold">{user.name || user.firstName}</span>!</p>
        <p className="text-zinc-300">Email: {user.email}</p>
        <button onClick={handleSignOut} className="mt-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded px-4 py-2 transition">Sign Out</button>
      </div>
    </div>
  );
} 