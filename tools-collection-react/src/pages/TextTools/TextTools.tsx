import React from 'react';
import { Link } from 'react-router-dom';
import ToolLayout from '../../components/layout/ToolLayout/ToolLayout';
import './TextTools.css';

interface Tool {
    id: string;
    name: string;
    description: string;
    path: string;
    icon: string;
    comingSoon?: boolean;
}

const tools: Tool[] = [
    {
        id: 'case-converter',
        name: 'Text Case Converter',
        description: 'Convert text between different cases',
        path: '/text-tools/case-converter',
        icon: 'Aa'
    },
    {
        id: 'string-encoder',
        name: 'String Encoder',
        description: 'Encode and decode text using Base64, URL encoding, and HTML entities',
        path: '/text-tools/string-encoder',
        icon: '{ }'
    },
    {
        id: 'word-counter',
        name: 'Word Counter',
        description: 'Count words and characters',
        path: '/text-tools/word-counter',
        icon: '123',
        comingSoon: true
    }
];

const TextTools: React.FC = () => {
    return (
        <ToolLayout
            title="Text Tools"
            description="A collection of text manipulation and analysis tools."
        >
            <div className="tools-grid">
                {tools.map((tool) => (
                    <div key={tool.id} className={`tool-card ${tool.comingSoon ? 'coming-soon' : ''}`}>
                        {tool.comingSoon ? (
                            <div className="tool-card-content">
                                <div className="tool-icon">{tool.icon}</div>
                                <div className="tool-info">
                                    <h3>{tool.name}</h3>
                                    <p>{tool.description}</p>
                                </div>
                                <div className="status-badge">Coming Soon</div>
                            </div>
                        ) : (
                            <Link to={tool.path} className="tool-card-content">
                                <div className="tool-icon">{tool.icon}</div>
                                <div className="tool-info">
                                    <h3>{tool.name}</h3>
                                    <p>{tool.description}</p>
                                </div>
                            </Link>
                        )}
                    </div>
                ))}
            </div>
        </ToolLayout>
    );
};

export default TextTools;
