(function() {
    'use strict';

    window.NX = window.NX || {};
    window.NX.features = window.NX.features || {};

    window.NX.features.rap = {
        apply: function() {
            if (window.NX._rapLoading) return;
            if (document.querySelector('.nx-rap-stat')) return;

            var statRow = document.querySelector('.statRow-0-2-108, [class*="statRow-"]');
            if (!statRow) {
                setTimeout(window.NX.features.rap.apply, 500);
                return;
            }

            var userId = window.location.pathname.match(/\/users\/(\d+)\//)?.[1];
            if (!userId) return;

            window.NX._rapLoading = true;

            fetch('/internal/limiteds?userId=' + userId, {
                credentials: 'include'
            })
                .then(function(r) { return r.text(); })
                .then(function(html) {
                    var match = html.match(/Total RAP:\s*<span[^>]*>([\d,]+)<\/span>/i);
                    if (!match) match = html.match(/Total RAP:\s*([\d,]+)/i);

                    window.NX._rapLoading = false;

                    if (!match) return;
                    if (document.querySelector('.nx-rap-stat')) return;

                    var wrapper = document.createElement('div');
                    wrapper.className = 'col-auto wrapper-0-2-107 nx-rap-stat';

                    var inner = document.createElement('div');
                    inner.className = 'statRow-0-2-108';

                    var value = document.createElement('p');
                    value.className = 'statValue-0-2-110';
                    value.textContent = match[1];

                    var header = document.createElement('p');
                    header.className = 'statHeader-0-2-109';
                    header.textContent = 'RAP';

                    inner.appendChild(value);
                    inner.appendChild(header);
                    wrapper.appendChild(inner);

                    statRow.parentElement.parentElement.appendChild(wrapper);
                })
                .catch(function() {
                    window.NX._rapLoading = false;
                });
        }
    };

})();
