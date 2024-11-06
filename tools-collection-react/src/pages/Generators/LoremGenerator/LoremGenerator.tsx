import React, { useState, useEffect } from 'react';
import './LoremGenerator.css';

const LoremGenerator: React.FC = () => {
    const [paragraphCount, setParagraphCount] = useState<number>(3);
    const [paragraphLength, setParagraphLength] = useState<string>('medium');
    const [startWithLorem, setStartWithLorem] = useState<boolean>(true);
    const [output, setOutput] = useState<string>('');
    const [wordCount, setWordCount] = useState<number>(0);
    const [charCount, setCharCount] = useState<number>(0);

    const loremIpsumWords = [
        'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
        'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
        'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud',
        'exercitation', 'ullamco', 'laboris', 'nisi', 'ut', 'aliquip', 'ex', 'ea',
        'commodo', 'consequat', 'duis', 'aute', 'irure', 'dolor', 'in',
        'reprehenderit', 'in', 'voluptate', 'velit', 'esse', 'cillum', 'dolore', 'eu',
        'fugiat', 'nulla', 'pariatur', 'excepteur', 'sint', 'occaecat', 'cupidatat',
        'non', 'proident', 'sunt', 'in', 'culpa', 'qui', 'officia', 'deserunt',
        'mollit', 'anim', 'id', 'est', 'laborum', 'sed', 'ut', 'perspiciatis', 'unde',
        'omnis', 'iste', 'natus', 'error', 'sit', 'voluptatem', 'accusantium',
        'doloremque', 'laudantium', 'totam', 'rem', 'aperiam', 'eaque', 'ipsa', 'quae',
        'ab', 'illo', 'inventore', 'veritatis', 'et', 'quasi', 'architecto', 'beatae',
        'vitae', 'dicta', 'sunt', 'explicabo', 'nemo'
    ];

    const getRandomWord = () => {
        return loremIpsumWords[Math.floor(Math.random() * loremIpsumWords.length)];
    };

    const capitalizeFirstLetter = (string: string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const generateSentence = (minWords = 5, maxWords = 15) => {
        const length = Math.floor(Math.random() * (maxWords - minWords + 1)) + minWords;
        let sentence = [];

        for (let i = 0; i < length; i++) {
            sentence.push(getRandomWord());
        }

        return capitalizeFirstLetter(sentence.join(' ')) + '.';
    };

    const generateParagraph = (length: string) => {
        const sentenceCounts: { [key: string]: { min: number; max: number } } = {
            short: { min: 3, max: 5 },
            medium: { min: 5, max: 8 },
            long: { min: 8, max: 12 }
        };

        const { min, max } = sentenceCounts[length];
        const sentenceCount = Math.floor(Math.random() * (max - min + 1)) + min;
        let sentences = [];

        for (let i = 0; i < sentenceCount; i++) {
            sentences.push(generateSentence());
        }

        return sentences.join(' ');
    };

    const generateLoremIpsum = () => {
        let paragraphs = [];

        for (let i = 0; i < paragraphCount; i++) {
            if (i === 0 && startWithLorem) {
                paragraphs.push(
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ' +
                    generateParagraph(paragraphLength)
                );
            } else {
                paragraphs.push(generateParagraph(paragraphLength));
            }
        }

        const text = paragraphs.join('\n\n');
        setOutput(text);

        // Update statistics
        const words = text.split(/\s+/).filter(word => word.length > 0);
        setWordCount(words.length);
        setCharCount(text.length);
    };

    const copyText = () => {
        navigator.clipboard
            .writeText(output)
            .then(() => {
                alert('Text copied to clipboard!');
            })
            .catch(error => {
                console.error('Copy error:', error);
            });
    };

    useEffect(() => {
        generateLoremIpsum();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="lorem-generator">
            <h2>Lorem Ipsum Generator</h2>
            <div className="controls">
                <label>
                    Paragraphs:
                    <input
                        type="number"
                        min="1"
                        max="20"
                        value={paragraphCount}
                        onChange={e => setParagraphCount(parseInt(e.target.value))}
                    />
                </label>
                <label>
                    Paragraph Length:
                    <select
                        value={paragraphLength}
                        onChange={e => setParagraphLength(e.target.value)}
                    >
                        <option value="short">Short</option>
                        <option value="medium">Medium</option>
                        <option value="long">Long</option>
                    </select>
                </label>
                <label>
                    <input
                        type="checkbox"
                        checked={startWithLorem}
                        onChange={e => setStartWithLorem(e.target.checked)}
                    />
                    Start with "Lorem ipsum dolor sit amet..."
                </label>
                <button className="generate-btn" onClick={generateLoremIpsum}>
                    Generate
                </button>
            </div>
            <div className="output-section">
                <textarea
                    readOnly
                    value={output}
                    rows={10}
                ></textarea>
                <div className="statistics">
                    <span>Words: {wordCount}</span>
                    <span>Characters: {charCount}</span>
                </div>
                <button className="copy-btn" onClick={copyText}>
                    Copy
                </button>
            </div>
        </div>
    );
};

export default LoremGenerator;
