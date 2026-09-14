// ==UserScript==
// @name         Nexus - NX
// @namespace    https://github.com/zykieboi/custom-userscripts
// @version      5.5
// @icon         https://github.com/zykieboi/custom-userscripts/blob/main/img/icon.png?raw=true
// @author       zykieboi
// @description  Testing stuff :)
// @match        https://www.aisaka.me/*
// @match        aisaka.me/*
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_addStyle
// @run-at       document-end
// @require      https://raw.githubusercontent.com/zykieboi/custom-userscripts/main/src/core/settings.js
// @require      https://raw.githubusercontent.com/zykieboi/custom-userscripts/main/src/core/csrf.js
// @require      https://raw.githubusercontent.com/zykieboi/custom-userscripts/main/src/features/remove-ads.js
// @require      https://raw.githubusercontent.com/zykieboi/custom-userscripts/main/src/features/hide-alert.js
// @require      https://raw.githubusercontent.com/zykieboi/custom-userscripts/main/src/features/rap.js
// @require      https://raw.githubusercontent.com/zykieboi/custom-userscripts/main/src/features/inventory-search.js
// @require      https://raw.githubusercontent.com/zykieboi/custom-userscripts/main/src/features/bulk-unfriend.js
// @require      https://raw.githubusercontent.com/zykieboi/custom-userscripts/main/src/features/trade-2020.js
// @require      https://raw.githubusercontent.com/zykieboi/custom-userscripts/main/src/features/legacy-theme.js
// @require      https://raw.githubusercontent.com/zykieboi/custom-userscripts/main/src/ui/modal.js
// @downloadURL  https://raw.githubusercontent.com/zykieboi/custom-userscripts/main/main.user.js
// @updateURL    https://raw.githubusercontent.com/zykieboi/custom-userscripts/main/main.user.js
// ==/UserScript==

(function() {
    'use strict';

    var style = document.createElement('style');
    style.textContent = `
        #nx-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.6);
            z-index: 999999;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        #nx-modal {
            background: #232527;
            border-radius: 12px;
            width: 90%;
            max-width: 520px;
            max-height: 78vh;
            color: #e0e0e0;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            border: 1px solid #343638;
            box-shadow: 0 20px 60px rgba(0,0,0,0.5);
            display: flex;
            flex-direction: column;
            overflow: hidden;
        }
        #nx-modal .nx-header {
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
            padding: 22px 26px 14px;
            border-bottom: 1px solid #343638;
            flex-shrink: 0;
        }
        #nx-modal .title-block {
            display: flex;
            flex-direction: column;
        }
        #nx-modal h2 {
            margin: 0;
            font-size: 22px;
            font-weight: 600;
            color: #fff;
            letter-spacing: -0.2px;
        }
        #nx-modal .sub {
            color: #7a7d80;
            font-size: 13px;
            margin-top: 3px;
        }
        #nx-modal .close {
            font-size: 24px;
            line-height: 1;
            cursor: pointer;
            color: #6a6d70;
            background: none;
            border: none;
            padding: 0 4px;
            margin-top: -2px;
            transition: color 0.15s;
        }
        #nx-modal .close:hover {
            color: #fff;
        }
        #nx-modal .nx-content {
            padding: 8px 26px 4px;
            overflow-y: auto;
            flex: 1 1 auto;
        }
        #nx-modal .nx-content::-webkit-scrollbar {
            width: 8px;
        }
        #nx-modal .nx-content::-webkit-scrollbar-track {
            background: transparent;
        }
        #nx-modal .nx-content::-webkit-scrollbar-thumb {
            background: #3a3d40;
            border-radius: 4px;
        }
        #nx-modal .nx-content::-webkit-scrollbar-thumb:hover {
            background: #4a4d50;
        }
        .nx-cat {
            font-size: 12px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.7px;
            color: #7a7d80;
            margin: 20px 0 6px 0;
            padding-bottom: 6px;
            border-bottom: 1px solid #2f3133;
        }
        .nx-cat.first {
            margin-top: 12px;
        }
        .nx-row {
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
            padding: 11px 10px;
            gap: 16px;
            border-radius: 6px;
            transition: background 0.12s;
        }
        .nx-row:hover {
            background: #2a2c2e;
        }
        .nx-row-text {
            flex: 1;
            min-width: 0;
        }
        .nx-row-text .nx-label {
            font-size: 14px;
            font-weight: 500;
            color: #e8e8e8;
            display: block;
        }
        .nx-row-text .nx-desc {
            font-size: 12px;
            color: #85888b;
            display: block;
            margin-top: 3px;
            line-height: 1.45;
        }
        .nx-toggle {
            position: relative;
            width: 40px;
            height: 22px;
            flex-shrink: 0;
            cursor: pointer;
            margin-top: 1px;
        }
        .nx-toggle input {
            opacity: 0;
            width: 0;
            height: 0;
        }
        .nx-toggle .slider {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: #3d4043;
            border-radius: 22px;
            transition: background 0.2s;
        }
        .nx-toggle .slider::before {
            content: '';
            position: absolute;
            height: 16px;
            width: 16px;
            left: 3px;
            top: 3px;
            background: #c8cacc;
            border-radius: 50%;
            transition: transform 0.2s, background 0.2s;
        }
        .nx-toggle input:checked + .slider {
            background: #22a24a;
        }
        .nx-toggle input:checked + .slider::before {
            transform: translateX(18px);
            background: #fff;
        }
        #nx-modal .nx-footer {
            padding: 14px 26px 20px;
            border-top: 1px solid #343638;
            flex-shrink: 0;
        }
        #nx-modal .save-btn {
            padding: 10px 24px;
            background: #0a84ff;
            color: #fff;
            border: none;
            border-radius: 6px;
            font-size: 14px;
            font-weight: 600;
            cursor: pointer;
            width: 100%;
            transition: background 0.15s;
        }
        #nx-modal .save-btn:hover {
            background: #0a76e0;
        }
    `;
    document.head.appendChild(style);

    function renameRobuxTab() {
        var selectors = [
            '.navlinks-0-2-4 .linkEntry-0-2-20',
            '.navlinksRow-0-2-7 .linkEntry-0-2-20',
            '.container-0-2-12 .linkEntry-0-2-13',
            '.nx-legacy-nav .linkEntry-0-2-13'
        ];
        var links = document.querySelectorAll(selectors.join(','));
        links.forEach(function(tab) {
            if (tab.dataset.nxRenamed) return;
            var href = tab.getAttribute('href');
            var text = (tab.textContent || '').trim();
            if (href !== '/transactions' && text !== 'Robux' && text !== 'ROBUX') return;
            tab.dataset.nxRenamed = '1';
            tab.textContent = 'Nexus';
            tab.removeAttribute('href');
            tab.style.cursor = 'pointer';
        });
    }

    document.addEventListener('click', function(e) {
        var target = e.target.closest('[data-nx-renamed="1"]');
        if (!target) return;
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        window.NX.ui.modal.build();
    }, true);

    function makeLogoClickable() {
        document.querySelectorAll('.imgDesktop-0-2-12, .imgMobile-0-2-13').forEach(function(logo) {
            if (logo.dataset.nxLogo) return;
            logo.dataset.nxLogo = '1';
            logo.style.cursor = 'pointer';
            logo.addEventListener('click', function() {
                window.location.href = '/home';
            });
        });
    }

    function applyAll() {
        if (window.NX.settings.get('removeAds')) window.NX.features.removeAds.apply();
        if (window.NX.settings.get('hideAlert')) window.NX.features.hideAlert.apply();
        if (window.NX.settings.get('rap')) window.NX.features.rap.apply();
        if (window.NX.settings.get('inventorySearch')) window.NX.features.inventorySearch.apply();
        if (window.NX.settings.get('bulkUnfriend')) window.NX.features.bulkUnfriend.apply();
        if (window.NX.settings.get('trade2020')) window.NX.features.trade2020.apply();
        if (window.NX.settings.get('legacyTheme')) window.NX.features.legacyTheme.apply();
    }

    setTimeout(function() {
        renameRobuxTab();
        makeLogoClickable();
        applyAll();
    }, 1000);

    var observer = new MutationObserver(function() {
        renameRobuxTab();
        makeLogoClickable();
        if (window.NX.settings.get('rap')) window.NX.features.rap.apply();
        if (window.NX.settings.get('bulkUnfriend')) window.NX.features.bulkUnfriend.apply();
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

})();
