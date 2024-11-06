// Text Case Converter functionality
document.addEventListener('DOMContentLoaded', function () {
    // Debug logging
    console.log('[Debug] Initializing Text Case Converter');

    // Get elements
    const textInput = document.getElementById('textInput');
    const uppercaseBtn = document.getElementById('uppercaseBtn');
    const lowercaseBtn = document.getElementById('lowercaseBtn');
    const titlecaseBtn = document.getElementById('titlecaseBtn');
    const sentencecaseBtn = document.getElementById('sentencecaseBtn');
    const copyBtn = document.getElementById('copyBtn');

    // Log elements
    console.log('[Debug] Elements loaded:', {
        textInput,
        uppercaseBtn,
        lowercaseBtn,
        titlecaseBtn,
        sentencecaseBtn,
        copyBtn
    });

    // Convert to uppercase
    uppercaseBtn.addEventListener('click', () => {
        console.log('[Debug] Converting to uppercase');
        textInput.value = textInput.value.toUpperCase();
    });

    // Convert to lowercase
    lowercaseBtn.addEventListener('click', () => {
        console.log('[Debug] Converting to lowercase');
        textInput.value = textInput.value.toLowerCase();
    });

    // Convert to title case
    titlecaseBtn.addEventListener('click', () => {
        console.log('[Debug] Converting to title case');
        textInput.value = textInput.value.toLowerCase()
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    });

    // Convert to sentence case
    sentencecaseBtn.addEventListener('click', () => {
        console.log('[Debug] Converting to sentence case');
        textInput.value = textInput.value.toLowerCase()
            .replace(/(^\w|\.\s+\w)/g, letter => letter.toUpperCase());
    });

    // Copy text
    copyBtn.addEventListener('click', () => {
        console.log('[Debug] Copying text');
        textInput.select();
        document.execCommand('copy');

        // Show feedback
        const originalText = copyBtn.textContent;
        copyBtn.textContent = 'Copied!';
        setTimeout(() => {
            copyBtn.textContent = originalText;
        }, 2000);
    });

    console.log('[Debug] Text Case Converter initialization complete');
});
