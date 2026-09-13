(function() {
    'use strict';

    window.NX = window.NX || {};
    window.NX.features = window.NX.features || {};

    window.NX.features.rap = {
        apply: function() {
            var username = document.querySelector('.username-0-2-94, [class*="username-"]');
            if (!username) {
                setTimeout(window.NX.features.rap.apply, 500);
                return;
            }

            var statsRow = document.querySelector('.row .col-auto.wrapper-0-2-107, [class*="wrapper-"]');
            if (!statsRow) {
                setTimeout(window.NX.features.rap.apply, 500);
                return;
            }

            if (document.querySelector('.nx-rap-stat')) return;

            var userId = window.location.pathname.match(/\/users\/(\d+)\//)?.[1];
            if (!userId) return;

            fetch('/internal/limiteds?userId=' + userId)
                .then(function(r) { return r.text(); })
                .then(function(html) {
                    var match = html.match(/Total RAP:<\/?[^>]*>?\s*<span[^>]*>([\d,]+)<\/span>/i);
                    if (!match) {
                        match = html.match(/Total RAP:\s*([\d,]+)/i);
                    }
                    if (!match) return;

                    var rap = match[1];

                    var statWrapper = document.createElement('div');
                    statWrapper.className = 'col-auto wrapper-0-2-107 nx-rap-stat';

                    var statRow = document.createElement('div');
                    statRow.className = 'statRow-0-2-108';

                    var statValue = document.createElement('p');
                    statValue.className = 'statValue-0-2-110 statValue-d7-0-2-118';
                    statValue.textContent = rap;

                    var statHeader = document.createElement('p');
                    statHeader.className = 'statHeader-0-2-109 statHeader-d6-0-2-117';
                    statHeader.textContent = 'RAP';

                    statRow.appendChild(statValue);
                    statRow.appendChild(statHeader);
                    statWrapper.appendChild(statRow);

                    var statsContainer = statsRow.parentElement;
                    statsContainer.appendChild(statWrapper);
                })
                .catch(function() {});
        }
    };

})();
