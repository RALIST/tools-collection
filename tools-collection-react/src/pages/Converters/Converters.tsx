import React from 'react';
import { Link } from 'react-router-dom';
import ToolLayout from '../../components/layout/ToolLayout/ToolLayout';
import './Converters.css';

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
        id: 'unit-converter',
        name: 'Unit Converter',
        description: 'Convert between different units of measurement',
        path: '/converters/unit-converter',
        icon: '⇄'
    },
    {
        id: 'color-converter',
        name: 'Color Converter',
        description: 'Convert between different color formats',
        path: '/converters/color-converter',
        icon: '🎨'
    },
    {
        id: 'number-base-converter',
        name: 'Number Base Converter',
        description: 'Convert numbers between different bases',
        path: '/converters/number-base-converter',
        icon: '123'
    },
    {
        id: 'time-converter',
        name: 'Time Converter',
        description: 'Convert between different time formats and timezones',
        path: '/converters/time-converter',
        icon: '⏰'
    },
    {
        id: 'temperature-converter',
        name: 'Temperature Converter',
        description: 'Convert between different temperature scales',
        path: '/converters/temperature-converter',
        icon: '🌡️'
    }
];

const Converters: React.FC = () => {
    return (
        <ToolLayout
            title="Converters"
            description="A collection of tools for converting between different formats and units."
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

export default Converters;
