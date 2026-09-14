(function() {
    'use strict';

    window.NX = window.NX || {};
    window.NX.features = window.NX.features || {};

    var CSS_ID = 'nx-legacy-theme-style';
    var LEGACY_MARKER = 'nxLegacyNav';

    var CSS = [
        'html,body{background:#e3e3e3 !important;font-family:Helvetica,Arial,sans-serif !important;color:#333 !important}',

        '.nx-legacy-nav{background:#2b6ab5 !important;position:fixed;top:0;left:0;right:0;z-index:1030;height:44px}',
        '.nx-legacy-nav .navContainer{max-width:1140px;margin:0 auto;padding:0 15px;height:44px}',
        '.nx-legacy-nav .row{margin:0;height:44px}',
        '.nx-legacy-nav .col-12{padding:0}',
        '.nx-legacy-nav .openSideNavMobile{display:none}',
        '.nx-legacy-nav .imgDesktop{background:url("/img/logo.png") no-repeat left center;background-size:contain;height:44px;width:110px;display:block}',
        '.nx-legacy-nav .imgMobileWrapper{display:none}',
        '.nx-legacy-nav .container-0-2-12{height:44px}',
        '.nx-legacy-nav .container-0-2-12 .row{display:flex;align-items:center;height:44px}',
        '.nx-legacy-nav .container-0-2-12 .col-3{padding:0 20px 0 0;flex:0 0 auto;max-width:none;text-align:left}',
        '.nx-legacy-nav .linkEntry{color:#fff !important;text-decoration:none !important;font-size:14px;font-weight:500;display:inline-block;padding:12px 0;line-height:20px;white-space:nowrap}',
        '.nx-legacy-nav .linkEntry:hover{color:#e2e2e2 !important;text-decoration:none !important}',
        '.nx-legacy-nav .wrapper-0-2-16{position:relative;width:100%;margin-top:7px}',
        '.nx-legacy-nav .searchInput{width:100%;height:30px;background:#fff;border:0;color:#333;border-radius:0;padding:0 30px 0 10px;font-size:13px;outline:0}',
        '.nx-legacy-nav .icon-nav-search{position:absolute;right:9px;top:7px;color:#999;font-size:14px;pointer-events:none}',
        '.nx-legacy-nav .text-0-2-67{margin:0;font-size:14px;line-height:44px;text-align:center}',
        '.nx-legacy-nav .text-0-2-67 a{color:#fff !important;text-decoration:none !important;cursor:pointer}',
        '.nx-legacy-nav .text-0-2-67 a:hover{color:#e2e2e2 !important}',
        '.nx-legacy-nav .spacer-right{display:flex;justify-content:flex-end;gap:24px;padding-right:8px}',

        '.nx-legacy-footer{background:#2b6ab5 !important;color:#fff !important;padding:24px 0 12px;margin-top:40px}',
        '.nx-legacy-footer .footerContainer{max-width:1140px;margin:0 auto;padding:0 15px}',
        '.nx-legacy-footer .row{display:flex;flex-wrap:wrap;margin:0 -8px}',
        '.nx-legacy-footer .col-2{flex:0 0 16.666%;max-width:16.666%;padding:0 8px 8px}',
        '.nx-legacy-footer .text-0-2-32{color:#fff !important;font-size:13px;margin:0;line-height:1.4}',
        '.nx-legacy-footer .link-0-2-33{color:#fff !important;text-decoration:none;font-weight:500}',
        '.nx-legacy-footer .link-0-2-33:hover{color:#cce4ff !important;text-decoration:none}',
        '.nx-legacy-footer .disclaimer{margin-top:16px;padding:0 8px;color:#dbe8f7 !important;font-size:12px;line-height:1.4}',
        '.nx-legacy-footer .disclaimer a{color:#fff !important}',

        '.nx-legacy-nav + .fakeAlert-0-2-41{display:none !important}',
        '.fakeAlert-0-2-41{display:none !important}',

        'body::before{content:"";display:block;height:44px}',

        'h1,h2,h3,h4,h5{font-family:Helvetica,Arial,sans-serif !important;color:#333 !important;font-weight:400 !important}',
        'h1{font-size:34px !important}',
        'h2{font-size:23px !important}',
        'h3{font-size:20px !important}',
        'a{color:#2b6ab5}',
        'a:hover{color:#1d4a80}',

        '.card{border-radius:0 !important;box-shadow:none !important;border:1px solid #c3c3c3 !important;background:#fff !important}',
        '[class*="card-0-2-"]{border-radius:0 !important;box-shadow:none !important;background:#fff !important;border:1px solid #c3c3c3 !important}',

        '.btn,.btn-primary,[class*="btn-0-2-"]{border-radius:0 !important;background:#2b6ab5 !important;color:#fff !important;border:1px solid #2b6ab5 !important;font-weight:500 !important;padding:6px 16px !important}',
        '.btn:hover,.btn-primary:hover,[class*="btn-0-2-"]:hover{background:#1d4a80 !important;border-color:#1d4a80 !important}',

        'input:not([type="checkbox"]):not([type="radio"]),select,textarea{border-radius:0 !important;border:1px solid #999 !important;background:#fff !important;color:#333 !important;font-family:Helvetica,Arial,sans-serif !important}',

        '.container{max-width:1140px !important}',

        '.main-0-2-45{background:#e3e3e3 !important}',

        'table{border-collapse:collapse !important}',
        'table th{background:#e3e3e3 !important;color:#555 !important;font-weight:600 !important;border-bottom:2px solid #c3c3c3 !important;padding:6px 8px !important;font-size:13px !important;text-transform:none !important}',
        'table td{border-bottom:1px solid #d9d9d9 !important;padding:6px 8px !important;font-size:13px !important}',

        '::-webkit-scrollbar{width:12px;height:12px}',
        '::-webkit-scrollbar-track{background:#e3e3e3}',
        '::-webkit-scrollbar-thumb{background:#b8b8b8;border:2px solid #e3e3e3}',

        '@media(max-width:991px){',
        '.nx-legacy-nav{height:auto}',
        '.nx-legacy-nav .navContainer{height:auto}',
        '.nx-legacy-nav .imgDesktop{display:none}',
        '.nx-legacy-nav .imgMobileWrapper{display:block;height:44px;width:80px}',
        '.nx-legacy-nav .imgMobile{background:url("/img/logo.png") no-repeat left center;background-size:contain;height:44px;width:80px}',
        '.nx-legacy-nav .container-0-2-12 .col-3{display:none}',
        '.nx-legacy-nav .wrapper-0-2-16{margin:7px 8px}',
        '.nx-legacy-footer .col-2{flex:0 0 50%;max-width:50%}',
        '}'
    ].join('');

    var NAV_HTML_TOP = [
        '<div class="wrapper-0-2-5 navbar-wrapper-main">',
            '<nav class="navbar fixed-top navbar-expand-lg navbar-0-2-1 navbar-d0-0-2-6">',
                '<div class="navContainer-0-2-2 container">',
                    '<div class="row-0-2-4 row">',
                        '<div class="col-12 col-lg-8">',
                            '<div class="row-0-2-4 row">',
                                '<div class="col-0-2-10 col-2 col-lg-2">',
                                    '<div class="openSideNavMobile-0-2-11 icon-menu"></div>',
                                    '<div class="imgDesktop-0-2-7" data-nx-logo="1" style="cursor:pointer"></div>',
                                    '<div class="imgMobileWrapper-0-2-9">',
                                        '<div class="imgMobile-0-2-8" data-nx-logo="1" style="cursor:pointer"></div>',
                                    '</div>',
                                '</div>',
                                '<div class="col-0-2-15 col-10 col-lg-5">',
                                    '<div class="container-0-2-12">',
                                        '<div class="row">',
                                            '<div class="col-3"><a class="linkEntry-0-2-13 nav-link active pt-0" href="/games">Games</a></div>',
                                            '<div class="col-3"><a class="linkEntry-0-2-13 nav-link active pt-0" href="/catalog">Catalog</a></div>',
                                            '<div class="col-3"><a class="linkEntry-0-2-13 nav-link active pt-0" href="/develop">Develop</a></div>',
                                            '<div class="col-3"><a class="linkEntry-0-2-13 nav-link active pt-0" href="/transactions">Robux</a></div>',
                                        '</div>',
                                    '</div>',
                                '</div>',
                                '<div class="col-12 col-lg-5">',
                                    '<div style="width:100%">',
                                        '<div class="wrapper-0-2-16">',
                                            '<input value="" class="form-control searchInput-0-2-17" placeholder="Search">',
                                            '<span class="icon-0-2-18 icon-nav-search"></span>',
                                        '</div>',
                                    '</div>',
                                '</div>',
                            '</div>',
                        '</div>'
    ].join('');

    var NAV_HTML_BOTTOM = [
                    '</div>',
                '</div>',
            '</nav>',
        '</div>'
    ].join('');

    var FOOTER_HTML = [
        '<footer class="footer-0-2-34 nx-legacy-footer">',
            '<div class="container mt-4 mb-0 footerContainer-0-2-35">',
                '<div class="row">',
                    '<div class="col-2 mb-2"><h2 class="text-0-2-32 link-0-2-33"><a class="text-0-2-32 link-0-2-33" href="/about-us">About Us</a></h2></div>',
                    '<div class="col-2 mb-2"><h2 class="text-0-2-32 link-0-2-33"><a class="text-0-2-32 link-0-2-33" href="/jobs">Jobs</a></h2></div>',
                    '<div class="col-2 mb-2"><h2 class="text-0-2-32 link-0-2-33"><a class="text-0-2-32 link-0-2-33" href="/info/blog">Blog</a></h2></div>',
                    '<div class="col-2 mb-2"><h2 class="text-0-2-32 link-0-2-33"><a class="text-0-2-32 link-0-2-33" href="/privacy">Privacy</a></h2></div>',
                    '<div class="col-2 mb-2"><h2 class="text-0-2-32 link-0-2-33"><a class="text-0-2-32 link-0-2-33" href="/help">Help</a></h2></div>',
                    '<div class="col-12 disclaimer"><p class="text-0-2-32">Caelus, "Online Building Toy", characters, logos, names, and all related indicia are trademarks of <a href="https://corp.roblox.com/">ROBLOX Corporation</a>, ©2016. Patents pending. ROBLOX is not sponsored, authorized or endorsed by any producer of plastic building bricks, including The LEGO Group, MEGA Brands, and K\'Nex, and no resemblance to the products of these companies is intended. Use of this site signifies your acceptance of the <a href="/terms-and-conditions">Terms and Conditions</a>.</p></div>',
                '</div>',
            '</div>',
        '</footer>'
    ].join('');

    function ensureStyle() {
        if (document.getElementById(CSS_ID)) return;
        var s = document.createElement('style');
        s.id = CSS_ID;
        s.textContent = CSS;
        document.head.appendChild(s);
    }

    function stripInlineBodyStyle() {
        if (!document.body) return;
        document.body.removeAttribute('style');
    }

    function loggedInUser() {
        try {
            var me = window.__NEXT_DATA__
                && window.__NEXT_DATA__.props
                && window.__NEXT_DATA__.props.pageProps
                && window.__NEXT_DATA__.props.pageProps.user;
            if (me && me.id) return me;
        } catch (e) {}
        var link = document.querySelector('a[href*="/users/"][href$="/profile"]');
        if (link) {
            var m = (link.getAttribute('href') || '').match(/\/users\/(\d+)\/profile/);
            if (m) return { id: parseInt(m[1], 10) };
        }
        return null;
    }

    function rightColumn() {
        var user = loggedInUser();
        if (!user) {
            return [
                '<div class="col-12 col-lg-4">',
                    '<div class="row">',
                        '<div class="col-6 offset-6">',
                            '<div class="row">',
                                '<div class="col-6"><p class="text-0-2-67"><a class="link-0-2-68" href="/signup">Sign Up</a></p></div>',
                                '<div class="col-6"><p class="text-0-2-67"><a class="link-0-2-68" href="/login">Login</a></p></div>',
                            '</div>',
                        '</div>',
                    '</div>',
                '</div>'
            ].join('');
        }
        return [
            '<div class="col-12 col-lg-4">',
                '<div class="row">',
                    '<div class="col-12">',
                        '<div class="spacer-right">',
                            '<p class="text-0-2-67"><a class="link-0-2-68" href="/users/' + user.id + '/profile">Profile</a></p>',
                            '<p class="text-0-2-67"><a class="link-0-2-68" href="/my/messages">Messages</a></p>',
                            '<p class="text-0-2-67"><a class="link-0-2-68" href="/trades">Trade</a></p>',
                            '<p class="text-0-2-67"><a class="link-0-2-68" data-nx-renamed="1" href="/transactions" style="cursor:pointer">Robux</a></p>',
                        '</div>',
                    '</div>',
                '</div>',
            '</div>'
        ].join('');
    }

    function applyLegacyNav() {
        var existing = document.querySelector('.navbar-wrapper-main');
        if (!existing) return;
        if (existing.dataset[LEGACY_MARKER]) return;

        var wrapper = document.createElement('div');
        wrapper.innerHTML = NAV_HTML_TOP + rightColumn() + NAV_HTML_BOTTOM;
        var newNav = wrapper.firstChild;

        existing.parentNode.replaceChild(newNav, existing);
        newNav.dataset[LEGACY_MARKER] = '1';

        newNav.querySelectorAll('[data-nx-logo="1"]').forEach(function(logo) {
            logo.addEventListener('click', function() { window.location.href = '/home'; });
        });

        var search = newNav.querySelector('.searchInput-0-2-17');
        if (search) {
            search.addEventListener('keydown', function(e) {
                if (e.key !== 'Enter') return;
                var q = (e.currentTarget.value || '').trim();
                if (!q) return;
                window.location.href = '/search/users?keyword=' + encodeURIComponent(q);
            });
        }
    }

    function applyLegacyFooter() {
        var existing = document.querySelector('footer.footer-0-2-59, footer.footer-0-2-75, footer[class*="footer-"]');
        if (!existing) return;
        if (existing.classList.contains('nx-legacy-footer')) return;
        var wrapper = document.createElement('div');
        wrapper.innerHTML = FOOTER_HTML;
        existing.parentNode.replaceChild(wrapper.firstChild, existing);
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
        stripInlineBodyStyle();
        applyLegacyNav();
        applyLegacyFooter();
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
        if (document.body && !document.body.getAttribute('style')) {
            document.body.setAttribute('style', 'background: #f2f4f5');
        }
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
