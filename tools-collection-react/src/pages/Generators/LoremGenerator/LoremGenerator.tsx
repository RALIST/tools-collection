import React, { useState } from 'react';
import './LoremGenerator.css';

const LoremGenerator: React.FC = () => {
    const [paragraphs, setParagraphs] = useState<number>(3);
    const [type, setType] = useState<'standard' | 'hipster'>('standard');
    const [output, setOutput] = useState<string>('');

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
        <div className="lorem-generator">
            <h1>Lorem Ipsum Generator</h1>
            <p>Generate placeholder text for your designs and layouts.</p>

            <div className="options">
                <div className="option-group">
                    <label htmlFor="paragraphs">Paragraphs:</label>
                    <input
                        type="number"
                        id="paragraphs"
                        min="1"
                        max="10"
                        value={paragraphs}
                        onChange={(e) => setParagraphs(Math.min(10, Math.max(1, parseInt(e.target.value) || 1)))}
                        aria-label="Number of paragraphs"
                    />
                </div>

                <div className="option-group">
                    <label htmlFor="type">Type:</label>
                    <select
                        id="type"
                        value={type}
                        onChange={(e) => setType(e.target.value as 'standard' | 'hipster')}
                        aria-label="Lorem ipsum type"
                    >
                        <option value="standard">Standard Lorem Ipsum</option>
                        <option value="hipster">Hipster Ipsum</option>
                    </select>
                </div>

                <button
                    className="generate-button"
                    onClick={handleGenerate}
                    aria-label="Generate lorem ipsum text"
                >
                    Generate Text
                </button>
            </div>

            {output && (
                <div className="output">
                    <div
                        className="output-text"
                        role="region"
                        aria-label="Generated text"
                        tabIndex={0}
                    >
                        {output}
                    </div>
                    <button
                        className="copy-button"
                        onClick={handleCopy}
                        aria-label="Copy generated text to clipboard"
                    >
                        Copy to Clipboard
                    </button>
                </div>
            )}
        </div>
    );
};

export default LoremGenerator;
