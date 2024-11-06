import React, { useState, useCallback } from 'react';
import { toast } from 'react-toastify';
import ToolLayout from '../../../components/layout/ToolLayout/ToolLayout';
import './UnitConverter.css';

type UnitCategory = 'length' | 'mass' | 'temperature' | 'volume' | 'area';

interface UnitConversion {
    name: string;
    toBase: (value: number) => number;
    fromBase: (value: number) => number;
}

const unitCategories: Record<UnitCategory, Record<string, UnitConversion>> = {
    length: {
        meters: {
            name: 'Meters (m)',
            toBase: (value) => value,
            fromBase: (value) => value
        },
        kilometers: {
            name: 'Kilometers (km)',
            toBase: (value) => value * 1000,
            fromBase: (value) => value / 1000
        },
        centimeters: {
            name: 'Centimeters (cm)',
            toBase: (value) => value / 100,
            fromBase: (value) => value * 100
        },
        millimeters: {
            name: 'Millimeters (mm)',
            toBase: (value) => value / 1000,
            fromBase: (value) => value * 1000
        },
        inches: {
            name: 'Inches (in)',
            toBase: (value) => value * 0.0254,
            fromBase: (value) => value / 0.0254
        },
        feet: {
            name: 'Feet (ft)',
            toBase: (value) => value * 0.3048,
            fromBase: (value) => value / 0.3048
        },
        yards: {
            name: 'Yards (yd)',
            toBase: (value) => value * 0.9144,
            fromBase: (value) => value / 0.9144
        },
        miles: {
            name: 'Miles (mi)',
            toBase: (value) => value * 1609.344,
            fromBase: (value) => value / 1609.344
        }
    },
    mass: {
        kilograms: {
            name: 'Kilograms (kg)',
            toBase: (value) => value,
            fromBase: (value) => value
        },
        grams: {
            name: 'Grams (g)',
            toBase: (value) => value / 1000,
            fromBase: (value) => value * 1000
        },
        milligrams: {
            name: 'Milligrams (mg)',
            toBase: (value) => value / 1000000,
            fromBase: (value) => value * 1000000
        },
        pounds: {
            name: 'Pounds (lb)',
            toBase: (value) => value * 0.453592,
            fromBase: (value) => value / 0.453592
        },
        ounces: {
            name: 'Ounces (oz)',
            toBase: (value) => value * 0.0283495,
            fromBase: (value) => value / 0.0283495
        }
    },
    temperature: {
        celsius: {
            name: 'Celsius (°C)',
            toBase: (value) => value,
            fromBase: (value) => value
        },
        fahrenheit: {
            name: 'Fahrenheit (°F)',
            toBase: (value) => (value - 32) * 5 / 9,
            fromBase: (value) => value * 9 / 5 + 32
        },
        kelvin: {
            name: 'Kelvin (K)',
            toBase: (value) => value - 273.15,
            fromBase: (value) => value + 273.15
        }
    },
    volume: {
        liters: {
            name: 'Liters (L)',
            toBase: (value) => value,
            fromBase: (value) => value
        },
        milliliters: {
            name: 'Milliliters (mL)',
            toBase: (value) => value / 1000,
            fromBase: (value) => value * 1000
        },
        cubicMeters: {
            name: 'Cubic Meters (m³)',
            toBase: (value) => value * 1000,
            fromBase: (value) => value / 1000
        },
        gallons: {
            name: 'Gallons (gal)',
            toBase: (value) => value * 3.78541,
            fromBase: (value) => value / 3.78541
        },
        quarts: {
            name: 'Quarts (qt)',
            toBase: (value) => value * 0.946353,
            fromBase: (value) => value / 0.946353
        },
        pints: {
            name: 'Pints (pt)',
            toBase: (value) => value * 0.473176,
            fromBase: (value) => value / 0.473176
        }
    },
    area: {
        squareMeters: {
            name: 'Square Meters (m²)',
            toBase: (value) => value,
            fromBase: (value) => value
        },
        squareKilometers: {
            name: 'Square Kilometers (km²)',
            toBase: (value) => value * 1000000,
            fromBase: (value) => value / 1000000
        },
        squareFeet: {
            name: 'Square Feet (ft²)',
            toBase: (value) => value * 0.092903,
            fromBase: (value) => value / 0.092903
        },
        squareYards: {
            name: 'Square Yards (yd²)',
            toBase: (value) => value * 0.836127,
            fromBase: (value) => value / 0.836127
        },
        acres: {
            name: 'Acres',
            toBase: (value) => value * 4046.86,
            fromBase: (value) => value / 4046.86
        },
        hectares: {
            name: 'Hectares (ha)',
            toBase: (value) => value * 10000,
            fromBase: (value) => value / 10000
        }
    }
};

const UnitConverter: React.FC = () => {
    const [category, setCategory] = useState<UnitCategory>('length');
    const [fromUnit, setFromUnit] = useState<string>(Object.keys(unitCategories.length)[0]);
    const [toUnit, setToUnit] = useState<string>(Object.keys(unitCategories.length)[1]);
    const [fromValue, setFromValue] = useState<string>('');
    const [toValue, setToValue] = useState<string>('');

    const handleConversion = useCallback((value: string, from: string, to: string) => {
        if (!value || isNaN(Number(value))) {
            setToValue('');
            return;
        }

        try {
            const numValue = Number(value);
            const baseValue = unitCategories[category][from].toBase(numValue);
            const result = unitCategories[category][to].fromBase(baseValue);
            setToValue(result.toFixed(6));
        } catch (error) {
            toast.error('Error converting units. Please try again.');
            console.error('Conversion error:', error);
        }
    }, [category]);

    const handleFromValueChange = (value: string) => {
        setFromValue(value);
        handleConversion(value, fromUnit, toUnit);
    };

    const handleCategoryChange = (newCategory: UnitCategory) => {
        setCategory(newCategory);
        const units = Object.keys(unitCategories[newCategory]);
        setFromUnit(units[0]);
        setToUnit(units[1]);
        setFromValue('');
        setToValue('');
    };

    const handleSwapUnits = () => {
        setFromUnit(toUnit);
        setToUnit(fromUnit);
        setFromValue(toValue);
        setToValue(fromValue);
    };

    return (
        <ToolLayout
            title="Unit Converter"
            description="Convert between different units of measurement."
        >
            <div className="unit-converter">
                <div className="category-selector">
                    {Object.keys(unitCategories).map((cat) => (
                        <button
                            key={cat}
                            className={category === cat ? 'active' : ''}
                            onClick={() => handleCategoryChange(cat as UnitCategory)}
                        >
                            {cat.charAt(0).toUpperCase() + cat.slice(1)}
                        </button>
                    ))}
                </div>

                <div className="conversion-section">
                    <div className="unit-input">
                        <select
                            value={fromUnit}
                            onChange={(e) => {
                                setFromUnit(e.target.value);
                                handleConversion(fromValue, e.target.value, toUnit);
                            }}
                        >
                            {Object.entries(unitCategories[category]).map(([key, unit]) => (
                                <option key={key} value={key}>
                                    {unit.name}
                                </option>
                            ))}
                        </select>
                        <input
                            type="number"
                            value={fromValue}
                            onChange={(e) => handleFromValueChange(e.target.value)}
                            placeholder="Enter value..."
                        />
                    </div>

                    <button className="swap-button" onClick={handleSwapUnits}>
                        ⇄
                    </button>

                    <div className="unit-input">
                        <select
                            value={toUnit}
                            onChange={(e) => {
                                setToUnit(e.target.value);
                                handleConversion(fromValue, fromUnit, e.target.value);
                            }}
                        >
                            {Object.entries(unitCategories[category]).map(([key, unit]) => (
                                <option key={key} value={key}>
                                    {unit.name}
                                </option>
                            ))}
                        </select>
                        <input
                            type="number"
                            value={toValue}
                            readOnly
                            placeholder="Result..."
                        />
                    </div>
                </div>

                <div className="formula-display">
                    {fromValue && toValue && (
                        <p>
                            {fromValue} {unitCategories[category][fromUnit].name} = {toValue}{' '}
                            {unitCategories[category][toUnit].name}
                        </p>
                    )}
                </div>
            </div>
        </ToolLayout>
    );
};

export default UnitConverter;
