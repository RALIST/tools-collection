import React, { useState, useEffect } from "react"; // Add useState

import { NavLink, useLocation } from "react-router-dom"; // Import NavLink instead of Link
import { changeFavicon } from "../../../utils/changeFavicon";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import "./Header.css";

const Header: React.FC = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Close mobile menu on location change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // Helper function to determine the className for NavLink
  const getNavLinkClass = ({ isActive }: { isActive: boolean }): string => {
    return isActive ? "active" : "";
  };

  useEffect(() => {
    changeFavicon();
  }, [location]);

  return (
    <header className="header">
      <NavLink to="/" className="logo">
        {" "}
        {/* Use NavLink for logo too if needed, or keep Link */}
        <h1>Useful Online Tools</h1>
      </NavLink>
      <p>Text Tools, Developer Tools, Math Tools, Converters, and Generators</p>

      {/* Hamburger Button - visible only on mobile via CSS */}
      <button
        className="hamburger-button"
        onClick={toggleMobileMenu}
        aria-label="Toggle menu"
        aria-expanded={isMobileMenuOpen}
      >
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
      </button>

      {/* Add class based on state */}
      <nav className={`nav ${isMobileMenuOpen ? "mobile-menu-open" : ""}`}>
        <ul>
          <li>
            {/* Use NavLink with end prop for exact match and className function */}
            <NavLink
              to="/"
              className={getNavLinkClass}
              end
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/text-tools"
              className={getNavLinkClass}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Text Tools
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/developer-tools"
              className={getNavLinkClass}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Developer Tools
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/math-tools"
              className={getNavLinkClass}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Math Tools
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/converters"
              className={getNavLinkClass}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Converters
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/generators"
              className={getNavLinkClass}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Generators
            </NavLink>
          </li>
        </ul>
      </nav>
      {/* Overlay - visible only when mobile menu is open via CSS */}
      {isMobileMenuOpen && (
        <div className="mobile-menu-overlay" onClick={toggleMobileMenu}></div>
      )}
      <div className="theme-toggle-wrapper">
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Header;
