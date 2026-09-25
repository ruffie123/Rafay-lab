/* RafayLab — General Tools */
(function () {
    'use strict';

    const H = "# ==========================================\n# RafayLab General Tool\n# Save as tool.py — run: python3 tool.py\n# ==========================================\n\n";

    const CHEATS = {};

    CHEATS.guardian = {
        code: H + '"""\nGameGuardian Setup Guide\n"""\n\nprint("GameGuardian Setup")\nprint("=" * 40)\nprint("[REQUIREMENTS]")\nprint("  - Android 5.0+")\nprint("  - Root OR Virtual Space")\nprint("")\nprint("[STEPS]")\nprint("  1. Download GameGuardian APK")\nprint("  2. Install (root = direct, non-root = virtual space)")\nprint("  3. Grant root permission")\nprint("  4. Open target game")\nprint("  5. Open GameGuardian — select game process")\nprint("  6. Search value — modify")\nprint("")\nprint("[SAFETY]")\nprint("  - GUEST account only")\nprint("  - Backup game data first")\n',
        guide: [
            'GameGuardian APK download karo — official site',
            'Install karo',
            'Root hai toh direct grant karo',
            'Nahi root — Parallel Space install karo',
            'GG + Game dono virtual space mein add karo',
            'GG kholo — process select — value search',
            'Value modify — freeze if needed',
            'WARNING: Rooted phone more power, warranty void'
        ]
    };

    CHEATS.cheatengine = {
        code: H + '"""\nCheat Engine Setup (PC)\n"""\n\nprint("Cheat Engine Setup")\nprint("=" * 40)\nprint("[PC ONLY]")\nprint("  1. Download cheatengine.org")\nprint("  2. Install")\nprint("  3. Open target PC game")\nprint("  4. Open CE — attach to process")\nprint("  5. Search value")\nprint("  6. Modify — freeze")\nprint("")\nprint("[MOBILE]")\nprint("  Use GameGuardian instead")\n',
        guide: [
            'PC pe cheatengine.org se download karo',
            'Install karo',
            'Game kholo',
            'Cheat Engine kholo',
            'Process select karo',
            'Value scan — modify',
            'Freeze',
            'NOTE: PC only — mobile pe GameGuardian'
        ]
    };

    CHEATS.frida = {
        code: H + '"""\nFrida Setup Guide\nDynamic instrumentation toolkit\n"""\n\nprint("Frida Setup")\nprint("=" * 40)\nprint("[INSTALL]")\nprint("  pip install frida-tools")\nprint("  frida --version")\nprint("")\nprint("[MOBILE]")\nprint("  - frida-server on device (root)")\nprint("  - Connect via USB/WiFi")\nprint("  - frida-ps -U (list processes)")\nprint("  - Attach + inject scripts")\nprint("")\nprint("[USE CASES]")\nprint("  - Bypass SSL pinning")\nprint("  - Hook functions")\nprint("  - Memory inspection")\nprint("  - Reverse engineering")\n',
        guide: [
            'PC pe `pip install frida-tools`',
            'Phone root karo',
            'frida-server download karo — GitHub releases',
            'Phone pe push karo — chmod +x',
            'frida-server run karo',
            'PC se connect — `frida-ps -U`',
            'Script inject karo',
            'ADVANCED: Reversing + hooking skills zaroori'
        ]
    };

    CHEATS.apktool = {
        code: H + '"""\nAPKTool Setup Guide (Termux/PC)\n"""\n\nprint("APKTool Setup")\nprint("=" * 40)\nprint("[TERMUX]")\nprint("  pkg install openjdk-17")\nprint("  wget https://github.com/iBotPeaches/Apktool/releases/download/v2.9.3/apktool_2.9.3.jar")\nprint("  java -jar apktool_2.9.3.jar")\nprint("")\nprint("[DECOMPILE]")\nprint("  apktool d target.apk -o output")\nprint("")\nprint("[RECOMPILE]")\nprint("  apktool b output -o modded.apk")\nprint("")\nprint("[SIGN]")\nprint("  Use apksigner or jarsigner")\n',
        guide: [
            'Termux kholo',
            '`pkg install openjdk-17`',
            'APKTool jar download karo',
            '`java -jar apktool.jar d target.apk -o output`',
            'Files edit karo — output folder mein',
            '`java -jar apktool.jar b output -o modded.apk`',
            'APK sign karo',
            'Install karo — GUEST account'
        ]
    };

    CHEATS.mt = {
        code: H + '"""\nMT Manager — Mobile APK Editor\n"""\n\nprint("MT Manager Setup")\nprint("=" * 40)\nprint("[FEATURES]")\nprint("  - APK decompile/recompile")\nprint("  - Smali editor")\nprint("  - XML editor")\nprint("  - APK signing")\nprint("  - File manager with root")\nprint("  - HEX editor")\nprint("  - Text editor")\nprint("")\nprint("[DOWNLOAD]")\nprint("  Search: MT Manager APK")\nprint("  Official: mt2.cn")\n',
        guide: [
            'MT Manager APK download karo',
            'Install karo',
            'APK kholo — View',
            'Dex/Assets/Resources edit karo',
            'Recompile',
            'Sign karo',
            'Install karo'
        ]
    };

    CHEATS.lucky = {
        code: H + '"""\nLucky Patcher — App Patcher\n"""\n\nprint("Lucky Patcher")\nprint("=" * 40)\nprint("[FEATURES]")\nprint("  - Remove ads")\nprint("  - Bypass license verification")\nprint("  - In-app purchase emulation")\nprint("  - Patch APKs")\nprint("  - Backup apps")\nprint("")\nprint("[USE]")\nprint("  1. Install Lucky Patcher")\nprint("  2. Select app")\nprint("  3. Menu of patches")\nprint("  4. Apply patch")\nprint("  5. Restart app")\n',
        guide: [
            'Lucky Patcher download karo',
            'Install karo',
            'App list kholo',
            'App select karo — long-press',
            '"Menu of patches"',
            'Patch select karo',
            'Apply — app restart',
            'NOTE: Play Store apps mein limited'
        ]
    };

    const cards = document.querySelectorAll('.cheat-card');
    const outputSection = document.getElementById('outputSection');
    const outputTitle = document.getElementById('outputTitle');
    const codeOutput = document.getElementById('codeOutput');
    const guideBox = document.getElementById('guideBox');

    cards.forEach(function (card) {
        card.addEventListener('click', function () {
            cards.forEach(function (c) { c.classList.remove('active'); });
            card.classList.add('active');
            const key = card.getAttribute('data-cheat');
            const data = CHEATS[key];
            if (!data) return;
            outputTitle.textContent = card.querySelector('h3').textContent;
            codeOutput.textContent = data.code;
            guideBox.innerHTML = data.guide.map(function (line, i) {
                return '<div class="guide-line"><span class="guide-num">' + (i+1) + '</span><span>' + line + '</span></div>';
            }).join('');
            outputSection.style.display = 'block';
            outputSection.scrollIntoView({ behavior: 'smooth' });
        });
    });

    const copyBtn = document.getElementById('copyBtn');
    if (copyBtn) {
        copyBtn.addEventListener('click', function () {
            navigator.clipboard.writeText(codeOutput.textContent).then(function () {
                copyBtn.querySelector('span').textContent = 'Copied!';
                setTimeout(function () { copyBtn.querySelector('span').textContent = 'Copy Code'; }, 2000);
            });
        });
    }
})();
