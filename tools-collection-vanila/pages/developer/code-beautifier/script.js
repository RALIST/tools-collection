document.addEventListener('DOMContentLoaded', function () {
    // Initialize variables
    const codeInput = document.getElementById('codeInput');
    const beautifiedOutput = document.getElementById('beautifiedOutput');
    const beautifyBtn = document.getElementById('beautifyBtn');
    const copyBtn = document.getElementById('copyBtn');
    const downloadBtn = document.getElementById('downloadBtn');
    const clearBtn = document.getElementById('clearBtn');
    const typeButtons = document.querySelectorAll('.type-btn');

    // Options
    const indentWithTabs = document.getElementById('indentWithTabs');
    const preserveNewlines = document.getElementById('preserveNewlines');
    const wrapLineLength = document.getElementById('wrapLineLength');
    const endWithNewline = document.getElementById('endWithNewline');
    const indentSize = document.getElementById('indentSize');

    let currentType = 'html';

    // Initialize event listeners
    typeButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            typeButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentType = this.dataset.type;
            if (codeInput.value) {
                beautifyCode();
            }
        });
    });

    // Options change handlers
    [indentWithTabs, preserveNewlines, wrapLineLength, endWithNewline, indentSize].forEach(option => {
        option.addEventListener('change', () => {
            if (codeInput.value) {
                beautifyCode();
            }
        });
    });

    // Beautify button handler
    beautifyBtn.addEventListener('click', beautifyCode);

    // Copy button handler
    copyBtn.addEventListener('click', function () {
        beautifiedOutput.select();
        document.execCommand('copy');
        showToast('Copied to clipboard!');
    });

    // Download button handler
    downloadBtn.addEventListener('click', function () {
        const blob = new Blob([beautifiedOutput.value], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `beautified.${getFileExtension()}`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
    });

    // Clear button handler
    clearBtn.addEventListener('click', function () {
        codeInput.value = '';
        beautifiedOutput.value = '';
    });

    // Input handler for live beautification
    let debounceTimer;
    codeInput.addEventListener('input', function () {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(beautifyCode, 500);
    });

    // Beautification function
    function beautifyCode() {
        const code = codeInput.value.trim();
        if (!code) {
            beautifiedOutput.value = '';
            return;
        }

        const options = {
            indent_size: parseInt(indentSize.value) || 2,
            indent_char: indentWithTabs.checked ? '\t' : ' ',
            max_preserve_newlines: preserveNewlines.checked ? 2 : 0,
            preserve_newlines: preserveNewlines.checked,
            wrap_line_length: wrapLineLength.checked ? 80 : 0,
            end_with_newline: endWithNewline.checked,
            indent_with_tabs: indentWithTabs.checked
        };

        try {
            let beautified = '';
            switch (currentType) {
                case 'html':
                    beautified = html_beautify(code, {
                        ...options,
                        unformatted: ['code', 'pre', 'em', 'strong', 'span']
                    });
                    break;
                case 'css':
                    beautified = css_beautify(code, {
                        ...options,
                        newline_between_rules: true
                    });
                    break;
                case 'js':
                    beautified = js_beautify(code, {
                        ...options,
                        space_after_anon_function: true,
                        space_after_named_function: true,
                        break_chained_methods: true
                    });
                    break;
            }

            beautifiedOutput.value = beautified;
        } catch (error) {
            showError('Error beautifying code: ' + error.message);
        }
    }

    // Helper functions
    function getFileExtension() {
        switch (currentType) {
            case 'html': return 'html';
            case 'css': return 'css';
            case 'js': return 'js';
            default: return 'txt';
        }
    }

    function showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        document.body.appendChild(toast);
        setTimeout(() => {
            toast.classList.add('show');
            setTimeout(() => {
                toast.classList.remove('show');
                setTimeout(() => document.body.removeChild(toast), 300);
            }, 2000);
        }, 100);
    }

    function showError(message) {
        beautifiedOutput.value = 'Error: ' + message;
    }

    // Initialize with example code based on type
    const examples = {
        html: `<div class="container">\n<h1>Hello World</h1>\n<p>This is an example.</p>\n</div>`,
        css: `.container {\n  padding: 20px;\n}\n\nh1 {\n  color: blue;\n}`,
        js: `function greet(name) {\nreturn "Hello, " + name + "!";\n}`
    };

    codeInput.value = examples.html;
    beautifyCode();
});
