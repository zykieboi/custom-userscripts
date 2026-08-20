// src/features/auto-refresh.js

(function() {
    'use strict';

    var refreshInterval = null;
    var intervalSeconds = 30;

    function apply() {
        if (refreshInterval) return;

        var style = document.createElement('style');
        style.textContent = `
            .nx-refresh-control {
                position: fixed;
                bottom: 20px;
                right: 20px;
                background: rgba(0,0,0,0.8);
                color: #fff;
                padding: 8px 14px;
                border-radius: 8px;
                font-size: 13px;
                z-index: 99999;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                display: flex;
                align-items: center;
                gap: 10px;
                user-select: none;
            }
            .nx-refresh-control button {
                background: #0066ff;
                color: #fff;
                border: none;
                padding: 4px 12px;
                border-radius: 4px;
                cursor: pointer;
                font-size: 12px;
            }
            .nx-refresh-control button:hover {
                background: #0052cc;
            }
            .nx-refresh-control .nx-refresh-toggle {
                background: #4CAF50;
            }
            .nx-refresh-control .nx-refresh-toggle.active {
                background: #f44336;
            }
        `;
        document.head.appendChild(style);

        var control = document.createElement('div');
        control.className = 'nx-refresh-control';
        control.innerHTML = `
            <span>Auto Refresh</span>
            <span class="nx-refresh-timer">${intervalSeconds}s</span>
            <button class="nx-refresh-toggle active">Stop</button>
        `;

        var toggleBtn = control.querySelector('.nx-refresh-toggle');
        var timerDisplay = control.querySelector('.nx-refresh-timer');

        function startRefresh() {
            if (refreshInterval) return;
            toggleBtn.textContent = 'Stop';
            toggleBtn.classList.add('active');
            refreshInterval = setInterval(function() {
                location.reload();
            }, intervalSeconds * 1000);
        }

        function stopRefresh() {
            if (refreshInterval) {
                clearInterval(refreshInterval);
                refreshInterval = null;
            }
            toggleBtn.textContent = 'Start';
            toggleBtn.classList.remove('active');
        }

        toggleBtn.addEventListener('click', function() {
            if (refreshInterval) {
                stopRefresh();
            } else {
                startRefresh();
            }
        });

        document.body.appendChild(control);
        startRefresh();
    }

    window.NX = window.NX || {};
    window.NX.features = window.NX.features || {};
    window.NX.features.autoRefresh = {
        apply: apply
    };

})();
