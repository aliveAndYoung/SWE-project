import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { mockFlights } from "../mockdata/mockFlights";
import { apiGet } from '../util/api';

// Fetch a city image from Wikimedia Commons (no API key required)
async function fetchCityImage(city) {
    try {
        const res = await fetch(
            `https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&prop=pageimages&titles=${encodeURIComponent(
                city
            )}&pithumbsize=1200`
        );
        const data = await res.json();
        const pages =
            data.query && data.query.pages
                ? Object.values(data.query.pages)
                : [];
        if (pages.length && pages[0].thumbnail && pages[0].thumbnail.source) {
            return pages[0].thumbnail.source;
        }
    } catch {
        // ignore error
    }
    // fallback image
    return "https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?auto=format&fit=crop&w=1500&q=80";
}

export default function FlightDetails() {
    const { id } = useParams();
    const [flight, setFlight] = useState(null);
    const [bgUrl, setBgUrl] = useState("");
    useEffect(() => {
        let isMounted = true;
        // Try to fetch from backend
        apiGet(`/api/flights/${id}`)
            .then(res => {
                if (isMounted && res.success && res.data) {
                    setFlight({ ...res.data, price: `$${res.data.price}` });
                } else {
                    // fallback to mock data
                    const f = mockFlights.find(f => String(f.id) === String(id));
                    setFlight(f || null);
                }
            })
            .catch(() => {
                const f = mockFlights.find(f => String(f.id) === String(id));
                setFlight(f || null);
            });
        return () => { isMounted = false; };
    }, [id]);

    // Only fetch city image if flight exists and has a 'to' field
    useEffect(() => {
        if (flight && flight.to) {
            fetchCityImage(flight.to).then(setBgUrl);
        }
    }, [flight]);

    if (!flight) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen w-full bg-black/80 text-white">
                <div className="bg-white/10 rounded-2xl shadow-xl p-8 max-w-lg w-full flex flex-col items-center gap-4">
                    <h2 className="text-3xl font-bold mb-2">
                        Flight Not Found
                    </h2>
                    <p className="text-zinc-300">
                        Sorry, we couldn't find this flight.
                    </p>
                    <Link
                        to="/search-flights"
                        className="mt-4 text-blue-400 hover:underline"
                    >
                        Back to Search
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-x-hidden">
            {/* Background image and overlay */}
            {bgUrl && (
                <img
                    src={bgUrl}
                    alt={flight.to}
                    className="fixed inset-0 w-full h-full object-cover z-0 m-0 p-0"
                />
            )}
            <div className="fixed inset-0 bg-black/80 z-0 m-0 p-0" />
            <div className="relative z-10 flex flex-col items-center justify-center min-h-[60vh] w-full">
                <div className=" backdrop-blur-md rounded-3xl shadow-2xl p-8 max-w-xl w-full flex flex-col items-center border-4 border-dashed border-blue-400 animate-fadein">
                    <h2 className="text-3xl font-extrabold text-white mb-4 tracking-wider">
                        Electronic Ticket
                    </h2>
                    <div className="w-full flex flex-col gap-4 text-lg text-white">
                        <div className="flex justify-between items-center w-full">
                            <span className="font-bold text-blue-300">
                                From:
                            </span>
                            <span className="font-mono text-xl">
                                {flight.from}
                            </span>
                        </div>
                        <div className="flex justify-between items-center w-full">
                            <span className="font-bold text-purple-300">
                                To:
                            </span>
                            <span className="font-mono text-xl">
                                {flight.to}
                            </span>
                        </div>
                        <div className="flex justify-between items-center w-full">
                            <span className="font-bold text-blue-200">
                                Date:
                            </span>
                            <span className="font-mono">{flight.date}</span>
                        </div>
                        <div className="flex justify-between items-center w-full">
                            <span className="font-bold text-purple-200">
                                Time:
                            </span>
                            <span className="font-mono">{flight.time}</span>
                        </div>
                        <div className="flex justify-between items-center w-full">
                            <span className="font-bold text-blue-100">
                                Airline:
                            </span>
                            <span className="font-mono">{flight.airline}</span>
                        </div>
                        <div className="flex justify-between items-center w-full">
                            <span className="font-bold text-green-300">
                                Price:
                            </span>
                            <span className="font-mono text-2xl">
                                {flight.price}
                            </span>
                        </div>
                        <div className="flex justify-between items-center w-full mt-2">
                            <span className="font-bold text-zinc-300">
                                Ticket ID:
                            </span>
                            <span className="font-mono text-zinc-200">
                                {flight.id}
                            </span>
                        </div>
                    </div>
                    <div className="w-full border-t border-dashed border-blue-400 my-6" />
                    <div className="flex flex-col items-center gap-2">
                        <span className="text-zinc-300 text-sm">
                            Enjoy your trip to{" "}
                            <span className="text-blue-200 font-bold">
                                {flight.to}
                            </span>
                            !
                        </span>
                        <Link
                            to="/search-flights"
                            className="mt-2 px-6 py-2 rounded-full bg-gradient-to-r from-blue-900 to-purple-900 text-white font-bold shadow hover:scale-105 transition"
                        >
                            Back to Search
                        </Link>
                    </div>
                </div>
            </div>
            <style>{`
        .animate-fadein {
          animation: fadein 0.6s;
        }
        @keyframes fadein {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: none; }
        }
      `}</style>
        </div>
    );
}
