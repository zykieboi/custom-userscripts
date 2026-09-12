(function() {
    'use strict';

    var added = false;

    function apply() {
        if (added) return;

        var container = document.querySelector('.itemContainer-0-2-344, [class*="itemContainer-"]');
        if (!container) {
            setTimeout(apply, 500);
            return;
        }

        var existing = container.querySelector('.nx-inventory-search');
        if (existing) return;

        var wrapper = document.createElement('div');
        wrapper.className = 'nx-inventory-search';
        wrapper.style.cssText = 'padding: 10px 0; width: 100%;';

        var input = document.createElement('input');
        input.type = 'text';
        input.placeholder = 'Search inventory...';
        input.style.cssText = 'padding: 8px 14px; border: 1px solid #3a3c3e; border-radius: 6px; font-size: 14px; width: 100%; max-width: 400px; background: #2a2c2e; color: #e0e0e0; outline: none; box-sizing: border-box;';

        function filterItems() {
            var query = input.value.toLowerCase().trim();
            var items = container.querySelectorAll('.avatarCardWrapper-0-2-406, [class*="avatarCardWrapper-"]');

            items.forEach(function(item) {
                var link = item.querySelector('.avatarCardItemLink-0-2-411, [class*="avatarCardItemLink-"]');
                if (!link) return;
                var text = link.textContent.toLowerCase();
                item.style.display = text.includes(query) ? '' : 'none';
            });
        }

        input.addEventListener('input', filterItems);

        wrapper.appendChild(input);
        container.prepend(wrapper);

        var observer = new MutationObserver(function() {
            setTimeout(filterItems, 200);
        });

        observer.observe(container, {
            childList: true,
            subtree: true
        });

        added = true;
    }

    window.NX = window.NX || {};
    window.NX.features = window.NX.features || {};
    window.NX.features.inventorySearch = {
        apply: apply
    };

})();
