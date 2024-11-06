import React from 'react';
import { Link } from 'react-router-dom';
import ToolLayout from '../../components/layout/ToolLayout/ToolLayout';
import './DeveloperTools.css';

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
        id: 'json-formatter',
        name: 'JSON Formatter',
        description: 'Format, validate, and beautify JSON data',
        path: '/developer-tools/json-formatter',
        icon: '{ }'
    },
    {
        id: 'code-minifier',
        name: 'Code Minifier',
        description: 'Minify JavaScript, CSS, and HTML code',
        path: '/developer-tools/code-minifier',
        icon: '≤≥'
    },
    {
        id: 'regex-tester',
        name: 'Regex Tester',
        description: 'Test and debug regular expressions',
        path: '/developer-tools/regex-tester',
        icon: '.*'
    },
    {
        id: 'code-beautifier',
        name: 'Code Beautifier',
        description: 'Beautify and format source code',
        path: '/developer-tools/code-beautifier',
        icon: '< >'
    },
    {
        id: 'hash-generator',
        name: 'Hash Generator',
        description: 'Generate various hash values',
        path: '/developer-tools/hash-generator',
        icon: '#',
        comingSoon: true
    }
];

const DeveloperTools: React.FC = () => {
    return (
        <ToolLayout
            title="Developer Tools"
            description="A collection of tools for developers to streamline their workflow."
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

export default DeveloperTools;
