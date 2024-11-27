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

const currentPage = 'developer';
const PageDescription = dataPagesDescription[currentPage];
const category = 'developer';
const toolsByCategory = dataToolsByCategory;
const pageIcon  = dataCategoryInfo[category].icon;

const DeveloperTools: React.FC = () => {
    useEffect(() => {
        changeFavicon(pageIcon);
    }, []);

    return (
        <div className="tools">
            <MetaTags
                title="Free Online Developer Tools - JSON, Code Formatting, Regex & More"
                description="Essential developer tools including JSON formatter, code beautifier, minifier, regex tester, and hash generator. Streamline your development workflow with our free online utilities."
                keywords="developer tools, json formatter, code beautifier, code minifier, regex tester, hash generator, online development tools, web developer utilities, code formatter, json validator"
                structuredData={{
                    "@context": "https://schema.org",
                    "@type": "SoftwareApplication",
                    "name": "Developer Tools Collection",
                    "description": "Comprehensive suite of online developer tools for code formatting, testing, and optimization.",
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
                <Link to="/developer-tools/json-formatter" className="tool-card">
                    <div className="tool-icon">{'{ }'}</div>
                    <div className="tool-info">
                        <h2>JSON Formatter & Validator</h2>
                        <p>Format, minify, and validate JSON data with ease.</p>
                    </div>
                </Link>

                <Link to="/developer-tools/code-minifier" className="tool-card">
                    <div className="tool-icon">📦</div>
                    <div className="tool-info">
                        <h2>Code Minifier</h2>
                        <p>Minify HTML, CSS, and JavaScript code to reduce file size.</p>
                    </div>
                </Link>

                <Link to="/developer-tools/regex-tester" className="tool-card">
                    <div className="tool-icon">*</div>
                    <div className="tool-info">
                        <h2>Regex Tester</h2>
                        <p>Test and debug your regular expressions with real-time matching.</p>
                    </div>
                </Link>

                <Link to="/developer-tools/code-beautifier" className="tool-card">
                    <div className="tool-icon">🎨</div>
                    <div className="tool-info">
                        <h2>Code Beautifier</h2>
                        <p>Format and beautify your code with customizable options.</p>
                    </div>
                </Link>

                <Link to="/developer-tools/hash-generator" className="tool-card">
                    <div className="tool-icon">#</div>
                    <div className="tool-info">
                        <h2>Hash Generator</h2>
                        <p>Generate various types of hash values for your text.</p>
                    </div>
                </Link>

                <div className="tool-card coming-soon">
                    <div className="tool-icon">🔍</div>
                    <div className="tool-info">
                        <h2>API Tester</h2>
                        <p>Test API endpoints with customizable requests.</p>
                    </div>
                    <span className="status-badge">Coming Soon</span>
                </div>
            </div>  */}

            {/* <div className="tool-description">
                <h2>Essential Tools for Modern Development</h2>
                <p>
                    Our collection of developer tools is designed to streamline your development workflow and boost productivity.
                    Whether you're working on frontend, backend, or full-stack projects, these tools help you write, format,
                    and optimize code more efficiently.
                </p>

                <div className="tools-overview">
                    <h3>Available Tools:</h3>
                    <div className="tool-details">
                        <h4>JSON Formatter & Validator</h4>
                        <p>
                            A powerful tool for working with JSON data. Format, validate, and beautify JSON with customizable
                            indentation. Features include syntax validation, key sorting, and minification capabilities.
                            Essential for API development and debugging.
                        </p>

                        <h4>Code Minifier</h4>
                        <p>
                            Optimize your code for production by removing unnecessary characters, whitespace, and comments.
                            Supports HTML, CSS, and JavaScript minification. Reduce file sizes and improve load times
                            while maintaining functionality.
                        </p>

                        <h4>Regex Tester</h4>
                        <p>
                            Test and debug regular expressions with real-time matching and highlighting. Includes pattern
                            explanation, match groups visualization, and common regex patterns library. Perfect for
                            developing and testing string pattern matching.
                        </p>

                        <h4>Code Beautifier</h4>
                        <p>
                            Format and beautify your code with customizable styling options. Supports multiple languages
                            and formatting standards. Maintain consistent code style across your projects with automatic
                            indentation and syntax highlighting.
                        </p>

                        <h4>Hash Generator</h4>
                        <p>
                            Generate secure hash values using various algorithms including MD5, SHA-1, SHA-256, and more.
                            Useful for data integrity verification, password hashing, and cryptographic applications.
                        </p>
                    </div>
                </div>

                <div className="coming-soon-features">
                    <h3>Coming Soon:</h3>
                    <ul>
                        <li>
                            <strong>API Tester:</strong> Test REST APIs with support for different HTTP methods,
                            custom headers, and request body formats. Perfect for API development and debugging.
                        </li>
                    </ul>
                </div>

                <div className="seo-content">
                    <h3>Why Choose Our Developer Tools?</h3>
                    <ul>
                        <li>
                            <strong>Browser-Based:</strong> No installation required - all tools run directly
                            in your browser for instant access.
                        </li>
                        <li>
                            <strong>Developer-Friendly:</strong> Intuitive interfaces designed specifically
                            for developers' needs and workflows.
                        </li>
                        <li>
                            <strong>Time-Saving:</strong> Automate repetitive tasks and streamline your
                            development process with efficient tools.
                        </li>
                        <li>
                            <strong>Cross-Platform:</strong> Works on any device with a modern web browser,
                            perfect for development on the go.
                        </li>
                    </ul>
                </div>
            </div> */}
        </div>
    );
};

export default DeveloperTools;
