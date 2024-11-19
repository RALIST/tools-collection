import React, { useState, useCallback, useEffect } from 'react';
import { toast } from 'react-toastify';

import ToolLayout from '../../../components/layout/ToolLayout/ToolLayout';
import ButtonMain from '../../../components/common/UI/Buttons/ButtonMain/ButtonMain';
import ButtonSecond from '../../../components/common/UI/Buttons/ButtonSecond/ButtonSecond';
import Textarea from '../../../components/common/UI/Textarea/Textarea';
import Input from '../../../components/common/UI/Input/Input';

import styles from "./RegexTester.module.css";

interface Match {
    text: string;
    index: number;
    groups: string[];
}

const RegexTester: React.FC = () => {
    const [pattern, setPattern] = useState('');
    const [flags, setFlags] = useState('g');
    const [testText, setTestText] = useState('');
    const [matches, setMatches] = useState<Match[]>([]);
    const [error, setError] = useState<string | null>(null);

    const testRegex = useCallback(() => {
        if (!pattern.trim()) {
            setMatches([]);
            setError(null);
            return;
        }

        try {
            const regex = new RegExp(pattern, flags);
            const foundMatches: Match[] = [];
            let match;

            if (flags.includes('g')) {
                while ((match = regex.exec(testText)) !== null) {
                    foundMatches.push({
                        text: match[0],
                        index: match.index,
                        groups: match.slice(1)
                    });
                }
            } else {
                match = regex.exec(testText);
                if (match) {
                    foundMatches.push({
                        text: match[0],
                        index: match.index,
                        groups: match.slice(1)
                    });
                }
            }

            setMatches(foundMatches);
            setError(null);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Invalid regular expression');
            setMatches([]);
        }
    }, [pattern, flags, testText]);

    useEffect(() => {
        testRegex();
    }, [pattern, flags, testText, testRegex]);

    const toggleFlag = (flag: string) => {
        setFlags(prev =>
            prev.includes(flag)
                ? prev.replace(flag, '')
                : prev + flag
        );
    };

    const handleCopy = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            toast.success('Copied to clipboard!');
        } catch (err) {
            toast.error('Failed to copy text. Please try again.');
            console.error('Copy error:', err);
        }
    };

    const handleClear = () => {
        if (!pattern && !testText) {
            toast.error('Fields are already empty!');
            return;
        }
        setPattern('');
        setTestText('');
        setMatches([]);
        setError(null);
        toast.success('Cleared all fields!');
    };

    return (
        <ToolLayout
            title="Regex Tester"
            description="Test and debug regular expressions with real-time matching."
        >
            <div className={styles.regexTester}>
                <div className={styles.patternSection}>
                    <div className={styles.patternInput}>
                        <label>Pattern:</label>
                        <Input
                            type="text"
                            value={pattern}
                            onChange={(e) => setPattern(e.target.value)}
                            placeholder="Enter regex pattern..."
                        />
                        <ButtonSecond onClick={() => handleCopy(pattern)}>Copy</ButtonSecond>
                    </div>

                    <div className={styles.flagsSection}>
                        <label>Flags:</label>
                        <div className={styles.flagButtons}>
                            <ButtonMain
                                active={flags.includes('g')}
                                onClick={() => toggleFlag('g')}
                                title="Global search"
                            >
                                g
                            </ButtonMain>
                            <ButtonMain
                                active={flags.includes('i')}
                                onClick={() => toggleFlag('i')}
                                title="Case-insensitive search"
                            >
                                i
                            </ButtonMain>
                            <ButtonMain
                                active={flags.includes('m')}
                                onClick={() => toggleFlag('m')}
                                title="Multiline search"
                            >
                                m
                            </ButtonMain>
                            <ButtonMain
                                active={flags.includes('s')}
                                onClick={() => toggleFlag('s')}
                                title="Allows . to match newline characters"
                            >
                                s
                            </ButtonMain>
                        </div>
                    </div>
                </div>

                {error && <div className={styles.errorMessage}>{error}</div>}

                <div className={styles.testSection}>
                    <div className={styles.testInput}>
                        <label>Test Text</label>
                        <Textarea
                            value={testText}
                            onChange={(e) => setTestText(e.target.value)}
                            placeholder="Enter text to test against..."
                            rows={8}
                        />
                    </div>

                    <div className={styles.matchesSection}>
                        <label>Matches ({matches.length})</label>
                        <div className={styles.matchesList}>
                            {matches.length > 0 ? (
                                matches.map((match, index) => (
                                    <div key={index} className={styles.matchItem}>
                                        <div className={styles.matchHeader}>
                                            <span>Match {index + 1}</span>
                                            <span>Index: {match.index}</span>
                                        </div>
                                        <div className={styles.matchText}>
                                            <span>Text: </span>
                                            <code>{match.text}</code>
                                        </div>
                                        {match.groups.length > 0 && (
                                            <div className={styles.matchGroups}>
                                                <span>Groups:</span>
                                                {match.groups.map((group, groupIndex) => (
                                                    <div key={groupIndex} className="group-item">
                                                        <span>Group {groupIndex + 1}: </span>
                                                        <code>{group}</code>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))
                            ) : (
                                <div className={styles.noMatches}>
                                    {pattern ? 'No matches found' : 'Enter a pattern to start matching'}
                                </div>
                            )}
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

export default RegexTester;
