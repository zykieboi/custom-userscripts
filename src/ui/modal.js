// src/ui/modal.js

(function() {
    'use strict';

    function build() {
        var overlay = document.createElement('div');
        overlay.id = 'nx-overlay';

        var modal = document.createElement('div');
        modal.id = 'nx-modal';

        var close = document.createElement('button');
        close.className = 'close';
        close.textContent = '×';
        close.onclick = function() { overlay.remove(); };

        var title = document.createElement('h2');
        title.textContent = 'NX Settings';
        title.style.cssText = 'margin: 0 0 5px 0; font-size: 20px; font-weight: 600; color: #222;';

        var sub = document.createElement('div');
        sub.className = 'sub';
        sub.textContent = 'Settings are saved automatically';
        sub.style.cssText = 'color: #777; font-size: 13px; margin-bottom: 20px;';

        var content = document.createElement('div');

        var cats = [
            { id: 'visual', label: 'Visual' },
            { id: 'function', label: 'Function' },
            { id: 'performance', label: 'Performance' }
        ];

        var optMap = {
            panelIcon: { cat: 'visual', label: 'Panel Icon' },
            hideAlert: { cat: 'visual', label: 'Hide Alert' },
            copyUserId: { cat: 'function', label: 'Copy User ID' },
            inventorySearch: { cat: 'function', label: 'Inventory Search' },
            removeAds: { cat: 'performance', label: 'Remove Ads' }
        };

        var settings = window.NX.settings;

        cats.forEach(function(cat) {
            var catDiv = document.createElement('div');
            catDiv.className = 'nx-cat';
            catDiv.textContent = cat.label;
            catDiv.style.cssText = 'font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: #888; margin: 18px 0 8px 0; padding-bottom: 4px; border-bottom: 1px solid #eee;';
            content.appendChild(catDiv);

            for (var key in optMap) {
                if (optMap[key].cat !== cat.id) continue;

                var row = document.createElement('div');
                row.className = 'nx-row';
                row.style.cssText = 'display: flex; align-items: center; justify-content: space-between; padding: 6px 0;';

                var label = document.createElement('span');
                label.textContent = optMap[key].label;
                label.style.cssText = 'font-size: 14px; color: #333;';

                var toggle = document.createElement('label');
                toggle.className = 'nx-toggle';
                toggle.style.cssText = 'position: relative; width: 42px; height: 24px; flex-shrink: 0; cursor: pointer;';

                var input = document.createElement('input');
                input.type = 'checkbox';
                input.checked = settings.get(key);
                input.style.cssText = 'opacity: 0; width: 0; height: 0;';

                input.addEventListener('change', (function(k) {
                    return function() {
                        settings.set(k, this.checked);
                        applyFeature(k, this.checked);
                    };
                })(key));

                var slider = document.createElement('span');
                slider.className = 'slider';
                slider.style.cssText = 'position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: ' + (input.checked ? '#4CAF50' : '#ccc') + '; border-radius: 24px; transition: 0.25s;';
                var dot = document.createElement('span');
                dot.style.cssText = 'position: absolute; height: 18px; width: 18px; left: 3px; bottom: 3px; background: #fff; border-radius: 50%; transition: 0.25s; transform: ' + (input.checked ? 'translateX(18px)' : 'translateX(0)') + ';';
                slider.appendChild(dot);

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
        saveBtn.style.cssText = 'margin-top: 20px; padding: 10px 28px; background: #0066ff; color: #fff; border: none; border-radius: 6px; font-size: 15px; font-weight: 500; cursor: pointer; width: 100%;';
        saveBtn.onmouseover = function() { this.style.background = '#0052cc'; };
        saveBtn.onmouseout = function() { this.style.background = '#0066ff'; };
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
