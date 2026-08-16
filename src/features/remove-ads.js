// src/features/remove-ads.js

(function() {
    'use strict';

    var adStyleAdded = false;

    function apply() {
        if (adStyleAdded) return;

        var style = document.createElement('style');
        style.textContent = `
            .adWrapper-0-2-7,
            .adWrapper-0-2-11,
            .adWrapper-0-2-15,
            .adWrapper-0-2-39,
            .adWrapper-0-2-47,
            .adWrapper-0-2-163,
            [class*="adWrapper-"] {
                display: none !important;
            }
        `;
        document.head.appendChild(style);
        adStyleAdded = true;
    }

    window.NX = window.NX || {};
    window.NX.features = window.NX.features || {};
    window.NX.features.removeAds = {
        apply: apply
    };

})();
