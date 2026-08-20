// src/ui/modal.js

(function() {
    'use strict';

    function build() {
        var overlay = document.createElement('div');
        overlay.id = 'nx-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            backdrop-filter: blur(4px);
            -webkit-backdrop-filter: blur(4px);
            z-index: 999999;
            display: flex;
            align-items: center;
            justify-content: center;
        `;

        var modal = document.createElement('div');
        modal.id = 'nx-modal';
        modal.style.cssText = `
            background: #fff;
            border-radius: 8px;
            padding: 32px;
            max-width: 520px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
            color: #222;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            position: relative;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
        `;

        var close = document.createElement('button');
        close.className = 'close';
        close.textContent = '×';
        close.style.cssText = `
            position: absolute;
            top: 12px;
            right: 16px;
            font-size: 24px;
            cursor: pointer;
            color: #999;
            background: none;
            border: none;
            padding: 4px 8px;
            border-radius: 4px;
            line-height: 1;
        `;
        close.onmouseover = function() {
            this.style.color = '#333';
            this.style.background = '#f0f0f0';
        };
        close.onmouseout = function() {
            this.style.color = '#999';
            this.style.background = 'transparent';
        };
        close.onclick = function() { overlay.remove(); };

        var title = document.createElement('h2');
        title.textContent = 'NX Settings';
        title.style.cssText = `
            margin: 0 0 4px 0;
            font-size: 22px;
            font-weight: 600;
            color: #222;
        `;

        var sub = document.createElement('div');
        sub.className = 'sub';
        sub.textContent = 'Settings are saved automatically';
        sub.style.cssText = `
            color: #777;
            font-size: 13px;
            margin-bottom: 22px;
        `;

        var content = document.createElement('div');

        var cats = [
            { id: 'visual', label: 'Visual' },
            { id: 'function', label: 'Function' },
            { id: 'performance', label: 'Performance' }
        ];

        var optMap = {
            panelIcon: { cat: 'visual', label: 'Panel Icon' },
            hideAlert: { cat: 'visual', label: 'Hide Alert' },
            hideDonate: { cat: 'visual', label: 'Hide Donate Button' },
            copyUserId: { cat: 'function', label: 'Copy User ID' },
            inventorySearch: { cat: 'function', label: 'Inventory Search' },
            removeAds: { cat: 'performance', label: 'Remove Ads' }
        };

        var settings = window.NX.settings;

        cats.forEach(function(cat) {
            var catDiv = document.createElement('div');
            catDiv.className = 'nx-cat';
            catDiv.textContent = cat.label;
            catDiv.style.cssText = `
                font-size: 11px;
                font-weight: 600;
                text-transform: uppercase;
                letter-spacing: 0.8px;
                color: #999;
                margin: 20px 0 8px 0;
                padding-bottom: 4px;
                border-bottom: 1px solid #eee;
            `;
            content.appendChild(catDiv);

            for (var key in optMap) {
                if (optMap[key].cat !== cat.id) continue;

                var row = document.createElement('div');
                row.className = 'nx-row';
                row.style.cssText = `
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 6px 4px;
                    border-radius: 4px;
                    transition: background 0.15s ease;
                `;
                row.onmouseover = function() {
                    this.style.background = '#f7f7f7';
                };
                row.onmouseout = function() {
                    this.style.background = 'transparent';
                };

                var label = document.createElement('span');
                label.textContent = optMap[key].label;
                label.style.cssText = `
                    font-size: 14px;
                    color: #333;
                `;

                var toggle = document.createElement('label');
                toggle.className = 'nx-toggle';
                toggle.style.cssText = `
                    position: relative;
                    width: 44px;
                    height: 24px;
                    flex-shrink: 0;
                    cursor: pointer;
                    display: block;
                `;

                var input = document.createElement('input');
                input.type = 'checkbox';
                input.checked = settings.get(key);
                input.style.cssText = `
                    opacity: 0;
                    width: 0;
                    height: 0;
                    position: absolute;
                    top: 0;
                    left: 0;
                    margin: 0;
                    padding: 0;
                `;

                var slider = document.createElement('span');
                slider.className = 'slider';
                slider.style.cssText = `
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: ${input.checked ? 'var(--primary-color, #0066ff)' : '#ccc'};
                    border-radius: 24px;
                    transition: 0.25s ease;
                `;
                var dot = document.createElement('span');
                dot.style.cssText = `
                    position: absolute;
                    height: 18px;
                    width: 18px;
                    left: 3px;
                    bottom: 3px;
                    background: #fff;
                    border-radius: 50%;
                    transition: 0.25s ease;
                    transform: ${input.checked ? 'translateX(20px)' : 'translateX(0)'};
                    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.15);
                `;
                slider.appendChild(dot);

                input.addEventListener('change', (function(k, cb, sliderEl, dotEl) {
                    return function() {
                        var checked = cb.checked;
                        settings.set(k, checked);
                        applyFeature(k, checked);
                        sliderEl.style.background = checked ? 'var(--primary-color, #0066ff)' : '#ccc';
                        dotEl.style.transform = checked ? 'translateX(20px)' : 'translateX(0)';
                    };
                })(key, input, slider, dot));

                toggle.appendChild(input);
                toggle.appendChild(slider);
                row.appendChild(label);
                row.appendChild(toggle);
                content.appendChild(row);
            }
        });

        var saveBtn = document.createElement('button');
        saveBtn.className = 'save-btn';
        saveBtn.textContent = 'Save & Reload';
        saveBtn.style.cssText = `
            margin-top: 22px;
            padding: 11px 28px;
            background: var(--primary-color, #0066ff);
            color: #fff;
            border: none;
            border-radius: 6px;
            font-size: 15px;
            font-weight: 500;
            cursor: pointer;
            width: 100%;
            transition: background 0.2s ease;
            box-sizing: border-box;
        `;
        saveBtn.onmouseover = function() {
            this.style.background = 'var(--primary-color-hover, #0052cc)';
        };
        saveBtn.onmouseout = function() {
            this.style.background = 'var(--primary-color, #0066ff)';
        };
        saveBtn.onclick = function() {
            location.reload();
        };

        modal.appendChild(close);
        modal.appendChild(title);
        modal.appendChild(sub);
        modal.appendChild(content);
        modal.appendChild(saveBtn);
        overlay.appendChild(modal);

        overlay.addEventListener('click', function(e) {
            if (e.target === overlay) overlay.remove();
        });

        document.body.appendChild(overlay);
    }

    function applyFeature(key, enabled) {
        var featureMap = {
            panelIcon: 'panelIcon',
            hideAlert: 'hideAlert',
            copyUserId: 'copyUserId',
            inventorySearch: 'inventorySearch',
            removeAds: 'removeAds'
        };

        var featureName = featureMap[key];
        if (!featureName) return;

        var feature = window.NX.features && window.NX.features[featureName];
        if (!feature) return;

        if (enabled) {
            feature.apply();
        }
    }

    window.NX = window.NX || {};
    window.NX.ui = window.NX.ui || {};
    window.NX.ui.modal = {
        build: build
    };

})();
