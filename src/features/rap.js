(function() {
    'use strict';

    window.NX = window.NX || {};
    window.NX.features = window.NX.features || {};

    window.NX.features.rap = {
        apply: function() {
            var statRow = document.querySelector('.statRow-0-2-108, [class*="statRow-"]');
            if (!statRow) {
                setTimeout(window.NX.features.rap.apply, 500);
                return;
            }

            if (document.querySelector('.nx-rap-stat')) return;

            var userId = window.location.pathname.match(/\/users\/(\d+)\//)?.[1];
            if (!userId) return;

            console.log('NX RAP: fetching for user', userId);

            fetch('/internal/limiteds?userId=' + userId, {
                credentials: 'include'
            })
                .then(function(r) { return r.text(); })
                .then(function(html) {
                    console.log('NX RAP response length:', html.length);
                    console.log('NX RAP first 500:', html.slice(0, 500));

                    var match = html.match(/Total RAP:\s*<span[^>]*>([\d,]+)<\/span>/i);
                    if (!match) match = html.match(/Total RAP:\s*([\d,]+)/i);

                    if (!match) {
                        console.log('NX RAP: no match found');
                        return;
                    }

                    console.log('NX RAP value:', match[1]);

                    var wrapper = document.createElement('div');
                    wrapper.className = 'col-auto wrapper-0-2-107 nx-rap-stat';

                    var inner = document.createElement('div');
                    inner.className = 'statRow-0-2-108';

                    var value = document.createElement('p');
                    value.className = 'statValue-0-2-110';

                    var link = document.createElement('a');
                    link.href = '/internal/limiteds?userId=' + userId;
                    link.textContent = match[1];

                    value.appendChild(link);

                    var header = document.createElement('p');
                    header.className = 'statHeader-0-2-109';
                    header.textContent = 'RAP';

                    inner.appendChild(value);
                    inner.appendChild(header);
                    wrapper.appendChild(inner);

                    statRow.parentElement.parentElement.appendChild(wrapper);
                })
                .catch(function(e) {
                    console.log('NX RAP error:', e);
                });
        }
    };

})();
