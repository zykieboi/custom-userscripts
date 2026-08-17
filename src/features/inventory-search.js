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

        var innerWrapper = document.createElement('div');
        innerWrapper.style.cssText = 'width: 100%; position: relative; display: flex; align-items: center;';

        var input = document.createElement('input');
        input.className = 'searchInput-0-2-80';
        input.placeholder = 'Search inventory...';
        input.style.cssText = `
            flex: 1;
            padding: 6px 12px;
            border: 1px solid #ccc;
            border-radius: 4px 0 0 4px;
            font-size: 14px;
            height: 32px;
            background: #fff;
            color: #333;
            outline: none;
            box-sizing: border-box;
            border-right: none;
        `;

        var iconContainer = document.createElement('div');
        iconContainer.className = 'searchIconContainer-0-2-83';
        iconContainer.style.cssText = `
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0 10px;
            border: 1px solid #ccc;
            border-radius: 0 4px 4px 0;
            background: #f5f5f5;
            height: 32px;
            box-sizing: border-box;
            cursor: pointer;
            min-width: 34px;
            flex-shrink: 0;
        `;

        // Use the same icon as the top nav search
        var iconSpan = document.createElement('span');
        iconSpan.className = 'icon-nav-search';
        iconSpan.style.cssText = `
            display: inline-block;
            width: 16px;
            height: 16px;
            background-image: url('/img/navigation_02012016.svg');
            background-position: 0 -112px;
            background-repeat: no-repeat;
            background-size: auto auto;
            flex-shrink: 0;
        `;

        iconContainer.appendChild(iconSpan);
        innerWrapper.appendChild(input);
        innerWrapper.appendChild(iconContainer);
        searchWrapper.appendChild(innerWrapper);

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

        iconContainer.addEventListener('click', function() {
            input.focus();
        });

        if (container.firstChild) {
            container.insertBefore(searchWrapper, container.firstChild);
        } else {
            container.appendChild(searchWrapper);
        }

        var observer = new MutationObserver(function() {
            if (!container.querySelector('.nx-inventory-search')) {
                if (container.firstChild) {
                    container.insertBefore(searchWrapper, container.firstChild);
                } else {
                    container.appendChild(searchWrapper);
                }
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
