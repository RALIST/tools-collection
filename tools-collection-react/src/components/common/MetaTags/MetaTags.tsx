import React from 'react';
import { Helmet } from 'react-helmet-async';

interface MetaTagsProps {
    title: string;
    description: string;
    keywords?: string;
    canonicalUrl?: string;
    structuredData?: object;
}

const MetaTags: React.FC<MetaTagsProps> = ({
    title,
    description,
    keywords,
    canonicalUrl,
    structuredData
}) => {
    const baseUrl = process.env.PUBLIC_URL || '';
    const fullUrl = canonicalUrl ? `${baseUrl}${canonicalUrl}` : baseUrl;
    const defaultKeywords = 'online tools, developer tools, web tools, free tools';
    const fullKeywords = keywords ? `${keywords}, ${defaultKeywords}` : defaultKeywords;

    const defaultStructuredData = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": title,
        "description": description,
        "url": fullUrl,
        "applicationCategory": "DeveloperApplication",
        "operatingSystem": "Any",
        "offers": {
            "@type": "Offer",
            "price": "0"
        }
    };

    const finalStructuredData = structuredData || defaultStructuredData;

    return (
        <Helmet>
            {/* Basic Meta Tags */}
            <title>{title} - Useful Online Tools</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={fullKeywords} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={fullUrl} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={fullUrl} />
            <meta property="twitter:title" content={title} />
            <meta property="twitter:description" content={description} />

            {/* Canonical URL */}
            {canonicalUrl && <link rel="canonical" href={fullUrl} />}

            {/* Structured Data */}
            <script type="application/ld+json">
                {JSON.stringify(finalStructuredData)}
            </script>
        </Helmet>
    );
};

export default MetaTags;
