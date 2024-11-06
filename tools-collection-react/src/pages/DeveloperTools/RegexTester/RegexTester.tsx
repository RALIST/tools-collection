import React, { useState, useCallback, useEffect } from 'react';
import { toast } from 'react-toastify';
import ToolLayout from '../../../components/layout/ToolLayout/ToolLayout';
import './RegexTester.css';

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
            <div className="regex-tester">
                <div className="pattern-section">
                    <div className="pattern-input">
                        <label>Pattern</label>
                        <div className="input-with-copy">
                            <input
                                type="text"
                                value={pattern}
                                onChange={(e) => setPattern(e.target.value)}
                                placeholder="Enter regex pattern..."
                            />
                            <button onClick={() => handleCopy(pattern)}>Copy</button>
                        </div>
                    </div>

                    <div className="flags-section">
                        <label>Flags:</label>
                        <div className="flag-buttons">
                            <button
                                className={flags.includes('g') ? 'active' : ''}
                                onClick={() => toggleFlag('g')}
                                title="Global search"
                            >
                                g
                            </button>
                            <button
                                className={flags.includes('i') ? 'active' : ''}
                                onClick={() => toggleFlag('i')}
                                title="Case-insensitive search"
                            >
                                i
                            </button>
                            <button
                                className={flags.includes('m') ? 'active' : ''}
                                onClick={() => toggleFlag('m')}
                                title="Multiline search"
                            >
                                m
                            </button>
                            <button
                                className={flags.includes('s') ? 'active' : ''}
                                onClick={() => toggleFlag('s')}
                                title="Allows . to match newline characters"
                            >
                                s
                            </button>
                        </div>
                    </div>
                </div>

                {error && <div className="error-message">{error}</div>}

                <div className="test-section">
                    <div className="test-input">
                        <label>Test Text</label>
                        <textarea
                            value={testText}
                            onChange={(e) => setTestText(e.target.value)}
                            placeholder="Enter text to test against..."
                            rows={8}
                        />
                    </div>

                    <div className="matches-section">
                        <label>Matches ({matches.length})</label>
                        <div className="matches-list">
                            {matches.length > 0 ? (
                                matches.map((match, index) => (
                                    <div key={index} className="match-item">
                                        <div className="match-header">
                                            <span>Match {index + 1}</span>
                                            <span>Index: {match.index}</span>
                                        </div>
                                        <div className="match-text">
                                            <span>Text: </span>
                                            <code>{match.text}</code>
                                        </div>
                                        {match.groups.length > 0 && (
                                            <div className="match-groups">
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
                                <div className="no-matches">
                                    {pattern ? 'No matches found' : 'Enter a pattern to start matching'}
                                </div>
                            )}
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

export default RegexTester;
