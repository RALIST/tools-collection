import React, { useState, useEffect } from 'react';

// import MetaTags from '../../../components/common/MetaTags/MetaTags';
import ToolLayout from '../../../components/layout/ToolLayout/ToolLayout';
import ButtonSecond from '../../../components/common/UI/Buttons/ButtonSecond/ButtonSecond';
import Select from '../../../components/common/UI/Select/Select';
import Checkbox from '../../../components/common/UI/Checkbox/Checkbox';
import Textarea from '../../../components/common/UI/Textarea/Textarea';

import styles from "./JsonFormatter.module.css";

const JsonFormatter: React.FC = () => {
    const [input, setInput] = useState<string>('');
    const [output, setOutput] = useState<string>('');
    const [indentSize, setIndentSize] = useState<number>(2);
    const [sortKeys, setSortKeys] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const optionsList = [
        {value: 2, name: '2 spaces'},
        {value: 4, name: '4 spaces'},
        {value: 8, name: '8 spaces'}
    ];

    useEffect(() => {
        if (input.trim()) {
            try {
                JSON.parse(input);
                setError('');
            } catch (err) {
                // Don't show error while typing
                setOutput('');
            }
        } else {
            setOutput('');
            setError('');
        }
    }, [input]);

    const sortObjectKeys = (obj: any): any => {
        if (obj === null || typeof obj !== 'object') {
            return obj;
        }

        if (Array.isArray(obj)) {
            return obj.map(sortObjectKeys);
        }

        return Object.keys(obj)
            .sort()
            .reduce((result: any, key: string) => {
                result[key] = sortObjectKeys(obj[key]);
                return result;
            }, {});
    };

    const handleFormat = () => {
        try {
            if (!input.trim()) {
                setError('Please enter JSON to format');
                setOutput('');
                return;
            }

            const parsed = JSON.parse(input);
            const processedData = sortKeys ? sortObjectKeys(parsed) : parsed;
            const formatted = JSON.stringify(processedData, null, indentSize);
            setOutput(formatted);
            setError('');
        } catch (err) {
            setError('Invalid JSON: Please check your input');
            setOutput('');
        }
    };

    const handleMinify = () => {
        try {
            if (!input.trim()) {
                setError('Please enter JSON to minify');
                setOutput('');
                return;
            }

            const parsed = JSON.parse(input);
            const minified = JSON.stringify(parsed);
            setOutput(minified);
            setError('');
        } catch (err) {
            setError('Invalid JSON: Please check your input');
            setOutput('');
        }
    };

    const handleValidate = () => {
        try {
            if (!input.trim()) {
                setError('Please enter JSON to validate');
                setOutput('');
                return;
            }

            JSON.parse(input);
            setError('Valid JSON!');
            setTimeout(() => setError(''), 2000);
        } catch (err) {
            if (err instanceof Error) {
                setError(`Invalid JSON: ${err.message}`);
            } else {
                setError('Invalid JSON: Please check your input');
            }
            setOutput('');
        }
    };

    const handleCopy = async () => {
        try {
            const textToCopy = output || input;
            await navigator.clipboard.writeText(textToCopy);
            setError('Copied to clipboard!');
            setTimeout(() => setError(''), 2000);
        } catch (err) {
            setError('Failed to copy text');
            setTimeout(() => setError(''), 2000);
        }
    };

    return (
        <div className={styles.jsonFormatter}>
            <ToolLayout
                toolName='jsonFormatter'
            >
                {/* <MetaTags
                    title="JSON Formatter and Validator"
                    description="Free online JSON formatter, validator and beautifier with advanced features. Format JSON with custom indentation, sort keys, minify JSON data, and validate JSON syntax instantly."
                    keywords="json formatter, json validator, json beautifier, format json, pretty print json, json tools, json parser, minify json, json lint, json editor"
                    structuredData={{
                        "@context": "https://schema.org",
                        "@type": "SoftwareApplication",
                        "name": "JSON Formatter and Validator",
                        "description": "Online tool to format, validate, and beautify JSON data with customizable indentation and key sorting options.",
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
                /> */}
            
                <div className={styles.controls}>
                    <div className={styles.controlGroup}>
                        <label htmlFor="indent-size">Indent Size:</label>
                        <Select
                            id="indent-size"
                            value={indentSize}
                            onChange={(e) => setIndentSize(Number(e.target.value))}
                            optionsList={optionsList}
                        />
                    </div>

                    <div className={styles.controlGroup}>
                        <Checkbox 
                            checked={sortKeys}
                            onChange={(e) => setSortKeys(e.target.checked)}
                            label='Sort Keys'
                        />
                    </div>

                    <div className={styles.actionButtons}>
                        <ButtonSecond
                            onClick={handleFormat}
                            aria-label="Format JSON"
                        >
                            Format
                        </ButtonSecond>
                        <ButtonSecond
                            onClick={handleMinify}
                            aria-label="Minify JSON"
                        >
                            Minify
                        </ButtonSecond>
                        <ButtonSecond
                            onClick={handleValidate}
                            aria-label="Validate JSON"
                        >
                            Validate
                        </ButtonSecond>
                        <ButtonSecond
                            onClick={handleCopy}
                            aria-label="Copy JSON"
                        >
                            Copy
                        </ButtonSecond>
                    </div>
                </div>

                <div className={styles.editorContainer}>
                    <div className={styles.editorSection}>
                        <h3>Input JSON</h3>
                        <Textarea
                            value={input}
                            onChange={(e) => {
                                setInput(e.target.value);
                                setError('');
                            }}
                            rows={16}
                            placeholder="Enter or paste your JSON"
                            spellCheck={false}
                            ariaLabel="Input JSON"
                        />
                    </div>

                    <div className={styles.editorSection}>
                        <h3>Formatted JSON</h3>
                        <Textarea
                            value={output}
                            rows={16}
                            readOnly
                            placeholder="Formatted JSON will appear here"
                            spellCheck={false}
                            aria-label="Formatted JSON output"
                        />
                    </div>
                </div>

                {error && <div className={styles.errorMessage} role="alert">{error}</div>}
            </ToolLayout>

            <div className="tool-description">
                <h2>Format, Validate, and Beautify JSON Data</h2>
                <p>
                    Our JSON formatter is a powerful online tool designed to help developers and data analysts work with JSON data more efficiently.
                    Whether you need to format raw JSON for better readability, validate JSON syntax, or minify JSON for production, this tool has you covered.
                </p>

                <div className="features-list">
                    <h3>Key Features:</h3>
                    <ul>
                        <li><strong>JSON Formatting:</strong> Beautify your JSON with customizable indentation (2, 4, or 8 spaces) for improved readability</li>
                        <li><strong>Syntax Validation:</strong> Instantly validate your JSON to ensure it follows proper syntax and structure</li>
                        <li><strong>Key Sorting:</strong> Optionally sort object keys alphabetically for consistent formatting</li>
                        <li><strong>JSON Minification:</strong> Compress JSON by removing unnecessary whitespace for reduced file size</li>
                        <li><strong>Copy to Clipboard:</strong> Easily copy formatted or minified JSON with one click</li>
                    </ul>
                </div>

                <div className="usage-guide">
                    <h3>How to Use:</h3>
                    <ol>
                        <li>Paste your JSON data into the input field</li>
                        <li>Select your preferred indentation size</li>
                        <li>Choose whether to sort keys alphabetically</li>
                        <li>Click 'Format' to beautify, 'Minify' to compress, or 'Validate' to check syntax</li>
                        <li>Use the 'Copy' button to copy the result to your clipboard</li>
                    </ol>
                </div>
            </div>
        </div>
    );
};

export default JsonFormatter;
