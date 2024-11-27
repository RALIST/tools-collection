// JSON Formatter functionality
document.addEventListener('DOMContentLoaded', function () {
    // Debug logging
    console.log('[Debug] Initializing JSON Formatter');

    // Get elements
    const jsonInput = document.getElementById('jsonInput');
    const jsonResult = document.getElementById('jsonResult');
    const formatBtn = document.getElementById('formatBtn');
    const minifyBtn = document.getElementById('minifyBtn');
    const validateBtn = document.getElementById('validateBtn');
    const copyBtn = document.getElementById('copyBtn');

    // Log elements
    console.log('[Debug] Elements loaded:', {
        jsonInput,
        jsonResult,
        formatBtn,
        minifyBtn,
        validateBtn,
        copyBtn
    });

    // Validate JSON input in real-time
    function validateJSONInput() {
        console.log('[Debug] Validating JSON input');
        try {
            if (jsonInput.value.trim()) {
                JSON.parse(jsonInput.value);
                jsonResult.textContent = 'Valid JSON';
                jsonResult.className = 'json-result success';
                console.log('[Debug] JSON validation successful');
            } else {
                jsonResult.textContent = '';
                console.log('[Debug] Empty input');
            }
        } catch (e) {
            jsonResult.textContent = 'Invalid JSON';
            jsonResult.className = 'json-result error';
            console.log('[Debug] JSON validation failed:', e.message);
        }
    }

    // Format JSON
    function formatJSON() {
        console.log('[Debug] Formatting JSON');
        try {
            const json = JSON.parse(jsonInput.value);
            const formatted = JSON.stringify(json, null, 2);
            jsonInput.value = formatted;
            jsonResult.textContent = 'JSON formatted successfully!';
            jsonResult.className = 'json-result success';
            console.log('[Debug] JSON formatted successfully');
        } catch (e) {
            jsonResult.textContent = `Invalid JSON: ${e.message}`;
            jsonResult.className = 'json-result error';
            console.log('[Debug] JSON format error:', e.message);
        }
    }

    // Minify JSON
    function minifyJSON() {
        console.log('[Debug] Minifying JSON');
        try {
            const json = JSON.parse(jsonInput.value);
            const minified = JSON.stringify(json);
            jsonInput.value = minified;
            jsonResult.textContent = 'JSON minified successfully!';
            jsonResult.className = 'json-result success';
            console.log('[Debug] JSON minified successfully');
        } catch (e) {
            jsonResult.textContent = `Invalid JSON: ${e.message}`;
            jsonResult.className = 'json-result error';
            console.log('[Debug] JSON minify error:', e.message);
        }
    }

    // Validate JSON
    function validateJSON() {
        console.log('[Debug] Validating JSON');
        try {
            JSON.parse(jsonInput.value);
            jsonResult.textContent = 'Valid JSON!';
            jsonResult.className = 'json-result success';
            console.log('[Debug] JSON validation successful');
        } catch (e) {
            jsonResult.textContent = `Invalid JSON: ${e.message}`;
            jsonResult.className = 'json-result error';
            console.log('[Debug] JSON validation error:', e.message);
        }
    }

    // Copy JSON
    function copyJSON() {
        console.log('[Debug] Copying JSON');
        try {
            jsonInput.select();
            document.execCommand('copy');
            jsonResult.textContent = 'JSON copied to clipboard!';
            jsonResult.className = 'json-result success';
            console.log('[Debug] JSON copied to clipboard');
        } catch (e) {
            jsonResult.textContent = 'Failed to copy JSON';
            jsonResult.className = 'json-result error';
            console.log('[Debug] Copy error:', e.message);
        }
    }

    // Add event listeners
    jsonInput.addEventListener('input', validateJSONInput);
    formatBtn.addEventListener('click', formatJSON);
    minifyBtn.addEventListener('click', minifyJSON);
    validateBtn.addEventListener('click', validateJSON);
    copyBtn.addEventListener('click', copyJSON);

    console.log('[Debug] JSON Formatter initialization complete');
});
