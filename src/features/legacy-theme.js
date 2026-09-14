(function() {
    'use strict';

    window.NX = window.NX || {};
    window.NX.features = window.NX.features || {};

    var CSS_ID = 'nx-legacy-theme-style';
    var LEGACY_MARKER = 'nxLegacyNav';

    var BLUE = '#0074BD';
    var BODY_BG = '#e3e3e3';
    var DIVIDER = '#c3c3c3';
    var TEXT_DARK = '#191919';
    var TEXT_MUTED = '#B8B8B8';

    var CSS = [
        '@import url("https://fonts.googleapis.com/css2?family=Source+Sans+Pro:ital,wght@0,200;0,300;0,400;0,600;0,700;0,900;1,200;1,300;1,400;1,600;1,700;1,900&display=swap");',

        'html,body{padding:0;margin:0;font-family:"Source Sans Pro",Arial,Helvetica,sans-serif !important;font-size:14px;line-height:normal !important}',
        'html,body{background:' + BODY_BG + ' !important}',
        '*{box-sizing:border-box}',

        'a{color:#0055b3;text-decoration:none !important;cursor:pointer}',

        'h1,h2,h3,h4,h5,h6{color:' + TEXT_DARK + ';line-height:normal;font-family:"Source Sans Pro",Arial,Helvetica,sans-serif !important;font-weight:400 !important}',

        'body > div#__next{padding-top:44px !important}',
        'body > div#__next > div > div:first-child{position:fixed;top:0;left:0;right:0;z-index:1030}',

        '.main-0-2-45{padding-top:0 !important;margin-top:0 !important;background:transparent !important}',
        '.main-0-2-45 > .container{padding-top:24px !important}',
        '.container-0-2-47{padding-top:0 !important;margin-top:0 !important}',
        '.container{max-width:970px !important}',

        '.adWrapper-0-2-106,.adWrapper-0-2-90,[class*="adWrapper-"]{display:none !important}',
        '.fakeAlert-0-2-41{display:none !important}',

        '.nx-nav{background:' + BLUE + ';height:44px;display:flex;align-items:center;padding:0 12px;font-family:"Source Sans Pro",Arial,Helvetica,sans-serif;box-shadow:0 1px 3px rgba(0,0,0,0.15)}',
        '.nx-nav-inner{display:flex;align-items:center;width:100%;max-width:1400px;margin:0 auto;gap:8px}',
        '.nx-nav-logo{width:118px;height:30px;background-image:url("/img/roblox_logo.svg");background-size:118px 30px;background-repeat:no-repeat;background-position:left center;cursor:pointer;flex-shrink:0;margin-right:20px}',
        '.nx-nav-links{display:flex;gap:2px;flex-shrink:0}',
        '.nx-nav-link{color:#fff !important;font-size:16px;font-weight:400;padding:6px 10px;border-radius:3px;text-decoration:none !important;white-space:nowrap;cursor:pointer;line-height:20px}',
        '.nx-nav-link:hover{background:rgba(0,0,0,0.12);color:#fff !important}',
        '.nx-nav-search{flex:0 1 380px;position:relative;margin-left:20px}',
        '.nx-nav-search input{width:100%;height:28px;padding:0 30px 0 10px;border:1px solid transparent;border-radius:2px;background:#fff;color:#333;font-size:14px;font-family:inherit;outline:none;line-height:28px}',
        '.nx-nav-search input:focus{border-color:#0055b3}',
        '.nx-nav-search .icon-nav-search{position:absolute;top:6px;right:8px;color:#666;font-size:14px;pointer-events:none}',
        '.nx-nav-spacer{flex:1 1 auto}',
        '.nx-nav-auth{display:flex;align-items:center;gap:4px;flex-shrink:0}',
        '.nx-nav-auth-link{color:#fff !important;font-size:16px;font-weight:400;padding:6px 10px;border-radius:3px;cursor:pointer;display:inline-flex;align-items:center;line-height:20px}',
        '.nx-nav-auth-link:hover{background:rgba(0,0,0,0.12);color:#fff !important}',
        '.nx-nav-balance{color:#fff;font-size:16px;font-weight:400;margin:0 4px 0 0;line-height:20px}',

        '.nx-nav-settings-wrap{position:relative;display:inline-flex}',
        '.nx-nav-settings-menu{position:absolute;top:36px;right:0;width:150px;background:#fff;box-shadow:0 2px 12px rgba(25,25,25,0.25);border-radius:3px;padding:4px 0;z-index:1100}',
        '.nx-nav-settings-menu a{display:block;padding:9px 14px;color:' + TEXT_DARK + ' !important;font-size:15px;text-decoration:none !important;border-left:4px solid transparent}',
        '.nx-nav-settings-menu a:hover{background:#eaeaea;border-left-color:' + BLUE + '}',

        '.nx-footer{background:#fff;padding:26px 0 20px;margin-top:48px;color:' + TEXT_MUTED + ';border-top:1px solid #e0e0e0}',
        '.nx-footer-inner{max-width:970px;margin:0 auto;padding:0 16px}',
        '.nx-footer-links{display:flex;flex-wrap:wrap;gap:36px;margin-bottom:18px}',
        '.nx-footer-links a{color:' + TEXT_MUTED + ' !important;font-size:20px;font-weight:300;text-decoration:none !important}',
        '.nx-footer-links a:hover{color:' + TEXT_DARK + ' !important}',
        '.nx-footer-legal{color:' + TEXT_MUTED + ';font-size:12px;line-height:1.5;margin:0}',
        '.nx-footer-legal a{color:' + TEXT_MUTED + ' !important;text-decoration:none !important}',

        '@media(max-width:900px){',
        '.nx-nav-links{display:none}',
        '.nx-nav-search{flex:1 1 auto;margin-left:8px}',
        '.nx-nav-logo{width:30px;background-image:url("/img/logo_R.svg");background-size:30px 30px;margin-right:8px}',
        '}'
    ].join('');

    function ensureStyle() {
        if (document.getElementById(CSS_ID)) return;
        var s = document.createElement('style');
        s.id = CSS_ID;
        s.textContent = CSS;
        document.head.appendChild(s);
    }

    function setBodyBackground() {
        if (!document.body) return;
        document.body.setAttribute('style', 'background: ' + BODY_BG + ' !important');
    }

    function cachedMeId() {
        return parseInt(localStorage.getItem('nx_me_id') || '0', 10) || null;
    }

    function buildNav() {
        var meId = cachedMeId();
        var wrap = document.createElement('div');
        wrap.className = 'navbar-wrapper-main';
        wrap.dataset[LEGACY_MARKER] = '1';

        var nav = document.createElement('div');
        nav.className = 'nx-nav';

        var inner = document.createElement('div');
        inner.className = 'nx-nav-inner';

        var logo = document.createElement('div');
        logo.className = 'nx-nav-logo';
        logo.addEventListener('click', function() { window.location.href = '/home'; });
        inner.appendChild(logo);

        var links = document.createElement('div');
        links.className = 'nx-nav-links';
        [['Games', '/games'], ['Catalog', '/catalog'], ['Develop', '/develop']].forEach(function(l) {
            var a = document.createElement('a');
            a.className = 'nx-nav-link';
            a.textContent = l[0];
            a.href = l[1];
            links.appendChild(a);
        });
        var nexusLink = document.createElement('span');
        nexusLink.className = 'nx-nav-link';
        nexusLink.textContent = 'Nexus';
        nexusLink.dataset.nxRenamed = '1';
        links.appendChild(nexusLink);
        inner.appendChild(links);

        var search = document.createElement('div');
        search.className = 'nx-nav-search';
        var input = document.createElement('input');
        input.type = 'text';
        input.placeholder = 'Search';
        input.addEventListener('keydown', function(e) {
            if (e.key !== 'Enter') return;
            var q = input.value.trim();
            if (!q) return;
            window.location.href = '/search/users?keyword=' + encodeURIComponent(q);
        });
        search.appendChild(input);
        var searchIcon = document.createElement('span');
        searchIcon.className = 'icon-nav-search';
        search.appendChild(searchIcon);
        inner.appendChild(search);

        var spacer = document.createElement('div');
        spacer.className = 'nx-nav-spacer';
        inner.appendChild(spacer);

        var auth = document.createElement('div');
        auth.className = 'nx-nav-auth';

        if (meId) {
            var robuxA = document.createElement('a');
            robuxA.className = 'nx-nav-auth-link';
            robuxA.href = '/transactions';
            var robuxIcon = document.createElement('span');
            robuxIcon.className = 'icon-nav-robux';
            robuxA.appendChild(robuxIcon);
            auth.appendChild(robuxA);

            var bal = document.createElement('span');
            bal.className = 'nx-nav-balance';
            bal.textContent = '0';
            auth.appendChild(bal);

            var settingsWrap = document.createElement('div');
            settingsWrap.className = 'nx-nav-settings-wrap';
            var settingsToggle = document.createElement('span');
            settingsToggle.className = 'nx-nav-auth-link';
            var settingsIcon = document.createElement('span');
            settingsIcon.className = 'icon-nav-settings';
            settingsToggle.appendChild(settingsIcon);
            settingsWrap.appendChild(settingsToggle);

            var menu = document.createElement('div');
            menu.className = 'nx-nav-settings-menu';
            menu.style.display = 'none';
            [['Settings', '/my/account'], ['Help', '/help']].forEach(function(item) {
                var a = document.createElement('a');
                a.textContent = item[0];
                a.href = item[1];
                menu.appendChild(a);
            });
            var logout = document.createElement('a');
            logout.textContent = 'Logout';
            logout.href = '#';
            logout.addEventListener('click', function(e) {
                e.preventDefault();
                window.location.href = '/auth/logout';
            });
            menu.appendChild(logout);
            settingsWrap.appendChild(menu);

            settingsToggle.addEventListener('click', function(e) {
                e.preventDefault();
                menu.style.display = menu.style.display === 'none' ? 'block' : 'none';
            });
            document.addEventListener('click', function(e) {
                if (!settingsWrap.contains(e.target)) menu.style.display = 'none';
            });

            auth.appendChild(settingsWrap);
        } else {
            var signup = document.createElement('a');
            signup.className = 'nx-nav-auth-link';
            signup.textContent = 'Sign Up';
            signup.href = '/signup';
            auth.appendChild(signup);

            var login = document.createElement('a');
            login.className = 'nx-nav-auth-link';
            login.textContent = 'Login';
            login.href = '/login';
            auth.appendChild(login);
        }

        inner.appendChild(auth);
        nav.appendChild(inner);
        wrap.appendChild(nav);

        return wrap;
    }

    function buildFooter() {
        var wrap = document.createElement('footer');
        wrap.className = 'nx-footer';

        var inner = document.createElement('div');
        inner.className = 'nx-footer-inner';

        var links = document.createElement('div');
        links.className = 'nx-footer-links';
        [['About Us', '/about-us'], ['Jobs', '/jobs'], ['Blog', '/info/blog'], ['Privacy', '/privacy'], ['Help', '/help']].forEach(function(l) {
            var a = document.createElement('a');
            a.textContent = l[0];
            a.href = l[1];
            links.appendChild(a);
        });
        inner.appendChild(links);

        var legal = document.createElement('p');
        legal.className = 'nx-footer-legal';
        legal.innerHTML = 'ROBLOX, "Online Building Toy", characters, logos, names, and all related indicia are trademarks of <a href="https://corp.roblox.com">ROBLOX Corporation</a>, ©2016. Patents pending. ROBLOX is not sponsored, authorized or endorsed by any producer of plastic building bricks, including The LEGO Group, MEGA Brands, and K\'Nex, and no resemblance to the products of these companies is intended. Use of this site signifies your acceptance of the <a href="/terms-and-conditions">Terms and Conditions</a>.';
        inner.appendChild(legal);

        wrap.appendChild(inner);
        return wrap;
    }

    function applyNav() {
        var existing = document.querySelector('.navbar-wrapper-main');
        if (!existing) return;
        if (existing.dataset[LEGACY_MARKER]) return;
        var newNav = buildNav();
        existing.parentNode.replaceChild(newNav, existing);
    }

    function applyFooter() {
        var existing = document.querySelector('footer[class*="footer-"]');
        if (!existing) return;
        if (existing.classList.contains('nx-footer')) return;
        var newFooter = buildFooter();
        existing.parentNode.replaceChild(newFooter, existing);
    }

    function replaceText(root) {
        if (!root) return;
        var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
            acceptNode: function(node) {
                if (!node.nodeValue || node.nodeValue.indexOf('Aisaka') === -1) return NodeFilter.FILTER_REJECT;
                var p = node.parentNode;
                if (!p) return NodeFilter.FILTER_REJECT;
                var tag = p.tagName;
                if (tag === 'SCRIPT' || tag === 'STYLE' || tag === 'NOSCRIPT') return NodeFilter.FILTER_REJECT;
                return NodeFilter.FILTER_ACCEPT;
            }
        });
        var nodes = [];
        while (walker.nextNode()) nodes.push(walker.currentNode);
        nodes.forEach(function(n) { n.nodeValue = n.nodeValue.split('Aisaka').join('Caelus'); });
    }

    function replaceAttributes(root) {
        if (!root || !root.querySelectorAll) return;
        root.querySelectorAll('[title],[alt],[placeholder],[aria-label]').forEach(function(node) {
            ['title', 'alt', 'placeholder', 'aria-label'].forEach(function(attr) {
                var v = node.getAttribute(attr);
                if (v && v.indexOf('Aisaka') !== -1) {
                    node.setAttribute(attr, v.split('Aisaka').join('Caelus'));
                }
            });
        });
    }

    function applyAll() {
        setBodyBackground();
        applyNav();
        applyFooter();
        replaceText(document.body);
        replaceAttributes(document.body);
        if (document.title && document.title.indexOf('Aisaka') !== -1) {
            document.title = document.title.split('Aisaka').join('Caelus');
        }
    }

    var observer = null;
    var titleTimer = null;

    function startObserver() {
        if (observer) return;
        observer = new MutationObserver(function() {
            if (observer._scheduled) return;
            observer._scheduled = true;
            requestAnimationFrame(function() {
                observer._scheduled = false;
                applyAll();
            });
        });
        observer.observe(document.body, { childList: true, subtree: true, characterData: true });

        if (!titleTimer) {
            titleTimer = setInterval(function() {
                if (document.title && document.title.indexOf('Aisaka') !== -1) {
                    document.title = document.title.split('Aisaka').join('Caelus');
                }
            }, 500);
        }
    }

    function teardown() {
        if (observer) { observer.disconnect(); observer = null; }
        if (titleTimer) { clearInterval(titleTimer); titleTimer = null; }
        var css = document.getElementById(CSS_ID);
        if (css) css.remove();
        if (document.body) document.body.setAttribute('style', 'background: #f2f4f5');
    }

    window.NX.features.legacyTheme = {
        apply: function() {
            ensureStyle();
            applyAll();
            startObserver();
        },
        teardown: teardown
    };

})();
