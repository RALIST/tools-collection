import React, { useState, useCallback } from 'react';
import { toast } from 'react-toastify';

import ToolLayout from '../../../components/layout/ToolLayout/ToolLayout';
import ButtonMain from '../../../components/common/UI/Buttons/ButtonMain/ButtonMain';
import ButtonSecond from '../../../components/common/UI/Buttons/ButtonSecond/ButtonSecond';
import Textarea from '../../../components/common/UI/Textarea/Textarea';

import styles from "./HashGenerator.module.css";

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
            <div className={styles.hashGenerator}>
                <div className={styles.codeTypeSelector}>
                    <ButtonMain
                        active={hashType === 'md5'}
                        onClick={() => setHashType('md5')}
                        title="Not recommended for security purposes"
                    >
                        MD5
                    </ButtonMain>
                    <ButtonMain
                        active={hashType === 'sha1'}
                        onClick={() => setHashType('sha1')}
                        title="SHA-1 (160 bits)"
                    >
                        SHA-1
                    </ButtonMain>
                    <ButtonMain
                        active={hashType === 'sha256'}
                        onClick={() => setHashType('sha256')}
                        title="SHA-256 (256 bits)"
                    >
                        SHA-256
                    </ButtonMain>
                    <ButtonMain
                        active={hashType === 'sha512'}
                        onClick={() => setHashType('sha512')}
                        title="SHA-512 (512 bits)"
                    >
                        SHA-512
                    </ButtonMain>
                </div>

                <div className={styles.textAreas}>
                    <div className={styles.textAreaContainer}>
                        <label>Input Text</label>
                        <Textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Enter text to hash..."
                            rows={12}
                        />
                        <div className={styles.buttonGroup}>
                            <ButtonSecond onClick={handlePaste} size='small'>Paste</ButtonSecond>
                            <ButtonSecond onClick={() => handleCopy(input)} size='small'>Copy</ButtonSecond>
                        </div>
                    </div>

                    <div className={styles.hashButtons}>
                        <ButtonMain onClick={generateHash} active>Generate Hash →</ButtonMain>
                    </div>

                    <div className={styles.textAreaContainer}>
                        <label>Hash Value</label>
                        <Textarea
                            value={output}
                            readOnly
                            placeholder="Hash value will appear here..."
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

export default HashGenerator;
