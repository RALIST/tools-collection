import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

interface HeaderProps {
    currentPath: string;
}

const Header: React.FC<HeaderProps> = ({ currentPath }) => {
    const navItems = [
        { path: '/', label: 'Home' },
        { path: '/text-tools', label: 'Text Tools' },
        { path: '/developer-tools', label: 'Developer Tools' },
        { path: '/converters', label: 'Converters' },
        { path: '/generators', label: 'Generators' }
    ];

    return (
        <header className="header">
            <h1>Useful Online Tools</h1>
            <nav className="main-nav">
                <ul>
                    {navItems.map((item) => (
                        <li key={item.path}>
                            <Link
                                to={item.path}
                                className={currentPath === item.path ? 'active' : ''}
                            >
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    );
};

export default Header;
