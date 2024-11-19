import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import ToolLayout from '../../../components/layout/ToolLayout/ToolLayout';
import Textarea from '../../../components/common/UI/Textarea/Textarea';
import ButtonSecond from '../../../components/common/UI/Buttons/ButtonSecond/ButtonSecond';

import styles from "./WordCounte.module.css";

interface TextStats {
    words: number;
    characters: number;
    sentences: number;
    paragraphs: number;
    readingTime: number;
}

const WordCounter: React.FC = () => {
    const [text, setText] = useState('');
    const [stats, setStats] = useState<TextStats>({
        words: 0,
        characters: 0,
        sentences: 0,
        paragraphs: 0,
        readingTime: 0
    });

    const calculateStats = (text: string): TextStats => {
        const words = text.trim() ? text.trim().split(/\s+/).length : 0;
        const characters = text.length;
        const sentences = text.trim() ? text.split(/[.!?]+/).filter(Boolean).length : 0;
        const paragraphs = text.trim() ? text.split(/\n\s*\n/).filter(Boolean).length : 0;
        const readingTime = Math.ceil(words / 200); // Average reading speed of 200 words per minute

        return {
            words,
            characters,
            sentences,
            paragraphs,
            readingTime
        };
    };

    useEffect(() => {
        setStats(calculateStats(text));
    }, [text]);

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value);
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
            title="Word Counter"
            description="Count words, characters, sentences, and estimate reading time."
        >
            <div className={styles.wordCounter}>
                <div className={styles.statsGrid}>
                    <div className={styles.statCard}>
                        <div className={styles.statValue}>{stats.words}</div>
                        <div className={styles.statLabel}>Words</div>
                    </div>
                    <div className={styles.statCard}>
                        <div className={styles.statValue}>{stats.characters}</div>
                        <div className={styles.statLabel}>Characters</div>
                    </div>
                    <div className={styles.statCard}>
                        <div className={styles.statValue}>{stats.sentences}</div>
                        <div className={styles.statLabel}>Sentences</div>
                    </div>
                    <div className={styles.statCard}>
                        <div className={styles.statValue}>{stats.paragraphs}</div>
                        <div className={styles.statLabel}>Paragraphs</div>
                    </div>
                    <div className={styles.statCard}>
                        <div className={styles.statValue}>{stats.readingTime}</div>
                        <div className={styles.statLabel}>Minutes to Read</div>
                    </div>
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

export default WordCounter;
