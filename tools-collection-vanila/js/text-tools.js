// Debug logging
function log(message, obj = null) {
    if (obj) {
        console.log(`[Debug] ${message}`, obj);
    } else {
        console.log(`[Debug] ${message}`);
    }
}

// Text Tools Initialization
function initializeTextTools() {
    log('Setting up Text Tools');

    // Get all required elements
    const elements = {
        textInput: document.getElementById('textInput'),
        uppercaseBtn: document.getElementById('uppercaseBtn'),
        lowercaseBtn: document.getElementById('lowercaseBtn'),
        titlecaseBtn: document.getElementById('titlecaseBtn'),
        sentencecaseBtn: document.getElementById('sentencecaseBtn'),
        copyBtn: document.getElementById('copyBtn'),
        countInput: document.getElementById('countInput'),
        encodeInput: document.getElementById('encodeInput'),
        encodeResult: document.getElementById('encodeResult')
    };

    // Log all elements
    Object.entries(elements).forEach(([name, element]) => {
        log(`${name}:`, element);
        if (!element) {
            log(`Error: ${name} element not found`);
        }
    });

    // Add event listeners for text case converter
    if (elements.uppercaseBtn) {
        elements.uppercaseBtn.addEventListener('click', () => convertCase('upper'));
    }
    if (elements.lowercaseBtn) {
        elements.lowercaseBtn.addEventListener('click', () => convertCase('lower'));
    }
    if (elements.titlecaseBtn) {
        elements.titlecaseBtn.addEventListener('click', () => convertCase('title'));
    }
    if (elements.sentencecaseBtn) {
        elements.sentencecaseBtn.addEventListener('click', () => convertCase('sentence'));
    }
    if (elements.copyBtn) {
        elements.copyBtn.addEventListener('click', copyConvertedText);
    }

    // Add event listener for word counter
    if (elements.countInput) {
        elements.countInput.addEventListener('input', updateCounts);
    }

    // Add event listener for encoder input validation
    if (elements.encodeInput) {
        elements.encodeInput.addEventListener('input', () => {
            log('Encode input changed:', elements.encodeInput.value);
        });
    }

    log('Text Tools initialization complete');
}

// Text Case Converter Functions
function convertCase(type) {
    log(`Converting case: ${type}`);
    const input = document.getElementById('textInput');
    const text = input.value;
    let result = '';

    switch (type) {
        case 'upper':
            result = text.toUpperCase();
            break;
        case 'lower':
            result = text.toLowerCase();
            break;
        case 'title':
            result = text.toLowerCase().split(' ')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');
            break;
        case 'sentence':
            result = text.toLowerCase().replace(/(^\w|\.\s+\w)/g, letter => letter.toUpperCase());
            break;
    }

    input.value = result;
    log('Conversion result:', result);
}

function copyConvertedText() {
    log('Copying converted text');
    const textInput = document.getElementById('textInput');
    textInput.select();
    document.execCommand('copy');
    log('Text copied to clipboard');
}

// Word Counter Functions
function updateCounts() {
    log('Updating word counts');
    const text = document.getElementById('countInput').value;

    // Word count
    const words = text.trim().split(/\s+/).filter(word => word.length > 0);
    document.getElementById('wordCount').textContent = words.length;
    log('Word count:', words.length);

    // Character count
    document.getElementById('charCount').textContent = text.length;
    log('Character count:', text.length);

    // Character count (no spaces)
    const noSpaces = text.replace(/\s/g, '').length;
    document.getElementById('charNoSpaceCount').textContent = noSpaces;
    log('Character count (no spaces):', noSpaces);

    // Line count
    const lines = text.split('\n').filter(line => line.length > 0);
    document.getElementById('lineCount').textContent = lines.length;
    log('Line count:', lines.length);
}

// String Encoder/Decoder Functions
function encode(type) {
    log(`Encoding text as ${type}`);
    const input = document.getElementById('encodeInput');
    const result = document.getElementById('encodeResult');
    const text = input.value;

    try {
        let encoded = '';
        switch (type) {
            case 'base64':
                encoded = btoa(text);
                break;
            case 'url':
                encoded = encodeURIComponent(text);
                break;
            case 'html':
                encoded = text.replace(/[<>&"']/g, char => {
                    switch (char) {
                        case '<': return '<';
                        case '>': return '>';
                        case '&': return '&amp;';
                        case '"': return '"';
                        case "'": return '&#39;';
                        default: return char;
                    }
                });
                break;
        }
        result.textContent = encoded;
        result.className = 'result success';
        log('Encoded result:', encoded);
    } catch (e) {
        result.textContent = `Error: ${e.message}`;
        result.className = 'result error';
        log('Encoding error:', e.message);
    }
}

function decode(type) {
    log(`Decoding text from ${type}`);
    const input = document.getElementById('encodeInput');
    const result = document.getElementById('encodeResult');
    const text = input.value;

    try {
        let decoded = '';
        switch (type) {
            case 'base64':
                decoded = atob(text);
                break;
            case 'url':
                decoded = decodeURIComponent(text);
                break;
            case 'html':
                decoded = text.replace(/<|>|&amp;|"|&#39;/g, entity => {
                    switch (entity) {
                        case '<': return '<';
                        case '>': return '>';
                        case '&amp;': return '&';
                        case '"': return '"';
                        case '&#39;': return "'";
                        default: return entity;
                    }
                });
                break;
        }
        result.textContent = decoded;
        result.className = 'result success';
        log('Decoded result:', decoded);
    } catch (e) {
        result.textContent = `Error: ${e.message}`;
        result.className = 'result error';
        log('Decoding error:', e.message);
    }
}

function copyEncodedText() {
    log('Copying encoded/decoded text');
    const result = document.getElementById('encodeResult');
    const tempInput = document.createElement('textarea');
    tempInput.value = result.textContent;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    log('Result copied to clipboard');
}
