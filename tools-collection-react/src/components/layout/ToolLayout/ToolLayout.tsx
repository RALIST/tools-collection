import React from 'react';
import './ToolLayout.css';

interface ToolLayoutProps {
    title: string;
    description?: string;
    children: React.ReactNode;
}

const ToolLayout: React.FC<ToolLayoutProps> = ({ title, description, children }) => {
    return (
        <div className="tool-layout">
            <div className="tool-header">
                <h1>{title}</h1>
                {description && <p className="tool-description">{description}</p>}
            </div>
            <div className="tool-content">
                {children}
            </div>
            <div className="ad-space">
                <div className="ad-placeholder" role="complementary">
                    Advertisement Space
                </div>
            </div>
        </div>
    );
};

export default ToolLayout;
