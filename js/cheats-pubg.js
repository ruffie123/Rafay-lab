/* RafayLab — PUBG Mobile Cheats */
(function () {
    'use strict';

    const H = "# ==========================================\n# RafayLab PUBG Cheat\n# Save as cheat.py — run: python3 cheat.py\n# GUEST ACCOUNT ONLY\n# ==========================================\n\n";

    const CHEATS = {};

    CHEATS.skin = {
        code: H + '"""\nPUBG Skin Mod Generator\n"""\n\nimport os\nimport shutil\n\nPKG = "com.tencent.ig"\nPATH = "/sdcard/Android/data/" + PKG + "/files"\nPAKS = PATH + "/UE4Game/ShadowTrackerExtra/Saved/Paks"\nBACKUP = "/sdcard/RafayLab/pubg_skin_backup"\n\n\ndef check():\n    if not os.path.exists(PATH):\n        print("[X] PUBG not found")\n        return False\n    print("[OK] PUBG found")\n    return True\n\n\ndef backup():\n    os.makedirs(BACKUP, exist_ok=True)\n    if os.path.exists(PAKS):\n        for f in os.listdir(PAKS):\n            if f.endswith(".pak"):\n                shutil.copy(PAKS + "/" + f, BACKUP + "/" + f)\n                print("[OK] " + f)\n\n\ndef main():\n    print("PUBG Skin Mod")\n    if not check():\n        return\n    backup()\n    print("\\n[STEPS]")\n    print("1. Mod .pak files download karo")\n    print("2. Paste in: " + PAKS)\n    print("3. Restart PUBG")\n    print("4. GUEST account only")\n\n\nif __name__ == "__main__":\n    main()\n',
        guide: [
            'PUBG kholo — ek dafa — folder ban jaye',
            'Termux kholo — `python3 cheat.py` chalao',
            'Backup folder ban jayega — /sdcard/RafayLab/',
            'Mod .pak files download karo — trusted source se',
            'Paks folder mein paste karo',
            'PUBG restart karo — GUEST account only'
        ]
    };

    CHEATS.esp = {
        code: H + '"""\nPUBG ESP Config\n"""\n\nCONFIG = {\n    "esp_box": True,\n    "esp_line": True,\n    "esp_name": True,\n    "esp_health": True,\n    "esp_distance": True,\n    "color_enemy": "red",\n    "color_team": "green",\n}\n\nfor k, v in CONFIG.items():\n    print(f"  {k}: {v}")\n\nprint("\\n[NOTE] GameGuardian + memory scan needed")\n',
        guide: [
            'GameGuardian install karo (root ya virtual space)',
            'PUBG kholo — match mein jao',
            'GameGuardian attach karo — PUBG process',
            'Player coordinates search karo',
            'ESP overlay on karo',
            'GUEST account only'
        ]
    };

    CHEATS.aimbot = {
        code: H + '"""\nPUBG Aimbot Sensitivity\n"""\n\nS = {\n    "camera_free": 100,\n    "camera_3rd": 95,\n    "camera_1st": 90,\n    "red_dot": 85,\n    "2x_scope": 75,\n    "4x_scope": 60,\n    "sniper": 50,\n    "gyro": 300,\n}\n\nfor k, v in S.items():\n    print(f"  {k}: {v}")\n',
        guide: [
            'PUBG Settings > Sensitivity',
            'Values daalo (script mein hain)',
            'Gyro on karo — 300',
            'Training ground test karo',
            'GUEST account only'
        ]
    };

    CHEATS.magic = {
        code: H + '"""\nMagic Bullet — Info\n"""\n\nprint("Magic Bullet Overview")\nprint("  1. Memory editing technique")\nprint("  2. Bullet trajectory modify")\nprint("  3. Bypass bullet physics")\nprint("\\n[REQ] Root + GameGuardian + Advanced skills")\nprint("[WARN] High ban risk"\n',
        guide: [
            'Root/Virtual Space install karo',
            'GameGuardian install karo',
            'PUBG match mein jao',
            'Bullet memory address scan karo',
            'Trajectory modify — freeze',
            'GUEST account only'
        ]
    };

    CHEATS.antiband = {
        code: H + '"""\nAnti-Ban Helper\n"""\n\nTIPS = [\n    "GUEST account only",\n    "No social linking",\n    "Uninstall after session",\n    "Clear cache between sessions",\n    "Use VPN",\n    "No trades on mod account",\n    "Avoid rank push",\n    "Fresh install if banned",\n    "No mods during events",\n    "Wait after anti-cheat update"\n]\n\nfor t in TIPS:\n    print("  - " + t)\n',
        guide: [
            'GUEST account banao',
            'Koi social link nahi',
            'Session ke baad uninstall',
            'Cache clear karo',
            'VPN on karo',
            'Anti-cheat update ke baad 2-3 din wait'
        ]
    };

    CHEATS.bypass = {
        code: H + '"""\nFile Bypass Helper\n"""\n\nimport os\n\nPAKS = "/sdcard/Android/data/com.tencent.ig/files/UE4Game/ShadowTrackerExtra/Saved/Paks"\n\nprint("File Bypass Techniques")\nprint("  1. Rename .pak with random names")\nprint("  2. Change file headers")\nprint("  3. Use custom subfolder")\nprint("  4. Clear logs")\nprint("  5. Re-sign APK with MT Manager")\n\nif os.path.exists(PAKS):\n    print("\\n[OK] Paks folder: " + PAKS)\n',
        guide: [
            'Mod .pak file MT Manager se kholo',
            'File naam random karo',
            'Hex editor se header change',
            'Paks folder mein paste',
            'Logs clear karo',
            'GUEST account only'
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
