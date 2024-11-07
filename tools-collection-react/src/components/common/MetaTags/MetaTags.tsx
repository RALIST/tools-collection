import React from 'react';
import { Helmet } from 'react-helmet-async';

interface MetaTagsProps {
    title?: string;
    description?: string;
    keywords?: string;
    canonicalUrl?: string;
    structuredData?: {
        "@context": string;
        "@type": string;
        name: string;
        description: string;
        url: string;
        applicationCategory: string;
        operatingSystem: string;
        permissions: string;
        offers: {
            "@type": string;
            price: string;
            priceCurrency: string;
        };
    };
}

const MetaTags: React.FC<MetaTagsProps> = ({
    title = 'Useful Online Tools',
    description = 'Collection of useful online tools for text manipulation, development, conversion, and generation.',
    keywords,
    canonicalUrl,
    structuredData
}) => {
    const fullTitle = title === 'Useful Online Tools' ? title : `${title} | Useful Online Tools`;

    return (
        <Helmet>
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            {keywords && <meta name="keywords" content={keywords} />}
            {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            {structuredData && (
                <script type="application/ld+json">
                    {JSON.stringify(structuredData)}
                </script>
            )}
        </Helmet>
    );
};

export default MetaTags;
