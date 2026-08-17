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
        searchWrapper.style.cssText = 'padding: 10px 0; width: 100%;';

        var input = document.createElement('input');
        input.type = 'text';
        input.placeholder = 'Search inventory...';
        input.style.cssText = 'padding: 8px 14px; border: 1px solid #ccc; border-radius: 4px; font-size: 14px; width: 100%; max-width: 400px; background: #fff; color: #333; outline: none; box-sizing: border-box;';

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

        var tabContainer = container.querySelector('.buttonCol-0-2-51, .buttonCol-0-2-718');
        if (tabContainer) {
            container.insertBefore(searchWrapper, tabContainer);
        } else {
            container.prepend(searchWrapper);
        }

        var observer = new MutationObserver(function() {
            setTimeout(filterItems, 200);
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
