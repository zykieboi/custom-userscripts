// src/features/copy-user-id.js

(function() {
    'use strict';

    function apply() {
        var links = document.querySelectorAll('a[href*="/users/"]:not(.friendEntry-0-2-140 a)');
        links.forEach(function(el) {
            if (el.dataset.nxCopy) return;
            var href = el.getAttribute('href');
            if (!href || !href.match(/\/users\/(\d+)/)) return;
            el.dataset.nxCopy = '1';
            el.style.cursor = 'pointer';
            el.title = 'Click to copy user ID';
            el.addEventListener('click', function(e) {
                var match = this.getAttribute('href').match(/\/users\/(\d+)/);
                if (match) {
                    e.preventDefault();
                    navigator.clipboard.writeText(match[1]).then(function() {
                        var orig = this.textContent;
                        this.textContent = 'Copied!';
                        setTimeout(function() {
                            this.textContent = orig;
                        }.bind(this), 1500);
                    }.bind(this));
                }
            });
        });
    }

    window.NX = window.NX || {};
    window.NX.features = window.NX.features || {};
    window.NX.features.copyUserId = {
        apply: apply
    };

})();
