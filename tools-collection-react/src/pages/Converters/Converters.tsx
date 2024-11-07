import React from 'react';
import { Link } from 'react-router-dom';
import MetaTags from '../../components/common/MetaTags/MetaTags';

const Converters: React.FC = () => {
    return (
        <div className="tools">
            <MetaTags
                title="Online Conversion Tools - Unit, Color, and Time Converters"
                description="Free online conversion tools for units, colors, and time. Convert between different measurement units, color formats (HEX, RGB, HSL), time zones, and more with our easy-to-use converters."
                keywords="unit converter, color converter, time converter, measurement converter, color picker, hex to rgb, rgb to hex, unit conversion calculator, metric converter, imperial converter, timezone converter, online converter tools"
                structuredData={{
                    "@context": "https://schema.org",
                    "@type": "SoftwareApplication",
                    "name": "Online Conversion Tools",
                    "description": "Comprehensive collection of free online conversion tools including unit converter, color picker, and time zone converter.",
                    "url": window.location.href,
                    "applicationCategory": "UtilitiesApplication",
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
                <div className="icon">🔄</div>
                <h2>Converters</h2>
            </div>
            <p>A collection of tools for converting between different formats and units.</p>

            <div className="tools-grid">
                <Link to="/converters/unit-converter" className="tool-card">
                    <div className="tool-icon">📏</div>
                    <div className="tool-info">
                        <h2>Unit Converter</h2>
                        <p>Convert between different units of length, weight, and temperature.</p>
                    </div>
                </Link>

                <Link to="/converters/color-converter" className="tool-card">
                    <div className="tool-icon">🎨</div>
                    <div className="tool-info">
                        <h2>Color Picker</h2>
                        <p>Pick colors and convert between HEX, RGB, and HSL formats.</p>
                    </div>
                </Link>

                <Link to="/converters/time-converter" className="tool-card">
                    <div className="tool-icon">⏰</div>
                    <div className="tool-info">
                        <h2>Time Converter</h2>
                        <p>Convert between different time zones and time formats.</p>
                    </div>
                </Link>

                <div className="tool-card coming-soon">
                    <div className="tool-icon">📄</div>
                    <div className="tool-info">
                        <h2>File Format Converter</h2>
                        <p>Convert between different document and image formats.</p>
                    </div>
                    <span className="status-badge">Coming Soon</span>
                </div>

                <div className="tool-card coming-soon">
                    <div className="tool-icon">💱</div>
                    <div className="tool-info">
                        <h2>Currency Converter</h2>
                        <p>Convert between different currencies with live exchange rates.</p>
                    </div>
                    <span className="status-badge">Coming Soon</span>
                </div>

                <div className="tool-card coming-soon">
                    <div className="tool-icon">📊</div>
                    <div className="tool-info">
                        <h2>Data Unit Converter</h2>
                        <p>Convert between different digital storage units.</p>
                    </div>
                    <span className="status-badge">Coming Soon</span>
                </div>
            </div>
        </div>
    );
};

export default Converters;
