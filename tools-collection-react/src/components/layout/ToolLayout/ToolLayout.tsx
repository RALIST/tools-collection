import React from 'react';

import { ToolName } from '../../../types/tools';
import { dataToolsDescription } from '../../../assets/data/dataToolsDescription';
import MetaTags from '../../common/MetaTags/MetaTags';
import ToolHeader from './components/ToolHeader/ToolHeader';
import ToolDescription from './components/ToolDescription/ToolDescription';

import styles from "./ToolLayout.module.css";

interface ToolLayoutProps {
    toolName: ToolName;
    children: React.ReactNode;
}

const ToolLayout: React.FC<ToolLayoutProps> = ({ toolName, children }) => {
    const toolDescription = dataToolsDescription[toolName];

    const canonicalUrl = `https://usefulonlinetools.com${window.location.pathname}`;
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": toolDescription.title,
        "description": toolDescription.description,
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
        <div className={styles.toolLayout}>
            <div className={styles.tool}>
                <MetaTags
                    title={toolDescription.title}
                    description={toolDescription.description}
                    keywords={toolDescription.keywords}
                    canonicalUrl={canonicalUrl}
                    structuredData={structuredData}
                />
                
                <ToolHeader title={toolDescription.title} description={toolDescription.description} />

                <div className={styles.toolContent}>
                    {children}
                </div>
            </div>

            <ToolDescription tool={toolDescription}/>
        </div>
    );
};

export default ToolLayout;
