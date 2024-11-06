// Color Picker functionality
document.addEventListener('DOMContentLoaded', function () {
    // Debug logging
    console.log('[Debug] Initializing Color Picker');

    // Get elements
    const colorPicker = document.getElementById('colorPicker');
    const hexValue = document.getElementById('hexValue');
    const rgbValue = document.getElementById('rgbValue');
    const hslValue = document.getElementById('hslValue');
    const previewBox = document.getElementById('colorPreview');

    // Log elements
    console.log('[Debug] Elements loaded:', {
        colorPicker,
        hexValue,
        rgbValue,
        hslValue,
        previewBox
    });

    // Update all color values
    function updateColorValues(e) {
        console.log('[Debug] Updating color values');
        const color = e.target.value;

        // Update HEX value
        hexValue.value = color.toUpperCase();

        // Convert hex to RGB
        const r = parseInt(color.substr(1, 2), 16);
        const g = parseInt(color.substr(3, 2), 16);
        const b = parseInt(color.substr(5, 2), 16);
        rgbValue.value = `rgb(${r}, ${g}, ${b})`;

        // Convert RGB to HSL
        const [h, s, l] = rgbToHsl(r, g, b);
        hslValue.value = `hsl(${Math.round(h)}°, ${Math.round(s)}%, ${Math.round(l)}%)`;

        // Update preview box
        previewBox.style.backgroundColor = color;

        console.log('[Debug] Color values updated:', {
            hex: hexValue.value,
            rgb: rgbValue.value,
            hsl: hslValue.value
        });
    }

    // Convert RGB to HSL
    function rgbToHsl(r, g, b) {
        r /= 255;
        g /= 255;
        b /= 255;

        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;

        if (max === min) {
            h = s = 0;
        } else {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

            switch (max) {
                case r:
                    h = (g - b) / d + (g < b ? 6 : 0);
                    break;
                case g:
                    h = (b - r) / d + 2;
                    break;
                case b:
                    h = (r - g) / d + 4;
                    break;
            }

            h /= 6;
        }

        return [h * 360, s * 100, l * 100];
    }

    // Copy color value to clipboard
    function copyColorValue(value, button) {
        console.log('[Debug] Copying color value');
        navigator.clipboard.writeText(value).then(() => {
            const originalText = button.textContent;
            button.textContent = 'Copied!';
            setTimeout(() => {
                button.textContent = originalText;
            }, 2000);
        });
    }

    // Add event listeners
    colorPicker.addEventListener('input', updateColorValues);
    colorPicker.addEventListener('change', updateColorValues);

    document.querySelectorAll('.copy-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const input = e.target.previousElementSibling;
            copyColorValue(input.value, e.target);
        });
    });

    // Initialize with default color
    colorPicker.dispatchEvent(new Event('input'));
    console.log('[Debug] Color Picker initialization complete');
});
