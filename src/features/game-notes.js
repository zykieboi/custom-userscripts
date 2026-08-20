// src/features/game-notes.js

(function() {
    'use strict';

    function apply() {
        var gamePage = document.querySelector('.gameName-0-2-56, .gameName-0-2-32, .gameName-0-2-28');
        if (!gamePage) {
            setTimeout(apply, 500);
            return;
        }

        var gameTitle = gamePage.textContent.trim();
        var gameId = window.location.pathname.match(/\/games\/(\d+)/);
        if (!gameId) return;
        gameId = gameId[1];

        var key = 'nx_game_note_' + gameId;
        var savedNote = GM_getValue(key, '');

        var container = document.querySelector('.descriptionContainer-0-2-113, .subSectionContainer-0-2-136');
        if (!container) {
            setTimeout(apply, 500);
            return;
        }

        var noteDiv = document.createElement('div');
        noteDiv.style.cssText = 'margin-top: 16px; padding-top: 16px; border-top: 1px solid #eee;';

        var label = document.createElement('label');
        label.textContent = 'Game Note';
        label.style.cssText = 'font-weight: 600; font-size: 14px; color: #333; display: block; margin-bottom: 4px;';

        var textarea = document.createElement('textarea');
        textarea.placeholder = 'Add a private note for this game...';
        textarea.value = savedNote;
        textarea.style.cssText = 'width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px; font-size: 14px; resize: vertical; min-height: 60px; background: #fff; color: #333; box-sizing: border-box;';

        textarea.addEventListener('input', function() {
            GM_setValue(key, this.value);
        });

        noteDiv.appendChild(label);
        noteDiv.appendChild(textarea);
        container.appendChild(noteDiv);
    }

    window.NX = window.NX || {};
    window.NX.features = window.NX.features || {};
    window.NX.features.gameNotes = {
        apply: apply
    };

})();
