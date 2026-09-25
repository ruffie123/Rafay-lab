/* RafayLab — Free Fire Cheats */
(function () {
    'use strict';

    const H = "# ==========================================\n# RafayLab Free Fire Cheat\n# Save as cheat.py — run: python3 cheat.py\n# GUEST ACCOUNT ONLY\n# ==========================================\n\n";

    const CHEATS = {};

    CHEATS.headshot = {
        code: H + '"""\nFree Fire — Headshot Sensitivity Config\n"""\n\nSETTINGS = {\n    "general": 90,\n    "red_dot": 85,\n    "2x_scope": 75,\n    "4x_scope": 60,\n    "awm_scope": 45,\n    "fire_button_size": "max",\n    "aim_assist": "on",\n    "auto_aim": "on",\n}\n\nfor k, v in SETTINGS.items():\n    print(f"  {k}: {v}")\n\nprint("\\n[STEPS]")\nprint("1. FF Settings > Sensitivity")\nprint("2. Yeh values daalo")\nprint("3. Fire button size max")\nprint("4. Training test")\nprint("5. GUEST account only")\n',
        guide: [
            'Free Fire kholo — Settings > Sensitivity',
            'Script ki values daalo',
            'HUD layout — Fire button max size',
            'Training mein test karo',
            'GUEST account only'
        ]
    };

    CHEATS.aimbot = {
        code: H + '"""\nFree Fire — Aimbot Settings\n"""\n\nprint("FF Aimbot Helper")\nprint("  1. Settings > Aim Assist ON")\nprint("  2. Sensitivity: General 90")\nprint("  3. Character: Kelly (speed)")\nprint("  4. Pet: Falco (speed)")\nprint("  5. GameGuardian memory scan (advanced)")\n',
        guide: [
            'FF Settings — aim assist ON',
            'Sensitivity values set karo',
            'Character — Kelly (speed)',
            'Pet — Falco (glide speed)',
            'GameGuardian se memory edit (advanced)',
            'GUEST account only'
        ]
    };

    CHEATS.esp = {
        code: H + '"""\nFree Fire — ESP Config\n"""\n\nCONFIG = {\n    "esp_box": True,\n    "esp_line": True,\n    "esp_name": True,\n    "esp_health": True,\n    "esp_distance": True,\n    "color_enemy": "red",\n    "color_team": "green",\n}\n\nfor k, v in CONFIG.items():\n    print(f"  {k}: {v}")\n\nprint("\\n[REQ] GameGuardian + memory scan")\n',
        guide: [
            'GameGuardian install karo',
            'FF kholo — match mein',
            'GameGuardian attach karo',
            'Player memory scan karo',
            'ESP overlay on karo',
            'GUEST account only'
        ]
    };

    CHEATS.modmenu = {
        code: H + '"""\nFree Fire — Mod Menu Info\n"""\n\nMENU = {\n    "Aimbot": "Auto-aim",\n    "ESP": "Wall vision",\n    "Speed": "Speed boost",\n    "Jump": "High jump",\n    "Antenna": "Headshot assist",\n    "No Recoil": "Recoil control",\n    "Wall Hack": "Shoot through walls",\n    "Infinite Ammo": "No reload",\n}\n\nfor k, v in MENU.items():\n    print(f"  {k}: {v}")\n\nprint("\\n[REQ] Modded APK or memory editor")\n',
        guide: [
            'Modded FF APK download karo',
            'Original FF uninstall karo',
            'Mod APK install karo',
            'Mod menu game mein open hoga',
            'Features select karo',
            'GUEST account only',
            'WARNING: High ban risk'
        ]
    };

    CHEATS.skin = {
        code: H + '"""\nFree Fire — Skin Mod Helper\n"""\n\nimport os\n\nFF = "/sdcard/Android/data/com.dts.freefireth/files"\nBACKUP = "/sdcard/RafayLab/ff_backup"\n\nos.makedirs(BACKUP, exist_ok=True)\nprint("[OK] Backup folder: " + BACKUP)\n\nprint("\\n[STEPS]")\nprint("1. Mod APK download karo")\nprint("2. MT Manager se APK kholo")\nprint("3. Skin files replace karo")\nprint("4. Recompile + sign")\nprint("5. Install — GUEST account")\n',
        guide: [
            'Mod FF APK download karo',
            'MT Manager mein APK kholo',
            'Assets > skins folder edit',
            'Recompile karo',
            'Sign karo — MT Manager se',
            'Install karo — original uninstall',
            'GUEST account only'
        ]
    };

    CHEATS.antiband = {
        code: H + '"""\nFree Fire — Anti-Ban Helper\n"""\n\nRULES = [\n    "GUEST account only",\n    "No social linking",\n    "Uninstall after session",\n    "Clear cache before reinstall",\n    "Do not join events",\n    "Avoid rank pushes",\n    "Fresh install if banned",\n    "Wait after anti-cheat updates"\n]\n\nfor r in RULES:\n    print("  - " + r)\n',
        guide: [
            'GUEST account banao',
            'Koi social link nahi',
            'Session ke baad uninstall',
            'Cache clear karo',
            'Events avoid karo',
            'Anti-cheat update ke baad 3-4 din wait'
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
