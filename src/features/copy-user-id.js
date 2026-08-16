(function() {
    'use strict';

    function apply() {
        var links = document.querySelectorAll('a[href*="/users/"]');
        links.forEach(function(el) {
            if (el.dataset.nxCopy) return;
            el.dataset.nxCopy = '1';
            el.style.cursor = 'pointer';
            el.title = 'Click to copy user ID';
            el.addEventListener('click', function(e) {
                var href = this.getAttribute('href');
                var match = href.match(/\/users\/(\d+)/);
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
