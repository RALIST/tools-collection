import React, { useState, useCallback } from 'react';
import { toast } from 'react-toastify';

import ToolLayout from '../../../components/layout/ToolLayout/ToolLayout';
import ButtonMain from '../../../components/common/UI/Buttons/ButtonMain/ButtonMain';
import ButtonSecond from '../../../components/common/UI/Buttons/ButtonSecond/ButtonSecond';
import Select from '../../../components/common/UI/Select/Select';
import Textarea from '../../../components/common/UI/Textarea/Textarea';

import styles from "./CodeBeautifier.module.css";

type CodeType = 'javascript' | 'css' | 'html' | 'json';

const CodeBeautifier: React.FC = () => {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [codeType, setCodeType] = useState<CodeType>('javascript');
    const [indentSize, setIndentSize] = useState(2);

    const optionsList = [
        {value: 2, name: '2 spaces'},
        {value: 4, name: '4 spaces'},
        {value: 8, name: '8 spaces'}
    ];

    const beautifyJavaScript = (code: string, indent: number): string => {
        try {
            return JSON.stringify(
                Function(`"use strict"; return (${code})`)(),
                null,
                indent
            );
        } catch (error) {
            try {
                // Try parsing as a statement/expression
                const parsed = require('@babel/parser').parse(code, {
                    sourceType: 'module',
                });
                return require('@babel/generator').default(parsed, {
                    indent: ' '.repeat(indent),
                    jsescOption: { minimal: true },
                }).code;
            } catch (err) {
                throw new Error('Invalid JavaScript code');
            }
        }
    };

    const beautifyCSS = (code: string, indent: number): string => {
        try {
            const rules = code.match(/[^{]+\{[^}]+\}/g) || [];
            return rules
                .map(rule => {
                    const [selector, styles] = rule.split('{');
                    const formattedStyles = styles
                        .replace('}', '')
                        .split(';')
                        .filter(style => style.trim())
                        .map(style => `${' '.repeat(indent)}${style.trim()};`)
                        .join('\n');
                    return `${selector.trim()} {\n${formattedStyles}\n}`;
                })
                .join('\n\n');
        } catch (error) {
            throw new Error('Invalid CSS code');
        }
    };

    const beautifyHTML = (code: string, indent: number): string => {
        try {
            let formatted = '';
            let indentLevel = 0;
            const tokens = code.match(/<[^>]+>|[^<]+/g) || [];

            tokens.forEach(token => {
                if (token.startsWith('</')) {
                    indentLevel--;
                    formatted += ' '.repeat(indentLevel * indent) + token + '\n';
                } else if (token.startsWith('<')) {
                    formatted += ' '.repeat(indentLevel * indent) + token + '\n';
                    if (!token.endsWith('/>') && !token.startsWith('<!') && !token.startsWith('<?')) {
                        indentLevel++;
                    }
                } else {
                    const text = token.trim();
                    if (text) {
                        formatted += ' '.repeat(indentLevel * indent) + text + '\n';
                    }
                }
            });

            return formatted.trim();
        } catch (error) {
            throw new Error('Invalid HTML code');
        }
    };

    const beautifyJSON = (code: string, indent: number): string => {
        try {
            const parsed = JSON.parse(code);
            return JSON.stringify(parsed, null, indent);
        } catch (error) {
            throw new Error('Invalid JSON code');
        }
    };

    const beautifyCode = useCallback(() => {
        if (!input.trim()) {
            toast.error('Please enter some code to beautify');
            return;
        }

        try {
            let beautified = '';
            switch (codeType) {
                case 'javascript':
                    beautified = beautifyJavaScript(input, indentSize);
                    break;
                case 'css':
                    beautified = beautifyCSS(input, indentSize);
                    break;
                case 'html':
                    beautified = beautifyHTML(input, indentSize);
                    break;
                case 'json':
                    beautified = beautifyJSON(input, indentSize);
                    break;
                default:
                    throw new Error('Unsupported code type');
            }

            setOutput(beautified);
            toast.success('Code beautified successfully!');
        } catch (error) {
            toast.error(error instanceof Error ? error.message : 'Failed to beautify code');
            console.error('Beautification error:', error);
        }
    }, [input, codeType, indentSize]);

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
            title="Code Beautifier"
            description="Format and beautify code with proper indentation."
        >
            <div className={styles.codeBeautifier}>
                <div className={styles.controls}>
                    <div className={styles.codeTypeSelector}>
                        <ButtonMain
                            active={codeType === 'javascript'}
                            onClick={() => setCodeType('javascript')}
                        >
                            JavaScript
                        </ButtonMain>
                        <ButtonMain
                            active={codeType === 'css'}
                            onClick={() => setCodeType('css')}
                        >
                            CSS
                        </ButtonMain>
                        <ButtonMain
                            active={codeType === 'html'}
                            onClick={() => setCodeType('html')}
                        >
                            HTML
                        </ButtonMain>
                        <ButtonMain
                            active={codeType === 'json'}
                            onClick={() => setCodeType('json')}
                        >
                            JSON
                        </ButtonMain>
                    </div>

                    <div className={styles.indentSelector}>
                        <label>Indent Size:</label>
                        <Select
                            value={indentSize}
                            onChange={(e) => setIndentSize(Number(e.target.value))}
                            optionsList={optionsList}
                        />
                    </div>
                </div>

                <div className={styles.textAreas}>
                    <div className={styles.textAreaContainer}>
                        <label>Input Code</label>
                        <Textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder={`Enter your ${codeType.toUpperCase()} code here...`}
                            rows={12}
                        />
                        <div className={styles.buttonGroup}>
                            <ButtonSecond onClick={handlePaste} size='small'>Paste</ButtonSecond>
                            <ButtonSecond onClick={() => handleCopy(input)} size='small'>Copy</ButtonSecond>
                        </div>
                    </div>

                    <div className={styles.beautifyButtons}>
                        <ButtonMain onClick={beautifyCode} active>Beautify →</ButtonMain>
                    </div>

                    <div className={styles.textAreaContainer}>
                        <label>Beautified Code</label>
                        <Textarea
                            value={output}
                            readOnly
                            placeholder="Beautified code will appear here..."
                            rows={12}
                        />
                        <div className={styles.buttonGroup}>
                            <ButtonSecond onClick={() => handleCopy(output)} size='small'>Copy</ButtonSecond>
                        </div>
                    </div>
                </div>

                <div className={styles.actionButtons}>
                    <ButtonSecond onClick={handleClear}>Clear All</ButtonSecond>
                </div>
            </div>
        </ToolLayout>
    );
};

export default CodeBeautifier;
