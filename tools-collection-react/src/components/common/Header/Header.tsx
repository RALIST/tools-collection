import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import './Header.css';

const Header: React.FC = () => {
    const location = useLocation();

    const isActive = (path: string) => {
        if (path === '/') {
            return location.pathname === '/';
        }
        return location.pathname.startsWith(path);
    };

    return (
        <header className="header" role="banner">
            <nav className="nav-container" role="navigation" aria-label="Main navigation">
                <Link
                    to="/"
                    className="logo"
                    aria-label="Useful Online Tools - Home"
                >
                    Useful Online Tools
                </Link>
                <div className="nav-links">
                    <Link
                        to="/text-tools"
                        className={`nav-link ${isActive('/text-tools') ? 'active' : ''}`}
                        aria-current={isActive('/text-tools') ? 'page' : undefined}
                    >
                        Text Tools
                    </Link>
                    <Link
                        to="/developer-tools"
                        className={`nav-link ${isActive('/developer-tools') ? 'active' : ''}`}
                        aria-current={isActive('/developer-tools') ? 'page' : undefined}
                    >
                        Developer Tools
                    </Link>
                    <Link
                        to="/converters"
                        className={`nav-link ${isActive('/converters') ? 'active' : ''}`}
                        aria-current={isActive('/converters') ? 'page' : undefined}
                    >
                        Converters
                    </Link>
                    <Link
                        to="/generators"
                        className={`nav-link ${isActive('/generators') ? 'active' : ''}`}
                        aria-current={isActive('/generators') ? 'page' : undefined}
                    >
                        Generators
                    </Link>
                </div>
                <ThemeToggle />
            </nav>
        </header>
    );
};

export default Header;
