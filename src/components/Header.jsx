import React, { useState } from "react";
import "../index.css"; // adjust path if needed

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Close mobile menu when a link is clicked
  const handleNavClick = () => setMenuOpen(false);

  return (
    <header className="site-header" role="banner">
      <div className="nav-container">
        {/* Logo */}
        <h1 className="logo">G's' Music</h1>

        {/* Desktop nav */}
        <nav className="nav-desktop">
          <a href="/Gs-Music-Site/">Home</a>
          <a href="/Gs-Music-Site/#/releases">Releases</a>
          <a href="/Gs-Music-Site/#/catalouge">Catalogue</a>
        </nav>

        {/* Burger button (mobile only) */}
        <button
          className="burger"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? "✕" : "☰"}
        </button>

        {/* Mobile nav */}
        <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
          <a href="/Gs-Music-Site/" onClick={handleNavClick}>Home</a>
          <a href="/Gs-Music-Site/#/releases" onClick={handleNavClick}>Releases</a>
          <a href="/Gs-Music-Site/#/catalouge" onClick={handleNavClick}>Catalogue</a>
        </nav>
      </div>
    </header>
  );
}
