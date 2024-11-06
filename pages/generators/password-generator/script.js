// Password Generator functionality
document.addEventListener('DOMContentLoaded', function () {
    // Debug logging
    console.log('[Debug] Initializing Password Generator');

    // Get elements
    const lengthSlider = document.getElementById('length');
    const lengthValue = document.getElementById('lengthValue');
    const uppercaseCheck = document.getElementById('uppercase');
    const numbersCheck = document.getElementById('numbers');
    const symbolsCheck = document.getElementById('symbols');
    const passwordResult = document.getElementById('passwordResult');
    const generateBtn = document.querySelector('.generate-btn');
    const copyBtn = document.querySelector('.copy-btn');

    // Log elements
    console.log('[Debug] Elements loaded:', {
        lengthSlider,
        lengthValue,
        uppercaseCheck,
        numbersCheck,
        symbolsCheck,
        passwordResult,
        generateBtn,
        copyBtn
    });

    // Character sets
    const chars = {
        lowercase: 'abcdefghijklmnopqrstuvwxyz',
        uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        numbers: '0123456789',
        symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?'
    };

    // Update length value display
    function updateLengthDisplay() {
        console.log('[Debug] Updating length display:', lengthSlider.value);
        lengthValue.textContent = lengthSlider.value;
    }

    // Generate password
    function generatePassword() {
        console.log('[Debug] Generating password');
        const length = parseInt(lengthSlider.value);
        const useUppercase = uppercaseCheck.checked;
        const useNumbers = numbersCheck.checked;
        const useSymbols = symbolsCheck.checked;

        let availableChars = chars.lowercase;
        if (useUppercase) availableChars += chars.uppercase;
        if (useNumbers) availableChars += chars.numbers;
        if (useSymbols) availableChars += chars.symbols;

        let password = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * availableChars.length);
            password += availableChars[randomIndex];
        }

        passwordResult.value = password;
        console.log('[Debug] Password generated:', password.replace(/./g, '*'));
    }

    // Copy password
    function copyPassword() {
        console.log('[Debug] Copying password');
        try {
            passwordResult.select();
            document.execCommand('copy');

            // Show feedback
            const originalText = copyBtn.textContent;
            copyBtn.textContent = 'Copied!';
            setTimeout(() => {
                copyBtn.textContent = originalText;
            }, 2000);

            console.log('[Debug] Password copied to clipboard');
        } catch (e) {
            console.log('[Debug] Copy error:', e.message);
        }
    }

    // Add event listeners
    lengthSlider.addEventListener('input', updateLengthDisplay);
    generateBtn.addEventListener('click', generatePassword);
    copyBtn.addEventListener('click', copyPassword);

    // Generate initial password
    generatePassword();
    console.log('[Debug] Password Generator initialization complete');
});
