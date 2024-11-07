import React from 'react';
import { Link } from 'react-router-dom';
import MetaTags from '../../components/common/MetaTags/MetaTags';

const Converters: React.FC = () => {
    return (
        <div className="tools">
            <MetaTags
                title="Converters"
                description="A collection of tools for converting between different formats and units."
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
