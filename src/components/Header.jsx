import React, { useState } from "react";
import "../index.css"; // ensure path matches your project

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  // close menu when a nav link is clicked (nice UX on mobile)
  const handleNavClick = () => setMenuOpen(false);

  return (
    <header className="site-header" role="banner">
      <div className="nav-container">
        <h1 className="logo">G's Music</h1>

        <button
          className="burger"
          onClick={() => setMenuOpen((s) => !s)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? "✕" : "☰"}
        </button>

        <nav className={`nav-links ${menuOpen ? "open" : ""}`} role="navigation">
          <a href="/Gs-Music-Site/" onClick={handleNavClick}>Home</a>
          <a href="/Gs-Music-Site/#/releases" onClick={handleNavClick}>Releases</a>
          <a href="/Gs-Music-Site/#/catalouge" onClick={handleNavClick}>Catalogue</a>
        </nav>
      </div>
    </header>
  );
}
