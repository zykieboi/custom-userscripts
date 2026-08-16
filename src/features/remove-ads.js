(function() {
    'use strict';

    var adStyleAdded = false;

    function apply() {
        if (adStyleAdded) return;

        var style = document.createElement('style');
        style.textContent = `
            [class*="adWrapper"],
            [class*="ad-"],
            [class*="Ad"],
            .adWrapper-0-2-7,
            .adWrapper-0-2-11,
            .adWrapper-0-2-39,
            .adWrapper-0-2-47,
            .adWrapper-0-2-163 {
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
