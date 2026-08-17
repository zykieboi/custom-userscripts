// src/features/inventory-search.js

(function() {
    'use strict';

    var searchAdded = false;

    function apply() {
        if (searchAdded) return;

        var container = document.querySelector('.itemContainer-0-2-21, .itemContainer-0-2-703');
        if (!container) {
            setTimeout(apply, 500);
            return;
        }

        var existing = container.querySelector('.nx-inventory-search');
        if (existing) return;

        var searchWrapper = document.createElement('div');
        searchWrapper.className = 'nx-inventory-search';
        searchWrapper.style.cssText = 'padding: 10px 0 10px 0; width: 100%; border-bottom: 1px solid rgba(0,0,0,0.05); margin-bottom: 4px;';

        var input = document.createElement('input');
        input.type = 'text';
        input.placeholder = 'Search inventory...';
        input.style.cssText = 'padding: 8px 14px; border: 1px solid #ddd; border-radius: 6px; font-size: 14px; width: 100%; max-width: 400px; background: #fff; color: #333; outline: none; box-sizing: border-box; transition: border-color 0.2s;';
        input.addEventListener('focus', function() {
            this.style.borderColor = '#667eea';
        });
        input.addEventListener('blur', function() {
            this.style.borderColor = '#ddd';
        });

        function filterItems() {
            var query = input.value.toLowerCase().trim();
            var items = container.querySelectorAll('.avatarCardWrapper-0-2-160, .avatarCardWrapper-0-2-729');

            items.forEach(function(item) {
                var link = item.querySelector('.avatarCardItemLink-0-2-163, .avatarCardItemLink-0-2-732');
                if (!link) return;
                var text = link.textContent.toLowerCase();
                item.style.display = text.includes(query) ? '' : 'none';
            });
        }

        input.addEventListener('input', filterItems);

        searchWrapper.appendChild(input);

        // Insert at the very top of the container
        if (container.firstChild) {
            container.insertBefore(searchWrapper, container.firstChild);
        } else {
            container.appendChild(searchWrapper);
        }

        // Watch for tab changes
        var observer = new MutationObserver(function() {
            // Check if search bar is still there, if not re-add
            if (!container.querySelector('.nx-inventory-search')) {
                container.insertBefore(searchWrapper, container.firstChild);
            }
            setTimeout(filterItems, 300);
        });

        observer.observe(container, {
            childList: true,
            subtree: true
        });

        searchAdded = true;
    }

    window.NX = window.NX || {};
    window.NX.features = window.NX.features || {};
    window.NX.features.inventorySearch = {
        apply: apply
    };

})();
