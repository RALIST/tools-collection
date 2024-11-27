import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer: React.FC = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section">
                    <h3>Categories</h3>
                    <ul>
                        <li><Link to="/text-tools">Text Tools</Link></li>
                        <li><Link to="/developer-tools">Developer Tools</Link></li>
                        <li><Link to="/converters">Converters</Link></li>
                        <li><Link to="/generators">Generators</Link></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h3>Information</h3>
                    <ul>
                        <li><Link to="/privacy">Privacy Policy</Link></li>
                        <li><Link to="/terms">Terms of Service</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                    </ul>
                </div>
            </div>
            <p className="copyright">© 2024 Useful Online Tools. All rights reserved.</p>
        </footer>
    );
};

export default Footer;
