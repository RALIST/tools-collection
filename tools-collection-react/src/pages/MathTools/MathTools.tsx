import React from 'react';
import { Link } from 'react-router-dom';
import MetaTags from '../../components/common/MetaTags/MetaTags';

const MathTools: React.FC = () => {
    return (
        <div className="tools">
            <MetaTags
                title="Math Tools - Free Online Math Calculators and Converters"
                description="Free online math tools including percentage calculator, scientific calculator, ratio calculator, and more. Simple, fast, and accurate calculations for everyday use."
                keywords="math tools, percentage calculator, scientific calculator, ratio calculator, math converter, online calculator, free math tools"
                structuredData={{
                    "@context": "https://schema.org",
                    "@type": "SoftwareApplication",
                    "name": "Math Tools Collection",
                    "description": "Collection of free online math tools and calculators for various calculations and conversions.",
                    "url": window.location.href,
                    "applicationCategory": "UtilityApplication",
                    "operatingSystem": "Any",
                    "permissions": "browser",
                    "offers": {
                        "@type": "Offer",
                        "price": "0",
                        "priceCurrency": "USD"
                    }
                }}
            />

            <div className="category-header">
                <div className="icon">🧮</div>
                <h2>Math Tools</h2>
            </div>

            <p>
                A collection of mathematical tools and calculators designed to help you with various calculations.
                From basic percentage calculations to complex mathematical operations, these tools make math easier and more accessible.
            </p>

            <div className="tools-grid">
                <Link to="/math-tools/percentage-calculator" className="tool-card">
                    <div className="tool-icon">%</div>
                    <div className="tool-info">
                        <h2>Percentage Calculator</h2>
                        <p>Calculate percentages, changes, ratios, and more</p>
                    </div>
                </Link>

                <Link to='/math-tools/scientific-calculator' className="tool-card">
                    <div className="tool-icon">🧪</div>
                    <div className="tool-info">
                        <h2>Scientific Calculator</h2>
                        <p>Advanced mathematical calculations and functions</p>
                    </div>
                </Link>

                <div className="tool-card coming-soon">
                    <div className="tool-icon">⚖️</div>
                    <div className="tool-info">
                        <h2>Ratio Calculator</h2>
                        <p>Calculate and scale ratios and proportions</p>
                    </div>
                    <span className="status-badge">Coming Soon</span>
                </div>

                <div className="tool-card coming-soon">
                    <div className="tool-icon">📐</div>
                    <div className="tool-info">
                        <h2>Area/Volume Calculator</h2>
                        <p>Calculate area and volume of various shapes</p>
                    </div>
                    <span className="status-badge">Coming Soon</span>
                </div>

                <div className="tool-card coming-soon">
                    <div className="tool-icon">🔢</div>
                    <div className="tool-info">
                        <h2>Binary/Decimal/Hex Converter</h2>
                        <p>Convert between number systems</p>
                    </div>
                    <span className="status-badge">Coming Soon</span>
                </div>
            </div>

            <div className="tool-description">
                <div className="features-overview">
                    <h2>Why Use Our Math Tools?</h2>
                    <ul>
                        <li>
                            <strong>Accurate Results</strong>
                            High-precision calculations for reliable results
                        </li>
                        <li>
                            <strong>Easy to Use</strong>
                            Simple interface designed for quick calculations
                        </li>
                        <li>
                            <strong>Free Access</strong>
                            All basic math tools available at no cost
                        </li>
                        <li>
                            <strong>No Installation</strong>
                            Use directly in your browser, no downloads needed
                        </li>
                    </ul>
                </div>

                <div className="coming-soon-features">
                    <h3>Upcoming Features</h3>
                    <ul>
                        <li><strong>Scientific Calculator:</strong> Advanced mathematical functions and operations</li>
                        <li><strong>Ratio Calculator:</strong> Easy ratio scaling and proportion calculations</li>
                        <li><strong>Area/Volume Calculator:</strong> Geometric calculations for various shapes</li>
                        <li><strong>Number System Converter:</strong> Convert between binary, decimal, and hexadecimal</li>
                    </ul>
                </div>
            </div>
        </div >
    );
};

export default MathTools;
