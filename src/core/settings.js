(function() {
    'use strict';

    const DEFAULTS = {
        panelIcon: false,
        hideAlert: false,
        removeAds: false,
        copyUserId: false
    };

    function get(key) {
        var val = GM_getValue('nx_' + key);
        return val !== undefined ? val : DEFAULTS[key];
    }

    function set(key, val) {
        GM_setValue('nx_' + key, val);
    }

    function getAll() {
        var all = {};
        for (var key in DEFAULTS) {
            all[key] = get(key);
        }
        return all;
    }

    function reset() {
        for (var key in DEFAULTS) {
            GM_setValue('nx_' + key, DEFAULTS[key]);
        }
    }

    window.NX = window.NX || {};
    window.NX.settings = {
        get: get,
        set: set,
        getAll: getAll,
        reset: reset,
        defaults: DEFAULTS
    };

})();
