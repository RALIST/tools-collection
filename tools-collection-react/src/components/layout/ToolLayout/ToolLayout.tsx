import React from 'react';
import { useLocation } from 'react-router-dom';
import MetaTags from '../../common/MetaTags/MetaTags';
import './ToolLayout.css';

interface ToolLayoutProps {
    title: string;
    description: string;
    keywords?: string;
    children: React.ReactNode;
}

const ToolLayout: React.FC<ToolLayoutProps> = ({
    title,
    description,
    keywords,
    children
}) => {
    const location = useLocation();
    const canonicalUrl = location.pathname;

    const structuredData = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": title,
        "description": description,
        "url": `${process.env.PUBLIC_URL}${canonicalUrl}`,
        "applicationCategory": "DeveloperApplication",
        "operatingSystem": "Any",
        "offers": {
            "@type": "Offer",
            "price": "0"
        },
        "browserRequirements": "Requires JavaScript. Requires HTML5.",
        "softwareVersion": "1.0.0",
        "permissions": "none"
    };

    return (
        <div className="tool-layout">
            <MetaTags
                title={title}
                description={description}
                keywords={keywords}
                canonicalUrl={canonicalUrl}
                structuredData={structuredData}
            />
            <div className="tool-header">
                <h1>{title}</h1>
                <p className="tool-description">{description}</p>
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
