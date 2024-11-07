import React, { useState } from 'react';
import './PercentageCalculator.css';
import MetaTags from '../../../components/common/MetaTags/MetaTags';

type CalculationType = 'basic' | 'increase' | 'ratio' | 'change';

const PercentageCalculator: React.FC = () => {
    const [calculationType, setCalculationType] = useState<CalculationType>('basic');
    const [number1, setNumber1] = useState<string>('');
    const [number2, setNumber2] = useState<string>('');
    const [result, setResult] = useState<string>('');
    const [error, setError] = useState<string>('');

    const validateInputs = (inputs: string[]): boolean => {
        for (const input of inputs) {
            if (input === '') {
                setError('Please fill in all fields');
                return false;
            }
            const num = parseFloat(input);
            if (isNaN(num)) {
                setError('Please enter valid numbers');
                return false;
            }
        }
        return true;
    };

    const calculate = () => {
        setError('');
        setResult('');

        switch (calculationType) {
            case 'basic':
                // Calculate X% of Y
                if (!validateInputs([number1, number2])) return;
                const percentage = parseFloat(number1);
                const value = parseFloat(number2);
                const basicResult = (percentage / 100) * value;
                setResult(`${percentage}% of ${value} is ${basicResult.toFixed(2)}`);
                break;

            case 'increase':
                // Calculate value after X% increase/decrease
                if (!validateInputs([number1, number2])) return;
                const changePercentage = parseFloat(number1);
                const originalValue = parseFloat(number2);
                const newValue = originalValue * (1 + changePercentage / 100);
                setResult(
                    `After a ${changePercentage}% ${changePercentage >= 0 ? 'increase' : 'decrease'}, ` +
                    `${originalValue} becomes ${newValue.toFixed(2)}`
                );
                break;

            case 'ratio':
                // Calculate what percentage X is of Y
                if (!validateInputs([number1, number2])) return;
                const part = parseFloat(number1);
                const whole = parseFloat(number2);
                if (whole === 0) {
                    setError('Cannot divide by zero');
                    return;
                }
                const ratio = (part / whole) * 100;
                setResult(`${part} is ${ratio.toFixed(2)}% of ${whole}`);
                break;

            case 'change':
                // Calculate percentage change between two numbers
                if (!validateInputs([number1, number2])) return;
                const oldValue = parseFloat(number1);
                const newVal = parseFloat(number2);
                if (oldValue === 0) {
                    setError('Original value cannot be zero');
                    return;
                }
                const change = ((newVal - oldValue) / oldValue) * 100;
                const changeType = change >= 0 ? 'increase' : 'decrease';
                setResult(
                    `The percentage ${changeType} from ${oldValue} to ${newVal} ` +
                    `is ${Math.abs(change).toFixed(2)}%`
                );
                break;
        }
    };

    const getInputLabels = () => {
        switch (calculationType) {
            case 'basic':
                return ['Percentage (%)', 'Number'];
            case 'increase':
                return ['Percentage change (%)', 'Original number'];
            case 'ratio':
                return ['Part', 'Whole'];
            case 'change':
                return ['Original value', 'New value'];
            default:
                return ['Number 1', 'Number 2'];
        }
    };

    const labels = getInputLabels();

    return (
        <div className="percentage-calculator">
            <MetaTags
                title="Percentage Calculator"
                description="Free online percentage calculator. Calculate percentages, percentage changes, ratios, and more with this easy-to-use tool."
                keywords="percentage calculator, percent calculator, percentage increase calculator, percentage decrease calculator, percentage change calculator, calculate ratio, math tools"
                structuredData={{
                    "@context": "https://schema.org",
                    "@type": "SoftwareApplication",
                    "name": "Percentage Calculator",
                    "description": "Online tool to calculate percentages, percentage changes, and ratios with instant results.",
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
            />

            <h1>Percentage Calculator</h1>

            <div className="calculator-container">
                <div className="calculation-type">
                    <label htmlFor="calc-type">Calculation Type:</label>
                    <select
                        id="calc-type"
                        value={calculationType}
                        onChange={(e) => {
                            setCalculationType(e.target.value as CalculationType);
                            setResult('');
                            setError('');
                        }}
                    >
                        <option value="basic">Basic Percentage</option>
                        <option value="increase">Percentage Change</option>
                        <option value="ratio">Percentage Ratio</option>
                        <option value="change">Calculate Change</option>
                    </select>
                </div>

                <div className="input-group">
                    <div className="input-field">
                        <label htmlFor="number1">{labels[0]}:</label>
                        <input
                            type="number"
                            id="number1"
                            value={number1}
                            onChange={(e) => {
                                setNumber1(e.target.value);
                                setError('');
                            }}
                            placeholder={`Enter ${labels[0].toLowerCase()}`}
                        />
                    </div>

                    <div className="input-field">
                        <label htmlFor="number2">{labels[1]}:</label>
                        <input
                            type="number"
                            id="number2"
                            value={number2}
                            onChange={(e) => {
                                setNumber2(e.target.value);
                                setError('');
                            }}
                            placeholder={`Enter ${labels[1].toLowerCase()}`}
                        />
                    </div>
                </div>

                <button
                    className="calculate-button"
                    onClick={calculate}
                    aria-label="Calculate percentage"
                >
                    Calculate
                </button>

                {result && (
                    <div className="result" role="status">
                        {result}
                    </div>
                )}

                {error && (
                    <div className="error-message" role="alert">
                        {error}
                    </div>
                )}
            </div>

            <div className="tool-description">
                <h2>Calculate Percentages and Ratios</h2>
                <p>
                    A versatile percentage calculator that helps you solve various percentage-related calculations.
                    Whether you need to find a percentage of a number, calculate percentage changes, or determine ratios,
                    this tool makes it quick and easy.
                </p>

                <div className="features-list">
                    <h3>Key Features:</h3>
                    <ul>
                        <li><strong>Basic Percentage:</strong> Calculate X% of any number</li>
                        <li><strong>Percentage Change:</strong> Calculate values after increase or decrease</li>
                        <li><strong>Percentage Ratio:</strong> Find what percentage one number is of another</li>
                        <li><strong>Change Calculator:</strong> Calculate the percentage change between two numbers</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default PercentageCalculator;
