document.addEventListener('DOMContentLoaded', function () {
    // Initialize variables
    const codeInput = document.getElementById('codeInput');
    const minifiedOutput = document.getElementById('minifiedOutput');
    const minifyBtn = document.getElementById('minifyBtn');
    const copyBtn = document.getElementById('copyBtn');
    const downloadBtn = document.getElementById('downloadBtn');
    const clearBtn = document.getElementById('clearBtn');
    const typeButtons = document.querySelectorAll('.type-btn');
    const originalSizeEl = document.getElementById('originalSize');
    const minifiedSizeEl = document.getElementById('minifiedSize');
    const savedSizeEl = document.getElementById('savedSize');

    let currentType = 'html';

    // Initialize options
    const options = {
        removeComments: true,
        removeWhitespace: true,
        shortenVariables: false,
        combineFiles: false
    };

    // Type selector functionality
    typeButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            typeButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentType = this.dataset.type;
            if (codeInput.value) {
                minifyCode();
            }
        });
    });

    // Options change handlers
    document.getElementById('removeComments').addEventListener('change', function () {
        options.removeComments = this.checked;
        if (codeInput.value) minifyCode();
    });

    document.getElementById('removeWhitespace').addEventListener('change', function () {
        options.removeWhitespace = this.checked;
        if (codeInput.value) minifyCode();
    });

    document.getElementById('shortenVariables').addEventListener('change', function () {
        options.shortenVariables = this.checked;
        if (codeInput.value && currentType === 'js') minifyCode();
    });

    document.getElementById('combineFiles').addEventListener('change', function () {
        options.combineFiles = this.checked;
    });

    // Minify button handler
    minifyBtn.addEventListener('click', minifyCode);

    // Copy button handler
    copyBtn.addEventListener('click', function () {
        minifiedOutput.select();
        document.execCommand('copy');
        showToast('Copied to clipboard!');
    });

    // Download button handler
    downloadBtn.addEventListener('click', function () {
        const blob = new Blob([minifiedOutput.value], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `minified.${getFileExtension()}`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
    });

    // Clear button handler
    clearBtn.addEventListener('click', function () {
        codeInput.value = '';
        minifiedOutput.value = '';
        updateStats(0, 0);
    });

    // Input handler for live minification
    let debounceTimer;
    codeInput.addEventListener('input', function () {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(minifyCode, 500);
    });

    // Minification function
    async function minifyCode() {
        const code = codeInput.value.trim();
        if (!code) {
            minifiedOutput.value = '';
            updateStats(0, 0);
            return;
        }

        try {
            let minified = '';
            switch (currentType) {
                case 'html':
                    minified = minifyHTML(code);
                    break;
                case 'css':
                    minified = minifyCSS(code);
                    break;
                case 'js':
                    minified = await minifyJS(code);
                    break;
            }

            minifiedOutput.value = minified;
            updateStats(code.length, minified.length);
        } catch (error) {
            showError('Error minifying code: ' + error.message);
        }
    }

    // HTML Minification
    function minifyHTML(code) {
        const minifyOptions = {
            collapseWhitespace: options.removeWhitespace,
            removeComments: options.removeComments,
            removeAttributeQuotes: true,
            removeEmptyAttributes: true,
            removeRedundantAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true,
            minifyCSS: true,
            minifyJS: true
        };

        return HTMLMinifier.minify(code, minifyOptions);
    }

    // CSS Minification
    function minifyCSS(code) {
        const cleanCSS = new CleanCSS({
            level: {
                1: {
                    all: options.removeWhitespace,
                    removeEmpty: true,
                    removeComments: options.removeComments
                },
                2: {
                    restructureRules: true,
                    mergeMedia: options.combineFiles,
                    mergeNonAdjacentRules: options.combineFiles
                }
            }
        });

        return cleanCSS.minify(code).styles;
    }

    // JavaScript Minification
    async function minifyJS(code) {
        const minifyOptions = {
            compress: {
                dead_code: true,
                drop_console: false,
                drop_debugger: true,
                keep_fnames: !options.shortenVariables,
                passes: 2
            },
            mangle: options.shortenVariables,
            output: {
                comments: !options.removeComments
            }
        };

        try {
            const result = await Terser.minify(code, minifyOptions);
            return result.code;
        } catch (error) {
            throw new Error('JavaScript syntax error: ' + error.message);
        }
    }

    // Helper functions
    function updateStats(originalSize, minifiedSize) {
        originalSizeEl.textContent = formatBytes(originalSize);
        minifiedSizeEl.textContent = formatBytes(minifiedSize);

        const savedPercentage = originalSize === 0 ? 0 :
            Math.round(((originalSize - minifiedSize) / originalSize) * 100);
        savedSizeEl.textContent = savedPercentage + '%';
    }

    function formatBytes(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

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
        minifiedOutput.value = 'Error: ' + message;
        updateStats(codeInput.value.length, 0);
    }

    // Add keyboard shortcuts
    document.addEventListener('keydown', function (e) {
        if (e.ctrlKey || e.metaKey) {
            switch (e.key.toLowerCase()) {
                case 'm':
                    e.preventDefault();
                    minifyCode();
                    break;
                case 'c':
                    if (document.activeElement === minifiedOutput) {
                        setTimeout(() => showToast('Copied to clipboard!'), 100);
                    }
                    break;
            }
        }
    });
});
