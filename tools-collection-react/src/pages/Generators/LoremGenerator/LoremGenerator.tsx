import React, { useState } from 'react';

import ToolLayout from '../../../components/layout/ToolLayout/ToolLayout';
import ButtonMain from '../../../components/common/UI/Buttons/ButtonMain/ButtonMain';
import ButtonSecond from '../../../components/common/UI/Buttons/ButtonSecond/ButtonSecond';
import Select from '../../../components/common/UI/Select/Select';
import Input from '../../../components/common/UI/Input/Input';

import styles from "./LoremGenerator.module.css";

const LoremGenerator: React.FC = () => {
    const [paragraphs, setParagraphs] = useState<number>(3);
    const [type, setType] = useState<'standard' | 'hipster'>('standard');
    const [output, setOutput] = useState<string>('');

    const optionsList = [
        {value: 'standard', name: 'Standard Lorem Ipsum'},
        {value: 'hipster', name: 'Hipster Ipsum'}
    ]

    const standardWords = [
        'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
        'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
        'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud', 'exercitation',
        'ullamco', 'laboris', 'nisi', 'aliquip', 'ex', 'ea', 'commodo', 'consequat'
    ];

    const hipsterWords = [
        'artisan', 'aesthetic', 'biodiesel', 'craft', 'beer', 'dreamcatcher', 'ethical',
        'gastropub', 'gentrify', 'helvetica', 'kickstarter', 'locavore', 'lomo', 'meditation',
        'mustache', 'organic', 'portland', 'raw', 'denim', 'semiotics', 'sustainable', 'synth',
        'tattooed', 'thundercats', 'tofu', 'typewriter', 'vinyl', 'vegan', 'wayfarers', 'wolf'
    ];

    const generateSentence = (words: string[]): string => {
        const length = 10 + Math.floor(Math.random() * 10);
        let sentence = '';

        for (let i = 0; i < length; i++) {
            const word = words[Math.floor(Math.random() * words.length)];
            sentence += (i === 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word);
            sentence += (i === length - 1 ? '. ' : ' ');
        }

        return sentence;
    };

    const generateParagraph = (words: string[]): string => {
        const sentences = 3 + Math.floor(Math.random() * 3);
        let paragraph = '';

        for (let i = 0; i < sentences; i++) {
            paragraph += generateSentence(words);
        }

        return paragraph.trim() + '\n\n';
    };

    const handleGenerate = () => {
        const words = type === 'standard' ? standardWords : hipsterWords;
        let text = '';

        for (let i = 0; i < paragraphs; i++) {
            text += generateParagraph(words);
        }

        setOutput(text.trim());
    };

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(output);
            // You could add a toast notification here
        } catch (err) {
            console.error('Failed to copy text:', err);
        }
    };

    return (
        <ToolLayout 
            title='Lorem Ipsum Generator'
            description='Generate placeholder text for your designs and layouts.'
        >
            <div className={styles.options}>
                <div className={styles.optionGroup}>
                    <label htmlFor="paragraphs">Paragraphs:</label>
                    <Input
                        type="number"
                        id="paragraphs"
                        min="1"
                        max="10"
                        value={paragraphs}
                        onChange={(e) => setParagraphs(Math.min(10, Math.max(1, parseInt(e.target.value) || 1)))}
                        ariaLabel="Number of paragraphs"
                    />
                </div>

                <div className={styles.optionGroup}>
                    <label htmlFor="type">Type:</label>
                    <Select 
                        id="type"
                        value={type}
                        onChange={(e) => setType(e.target.value as 'standard' | 'hipster')}
                        optionsList={optionsList}
                        ariaLabel="Lorem ipsum type"
                    />
                </div>

                <ButtonMain
                    onClick={handleGenerate}
                    ariaLabel="Generate lorem ipsum text"
                    active
                >
                    Generate Text
                </ButtonMain>
            </div>

            {output && (
                <div className={styles.output}>
                    <div
                        className={styles.outputText}
                        role="region"
                        aria-label="Generated text"
                        tabIndex={0}
                    >
                        {output}
                    </div>
                    
                    <ButtonSecond 
                        onClick={handleCopy}
                        aria-label="Copy generated text to clipboard"
                    >
                        Copy to Clipboard
                    </ButtonSecond>
                </div>
            )}
        </ToolLayout>
    );
};

export default LoremGenerator;
