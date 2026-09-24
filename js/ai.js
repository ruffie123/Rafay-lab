/* ============================================
   RafayLab — AI Tools (Gemini)
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

    const KEY_STORAGE = 'rafaylab_gemini_key';
    const GEMINI_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent';

    const setupSection = document.getElementById('aiSetup');
    const chatSection = document.getElementById('aiChat');
    const apiKeyInput = document.getElementById('apiKey');
    const saveKeyBtn = document.getElementById('saveKeyBtn');
    const chatMessages = document.getElementById('chatMessages');
    const chatInput = document.getElementById('chatInput');
    const sendBtn = document.getElementById('sendBtn');

    let apiKey = localStorage.getItem(KEY_STORAGE) || '';
    let conversation = [];

    function showChat() {
        setupSection.style.display = 'none';
        chatSection.style.display = 'flex';
    }

    function showSetup() {
        setupSection.style.display = 'block';
        chatSection.style.display = 'none';
    }

    if (apiKey) {
        showChat();
    } else {
        showSetup();
    }

    saveKeyBtn.addEventListener('click', function () {
        const key = apiKeyInput.value.trim();
        if (!key) {
            alert('Please paste your Gemini API key.');
            return;
        }
        localStorage.setItem(KEY_STORAGE, key);
        apiKey = key;
        showChat();
    });

    function addMessage(role, text) {
        const welcome = chatMessages.querySelector('.chat-welcome');
        if (welcome) welcome.remove();

        const div = document.createElement('div');
        div.className = 'chat-msg ' + role;
        div.textContent = text;
        chatMessages.appendChild(div);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        return div;
    }

    function addTyping() {
        const div = document.createElement('div');
        div.className = 'chat-msg bot typing';
        div.innerHTML = '<span></span><span></span><span></span>';
        chatMessages.appendChild(div);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        return div;
    }

    async function sendToGemini(userText) {
        conversation.push({ role: 'user', parts: [{ text: userText }] });

        const body = {
            contents: conversation,
            generationConfig: {
                temperature: 0.7,
                maxOutputTokens: 2048
            }
        };

        const res = await fetch(GEMINI_URL + '?key=' + encodeURIComponent(apiKey), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });

        if (!res.ok) {
            const errText = await res.text();
            throw new Error('API error ' + res.status + ': ' + errText);
        }

        const data = await res.json();
        const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || '(no response)';
        conversation.push({ role: 'model', parts: [{ text: reply }] });
        return reply;
    }

    async function handleSend() {
        const text = chatInput.value.trim();
        if (!text) return;
        chatInput.value = '';
        addMessage('user', text);
        const typing = addTyping();
        sendBtn.disabled = true;
        try {
            const reply = await sendToGemini(text);
            typing.remove();
            addMessage('bot', reply);
        } catch (err) {
            typing.remove();
            addMessage('bot', 'Error: ' + err.message + '\n\nCheck your API key or internet connection.');
        } finally {
            sendBtn.disabled = false;
            chatInput.focus();
        }
    }

    sendBtn.addEventListener('click', handleSend);
    chatInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') handleSend();
    });

})();
