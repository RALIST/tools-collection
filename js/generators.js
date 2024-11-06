// Generator Tools Initialization
function initializeGeneratorTools() {
    log('Setting up Generator Tools');

    // Password Generator
    const lengthSlider = document.getElementById('length');
    if (lengthSlider) {
        lengthSlider.addEventListener('input', (e) => {
            document.getElementById('lengthValue').textContent = e.target.value;
        });
        generatePassword(); // Generate initial password
    }

    // Lorem Ipsum Generator
    const loremOutput = document.getElementById('loremOutput');
    if (loremOutput) {
        generateLoremIpsum(); // Generate initial lorem ipsum text
    }
}

// Password Generator Functions
function generatePassword() {
    const length = document.getElementById('length').value;
    const useUppercase = document.getElementById('uppercase').checked;
    const useNumbers = document.getElementById('numbers').checked;
    const useSymbols = document.getElementById('symbols').checked;

    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';

    let chars = lowercase;
    if (useUppercase) chars += uppercase;
    if (useNumbers) chars += numbers;
    if (useSymbols) chars += symbols;

    let password = '';
    for (let i = 0; i < length; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    document.getElementById('passwordResult').value = password;
}

function copyPassword() {
    const passwordResult = document.getElementById('passwordResult');
    passwordResult.select();
    document.execCommand('copy');
}

// Lorem Ipsum Generator Functions
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

function getRandomWord() {
    return loremIpsumWords[Math.floor(Math.random() * loremIpsumWords.length)];
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function generateSentence(minWords = 5, maxWords = 15) {
    const length = Math.floor(Math.random() * (maxWords - minWords + 1)) + minWords;
    let sentence = [];

    for (let i = 0; i < length; i++) {
        sentence.push(getRandomWord());
    }

    return capitalizeFirstLetter(sentence.join(' ')) + '.';
}

function generateParagraph(length = 'medium') {
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

function generateLoremIpsum() {
    const paragraphCount = parseInt(document.getElementById('paragraphCount').value);
    const paragraphLength = document.getElementById('paragraphLength').value;
    const startWithLorem = document.getElementById('startWithLorem').checked;
    const output = document.getElementById('loremOutput');

    let paragraphs = [];

    for (let i = 0; i < paragraphCount; i++) {
        if (i === 0 && startWithLorem) {
            paragraphs.push("Lorem ipsum dolor sit amet, consectetur adipiscing elit. " + generateParagraph(paragraphLength));
        } else {
            paragraphs.push(generateParagraph(paragraphLength));
        }
    }

    const text = paragraphs.join('\n\n');
    output.value = text;

    // Update statistics
    const words = text.split(/\s+/).filter(word => word.length > 0);
    document.getElementById('loremWordCount').textContent = words.length;
    document.getElementById('loremCharCount').textContent = text.length;
}

function copyLoremIpsum() {
    const output = document.getElementById('loremOutput');
    output.select();
    document.execCommand('copy');

    // Show temporary success message
    const copyBtn = document.querySelector('.copy-btn');
    const originalText = copyBtn.textContent;
    copyBtn.textContent = 'Copied!';
    setTimeout(() => {
        copyBtn.textContent = originalText;
    }, 1500);
}
