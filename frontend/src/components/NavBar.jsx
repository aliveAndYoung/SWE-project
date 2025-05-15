import React, { useRef } from "react";
import { NavLink } from "react-router-dom";
import { FaHome, FaPlane, FaUser } from "react-icons/fa";

const navItems = [
    { to: "/", label: "Home", icon: <FaHome /> },
    { to: "/search-flights", label: "Flights", icon: <FaPlane /> },
    { to: "/account", label: "Profile", icon: <FaUser /> },
];

// List of color pairs for gradients and text
const colorCombos = [
    {
        text: "text-orange-400",
        from: "from-orange-900/30",
        shadow: "shadow-[0_0_16px_2px_rgba(255,140,0,0.2)]",
    },
    {
        text: "text-blue-400",
        from: "from-blue-900/30",
        shadow: "shadow-[0_0_16px_2px_rgba(59,130,246,0.2)]",
    },
    {
        text: "text-green-400",
        from: "from-green-900/30",
        shadow: "shadow-[0_0_16px_2px_rgba(34,197,94,0.2)]",
    },
    {
        text: "text-purple-400",
        from: "from-purple-900/30",
        shadow: "shadow-[0_0_16px_2px_rgba(168,85,247,0.2)]",
    },
    {
        text: "text-pink-400",
        from: "from-pink-900/30",
        shadow: "shadow-[0_0_16px_2px_rgba(236,72,153,0.2)]",
    },
];

function getRandomActiveClass() {
    const idx = Math.floor(Math.random() * colorCombos.length);
    const { text, from, shadow } = colorCombos[idx];
    return `${text} bg-gradient-to-r ${from} to-transparent ${shadow}`;
}

export default function NavBar() {
    const activeClassRef = useRef(getRandomActiveClass());

    return (
        <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 mx-auto flex w-fit max-w-full items-center gap-6 sm:gap-8 rounded-2xl bg-zinc-900/90 px-4 sm:px-8 py-2 sm:py-3 shadow-lg border border-zinc-700 backdrop-blur-md">
            {navItems.map(({ to, label, icon }) => (
                <NavLink
                    key={to}
                    to={to}
                    className={({ isActive }) =>
                        `flex items-center gap-1 sm:gap-2 text-sm sm:text-base font-medium transition-colors duration-200 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-lg ` +
                        (isActive
                            ? activeClassRef.current
                            : "text-white hover:text-orange-300")
                    }
                    end={to === "/"}
                >
                    <span className="text-lg sm:text-xl">{icon}</span>
                    <span>{label}</span>
                </NavLink>
            ))}
        </nav>
    );
}
