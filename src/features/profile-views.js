// src/features/profile-views.js

(function() {
    'use strict';

    function apply() {
        var userId = window.location.pathname.match(/\/users\/(\d+)/);
        if (!userId) {
            setTimeout(apply, 500);
            return;
        }
        userId = userId[1];

        var key = 'nx_profile_views_' + userId;
        var currentViews = GM_getValue(key, 0);

        // Increment view count (only once per session)
        var sessionKey = 'nx_profile_viewed_' + userId;
        if (!sessionStorage.getItem(sessionKey)) {
            currentViews++;
            GM_setValue(key, currentViews);
            sessionStorage.setItem(sessionKey, 'true');
        }

        var container = document.querySelector('.statText-0-2-135');
        if (!container) {
            setTimeout(apply, 500);
            return;
        }

        var parent = container.closest('.relationshipList-0-2-127');
        if (!parent) {
            setTimeout(apply, 500);
            return;
        }

        var li = document.createElement('li');
        li.style.cssText = 'width: 25%; float: left; padding: 0 5px; text-align: center;';

        var header = document.createElement('div');
        header.className = 'statHeader-0-2-132';
        header.textContent = 'Profile Views';

        var link = document.createElement('a');
        link.className = 'statTextContainer-0-2-134';
        link.href = '#';

        var h3 = document.createElement('h3');
        h3.className = 'statText-0-2-135';
        h3.textContent = currentViews;

        link.appendChild(h3);
        li.appendChild(header);
        li.appendChild(link);
        parent.appendChild(li);
    }

    window.NX = window.NX || {};
    window.NX.features = window.NX.features || {};
    window.NX.features.profileViews = {
        apply: apply
    };

})();
