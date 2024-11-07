import React from 'react';
import { Link } from 'react-router-dom';
import './Generators.css';

const Generators: React.FC = () => {
    return (
        <div className="generators">
            <h1>Generators</h1>
            <p>A collection of useful generators to help with common tasks.</p>

            <div className="tools-grid">
                <Link to="/generators/password-generator" className="tool-card">
                    <div className="tool-icon">🔐</div>
                    <div className="tool-info">
                        <h2>Password Generator</h2>
                        <p>Generate secure passwords with customizable options</p>
                    </div>
                </Link>

                <Link to="/generators/lorem-generator" className="tool-card">
                    <div className="tool-icon">📝</div>
                    <div className="tool-info">
                        <h2>Lorem Ipsum Generator</h2>
                        <p>Generate placeholder text for your designs</p>
                    </div>
                </Link>

                <div className="tool-card coming-soon">
                    <div className="tool-icon">📱</div>
                    <div className="tool-info">
                        <h2>QR Code Generator</h2>
                        <p>Create QR codes for URLs, text, and more</p>
                    </div>
                    <span className="status-badge">Coming Soon</span>
                </div>
            </div>
        </div>
    );
};

export default Generators;
