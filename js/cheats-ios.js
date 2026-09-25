/* RafayLab — iOS Cheats */
(function () {
    'use strict';

    const H = "# ==========================================\n# RafayLab iOS Cheat\n# Save as cheat.py — run: python3 cheat.py\n# Jailbreak required for full functionality\n# ==========================================\n\n";

    const CHEATS = {};

    CHEATS['pubg-ios'] = {
        code: H + '"""\nPUBG iOS — Mod Overview\nRequires jailbreak\n"""\n\nprint("PUBG iOS Modding")\nprint("=" * 40)\nprint("[REQUIREMENTS]")\nprint("  - Jailbroken iPhone (checkra1n/unc0ver)")\nprint("  - Cydia/Sileo installed")\nprint("  - Filza file manager")\nprint("  - AppSync Unified tweak")\nprint("")\nprint("[STEPS]")\nprint("  1. Jailbreak iPhone")\nprint("  2. Install Filza from Cydia")\nprint("  3. Download mod .pak files")\nprint("  4. Filza se PUBG files replace")\nprint("  5. Respring device")\nprint("  6. GUEST account only")\n',
        guide: [
            'iPhone jailbreak karo — iOS 15 tak (checkra1n/unc0ver)',
            'Cydia/Sileo se Filza install karo',
            'PUBG iOS install karo — App Store se',
            'Filza kholo — PUBG data folder edit',
            'Mod files paste karo',
            'Respring device',
            'GUEST account only',
            'WARNING: Jailbreak voids warranty'
        ]
    };

    CHEATS['ff-ios'] = {
        code: H + '"""\nFree Fire iOS — Mod Overview\n"""\n\nprint("Free Fire iOS Modding")\nprint("=" * 40)\nprint("Requires jailbreak + Filza")\nprint("")\nprint("[STEPS]")\nprint("  1. Jailbroken iOS")\nprint("  2. Filza install")\nprint("  3. FF data folder edit")\nprint("  4. Mod files paste")\nprint("  5. Respring")\nprint("  6. GUEST account")\n',
        guide: [
            'iPhone jailbreak karo',
            'Filza install karo',
            'Free Fire install karo',
            'Data folder edit karo',
            'Mod files paste karo',
            'Respring',
            'GUEST account only'
        ]
    };

    CHEATS.jailbreak = {
        code: H + '"""\niOS Jailbreak Tools\n"""\n\nTOOLS = {\n    "checkra1n": "A5-A11 devices",\n    "unc0ver": "iOS 11-14",\n    "Taurine": "iOS 14",\n    "Dopamine": "iOS 15-16",\n    "palera1n": "iOS 15-17 (checkm8)",\n}\n\nfor k, v in TOOLS.items():\n    print(f"  {k}: {v}")\n\nprint("\\n[STEPS]")\nprint("1. iOS version check karo")\nprint("2. Compatible tool select karo")\nprint("3. Jailbreak run karo")\nprint("4. Cydia/Sileo open karo")\n',
        guide: [
            'iOS version check karo — Settings > General > About',
            'Compatible jailbreak tool install karo',
            'Jailbreak run karo',
            'Cydia/Sileo kholo',
            'Filza install karo',
            'WARNING: Backup first — brick risk'
        ]
    };

    CHEATS.filza = {
        code: H + '"""\nFilza — iOS File Manager\n"""\n\nprint("Filza File Manager")\nprint("=" * 40)\nprint("[FEATURES]")\nprint("  - Browse iOS filesystem")\nprint("  - Edit .plist, .json, .xml")\nprint("  - HEX editor")\nprint("  - Text editor")\nprint("  - File permissions")\nprint("  - Copy/Move/Delete")\nprint("  - Zip/Unzip")\nprint("")\nprint("[INSTALL]")\nprint("  Cydia/Sileo > Search: Filza > Install")\n',
        guide: [
            'Cydia ya Sileo kholo',
            'Search: Filza',
            'Install karo',
            'Filza kholo — filesystem dikhega',
            'iOS apps ka data folder: /var/mobile/Containers/',
            'GUEST account only'
        ]
    };

    CHEATS.tweaks = {
        code: H + '"""\niOS Essential Tweaks for Modding\n"""\n\nTWEAKS = {\n    "AppSync Unified": "Install unsigned apps",\n    "Filza": "File manager",\n    "NewTerm": "Terminal for iOS",\n    "Cydia": "Package manager",\n    "Sileo": "Modern package manager",\n    "Choicy": "Tweak disable per app",\n    "Liberty Lite": "Jailbreak bypass",\n    "AppStore++": "Downgrade apps",\n}\n\nfor k, v in TWEAKS.items():\n    print(f"  {k}: {v}")\n',
        guide: [
            'Cydia/Sileo kholo',
            'Search: AppSync Unified — install',
            'Filza install karo',
            'NewTerm install karo (terminal)',
            'Choicy install karo (tweak control)',
            'Liberty Lite — jailbreak bypass',
            'AppStore++ — app downgrade'
        ]
    };

    CHEATS.bypass = {
        code: H + '"""\niOS Jailbreak Bypass\nHide jailbreak from detection\n"""\n\nprint("Jailbreak Bypass Tools")\nprint("=" * 40)\nprint("  - Liberty Lite (bypass JB detection)")\nprint("  - Shadow (tweak hider)")\nprint("  - Choicy (per-app disable)")\nprint("  - KernBypass (kernel-level bypass)")\nprint("  - FlyJB X (advanced bypass)")\nprint("")\nprint("[STEPS]")\nprint("1. Bypass tool install karo")\nprint("2. Target app select karo")\nprint("3. Bypass enable karo")\nprint("4. App restart karo")\n',
        guide: [
            'Cydia/Sileo se Liberty Lite install karo',
            'Target app (PUBG/FF) select karo',
            'Bypass enable karo',
            'App restart karo',
            'Anti-cheat detection avoid hoga',
            'STILL use GUEST account only'
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
