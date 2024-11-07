import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import { Tool, ToolCategory } from '../../types/tools';
import MetaTags from '../../components/common/MetaTags/MetaTags';

const toolsByCategory: Record<ToolCategory, Tool[]> = {
    text: [
        {
            id: 'case-converter',
            name: 'Text Case Converter',
            description: 'Convert text between different cases',
            icon: 'Aa',
            category: 'text',
            status: 'active',
            path: '/text-tools/case-converter'
        },
        {
            id: 'word-counter',
            name: 'Word Counter',
            description: 'Count words and characters',
            icon: '123',
            category: 'text',
            status: 'active',
            path: '/text-tools/word-counter'
        },
        {
            id: 'string-encoder',
            name: 'String Encoder',
            description: 'Encode and decode text',
            icon: '{}',
            category: 'text',
            status: 'active',
            path: '/text-tools/string-encoder'
        }
    ],
    developer: [
        {
            id: 'json-formatter',
            name: 'JSON Formatter',
            description: 'Format and validate JSON',
            icon: '{}',
            category: 'developer',
            status: 'active',
            path: '/developer-tools/json-formatter'
        },
        {
            id: 'code-minifier',
            name: 'Code Minifier',
            description: 'Minify HTML, CSS, and JavaScript',
            icon: '📦',
            category: 'developer',
            status: 'active',
            path: '/developer-tools/code-minifier'
        },
        {
            id: 'regex-tester',
            name: 'Regex Tester',
            description: 'Test regular expressions',
            icon: '.*',
            category: 'developer',
            status: 'active',
            path: '/developer-tools/regex-tester'
        },
        {
            id: 'code-beautifier',
            name: 'Code Beautifier',
            description: 'Format and beautify code',
            icon: '🎨',
            category: 'developer',
            status: 'active',
            path: '/developer-tools/code-beautifier'
        },
        {
            id: 'hash-generator',
            name: 'Hash Generator',
            description: 'Generate MD5, SHA-1, SHA-256 hashes',
            icon: '#',
            category: 'developer',
            status: 'active',
            path: '/developer-tools/hash-generator'
        }
    ],
    converter: [
        {
            id: 'unit-converter',
            name: 'Unit Converter',
            description: 'Convert between different units',
            icon: '📏',
            category: 'converter',
            status: 'active',
            path: '/converters/unit-converter'
        },
        {
            id: 'color-picker',
            name: 'Color Picker',
            description: 'Pick and convert colors',
            icon: '🎨',
            category: 'converter',
            status: 'active',
            path: '/converters/color-picker'
        },
        {
            id: 'file-converter',
            name: 'File Converter',
            description: 'Convert between file formats',
            icon: '📄',
            category: 'converter',
            status: 'coming-soon',
            path: '/converters/file-converter'
        }
    ],
    generator: [
        {
            id: 'password-generator',
            name: 'Password Generator',
            description: 'Generate secure passwords',
            icon: '🔐',
            category: 'generator',
            status: 'active',
            path: '/generators/password-generator'
        },
        {
            id: 'lorem-generator',
            name: 'Lorem Ipsum Generator',
            description: 'Generate placeholder text',
            icon: '📝',
            category: 'generator',
            status: 'active',
            path: '/generators/lorem-generator'
        },
        {
            id: 'qr-generator',
            name: 'QR Code Generator',
            description: 'Create QR codes',
            icon: '📱',
            category: 'generator',
            status: 'coming-soon',
            path: '/generators/qr-generator'
        }
    ],
    math: [
        {
            id: 'percentage-calculator',
            name: 'Percentage Calculator',
            description: 'Calculate percentages and ratios',
            icon: '%',
            category: 'math',
            status: 'active',
            path: '/math-tools/percentage-calculator'
        },
        {
            id: 'scientific-calculator',
            name: 'Scientific Calculator',
            description: 'Advanced mathematical calculations',
            icon: '🧮',
            category: 'math',
            status: 'active',
            path: '/math-tools/scientific-calculator'
        },
        {
            id: 'ratio-calculator',
            name: 'Ratio Calculator',
            description: 'Calculate and scale ratios',
            icon: '⚖️',
            category: 'math',
            status: 'coming-soon',
            path: '/math-tools/ratio-calculator'
        },
        {
            id: 'area-calculator',
            name: 'Area/Volume Calculator',
            description: 'Calculate geometric measurements',
            icon: '📐',
            category: 'math',
            status: 'coming-soon',
            path: '/math-tools/area-calculator'
        }
    ]
};

const categoryInfo = {
    text: { name: 'Text Tools', icon: '📝' },
    developer: { name: 'Developer Tools', icon: '💻' },
    converter: { name: 'Converters', icon: '🔄' },
    generator: { name: 'Generators', icon: '⚡' },
    math: { name: 'Math Tools', icon: '🧮' }
};

const Home: React.FC = () => {
    return (
        <div className="home">
            <MetaTags
                title="Free Online Tools Collection - Text, Developer, Math, Conversion & Generator Tools"
                description="Comprehensive collection of free online tools for developers and users. Features text manipulation, JSON formatting, mathematical calculations, code beautification, unit conversion, password generation, and more. All tools are free, easy to use, and work directly in your browser."
                keywords="online tools, developer tools, text tools, math tools, unit converter, json formatter, percentage calculator, password generator, code beautifier, word counter, color picker, lorem ipsum generator, free tools, web tools"
                structuredData={{
                    "@context": "https://schema.org",
                    "@type": "WebApplication",
                    "name": "Free Online Tools Collection",
                    "description": "Comprehensive suite of free online tools including text manipulation, developer utilities, mathematical calculations, converters, and generators.",
                    "url": window.location.href,
                    "applicationCategory": "DeveloperApplication",
                    "operatingSystem": "Any",
                    "permissions": "browser",
                    "offers": {
                        "@type": "Offer",
                        "price": "0",
                        "priceCurrency": "USD"
                    }
                }}
            />

            <main id="main-content">

                {(Object.keys(toolsByCategory) as ToolCategory[]).map((category) => (
                    <section key={category} className="category-row" aria-labelledby={`${category}-heading`}>
                        <div className="category-header">
                            <span className="icon" aria-hidden="true">
                                {categoryInfo[category].icon}
                            </span>
                            <h2 id={`${category}-heading`}>{categoryInfo[category].name}</h2>
                        </div>
                        <div className="tools-list">
                            {toolsByCategory[category].map((tool) => (
                                <Link
                                    key={tool.id}
                                    to={tool.path}
                                    className={`tool-item ${tool.status === 'coming-soon' ? 'coming-soon' : ''}`}
                                    tabIndex={tool.status === 'coming-soon' ? -1 : 0}
                                    aria-label={`${tool.name} - ${tool.description}${tool.status === 'coming-soon' ? ' (Coming Soon)' : ''}`}
                                >
                                    <span className="tool-icon" aria-hidden="true">
                                        {tool.icon}
                                    </span>
                                    <div className="tool-info">
                                        <h3>{tool.name}</h3>
                                        <p>{tool.description}</p>
                                    </div>
                                    {tool.status === 'coming-soon' && (
                                        <span className="status-badge" aria-hidden="true">
                                            Coming Soon
                                        </span>
                                    )}
                                </Link>
                            ))}
                        </div>
                    </section>
                ))}
                <div className="tool-description">
                    <h1>Free Online Tools for Developers and Content Creators</h1>
                    <p>
                        Welcome to our comprehensive collection of free online tools designed to streamline your workflow
                        and boost productivity. Whether you're a developer, designer, content creator, or professional,
                        our tools help you accomplish tasks quickly and efficiently, right in your browser.
                    </p>

                    <div className="tools-overview">
                        <h2>Our Tool Categories</h2>

                        <div className="tool-details">
                            <div className="category-detail">
                                <h3>Text Tools</h3>
                                <p>
                                    Transform and analyze text with our powerful text manipulation tools. Convert between
                                    different cases, count words and characters, encode strings, and more. Perfect for
                                    content writers, developers, and anyone working with text.
                                </p>
                            </div>

                            <div className="category-detail">
                                <h3>Developer Tools</h3>
                                <p>
                                    Essential utilities for developers including JSON formatter, code beautifier, minifier,
                                    regex tester, and hash generator. These tools help you write, format, and validate
                                    code more efficiently during development.
                                </p>
                            </div>

                            <div className="category-detail">
                                <h3>Math Tools</h3>
                                <p>
                                    Powerful mathematical calculators for various computations. Calculate percentages,
                                    ratios, geometric measurements, and perform advanced calculations. Perfect for
                                    students, professionals, and anyone working with numbers.
                                </p>
                            </div>

                            <div className="category-detail">
                                <h3>Converters</h3>
                                <p>
                                    Convert between different formats and units with ease. From unit conversion to color
                                    formats, our converters help you transform data accurately and quickly. Essential for
                                    international projects and cross-platform development.
                                </p>
                            </div>

                            <div className="category-detail">
                                <h3>Generators</h3>
                                <p>
                                    Create various types of content with our generator tools. Generate secure passwords,
                                    lorem ipsum text, and more. Perfect for development, testing, and content creation
                                    needs.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="features-overview">
                        <h2>Why Choose Our Tools?</h2>
                        <ul>
                            <li>
                                <strong>Free and Easy to Use:</strong> All tools are completely free and designed with
                                user-friendly interfaces for maximum efficiency.
                            </li>
                            <li>
                                <strong>No Installation Required:</strong> Access all tools directly in your browser
                                without downloading or installing any software.
                            </li>
                            <li>
                                <strong>Privacy Focused:</strong> All processing happens in your browser - we don't
                                store or collect any of your data.
                            </li>
                            <li>
                                <strong>Regular Updates:</strong> We continuously improve our tools and add new features
                                based on user feedback.
                            </li>
                        </ul>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Home;
