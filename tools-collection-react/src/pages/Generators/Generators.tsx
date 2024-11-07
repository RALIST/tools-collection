import React from 'react';
import { Link } from 'react-router-dom';
import MetaTags from '../../components/common/MetaTags/MetaTags';

const Generators: React.FC = () => {
    return (
        <div className="tools">
            <MetaTags
                title="Generators"
                description="Collection of tools to generate various types of content and data."
            />

            <div className="category-header">
                <div className="icon">⚡</div>
                <h2>Generators</h2>
            </div>
            <p>Collection of tools to generate various types of content and data.</p>

            <div className="tools-grid">
                <Link to="/generators/password-generator" className="tool-card">
                    <div className="tool-icon">🔒</div>
                    <div className="tool-info">
                        <h2>Password Generator</h2>
                        <p>Generate secure, random passwords with customizable options.</p>
                    </div>
                </Link>

                <Link to="/generators/lorem-generator" className="tool-card">
                    <div className="tool-icon">📝</div>
                    <div className="tool-info">
                        <h2>Lorem Ipsum Generator</h2>
                        <p>Generate placeholder text for your designs and layouts.</p>
                    </div>
                </Link>

                <div className="tool-card coming-soon">
                    <div className="tool-icon">🎨</div>
                    <div className="tool-info">
                        <h2>Color Palette Generator</h2>
                        <p>Generate beautiful color palettes for your designs.</p>
                    </div>
                    <span className="status-badge">Coming Soon</span>
                </div>

                <div className="tool-card coming-soon">
                    <div className="tool-icon">📊</div>
                    <div className="tool-info">
                        <h2>Chart Data Generator</h2>
                        <p>Generate sample data for charts and graphs.</p>
                    </div>
                    <span className="status-badge">Coming Soon</span>
                </div>

                <div className="tool-card coming-soon">
                    <div className="tool-icon">📋</div>
                    <div className="tool-info">
                        <h2>Form Data Generator</h2>
                        <p>Generate sample data for testing forms and databases.</p>
                    </div>
                    <span className="status-badge">Coming Soon</span>
                </div>

                <div className="tool-card coming-soon">
                    <div className="tool-icon">🎲</div>
                    <div className="tool-info">
                        <h2>Random Generator</h2>
                        <p>Generate random numbers, strings, and other data types.</p>
                    </div>
                    <span className="status-badge">Coming Soon</span>
                </div>
            </div>
        </div>
    );
};

export default Generators;
