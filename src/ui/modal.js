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
        title.textContent = 'Nexus - NX';

        var sub = document.createElement('div');
        sub.className = 'sub';
        sub.textContent = 'Settings are saved automatically';

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
            removeAds: { cat: 'performance', label: 'Remove Ads' }
        };

        var settings = window.NX.settings;

        cats.forEach(function(cat) {
            var catDiv = document.createElement('div');
            catDiv.className = 'nx-cat';
            catDiv.textContent = cat.label;
            content.appendChild(catDiv);

            for (var key in optMap) {
                if (optMap[key].cat !== cat.id) continue;

                var row = document.createElement('div');
                row.className = 'nx-row';

                var label = document.createElement('span');
                label.textContent = optMap[key].label;

                var toggle = document.createElement('label');
                toggle.className = 'nx-toggle';

                var input = document.createElement('input');
                input.type = 'checkbox';
                input.checked = settings.get(key);

                input.addEventListener('change', (function(k) {
                    return function() {
                        settings.set(k, this.checked);
                        applyFeature(k, this.checked);
                    };
                })(key));

                var slider = document.createElement('span');
                slider.className = 'slider';

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
