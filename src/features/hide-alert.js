(function() {
    'use strict';

    function apply() {
        var alert = document.querySelector('[class*="alertBg-"]');
        if (alert) {
            alert.style.display = 'none';
        } else {
            setTimeout(apply, 400);
        }
    }

    window.NX = window.NX || {};
    window.NX.features = window.NX.features || {};
    window.NX.features.hideAlert = {
        apply: apply
    };

})();
