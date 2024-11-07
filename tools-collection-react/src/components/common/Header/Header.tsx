import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import './Header.css';

const Header: React.FC = () => {
    const location = useLocation();

    const isActive = (path: string) => {
        return location.pathname === path || location.pathname.startsWith(`${path}/`);
    };

    return (
        <header className="header">
            <Link to="/" className="logo">
                <h1>Useful Online Tools</h1>
            </Link>
            <p>Text Tools, Developer Tools, Converters, and Generators</p>

            <nav className="nav">
                <ul>
                    <li>
                        <Link to="/" className={isActive('/') && !isActive('/text-tools') && !isActive('/developer-tools') && !isActive('/converters') && !isActive('/generators') ? 'active' : ''}>
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to="/text-tools" className={isActive('/text-tools') ? 'active' : ''}>
                            Text Tools
                        </Link>
                    </li>
                    <li>
                        <Link to="/developer-tools" className={isActive('/developer-tools') ? 'active' : ''}>
                            Developer Tools
                        </Link>
                    </li>
                    <li>
                        <Link to="/converters" className={isActive('/converters') ? 'active' : ''}>
                            Converters
                        </Link>
                    </li>
                    <li>
                        <Link to="/generators" className={isActive('/generators') ? 'active' : ''}>
                            Generators
                        </Link>
                    </li>
                </ul>
            </nav>
            <div className="theme-toggle-wrapper">
                <ThemeToggle />
            </div>
        </header>
    );
};

export default Header;
