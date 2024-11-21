import React, { useState, useEffect } from 'react';

import ToolLayout from '../../../components/layout/ToolLayout/ToolLayout';
import ButtonMain from '../../../components/common/UI/Buttons/ButtonMain/ButtonMain';
import ButtonSecond from '../../../components/common/UI/Buttons/ButtonSecond/ButtonSecond';
import Checkbox from '../../../components/common/UI/Checkbox/Checkbox';
import Input from '../../../components/common/UI/Input/Input';

import styles from "./PasswordGenerator.module.css";

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
        <ToolLayout
            toolName='passwordGenerator'
        >
            <div className={styles.controls}>
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

                <Checkbox 
                    label='Include Uppercase Letters'
                    checked={useUppercase}
                    onChange={(e) => setUseUppercase(e.target.checked)}
                />
                <Checkbox 
                    label='Include Numbers'
                    checked={useNumbers}
                    onChange={(e) => setUseNumbers(e.target.checked)}
                />
                <Checkbox 
                    label='Include Symbols'
                    checked={useSymbols}
                    onChange={(e) => setUseSymbols(e.target.checked)}
                />

                <ButtonMain onClick={generatePassword} active>Generate Password</ButtonMain>
            </div>

            <div className={styles.result}>
                <Input
                    type="text"
                    value={password}
                    readOnly
                />

                <ButtonSecond onClick={copyPassword}>Copy</ButtonSecond>
            </div>
        </ToolLayout>
    );
};

export default PasswordGenerator;
