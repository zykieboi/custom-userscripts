// src/features/wishlist.js

(function() {
    'use strict';

    function apply() {
        var assetId = window.location.pathname.match(/\/catalog\/(\d+)/);
        if (!assetId) {
            setTimeout(apply, 500);
            return;
        }
        assetId = assetId[1];

        var key = 'nx_wishlist';
        var wishlist = GM_getValue(key, '[]');
        try {
            wishlist = JSON.parse(wishlist);
        } catch(e) {
            wishlist = [];
        }

        var isWishlisted = wishlist.includes(assetId);

        var container = document.querySelector('.text-0-2-160, .callsToAction-0-2-20, .callsToAction-0-2-48, .callsToAction-0-2-24');
        if (!container) {
            setTimeout(apply, 500);
            return;
        }

        var wishBtn = document.createElement('button');
        wishBtn.textContent = isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist';
        wishBtn.style.cssText = `
            padding: 6px 14px;
            border: 1px solid ${isWishlisted ? '#e74c3c' : '#ccc'};
            border-radius: 4px;
            background: ${isWishlisted ? '#ffeaea' : '#fff'};
            color: ${isWishlisted ? '#e74c3c' : '#333'};
            cursor: pointer;
            font-size: 13px;
            font-weight: 500;
            margin-top: 8px;
            transition: 0.2s;
        `;

        wishBtn.addEventListener('mouseover', function() {
            this.style.opacity = '0.8';
        });
        wishBtn.addEventListener('mouseout', function() {
            this.style.opacity = '1';
        });

        wishBtn.addEventListener('click', function() {
            var current = GM_getValue(key, '[]');
            try {
                current = JSON.parse(current);
            } catch(e) {
                current = [];
            }

            var index = current.indexOf(assetId);
            if (index > -1) {
                current.splice(index, 1);
                this.textContent = 'Add to Wishlist';
                this.style.borderColor = '#ccc';
                this.style.background = '#fff';
                this.style.color = '#333';
            } else {
                current.push(assetId);
                this.textContent = 'Remove from Wishlist';
                this.style.borderColor = '#e74c3c';
                this.style.background = '#ffeaea';
                this.style.color = '#e74c3c';
            }
            GM_setValue(key, JSON.stringify(current));
        });

        container.appendChild(wishBtn);
    }

    window.NX = window.NX || {};
    window.NX.features = window.NX.features || {};
    window.NX.features.wishlist = {
        apply: apply
    };

})();
