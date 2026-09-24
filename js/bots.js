/* ============================================
   RafayLab — Bot Builder Elite v2
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

    let selectedType = null;

    document.querySelectorAll('.bot-type').forEach(function (el) {
        el.addEventListener('click', function () {
            document.querySelectorAll('.bot-type').forEach(function (t) { t.classList.remove('selected'); });
            el.classList.add('selected');
            selectedType = el.getAttribute('data-type');
        });
    });

    const SETUP = [
        "# ==============================",
        "# RafayLab Bot Setup",
        "# ==============================",
        "# 1. pip install python-telegram-bot",
        "# 2. nano bot.py",
        "# 3. paste this code",
        "# 4. save: Ctrl+O, Enter, Ctrl+X",
        "# 5. python3 bot.py",
        "# ==============================",
        ""
    ].join("\n") + "\n";

    const templates = {};

    templates.greeting = function (n, tk, w) {
        return SETUP +
'from telegram import Update\n' +
'from telegram.ext import Application, CommandHandler, MessageHandler, filters, ContextTypes\n' +
'from datetime import datetime\n\n' +
'TOKEN = "' + tk + '"\n' +
'BOT_NAME = "' + n + '"\n' +
'WELCOME = "' + w + '"\n' +
'CONTACT = "@your_handle"\n\n' +
'users = set()\n\n' +
'async def start(update, context):\n' +
'    u = update.effective_user\n' +
'    users.add(u.id)\n' +
'    await update.message.reply_text(f"{WELCOME}\\n\\nHi {u.first_name}! I am {BOT_NAME}.")\n\n' +
'async def help_cmd(update, context):\n' +
'    await update.message.reply_text("/start /help /about /contact /stats")\n\n' +
'async def about(update, context):\n' +
'    await update.message.reply_text("Built with RafayLab")\n\n' +
'async def contact(update, context):\n' +
'    await update.message.reply_text(f"Contact: {CONTACT}")\n\n' +
'async def stats(update, context):\n' +
'    await update.message.reply_text(f"Users: {len(users)}")\n\n' +
'async def echo(update, context):\n' +
'    await update.message.reply_text(f"You said: {update.message.text}")\n\n' +
'def main():\n' +
'    print(f"{BOT_NAME} starting...")\n' +
'    app = Application.builder().token(TOKEN).build()\n' +
'    app.add_handler(CommandHandler("start", start))\n' +
'    app.add_handler(CommandHandler("help", help_cmd))\n' +
'    app.add_handler(CommandHandler("about", about))\n' +
'    app.add_handler(CommandHandler("contact", contact))\n' +
'    app.add_handler(CommandHandler("stats", stats))\n' +
'    app.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, echo))\n' +
'    print(f"{BOT_NAME} running.")\n' +
'    app.run_polling()\n\n' +
'if __name__ == "__main__":\n' +
'    main()\n';
    };

    templates.order = function (n, tk, w) {
        return SETUP +
'from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup\n' +
'from telegram.ext import Application, CommandHandler, CallbackQueryHandler, ContextTypes\n' +
'import uuid\n\n' +
'TOKEN = "' + tk + '"\n' +
'BOT_NAME = "' + n + '"\n' +
'WELCOME = "' + w + '"\n' +
'OWNER_ID = 0\n' +
'DELIVERY = 100\n\n' +
'MENU = {\n' +
'    "biryani": {"name": "Chicken Biryani", "price": 350},\n' +
'    "karahi": {"name": "Beef Karahi", "price": 1200},\n' +
'    "naan": {"name": "Naan", "price": 30},\n' +
'    "drink": {"name": "Cold Drink", "price": 100},\n' +
'    "kebab": {"name": "Seekh Kebab", "price": 250},\n' +
'}\n\n' +
'carts = {}\n\n' +
'def menu_txt():\n' +
'    t = "*Menu*\\n\\n"\n' +
'    for k, i in MENU.items():\n' +
'        t += f"- {i[\'name\']} - PKR {i[\'price\']}\\n"\n' +
'    return t\n\n' +
'async def start(update, context):\n' +
'    uid = update.effective_user.id\n' +
'    carts.setdefault(uid, {})\n' +
'    kb = []\n' +
'    for k, i in MENU.items():\n' +
'        kb.append([InlineKeyboardButton("+ " + i["name"], callback_data="add:" + k)])\n' +
'    kb.append([InlineKeyboardButton("Cart", callback_data="cart")])\n' +
'    kb.append([InlineKeyboardButton("Checkout", callback_data="checkout")])\n' +
'    await update.message.reply_text(f"{WELCOME}\\n\\n" + menu_txt(), reply_markup=InlineKeyboardMarkup(kb))\n\n' +
'async def btn(update, context):\n' +
'    q = update.callback_query\n' +
'    await q.answer()\n' +
'    uid = update.effective_user.id\n' +
'    if q.data.startswith("add:"):\n' +
'        k = q.data.split(":")[1]\n' +
'        carts.setdefault(uid, {})\n' +
'        carts[uid][k] = carts[uid].get(k, 0) + 1\n' +
'        await q.message.reply_text(f"Added {MENU[k][\'name\']}")\n' +
'    elif q.data == "cart":\n' +
'        c = carts.get(uid, {})\n' +
'        if not c:\n' +
'            await q.message.reply_text("Empty")\n' +
'            return\n' +
'        t = "Cart:\\n"\n' +
'        sub = 0\n' +
'        for k, v in c.items():\n' +
'            lt = MENU[k]["price"] * v\n' +
'            sub += lt\n' +
'            t += f"- {MENU[k][\'name\']} x{v} = {lt}\\n"\n' +
'        t += f"\\nTotal: {sub + DELIVERY}"\n' +
'        await q.message.reply_text(t)\n' +
'    elif q.data == "checkout":\n' +
'        c = carts.get(uid, {})\n' +
'        if not c:\n' +
'            await q.message.reply_text("Empty")\n' +
'            return\n' +
'        oid = str(uuid.uuid4())[:6].upper()\n' +
'        await q.message.reply_text(f"Order #{oid} confirmed!")\n' +
'        carts[uid] = {}\n\n' +
'def main():\n' +
'    print(f"{BOT_NAME} starting...")\n' +
'    app = Application.builder().token(TOKEN).build()\n' +
'    app.add_handler(CommandHandler("start", start))\n' +
'    app.add_handler(CallbackQueryHandler(btn))\n' +
'    print(f"{BOT_NAME} running.")\n' +
'    app.run_polling()\n\n' +
'if __name__ == "__main__":\n' +
'    main()\n';
    };

    templates.alert = function (n, tk, w) {
        return SETUP +
'from telegram import Update\n' +
'from telegram.ext import Application, CommandHandler, ContextTypes\n' +
'from datetime import datetime\n\n' +
'TOKEN = "' + tk + '"\n' +
'BOT_NAME = "' + n + '"\n' +
'WELCOME = "' + w + '"\n' +
'OWNER_ID = 0\n\n' +
'subs = set()\n\n' +
'async def start(update, context):\n' +
'    subs.add(update.effective_user.id)\n' +
'    await update.message.reply_text(f"{WELCOME}\\nSubscribed!")\n\n' +
'async def stop(update, context):\n' +
'    subs.discard(update.effective_user.id)\n' +
'    await update.message.reply_text("Unsubscribed")\n\n' +
'async def status(update, context):\n' +
'    await update.message.reply_text(f"Subs: {len(subs)}")\n\n' +
'async def broadcast(update, context):\n' +
'    if OWNER_ID and update.effective_user.id != OWNER_ID:\n' +
'        await update.message.reply_text("Admin only")\n' +
'        return\n' +
'    if not context.args:\n' +
'        await update.message.reply_text("Usage: /broadcast msg")\n' +
'        return\n' +
'    msg = " ".join(context.args)\n' +
'    for u in list(subs):\n' +
'        try:\n' +
'            await context.bot.send_message(chat_id=u, text=f"[B] {msg}")\n' +
'        except:\n' +
'            pass\n' +
'    await update.message.reply_text(f"Sent to {len(subs)}")\n\n' +
'async def scheduled(context):\n' +
'    now = datetime.now().strftime("%H:%M")\n' +
'    for u in list(subs):\n' +
'        try:\n' +
'            await context.bot.send_message(chat_id=u, text=f"Alert: {now}")\n' +
'        except:\n' +
'            subs.discard(u)\n\n' +
'def main():\n' +
'    print(f"{BOT_NAME} starting...")\n' +
'    app = Application.builder().token(TOKEN).build()\n' +
'    app.add_handler(CommandHandler("start", start))\n' +
'    app.add_handler(CommandHandler("stop", stop))\n' +
'    app.add_handler(CommandHandler("status", status))\n' +
'    app.add_handler(CommandHandler("broadcast", broadcast))\n' +
'    app.job_queue.run_repeating(scheduled, interval=300, first=30)\n' +
'    print(f"{BOT_NAME} running.")\n' +
'    app.run_polling()\n\n' +
'if __name__ == "__main__":\n' +
'    main()\n';
    };

    templates.faq = function (n, tk, w) {
        return SETUP +
'from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup\n' +
'from telegram.ext import Application, CommandHandler, MessageHandler, CallbackQueryHandler, filters, ContextTypes\n\n' +
'TOKEN = "' + tk + '"\n' +
'BOT_NAME = "' + n + '"\n' +
'WELCOME = "' + w + '"\n\n' +
'FAQS = {\n' +
'    "price": ("Prices?", "From PKR 100"),\n' +
'    "timing": ("Timings?", "9 AM to 11 PM"),\n' +
'    "location": ("Location?", "Lahore"),\n' +
'    "delivery": ("Delivery?", "Free above PKR 500"),\n' +
'    "payment": ("Payment?", "JazzCash, Easypaisa, Cash"),\n' +
'    "contact": ("Contact?", "+92-300-0000000"),\n' +
'    "return": ("Returns?", "Within 24 hours"),\n' +
'    "offer": ("Offers?", "20% off code WELCOME20"),\n' +
'}\n\n' +
'def kb():\n' +
'    k = []\n' +
'    for key, val in FAQS.items():\n' +
'        k.append([InlineKeyboardButton(val[0], callback_data="faq:" + key)])\n' +
'    return InlineKeyboardMarkup(k)\n\n' +
'async def start(update, context):\n' +
'    await update.message.reply_text(f"{WELCOME}\\nTap a question:", reply_markup=kb())\n\n' +
'async def handler(update, context):\n' +
'    q = update.callback_query\n' +
'    await q.answer()\n' +
'    if q.data.startswith("faq:"):\n' +
'        k = q.data.split(":")[1]\n' +
'        if k in FAQS:\n' +
'            await q.message.reply_text(FAQS[k][1])\n\n' +
'async def ans(update, context):\n' +
'    t = update.message.text.lower()\n' +
'    for key, val in FAQS.items():\n' +
'        if key in t:\n' +
'            await update.message.reply_text(val[1])\n' +
'            return\n' +
'    await update.message.reply_text("Not found. /start")\n\n' +
'def main():\n' +
'    print(f"{BOT_NAME} starting...")\n' +
'    app = Application.builder().token(TOKEN).build()\n' +
'    app.add_handler(CommandHandler("start", start))\n' +
'    app.add_handler(CallbackQueryHandler(handler, pattern="^faq:"))\n' +
'    app.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, ans))\n' +
'    print(f"{BOT_NAME} running.")\n' +
'    app.run_polling()\n\n' +
'if __name__ == "__main__":\n' +
'    main()\n';
    };

    templates.custom = function (n, tk, w, prompt) {
        return SETUP +
'from telegram import Update\n' +
'from telegram.ext import Application, CommandHandler, MessageHandler, filters, ContextTypes\n\n' +
'TOKEN = "' + tk + '"\n' +
'BOT_NAME = "' + n + '"\n' +
'WELCOME = "' + w + '"\n' +
'REQUIREMENT = """' + prompt + '"""\n\n' +
'async def start(update, context):\n' +
'    await update.message.reply_text(f"{WELCOME}\\n\\nI am {BOT_NAME}.\\nReq: {REQUIREMENT}")\n\n' +
'async def help_cmd(update, context):\n' +
'    await update.message.reply_text("/start /help /about")\n\n' +
'async def about(update, context):\n' +
'    await update.message.reply_text("Built with RafayLab AI")\n\n' +
'async def echo(update, context):\n' +
'    await update.message.reply_text(f"Got: {update.message.text}")\n\n' +
'def main():\n' +
'    print(f"{BOT_NAME} starting...")\n' +
'    app = Application.builder().token(TOKEN).build()\n' +
'    app.add_handler(CommandHandler("start", start))\n' +
'    app.add_handler(CommandHandler("help", help_cmd))\n' +
'    app.add_handler(CommandHandler("about", about))\n' +
'    app.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, echo))\n' +
'    print(f"{BOT_NAME} running.")\n' +
'    app.run_polling()\n\n' +
'if __name__ == "__main__":\n' +
'    main()\n';
    };

    const gb = document.getElementById('generateBtn');
    const os = document.getElementById('outputStep');
    const co = document.getElementById('codeOutput');
    const cb = document.getElementById('copyBtn');

    if (gb) {
        gb.addEventListener('click', function () {
            if (!selectedType) { alert('Choose bot type'); return; }
            const name = document.getElementById('botName').value.trim() || 'MyBot';
            const token = document.getElementById('botToken').value.trim();
            const welcome = document.getElementById('botWelcome').value.trim() || 'Welcome!';
            if (!token) { alert('Enter token'); return; }
            let code;
            if (selectedType === 'custom') {
                const p = window.prompt('Describe your bot:', '');
                if (!p) return;
                code = templates.custom(name, token, welcome, p);
            } else {
                code = templates[selectedType](name, token, welcome);
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
})(
