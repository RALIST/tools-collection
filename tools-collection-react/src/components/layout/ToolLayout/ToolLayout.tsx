import React from 'react';
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
    const canonicalUrl = `https://usefulonlinetools.com${window.location.pathname}`;
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": title,
        "description": description,
        "url": canonicalUrl,
        "applicationCategory": "WebApplication",
        "operatingSystem": "All",
        "permissions": "none",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
        }
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
                <p>{description}</p>
            </div>
            <div className="tool-content">
                {children}
            </div>
        </div>
    );
};

export default ToolLayout;
