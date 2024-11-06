import React, { useState, useCallback } from 'react';
import { toast } from 'react-toastify';
import ToolLayout from '../../../components/layout/ToolLayout/ToolLayout';
import './JsonFormatter.css';

const JsonFormatter: React.FC = () => {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [indentSize, setIndentSize] = useState(2);
    const [sortKeys, setSortKeys] = useState(false);

    const sortObjectKeys = useCallback((obj: any): any => {
        if (Array.isArray(obj)) {
            return obj.map(sortObjectKeys);
        }

        if (obj !== null && typeof obj === 'object') {
            return Object.keys(obj)
                .sort()
                .reduce((result: any, key) => {
                    result[key] = sortObjectKeys(obj[key]);
                    return result;
                }, {});
        }

        return obj;
    }, []);

    const formatJson = useCallback(() => {
        if (!input.trim()) {
            toast.error('Please enter some JSON to format');
            return;
        }

        try {
            let parsed = JSON.parse(input);

            if (sortKeys) {
                parsed = sortObjectKeys(parsed);
            }

            const formatted = JSON.stringify(parsed, null, indentSize);
            setOutput(formatted);
            toast.success('JSON formatted successfully!');
        } catch (error) {
            toast.error('Invalid JSON. Please check your input.');
            console.error('JSON formatting error:', error);
        }
    }, [input, indentSize, sortKeys, sortObjectKeys]);

    const minifyJson = useCallback(() => {
        if (!input.trim()) {
            toast.error('Please enter some JSON to minify');
            return;
        }

        try {
            const parsed = JSON.parse(input);
            const minified = JSON.stringify(parsed);
            setOutput(minified);
            toast.success('JSON minified successfully!');
        } catch (error) {
            toast.error('Invalid JSON. Please check your input.');
            console.error('JSON minification error:', error);
        }
    }, [input]);

    const handleCopy = async (text: string) => {
        if (!text) {
            toast.error('No text to copy!');
            return;
        }

        try {
            await navigator.clipboard.writeText(text);
            toast.success('Copied to clipboard!');
        } catch (err) {
            toast.error('Failed to copy text. Please try again.');
            console.error('Copy error:', err);
        }
    };

    const handleClear = () => {
        if (!input && !output) {
            toast.error('Text areas are already empty!');
            return;
        }
        setInput('');
        setOutput('');
        toast.success('Cleared all text!');
    };

    const handlePaste = async () => {
        try {
            const text = await navigator.clipboard.readText();
            setInput(text);
            toast.success('Text pasted from clipboard!');
        } catch (err) {
            toast.error('Failed to paste from clipboard. Please try again.');
            console.error('Paste error:', err);
        }
    };

    return (
        <ToolLayout
            title="JSON Formatter"
            description="Format, validate, and beautify JSON data with customizable indentation."
        >
            <div className="json-formatter">
                <div className="options">
                    <div className="indent-options">
                        <label>Indent Size:</label>
                        <select
                            value={indentSize}
                            onChange={(e) => setIndentSize(Number(e.target.value))}
                        >
                            <option value="2">2 spaces</option>
                            <option value="4">4 spaces</option>
                            <option value="8">8 spaces</option>
                        </select>
                    </div>
                    <div className="sort-options">
                        <label>
                            <input
                                type="checkbox"
                                checked={sortKeys}
                                onChange={(e) => setSortKeys(e.target.checked)}
                            />
                            Sort Keys
                        </label>
                    </div>
                </div>

                <div className="text-areas">
                    <div className="text-area-container">
                        <label>Input JSON</label>
                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Enter or paste your JSON here..."
                            rows={12}
                        />
                        <div className="button-group">
                            <button onClick={handlePaste}>Paste</button>
                            <button onClick={() => handleCopy(input)}>Copy</button>
                        </div>
                    </div>

                    <div className="format-buttons">
                        <button onClick={formatJson}>Format →</button>
                        <button onClick={minifyJson}>Minify →</button>
                    </div>

                    <div className="text-area-container">
                        <label>Formatted JSON</label>
                        <textarea
                            value={output}
                            readOnly
                            placeholder="Formatted JSON will appear here..."
                            rows={12}
                        />
                        <div className="button-group">
                            <button onClick={() => handleCopy(output)}>Copy</button>
                        </div>
                    </div>
                </div>

                <div className="action-buttons">
                    <button onClick={handleClear}>Clear All</button>
                </div>
            </div>
        </ToolLayout>
    );
};

export default JsonFormatter;
