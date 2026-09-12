(function() {
    'use strict';

    var added = false;

    function apply() {
        if (added) return;

        var style = document.createElement('style');
        style.textContent = `
            .adWrapper-0-2-106,
            [class*="adWrapper-"],
            [class*="ad-"] {
                display: none !important;
            }
        `;
        document.head.appendChild(style);
        added = true;
    }

    window.NX = window.NX || {};
    window.NX.features = window.NX.features || {};
    window.NX.features.removeAds = {
        apply: apply
    };

})();
