(function() {
    'use strict';

    window.NX = window.NX || {};
    window.NX.features = window.NX.features || {};

    window.NX.features.hideAlert = {
        apply: function() {
            if (document.getElementById('nx-hide-alert')) return;
            var s = document.createElement('style');
            s.id = 'nx-hide-alert';
            s.textContent = `
                .fakeAlert-0-2-41,
                [class*="fakeAlert-"],
                .alertBg-0-2-38,
                [class*="alertBg-"] {
                    display: none !important;
                }
            `;
            document.head.appendChild(s);
        }
    };

})();
