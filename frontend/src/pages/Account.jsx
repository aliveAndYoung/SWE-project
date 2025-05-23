import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apiPut, apiGet } from '../util/api';

// Helper to generate avatar URL (e.g., via ui-avatars.com)
function getAvatarUrl(user) {
    const name = encodeURIComponent(
        user.firstName && user.lastName
            ? `${user.firstName} ${user.lastName}`
            : user.email || "User"
    );
    return `https://ui-avatars.com/api/?name=${name}&background=1e293b&color=fff&size=128&bold=true`;
}

const requiredFields = [
    { key: "email", label: "Email" },
    { key: "firstName", label: "First Name" },
    { key: "lastName", label: "Last Name" },
];
const optionalFields = [
    { key: "location", label: "Location" },
    { key: "ssn", label: "SSN" },
    { key: "dob", label: "Date of Birth" },
];

const tableColumns = [
    { key: "flight", label: "Flight" },
    { key: "date", label: "Date" },
    { key: "from", label: "From" },
    { key: "to", label: "To" },
    { key: "price", label: "Price" },
];

export default function Account() {
    const [user, setUser] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [editData, setEditData] = useState({});
    const [updateError, setUpdateError] = useState('');
    const [showMore, setShowMore] = useState(false);
    const [bookings, setBookings] = useState([]);
    const [sortBy, setSortBy] = useState("date");
    const [sortDir, setSortDir] = useState("desc");
    const [filter, setFilter] = useState("");
    const [filterFocus, setFilterFocus] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const userData = localStorage.getItem("user");
        if (userData) {
            const parsed = JSON.parse(userData);
            setUser(parsed);
            setEditData(parsed);
            // Fetch bookings from backend
            const token = localStorage.getItem('token');
            apiGet('/api/bookings/user', token).then(res => {
                if (res.success && Array.isArray(res.data)) {
                    setBookings(res.data.map(b => ({
                        flight: b.flight,
                        date: b.flight?.date,
                        from: b.flight?.from,
                        to: b.flight?.to,
                        price: b.flight?.price,
                        bookingId: b._id
                    })));
                } else {
                    setBookings([]);
                }
            }).catch(() => setBookings([]));
        } else {
            navigate("/login", { replace: true });
        }
    }, [navigate]);

    function handleSignOut() {
        localStorage.removeItem("user");
        navigate("/login", { replace: true });
    }

    function handleSort(col) {
        if (sortBy === col) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
        else setSortBy(col);
    }

    function getSortedFilteredBookings() {
        let filtered = bookings;
        if (filter) {
            filtered = filtered.filter((b) =>
                Object.values(b).some((val) =>
                    String(val).toLowerCase().includes(filter.toLowerCase())
                )
            );
        }
        const sorted = [...filtered].sort((a, b) => {
            if (sortBy === "price") {
                return sortDir === "asc"
                    ? a.price - b.price
                    : b.price - a.price;
            }
            if (sortBy === "date") {
                return sortDir === "asc"
                    ? new Date(a.date) - new Date(b.date)
                    : new Date(b.date) - new Date(a.date);
            }
            return sortDir === "asc"
                ? String(a[sortBy]).localeCompare(String(b[sortBy]))
                : String(b[sortBy]).localeCompare(String(a[sortBy]));
        });
        return sorted;
    }

    async function handleSaveEdit(e) {
        e.preventDefault();
        setUpdateError('');
        try {
            const token = localStorage.getItem('token');
            const res = await apiPut('/api/auth/updatedetails', editData, token);
            if (res.success && res.data) {
                setUser(res.data);
                localStorage.setItem('user', JSON.stringify(res.data));
                setEditMode(false);
            } else {
                setUpdateError(res.error || 'Update failed');
            }
        } catch {
            setUpdateError('Update failed');
        }
    }

    if (!user) return null;

    return (
        <div className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-x-hidden">
            {/* Background image and overlay */}
            <img
                src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1500&q=80"
                alt="Account background"
                className="fixed inset-0 w-full h-full object-cover z-0 m-0 p-0"
            />
            <div className="fixed inset-0 bg-black/80 z-0 m-0 p-0" />

            {/* Profile Card */}
            <div className="relative z-10 mt-24 mb-8 w-full max-w-2xl flex flex-col items-center">
                <div className="bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl p-8 w-full flex flex-col items-center gap-4 border border-zinc-700">
                    <img
                        src={getAvatarUrl(user)}
                        alt="Avatar"
                        className="w-28 h-28 rounded-full border-4 border-blue-400 shadow-lg bg-zinc-900 object-cover"
                    />
                    <h2 className="text-3xl font-bold text-white mb-1 text-center">
                        {user.firstName} {user.lastName}
                    </h2>
                    <div className="flex flex-col gap-1 text-zinc-200 text-center">
                        {requiredFields.map((f) => (
                            <div
                                key={f.key}
                                className="transition-all duration-300"
                            >
                                <span className="font-semibold text-blue-300">
                                    {f.label}:
                                </span>{" "}
                                {user[f.key] || (
                                    <span className="text-zinc-400">
                                        (not set)
                                    </span>
                                )}
                            </div>
                        ))}
                    </div>
                    {/* Show More Button and Optional Data */}
                    <button
                        onClick={() => setShowMore((m) => !m)}
                        className="mt-2 px-4 py-1 rounded-full bg-gradient-to-r from-blue-900 to-purple-900 text-white font-semibold shadow hover:scale-105 transition"
                    >
                        {showMore ? "Hide" : "Show More"}
                    </button>
                    <div
                        className={`w-full flex flex-col items-center overflow-hidden transition-all duration-500 ${
                            showMore
                                ? "max-h-40 opacity-100 mt-2"
                                : "max-h-0 opacity-0 mt-0"
                        }`}
                        style={{
                            transitionProperty:
                                "max-height, opacity, margin-top",
                        }}
                    >
                        {optionalFields.map((f) => (
                            <div
                                key={f.key}
                                className="flex flex-col items-center w-full animate-slidefade"
                            >
                                <div className="flex flex-col gap-1 text-zinc-200 text-center w-full">
                                    <span className="font-semibold text-purple-300">
                                        {f.label}:
                                    </span>{" "}
                                    {f.key === "dob" && user.dob
                                        ? user.dob.slice(0, 10)
                                        : user[f.key] || (
                                            <span className="text-zinc-500">(not set)</span>
                                        )}
                                </div>
                            </div>
                        ))}
                    </div>
                    {!editMode ? (
                        <>
                            <button
                                onClick={() => setEditMode(true)}
                                className="mt-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded px-6 py-2 transition shadow-lg"
                            >
                                Edit
                            </button>
                            <button
                                onClick={handleSignOut}
                                className="mt-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded px-6 py-2 transition shadow-lg"
                            >
                                Sign Out
                            </button>
                        </>
                    ) : (
                        <form onSubmit={handleSaveEdit} className="flex flex-col gap-2 w-full max-w-md mx-auto mt-4">
                            <label className="text-blue-200 font-semibold">Email
                                <input type="email" value={editData.email || ''} onChange={e => setEditData(d => ({ ...d, email: e.target.value }))} className="w-full rounded px-2 py-1 mt-1 bg-zinc-900 text-white border border-blue-900" required />
                            </label>
                            <label className="text-blue-200 font-semibold">First Name
                                <input type="text" value={editData.firstName || ''} onChange={e => setEditData(d => ({ ...d, firstName: e.target.value }))} className="w-full rounded px-2 py-1 mt-1 bg-zinc-900 text-white border border-blue-900" required />
                            </label>
                            <label className="text-blue-200 font-semibold">Last Name
                                <input type="text" value={editData.lastName || ''} onChange={e => setEditData(d => ({ ...d, lastName: e.target.value }))} className="w-full rounded px-2 py-1 mt-1 bg-zinc-900 text-white border border-blue-900" required />
                            </label>
                            <label className="text-blue-200 font-semibold">Location
                                <input type="text" value={editData.location || ''} onChange={e => setEditData(d => ({ ...d, location: e.target.value }))} className="w-full rounded px-2 py-1 mt-1 bg-zinc-900 text-white border border-blue-900" />
                            </label>
                            <label className="text-blue-200 font-semibold">SSN
                                <input type="text" value={editData.ssn || ''} onChange={e => setEditData(d => ({ ...d, ssn: e.target.value }))} className="w-full rounded px-2 py-1 mt-1 bg-zinc-900 text-white border border-blue-900" />
                            </label>
                            <label className="text-blue-200 font-semibold">Date of Birth
                                <input type="date" value={editData.dob ? editData.dob.slice(0,10) : ''} onChange={e => setEditData(d => ({ ...d, dob: e.target.value }))} className="w-full rounded px-2 py-1 mt-1 bg-zinc-900 text-white border border-blue-900" />
                            </label>
                            <label className="text-blue-200 font-semibold">Visa Card Number
                                <input type="text" value={editData.visaCardNumber || ''} onChange={e => setEditData(d => ({ ...d, visaCardNumber: e.target.value }))} className="w-full rounded px-2 py-1 mt-1 bg-zinc-900 text-white border border-blue-900" />
                            </label>
                            <label className="text-blue-200 font-semibold">Visa Expiry
                                <input type="text" value={editData.visaExpiry || ''} onChange={e => setEditData(d => ({ ...d, visaExpiry: e.target.value }))} className="w-full rounded px-2 py-1 mt-1 bg-zinc-900 text-white border border-blue-900" />
                            </label>
                            <label className="text-blue-200 font-semibold">Visa CW
                                <input type="text" value={editData.visaCW || ''} onChange={e => setEditData(d => ({ ...d, visaCW: e.target.value }))} className="w-full rounded px-2 py-1 mt-1 bg-zinc-900 text-white border border-blue-900" />
                            </label>
                            {updateError && <div className="text-red-500 text-sm text-center">{updateError}</div>}
                            <div className="flex gap-2 mt-2">
                                <button type="submit" className="bg-green-600 hover:bg-green-700 text-white font-semibold rounded px-6 py-2 transition shadow-lg">Save</button>
                                <button type="button" onClick={() => { setEditMode(false); setEditData(user); setUpdateError(''); }} className="bg-zinc-700 hover:bg-zinc-800 text-white font-semibold rounded px-6 py-2 transition shadow-lg">Cancel</button>
                            </div>
                        </form>
                    )}
                </div>
            </div>

            {/* Bookings Table */}
            <div className="relative z-10 w-full max-w-4xl px-2 mb-16">
                <div className="bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl p-6 border border-zinc-700">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                        <div className="flex flex-col gap-1 w-full sm:w-auto animate-fadein">
                            <span
                                className={`text-blue-200 text-sm font-semibold transition-all duration-300 ${
                                    filterFocus || filter
                                        ? "opacity-100 translate-y-0"
                                        : "opacity-60 -translate-y-1"
                                }`}
                            >
                                Filter your bookings
                            </span>
                            <input
                                type="text"
                                placeholder="Type to filter..."
                                value={filter}
                                onChange={(e) => setFilter(e.target.value)}
                                onFocus={() => setFilterFocus(true)}
                                onBlur={() => setFilterFocus(false)}
                                className={`rounded-full px-4 py-1 bg-zinc-900/80 text-white border border-blue-900 focus:border-blue-400 focus:outline-none shadow transition-all duration-300 ${
                                    filterFocus ? "ring-2 ring-blue-400" : ""
                                }`}
                                style={{
                                    boxShadow: filterFocus
                                        ? "0 0 0 2px #60a5fa55"
                                        : undefined,
                                }}
                            />
                        </div>
                        <h3 className="text-2xl font-bold text-white hidden sm:block">
                            Past Bookings
                        </h3>
                    </div>
                    <div className="overflow-x-auto rounded-xl">
                        <table className="min-w-full text-white text-center">
                            <thead>
                                <tr>
                                    {tableColumns.map((col) => (
                                        <th
                                            key={col.key}
                                            onClick={() => handleSort(col.key)}
                                            className={`py-2 px-4 cursor-pointer select-none font-semibold text-blue-300 hover:text-blue-400 transition ${
                                                sortBy === col.key
                                                    ? "underline"
                                                    : ""
                                            }`}
                                            style={{ textDecoration: "none" }}
                                        >
                                            {col.label}
                                            {sortBy === col.key && (
                                                <span className="ml-1">
                                                    {sortDir === "asc"
                                                        ? "▲"
                                                        : "▼"}
                                                </span>
                                            )}
                                        </th>
                                    ))}
                                    <th>Booking ID</th>
                                </tr>
                            </thead>
                            <tbody>
                                {getSortedFilteredBookings().length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan={tableColumns.length + 1}
                                            className="py-8 text-zinc-400 text-lg"
                                        >
                                            no bookings yet —{" "}
                                            <span className="italic text-blue-300">
                                                travel a bit you ain't a tree
                                            </span>
                                        </td>
                                    </tr>
                                ) : (
                                    getSortedFilteredBookings().map((b, i) => (
                                        <tr
                                            key={i}
                                            className="hover:bg-blue-900/20 transition"
                                        >
                                            <td className="py-2 px-4">{b.flight?.airline || '-'}</td>
                                            <td className="py-2 px-4">{b.flight?.date ? b.flight.date.slice(0, 10) : '-'}</td>
                                            <td className="py-2 px-4">{b.flight?.from || '-'}</td>
                                            <td className="py-2 px-4">{b.flight?.to || '-'}</td>
                                            <td className="py-2 px-4">{b.flight?.price != null ? `$${b.flight.price}` : '-'}</td>
                                            <td className="py-2 px-4 font-mono">{b.bookingId || '-'}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {/* Fade-in and slide-fade animation for show more and filter bar */}
            <style>{`
        .animate-fadein {
          animation: fadein 0.4s;
        }
        @keyframes fadein {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: none; }
        }
        .animate-slidefade {
          animation: slidefade 0.5s cubic-bezier(0.4,0,0.2,1);
        }
        @keyframes slidefade {
          from { opacity: 0; transform: translateY(-10px) scaleY(0.95); }
          to { opacity: 1; transform: none; }
        }
      `}</style>
        </div>
    );
}
