import React, { useState, useCallback } from 'react';
import { toast } from 'react-toastify';
import ToolLayout from '../../../components/layout/ToolLayout/ToolLayout';
import './HashGenerator.css';

type HashType = 'md5' | 'sha1' | 'sha256' | 'sha512';

const HashGenerator: React.FC = () => {
    const [input, setInput] = useState('');
    const [hashType, setHashType] = useState<HashType>('md5');
    const [output, setOutput] = useState('');

    const generateHash = useCallback(async () => {
        if (!input.trim()) {
            toast.error('Please enter some text to hash');
            return;
        }

        try {
            const encoder = new TextEncoder();
            const data = encoder.encode(input);
            let hashBuffer;

            switch (hashType) {
                case 'md5':
                    // Web Crypto API doesn't support MD5, so we'll use a warning
                    toast.warning('MD5 is not cryptographically secure. Consider using SHA-256 or SHA-512 instead.');
                    // For demonstration, we'll use a placeholder
                    setOutput('MD5 hash generation requires a dedicated library');
                    return;
                case 'sha1':
                    hashBuffer = await crypto.subtle.digest('SHA-1', data);
                    break;
                case 'sha256':
                    hashBuffer = await crypto.subtle.digest('SHA-256', data);
                    break;
                case 'sha512':
                    hashBuffer = await crypto.subtle.digest('SHA-512', data);
                    break;
                default:
                    throw new Error('Unsupported hash type');
            }

            const hashArray = Array.from(new Uint8Array(hashBuffer));
            const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
            setOutput(hashHex);
            toast.success('Hash generated successfully!');
        } catch (error) {
            toast.error('Failed to generate hash. Please try again.');
            console.error('Hash generation error:', error);
        }
    }, [input, hashType]);

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
            toast.error('Fields are already empty!');
            return;
        }
        setInput('');
        setOutput('');
        toast.success('Cleared all fields!');
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
            title="Hash Generator"
            description="Generate various types of hash values from text input."
        >
            <div className="hash-generator">
                <div className="hash-type-selector">
                    <button
                        className={hashType === 'md5' ? 'active' : ''}
                        onClick={() => setHashType('md5')}
                        title="Not recommended for security purposes"
                    >
                        MD5
                    </button>
                    <button
                        className={hashType === 'sha1' ? 'active' : ''}
                        onClick={() => setHashType('sha1')}
                        title="SHA-1 (160 bits)"
                    >
                        SHA-1
                    </button>
                    <button
                        className={hashType === 'sha256' ? 'active' : ''}
                        onClick={() => setHashType('sha256')}
                        title="SHA-256 (256 bits)"
                    >
                        SHA-256
                    </button>
                    <button
                        className={hashType === 'sha512' ? 'active' : ''}
                        onClick={() => setHashType('sha512')}
                        title="SHA-512 (512 bits)"
                    >
                        SHA-512
                    </button>
                </div>

                <div className="text-areas">
                    <div className="text-area-container">
                        <label>Input Text</label>
                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Enter text to hash..."
                            rows={6}
                        />
                        <div className="button-group">
                            <button onClick={handlePaste}>Paste</button>
                            <button onClick={() => handleCopy(input)}>Copy</button>
                        </div>
                    </div>

                    <div className="hash-buttons">
                        <button onClick={generateHash}>Generate Hash →</button>
                    </div>

                    <div className="text-area-container">
                        <label>Hash Value</label>
                        <textarea
                            value={output}
                            readOnly
                            placeholder="Hash value will appear here..."
                            rows={6}
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

export default HashGenerator;
