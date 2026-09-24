/* ============================================
   RafayLab — Terminal v2
   Pyodide Python runner included
   ============================================ */

(function () {
    'use strict';

    const session = window.MahiLab.requireAuth();
    if (session) {
        document.getElementById('userName').textContent = session.username;
        document.getElementById('userRole').textContent = session.role;
        document.getElementById('userAvatar').textContent = session.username.charAt(0).toUpperCase();
    }
    document.getElementById('logoutBtn').addEventListener('click', function () {
        window.MahiLab.logout();
    });

    const body = document.getElementById('terminalBody');
    const input = document.getElementById('terminalInput');
    const clearBtn = document.getElementById('clearBtn');

    let history = [];
    let historyIndex = -1;
    let pyodide = null;
    let pyodideLoading = false;

    const VERSION = '2.0.0';
    const LAB_NAME = 'RafayLab';

    // ============================================
    // Pyodide loader
    // ============================================
    async function loadPyodide() {
        if (pyodide) return pyodide;
        if (pyodideLoading) {
            while (pyodideLoading) await new Promise(r => setTimeout(r, 100));
            return pyodide;
        }
        pyodideLoading = true;
        appendLine('output', 'Loading Python runtime... (first time ~5s)');
        try {
            pyodide = await window.loadPyodide({
                indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.26.2/full/'
            });
            appendLine('output', 'Python ready. Version: ' + pyodide.runPython('import sys; sys.version.split()[0]'));
        } catch (err) {
            appendLine('error', 'Failed to load Python: ' + err.message);
            pyodide = null;
        } finally {
            pyodideLoading = false;
        }
        return pyodide;
    }

    // ============================================
    // Commands
    // ============================================
    const commands = {
        help: function () {
            return [
                'Available commands:',
                '',
                '  help              Show this help menu',
                '  about             About RafayLab',
                '  version           Show terminal version',
                '  date              Current date',
                '  time              Current time',
                '  whoami            Current user',
                '  echo [text]       Print text back',
                '  history           Show command history',
                '  clear             Clear the screen',
                '',
                'Python:',
                '  run [code]        Run Python code',
                '  py                Open Python REPL mode',
                '',
                'Examples:',
                '  run print("Hello")',
                '  run 2 + 2',
                '  run [x*2 for x in range(5)]',
                ''
            ];
        },

        about: function () {
            return [
                LAB_NAME + ' — Your coding universe, one place.',
                '',
                'A browser-based coding lab built by Rafay.',
                'Python runtime: Pyodide (WASM)',
                'AI: Google Gemini',
                ''
            ];
        },

        version: function () {
            return ['RafayLab Terminal v' + VERSION];
        },

        date: function () {
            return [new Date().toDateString()];
        },

        time: function () {
            return [new Date().toLocaleTimeString()];
        },

        whoami: function () {
            return [session ? session.username : 'guest'];
        },

        echo: function (args) {
            return [args.join(' ')];
        },

        history: function () {
            if (history.length === 0) return ['(no history)'];
            return history.map(function (cmd, i) {
                return '  ' + (i + 1) + '  ' + cmd;
            });
        },

        clear: function () {
            body.innerHTML = '';
            return null;
        },

        run: async function (args, raw) {
            const code = raw.substring(4).trim();
            if (!code) {
                return ['usage: run [python code]', 'example: run print("Hello")'];
            }
            const py = await loadPyodide();
            if (!py) return ['Python not available.'];

            appendLine('output', '>>> ' + code);
            try {
                // Capture stdout
                py.runPython(`
import sys
from io import StringIO
_buf = StringIO()
_old = sys.stdout
sys.stdout = _buf
                `);
                let result;
                try {
                    result = py.runPython(code);
                } finally {
                    py.runPython(`sys.stdout = _old`);
                }
                const captured = py.runPython(`_buf.getvalue()`);
                const output = [];
                if (captured && captured.trim()) {
                    captured.split('\n').forEach(function (l) {
                        if (l) output.push(l);
                    });
                }
                if (result !== undefined && result !== null) {
                    output.push(String(result));
                }
                if (output.length === 0) output.push('(no output)');
                return output;
            } catch (err) {
                return ['Error: ' + err.message];
            }
        }
    };

    // ============================================
    // Run
    // ============================================
    async function runCommand(rawInput) {
        const trimmed = rawInput.trim();
        if (!trimmed) return;

        history.push(trimmed);
        historyIndex = history.length;

        appendLine('prompt', trimmed);

        const parts = trimmed.split(/\s+/);
        const cmd = parts[0].toLowerCase();
        const args = parts.slice(1);

        if (commands[cmd]) {
            try {
                const output = await commands[cmd](args, trimmed);
                if (output) {
                    output.forEach(function (line) {
                        appendLine('output', line);
                    });
                }
            } catch (err) {
                appendLine('error', 'Command failed: ' + err.message);
            }
        } else {
            appendLine('error', 'command not found: ' + cmd);
            appendLine('output', 'Type "help" for available commands.');
        }
        appendLine('spacer', '');
    }

    // ============================================
    // Append line
    // ============================================
    function appendLine(type, text) {
        const div = document.createElement('div');
        div.className = 'terminal-line ' + type;

        if (type === 'prompt') {
            div.innerHTML = '<span class="term-user">rafay</span><span class="term-symbol">@</span><span class="term-host">lab</span><span class="term-symbol">:</span><span class="term-path">~</span><span class="term-symbol">$</span> ' + escapeHtml(text);
        } else if (type === 'error') {
            div.innerHTML = '<span class="term-error">' + escapeHtml(text) + '</span>';
        } else if (type === 'spacer') {
            div.innerHTML = '&nbsp;';
        } else {
            div.textContent = text;
        }
        body.appendChild(div);
        body.scrollTop = body.scrollHeight;
    }

    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // ============================================
    // Input
    // ============================================
    input.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
            const value = input.value;
            input.value = '';
            runCommand(value);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (historyIndex > 0) {
                historyIndex--;
                input.value = history[historyIndex];
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex < history.length - 1) {
                historyIndex++;
                input.value = history[historyIndex];
            } else {
                historyIndex = history.length;
                input.value = '';
            }
        }
    });

    body.addEventListener('click', function (e) {
        if (e.target.tagName !== 'INPUT') input.focus();
    });

    clearBtn.addEventListener('click', function () {
        body.innerHTML = '';
        appendLine('output', 'Screen cleared.');
        appendLine('spacer', '');
        input.focus();
    });

    input.focus();

})();
