(function() {
    'use strict';

    window.NX_CSRF = GM_getValue('nx_csrf', '');

    var originalOpen = XMLHttpRequest.prototype.open;
    var originalSetHeader = XMLHttpRequest.prototype.setRequestHeader;

    XMLHttpRequest.prototype.open = function(method, url) {
        this._nxUrl = url;
        return originalOpen.apply(this, arguments);
    };

    XMLHttpRequest.prototype.setRequestHeader = function(header, value) {
        if (header.toLowerCase() === 'x-csrf-token' && value) {
            window.NX_CSRF = value;
            GM_setValue('nx_csrf', value);
        }
        return originalSetHeader.apply(this, arguments);
    };

    var originalFetch = window.fetch;
    window.fetch = function(url, opts) {
        if (opts && opts.headers) {
            var headers = opts.headers;
            if (headers instanceof Headers) {
                var token = headers.get('X-CSRF-Token');
                if (token) {
                    window.NX_CSRF = token;
                    GM_setValue('nx_csrf', token);
                }
            } else if (typeof headers === 'object') {
                var token = headers['X-CSRF-Token'] || headers['x-csrf-token'];
                if (token) {
                    window.NX_CSRF = token;
                    GM_setValue('nx_csrf', token);
                }
            }
        }
        return originalFetch.apply(this, arguments);
    };

})();
