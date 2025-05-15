import { Link } from "react-router-dom";
import { trendingCities } from '../mockdata/trendingCities';
import TrendingCityCard from '../components/TrendingCityCard';
import { useEffect, useState } from 'react';
import { apiGet } from '../util/api';

export default function Home() {
    const [cities, setCities] = useState(trendingCities);
    useEffect(() => {
        let isMounted = true;
        apiGet('/api/trending-cities')
            .then(res => {
                if (isMounted && res.success && Array.isArray(res.data)) {
                    setCities(res.data);
                }
            })
            .catch(() => {
                setCities(trendingCities); // fallback to mockdata
            });
        return () => { isMounted = false; };
    }, []);

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
                    <span className="block text-blue-400 bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent animate-pulse">
                        The World Is Wide!
                    </span>
                </h1>
            </div>
            {/* Sliding Banner */}
            <div className="relative z-20 w-full py-8 bg-transparent">
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 px-8 text-center">
                    Trending Destinations
                </h2>
                <div className="overflow-x-auto px-0 scrollbar-hide">
                    <div className="flex gap-6 px-8 min-w-max">
                        {cities.map((city) => (
                            <TrendingCityCard key={city.name} city={city} />
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
