import React, { useState } from 'react';
import { toast } from 'react-toastify';
import ToolLayout from '../../../components/layout/ToolLayout/ToolLayout';
import './CaseConverter.css';

const CaseConverter: React.FC = () => {
    const [text, setText] = useState('');

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value);
    };

    const convertCase = (type: 'upper' | 'lower' | 'title' | 'sentence') => {
        switch (type) {
            case 'upper':
                setText(text.toUpperCase());
                break;
            case 'lower':
                setText(text.toLowerCase());
                break;
            case 'title':
                setText(
                    text
                        .toLowerCase()
                        .split(' ')
                        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                        .join(' ')
                );
                break;
            case 'sentence':
                setText(
                    text
                        .toLowerCase()
                        .split('. ')
                        .map(sentence => {
                            const trimmed = sentence.trim();
                            return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
                        })
                        .join('. ')
                );
                break;
        }
    };

    const handleCopy = async () => {
        if (!text) {
            toast.error('No text to copy!');
            return;
        }

        try {
            await navigator.clipboard.writeText(text);
            toast.success('Text copied to clipboard!');
        } catch (err) {
            toast.error('Failed to copy text. Please try again.');
        }
    };

    const handleClear = () => {
        if (!text) {
            toast.error('Text area is already empty!');
            return;
        }
        setText('');
        toast.success('Text cleared!');
    };

    return (
        <ToolLayout
            title="Text Case Converter"
            description="Convert text between UPPERCASE, lowercase, Title Case, and Sentence case formats."
        >
            <div className="case-converter">
                <div className="button-group">
                    <button onClick={() => convertCase('upper')}>UPPERCASE</button>
                    <button onClick={() => convertCase('lower')}>lowercase</button>
                    <button onClick={() => convertCase('title')}>Title Case</button>
                    <button onClick={() => convertCase('sentence')}>Sentence case</button>
                </div>
                <textarea
                    value={text}
                    onChange={handleTextChange}
                    placeholder="Enter or paste your text here..."
                    rows={10}
                />
                <div className="action-buttons">
                    <button onClick={handleCopy}>Copy to Clipboard</button>
                    <button onClick={handleClear}>Clear Text</button>
                </div>
            </div>
        </ToolLayout>
    );
};

export default CaseConverter;
