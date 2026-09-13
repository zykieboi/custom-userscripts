(function() {
    'use strict';

    window.NX = window.NX || {};
    window.NX.features = window.NX.features || {};

    window.NX.features.rap = {
        apply: function() {
            if (document.querySelector('.nx-rap-stat')) return;
            if (window.NX._rapLoading) return;

            var statRows = document.querySelectorAll('.statRow-0-2-108, [class*="statRow-"]');
            if (statRows.length < 3) {
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

                    if (!match) {
                        window.NX._rapLoading = false;
                        return;
                    }

                    if (document.querySelector('.nx-rap-stat')) {
                        window.NX._rapLoading = false;
                        return;
                    }

                    var followingStat = statRows[2];
                    var wrapper = followingStat.parentElement.cloneNode(true);

                    wrapper.classList.add('nx-rap-stat');

                    var valueEl = wrapper.querySelector('.statValue-0-2-110, [class*="statValue-"]');
                    var headerEl = wrapper.querySelector('.statHeader-0-2-109, [class*="statHeader-"]');

                    if (valueEl) {
                        var link = valueEl.querySelector('a');
                        if (link) {
                            link.href = '/internal/limiteds?userId=' + userId;
                            link.textContent = match[1];
                        } else {
                            valueEl.textContent = match[1];
                        }
                    }

                    if (headerEl) headerEl.textContent = 'RAP';

                    followingStat.parentElement.parentElement.appendChild(wrapper);
                })
                .catch(function() {
                    window.NX._rapLoading = false;
                });
        }
    };

})();
