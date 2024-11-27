import React, { useEffect } from 'react';

import { dataToolsByCategory } from '../../assets/data/dataToolsByCategory';
import { dataPagesDescription } from '../../assets/data/dataPagesDescription';
import { dataCategoryInfo } from '../../assets/data/dataCategoryInfo';
import { changeFavicon } from '../../utils/changeFavicon';
import MetaTags from '../../components/common/MetaTags/MetaTags';
import CategoryBlock from '../../components/common/CategoryBlock/CategoryBlock';
import DescriptionBlock from '../../components/common/DescriptionBlock/DescriptionBlock';
import DescriptionHeader from '../../components/common/DescriptionBlock/components/DescriptionHeader/DescriptionHeader';
import DescriptionWhyChoose from '../../components/common/DescriptionBlock/components/DescriptionWhyChoose/DescriptionWhyChoose';
import DescriptionTools from '../../components/common/DescriptionBlock/components/DescriptionAvailableTools/DescriptionTools';

const currentPage = 'text';
const PageDescription = dataPagesDescription[currentPage];
const category = 'text';
const toolsByCategory = dataToolsByCategory;
const pageIcon  = dataCategoryInfo[category].icon;

const TextTools: React.FC = () => {
    useEffect(() => {
        changeFavicon(pageIcon);
    }, []);

    return (
        <div className="tools">
            <MetaTags
                title="Text Tools - Free Online Text Manipulation Tools"
                description="Free online text tools for case conversion, word counting, string encoding, and text analysis. Transform, analyze, and manipulate text with our easy-to-use text utilities."
                keywords="text tools, case converter, word counter, string encoder, text manipulation, text transformer, text analysis, text formatter, text cleaner, online text tools, text case converter, character counter"
                structuredData={{
                    "@context": "https://schema.org",
                    "@type": "SoftwareApplication",
                    "name": "Text Tools Collection",
                    "description": "A comprehensive collection of free online text manipulation and analysis tools including case converter, word counter, and string encoder.",
                    "url": window.location.href,
                    "applicationCategory": "UtilitiesApplication",
                    "operatingSystem": "Any",
                    "permissions": "browser",
                    "offers": {
                        "@type": "Offer",
                        "price": "0",
                        "priceCurrency": "USD"
                    }
                }}
            />

            <CategoryBlock category={category} toolsByCategory={toolsByCategory}/>

            <DescriptionBlock>
                <DescriptionHeader
                    title={PageDescription.title}
                    description={PageDescription.description}
                />

                <DescriptionTools category={category}/>

                <DescriptionWhyChoose 
                    whyChooseList={PageDescription.whyChooseList}
                    whyChooseTitle={PageDescription.whyChooseTitle}
                />
            </DescriptionBlock>
        </div>
    );
};

export default TextTools;
