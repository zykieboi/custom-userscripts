(function() {
    'use strict';

    window.NX = window.NX || {};
    window.NX.features = window.NX.features || {};

    var CSS_ID = 'nx-legacy-theme-style';
    var LEGACY_MARKER = 'nxLegacyNav';

    var ROBLOX_BLUE = '#0074BD';
    var TEXT_DARK = '#191919';
    var TEXT_MUTED = '#B8B8B8';
    var DIVIDER = '#c3c3c3';
    var BODY_BG = '#e3e3e3';

    var CSS = [
        '@import url("https://fonts.googleapis.com/css2?family=Source+Sans+Pro:ital,wght@0,200;0,300;0,400;0,600;0,700;0,900;1,200;1,300;1,400;1,600;1,700;1,900&display=swap");',

        'html,body{padding:0;margin:0;font-family:"Source Sans Pro",Arial,Helvetica,sans-serif !important;font-size:14px;min-height:100vh;line-height:normal !important}',
        'html,body{background:' + BODY_BG + ' !important}',
        '*{box-sizing:border-box}',
        'html{width:100%;overflow-x:hidden}',

        'a{color:#0055b3;text-decoration:none !important;cursor:pointer}',
        'a:hover{text-decoration:none !important}',
        'a.nav-link:focus,a.nav-link:hover{color:white}',

        'h1,h2,h3,h4,h5,h6{color:' + TEXT_DARK + ';line-height:normal;font-family:"Source Sans Pro",Arial,Helvetica,sans-serif !important}',
        'h1{font-size:34px !important;font-weight:400 !important}',
        'h2{font-size:23px !important;font-weight:400 !important}',
        'h3{font-size:20px !important;font-weight:400 !important}',
        'p,span,li,ul,ol,div{line-height:normal}',

        'div.container{max-width:970px !important}',

        '.divider-right{border-right:1px solid ' + DIVIDER + '}',
        '.divider-top,.divider-bottom{border-top:1px solid ' + DIVIDER + '}',
        '.divider-top-thick{border-top:2px solid ' + DIVIDER + '}',
        '.divider-light{border-color:#ebebeb}',
        '.br-none{border-radius:0 !important}',
        '.cursor-pointer{cursor:pointer}',
        '.truncate{white-space:nowrap;overflow-x:hidden;text-overflow:ellipsis}',

        '.nx-legacy-nav{background:' + ROBLOX_BLUE + ' !important;padding-top:6px;padding-bottom:3px}',
        '.nx-legacy-nav .container{max-width:100% !important;padding-top:0;padding-bottom:0}',
        '.nx-legacy-nav .row{width:100%;margin:0}',
        '.nx-legacy-nav .logo-col{max-width:140px;padding-left:15px}',
        '.nx-legacy-nav .openSideNavMobile{display:none}',
        '.nx-legacy-nav .imgDesktop{width:118px;height:30px;background-image:url("/img/roblox_logo.svg");background-size:118px 30px;display:none}',
        '.nx-legacy-nav .imgMobile{background-image:url("/img/logo_R.svg");width:30px;height:30px;display:block;background-size:30px}',
        '.nx-legacy-nav .imgMobileWrapper{margin-left:40px}',
        '.nx-legacy-nav .navLinksCol{padding-left:0;margin-left:0}',
        '.nx-legacy-nav .navLinksContainer{margin-top:3px;margin-bottom:0;padding-bottom:0;padding-left:0}',
        '.nx-legacy-nav .linkEntry{color:#fff !important;font-weight:400;margin-bottom:0;padding-bottom:0;text-align:center;font-size:16px;text-decoration:none;padding:4px 8px;transition:none}',
        '.nx-legacy-nav .linkEntry:hover{color:#fff !important;background:rgba(25,25,25,0.1);cursor:pointer;border-radius:4px;transition:none}',
        '.nx-legacy-nav .navItem{padding-right:2rem}',

        '.nx-legacy-nav .searchWrap{padding:4px 2px;background:#fff;border-radius:2px;border:1px solid ' + DIVIDER + ';width:100%;position:relative}',
        '.nx-legacy-nav .searchInput{width:100%;border:none !important;padding-top:0;padding-bottom:0;background:#fff !important;color:#333 !important;font-size:14px !important;height:auto !important;border-radius:0 !important;box-shadow:none !important;padding-left:8px}',
        '.nx-legacy-nav .searchInput:focus{border:none !important;box-shadow:none !important;outline:none !important}',
        '.nx-legacy-nav .icon-nav-search{float:right;margin-top:-24px;padding-top:0;margin-right:4px;color:#666}',

        '.nx-legacy-nav .authText{color:#fff;font-weight:400;font-size:16px;border-bottom:0;margin-top:2px;margin-bottom:0;text-align:right;white-space:nowrap;display:inline}',
        '.nx-legacy-nav .authLink{color:#fff !important;text-decoration:none;padding:4px 8px;display:inline-block}',
        '.nx-legacy-nav .authLink:hover{color:#fff !important;background:rgba(25,25,25,0.1);cursor:pointer;border-radius:4px}',
        '.nx-legacy-nav .settingsIcon{float:right}',
        '.nx-legacy-nav .linkContainerCol{max-width:250px;float:right}',
        '.nx-legacy-nav .robuxText{margin-right:20px;margin-left:5px}',

        '.nx-legacy-nav .settingsDropdown{width:125px;position:absolute;top:45px;right:10px;box-shadow:0 -5px 20px rgba(25,25,25,0.15);user-select:none;background:#fff;z-index:1100}',
        '.nx-legacy-nav .settingsDropdown p{padding:10px;margin-bottom:0;font-size:16px;color:#191919;cursor:pointer}',
        '.nx-legacy-nav .settingsDropdown p:hover{background:#eaeaea;border-left:4px solid ' + ROBLOX_BLUE + ';margin-left:-4px;padding-left:6px}',

        '.nx-legacy-footer{background:#fff !important;color:' + TEXT_MUTED + ' !important}',
        '.nx-legacy-footer .footerContainer{padding-top:5px;padding-bottom:20px}',
        '.nx-legacy-footer .fText{color:' + TEXT_MUTED + ' !important;font-size:12px;font-weight:400}',
        '.nx-legacy-footer .fLink{font-size:21px !important;text-align:center;font-weight:300;text-decoration:none;color:' + TEXT_MUTED + ' !important}',
        '.nx-legacy-footer .fLink:hover{color:' + TEXT_DARK + ' !important}',

        '.nx-legacy-main{min-height:95vh}',

        '.nx-legacy-nav-wrapper{margin-bottom:40px;max-width:100vw;overflow:auto}',

        '.adWrapper-0-2-106,.adWrapper-0-2-90,[class*="adWrapper-"]{display:none !important}',

        '@media(min-width:1301px){',
        '.nx-legacy-nav .imgDesktop{display:block}',
        '.nx-legacy-nav .imgMobileWrapper{display:none}',
        '}',
        '@media(max-width:1300px){',
        '.nx-legacy-nav .openSideNavMobile{display:block;float:left;height:30px;width:30px;cursor:pointer;color:#fff;margin-right:12px}',
        '.nx-legacy-nav-wrapper{margin-bottom:98px}',
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

    function readNextData() {
        try {
            return window.__NEXT_DATA__ && window.__NEXT_DATA__.props && window.__NEXT_DATA__.props.pageProps;
        } catch (e) { return null; }
    }

    function loggedInUser() {
        var data = readNextData();
        if (data && data.user && data.user.id) return data.user;
        if (data && data.userId) return { id: data.userId, name: data.username || data.name || '' };

        var link = document.querySelector('a[href*="/users/"][href*="/profile"]');
        if (link) {
            var m = (link.getAttribute('href') || '').match(/\/users\/(\d+)\/profile/);
            if (m) {
                var cached = parseInt(localStorage.getItem('nx_me_id') || '0', 10);
                var id = parseInt(m[1], 10);
                if (cached && cached === id) return { id: id };
            }
        }

        var cached = parseInt(localStorage.getItem('nx_me_id') || '0', 10);
        if (cached) return { id: cached };

        return null;
    }

    function authArea() {
        var user = loggedInUser();
        if (!user) {
            return [
                '<div class="col-12 col-lg-4">',
                    '<div class="row">',
                        '<div class="col-6 offset-6">',
                            '<div class="row">',
                                '<div class="col-6"><p class="authText"><a class="authLink" href="/signup">Sign Up</a></p></div>',
                                '<div class="col-6"><p class="authText"><a class="authLink" href="/login">Login</a></p></div>',
                            '</div>',
                        '</div>',
                    '</div>',
                '</div>'
            ].join('');
        }
        return [
            '<div class="col-12 col-lg-4">',
                '<div class="linkContainerCol">',
                    '<div class="row">',
                        '<div class="col-12">',
                            '<p class="authText"><a class="authLink" href="/transactions" data-nx-renamed="1" style="cursor:pointer"><span class="icon-nav-robux"></span></a></p>',
                            '<p class="authText robuxText"><span>0</span></p>',
                            '<p class="authText"><a class="authLink" id="nx-legacy-settings-toggle"><span class="icon-nav-settings settingsIcon"></span></a></p>',
                            '<div class="settingsDropdown" id="nx-legacy-settings-menu" style="display:none">',
                                '<p><a href="/my/account">Settings</a></p>',
                                '<p><a href="/help">Help</a></p>',
                                '<p><a id="nx-legacy-logout">Logout</a></p>',
                            '</div>',
                        '</div>',
                    '</div>',
                '</div>',
            '</div>'
        ].join('');
    }

    function navMarkup() {
        return [
            '<div class="nx-legacy-nav-wrapper navbar-wrapper-main">',
                '<nav class="navbar fixed-top navbar-expand-lg nx-legacy-nav">',
                    '<div class="container">',
                        '<div class="row">',
                            '<div class="col-12 col-lg-8">',
                                '<div class="row">',
                                    '<div class="col-2 col-lg-2 logo-col">',
                                        '<div class="openSideNavMobile icon-menu"></div>',
                                        '<div class="imgDesktop" data-nx-logo="1" style="cursor:pointer"></div>',
                                        '<div class="imgMobileWrapper"><div class="imgMobile" data-nx-logo="1" style="cursor:pointer"></div></div>',
                                    '</div>',
                                    '<div class="col-10 col-lg-5 navLinksCol">',
                                        '<div class="navLinksContainer">',
                                            '<div class="row">',
                                                '<div class="col-3"><a class="linkEntry nav-link active pt-0" href="/games">Games</a></div>',
                                                '<div class="col-3"><a class="linkEntry nav-link active pt-0" href="/catalog">Catalog</a></div>',
                                                '<div class="col-3"><a class="linkEntry nav-link active pt-0" href="/develop">Develop</a></div>',
                                                '<div class="col-3"><a class="linkEntry nav-link active pt-0" href="/transactions">ROBUX</a></div>',
                                            '</div>',
                                        '</div>',
                                    '</div>',
                                    '<div class="col-12 col-lg-5">',
                                        '<div style="width:100%">',
                                            '<div class="searchWrap">',
                                                '<input value="" class="form-control searchInput" placeholder="Search">',
                                                '<span class="icon-nav-search"></span>',
                                            '</div>',
                                        '</div>',
                                    '</div>',
                                '</div>',
                            '</div>',
                            authArea(),
                        '</div>',
                    '</div>',
                '</nav>',
            '</div>'
        ].join('');
    }

    var FOOTER_HTML = [
        '<footer class="nx-legacy-footer">',
            '<div class="container mt-4 mb-0 footerContainer">',
                '<div class="row">',
                    '<div class="col-2 mb-2"><h2 class="fText fLink"><a class="fText fLink" href="/about-us">About Us</a></h2></div>',
                    '<div class="col-2 mb-2"><h2 class="fText fLink"><a class="fText fLink" href="/jobs">Jobs</a></h2></div>',
                    '<div class="col-2 mb-2"><h2 class="fText fLink"><a class="fText fLink" href="/info/blog">Blog</a></h2></div>',
                    '<div class="col-2 mb-2"><h2 class="fText fLink"><a class="fText fLink" href="/privacy">Privacy</a></h2></div>',
                    '<div class="col-2 mb-2"><h2 class="fText fLink"><a class="fText fLink" href="/help">Help</a></h2></div>',
                    '<div class="col-12 col-lg-10 offset-lg-1">',
                        '<p class="fText">ROBLOX, "Online Building Toy", characters, logos, names, and all related indicia are trademarks of <a href="https://corp.roblox.com"> ROBLOX Corporation</a>, ©2016. Patents pending. ROBLOX is not sponsored, authorized or endorsed by any producer of plastic building bricks, including The LEGO Group, MEGA Brands, and K\'Nex, and no resemblance to the products of these companies is intended. Use of this site signifies your acceptance of the <a href="/terms-and-conditions">Terms and Conditions</a>.</p>',
                    '</div>',
                '</div>',
            '</div>',
        '</footer>'
    ].join('');

    function applyNav() {
        var existing = document.querySelector('.navbar-wrapper-main');
        if (!existing) return;
        if (existing.dataset[LEGACY_MARKER]) return;

        var wrapper = document.createElement('div');
        wrapper.innerHTML = navMarkup();
        var newNav = wrapper.firstChild;
        existing.parentNode.replaceChild(newNav, existing);
        newNav.dataset[LEGACY_MARKER] = '1';

        newNav.querySelectorAll('[data-nx-logo="1"]').forEach(function(logo) {
            logo.addEventListener('click', function() { window.location.href = '/home'; });
        });

        var search = newNav.querySelector('.searchInput');
        if (search) {
            search.addEventListener('keydown', function(e) {
                if (e.key !== 'Enter') return;
                var q = (e.currentTarget.value || '').trim();
                if (!q) return;
                window.location.href = '/search/users?keyword=' + encodeURIComponent(q);
            });
        }

        var toggle = newNav.querySelector('#nx-legacy-settings-toggle');
        var menu = newNav.querySelector('#nx-legacy-settings-menu');
        if (toggle && menu) {
            toggle.addEventListener('click', function(e) {
                e.preventDefault();
                menu.style.display = menu.style.display === 'none' ? 'block' : 'none';
            });
            document.addEventListener('click', function(e) {
                if (!menu.contains(e.target) && e.target !== toggle) menu.style.display = 'none';
            });
        }
    }

    function applyFooter() {
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
