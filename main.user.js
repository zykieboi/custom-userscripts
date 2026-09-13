// ==UserScript==
// @name         Nexus - NX
// @namespace    https://github.com/zykieboi/custom-userscripts
// @version      4.3
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
// @require      https://raw.githubusercontent.com/zykieboi/custom-userscripts/main/src/ui/modal.js
// @require      https://raw.githubusercontent.com/zykieboi/custom-userscripts/main/src/features/trade-2020.js
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
            background: #2a2c2e;
            border-radius: 12px;
            padding: 30px;
            max-width: 500px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
            color: #e0e0e0;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            position: relative;
            border: 1px solid #3a3c3e;
        }
        #nx-modal h2 {
            margin: 0 0 5px 0;
            font-size: 24px;
            font-weight: 700;
            color: #fff;
        }
        #nx-modal .sub {
            color: #999;
            font-size: 13px;
            margin-bottom: 20px;
        }
        #nx-modal .close {
            position: absolute;
            top: 12px;
            right: 18px;
            font-size: 26px;
            cursor: pointer;
            color: #666;
            background: none;
            border: none;
        }
        #nx-modal .close:hover {
            color: #fff;
        }
        .nx-cat {
            font-size: 13px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            color: #666;
            margin: 18px 0 8px 0;
            padding-bottom: 4px;
            border-bottom: 1px solid #3a3c3e;
        }
        .nx-row {
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
            padding: 8px 0;
            gap: 16px;
        }
        .nx-row-text {
            flex: 1;
        }
        .nx-row-text .nx-label {
            font-size: 14px;
            color: #e0e0e0;
            display: block;
        }
        .nx-row-text .nx-desc {
            font-size: 12px;
            color: #888;
            display: block;
            margin-top: 2px;
            line-height: 1.4;
        }
        .nx-toggle {
            position: relative;
            width: 42px;
            height: 24px;
            flex-shrink: 0;
            cursor: pointer;
            margin-top: 2px;
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
            background: #555;
            border-radius: 24px;
            transition: 0.25s;
        }
        .nx-toggle .slider::before {
            content: '';
            position: absolute;
            height: 18px;
            width: 18px;
            left: 3px;
            bottom: 3px;
            background: #fff;
            border-radius: 50%;
            transition: 0.25s;
        }
        .nx-toggle input:checked + .slider {
            background: #4CAF50;
        }
        .nx-toggle input:checked + .slider::before {
            transform: translateX(18px);
        }
        #nx-modal .save-btn {
            margin-top: 20px;
            padding: 10px 28px;
            background: #0066ff;
            color: #fff;
            border: none;
            border-radius: 6px;
            font-size: 15px;
            font-weight: 500;
            cursor: pointer;
            width: 100%;
        }
        #nx-modal .save-btn:hover {
            background: #0052cc;
        }
    `;
    document.head.appendChild(style);

    function renameRobuxTab() {
        var links = document.querySelectorAll('.navlinks-0-2-4 .linkEntry-0-2-20, .navlinksRow-0-2-7 .linkEntry-0-2-20');
        links.forEach(function(tab) {
            if (tab.dataset.nxRenamed) return;
            if (tab.getAttribute('href') !== '/transactions') return;
            tab.dataset.nxRenamed = '1';
            tab.textContent = 'Nexus';
            tab.removeAttribute('href');
            tab.style.cursor = 'pointer';
        });
    }

    document.addEventListener('click', function(e) {
        var target = e.target.closest('a[data-nx-renamed="1"]');
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
