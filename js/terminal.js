/* ============================================
   RafayLab — Terminal
   ============================================ */

(function () {
    'use strict';

    // Auth check
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

    const VERSION = '1.0.0';
    const LAB_NAME = 'RafayLab';

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
                'Coming soon:',
                '  run [python]      Run Python (via server)',
                '  apk [template]    Build an APK',
                '  bot [type]        Create a bot',
                ''
            ];
        },

        about: function () {
            return [
                LAB_NAME + ' — Your coding universe, one place.',
                '',
                'A browser-based coding lab built by Rafay.',
                'Tools: Terminal, Bots, Cheats, APK Builder, AI, Website.',
                '',
                'Built with HTML, CSS, JavaScript.',
                'AI powered by Google Gemini.',
                ''
            ];
        },

        version: function () {
            return ['RafayLab Terminal v' + VERSION];
        },

        date: function () {
            const d = new Date();
            return [d.toDateString()];
        },

        time: function () {
            const d = new Date();
            return [d.toLocaleTimeString()];
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
            return null;  // signal to skip prompt
        }
    };

    // ============================================
    // Run command
    // ============================================
    function runCommand(rawInput) {
        const trimmed = rawInput.trim();
        if (!trimmed) return;

        // Save to history
        history.push(trimmed);
        historyIndex = history.length;

        // Echo the command
        appendLine('prompt', trimmed);

        // Parse
        const parts = trimmed.split(/\s+/);
        const cmd = parts[0].toLowerCase();
        const args = parts.slice(1);

        if (commands[cmd]) {
            const output = commands[cmd](args);
            if (output) {
                output.forEach(function (line) {
                    appendLine('output', line);
                });
            }
        } else {
            appendLine('error', 'command not found: ' + cmd);
            appendLine('output', 'Type "help" for available commands.');
        }

        appendLine('spacer', '');
    }

    // ============================================
    // Append line to terminal
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
    // Input handlers
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

    // Click anywhere on terminal — focus input
    body.addEventListener('click', function (e) {
        if (e.target.tagName !== 'INPUT') {
            input.focus();
        }
    });

    clearBtn.addEventListener('click', function () {
        body.innerHTML = '';
        appendLine('output', 'Screen cleared.');
        appendLine('spacer', '');
        input.focus();
    });

    // Focus input on load
    input.focus();

})();
