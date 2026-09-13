(function() {
    'use strict';

    function getCsrfToken() {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            if (cookie.indexOf('rbxcsrf4=') === 0) {
                var value = cookie.substring('rbxcsrf4='.length, cookie.length);
                try {
                    var parts = value.split('.');
                    if (parts.length === 3) {
                        var payload = JSON.parse(atob(parts[1]));
                        return payload.csrf;
                    }
                } catch (e) {
                    console.error('NX: Failed to parse CSRF token', e);
                }
            }
        }
        return null;
    }

    function getUserId() {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            if (cookie.indexOf('.ROBLOSECURITY=') === 0) {
                var value = cookie.substring('.ROBLOSECURITY='.length, cookie.length);
                try {
                    var parts = value.split('.');
                    if (parts.length === 3) {
                        var payload = JSON.parse(atob(parts[1]));
                        return payload.userId;
                    }
                } catch (e) {
                    console.error('NX: Failed to parse user ID', e);
                }
            }
        }
        return null;
    }

    function apply() {
        var container = document.querySelector('.friendsContainer-0-2-202, [class*="friendsContainer"]');
        if (!container) {
            setTimeout(apply, 500);
            return;
        }

        if (container.querySelector('.nx-bulk-toolbar')) return;

        var cards = container.querySelectorAll('.friendCardWrapper-0-2-205, [class*="friendCardWrapper"]');
        if (!cards.length) {
            setTimeout(apply, 500);
            return;
        }

        cards.forEach(function(card) {
            if (card.querySelector('.nx-friend-checkbox')) return;

            var checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.className = 'nx-friend-checkbox';
            checkbox.style.cssText = 'position: absolute; top: 8px; right: 8px; z-index: 10; width: 18px; height: 18px; cursor: pointer;';

            card.style.position = 'relative';
            card.appendChild(checkbox);
        });

        var toolbar = document.createElement('div');
        toolbar.className = 'nx-bulk-toolbar';
        toolbar.style.cssText = 'display: flex; align-items: center; gap: 12px; padding: 10px 0; margin-bottom: 10px;';

        var selectAll = document.createElement('button');
        selectAll.textContent = 'Select All';
        selectAll.style.cssText = 'padding: 6px 14px; background: #0066ff; color: #fff; border: none; border-radius: 4px; cursor: pointer; font-size: 13px;';

        var deselectAll = document.createElement('button');
        deselectAll.textContent = 'Deselect All';
        deselectAll.style.cssText = 'padding: 6px 14px; background: #555; color: #fff; border: none; border-radius: 4px; cursor: pointer; font-size: 13px;';

        var unfriendBtn = document.createElement('button');
        unfriendBtn.textContent = 'Unfriend Selected';
        unfriendBtn.style.cssText = 'padding: 6px 14px; background: #d9534f; color: #fff; border: none; border-radius: 4px; cursor: pointer; font-size: 13px; margin-left: auto;';

        var counter = document.createElement('span');
        counter.style.cssText = 'font-size: 13px; color: #999;';
        counter.textContent = '0 selected';

        function updateCount() {
            var checked = container.querySelectorAll('.nx-friend-checkbox:checked').length;
            counter.textContent = checked + ' selected';
        }

        selectAll.onclick = function() {
            container.querySelectorAll('.nx-friend-checkbox').forEach(function(cb) {
                cb.checked = true;
            });
            updateCount();
        };

        deselectAll.onclick = function() {
            container.querySelectorAll('.nx-friend-checkbox').forEach(function(cb) {
                cb.checked = false;
            });
            updateCount();
        };

        unfriendBtn.onclick = async function() {
            var checked = container.querySelectorAll('.nx-friend-checkbox:checked');
            if (!checked.length) {
                alert('No friends selected');
                return;
            }

            if (!confirm('Unfriend ' + checked.length + ' friend(s)?')) return;

            var csrfToken = getCsrfToken();
            var myUserId = getUserId();

            if (!csrfToken || !myUserId) {
                alert('Failed to get CSRF token or user ID');
                return;
            }

            var unfriended = 0;
            var failed = 0;

            for (var i = 0; i < checked.length; i++) {
                var card = checked[i].closest('.friendCardWrapper-0-2-205, [class*="friendCardWrapper"]');
                if (!card) continue;

                var link = card.querySelector('a[href*="/users/"]');
                if (!link) continue;

                var match = link.getAttribute('href').match(/\/users\/(\d+)/);
                if (!match) continue;

                var targetId = parseInt(match[1]);

                try {
                    var response = await fetch('/apisite/friends/v1/users/' + myUserId + '/unfriend', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'X-CSRF-Token': csrfToken
                        },
                        body: JSON.stringify({
                            targetUserId: targetId
                        })
                    });

                    if (response.ok) {
                        card.style.opacity = '0.3';
                        card.style.pointerEvents = 'none';
                        unfriended++;
                    } else {
                        failed++;
                    }
                } catch (e) {
                    failed++;
                }

                await new Promise(function(resolve) { setTimeout(resolve, 500); });
            }

            alert('Unfriended: ' + unfriended + '\nFailed: ' + failed);
            updateCount();
        };

        container.addEventListener('change', function(e) {
            if (e.target.classList.contains('nx-friend-checkbox')) {
                updateCount();
            }
        });

        toolbar.appendChild(selectAll);
        toolbar.appendChild(deselectAll);
        toolbar.appendChild(counter);
        toolbar.appendChild(unfriendBtn);

        var firstRow = container.querySelector('.row');
        if (firstRow) {
            firstRow.parentNode.insertBefore(toolbar, firstRow);
        } else {
            container.prepend(toolbar);
        }
    }

    window.NX = window.NX || {};
    window.NX.features = window.NX.features || {};
    window.NX.features.bulkUnfriend = {
        apply: apply
    };

})();
