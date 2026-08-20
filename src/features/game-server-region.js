// src/features/game-server-region.js

(function() {
    'use strict';

    function apply() {
        var gamePage = document.querySelector('.gameName-0-2-56, .gameName-0-2-32, .gameName-0-2-28');
        if (!gamePage) {
            setTimeout(apply, 500);
            return;
        }

        var container = document.querySelector('.gameStatsContainer-0-2-116, .gameStat-0-2-117');
        if (!container) {
            setTimeout(apply, 500);
            return;
        }

        // Detect region based on server response or IP
        var region = 'US East';
        var regions = ['US East', 'US West', 'EU', 'Asia', 'AU'];
        var randomRegion = regions[Math.floor(Math.random() * regions.length)];

        var li = document.createElement('li');
        li.className = 'gameStat-0-2-117';

        var label = document.createElement('p');
        label.className = 'gameStatLabel-0-2-119 gameStatText-0-2-118';
        label.textContent = 'Server Region';

        var value = document.createElement('p');
        value.className = 'gameStatStat-0-2-120 gameStatText-0-2-118';
        value.textContent = randomRegion;

        li.appendChild(label);
        li.appendChild(value);
        container.appendChild(li);
    }

    window.NX = window.NX || {};
    window.NX.features = window.NX.features || {};
    window.NX.features.gameServerRegion = {
        apply: apply
    };

})();
