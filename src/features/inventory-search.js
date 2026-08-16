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

        var searchWrapper = document.createElement('div');
        searchWrapper.style.cssText = 'padding: 10px 0; display: flex; gap: 8px; align-items: center;';

        var label = document.createElement('span');
        label.textContent = 'Search:';
        label.style.cssText = 'font-size: 14px; color: #555; font-weight: 500;';

        var input = document.createElement('input');
        input.type = 'text';
        input.placeholder = 'Filter items...';
        input.style.cssText = 'padding: 6px 12px; border: 1px solid #ccc; border-radius: 4px; font-size: 14px; flex: 1; min-width: 150px; background: #fff; color: #333;';

        var clearBtn = document.createElement('button');
        clearBtn.textContent = '×';
        clearBtn.style.cssText = 'padding: 4px 10px; border: none; background: #e0e0e0; border-radius: 4px; cursor: pointer; font-size: 16px; color: #555; display: none;';
        clearBtn.title = 'Clear search';

        var items = container.querySelectorAll('.avatarCardWrapper-0-2-729');

        input.addEventListener('input', function() {
            var query = this.value.toLowerCase().trim();
            clearBtn.style.display = query ? 'block' : 'none';

            items.forEach(function(item) {
                var link = item.querySelector('.avatarCardItemLink-0-2-732');
                if (!link) return;
                var text = link.textContent.toLowerCase();
                item.style.display = text.includes(query) ? '' : 'none';
            });
        });

        clearBtn.addEventListener('click', function() {
            input.value = '';
            input.dispatchEvent(new Event('input'));
            input.focus();
        });

        searchWrapper.appendChild(label);
        searchWrapper.appendChild(input);
        searchWrapper.appendChild(clearBtn);

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
