import React, { useState, useCallback } from 'react';
import { toast } from 'react-toastify';

import ToolLayout from '../../../components/layout/ToolLayout/ToolLayout';
import ButtonSecond from '../../../components/common/UI/Buttons/ButtonSecond/ButtonSecond';

import styles from "./StringEncoder.module.css";
import ButtonMain from '../../../components/common/UI/Buttons/ButtonMain/ButtonMain';
import Textarea from '../../../components/common/UI/Textarea/Textarea';

type EncodingMethod = 'base64' | 'url' | 'html';

interface EncodingMethodInfo {
    id: EncodingMethod;
    label: string;
    description: string;
}

const encodingMethods: EncodingMethodInfo[] = [
    {
        id: 'base64',
        label: 'Base64',
        description: 'Convert text to Base64 format'
    },
    {
        id: 'url',
        label: 'URL Encode',
        description: 'Encode text for use in URLs'
    },
    {
        id: 'html',
        label: 'HTML Entities',
        description: 'Convert special characters to HTML entities'
    }
];

const StringEncoder: React.FC = () => {
    const [text, setText] = useState('');
    const [encodedText, setEncodedText] = useState('');
    const [selectedMethod, setSelectedMethod] = useState<EncodingMethod>('base64');

    const encodeText = useCallback(() => {
        if (!text) {
            toast.error('Please enter some text to encode');
            return;
        }

        try {
            let result = '';
            switch (selectedMethod) {
                case 'base64':
                    result = btoa(unescape(encodeURIComponent(text)));
                    break;
                case 'url':
                    result = encodeURIComponent(text);
                    break;
                case 'html':
                    result = text
                        .replace(/&/g, '&amp;')
                        .replace(/</g, '&lt;')
                        .replace(/>/g, '&gt;')
                        .replace(/"/g, '&quot;')
                        .replace(/'/g, '&#039;')
                        .replace(/\//g, '&#x2F;');
                    break;
                default:
                    result = text;
            }
            setEncodedText(result);
            toast.success('Text encoded successfully!');
        } catch (error) {
            toast.error('Failed to encode text. Please check your input.');
            console.error('Encoding error:', error);
        }
    }, [text, selectedMethod]);

    const decodeText = useCallback(() => {
        if (!encodedText) {
            toast.error('Please encode some text first');
            return;
        }

        try {
            let result = '';
            switch (selectedMethod) {
                case 'base64':
                    result = decodeURIComponent(escape(atob(encodedText)));
                    break;
                case 'url':
                    result = decodeURIComponent(encodedText);
                    break;
                case 'html':
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(
                        `<!doctype html><body>${encodedText}`,
                        'text/html'
                    );
                    result = doc.body.textContent || '';
                    break;
                default:
                    result = encodedText;
            }
            setText(result);
            toast.success('Text decoded successfully!');
        } catch (error) {
            toast.error('Failed to decode text. Please check your input.');
            console.error('Decoding error:', error);
        }
    }, [encodedText, selectedMethod]);

    const handleCopy = async (textToCopy: string) => {
        if (!textToCopy) {
            toast.error('No text to copy!');
            return;
        }

        try {
            await navigator.clipboard.writeText(textToCopy);
            toast.success('Text copied to clipboard!');
        } catch (err) {
            toast.error('Failed to copy text. Please try again.');
            console.error('Copy error:', err);
        }
    };

    const handleClear = () => {
        if (!text && !encodedText) {
            toast.error('Text areas are already empty!');
            return;
        }
        setText('');
        setEncodedText('');
        toast.success('Text cleared!');
    };

    const handleMethodChange = (method: EncodingMethod) => {
        setSelectedMethod(method);
        // Clear the encoded text when changing methods
        setEncodedText('');
        toast.info(`Switched to ${encodingMethods.find(m => m.id === method)?.label} encoding`);
    };

    return (
        <ToolLayout
            toolName='stringEncoder'
        >
            <div className={styles.stringEncoder}>
                <div className={styles.encodingMethods}>
                    {encodingMethods.map((method) => (
                        <ButtonMain 
                            key={method.id}
                            onClick={() => handleMethodChange(method.id)}
                            active={selectedMethod === method.id}
                            title={method.description}
                        >
                            {method.label}
                        </ButtonMain>
                    ))}
                </div>

                <div className={styles.textAreas}>
                    <div className={styles.textAreaContainer}>
                        <label>Original Text</label>

                        <Textarea 
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder="Enter text to encode..."
                            rows={12}
                        />

                        <ButtonSecond onClick={() => handleCopy(text)} size='small'>Copy</ButtonSecond>
                    </div>

                    <div className={styles.encodeDecodeButtons}>
                        <ButtonMain onClick={encodeText} active>Encode →</ButtonMain>
                        <ButtonMain onClick={decodeText} active>← Decode</ButtonMain>
                    </div>

                    <div className={styles.textAreaContainer}>
                        <label>Encoded Text</label>

                        <Textarea 
                            value={encodedText}
                            onChange={(e) => setEncodedText(e.target.value)}
                            placeholder="Encoded text will appear here..."
                            rows={12}
                        />

                        <ButtonSecond onClick={() => handleCopy(encodedText)} size='small'>Copy</ButtonSecond>
                    </div>
                </div>

                <div className={styles.actionButtons}>
                    <ButtonSecond onClick={handleClear}>Clear All</ButtonSecond>
                </div>
            </div>
        </ToolLayout>
    );
};

export default StringEncoder;
