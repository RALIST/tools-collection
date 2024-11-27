import React from 'react';

import { dataToolsByCategory } from '../../assets/data/dataToolsByCategory';
import { dataPagesDescription } from '../../assets/data/dataPagesDescription';
import MetaTags from '../../components/common/MetaTags/MetaTags';
import CategoryBlock from '../../components/common/CategoryBlock/CategoryBlock';
import DescriptionBlock from '../../components/common/DescriptionBlock/DescriptionBlock';
import DescriptionHeader from '../../components/common/DescriptionBlock/components/DescriptionHeader/DescriptionHeader';
import DescriptionTools from '../../components/common/DescriptionBlock/components/DescriptionAvailableTools/DescriptionTools';
import DescriptionWhyChoose from '../../components/common/DescriptionBlock/components/DescriptionWhyChoose/DescriptionWhyChoose';

const currentPage = 'converter';
const PageDescription = dataPagesDescription[currentPage];
const category = 'converter';
const toolsByCategory = dataToolsByCategory;

const Converters: React.FC = () => {
    return (
        <div className="tools">
            <MetaTags
                title="Online Conversion Tools - Unit, Color, and Time Converters"
                description="Free online conversion tools for units, colors, and time. Convert between different measurement units, color formats (HEX, RGB, HSL), time zones, and more with our easy-to-use converters."
                keywords="unit converter, color converter, time converter, measurement converter, color picker, hex to rgb, rgb to hex, unit conversion calculator, metric converter, imperial converter, timezone converter, online converter tools"
                structuredData={{
                    "@context": "https://schema.org",
                    "@type": "SoftwareApplication",
                    "name": "Online Conversion Tools",
                    "description": "Comprehensive collection of free online conversion tools including unit converter, color picker, and time zone converter.",
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
                <Link to="/converters/unit-converter" className="tool-card">
                    <div className="tool-icon">📏</div>
                    <div className="tool-info">
                        <h2>Unit Converter</h2>
                        <p>Convert between different units of length, weight, and temperature.</p>
                    </div>
                </Link>

                <Link to="/converters/color-converter" className="tool-card">
                    <div className="tool-icon">🎨</div>
                    <div className="tool-info">
                        <h2>Color Picker</h2>
                        <p>Pick colors and convert between HEX, RGB, and HSL formats.</p>
                    </div>
                </Link>

                <Link to="/converters/time-converter" className="tool-card">
                    <div className="tool-icon">⏰</div>
                    <div className="tool-info">
                        <h2>Time Converter</h2>
                        <p>Convert between different time zones and time formats.</p>
                    </div>
                </Link>

                <div className="tool-card coming-soon">
                    <div className="tool-icon">📄</div>
                    <div className="tool-info">
                        <h2>File Format Converter</h2>
                        <p>Convert between different document and image formats.</p>
                    </div>
                    <span className="status-badge">Coming Soon</span>
                </div>

                <div className="tool-card coming-soon">
                    <div className="tool-icon">💱</div>
                    <div className="tool-info">
                        <h2>Currency Converter</h2>
                        <p>Convert between different currencies with live exchange rates.</p>
                    </div>
                    <span className="status-badge">Coming Soon</span>
                </div>

                <div className="tool-card coming-soon">
                    <div className="tool-icon">📊</div>
                    <div className="tool-info">
                        <h2>Data Unit Converter</h2>
                        <p>Convert between different digital storage units.</p>
                    </div>
                    <span className="status-badge">Coming Soon</span>
                </div>
            </div>  */}

            {/* <div className="tool-description">
                <h2>Universal Conversion Tools for Every Need</h2>
                <p>
                    Our comprehensive suite of conversion tools helps you quickly and accurately convert between different units,
                    formats, and measurements. Whether you're a developer, designer, or professional working with various units
                    and formats, our converters provide precise results with an intuitive interface.
                </p>

                <div className="tools-overview">
                    <h3>Available Tools:</h3>
                    <div className="tool-details">
                        <h4>Unit Converter</h4>
                        <p>
                            Convert between various units of measurement including length (meters, feet, inches),
                            weight (kilograms, pounds, ounces), and temperature (Celsius, Fahrenheit, Kelvin).
                            Perfect for international projects and scientific calculations.
                        </p>

                        <h4>Color Picker & Converter</h4>
                        <p>
                            Transform colors between different formats including HEX (#RRGGBB), RGB (Red, Green, Blue),
                            and HSL (Hue, Saturation, Lightness). Essential for web developers and designers working
                            with different color systems.
                        </p>

                        <h4>Time Converter</h4>
                        <p>
                            Convert between different time zones and formats. Ideal for coordinating across global time zones
                            and managing international schedules. Includes support for daylight saving time and military time formats.
                        </p>
                    </div>
                </div>

                <div className="coming-soon-features">
                    <h3>Coming Soon:</h3>
                    <ul>
                        <li><strong>File Format Converter:</strong> Convert between different document and image formats seamlessly</li>
                        <li><strong>Currency Converter:</strong> Real-time currency conversion with up-to-date exchange rates</li>
                        <li><strong>Data Unit Converter:</strong> Convert between bytes, kilobytes, megabytes, and more</li>
                    </ul>
                </div>
            </div> */}
        </div>
    );
};

export default Converters;
