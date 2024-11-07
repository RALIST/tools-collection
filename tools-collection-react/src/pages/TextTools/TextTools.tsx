import React from 'react';
import { Link } from 'react-router-dom';
import MetaTags from '../../components/common/MetaTags/MetaTags';

const TextTools: React.FC = () => {
    return (
        <div className="tools">
            <MetaTags
                title="Text Tools - Free Online Text Manipulation Tools"
                description="Free online text tools for case conversion, word counting, string encoding, and text analysis. Transform, analyze, and manipulate text with our easy-to-use text utilities."
                keywords="text tools, case converter, word counter, string encoder, text manipulation, text transformer, text analysis, text formatter, text cleaner, online text tools, text case converter, character counter"
                structuredData={{
                    "@context": "https://schema.org",
                    "@type": "SoftwareApplication",
                    "name": "Text Tools Collection",
                    "description": "A comprehensive collection of free online text manipulation and analysis tools including case converter, word counter, and string encoder.",
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
                <div className="icon">✏️</div>
                <h2>Text Tools</h2>
            </div>

            <div className="tools-grid">
                <Link to="/text-tools/case-converter" className="tool-card">
                    <div className="tool-icon">Aa</div>
                    <div className="tool-info">
                        <h2>Text Case Converter</h2>
                        <p>Convert text between UPPERCASE, lowercase, Title Case, and Sentence case formats.</p>
                    </div>
                </Link>

                <Link to="/text-tools/word-counter" className="tool-card">
                    <div className="tool-icon">123</div>
                    <div className="tool-info">
                        <h2>Word Counter</h2>
                        <p>Count words, characters, sentences, and estimate reading time for your text.</p>
                    </div>
                </Link>

                <Link to="/text-tools/string-encoder" className="tool-card">
                    <div className="tool-icon">{ }</div>
                    <div className="tool-info">
                        <h2>String Encoder</h2>
                        <p>Encode and decode text using various encoding formats like Base64, URL, and HTML.</p>
                    </div>
                </Link>

                <div className="tool-card coming-soon">
                    <div className="tool-icon">⟷</div>
                    <div className="tool-info">
                        <h2>Text Diff Compare</h2>
                        <p>Compare two texts and highlight the differences between them.</p>
                    </div>
                    <span className="status-badge">Coming Soon</span>
                </div>

                <div className="tool-card coming-soon">
                    <div className="tool-icon">🔄</div>
                    <div className="tool-info">
                        <h2>Text Transformer</h2>
                        <p>Transform text with operations like reverse, repeat, and randomize.</p>
                    </div>
                    <span className="status-badge">Coming Soon</span>
                </div>

                <div className="tool-card coming-soon">
                    <div className="tool-icon">📝</div>
                    <div className="tool-info">
                        <h2>Text Cleaner</h2>
                        <p>Clean and format text by removing extra spaces, fixing line breaks, and more.</p>
                    </div>
                    <span className="status-badge">Coming Soon</span>
                </div>
            </div>

            <div className="tool-description">
                <h2>Powerful Text Manipulation and Analysis Tools</h2>
                <p>
                    Our collection of text tools provides everything you need for efficient text manipulation and analysis.
                    Whether you're a writer, developer, or content creator, these tools help streamline your text-related tasks
                    with instant results and user-friendly interfaces.
                </p>

                <div className="tools-overview">
                    <h2>Available Tools:</h2>
                    <div className="tool-details">
                        <h4>Text Case Converter</h4>
                        <p>
                            Transform your text between different case styles including UPPERCASE, lowercase, Title Case,
                            and Sentence case. Perfect for formatting titles, headings, and maintaining consistent text styling
                            across your content.
                        </p>

                        <h4>Word Counter</h4>
                        <p>
                            Analyze your text with detailed statistics including word count, character count (with and without spaces),
                            sentence count, and estimated reading time. Essential for content writers, students, and professionals
                            working with word limits.
                        </p>

                        <h4>String Encoder</h4>
                        <p>
                            Convert text between various encoding formats including Base64, URL encoding, and HTML entities.
                            A must-have tool for developers working with different text encoding requirements.
                        </p>
                    </div>
                </div>

                <div className="coming-soon-features">
                    <h3>Coming Soon:</h3>
                    <ul>
                        <li><strong>Text Diff Compare:</strong> Compare two texts and highlight the differences between them</li>
                        <li><strong>Text Transformer:</strong> Advanced text manipulation with reverse, repeat, and randomize operations</li>
                        <li><strong>Text Cleaner:</strong> Remove extra spaces, fix line breaks, and clean up text formatting</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default TextTools;
