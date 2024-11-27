import React from 'react';

import { ToolCategory } from '../../types/tools';
import { dataPagesDescription } from '../../assets/data/dataPagesDescription';
import { dataToolsByCategory } from '../../assets/data/dataToolsByCategory';
import MetaTags from '../../components/common/MetaTags/MetaTags';
import CategoryBlock from '../../components/common/CategoryBlock/CategoryBlock';
import DescriptionBlock from '../../components/common/DescriptionBlock/DescriptionBlock';
import DescriptionHeader from '../../components/common/DescriptionBlock/components/DescriptionHeader/DescriptionHeader';
import DescriptionCategories from '../../components/common/DescriptionBlock/components/DescriptionCategories/DescriptionCategories';
import DescriptionWhyChoose from '../../components/common/DescriptionBlock/components/DescriptionWhyChoose/DescriptionWhyChoose';

import styles from "./Home.module.css";

const currentPage = 'home';
const PageDescription = dataPagesDescription[currentPage];
const toolsByCategory = dataToolsByCategory;

const Home: React.FC = () => {
    return (
        <div className={styles.root}>
            <MetaTags
                title="Free Online Tools Collection - Text, Developer, Math, Conversion & Generator Tools"
                description="Comprehensive collection of free online tools for developers and users. Features text manipulation, JSON formatting, mathematical calculations, code beautification, unit conversion, password generation, and more. All tools are free, easy to use, and work directly in your browser."
                keywords="online tools, developer tools, text tools, math tools, unit converter, json formatter, percentage calculator, password generator, code beautifier, word counter, color picker, lorem ipsum generator, free tools, web tools"
                structuredData={{
                    "@context": "https://schema.org",
                    "@type": "WebApplication",
                    "name": "Free Online Tools Collection",
                    "description": "Comprehensive suite of free online tools including text manipulation, developer utilities, mathematical calculations, converters, and generators.",
                    "url": window.location.href,
                    "applicationCategory": "DeveloperApplication",
                    "operatingSystem": "Any",
                    "permissions": "browser",
                    "offers": {
                        "@type": "Offer",
                        "price": "0",
                        "priceCurrency": "USD"
                    }
                }}
            />
            
            {(Object.keys(toolsByCategory) as ToolCategory[]).map((category) => (
                <CategoryBlock key={category} category={category} toolsByCategory={toolsByCategory} />
            ))}

            <DescriptionBlock>
                <DescriptionHeader
                    title={PageDescription.title}
                    description={PageDescription.description}
                />

                <DescriptionCategories />

                <DescriptionWhyChoose 
                    whyChooseList={PageDescription.whyChooseList}
                    whyChooseTitle={PageDescription.whyChooseTitle}
                />
            </DescriptionBlock>
        </div>
    );
};

export default Home;