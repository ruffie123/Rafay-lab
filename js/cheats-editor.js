/* RafayLab — File Editor */
(function () {
    'use strict';

    const fileInput = document.getElementById('fileInput');
    const fileName = document.getElementById('fileName');
    const fileAuthor = document.getElementById('fileAuthor');
    const fileDesc = document.getElementById('fileDesc');
    const fileVersion = document.getElementById('fileVersion');
    const fileContent = document.getElementById('fileContent');
    const downloadBtn = document.getElementById('downloadFileBtn');
    const copyBtn = document.getElementById('copyFileBtn');
    const clearBtn = document.getElementById('clearBtn');
    const metadataOutput = document.getElementById('metadataOutput');
    const metadataCode = document.getElementById('metadataCode');
    const copyMetaBtn = document.getElementById('copyMetaBtn');

    // File upload handler
    if (fileInput) {
        fileInput.addEventListener('change', function (e) {
            const file = e.target.files[0];
            if (!file) return;

            if (!fileName.value) fileName.value = file.name;

            const reader = new FileReader();
            reader.onload = function (evt) {
                fileContent.value = evt.target.result;
                updateMetadata();
            };
            reader.onerror = function () {
                fileContent.value = '[Error reading file: ' + file.name + ']';
            };
            reader.readAsText(file);
        });
    }

    // Metadata generator
    function updateMetadata() {
        const author = fileAuthor.value.trim() || 'Rafay';
        const name = fileName.value.trim() || 'file';
        const desc = fileDesc.value.trim() || 'Custom mod';
        const ver = fileVersion.value.trim() || '1.0.0';
        const date = new Date().toISOString();

        const meta = [
            '# ==========================================',
            '# RafayLab Metadata',
            '# ==========================================',
            '# File: ' + name,
            '# Author: ' + author,
            '# Description: ' + desc,
            '# Version: ' + ver,
            '# Modified: ' + date,
            '# ==========================================',
            '',
            'metadata = {',
            '    "file": "' + name + '",',
            '    "author": "' + author + '",',
            '    "description": "' + desc + '",',
            '    "version": "' + ver + '",',
            '    "modified": "' + date + '",',
            '}',
            '',
            'print("Metadata:")',
            'for k, v in metadata.items():',
            '    print(f"  {k}: {v}")',
            ''
        ].join('\n');

        metadataCode.textContent = meta;
        metadataOutput.style.display = 'block';
    }

    [fileAuthor, fileName, fileDesc, fileVersion].forEach(function (el) {
        if (el) el.addEventListener('input', updateMetadata);
    });

    // Download file
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function () {
            const content = fileContent.value;
            const name = fileName.value || 'rafay_file.txt';
            const blob = new Blob([content], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = name;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        });
    }

    // Copy content
    if (copyBtn) {
        copyBtn.addEventListener('click', function () {
            navigator.clipboard.writeText(fileContent.value).then(function () {
                copyBtn.querySelector('span').textContent = 'Copied!';
                setTimeout(function () {
                    copyBtn.querySelector('span').textContent = 'Copy Content';
                }, 2000);
            });
        });
    }

    // Copy metadata
    if (copyMetaBtn) {
        copyMetaBtn.addEventListener('click', function () {
            navigator.clipboard.writeText(metadataCode.textContent).then(function () {
                copyMetaBtn.querySelector('span').textContent = 'Copied!';
                setTimeout(function () {
                    copyMetaBtn.querySelector('span').textContent = 'Copy Metadata';
                }, 2000);
            });
        });
    }

    // Clear
    if (clearBtn) {
        clearBtn.addEventListener('click', function () {
            fileInput.value = '';
            fileName.value = '';
            fileContent.value = '';
            fileAuthor.value = 'Rafay';
            fileDesc.value = '';
            fileVersion.value = '1.0.0';
            metadataOutput.style.display = 'none';
        });
    }

    // Initial metadata
    updateMetadata();
})();
