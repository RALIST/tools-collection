// Converter Tools Initialization
function initializeConverterTools() {
    log('Setting up Converter Tools');

    // Unit Converter
    const unitType = document.getElementById('unitType');
    if (unitType) {
        initializeUnitConverter();
    }

    // Color Picker
    const colorPicker = document.getElementById('colorPicker');
    if (colorPicker) {
        initializeColorPicker();
    }
}

// Unit Converter Functions
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

function initializeUnitConverter() {
    log('Initializing Unit Converter');
    const unitType = document.getElementById('unitType');
    const fromUnit = document.getElementById('fromUnit');
    const toUnit = document.getElementById('toUnit');

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

function convert() {
    log('Converting units');
    const unitType = document.getElementById('unitType').value;
    const fromValue = parseFloat(document.getElementById('fromValue').value);
    const fromUnit = document.getElementById('fromUnit').value;
    const toUnit = document.getElementById('toUnit').value;
    const resultDiv = document.getElementById('result');

    if (isNaN(fromValue)) {
        resultDiv.textContent = 'Please enter a valid number';
        return;
    }

    let result;
    if (unitType === 'temperature') {
        result = convertTemperature(fromValue, fromUnit, toUnit);
    } else {
        const baseValue = fromValue * unitTypes[unitType][fromUnit];
        result = baseValue / unitTypes[unitType][toUnit];
    }

    resultDiv.textContent = `${fromValue} ${fromUnit} = ${result.toFixed(2)} ${toUnit}`;
}

function convertTemperature(value, from, to) {
    log('Converting temperature');
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

// Color Picker Functions
function initializeColorPicker() {
    log('Initializing Color Picker');
    const colorPicker = document.getElementById('colorPicker');
    const hexValue = document.getElementById('hexValue');
    const rgbValue = document.getElementById('rgbValue');

    colorPicker.addEventListener('input', updateColorValues);
    colorPicker.addEventListener('change', updateColorValues);

    function updateColorValues(e) {
        const color = e.target.value;
        hexValue.value = color.toUpperCase();

        // Convert hex to RGB
        const r = parseInt(color.substr(1, 2), 16);
        const g = parseInt(color.substr(3, 2), 16);
        const b = parseInt(color.substr(5, 2), 16);
        rgbValue.value = `rgb(${r}, ${g}, ${b})`;
    }

    // Initialize with default color
    colorPicker.dispatchEvent(new Event('input'));
}
