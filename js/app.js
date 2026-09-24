/* ============================================
   MAHI Lab — Login Logic
   ============================================ */

(function () {
    'use strict';

    const STORAGE_KEY = 'mahilab_user';
    const USERS_KEY = 'mahilab_users';

    // Default user — pehli baar ke liye
    function ensureDefaultUser() {
        const users = JSON.parse(localStorage.getItem(USERS_KEY) || '{}');
        if (!users['admin']) {
            users['admin'] = {
                username: 'admin',
                password: 'admin123',
                createdAt: Date.now(),
                role: 'owner'
            };
            localStorage.setItem(USERS_KEY, JSON.stringify(users));
        }
    }

    // Simple hash — asli app mein bcrypt, yahan demo ke liye
    function simpleHash(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return String(hash);
    }

    function getUsers() {
        return JSON.parse(localStorage.getItem(USERS_KEY) || '{}');
    }

    function setUsers(users) {
        localStorage.setItem(USERS_KEY, JSON.stringify(users));
    }

    function login(username, password) {
        const users = getUsers();
        const user = users[username.toLowerCase()];
        if (!user) return { ok: false, msg: 'User not found.' };
        if (user.password !== password) return { ok: false, msg: 'Incorrect password.' };
        return { ok: true, user: user };
    }

    function setSession(user) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
            username: user.username,
            role: user.role,
            loggedInAt: Date.now()
        }));
    }

    function clearSession() {
        localStorage.removeItem(STORAGE_KEY);
    }

    // ============================================
    // Login Page Handler
    // ============================================
    function initLoginPage() {
        const form = document.getElementById('loginForm');
        const btn = document.getElementById('loginBtn');
        const errorMsg = document.getElementById('errorMsg');
        const rememberBox = document.getElementById('remember');

        if (!form) return;

        // Agar already logged in — dashboard pe bhejo
        if (localStorage.getItem(STORAGE_KEY)) {
            window.location.href = 'dashboard.html';
            return;
        }

        ensureDefaultUser();

        // Remember me — saved username
        const savedUser = localStorage.getItem('mahilab_saved_user');
        if (savedUser) {
            document.getElementById('username').value = savedUser;
            if (rememberBox) rememberBox.checked = true;
        }

        form.addEventListener('submit', function (e) {
            e.preventDefault();
            errorMsg.textContent = '';

            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value;

            if (!username || !password) {
                errorMsg.textContent = 'Please fill in all fields.';
                return;
            }

            btn.disabled = true;
            btn.querySelector('span').textContent = 'Signing in...';

            // Chhota delay — feel ke liye
            setTimeout(function () {
                const result = login(username, password);

                if (result.ok) {
                    setSession(result.user);

                    if (rememberBox && rememberBox.checked) {
                        localStorage.setItem('mahilab_saved_user', username);
                    } else {
                        localStorage.removeItem('mahilab_saved_user');
                    }

                    btn.querySelector('span').textContent = 'Welcome!';
                    setTimeout(function () {
                        window.location.href = 'dashboard.html';
                    }, 400);
                } else {
                    errorMsg.textContent = result.msg;
                    btn.disabled = false;
                    btn.querySelector('span').textContent = 'Sign In';
                    document.getElementById('password').value = '';
                }
            }, 600);
        });
    }

    // ============================================
    // Dashboard Guard
    // ============================================
    function requireAuth() {
        const session = localStorage.getItem(STORAGE_KEY);
        if (!session) {
            window.location.href = 'index.html';
            return null;
        }
        return JSON.parse(session);
    }

    function logout() {
        clearSession();
        window.location.href = 'index.html';
    }

    // ============================================
    // Expose global
    // ============================================
    window.MahiLab = {
        requireAuth: requireAuth,
        logout: logout,
        getUsers: getUsers,
        setUsers: setUsers
    };

    // ============================================
    // Auto-init
    // ============================================
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initLoginPage);
    } else {
        initLoginPage();
    }

})();

/* ============================================
   Hamburger Menu — Sidebar Toggle
   ============================================ */
(function () {
    'use strict';

    function initHamburger() {
        const toggle = document.getElementById('menuToggle');
        const sidebar = document.querySelector('.sidebar');
        const overlay = document.getElementById('sidebarOverlay');

        if (!toggle || !sidebar || !overlay) return;

        function openMenu() {
            sidebar.classList.add('open');
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closeMenu() {
            sidebar.classList.remove('open');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        }

        toggle.addEventListener('click', function (e) {
            e.stopPropagation();
            if (sidebar.classList.contains('open')) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        overlay.addEventListener('click', closeMenu);

        // Sidebar ke andar kisi link pe click karo — band ho jaye
        sidebar.querySelectorAll('.nav-item').forEach(function (link) {
            link.addEventListener('click', function () {
                closeMenu();
            });
        });

        // Escape key — band karo
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') closeMenu();
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initHamburger);
    } else {
        initHamburger();
    }

})();
