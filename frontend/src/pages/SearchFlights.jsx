import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const cities = [
    "Paris",
    "New York",
    "Sydney",
    "Rome",
    "London",
    "Tokyo",
    "Dubai",
    "Cairo",
];

export const mockFlights = [
    {
        id: 1,
        from: "Paris",
        to: "New York",
        date: "2024-06-20",
        time: "09:00",
        airline: "Air France",
        price: "$450",
    },
    {
        id: 2,
        from: "New York",
        to: "London",
        date: "2024-06-21",
        time: "14:30",
        airline: "British Airways",
        price: "$500",
    },
    {
        id: 3,
        from: "Sydney",
        to: "Tokyo",
        date: "2024-06-22",
        time: "07:45",
        airline: "Qantas",
        price: "$600",
    },
    // Additional mock data for better table visibility
    {
        id: 4,
        from: "London",
        to: "Dubai",
        date: "2024-06-23",
        time: "16:00",
        airline: "Emirates",
        price: "$700",
    },
    {
        id: 5,
        from: "Cairo",
        to: "Rome",
        date: "2024-06-24",
        time: "11:15",
        airline: "EgyptAir",
        price: "$350",
    },
    {
        id: 6,
        from: "Tokyo",
        to: "Sydney",
        date: "2024-06-25",
        time: "19:30",
        airline: "ANA",
        price: "$620",
    },
    {
        id: 7,
        from: "Dubai",
        to: "Paris",
        date: "2024-06-26",
        time: "05:50",
        airline: "Air France",
        price: "$800",
    },
    {
        id: 8,
        from: "Rome",
        to: "Cairo",
        date: "2024-06-27",
        time: "13:10",
        airline: "Alitalia",
        price: "$400",
    },
    {
        id: 9,
        from: "London",
        to: "New York",
        date: "2024-06-28",
        time: "08:00",
        airline: "Virgin Atlantic",
        price: "$550",
    },
    {
        id: 10,
        from: "Paris",
        to: "Tokyo",
        date: "2024-06-29",
        time: "22:20",
        airline: "Japan Airlines",
        price: "$900",
    },
];

export default function SearchFlights() {
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [showResults, setShowResults] = useState(false);
    const [filteredFlights, setFilteredFlights] = useState([]);
    const navigate = useNavigate();

    function handleSearch() {
        // Filter mockFlights based on selected criteria
        let results = mockFlights.filter((f) => {
            return (
                (!from || f.from === from) &&
                (!to || f.to === to) &&
                (!date || f.date === date) &&
                (!time || f.time === time)
            );
        });
        setFilteredFlights(results);
        setShowResults(true);
    }

    return (
        <div className="relative min-h-screen w-full flex flex-col items-center justify-start overflow-x-hidden">
            {/* Background image and overlay */}
            <img
                src="https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=1500&q=80"
                alt="Flights background"
                className="fixed inset-0 w-full h-full object-cover z-0 m-0 p-0"
            />
            <div className="fixed inset-0 bg-black/80 z-0 m-0 p-0" />
            {/* Heading */}
            <div className="relative z-10 w-full flex flex-col items-center mt-24 mb-8">
                <h1 className="text-3xl sm:text-4xl font-bold text-white drop-shadow-lg mb-6 tracking-tight">
                    Search Flights
                </h1>
            </div>
            {/* Search Bar */}
            <div className="relative z-10 w-full max-w-3xl flex flex-col sm:flex-row items-center justify-center gap-2 bg-white/10 backdrop-blur-md rounded-2xl shadow-xl px-2 sm:px-4 py-4 mb-8 border border-zinc-700">
                {/* From City */}
                <div className="flex flex-col items-center w-full sm:w-auto">
                    <span className="text-xs text-blue-200 mb-1">From</span>
                    <button
                        className="w-full sm:w-auto px-4 py-2 rounded-lg bg-zinc-900 text-white font-semibold border border-blue-900 hover:bg-blue-900/60 transition"
                        onClick={() => {}}
                    >
                        <select
                            value={from}
                            onChange={(e) => setFrom(e.target.value)}
                            className="bg-zinc-900 text-white outline-none border-none focus:ring-2 focus:ring-blue-400 rounded-lg px-2 py-1 appearance-none w-full"
                            style={{ minWidth: 80 }}
                        >
                            <option value="" className="bg-zinc-900 text-white">
                                Select
                            </option>
                            {cities.map((city) => (
                                <option
                                    key={city}
                                    value={city}
                                    className="bg-zinc-900 text-white"
                                >
                                    {city}
                                </option>
                            ))}
                        </select>
                    </button>
                </div>
                {/* To City */}
                <div className="flex flex-col items-center w-full sm:w-auto">
                    <span className="text-xs text-blue-200 mb-1">To</span>
                    <button
                        className="w-full sm:w-auto px-4 py-2 rounded-lg bg-zinc-900 text-white font-semibold border border-blue-900 hover:bg-blue-900/60 transition"
                        onClick={() => {}}
                    >
                        <select
                            value={to}
                            onChange={(e) => setTo(e.target.value)}
                            className="bg-zinc-900 text-white outline-none border-none focus:ring-2 focus:ring-blue-400 rounded-lg px-2 py-1 appearance-none w-full"
                            style={{ minWidth: 80 }}
                        >
                            <option value="" className="bg-zinc-900 text-white">
                                Select
                            </option>
                            {cities.map((city) => (
                                <option
                                    key={city}
                                    value={city}
                                    className="bg-zinc-900 text-white"
                                >
                                    {city}
                                </option>
                            ))}
                        </select>
                    </button>
                </div>
                {/* Date */}
                <div className="flex flex-col items-center w-full sm:w-auto">
                    <span className="text-xs text-blue-200 mb-1">Date</span>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full sm:w-auto px-4 py-2 rounded-lg bg-zinc-900 text-white font-semibold border border-blue-900 hover:bg-blue-900/60 transition"
                    />
                </div>
                {/* Time */}
                <div className="flex flex-col items-center w-full sm:w-auto">
                    <span className="text-xs text-blue-200 mb-1">Time</span>
                    <input
                        type="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="w-full sm:w-auto px-4 py-2 rounded-lg bg-zinc-900 text-white font-semibold border border-blue-900 hover:bg-blue-900/60 transition"
                    />
                </div>
                {/* Search Button */}
                <button
                    className="w-full sm:w-auto ml-0 sm:ml-2 px-6 py-2 rounded-full bg-gradient-to-r from-blue-900 to-purple-900 text-white font-bold shadow hover:scale-105 transition mt-2 sm:mt-0"
                    onClick={handleSearch}
                >
                    Search
                </button>
            </div>
            {/* Results Table */}
            {showResults && (
                <div className="relative z-10 w-full max-w-4xl px-0 sm:px-2 mb-16 animate-fadein">
                    <div className="bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl p-2 sm:p-6 border border-zinc-700">
                        <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-4">
                            Available Flights
                        </h3>
                        <div className="overflow-x-auto rounded-xl">
                            <table className="min-w-full text-white text-center text-xs sm:text-base">
                                <thead>
                                    <tr>
                                        <th className="py-2 px-2 sm:px-4 text-blue-300">
                                            From
                                        </th>
                                        <th className="py-2 px-2 sm:px-4 text-blue-300">
                                            To
                                        </th>
                                        <th className="py-2 px-2 sm:px-4 text-blue-300">
                                            Date
                                        </th>
                                        <th className="py-2 px-2 sm:px-4 text-blue-300">
                                            Time
                                        </th>
                                        <th className="py-2 px-2 sm:px-4 text-blue-300">
                                            Airline
                                        </th>
                                        <th className="py-2 px-2 sm:px-4 text-blue-300">
                                            Price
                                        </th>
                                        <th className="py-2 px-2 sm:px-4 text-blue-300">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredFlights.length === 0 ? (
                                        <tr>
                                            <td
                                                colSpan={7}
                                                className="py-8 text-zinc-400 text-lg"
                                            >
                                                No flights found for your
                                                search.
                                            </td>
                                        </tr>
                                    ) : (
                                        filteredFlights.map((f) => (
                                            <tr
                                                key={f.id}
                                                className="hover:bg-blue-900/20 transition"
                                            >
                                                <td className="py-2 px-2 sm:px-4">
                                                    {f.from}
                                                </td>
                                                <td className="py-2 px-2 sm:px-4">
                                                    {f.to}
                                                </td>
                                                <td className="py-2 px-2 sm:px-4">
                                                    {f.date}
                                                </td>
                                                <td className="py-2 px-2 sm:px-4">
                                                    {f.time}
                                                </td>
                                                <td className="py-2 px-2 sm:px-4">
                                                    {f.airline}
                                                </td>
                                                <td className="py-2 px-2 sm:px-4">
                                                    {f.price}
                                                </td>
                                                <td className="py-2 px-2 sm:px-4">
                                                    <button
                                                        className="px-2 sm:px-4 py-1 rounded-full bg-gradient-to-r from-blue-900 to-purple-900 text-white font-semibold shadow hover:scale-105 transition text-xs sm:text-base"
                                                        onClick={() =>
                                                            navigate(
                                                                `/flights/${f.id}`
                                                            )
                                                        }
                                                    >
                                                        Show Details
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
            <style>{`
        .animate-fadein {
          animation: fadein 0.5s;
        }
        @keyframes fadein {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: none; }
        }
      `}</style>
        </div>
    );
}
