// ==UserScript==
// @name         Nexus - NX
// @namespace    https://github.com/zykieboi/custom-userscripts
// @version      1.0
// @author       zykieboi
// @description  testing stuff :)
// @match        https://www.pekora.zip/*
// @match        pekora.zip/*
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_addStyle
// @run-at       document-end
// @require      https://raw.githubusercontent.com/zykieboi/custom-userscripts/main/src/core/settings.js
// @require      https://raw.githubusercontent.com/zykieboi/custom-userscripts/main/src/features/panel-icon.js
// @require      https://raw.githubusercontent.com/zykieboi/custom-userscripts/main/src/features/hide-alert.js
// @require      https://raw.githubusercontent.com/zykieboi/custom-userscripts/main/src/features/remove-ads.js
// @require      https://raw.githubusercontent.com/zykieboi/custom-userscripts/main/src/features/copy-user-id.js
// @require      https://raw.githubusercontent.com/zykieboi/custom-userscripts/main/src/features/inventory-search.js
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
            background: #fff;
            border-radius: 12px;
            padding: 30px;
            max-width: 500px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
            color: #222;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            position: relative;
        }
        #nx-modal h2 {
            margin: 0 0 5px 0;
            font-size: 24px;
            font-weight: 700;
        }
        #nx-modal .sub {
            color: #777;
            font-size: 13px;
            margin-bottom: 20px;
        }
        #nx-modal .close {
            position: absolute;
            top: 12px;
            right: 18px;
            font-size: 26px;
            cursor: pointer;
            color: #aaa;
            background: none;
            border: none;
        }
        #nx-modal .close:hover {
            color: #000;
        }
        .nx-cat {
            font-size: 13px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            color: #888;
            margin: 18px 0 8px 0;
            padding-bottom: 4px;
            border-bottom: 1px solid #eee;
        }
        .nx-row {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 6px 0;
        }
        .nx-row span {
            font-size: 14px;
            color: #333;
        }
        .nx-toggle {
            position: relative;
            width: 42px;
            height: 24px;
            flex-shrink: 0;
            cursor: pointer;
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
            background: #ccc;
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

    function addSettingsLink() {
        var dropdown = document.querySelector('[class*="dropdownNew-"]');
        if (!dropdown) {
            setTimeout(addSettingsLink, 400);
            return;
        }

        if (document.querySelector('.nx-entry')) return;

        var li = document.createElement('li');
        li.className = 'dropdownItem-0-2-150 nx-entry';

        var a = document.createElement('a');
        a.className = 'dropdownItemLink-0-2-151';
        a.href = '#';
        a.textContent = 'NX Settings';

        a.onclick = function(e) {
            e.preventDefault();
            if (window.NX && window.NX.ui && window.NX.ui.modal) {
                window.NX.ui.modal.build();
            }
        };

        li.appendChild(a);

        var items = dropdown.querySelectorAll('.dropdownItem-0-2-150');
        if (items.length) {
            dropdown.insertBefore(li, items[items.length - 1]);
        } else {
            dropdown.appendChild(li);
        }
    }

    function applySettings() {
        if (!window.NX || !window.NX.settings || !window.NX.features) return;

        var settings = window.NX.settings;

        if (settings.get('panelIcon') && window.NX.features.panelIcon) {
            window.NX.features.panelIcon.apply();
        }

        if (settings.get('hideAlert') && window.NX.features.hideAlert) {
            window.NX.features.hideAlert.apply();
        }

        if (settings.get('removeAds') && window.NX.features.removeAds) {
            window.NX.features.removeAds.apply();
        }

        if (settings.get('copyUserId') && window.NX.features.copyUserId) {
            window.NX.features.copyUserId.apply();
        }

        if (settings.get('inventorySearch') && window.NX.features.inventorySearch) {
            window.NX.features.inventorySearch.apply();
        }
    }

    if (window.location.hash === '#nx-settings') {
        setTimeout(function() {
            if (window.NX && window.NX.ui && window.NX.ui.modal) {
                window.NX.ui.modal.build();
                history.replaceState(null, '', window.location.pathname);
            }
        }, 500);
    } else {
        setTimeout(function() {
            addSettingsLink();
            applySettings();
        }, 1000);
    }

})();
