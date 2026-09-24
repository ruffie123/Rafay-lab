/* ============================================
   RafayLab — Cheats Lab Elite
   PUBG + Free Fire + iOS + General + File Editor
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

    // ============================================
    // Tabs
    // ============================================
    document.querySelectorAll('.cheat-tab').forEach(function (tab) {
        tab.addEventListener('click', function () {
            document.querySelectorAll('.cheat-tab').forEach(function (t) { t.classList.remove('active'); });
            tab.classList.add('active');
            document.querySelectorAll('.cheat-panel').forEach(function (p) { p.classList.remove('active'); });
            const id = 'panel-' + tab.getAttribute('data-tab');
            const panel = document.getElementById(id);
            if (panel) panel.classList.add('active');
        });
    });

    // ============================================
    // Header
    // ============================================
    const HEADER = "# ==========================================\n# RafayLab Cheat Script\n# Save as cheat.py — run with python3 cheat.py\n# Use GUEST account. Never main account.\n# ==========================================\n\n";

    // ============================================
    // PUBG Templates
    // ============================================
    const PUBG = {};

    PUBG['pubg-skin'] = {
        code: function () {
            return HEADER + '"""\nPUBG Mobile — Skin Mod Generator\nCreates skin file replacements for PUBG APK mods.\n"""\n\nimport os\nimport shutil\nfrom pathlib import Path\nfrom datetime import datetime\n\nPUBG_PKG = "com.tencent.ig"\nPUBG_PATH = "/sdcard/Android/data/" + PUBG_PKG + "/files"\nBACKUP = "/sdcard/RafayLab/pubg_skin_backup"\nSKIN_DIR = PUBG_PATH + "/UE4Game/ShadowTrackerExtra/Saved/Paks"\n\n\ndef check():\n    if not os.path.exists(PUBG_PATH):\n        print("[X] PUBG not found. Open PUBG once first.")\n        return False\n    print("[OK] PUBG found at " + PUBG_PATH)\n    return True\n\n\ndef backup():\n    os.makedirs(BACKUP, exist_ok=True)\n    if os.path.exists(SKIN_DIR):\n        for f in os.listdir(SKIN_DIR):\n            if f.endswith(".pak"):\n                shutil.copy(SKIN_DIR + "/" + f, BACKUP + "/" + f)\n                print("[OK] Backed up: " + f)\n    print("[OK] Backup at " + BACKUP)\n\n\ndef main():\n    print("=" * 50)\n    print("PUBG Skin Mod Tool")\n    print("=" * 50)\n    if not check():\n        return\n    backup()\n    print("\\n[NEXT STEPS]")\n    print("1. Download mod .pak files from your source")\n    print("2. Copy to: " + SKIN_DIR)\n    print("3. Restart PUBG")\n    print("4. Use GUEST account only!")\n\n\nif __name__ == "__main__":\n    main()\n';
        },
        guide: [
            'Step 1: PUBG kholo — ek dafa — taake folder ban jaye',
            'Step 2: Termux kholo — yeh script save karo — `python3 cheat.py` chalao',
            'Step 3: Backup folder ban jayega — /sdcard/RafayLab/pubg_skin_backup',
            'Step 4: Mod .pak files download karo — kisi bhi trusted source se',
            'Step 5: Mod files ko `/sdcard/Android/data/com.tencent.ig/files/UE4Game/ShadowTrackerExtra/Saved/Paks/` mein paste karo',
            'Step 6: PUBG band karo — dobara kholo',
            'Step 7: GUEST account use karo — main account kabhi nahi',
            'WARNING: Mod .pak files galat ho sakti hain — crash game. Pehle backup.'
        ]
    };

    PUBG['pubg-esp'] = {
        code: function () {
            return HEADER + '"""\nPUBG Mobile — ESP Config Generator\nGenerates config for GameGuardian / external overlay.\n"""\n\nCONFIG = {\n    "esp_player_box": True,\n    "esp_player_line": True,\n    "esp_player_name": True,\n    "esp_player_health": True,\n    "esp_player_distance": True,\n    "esp_bot_box": True,\n    "esp_items": True,\n    "esp_vehicle": True,\n    "esp_scope": 200,\n    "color_enemy": "red",\n    "color_teammate": "green",\n    "color_bot": "yellow",\n}\n\n\ndef main():\n    print("=" * 50)\n    print("PUBG ESP Config")\n    print("=" * 50)\n    for k, v in CONFIG.items():\n        print(f"  {k}: {v}")\n    print("\\n[NEXT STEPS]")\n    print("1. Open GameGuardian")\n    print("2. Attach to PUBG process")\n    print("3. Search for player memory addresses")\n    print("4. Apply these settings via overlay")\n    print("5. Use GUEST account")\n\n\nif __name__ == "__main__":\n    main()\n';
        },
        guide: [
            'Step 1: GameGuardian install karo (root ya virtual space)',
            'Step 2: PUBG kholo — game mein jao',
            'Step 3: GameGuardian kholo — PUBG process select karo',
            'Step 4: Search value — player coordinates',
            'Step 5: ESP overlay activate karo',
            'Step 6: GUEST account use karo',
            'WARNING: GameGuardian freeze kar sakta hai — chhote changes karo'
        ]
    };

    PUBG['pubg-aimbot'] = {
        code: function () {
            return HEADER + '"""\nPUBG Mobile — Aimbot Sensitivity Config\nOptimal sensitivity settings for auto-aim precision.\n"""\n\nSETTINGS = {\n    "camera_free": 100,\n    "camera_3rd": 95,\n    "camera_1st": 90,\n    "red_dot": 85,\n    "2x_scope": 75,\n    "4x_scope": 60,\n    "sniper": 50,\n    "gyro": 300,\n    "auto_aim_distance": 100,\n    "aim_assist": "on",\n}\n\n\ndef main():\n    print("PUBG Aimbot Sensitivity Settings")\n    print("=" * 40)\n    for k, v in SETTINGS.items():\n        print(f"  {k}: {v}")\n    print("\\n[NEXT STEPS]")\n    print("1. PUBG kholo > Settings > Sensitivity")\n    print("2. Yeh values daalo")\n    print("3. Training mein test karo")\n    print("4. GUEST account use karo")\n\n\nif __name__ == "__main__":\n    main()\n';
        },
        guide: [
            'Step 1: PUBG kholo — Settings > Sensitivity',
            'Step 2: Camera aur scope values daalo (script mein hain)',
            'Step 3: Gyroscope on karo — 300',
            'Step 4: Training ground mein test karo',
            'Step 5: Comfortable na lage toh adjust karo',
            'Step 6: GUEST account only'
        ]
    };

    PUBG['pubg-magic'] = {
        code: function () {
            return HEADER + '"""\nPUBG Mobile — Magic Bullet Helper\nExplains magic bullet / bullet tracking technique.\n"""\n\nprint("=" * 50)\nprint("Magic Bullet — Technical Overview")\nprint("=" * 50)\nprint("")\nprint("Magic bullet is a memory-editing technique that:")\nprint("  1. Modifies bullet trajectory values in game memory")\nprint("  2. Forces bullets to track target coordinates")\nprint("  3. Bypasses normal bullet physics")\nprint("")\nprint("Requirements:")\nprint("  - Root access or Virtual Space")\nprint("  - GameGuardian or similar memory editor")\nprint("  - Advanced memory scanning skills")\nprint("")\nprint("Safety:")\nprint("  - NEVER on main account")\nprint("  - GUEST account only")\nprint("  - Expect bans if detected")\nprint("  - Anti-cheat updates frequently")\nprint("")\nprint("[NOTE] This script provides educational information.")\nprint("[NOTE] Real implementation requires memory-level access")\nprint("[NOTE] LAB provides guidance, not direct injection")\n';
        },
        guide: [
            'Step 1: Root ya Virtual Space (Parallel Space, Dual Space) install karo',
            'Step 2: GameGuardian install karo',
            'Step 3: PUBG kholo — match mein jao',
            'Step 4: GameGuardian se bullet memory address scan karo',
            'Step 5: Bullet trajectory value modify karo',
            'Step 6: Freeze value — target tracking on',
            'Step 7: GUEST account only',
            'WARNING: High ban risk. Anti-cheat detects memory changes.'
        ]
    };

    PUBG['pubg-antiband'] = {
        code: function () {
            return HEADER + '"""\nPUBG Mobile — Anti-Ban Helper\nCleans traces, backs up configs, resets game data safely.\n"""\n\nimport os\nimport shutil\n\nDATA = "/sdcard/Android/data/com.tencent.ig"\nBACKUP = "/sdcard/RafayLab/pubg_backup"\n\n\ndef backup_configs():\n    os.makedirs(BACKUP, exist_ok=True)\n    if os.path.exists(DATA):\n        shutil.copytree(DATA, BACKUP + "/full_backup", dirs_exist_ok=True)\n        print("[OK] Full backup at " + BACKUP)\n    else:\n        print("[X] PUBG data folder not found")\n\n\ndef show_tips():\n    tips = [\n        "Use GUEST account only",\n        "Never link Facebook/Google to mod account",\n        "Uninstall mod APK after each session",\n        "Clear cache between sessions",\n        "Use VPN for region change",\n        "Never trade/sell items from mod account",\n        "Avoid rank push on mod account",\n        "Fresh install if banned",\n        "Do not use mods during events",\n        "Anti-cheat updates weekly — pause after update"\n    ]\n    print("\\n[A] Anti-Ban Rules:")\n    for t in tips:\n        print("  - " + t)\n\n\ndef main():\n    print("=" * 50)\n    print("PUBG Anti-Ban Helper")\n    print("=" * 50)\n    backup_configs()\n    show_tips()\n\n\nif __name__ == "__main__":\n    main()\n';
        },
        guide: [
            'Step 1: Yeh script chalao — full backup ban jayega',
            'Step 2: GUEST account banao — koi social link nahi',
            'Step 3: Mods chalao — sirf guest pe',
            'Step 4: Session ke baad game uninstall karo',
            'Step 5: VPN on karo agar region-specific mod hai',
            'Step 6: Anti-cheat update ke baad 2-3 din wait karo'
        ]
    };

    PUBG['pubg-bypass'] = {
        code: function () {
            return HEADER + '"""\nPUBG Mobile — File Bypass Helper\nRenames mod files to bypass basic file scans.\n"""\n\nimport os\nimport shutil\n\nPAKS = "/sdcard/Android/data/com.tencent.ig/files/UE4Game/ShadowTrackerExtra/Saved/Paks"\nBACKUP = "/sdcard/RafayLab/pubg_bypass_backup"\n\n\ndef backup():\n    os.makedirs(BACKUP, exist_ok=True)\n    if os.path.exists(PAKS):\n        for f in os.listdir(PAKS):\n            shutil.copy(PAKS + "/" + f, BACKUP + "/" + f)\n            print("[OK] " + f)\n\n\ndef main():\n    print("PUBG File Bypass Helper")\n    print("=" * 40)\n    backup()\n    print("\\n[TECHNIQUES]")\n    print("1. Rename .pak files with random names")\n    print("2. Change file headers via hex editor")\n    print("3. Place mod in custom subfolder")\n    print("4. Clear logs after each session")\n    print("5. Use MT Manager to edit APK signature")\n\n\nif __name__ == "__main__":\n    main()\n';
        },
        guide: [
            'Step 1: Yeh script chalao — backup ban jayega',
            'Step 2: Mod .pak file MT Manager se kholo',
            'Step 3: File ka naam random karo — jaise `patch_x.pak`',
            'Step 4: Hex editor se header change karo',
            'Step 5: Paks folder mein paste karo',
            'Step 6: Logs clear karo — `/sdcard/Android/data/com.tencent.ig/files/`',
            'Step 7: GUEST account pe test karo'
        ]
    };

    // ============================================
    // Free Fire Templates
    // ============================================
    const FF = {};

    FF['ff-headshot'] = {
        code: function () {
            return HEADER + '"""\nFree Fire — Headshot Sensitivity Config\n"""\n\nSETTINGS = {\n    "general": 90,\n    "red_dot": 85,\n    "2x_scope": 75,\n    "4x_scope": 60,\n    "awm_scope": 45,\n    "fire_button_size": "max",\n    "aim_assist": "on",\n    "auto_aim": "on",\n}\n\n\ndef main():\n    print("Free Fire Headshot Settings")\n    print("=" * 40)\n    for k, v in SETTINGS.items():\n        print(f"  {k}: {v}")\n    print("\\n[NEXT] Free Fire > Settings > Sensitivity")\n\n\nif __name__ == "__main__":\n    main()\n';
        },
        guide: [
            'Step 1: Free Fire kholo — Settings > Sensitivity',
            'Step 2: Script ki values daalo',
            'Step 3: HUD layout > Fire button max size',
            'Step 4: Training mein test karo',
            'Step 5: GUEST account only'
        ]
    };

    FF['ff-aimbot'] = {
        code: function () {
            return HEADER + '"""\nFree Fire — Aimbot Helper\n"""\n\nprint("Free Fire Aimbot — Overview")\nprint("=" * 40)\nprint("Free Fire has built-in aim assist.")\nprint("To maximize: ")\nprint("  1. Settings > Sensitivity — optimal values")\nprint("  2. HUD > Aim assist ON")\nprint("  3. Use scope drag for tracking")\nprint("  4. Character skill: Kelly / Alok for speed")\nprint("  5. Pet: Falco (speed) or Ottero (EP)")\nprint("")\nprint("[NOTE] Real aimbot requires memory editing (GameGuardian)")\nprint("[NOTE] Ban risk high — guest account only")\n';
        },
        guide: [
            'Step 1: Free Fire settings — aim assist ON',
            'Step 2: Sensitivity values set karo',
            'Step 3: Character — Kelly (speed) choose karo',
            'Step 4: Pet — Falco (glide speed)',
            'Step 5: GameGuardian se memory edit (advanced)',
            'Step 6: GUEST account only'
        ]
    };

    FF['ff-esp'] = {
        code: function () {
            return HEADER + '"""\nFree Fire — ESP Config\n"""\n\nCONFIG = {\n    "esp_box": True,\n    "esp_line": True,\n    "esp_name": True,\n    "esp_health": True,\n    "esp_distance": True,\n    "esp_vehicle": True,\n    "color_enemy": "red",\n    "color_team": "green",\n}\n\n\ndef main():\n    print("Free Fire ESP Config")\n    for k, v in CONFIG.items():\n        print(f"  {k}: {v}")\n    print("\\n[NOTE] Requires GameGuardian + memory address scan")\n\n\nif __name__ == "__main__":\n    main()\n';
        },
        guide: [
            'Step 1: GameGuardian install karo',
            'Step 2: Free Fire kholo — match mein',
            'Step 3: GameGuardian attach karo',
            'Step 4: Player memory address scan karo',
            'Step 5: Overlay ESP on karo',
            'Step 6: GUEST account only'
        ]
    };

    FF['ff-modmenu'] = {
        code: function () {
            return HEADER + '"""\nFree Fire — Mod Menu Info\n"""\n\nMENU = {\n    "Aimbot": "Auto-aim on enemies",\n    "ESP": "See players through walls",\n    "Speed": "Movement speed boost",\n    "Jump": "High jump",\n    "Antenna": "Headshot assist",\n    "No Recoil": "Recoil control",\n    "Wall Hack": "Shoot through walls",\n    "Infinite Ammo": "No reload",\n}\n\n\ndef main():\n    print("Free Fire Mod Menu Features")\n    print("=" * 50)\n    for k, v in MENU.items():\n        print(f"  {k}: {v}")\n    print("\\n[NOTE] Mod menu requires modded APK or memory editor")\n    print("[NOTE] LAB generates configs, not direct injection")\n\n\nif __name__ == "__main__":\n    main()\n';
        },
        guide: [
            'Step 1: Modded FF APK download karo (trusted source)',
            'Step 2: Original FF uninstall karo',
            'Step 3: Mod APK install karo',
            'Step 4: Mod menu game mein open hoga',
            'Step 5: Features select karo',
            'Step 6: GUEST account only',
            'WARNING: High ban risk'
        ]
    };

    FF['ff-skin'] = {
        code: function () {
            return HEADER + '"""\nFree Fire — Skin Mod Helper\n"""\n\nimport os\n\nFF_PATH = "/sdcard/Android/data/com.dts.freefireth/files"\nBACKUP = "/sdcard/RafayLab/ff_backup"\n\n\ndef backup():\n    os.makedirs(BACKUP, exist_ok=True)\n    print("[OK] Backup folder: " + BACKUP)\n\n\ndef main():\n    print("Free Fire Skin Mod")\n    print("=" * 40)\n    backup()\n    print("\\n[STEPS]")\n    print("1. Mod APK download karo")\n    print("2. MT Manager se APK kholo")\n    print("3. Skin files replace karo")\n    print("4. Recompile + sign")\n    print("5. Install — GUEST account")\n\n\nif __name__ == "__main__":\n    main()\n';
        },
        guide: [
            'Step 1: Mod FF APK download karo',
            'Step 2: MT Manager mein APK kholo',
            'Step 3: Assets > skins folder edit',
            'Step 4: Recompile karo',
            'Step 5: Sign karo — MT Manager se',
            'Step 6: Install karo — original uninstall',
            'Step 7: GUEST account only'
        ]
    };

    FF['ff-anti'] = {
        code: function () {
            return HEADER + '"""\nFree Fire — Anti-Ban Helper\n"""\n\nimport os\nimport shutil\n\nDATA = "/sdcard/Android/data/com.dts.freefireth"\nBACKUP = "/sdcard/RafayLab/ff_antiband"\n\n\ndef main():\n    print("Free Fire Anti-Ban")\n    os.makedirs(BACKUP, exist_ok=True)\n    if os.path.exists(DATA):\n        shutil.copytree(DATA, BACKUP + "/backup", dirs_exist_ok=True)\n        print("[OK] Backup done")\n    print("\\n[RULES]")\n    rules = [\n        "Guest account only",\n        "No social linking",\n        "Uninstall after session",\n        "Clear cache before reinstall",\n        "Do not join events",\n        "Avoid rank pushes",\n        "Fresh install if banned"\n    ]\n    for r in rules:\n        print("  - " + r)\n\n\nif __name__ == "__main__":\n    main()\n';
        },
        guide: [
            'Step 1: Script chalao — backup ban jayega',
            'Step 2: Rules follow karo',
            'Step 3: GUEST account only',
            'Step 4: Session ke baad uninstall',
            'Step 5: Anti-cheat update ke baad 3-4 din wait'
        ]
    };

    // ============================================
    // iOS Templates
    // ============================================
    const IOS = {};

    IOS['ios-pubg'] = {
        code: function () {
            return HEADER + '"""\nPUBG iOS — Mod Overview\nRequires jailbreak for full functionality.\n"""\n\nprint("PUBG iOS Modding")\nprint("=" * 40)\nprint("[REQUIREMENTS]")\nprint("  - Jailbroken iPhone (checkra1n / unc0ver)")\nprint("  - Cydia / Sileo installed")\nprint("  - Filza (file manager)")\nprint("  - AppSync Unified (tweak)")\nprint("")\nprint("[STEPS]")\nprint("  1. Jailbreak iPhone")\nprint("  2. Install Filza from Cydia")\nprint("  3. Download mod .pak files")\nprint("  4. Filza se PUBG files replace")\nprint("  5. Respring device")\nprint("  6. GUEST account only")\nprint("")\nprint("[NOTE] iOS modding is complex — Apple device security")\n';
        },
        guide: [
            'Step 1: iPhone jailbreak karo (iOS 15 tak — checkra1n/unc0ver)',
            'Step 2: Cydia se Filza install karo',
            'Step 3: PUBG iOS install karo — App Store se',
            'Step 4: Filza kholo — PUBG data folder edit',
            'Step 5: Mod files paste karo',
            'Step 6: Respring',
            'Step 7: GUEST account only',
            'WARNING: Jailbreak voids warranty. iOS updates remove jailbreak.'
        ]
    };

    IOS['ios-ff'] = {
        code: function () {
            return HEADER + '"""\nFree Fire iOS — Mod Overview\n"""\n\nprint("Free Fire iOS Modding")\nprint("=" * 40)\nprint("Requires jailbreak + Filza")\nprint("")\nprint("[STEPS]")\nprint("  1. Jailbroken iOS")\nprint("  2. Filza install")\nprint("  3. FF data folder edit")\nprint("  4. Mod files paste")\nprint("  5. Respring")\nprint("  6. GUEST account")\n';
        },
        guide: [
            'Step 1: Jailbreak iPhone',
            'Step 2: Filza install karo',
            'Step 3: Free Fire install karo',
            'Step 4: Data folder edit karo',
            'Step 5: Respring',
            'Step 6: GUEST account only'
        ]
    };

    IOS['ios-general'] = {
        code: function () {
            return HEADER + '"""\niOS General Tools\n"""\n\nTOOLS = {\n    "checkra1n": "Jailbreak tool (A5-A11)",\n    "unc0ver": "Jailbreak (iOS 11-14)",\n    "Taurine": "Jailbreak (iOS 14)",\n    "Dopamine": "Jailbrea
