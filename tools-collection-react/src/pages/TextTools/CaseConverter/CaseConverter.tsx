import React, { useState } from 'react';
import { toast } from 'react-toastify';

import ToolLayout from '../../../components/layout/ToolLayout/ToolLayout';
import Textarea from '../../../components/common/UI/Textarea/Textarea';
import ButtonMain from '../../../components/common/UI/Buttons/ButtonMain/ButtonMain';
import ButtonSecond from '../../../components/common/UI/Buttons/ButtonSecond/ButtonSecond';

import styles from "./CaseConverter.module.css";

const CaseConverter: React.FC = () => {
    const [currentCase, setCurrentCase] = useState('')
    const [text, setText] = useState('');

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value);
    };

    const convertCase = (type: 'upper' | 'lower' | 'title' | 'sentence') => {
        switch (type) {
            case 'upper':
                setText(text.toUpperCase());
                setCurrentCase('upper');
                break;
            case 'lower':
                setText(text.toLowerCase());
                setCurrentCase('lower');
                break;
            case 'title':
                setText(
                    text
                        .toLowerCase()
                        .split(' ')
                        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                        .join(' ')
                );
                setCurrentCase('title');
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
                setCurrentCase('sentence');
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
            toolName='caseConverter'
        >
            <div className={styles.caseConverter}>
                <div className={styles.buttonGroup}>
                    <ButtonMain onClick={() => convertCase('upper')} active={currentCase === 'upper'}>UPPERCASE</ButtonMain>
                    <ButtonMain onClick={() => convertCase('lower')} active={currentCase === 'lower'}>lowercase</ButtonMain>
                    <ButtonMain onClick={() => convertCase('title')} active={currentCase === 'title'}>Title Case</ButtonMain>
                    <ButtonMain onClick={() => convertCase('sentence')} active={currentCase === 'sentence'}>Sentence case</ButtonMain>
                </div>

                <Textarea 
                    value={text}
                    onChange={handleTextChange}
                    placeholder="Enter or paste your text here..."
                    rows={10}
                />
                
                <div className={styles.actionButtons}>
                    <ButtonSecond onClick={handleCopy}>Copy to Clipboard</ButtonSecond>
                    <ButtonSecond onClick={handleClear}>Clear Text</ButtonSecond>
                </div>
            </div>
        </ToolLayout>
    );
};

export default CaseConverter;
