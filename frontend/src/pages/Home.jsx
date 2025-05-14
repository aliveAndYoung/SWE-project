import { Link } from 'react-router-dom';

const trendingCities = [
  {
    name: 'Paris',
    image: 'https://images.unsplash.com/photo-1505761671935-60b3a7427bad?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'New York',
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Sydney',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Rome',
    image: 'https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?auto=format&fit=crop&w=600&q=80',
  },
];

export default function Home() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen w-full overflow-hidden p-0 m-0">
      {/* Background image */}
      <img
        src="https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?auto=format&fit=crop&w=1500&q=80"
        alt="Flight booking background"
        className="fixed inset-0 w-full h-full object-cover z-0 m-0 p-0"
      />
      {/* Dark overlay */}
      <div className="fixed inset-0 bg-black/70 z-10 m-0 p-0" />
      {/* Slogan Section */}
      <div className="relative z-20 flex flex-col items-center min-h-screen justify-center w-full">
        <h1 className="text-4xl sm:text-6xl font-extrabold text-white text-center drop-shadow-lg tracking-tight leading-tight">
          <span className="block">Life Is Short And</span>
          <span className="block text-blue-300 bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent animate-pulse">The World Is Wide!</span>
        </h1>
      </div>
      {/* Sliding Banner */}
      <div className="relative z-20 w-full py-8 bg-transparent">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 px-8 text-center">Trending Destinations</h2>
        <div className="overflow-x-auto px-0 scrollbar-hide">
          <div className="flex gap-6 px-8 min-w-max">
            {trendingCities.map(city => (
              <div
                key={city.name}
                className="group relative flex-shrink-0 w-72 h-64 rounded-2xl overflow-hidden shadow-xl cursor-pointer"
              >
                <img src={city.image} alt={city.name} className="w-full h-full object-cover" />
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
            ))}
          </div>
        </div>
        {/* Hide scrollbar utility */}
        <style>{`
          .scrollbar-hide::-webkit-scrollbar { display: none; }
          .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        `}</style>
      </div>
    </div>
  );
} 