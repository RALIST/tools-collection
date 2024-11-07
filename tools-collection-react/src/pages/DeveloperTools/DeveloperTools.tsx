import React from 'react';
import { Link } from 'react-router-dom';
import MetaTags from '../../components/common/MetaTags/MetaTags';

const DeveloperTools: React.FC = () => {
    return (
        <div className="tools">
            <MetaTags
                title="Developer Tools"
                description="A collection of tools for developers to streamline their workflow."
            />

            <div className="category-header">
                <div className="icon">💻</div>
                <h2>Developer Tools</h2>
            </div>
            <p>A collection of tools for developers to streamline their workflow.</p>

            <div className="tools-grid">
                <Link to="/developer-tools/json-formatter" className="tool-card">
                    <div className="tool-icon">{'{ }'}</div>
                    <div className="tool-info">
                        <h2>JSON Formatter & Validator</h2>
                        <p>Format, minify, and validate JSON data with ease.</p>
                    </div>
                </Link>

                <Link to="/developer-tools/code-minifier" className="tool-card">
                    <div className="tool-icon">📦</div>
                    <div className="tool-info">
                        <h2>Code Minifier</h2>
                        <p>Minify HTML, CSS, and JavaScript code to reduce file size.</p>
                    </div>
                </Link>

                <Link to="/developer-tools/regex-tester" className="tool-card">
                    <div className="tool-icon">*</div>
                    <div className="tool-info">
                        <h2>Regex Tester</h2>
                        <p>Test and debug your regular expressions with real-time matching.</p>
                    </div>
                </Link>

                <Link to="/developer-tools/code-beautifier" className="tool-card">
                    <div className="tool-icon">🎨</div>
                    <div className="tool-info">
                        <h2>Code Beautifier</h2>
                        <p>Format and beautify your code with customizable options.</p>
                    </div>
                </Link>

                <Link to="/developer-tools/hash-generator" className="tool-card">
                    <div className="tool-icon">#</div>
                    <div className="tool-info">
                        <h2>Hash Generator</h2>
                        <p>Generate various types of hash values for your text.</p>
                    </div>
                </Link>

                <div className="tool-card coming-soon">
                    <div className="tool-icon">🔍</div>
                    <div className="tool-info">
                        <h2>API Tester</h2>
                        <p>Test API endpoints with customizable requests.</p>
                    </div>
                    <span className="status-badge">Coming Soon</span>
                </div>
            </div>
        </div>
    );
};

export default DeveloperTools;
