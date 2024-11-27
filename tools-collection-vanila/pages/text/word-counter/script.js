// Word Counter functionality
document.addEventListener('DOMContentLoaded', function () {
    // Debug logging
    console.log('[Debug] Initializing Word Counter');

    // Get elements
    const countInput = document.getElementById('countInput');
    const wordCount = document.getElementById('wordCount');
    const charCount = document.getElementById('charCount');
    const charNoSpaceCount = document.getElementById('charNoSpaceCount');
    const sentenceCount = document.getElementById('sentenceCount');
    const paragraphCount = document.getElementById('paragraphCount');
    const readingTime = document.getElementById('readingTime');

    // Log elements
    console.log('[Debug] Elements loaded:', {
        countInput,
        wordCount,
        charCount,
        charNoSpaceCount,
        sentenceCount,
        paragraphCount,
        readingTime
    });

    // Update counts on input
    countInput.addEventListener('input', updateCounts);

    function updateCounts() {
        console.log('[Debug] Updating counts');
        const text = countInput.value;

        // Word count
        const words = text.trim().split(/\s+/).filter(word => word.length > 0);
        wordCount.textContent = words.length;

        // Character count
        charCount.textContent = text.length;

        // Character count (no spaces)
        const noSpaces = text.replace(/\s/g, '').length;
        charNoSpaceCount.textContent = noSpaces;

        // Sentence count
        const sentences = text.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0);
        sentenceCount.textContent = sentences.length;

        // Paragraph count
        const paragraphs = text.split('\n\n').filter(para => para.trim().length > 0);
        paragraphCount.textContent = paragraphs.length;

        // Reading time (based on average reading speed of 200 words per minute)
        const minutes = Math.ceil(words.length / 200);
        readingTime.textContent = `${minutes} min`;

        // Log counts
        console.log('[Debug] Counts updated:', {
            words: words.length,
            chars: text.length,
            noSpaces,
            sentences: sentences.length,
            paragraphs: paragraphs.length,
            readingTime: minutes
        });
    }

    console.log('[Debug] Word Counter initialization complete');
});
