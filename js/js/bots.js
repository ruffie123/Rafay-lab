/* ============================================
   RafayLab — Bot Builder Elite v3
   Telegram + WhatsApp + AI + 5 Bot Types
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

    let platform = 'telegram';
    let selectedType = null;

    document.querySelectorAll('.platform-option').forEach(function (el) {
        el.addEventListener('click', function () {
            document.querySelectorAll('.platform-option').forEach(function (t) { t.classList.remove('selected'); });
            el.classList.add('selected');
            platform = el.getAttribute('data-platform');
            const tg = document.getElementById('tokenGroup');
            const wa = document.getElementById('phoneGroup');
            if (platform === 'whatsapp') {
                if (tg) tg.style.display = 'none';
                if (wa) wa.style.display = 'block';
            } else {
                if (tg) tg.style.display = 'block';
                if (wa) wa.style.display = 'none';
            }
        });
    });

    document.querySelectorAll('.bot-type').forEach(function (el) {
        el.addEventListener('click', function () {
            document.querySelectorAll('.bot-type').forEach(function (t) { t.classList.remove('selected'); });
            el.classList.add('selected');
            selectedType = el.getAttribute('data-type');
            const fs = document.getElementById('featuresStep');
            const as = document.getElementById('aiStep');
            if (selectedType === 'custom') {
                if (fs) fs.style.display = 'block';
                if (as) as.style.display = 'block';
            } else {
                if (fs) fs.style.display = 'none';
                if (as) as.style.display = 'none';
            }
        });
    });

    const TG_SETUP = "# RafayLab Telegram Bot Setup\n# 1. pip install python-telegram-bot\n# 2. nano bot.py\n# 3. paste this code\n# 4. save: Ctrl+O, Enter, Ctrl+X\n# 5. python3 bot.py\n\n";
    const WA_SETUP = "# RafayLab WhatsApp Bot Setup\n# 1. npm init -y\n# 2. npm install whatsapp-web.js qrcode-terminal\n# 3. save as bot.js\n# 4. node bot.js\n# 5. Scan QR\n\n";

    function tgT(name, token, welcome, body) {
        return TG_SETUP + 'TOKEN = "' + token + '"\nBOT_NAME = "' + name + '"\nWELCOME = "' + welcome + '"\n\n' + body;
    }

    function waT(name, phone, welcome, body) {
        return WA_SETUP + 'const { Client, LocalAuth } = require("whatsapp-web.js");\nconst qrcode = require("qrcode-terminal");\n\nconst BOT_NAME = "' + name + '";\nconst WELCOME = "' + welcome + '";\n\nconst client = new Client({ authStrategy: new LocalAuth() });\n\nclient.on("qr", qr => {\n    console.log("Scan this QR:");\n    qrcode.generate(qr, { small: true });\n});\n\nclient.on("ready", () => {\n    console.log(BOT_NAME + " is ready!");\n});\n\nclient.on("message", async msg => {\n' + body + '});\n\nclient.initialize();\n';
    }

    const templates = {};

    templates.greeting = function (n, cred, w) {
        if (platform === 'whatsapp') {
            return waT(n, cred, w, '    if (msg.body === "/start") {\n        await msg.reply(WELCOME);\n    } else if (msg.body === "/help") {\n        await msg.reply("Commands: /start /help /about");\n    } else if (msg.body === "/about") {\n        await msg.reply("Built with RafayLab");\n    } else {\n        await msg.reply("You said: " + msg.body);\n    }\n');
        }
        return tgT(n, cred, w, 'from telegram import Update\nfrom telegram.ext import Application, CommandHandler, MessageHandler, filters, ContextTypes\n\nasync def start(update, context):\n    await update.message.reply_text(f"{WELCOME}\\nHi {update.effective_user.first_name}!")\n\nasync def help_cmd(update, context):\n    await update.message.reply_text("/start /help /about")\n\nasync def about(update, context):\n    await update.message.reply_text("Built with RafayLab")\n\nasync def echo(update, context):\n    await update.message.reply_text(f"You said: {update.message.text}")\n\ndef main():\n    app = Application.builder().token(TOKEN).build()\n    app.add_handler(CommandHandler("start", start))\n    app.add_handler(CommandHandler("help", help_cmd))\n    app.add_handler(CommandHandler("about", about))\n    app.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, echo))\n    print("Running...")\n    app.run_polling()\n\nif __name__ == "__main__":\n    main()\n');
    };

    templates.order = function (n, cred, w) {
        if (platform === 'whatsapp') {
            return waT(n, cred, w, '    const menu = {"1": ["Biryani", 350], "2": ["Karahi", 1200], "3": ["Naan", 30]};\n    const cart = {};\n    if (msg.body === "/start") {\n        await msg.reply(WELCOME + "\\nSend item number: 1.Biryani 2.Karahi 3.Naan");\n    } else if (msg.body in menu) {\n        await msg.reply("Added " + menu[msg.body][0]);\n    } else {\n        await msg.reply("Send 1, 2, or 3");\n    }\n');
        }
        return tgT(n, cred, w, 'from telegram import Update\nfrom telegram.ext import Application, CommandHandler, MessageHandler, filters, ContextTypes\n\nMENU = {"1": ("Biryani", 350), "2": ("Karahi", 1200), "3": ("Naan", 30)}\ncarts = {}\n\nasync def start(update, context):\n    carts.setdefault(update.effective_user.id, [])\n    m = "Menu:\\n"\n    for k, v in MENU.items():\n        m += f"{k}. {v[0]} - {v[1]}\\n"\n    await update.message.reply_text(f"{WELCOME}\\n\\n" + m)\n\nasync def handle(update, context):\n    t = update.message.text.strip()\n    uid = update.effective_user.id\n    if t in MENU:\n        carts.setdefault(uid, []).append(MENU[t])\n        await update.message.reply_text(f"Added {MENU[t][0]}")\n    elif t == "cart":\n        c = carts.get(uid, [])\n        total = sum(v[1] for v in c)\n        await update.message.reply_text(f"Items: {len(c)}\\nTotal: {total}")\n    else:\n        await update.message.reply_text("Send item number or \\"cart\\"")\n\ndef main():\n    app = Application.builder().token(TOKEN).build()\n    app.add_handler(CommandHandler("start", start))\n    app.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, handle))\n    print("Running...")\n    app.run_polling()\n\nif __name__ == "__main__":\n    main()\n');
    };

    templates.alert = function (n, cred, w) {
        if (platform === 'whatsapp') {
            return waT(n, cred, w, '    if (msg.body === "/subscribe") {\n        await msg.reply("Subscribed!");\n    } else if (msg.body === "/stop") {\n        await msg.reply("Unsubscribed");\n    }\n');
        }
        return tgT(n, cred, w, 'from telegram import Update\nfrom telegram.ext import Application, CommandHandler, ContextTypes\nfrom datetime import datetime\n\nsubs = set()\n\nasync def start(update, context):\n    subs.add(update.effective_user.id)\n    await update.message.reply_text(f"{WELCOME}\\nSubscribed!")\n\nasync def stop(update, context):\n    subs.discard(update.effective_user.id)\n    await update.message.reply_text("Unsubscribed")\n\nasync def scheduled(context):\n    now = datetime.now().strftime("%H:%M")\n    for u in list(subs):\n        try:\n            await context.bot.send_message(chat_id=u, text=f"Alert: {now}")\n        except:\n            subs.discard(u)\n\ndef main():\n    app = Application.builder().token(TOKEN).build()\n    app.add_handler(CommandHandler("start", start))\n    app.add_handler(CommandHandler("stop", stop))\n    app.job_queue.run_repeating(scheduled, interval=300, first=30)\n    print("Running...")\n    app.run_polling()\n\nif __name__ == "__main__":\n    main()\n');
    };

    templates.faq = function (n, cred, w) {
        if (platform === 'whatsapp') {
            return waT(n, cred, w, '    const faq = {"price": "From PKR 100", "timing": "9 AM - 11 PM", "location": "Lahore"};\n    let reply = "Ask: price, timing, location";\n    for (const k in faq) { if (msg.body.toLowerCase().includes(k)) reply = faq[k]; }\n    await msg.reply(reply);\n');
        }
        return tgT(n, cred, w, 'from telegram import Update\nfrom telegram.ext import Application, CommandHandler, MessageHandler, filters, ContextTypes\n\nFAQS = {"price": "From PKR 100", "timing": "9 AM - 11 PM", "location": "Lahore"}\n\nasync def start(update, context):\n    await update.message.reply_text(f"{WELCOME}\\nAsk: price, timing, location")\n\nasync def ans(update, context):\n    t = update.message.text.lower()\n    for k, v in FAQS.items():\n        if k in t:\n            await update.message.reply_text(v)\n            return\n    await update.message.reply_text("Not found")\n\ndef main():\n    app = Application.builder().token(TOKEN).build()\n    app.add_handler(CommandHandler("start", start))\n    app.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, ans))\n    print("Running...")\n    app.run_polling()\n\nif __name__ == "__main__":\n    main()\n');
    };

    templates.custom = function (n, cred, w, prompt, features) {
        const f = features || 'general';
        if (platform === 'whatsapp') {
            return waT(n, cred, w, '    // Custom bot: ' + prompt + '\n    // Features: ' + f + '\n    if (msg.body === "/start") {\n        await msg.reply(WELCOME + "\\nBot: " + BOT_NAME);\n    } else {\n        await msg.reply("You said: " + msg.body);\n    }\n');
        }
        return tgT(n, cred, w, 'from telegram import Update\nfrom telegram.ext import Application, CommandHandler, MessageHandler, filters, ContextTypes\n\nREQUIREMENT = """' + prompt + '"""\nFEATURES = """' + f + '"""\n\nasync def start(update, context):\n    await update.message.reply_text(f"{WELCOME}\\n\\nBot: {BOT_NAME}\\nFeatures: {FEATURES}")\n\nasync def handle(update, context):\n    await update.message.reply_text(f"Got: {update.message.text}")\n\ndef main():\n    app = Application.builder().token(TOKEN).build()\n    app.add_handler(CommandHandler("start", start))\n    app.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, handle))\n    print("Running...")\n    app.run_polling()\n\nif __name__ == "__main__":\n    main()\n');
    };

    const gb = document.getElementById('generateBtn');
    const os = document.getElementById('outputStep');
    const co = document.getElementById('codeOutput');
    const cb = document.getElementById('copyBtn');

    if (gb) {
        gb.addEventListener('click', function () {
            if (!selectedType) { alert('Choose bot type'); return; }
            const name = document.getElementById('botName').value.trim() || 'MyBot';
            const welcome = document.getElementById('botWelcome').value.trim() || 'Welcome!';
            let cred = '';
            if (platform === 'whatsapp') {
                const pEl = document.getElementById('botPhone');
                cred = pEl ? pEl.value.trim() : '';
            } else {
                const tEl = document.getElementById('botToken');
                cred = tEl ? tEl.value.trim() : '';
                if (!cred) { alert('Enter token'); return; }
            }
            let code;
            if (selectedType === 'custom') {
                const pEl = document.getElementById('botPrompt');
                const fEl = document.getElementById('botFeatures');
                const p = pEl ? pEl.value.trim() : 'Custom bot';
                const f = fEl ? fEl.value.trim() : '';
                code = templates.custom(name, cred, welcome, p, f);
            } else {
                code = templates[selectedType](name, cred, welcome);
            }
            co.textContent = code;
            os.style.display = 'block';
            os.scrollIntoView({ behavior: 'smooth' });
        });
    }
    if (cb) {
        cb.addEventListener('click', function () {
            navigator.clipboard.writeText(co.textContent).then(function () {
                cb.querySelector('span').textContent = 'Copied!';
                setTimeout(function () { cb.querySelector('span').textContent = 'Copy Code'; }, 2000);
            });
        });
    }
})();
