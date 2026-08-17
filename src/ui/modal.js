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
            backdrop-filter: blur(8px);
            -webkit-backdrop-filter: blur(8px);
            z-index: 999999;
            display: flex;
            align-items: center;
            justify-content: center;
            animation: nxFadeIn 0.3s ease;
        `;

        var modal = document.createElement('div');
        modal.id = 'nx-modal';
        modal.style.cssText = `
            background: rgba(255, 255, 255, 0.15);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border-radius: 24px;
            padding: 35px;
            max-width: 520px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
            color: #fff;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            position: relative;
            box-shadow: 0 25px 50px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1);
            animation: nxModalIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
            transform: perspective(1000px) rotateX(0deg) rotateY(0deg);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            cursor: default;
        `;

        // 3D tilt effect on hover
        modal.addEventListener('mousemove', function(e) {
            var rect = this.getBoundingClientRect();
            var x = (e.clientX - rect.left) / rect.width - 0.5;
            var y = (e.clientY - rect.top) / rect.height - 0.5;
            this.style.transform = 'perspective(1000px) rotateX(' + (y * -8) + 'deg) rotateY(' + (x * 8) + 'deg)';
            this.style.boxShadow = '0 30px 60px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.2)';
        });

        modal.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
            this.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1)';
        });

        var close = document.createElement('button');
        close.className = 'close';
        close.textContent = '×';
        close.style.cssText = `
            position: absolute;
            top: 14px;
            right: 20px;
            font-size: 28px;
            cursor: pointer;
            color: rgba(255, 255, 255, 0.6);
            background: none;
            border: none;
            transition: all 0.2s ease;
            font-weight: 300;
            line-height: 1;
        `;
        close.onmouseover = function() {
            this.style.color = '#fff';
            this.style.transform = 'rotate(90deg) scale(1.2)';
        };
        close.onmouseout = function() {
            this.style.color = 'rgba(255, 255, 255, 0.6)';
            this.style.transform = 'rotate(0deg) scale(1)';
        };
        close.onclick = function() { overlay.remove(); };

        var title = document.createElement('h2');
        title.textContent = 'NX Settings';
        title.style.cssText = `
            margin: 0 0 6px 0;
            font-size: 28px;
            font-weight: 700;
            color: #fff;
            text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
            letter-spacing: -0.5px;
        `;

        var sub = document.createElement('div');
        sub.className = 'sub';
        sub.textContent = 'Settings are saved automatically ✨';
        sub.style.cssText = `
            color: rgba(255, 255, 255, 0.7);
            font-size: 14px;
            margin-bottom: 24px;
            font-weight: 400;
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
                font-size: 12px;
                font-weight: 600;
                text-transform: uppercase;
                letter-spacing: 1.2px;
                color: rgba(255, 255, 255, 0.5);
                margin: 22px 0 10px 0;
                padding-bottom: 6px;
                border-bottom: 1px solid rgba(255, 255, 255, 0.08);
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
                    padding: 8px 0;
                    border-radius: 8px;
                    transition: background 0.2s ease;
                `;
                row.onmouseover = function() {
                    this.style.background = 'rgba(255, 255, 255, 0.05)';
                };
                row.onmouseout = function() {
                    this.style.background = 'transparent';
                };

                var label = document.createElement('span');
                label.textContent = optMap[key].label;
                label.style.cssText = `
                    font-size: 15px;
                    color: #fff;
                    font-weight: 400;
                    text-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
                `;

                var toggle = document.createElement('label');
                toggle.className = 'nx-toggle';
                toggle.style.cssText = `
                    position: relative;
                    width: 48px;
                    height: 26px;
                    flex-shrink: 0;
                    cursor: pointer;
                `;

                var input = document.createElement('input');
                input.type = 'checkbox';
                input.checked = settings.get(key);
                input.style.cssText = `
                    opacity: 0;
                    width: 0;
                    height: 0;
                `;

                var slider = document.createElement('span');
                slider.className = 'slider';
                slider.style.cssText = `
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: ${input.checked ? 'linear-gradient(135deg, #667eea, #764ba2)' : 'rgba(255, 255, 255, 0.2)'};
                    border-radius: 26px;
                    transition: 0.3s ease;
                    box-shadow: ${input.checked ? '0 0 20px rgba(102, 126, 234, 0.4)' : 'none'};
                `;
                var dot = document.createElement('span');
                dot.style.cssText = `
                    position: absolute;
                    height: 20px;
                    width: 20px;
                    left: 3px;
                    bottom: 3px;
                    background: #fff;
                    border-radius: 50%;
                    transition: 0.3s ease;
                    transform: ${input.checked ? 'translateX(22px)' : 'translateX(0)'};
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
                `;
                slider.appendChild(dot);

                input.addEventListener('change', (function(k, cb, sliderEl, dotEl) {
                    return function() {
                        settings.set(k, cb.checked);
                        applyFeature(k, cb.checked);
                        var bg = cb.checked ? 'linear-gradient(135deg, #667eea, #764ba2)' : 'rgba(255, 255, 255, 0.2)';
                        var shadow = cb.checked ? '0 0 20px rgba(102, 126, 234, 0.4)' : 'none';
                        sliderEl.style.background = bg;
                        sliderEl.style.boxShadow = shadow;
                        dotEl.style.transform = cb.checked ? 'translateX(22px)' : 'translateX(0)';
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
        saveBtn.textContent = 'Save & Reload ✨';
        saveBtn.style.cssText = `
            margin-top: 24px;
            padding: 12px 28px;
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: #fff;
            border: none;
            border-radius: 12px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            width: 100%;
            transition: all 0.3s ease;
            box-shadow: 0 4px 20px rgba(102, 126, 234, 0.4);
            letter-spacing: 0.3px;
        `;
        saveBtn.onmouseover = function() {
            this.style.transform = 'scale(1.02)';
            this.style.boxShadow = '0 8px 30px rgba(102, 126, 234, 0.6)';
        };
        saveBtn.onmouseout = function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = '0 4px 20px rgba(102, 126, 234, 0.4)';
        };
        saveBtn.onclick = function() {
            location.reload();
        };

        // Add keyframe animations
        var style = document.createElement('style');
        style.textContent = `
            @keyframes nxFadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            @keyframes nxModalIn {
                from {
                    opacity: 0;
                    transform: perspective(1000px) rotateX(10deg) rotateY(-5deg) scale(0.95) translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1) translateY(0);
                }
            }
        `;
        document.head.appendChild(style);

        modal.appendChild(close);
        modal.appendChild(title);
        modal.appendChild(sub);
        modal.appendChild(content);
        modal.appendChild(saveBtn);
        overlay.appendChild(modal);

        overlay.addEventListener('click', function(e) {
            if (e.target === overlay) {
                overlay.style.animation = 'nxFadeOut 0.2s ease';
                setTimeout(function() { overlay.remove(); }, 200);
            }
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
