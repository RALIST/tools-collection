import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Categories</h3>
          <ul>
            <li>
              <Link to="/text-tools">Text Tools</Link>
            </li>
            <li>
              <Link to="/developer-tools">Developer Tools</Link>
            </li>
            <li>
              <Link to="/converters">Converters</Link>
            </li>
            <li>
              <Link to="/generators">Generators</Link>
            </li>
            <li>
              <Link to="/math-tools">Math Tools</Link>
            </li>{" "}
            {/* Added Math Tools */}
          </ul>
        </div>
        <div className="footer-section">
          <h3>Information</h3>
          <ul>
            {/* Render as text until pages exist */}
            <li>
              <span>Privacy Policy</span>
            </li>
            <li>
              <span>Terms of Service</span>
            </li>
            <li>
              <span>Contact</span>
            </li>
          </ul>
        </div>
      </div>
      {/* Use footer-bottom class and dynamic year */}
      <div className="footer-bottom">
        © {new Date().getFullYear()} Useful Online Tools. All rights reserved.
        <div>
          <a
            href="https://scrumtools.app/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Free Scrum tools for developers and designers
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
