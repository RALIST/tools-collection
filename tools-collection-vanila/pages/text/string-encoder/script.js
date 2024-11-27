// String Encoder/Decoder functionality
document.addEventListener('DOMContentLoaded', function () {
    // Debug logging
    console.log('[Debug] Initializing String Encoder/Decoder');

    // Get elements
    const encodeInput = document.getElementById('encodeInput');
    const encodeResult = document.getElementById('encodeResult');

    // Log elements
    console.log('[Debug] Elements loaded:', {
        encodeInput,
        encodeResult
    });

    // Make functions available globally
    window.encode = function (type) {
        console.log(`[Debug] Encoding text as ${type}`);
        const text = encodeInput.value;

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
            encodeResult.textContent = encoded;
            encodeResult.className = 'result success';
            console.log('[Debug] Encoded result:', encoded);
        } catch (e) {
            encodeResult.textContent = `Error: ${e.message}`;
            encodeResult.className = 'result error';
            console.log('[Debug] Encoding error:', e.message);
        }
    };

    window.decode = function (type) {
        console.log(`[Debug] Decoding text from ${type}`);
        const text = encodeInput.value;

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
            encodeResult.textContent = decoded;
            encodeResult.className = 'result success';
            console.log('[Debug] Decoded result:', decoded);
        } catch (e) {
            encodeResult.textContent = `Error: ${e.message}`;
            encodeResult.className = 'result error';
            console.log('[Debug] Decoding error:', e.message);
        }
    };

    window.copyEncodedText = function () {
        console.log('[Debug] Copying result');
        const tempInput = document.createElement('textarea');
        tempInput.value = encodeResult.textContent;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);

        // Show feedback
        const copyBtn = document.querySelector('.copy-btn');
        const originalText = copyBtn.textContent;
        copyBtn.textContent = 'Copied!';
        setTimeout(() => {
            copyBtn.textContent = originalText;
        }, 2000);

        console.log('[Debug] Result copied to clipboard');
    };

    console.log('[Debug] String Encoder/Decoder initialization complete');
});
