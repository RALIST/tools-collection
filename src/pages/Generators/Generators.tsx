import React, { useEffect } from 'react';

import { dataToolsByCategory } from '../../assets/data/dataToolsByCategory';
import { dataPagesDescription } from '../../assets/data/dataPagesDescription';
import { dataCategoryInfo } from '../../assets/data/dataCategoryInfo';
import { changeFavicon } from '../../utils/changeFavicon';
import MetaTags from '../../components/common/MetaTags/MetaTags';
import CategoryBlock from '../../components/common/CategoryBlock/CategoryBlock';
import DescriptionBlock from '../../components/common/DescriptionBlock/DescriptionBlock';
import DescriptionHeader from '../../components/common/DescriptionBlock/components/DescriptionHeader/DescriptionHeader';
import DescriptionTools from '../../components/common/DescriptionBlock/components/DescriptionAvailableTools/DescriptionTools';
import DescriptionWhyChoose from '../../components/common/DescriptionBlock/components/DescriptionWhyChoose/DescriptionWhyChoose';

const currentPage = 'generator';
const PageDescription = dataPagesDescription[currentPage];
const category = 'generator';
const toolsByCategory = dataToolsByCategory;
const pageIcon  = dataCategoryInfo[category].icon;

const Generators: React.FC = () => {
    useEffect(() => {
        changeFavicon(pageIcon);
    }, []);

    return (
        <div className="tools">
            <MetaTags
                title="Online Generator Tools - Password, Lorem Ipsum, and More"
                description="Free online generator tools including secure password generator, lorem ipsum text generator, color palette generator, and sample data generators. Create random passwords, placeholder text, and test data easily."
                keywords="password generator, lorem ipsum generator, color palette generator, random generator, test data generator, secure password creator, dummy text generator, sample data generator, random number generator, mock data generator"
                structuredData={{
                    "@context": "https://schema.org",
                    "@type": "SoftwareApplication",
                    "name": "Online Generator Tools",
                    "description": "Collection of free online generator tools for creating passwords, lorem ipsum text, color palettes, and sample data for testing and development.",
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

            {/* <div className="tools-grid">
                <Link to="/generators/password-generator" className="tool-card">
                    <div className="tool-icon">🔒</div>
                    <div className="tool-info">
                        <h2>Password Generator</h2>
                        <p>Generate secure, random passwords with customizable options.</p>
                    </div>
                </Link>

                <Link to="/generators/lorem-generator" className="tool-card">
                    <div className="tool-icon">📝</div>
                    <div className="tool-info">
                        <h2>Lorem Ipsum Generator</h2>
                        <p>Generate placeholder text for your designs and layouts.</p>
                    </div>
                </Link>

                <div className="tool-card coming-soon">
                    <div className="tool-icon">🎨</div>
                    <div className="tool-info">
                        <h2>Color Palette Generator</h2>
                        <p>Generate beautiful color palettes for your designs.</p>
                    </div>
                    <span className="status-badge">Coming Soon</span>
                </div>

                <div className="tool-card coming-soon">
                    <div className="tool-icon">📊</div>
                    <div className="tool-info">
                        <h2>Chart Data Generator</h2>
                        <p>Generate sample data for charts and graphs.</p>
                    </div>
                    <span className="status-badge">Coming Soon</span>
                </div>

                <div className="tool-card coming-soon">
                    <div className="tool-icon">📋</div>
                    <div className="tool-info">
                        <h2>Form Data Generator</h2>
                        <p>Generate sample data for testing forms and databases.</p>
                    </div>
                    <span className="status-badge">Coming Soon</span>
                </div>

                <div className="tool-card coming-soon">
                    <div className="tool-icon">🎲</div>
                    <div className="tool-info">
                        <h2>Random Generator</h2>
                        <p>Generate random numbers, strings, and other data types.</p>
                    </div>
                    <span className="status-badge">Coming Soon</span>
                </div>
            </div> */}

            {/* <div className="tool-description">
                <h2>Powerful Generation Tools for Developers and Creators</h2>
                <p>
                    Our collection of generator tools helps you create various types of content and data quickly and efficiently.
                    From secure passwords to placeholder text, these tools are designed to streamline your workflow and enhance
                    your productivity in development, design, and content creation.
                </p>

                <div className="tools-overview">
                    <h3>Available Tools:</h3>
                    <div className="tool-details">
                        <h4>Password Generator</h4>
                        <p>
                            Create strong, secure passwords with customizable options for length, character types
                            (uppercase, lowercase, numbers, symbols), and complexity requirements. Perfect for
                            generating secure credentials that meet specific password policies and security standards.
                        </p>

                        <h4>Lorem Ipsum Generator</h4>
                        <p>
                            Generate professional placeholder text for mockups, designs, and layouts. Customize the
                            amount of text (words, sentences, or paragraphs) and format to perfectly fit your design
                            needs. Essential for designers and developers working on content-driven projects.
                        </p>
                    </div>
                </div>

                <div className="coming-soon-features">
                    <h3>Coming Soon:</h3>
                    <ul>
                        <li>
                            <strong>Color Palette Generator:</strong> Create harmonious color schemes for your designs
                            with options for complementary, analogous, and triadic color relationships. Perfect for
                            establishing consistent brand colors and design systems.
                        </li>
                        <li>
                            <strong>Chart Data Generator:</strong> Generate realistic sample data for charts and graphs
                            with customizable patterns and trends. Ideal for testing data visualization components
                            and creating demo presentations.
                        </li>
                        <li>
                            <strong>Form Data Generator:</strong> Create sample data for testing forms and databases
                            with support for various data types including names, emails, addresses, and custom fields.
                        </li>
                        <li>
                            <strong>Random Generator:</strong> Generate random numbers, strings, and other data types
                            with specific patterns or constraints. Essential for testing and development scenarios
                            requiring randomized data.
                        </li>
                    </ul>
                </div>

                <div className="seo-content">
                    <h3>Why Use Our Generator Tools?</h3>
                    <ul>
                        <li>
                            <strong>Security First:</strong> Our password generator creates cryptographically secure
                            passwords that help protect your accounts from unauthorized access.
                        </li>
                        <li>
                            <strong>Time-Saving:</strong> Generate placeholder content and test data instantly,
                            allowing you to focus on design and development rather than content creation.
                        </li>
                        <li>
                            <strong>Customizable:</strong> Each tool offers various options to generate content
                            that perfectly matches your specific requirements.
                        </li>
                        <li>
                            <strong>Professional Quality:</strong> All generators produce high-quality output
                            suitable for professional use in development, design, and testing environments.
                        </li>
                    </ul>
                </div>
            </div> */}
        </div>
    );
};

export default Generators;