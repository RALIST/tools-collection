import React, { useState, useEffect } from 'react';
import './PasswordGenerator.css';

const PasswordGenerator: React.FC = () => {
    const [length, setLength] = useState<number>(12);
    const [useUppercase, setUseUppercase] = useState<boolean>(true);
    const [useNumbers, setUseNumbers] = useState<boolean>(true);
    const [useSymbols, setUseSymbols] = useState<boolean>(false);
    const [password, setPassword] = useState<string>('');

    const chars = {
        lowercase: 'abcdefghijklmnopqrstuvwxyz',
        uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        numbers: '0123456789',
        symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?'
    };

    useEffect(() => {
        generatePassword();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const generatePassword = () => {
        let availableChars = chars.lowercase;
        if (useUppercase) availableChars += chars.uppercase;
        if (useNumbers) availableChars += chars.numbers;
        if (useSymbols) availableChars += chars.symbols;

        let generatedPassword = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * availableChars.length);
            generatedPassword += availableChars[randomIndex];
        }

        setPassword(generatedPassword);
    };

    const copyPassword = () => {
        navigator.clipboard.writeText(password).then(() => {
            // Show feedback
            alert('Password copied to clipboard!');
        }).catch((error) => {
            console.error('Copy error:', error);
        });
    };

    return (
        <div className="password-generator">
            <h2>Password Generator</h2>
            <div className="controls">
                <label>
                    Length: {length}
                    <input
                        type="range"
                        min="4"
                        max="32"
                        value={length}
                        onChange={(e) => setLength(parseInt(e.target.value))}
                    />
                </label>
                <label>
                    <input
                        type="checkbox"
                        checked={useUppercase}
                        onChange={(e) => setUseUppercase(e.target.checked)}
                    />
                    Include Uppercase Letters
                </label>
                <label>
                    <input
                        type="checkbox"
                        checked={useNumbers}
                        onChange={(e) => setUseNumbers(e.target.checked)}
                    />
                    Include Numbers
                </label>
                <label>
                    <input
                        type="checkbox"
                        checked={useSymbols}
                        onChange={(e) => setUseSymbols(e.target.checked)}
                    />
                    Include Symbols
                </label>
                <button className="generate-btn" onClick={generatePassword}>Generate Password</button>
            </div>
            <div className="result">
                <input
                    type="text"
                    value={password}
                    readOnly
                />
                <button className="copy-btn" onClick={copyPassword}>Copy</button>
            </div>
        </div>
    );
};

export default PasswordGenerator;
