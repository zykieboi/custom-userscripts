(function() {
    'use strict';

    window.NX = window.NX || {};

    var API = '';

    function getToken() {
        var t = GM_getValue('nx_token', '');
        if (t && t.length >= 32) return t;
        var arr = new Uint8Array(32);
        (window.crypto || window.msCrypto).getRandomValues(arr);
        t = Array.from(arr).map(function(b) { return ('0' + b.toString(16)).slice(-2); }).join('');
        GM_setValue('nx_token', t);
        return t;
    }

    function request(method, path, body) {
        return new Promise(function(resolve, reject) {
            GM_xmlhttpRequest({
                method: method,
                url: API + path,
                headers: {
                    'Content-Type': 'application/json',
                    'X-Nexus-Token': getToken()
                },
                data: body ? JSON.stringify(body) : undefined,
                onload: function(res) {
                    var data;
                    try { data = JSON.parse(res.responseText); }
                    catch (e) { data = { raw: res.responseText }; }
                    resolve({ status: res.status, data: data });
                },
                onerror: function() { reject(new Error('network error')); }
            });
        });
    }

    window.NX.server = {
        api: API,
        getToken: getToken,
        claim: function(aisakaId, username) {
            return request('POST', '/claim', { aisakaId: aisakaId, username: username });
        },
        me: function() { return request('GET', '/me'); },
        config: function() { return request('GET', '/config'); },
        adminUsers: function() { return request('GET', '/admin/users'); },
        adminAnnounce: function(text) { return request('POST', '/admin/announce', { text: text }); },
        adminBan: function(tokenPreview) { return request('POST', '/admin/ban', { tokenPreview: tokenPreview }); }
    };
})();
