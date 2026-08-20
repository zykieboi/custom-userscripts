// src/features/hide-donate.js

(function() {
    'use strict';

    var donateHidden = false;

    function apply() {
        if (donateHidden) return;

        var donate = document.querySelector('a[href="/donate"]');
        if (!donate) {
            setTimeout(apply, 500);
            return;
        }

        var parent = donate.closest('[class*="linkContainer"]');
        if (parent) {
            parent.remove();
            donateHidden = true;
        }

        // Fix spacing for remaining nav items
        var games = document.querySelector('a[href="/games"]');
        if (games) {
            var container = games.closest('[class*="container"]');
            if (container) {
                container.querySelectorAll('[class*="linkContainer"]').forEach(function(link) {
                    link.classList.remove('col-3');
                    link.classList.add('col-4');
                });
            }
        }
    }

    window.NX = window.NX || {};
    window.NX.features = window.NX.features || {};
    window.NX.features.hideDonate = {
        apply: apply
    };

})();
