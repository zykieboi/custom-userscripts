// src/features/friend-notes.js

(function() {
    'use strict';

    function apply() {
        var usernameEl = document.querySelector('.username-0-2-108, .username-0-2-181');
        if (!usernameEl) {
            setTimeout(apply, 500);
            return;
        }

        var username = usernameEl.textContent.trim();
        var userId = window.location.pathname.match(/\/users\/(\d+)/);
        if (!userId) return;
        userId = userId[1];

        var key = 'nx_friend_note_' + userId;
        var savedNote = GM_getValue(key, '');

        var container = document.querySelector('.userInfoContainer-0-2-123, .profileHeaderContainer-0-2-120');
        if (!container) {
            setTimeout(apply, 500);
            return;
        }

        var noteDiv = document.createElement('div');
        noteDiv.style.cssText = 'margin-top: 8px;';

        var label = document.createElement('label');
        label.textContent = 'Friend Note';
        label.style.cssText = 'font-weight: 600; font-size: 13px; color: #555; display: block; margin-bottom: 2px;';

        var input = document.createElement('input');
        input.type = 'text';
        input.placeholder = 'Add a private note for this user...';
        input.value = savedNote;
        input.style.cssText = 'width: 100%; padding: 6px 10px; border: 1px solid #ccc; border-radius: 4px; font-size: 13px; background: #fff; color: #333; box-sizing: border-box;';

        input.addEventListener('input', function() {
            GM_setValue(key, this.value);
        });

        noteDiv.appendChild(label);
        noteDiv.appendChild(input);
        container.appendChild(noteDiv);
    }

    window.NX = window.NX || {};
    window.NX.features = window.NX.features || {};
    window.NX.features.friendNotes = {
        apply: apply
    };

})();
