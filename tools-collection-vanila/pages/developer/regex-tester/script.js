document.addEventListener('DOMContentLoaded', function () {
    // Initialize variables
    const patternInput = document.getElementById('pattern');
    const flagsInput = document.getElementById('flags');
    const testString = document.getElementById('testString');
    const matchesContainer = document.getElementById('matches');
    const matchCount = document.getElementById('matchCount');
    const explanation = document.getElementById('explanation');

    // Initialize event listeners
    patternInput.addEventListener('input', updateRegex);
    flagsInput.addEventListener('input', updateRegex);
    testString.addEventListener('input', updateRegex);

    // Main regex update function
    function updateRegex() {
        const pattern = patternInput.value;
        const flags = flagsInput.value;
        const text = testString.value;

        if (!pattern) {
            clearResults();
            return;
        }

        try {
            const regex = new RegExp(pattern, flags);
            const matches = findMatches(regex, text);
            displayMatches(matches);
            explainPattern(pattern);
            clearError();
        } catch (error) {
            showError(error.message);
        }
    }

    // Find all matches including groups
    function findMatches(regex, text) {
        const matches = [];
        let match;

        if (regex.flags.includes('g')) {
            while ((match = regex.exec(text)) !== null) {
                matches.push({
                    match: match[0],
                    groups: match.slice(1),
                    index: match.index,
                    input: text
                });
            }
        } else {
            match = regex.exec(text);
            if (match) {
                matches.push({
                    match: match[0],
                    groups: match.slice(1),
                    index: match.index,
                    input: text
                });
            }
        }

        return matches;
    }

    // Display matches in the UI
    function displayMatches(matches) {
        matchCount.textContent = `(${matches.length})`;
        matchesContainer.innerHTML = '';

        if (matches.length === 0) {
            matchesContainer.innerHTML = '<div class="no-matches">No matches found</div>';
            return;
        }

        matches.forEach((match, index) => {
            const matchElement = document.createElement('div');
            matchElement.className = 'match-item';

            // Create match text with highlighting
            const beforeMatch = match.input.slice(0, match.index);
            const matchText = match.match;
            const afterMatch = match.input.slice(match.index + matchText.length);

            matchElement.innerHTML = `
                <div class="match-text">
                    ${escapeHtml(beforeMatch)}
                    <span class="match-highlight">${escapeHtml(matchText)}</span>
                    ${escapeHtml(afterMatch)}
                </div>
            `;

            // Add groups if any
            if (match.groups.length > 0) {
                const groupsElement = document.createElement('div');
                groupsElement.className = 'match-groups';
                match.groups.forEach((group, i) => {
                    if (group !== undefined) {
                        groupsElement.innerHTML += `
                            <div class="group-item">
                                <span class="group-label">Group ${i + 1}:</span>
                                <span class="group-highlight">${escapeHtml(group)}</span>
                            </div>
                        `;
                    }
                });
                matchElement.appendChild(groupsElement);
            }

            matchesContainer.appendChild(matchElement);
        });
    }

    // Explain the regex pattern
    function explainPattern(pattern) {
        if (!pattern) {
            explanation.textContent = 'Enter a regex pattern to see its explanation.';
            return;
        }

        let parts = [];
        let currentPos = 0;

        while (currentPos < pattern.length) {
            const char = pattern[currentPos];
            const explanation = getExplanation(char, pattern, currentPos);
            if (explanation) {
                parts.push(explanation);
                currentPos += explanation.length || 1;
            } else {
                currentPos++;
            }
        }

        explanation.innerHTML = parts.join('<br>');
    }

    // Get explanation for regex components
    function getExplanation(char, pattern, pos) {
        const explanations = {
            '^': 'Matches the start of the string/line',
            '$': 'Matches the end of the string/line',
            '.': 'Matches any character except newline',
            '*': 'Matches 0 or more of the preceding character',
            '+': 'Matches 1 or more of the preceding character',
            '?': 'Matches 0 or 1 of the preceding character',
            '\\d': 'Matches any digit [0-9]',
            '\\w': 'Matches any word character [A-Za-z0-9_]',
            '\\s': 'Matches any whitespace character',
            '\\b': 'Matches a word boundary',
            '[': 'Start of a character class',
            ']': 'End of a character class',
            '(': 'Start of a capturing group',
            ')': 'End of a capturing group',
            '{': 'Start of a quantifier',
            '}': 'End of a quantifier',
            '|': 'Alternation (OR)',
            '\\': 'Escape character'
        };

        // Check for character classes
        if (char === '[') {
            const endPos = pattern.indexOf(']', pos);
            if (endPos > -1) {
                const classContent = pattern.slice(pos + 1, endPos);
                return `Character class [${classContent}]: Matches any character in the set`;
            }
        }

        // Check for quantifiers
        if (char === '{') {
            const endPos = pattern.indexOf('}', pos);
            if (endPos > -1) {
                const quantifier = pattern.slice(pos + 1, endPos);
                return `Quantifier {${quantifier}}: Matches exactly ${quantifier} times`;
            }
        }

        // Check for escaped characters
        if (char === '\\' && pos + 1 < pattern.length) {
            const nextChar = pattern[pos + 1];
            const escaped = '\\' + nextChar;
            return explanations[escaped] || `Escaped character: Matches "${nextChar}" literally`;
        }

        return explanations[char];
    }

    // Helper functions
    function clearResults() {
        matchCount.textContent = '(0)';
        matchesContainer.innerHTML = '';
        explanation.textContent = 'Enter a regex pattern to see its explanation.';
    }

    function showError(message) {
        const errorElement = document.createElement('div');
        errorElement.className = 'error';
        errorElement.textContent = message;
        matchesContainer.innerHTML = '';
        matchesContainer.appendChild(errorElement);
        matchCount.textContent = '(0)';
    }

    function clearError() {
        const errorElement = matchesContainer.querySelector('.error');
        if (errorElement) {
            errorElement.remove();
        }
    }

    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Initialize with example
    patternInput.value = '\\w+';
    testString.value = 'Hello, World! 123';
    updateRegex();
});
