// src/features/inventory-search.js

(function() {
    'use strict';

    var searchAdded = false;

    function apply() {
        if (searchAdded) return;

        var container = document.querySelector('.itemContainer-0-2-703');
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

        input.addEventListener('input', function() {
            var query = this.value.toLowerCase().trim();
            var items = container.querySelectorAll('.avatarCardWrapper-0-2-729');
            var count = 0;

            items.forEach(function(item) {
                var link = item.querySelector('.avatarCardItemLink-0-2-732');
                if (!link) return;
                var text = link.textContent.toLowerCase();
                if (text.includes(query)) {
                    item.style.display = '';
                    count++;
                } else {
                    item.style.display = 'none';
                }
            });

            var noResults = container.querySelector('.nx-no-results');
            if (count === 0 && query.length > 0) {
                if (!noResults) {
                    noResults = document.createElement('div');
                    noResults.className = 'nx-no-results';
                    noResults.style.cssText = 'padding: 20px 0; color: #999; font-size: 14px; text-align: center;';
                    noResults.textContent = 'No items found matching "' + query + '"';
                    container.appendChild(noResults);
                }
            } else if (noResults) {
                noResults.remove();
            }
        });

        searchWrapper.appendChild(input);

        var target = container.querySelector('.buttonCol-0-2-718');
        if (target) {
            target.parentNode.insertBefore(searchWrapper, target.nextSibling);
        } else {
            container.prepend(searchWrapper);
        }

        searchAdded = true;
    }

    window.NX = window.NX || {};
    window.NX.features = window.NX.features || {};
    window.NX.features.inventorySearch = {
        apply: apply
    };

})();
