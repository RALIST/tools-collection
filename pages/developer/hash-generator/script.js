document.addEventListener('DOMContentLoaded', function () {
    // Initialize variables
    const textInput = document.getElementById('textInput');
    const fileInput = document.getElementById('fileInput');
    const fileDropZone = document.querySelector('.file-drop-zone');
    const fileInfo = document.querySelector('.file-info');
    const fileName = document.querySelector('.file-name');
    const removeFileBtn = document.querySelector('.remove-file-btn');
    const selectFileBtn = document.querySelector('.select-file-btn');
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    const algorithmCheckboxes = document.querySelectorAll('.algorithm-grid input[type="checkbox"]');
    const copyBtns = document.querySelectorAll('.copy-btn');
    const resultItems = document.querySelectorAll('.result-item');

    let currentFile = null;

    // Tab switching
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const tabId = this.dataset.tab;

            // Update buttons
            tabBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            // Update content
            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === tabId + '-input') {
                    content.classList.add('active');
                }
            });

            // Update hashes
            updateHashes();
        });
    });

    // Text input handler
    textInput.addEventListener('input', debounce(updateHashes, 300));

    // File input handlers
    fileInput.addEventListener('change', handleFileSelect);
    selectFileBtn.addEventListener('click', () => fileInput.click());
    removeFileBtn.addEventListener('click', clearFile);

    // Drag and drop handlers
    fileDropZone.addEventListener('dragover', function (e) {
        e.preventDefault();
        this.classList.add('drag-over');
    });

    fileDropZone.addEventListener('dragleave', function (e) {
        e.preventDefault();
        this.classList.remove('drag-over');
    });

    fileDropZone.addEventListener('drop', function (e) {
        e.preventDefault();
        this.classList.remove('drag-over');
        const file = e.dataTransfer.files[0];
        handleFile(file);
    });

    // Algorithm checkbox handlers
    algorithmCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function () {
            const algorithm = this.dataset.algorithm;
            const resultItem = document.querySelector(`.result-item[data-algorithm="${algorithm}"]`);

            if (this.checked) {
                resultItem.style.display = 'block';
                updateHashes();
            } else {
                resultItem.style.display = 'none';
            }
        });
    });

    // Copy button handlers
    copyBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const resultItem = this.closest('.result-item');
            const input = resultItem.querySelector('.hash-output');
            input.select();
            document.execCommand('copy');
            showToast('Hash copied to clipboard!');
        });
    });

    // Hash generation functions
    function updateHashes() {
        const activeTab = document.querySelector('.tab-btn.active').dataset.tab;

        if (activeTab === 'text') {
            const text = textInput.value;
            generateHashes(text);
        } else if (activeTab === 'file' && currentFile) {
            const reader = new FileReader();
            reader.onload = function (e) {
                generateHashes(e.target.result);
            };
            reader.readAsText(currentFile);
        }
    }

    function generateHashes(input) {
        algorithmCheckboxes.forEach(checkbox => {
            if (!checkbox.checked) return;

            const algorithm = checkbox.dataset.algorithm;
            const resultItem = document.querySelector(`.result-item[data-algorithm="${algorithm}"]`);
            const output = resultItem.querySelector('.hash-output');

            let hash = '';
            switch (algorithm) {
                case 'md5':
                    hash = CryptoJS.MD5(input).toString();
                    break;
                case 'sha1':
                    hash = CryptoJS.SHA1(input).toString();
                    break;
                case 'sha256':
                    hash = CryptoJS.SHA256(input).toString();
                    break;
                case 'sha512':
                    hash = CryptoJS.SHA512(input).toString();
                    break;
            }

            output.value = hash;
        });
    }

    // File handling functions
    function handleFileSelect(e) {
        const file = e.target.files[0];
        handleFile(file);
    }

    function handleFile(file) {
        if (!file) return;

        currentFile = file;
        fileName.textContent = file.name;
        fileInfo.hidden = false;
        updateHashes();
    }

    function clearFile() {
        currentFile = null;
        fileInput.value = '';
        fileName.textContent = '';
        fileInfo.hidden = true;

        algorithmCheckboxes.forEach(checkbox => {
            if (checkbox.checked) {
                const algorithm = checkbox.dataset.algorithm;
                const resultItem = document.querySelector(`.result-item[data-algorithm="${algorithm}"]`);
                const output = resultItem.querySelector('.hash-output');
                output.value = '';
            }
        });
    }

    // Helper functions
    function debounce(func, wait) {
        let timeout;
        return function () {
            const context = this;
            const args = arguments;
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(context, args), wait);
        };
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

    // Initialize with example text
    textInput.value = 'Hello, World!';
    updateHashes();
});
