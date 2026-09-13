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

            var statRow = document.querySelector('.statRow-0-2-108, [class*="statRow-"]');
            if (!statRow) {
                setTimeout(window.NX.features.rap.apply, 500);
                return;
            }

            if (document.querySelector('.nx-rap-stat')) return;

            var userId = window.location.pathname.match(/\/users\/(\d+)\//)?.[1];
            if (!userId) return;

            fetch('/internal/limiteds?userId=' + userId)
                .then(function(r) { return r.text(); })
                .then(function(html) {
                    var match = html.match(/Total RAP:\s*<span[^>]*>([\d,]+)<\/span>/i);
                    if (!match) {
                        match = html.match(/Total RAP:\s*([\d,]+)/i);
                    }
                    if (!match) return;

                    var rap = match[1];

                    var wrapper = document.createElement('div');
                    wrapper.className = 'col-auto wrapper-0-2-107 nx-rap-stat';

                    var statRowInner = document.createElement('div');
                    statRowInner.className = 'statRow-0-2-108';

                    var value = document.createElement('p');
                    value.className = 'statValue-0-2-110';
                    value.textContent = rap;

                    var header = document.createElement('p');
                    header.className = 'statHeader-0-2-109';
                    header.textContent = 'RAP';

                    statRowInner.appendChild(value);
                    statRowInner.appendChild(header);
                    wrapper.appendChild(statRowInner);

                    var container = statRow.parentElement.parentElement;
                    if (container) container.appendChild(wrapper);
                })
                .catch(function() {});
        }
    };

})();
