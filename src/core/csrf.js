(function() {
    'use strict';

    window.NX_CSRF = window.NX_CSRF || GM_getValue('nx_csrf', '') || '';

    var origFetch = window.fetch;
    window.fetch = function(input, init) {
        var p = origFetch.apply(this, arguments);
        try {
            p.then(function(res) {
                var t = res && res.headers && res.headers.get('x-csrf-token');
                if (t) {
                    window.NX_CSRF = t;
                    GM_setValue('nx_csrf', t);
                }
            }).catch(function() {});
        } catch (e) {}
        return p;
    };

    var origOpen = XMLHttpRequest.prototype.open;
    var origSend = XMLHttpRequest.prototype.send;

    XMLHttpRequest.prototype.open = function(method, url) {
        this._nxUrl = url;
        this.addEventListener('load', function() {
            try {
                var t = this.getResponseHeader && this.getResponseHeader('x-csrf-token');
                if (t) {
                    window.NX_CSRF = t;
                    GM_setValue('nx_csrf', t);
                }
            } catch (e) {}
        });
        return origOpen.apply(this, arguments);
    };

    XMLHttpRequest.prototype.send = origSend;
})();
