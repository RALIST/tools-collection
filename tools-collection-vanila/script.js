// Debug logging with object inspection
function log(message, obj = null) {
    if (obj) {
        console.log(`[Debug] ${message}`, obj);
    } else {
        console.log(`[Debug] ${message}`);
    }
}

// Ensure script is loaded
log('Script loaded');

// Wait for DOM to be fully loaded
window.addEventListener('DOMContentLoaded', () => {
    log('DOM Content Loaded');
    initializePage();
});

// Initialize page based on current URL
function initializePage() {
    // Get current page from URL
    const path = window.location.pathname;
    const currentPage = path.split('/').pop() || 'index.html';
    log('Current page:', currentPage);
    log('Full path:', path);

    // Initialize tools based on current page
    switch (currentPage) {
        case 'index.html':
            log('Initializing home page');
            break;

        case 'text-tools.html':
            log('Initializing text tools');
            initializeTextTools();
            break;

        case 'developer-tools.html':
        case 'developer-tools':
            log('Initializing developer tools');
            initializeDeveloperTools();
            break;

        case 'converters.html':
            log('Initializing converter tools');
            initializeConverterTools();
            break;

        case 'generators.html':
            log('Initializing generator tools');
            initializeGeneratorTools();
            break;

        default:
            log('Unknown page:', currentPage);
            break;
    }
}

// Developer Tools Initialization
function initializeDeveloperTools() {
    log('Setting up JSON Formatter');

    // Get all required elements
    const elements = {
        jsonInput: document.getElementById('jsonInput'),
        jsonResult: document.getElementById('jsonResult'),
        formatBtn: document.getElementById('formatBtn'),
        minifyBtn: document.getElementById('minifyBtn'),
        validateBtn: document.getElementById('validateBtn'),
        copyBtn: document.getElementById('copyBtn')
    };

    // Log all elements
    Object.entries(elements).forEach(([name, element]) => {
        log(`${name}:`, element);
    });

    // Check if all required elements exist
    if (!elements.jsonInput || !elements.jsonResult) {
        log('Error: Required elements not found');
        return;
    }

    // Add event listener for real-time validation
    elements.jsonInput.addEventListener('input', () => {
        log('JSON input changed');
        validateJSONInput(elements.jsonInput, elements.jsonResult);
    });

    // Add event listeners for buttons
    if (elements.formatBtn) {
        elements.formatBtn.addEventListener('click', (e) => {
            log('Format button clicked');
            e.preventDefault();
            formatJSON();
        });
    }

    if (elements.minifyBtn) {
        elements.minifyBtn.addEventListener('click', (e) => {
            log('Minify button clicked');
            e.preventDefault();
            minifyJSON();
        });
    }

    if (elements.validateBtn) {
        elements.validateBtn.addEventListener('click', (e) => {
            log('Validate button clicked');
            e.preventDefault();
            validateJSON();
        });
    }

    if (elements.copyBtn) {
        elements.copyBtn.addEventListener('click', (e) => {
            log('Copy button clicked');
            e.preventDefault();
            copyJSON();
        });
    }

    log('JSON Formatter initialization complete');
}

// JSON Formatter Functions
function validateJSONInput(input = document.getElementById('jsonInput'),
    resultDiv = document.getElementById('jsonResult')) {
    log('Validating JSON input');
    log('Input element:', input);
    log('Result element:', resultDiv);

    try {
        if (input.value.trim()) {
            JSON.parse(input.value);
            resultDiv.textContent = 'Valid JSON';
            resultDiv.className = 'json-result success';
            log('JSON validation successful');
        } else {
            resultDiv.textContent = '';
            log('Empty input');
        }
    } catch (e) {
        resultDiv.textContent = 'Invalid JSON';
        resultDiv.className = 'json-result error';
        log('JSON validation failed:', e.message);
    }
}

function formatJSON() {
    log('Formatting JSON');
    const input = document.getElementById('jsonInput');
    const resultDiv = document.getElementById('jsonResult');
    log('Input element:', input);
    log('Result element:', resultDiv);

    try {
        const json = JSON.parse(input.value);
        const formatted = JSON.stringify(json, null, 2);
        input.value = formatted;
        resultDiv.textContent = 'JSON formatted successfully!';
        resultDiv.className = 'json-result success';
        log('JSON formatted successfully');
    } catch (e) {
        resultDiv.textContent = `Invalid JSON: ${e.message}`;
        resultDiv.className = 'json-result error';
        log('JSON format error:', e.message);
    }
}

function minifyJSON() {
    log('Minifying JSON');
    const input = document.getElementById('jsonInput');
    const resultDiv = document.getElementById('jsonResult');
    log('Input element:', input);
    log('Result element:', resultDiv);

    try {
        const json = JSON.parse(input.value);
        const minified = JSON.stringify(json);
        input.value = minified;
        resultDiv.textContent = 'JSON minified successfully!';
        resultDiv.className = 'json-result success';
        log('JSON minified successfully');
    } catch (e) {
        resultDiv.textContent = `Invalid JSON: ${e.message}`;
        resultDiv.className = 'json-result error';
        log('JSON minify error:', e.message);
    }
}

function validateJSON() {
    log('Validating JSON');
    const input = document.getElementById('jsonInput');
    const resultDiv = document.getElementById('jsonResult');
    log('Input element:', input);
    log('Result element:', resultDiv);

    try {
        JSON.parse(input.value);
        resultDiv.textContent = 'Valid JSON!';
        resultDiv.className = 'json-result success';
        log('JSON validation successful');
    } catch (e) {
        resultDiv.textContent = `Invalid JSON: ${e.message}`;
        resultDiv.className = 'json-result error';
        log('JSON validation error:', e.message);
    }
}

function copyJSON() {
    log('Copying JSON');
    const jsonInput = document.getElementById('jsonInput');
    const resultDiv = document.getElementById('jsonResult');
    log('Input element:', jsonInput);
    log('Result element:', resultDiv);

    try {
        jsonInput.select();
        document.execCommand('copy');
        resultDiv.textContent = 'JSON copied to clipboard!';
        resultDiv.className = 'json-result success';
        log('JSON copied to clipboard');
    } catch (e) {
        resultDiv.textContent = 'Failed to copy JSON';
        resultDiv.className = 'json-result error';
        log('Copy error:', e.message);
    }
}

// Initialize page when script loads
initializePage();
