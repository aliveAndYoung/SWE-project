import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";

export default function App() {
    return (
        <div className="min-h-screen flex flex-col bg-zinc-950">
            <NavBar />
            <main className="flex-1 p-4">
                <Outlet />
            </main>
        </div>
    );
}
