import React from 'react';
import { Link } from 'react-router-dom';
import MetaTags from '../../components/common/MetaTags/MetaTags';

const TextTools: React.FC = () => {
    return (
        <div className="tools">
            <MetaTags
                title="Text Tools"
                description="A collection of text manipulation and analysis tools."
            />

            <div className="category-header">
                <div className="icon">✏️</div>
                <h2>Text Tools</h2>
            </div>
            <p>A collection of text manipulation and analysis tools.</p>

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
        </div>
    );
};

export default TextTools;
