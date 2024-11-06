import React, { useState, useCallback } from 'react';
import { toast } from 'react-toastify';
import ToolLayout from '../../../components/layout/ToolLayout/ToolLayout';
import './CodeMinifier.css';

type CodeType = 'javascript' | 'css' | 'html';

const CodeMinifier: React.FC = () => {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [codeType, setCodeType] = useState<CodeType>('javascript');

    const minifyJavaScript = (code: string): string => {
        try {
            // Basic JavaScript minification
            return code
                // Remove comments
                .replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '')
                // Remove whitespace around operators
                .replace(/\s*([+\-*/%=<>!&|,{}()[\];:])\s*/g, '$1')
                // Remove newlines and multiple spaces
                .replace(/\s+/g, ' ')
                .trim();
        } catch (error) {
            throw new Error('Failed to minify JavaScript');
        }
    };

    const minifyCSS = (code: string): string => {
        try {
            // Basic CSS minification
            return code
                // Remove comments
                .replace(/\/\*[\s\S]*?\*\//g, '')
                // Remove whitespace around special characters
                .replace(/\s*([{}:;,])\s*/g, '$1')
                // Remove newlines and multiple spaces
                .replace(/\s+/g, ' ')
                // Remove spaces around selectors
                .replace(/\s*([>+~])\s*/g, '$1')
                .trim();
        } catch (error) {
            throw new Error('Failed to minify CSS');
        }
    };

    const minifyHTML = (code: string): string => {
        try {
            // Basic HTML minification
            return code
                // Remove comments
                .replace(/<!--[\s\S]*?-->/g, '')
                // Remove whitespace between tags
                .replace(/>\s+</g, '><')
                // Remove spaces around attributes
                .replace(/\s+/g, ' ')
                // Remove spaces around equals in attributes
                .replace(/\s*=\s*/g, '=')
                .trim();
        } catch (error) {
            throw new Error('Failed to minify HTML');
        }
    };

    const minifyCode = useCallback(() => {
        if (!input.trim()) {
            toast.error('Please enter some code to minify');
            return;
        }

        try {
            let minified = '';
            switch (codeType) {
                case 'javascript':
                    minified = minifyJavaScript(input);
                    break;
                case 'css':
                    minified = minifyCSS(input);
                    break;
                case 'html':
                    minified = minifyHTML(input);
                    break;
                default:
                    throw new Error('Unsupported code type');
            }

            setOutput(minified);
            const savings = ((input.length - minified.length) / input.length * 100).toFixed(1);
            toast.success(`Code minified! Size reduced by ${savings}%`);
        } catch (error) {
            toast.error('Failed to minify code. Please check your input.');
            console.error('Minification error:', error);
        }
    }, [input, codeType]);

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
            title="Code Minifier"
            description="Minify JavaScript, CSS, and HTML code to reduce file size."
        >
            <div className="code-minifier">
                <div className="code-type-selector">
                    <button
                        className={codeType === 'javascript' ? 'active' : ''}
                        onClick={() => setCodeType('javascript')}
                    >
                        JavaScript
                    </button>
                    <button
                        className={codeType === 'css' ? 'active' : ''}
                        onClick={() => setCodeType('css')}
                    >
                        CSS
                    </button>
                    <button
                        className={codeType === 'html' ? 'active' : ''}
                        onClick={() => setCodeType('html')}
                    >
                        HTML
                    </button>
                </div>

                <div className="text-areas">
                    <div className="text-area-container">
                        <label>Input Code</label>
                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder={`Enter your ${codeType.toUpperCase()} code here...`}
                            rows={12}
                        />
                        <div className="button-group">
                            <button onClick={handlePaste}>Paste</button>
                            <button onClick={() => handleCopy(input)}>Copy</button>
                        </div>
                    </div>

                    <div className="minify-buttons">
                        <button onClick={minifyCode}>Minify →</button>
                    </div>

                    <div className="text-area-container">
                        <label>Minified Code</label>
                        <textarea
                            value={output}
                            readOnly
                            placeholder="Minified code will appear here..."
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

export default CodeMinifier;
