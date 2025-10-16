import { useState } from "react";
import React from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-[#FFF0DD] text-[#7a593fde] p-4 flex justify-between items-center fixed w-full top-0 z-50 shadow-md border-b-2 border-[rgba(122,88,63,0.5)]">
      <h1 className="text-xl font-bold">G's Music</h1>

      {/* Burger button (mobile only) */}
      <button
        className="burger text-3xl md:hidden"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        {menuOpen ? "✕" : "☰"}
      </button>

      {/* Navigation links */}
      <nav
        className={`nav-links flex-col md:flex md:flex-row md:space-x-6 absolute md:static top-16 left-0 right-0 bg-[#FFF0DD] md:bg-transparent transition-all duration-300 ease-in-out ${
          menuOpen ? "flex" : "hidden"
        }`}
      >
        <a href="/Gs-Music-Site/" className="p-2 hover:text-[#438092]">
          Home
        </a>
        <a href="/Gs-Music-Site/#/releases" className="p-2 hover:text-[#438092]">
          Releases
        </a>
        <a href="/Gs-Music-Site/#/catalouge" className="p-2 hover:text-[#438092]">
          Catalogue
        </a>
      </nav>
    </header>
  );
}
