import React, { useState, useEffect, useCallback } from 'react';

// import MetaTags from '../../../components/common/MetaTags/MetaTags';
import ToolLayout from '../../../components/layout/ToolLayout/ToolLayout';

import styles from "./ScientificCalculator.module.css";

type Operation = '+' | '-' | '*' | '/' | '^' | 'sqrt' | 'sin' | 'cos' | 'tan' | 'log' | 'ln';
type MemoryOperation = 'MC' | 'MR' | 'M+' | 'M-' | 'MS';

interface HistoryEntry {
    expression: string;
    result: string;
    timestamp: Date;
};

const ScientificCalculator: React.FC = () => {
    const [display, setDisplay] = useState<string>('0');
    const [memory, setMemory] = useState<number>(0);
    const [history, setHistory] = useState<HistoryEntry[]>([]);
    const [expression, setExpression] = useState<string>('');
    const [showHistory, setShowHistory] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const handleNumber = (num: string) => {
        setError('');
        if (display === '0' && num !== '.') {
            setDisplay(num);
        } else if (display.includes('.') && num === '.') {
            return;
        } else {
            setDisplay(display + num);
        };
    };

    const handleOperation = (op: Operation) => {
        setError('');
        try {
            const currentNum = parseFloat(display);
            switch (op) {
                case 'sqrt':
                    if (currentNum < 0) {
                        throw new Error('Cannot calculate square root of a negative number');
                    }
                    const sqrtResult = Math.sqrt(currentNum);
                    setDisplay(sqrtResult.toString());
                    addToHistory(`√(${currentNum})`, sqrtResult.toString());
                    break;
                case 'sin':
                    const sinResult = Math.sin(currentNum * Math.PI / 180);
                    setDisplay(sinResult.toString());
                    addToHistory(`sin(${currentNum}°)`, sinResult.toString());
                    break;
                case 'cos':
                    const cosResult = Math.cos(currentNum * Math.PI / 180);
                    setDisplay(cosResult.toString());
                    addToHistory(`cos(${currentNum}°)`, cosResult.toString());
                    break;
                case 'tan':
                    const tanResult = Math.tan(currentNum * Math.PI / 180);
                    setDisplay(tanResult.toString());
                    addToHistory(`tan(${currentNum}°)`, tanResult.toString());
                    break;
                case 'log':
                    if (currentNum <= 0) {
                        throw new Error('Cannot calculate logarithm of a non-positive number');
                    }
                    const logResult = Math.log10(currentNum);
                    setDisplay(logResult.toString());
                    addToHistory(`log(${currentNum})`, logResult.toString());
                    break;
                case 'ln':
                    if (currentNum <= 0) {
                        throw new Error('Cannot calculate natural logarithm of a non-positive number');
                    }
                    const lnResult = Math.log(currentNum);
                    setDisplay(lnResult.toString());
                    addToHistory(`ln(${currentNum})`, lnResult.toString());
                    break;
                default:
                    setExpression(display + ' ' + op + ' ');
                    setDisplay('0');
            }
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('Invalid operation');
            }
        }
    };

    const handleEquals = () => {
        try {
            if (!expression) return;

            const fullExpression = expression + display;
            // Using Function constructor for safe evaluation
            const result = new Function('return ' + fullExpression.replace('^', '**'))();

            if (isNaN(result) || !isFinite(result)) {
                throw new Error('Invalid calculation');
            }

            addToHistory(fullExpression, result.toString());
            setDisplay(result.toString());
            setExpression('');
        } catch (err) {
            setError('Invalid calculation');
            setDisplay('0');
            setExpression('');
        }
    };

    const handleMemory = (op: MemoryOperation) => {
        const currentNum = parseFloat(display);
        switch (op) {
            case 'MC':
                setMemory(0);
                break;
            case 'MR':
                setDisplay(memory.toString());
                break;
            case 'M+':
                setMemory(memory + currentNum);
                break;
            case 'M-':
                setMemory(memory - currentNum);
                break;
            case 'MS':
                setMemory(currentNum);
                break;
        }
    };

    const addToHistory = (expr: string, res: string) => {
        setHistory(prev => [{
            expression: expr,
            result: res,
            timestamp: new Date()
        }, ...prev.slice(0, 9)]); // Keep last 10 calculations
    };

    const clearDisplay = () => {
        setDisplay('0');
        setExpression('');
        setError('');
    };

    const handleKeyboard = useCallback((event: KeyboardEvent) => {
        const key = event.key;
        if (/[0-9.]/.test(key)) {
            handleNumber(key);
        } else if (['+', '-', '*', '/'].includes(key)) {
            handleOperation(key as Operation);
        } else if (key === 'Enter') {
            handleEquals();
        } else if (key === 'Escape') {
            clearDisplay();
        }
    }, [display, expression]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyboard);
        return () => {
            window.removeEventListener('keydown', handleKeyboard);
        };
    }, [handleKeyboard]);

    return (
        <ToolLayout
            toolName='scientificCalculator'
        >
            {/* <MetaTags
                title="Scientific Calculator - Free Online Calculator"
                description="Free online scientific calculator with advanced mathematical functions, memory operations, and calculation history. Perfect for students, engineers, and professionals."
                keywords="scientific calculator, online calculator, math calculator, trigonometry calculator, logarithm calculator, engineering calculator"
                structuredData={{
                    "@context": "https://schema.org",
                    "@type": "SoftwareApplication",
                    "name": "Scientific Calculator",
                    "description": "Advanced online scientific calculator with memory functions and calculation history.",
                    "url": window.location.href,
                    "applicationCategory": "UtilityApplication",
                    "operatingSystem": "Any",
                    "permissions": "browser",
                    "offers": {
                        "@type": "Offer",
                        "price": "0",
                        "priceCurrency": "USD"
                    }
                }}
            /> */}

            <div className={styles.calculatorContainer}>
                <div className={styles.displaySection}>
                    <div className={styles.expression}>{expression}</div>
                    <div className={styles.display}>{display}</div>
                    {error && <div className={styles.error}>{error}</div>}
                </div>

                <div className={styles.memorySection}>
                    <button onClick={() => handleMemory('MC')}>MC</button>
                    <button onClick={() => handleMemory('MR')}>MR</button>
                    <button onClick={() => handleMemory('M+')}>M+</button>
                    <button onClick={() => handleMemory('M-')}>M-</button>
                    <button onClick={() => handleMemory('MS')}>MS</button>
                </div>

                <div className={styles.scientificSection}>
                    <button onClick={() => handleOperation('sqrt')}>√</button>
                    <button onClick={() => handleOperation('sin')}>sin</button>
                    <button onClick={() => handleOperation('cos')}>cos</button>
                    <button onClick={() => handleOperation('tan')}>tan</button>
                    <button onClick={() => handleOperation('log')}>log</button>
                    <button onClick={() => handleOperation('ln')}>ln</button>
                    <button onClick={() => handleOperation('^')}>x^y</button>
                </div>

                <div className={styles.keypad}>
                    <button onClick={() => handleNumber('7')}>7</button>
                    <button onClick={() => handleNumber('8')}>8</button>
                    <button onClick={() => handleNumber('9')}>9</button>
                    <button onClick={() => handleOperation('/')}>/</button>

                    <button onClick={() => handleNumber('4')}>4</button>
                    <button onClick={() => handleNumber('5')}>5</button>
                    <button onClick={() => handleNumber('6')}>6</button>
                    <button onClick={() => handleOperation('*')}>×</button>

                    <button onClick={() => handleNumber('1')}>1</button>
                    <button onClick={() => handleNumber('2')}>2</button>
                    <button onClick={() => handleNumber('3')}>3</button>
                    <button onClick={() => handleOperation('-')}>-</button>

                    <button onClick={() => handleNumber('0')}>0</button>
                    <button onClick={() => handleNumber('.')}>.</button>
                    <button onClick={handleEquals}>=</button>
                    <button onClick={() => handleOperation('+')}>+</button>
                </div>

                <div className={styles.controlSection}>
                    <button onClick={clearDisplay}>C</button>
                    <button onClick={() => setShowHistory(!showHistory)}>
                        {showHistory ? 'Hide History' : 'Show History'}
                    </button>
                </div>

                {showHistory && (
                    <div className={styles.historySection}>
                        <h3>Calculation History</h3>
                        {history.length === 0 ? (
                            <p>No calculations yet</p>
                        ) : (
                            <ul>
                                {history.map((entry, index) => (
                                    <li key={index}>
                                        <span>{entry.expression} = {entry.result}</span>
                                        <small>
                                            {entry.timestamp.toLocaleTimeString()}
                                        </small>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                )}
            </div>
        </ToolLayout>
    );
};

export default ScientificCalculator;
