import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import { Tool, ToolCategory } from '../../types/tools';

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
    ]
};

const categoryInfo = {
    text: { name: 'Text Tools', icon: '📝' },
    developer: { name: 'Developer Tools', icon: '💻' },
    converter: { name: 'Converters', icon: '🔄' },
    generator: { name: 'Generators', icon: '⚡' }
};

const Home: React.FC = () => {
    return (
        <div className="home">
            {(Object.keys(toolsByCategory) as ToolCategory[]).map((category) => (
                <section key={category} className="category-row">
                    <div className="category-header">
                        <div className="icon">{categoryInfo[category].icon}</div>
                        <h2>{categoryInfo[category].name}</h2>
                    </div>
                    <div className="tools-list">
                        {toolsByCategory[category].map((tool) => (
                            <Link
                                key={tool.id}
                                to={tool.path}
                                className={`tool-item ${tool.status === 'coming-soon' ? 'coming-soon' : ''}`}
                            >
                                <div className="tool-icon">{tool.icon}</div>
                                <div className="tool-info">
                                    <h3>{tool.name}</h3>
                                    <p>{tool.description}</p>
                                </div>
                                {tool.status === 'coming-soon' && (
                                    <span className="status-badge">Coming Soon</span>
                                )}
                            </Link>
                        ))}
                    </div>
                </section>
            ))}
        </div>
    );
};

export default Home;
