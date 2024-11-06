// Unit Converter functionality
document.addEventListener('DOMContentLoaded', function () {
    // Debug logging
    console.log('[Debug] Initializing Unit Converter');

    // Unit types and their conversion factors
    const unitTypes = {
        length: {
            meters: 1,
            kilometers: 1000,
            centimeters: 0.01,
            miles: 1609.34,
            feet: 0.3048,
            inches: 0.0254
        },
        weight: {
            kilograms: 1,
            grams: 0.001,
            pounds: 0.453592,
            ounces: 0.0283495
        },
        temperature: {
            celsius: 'C',
            fahrenheit: 'F',
            kelvin: 'K'
        }
    };

    // Get elements
    const unitType = document.getElementById('unitType');
    const fromUnit = document.getElementById('fromUnit');
    const toUnit = document.getElementById('toUnit');
    const fromValue = document.getElementById('fromValue');
    const resultDiv = document.getElementById('result');
    const convertBtn = document.querySelector('.convert-btn');

    // Log elements
    console.log('[Debug] Elements loaded:', {
        unitType,
        fromUnit,
        toUnit,
        fromValue,
        resultDiv,
        convertBtn
    });

    // Initialize unit converter
    function initializeUnitConverter() {
        console.log('[Debug] Setting up unit options');
        unitType.addEventListener('change', () => {
            const units = Object.keys(unitTypes[unitType.value]);
            fromUnit.innerHTML = '';
            toUnit.innerHTML = '';

            units.forEach(unit => {
                fromUnit.add(new Option(unit, unit));
                toUnit.add(new Option(unit, unit));
            });
        });

        // Initialize with length units
        unitType.dispatchEvent(new Event('change'));
    }

    // Convert temperature
    function convertTemperature(value, from, to) {
        console.log('[Debug] Converting temperature');
        let celsius;

        // Convert to Celsius first
        switch (from) {
            case 'celsius':
                celsius = value;
                break;
            case 'fahrenheit':
                celsius = (value - 32) * 5 / 9;
                break;
            case 'kelvin':
                celsius = value - 273.15;
                break;
        }

        // Convert from Celsius to target unit
        switch (to) {
            case 'celsius':
                return celsius;
            case 'fahrenheit':
                return (celsius * 9 / 5) + 32;
            case 'kelvin':
                return celsius + 273.15;
        }
    }

    // Convert units
    function convert() {
        console.log('[Debug] Converting units');
        const value = parseFloat(fromValue.value);
        const from = fromUnit.value;
        const to = toUnit.value;
        const type = unitType.value;

        if (isNaN(value)) {
            resultDiv.textContent = 'Please enter a valid number';
            resultDiv.className = 'result error';
            return;
        }

        let result;
        if (type === 'temperature') {
            result = convertTemperature(value, from, to);
        } else {
            const baseValue = value * unitTypes[type][from];
            result = baseValue / unitTypes[type][to];
        }

        resultDiv.textContent = `${value} ${from} = ${result.toFixed(2)} ${to}`;
        resultDiv.className = 'result success';
        console.log('[Debug] Conversion result:', resultDiv.textContent);
    }

    // Add event listeners
    convertBtn.addEventListener('click', convert);
    fromValue.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            convert();
        }
    });

    // Initialize the converter
    initializeUnitConverter();
    console.log('[Debug] Unit Converter initialization complete');
});
