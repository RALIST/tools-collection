// Lorem Ipsum Generator functionality
document.addEventListener('DOMContentLoaded', function () {
    // Debug logging
    console.log('[Debug] Initializing Lorem Ipsum Generator');

    // Get elements
    const paragraphCount = document.getElementById('paragraphCount');
    const paragraphLength = document.getElementById('paragraphLength');
    const startWithLorem = document.getElementById('startWithLorem');
    const output = document.getElementById('loremOutput');
    const wordCount = document.getElementById('loremWordCount');
    const charCount = document.getElementById('loremCharCount');
    const generateBtn = document.querySelector('.generate-btn');
    const copyBtn = document.querySelector('.copy-btn');

    // Log elements
    console.log('[Debug] Elements loaded:', {
        paragraphCount,
        paragraphLength,
        startWithLorem,
        output,
        wordCount,
        charCount,
        generateBtn,
        copyBtn
    });

    // Word bank
    const loremIpsumWords = [
        "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit", "sed", "do",
        "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore", "magna", "aliqua", "enim",
        "ad", "minim", "veniam", "quis", "nostrud", "exercitation", "ullamco", "laboris", "nisi", "ut",
        "aliquip", "ex", "ea", "commodo", "consequat", "duis", "aute", "irure", "dolor", "in",
        "reprehenderit", "in", "voluptate", "velit", "esse", "cillum", "dolore", "eu", "fugiat", "nulla",
        "pariatur", "excepteur", "sint", "occaecat", "cupidatat", "non", "proident", "sunt", "in", "culpa",
        "qui", "officia", "deserunt", "mollit", "anim", "id", "est", "laborum", "sed", "ut",
        "perspiciatis", "unde", "omnis", "iste", "natus", "error", "sit", "voluptatem", "accusantium", "doloremque",
        "laudantium", "totam", "rem", "aperiam", "eaque", "ipsa", "quae", "ab", "illo", "inventore",
        "veritatis", "et", "quasi", "architecto", "beatae", "vitae", "dicta", "sunt", "explicabo", "nemo"
    ];

    // Get random word
    function getRandomWord() {
        return loremIpsumWords[Math.floor(Math.random() * loremIpsumWords.length)];
    }

    // Capitalize first letter
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    // Generate sentence
    function generateSentence(minWords = 5, maxWords = 15) {
        console.log('[Debug] Generating sentence');
        const length = Math.floor(Math.random() * (maxWords - minWords + 1)) + minWords;
        let sentence = [];

        for (let i = 0; i < length; i++) {
            sentence.push(getRandomWord());
        }

        return capitalizeFirstLetter(sentence.join(' ')) + '.';
    }

    // Generate paragraph
    function generateParagraph(length = 'medium') {
        console.log('[Debug] Generating paragraph:', length);
        const sentenceCounts = {
            short: { min: 3, max: 5 },
            medium: { min: 5, max: 8 },
            long: { min: 8, max: 12 }
        };

        const { min, max } = sentenceCounts[length];
        const sentenceCount = Math.floor(Math.random() * (max - min + 1)) + min;
        let sentences = [];

        for (let i = 0; i < sentenceCount; i++) {
            sentences.push(generateSentence());
        }

        return sentences.join(' ');
    }

    // Generate lorem ipsum text
    function generateLoremIpsum() {
        console.log('[Debug] Generating lorem ipsum text');
        const count = parseInt(paragraphCount.value);
        const length = paragraphLength.value;
        const useLoremStart = startWithLorem.checked;

        let paragraphs = [];

        for (let i = 0; i < count; i++) {
            if (i === 0 && useLoremStart) {
                paragraphs.push("Lorem ipsum dolor sit amet, consectetur adipiscing elit. " +
                    generateParagraph(length));
            } else {
                paragraphs.push(generateParagraph(length));
            }
        }

        const text = paragraphs.join('\n\n');
        output.value = text;

        // Update statistics
        const words = text.split(/\s+/).filter(word => word.length > 0);
        wordCount.textContent = words.length;
        charCount.textContent = text.length;

        console.log('[Debug] Generated text statistics:', {
            paragraphs: paragraphs.length,
            words: words.length,
            characters: text.length
        });
    }

    // Copy generated text
    function copyText() {
        console.log('[Debug] Copying text');
        try {
            output.select();
            document.execCommand('copy');

            // Show feedback
            const originalText = copyBtn.textContent;
            copyBtn.textContent = 'Copied!';
            setTimeout(() => {
                copyBtn.textContent = originalText;
            }, 2000);

            console.log('[Debug] Text copied to clipboard');
        } catch (e) {
            console.log('[Debug] Copy error:', e.message);
        }
    }

    // Add event listeners
    generateBtn.addEventListener('click', generateLoremIpsum);
    copyBtn.addEventListener('click', copyText);

    // Generate initial text
    generateLoremIpsum();
    console.log('[Debug] Lorem Ipsum Generator initialization complete');
});
