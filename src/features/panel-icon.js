(function() {
    'use strict';

    var panelAdded = false;

    function apply() {
        if (panelAdded) return;

        var upgrade = document.querySelector('.upgradeNowButton-0-2-99, .upgradeNowButton-0-2-104, [class*="upgradeNowButton"]');
        if (!upgrade) {
            setTimeout(apply, 500);
            return;
        }

        if (document.querySelector('.hover-icon-nav-panel')) return;

        var container = upgrade.parentElement;

        var firstLink = container.querySelector('a[href*="/home"]');
        if (!firstLink) {
            setTimeout(apply, 500);
            return;
        }

        var link = document.createElement('a');
        link.className = 'link-0-2-201 link-d40-0-2-300';
        link.href = '/panel';
        link.style.color = 'inherit';

        var wrapper = document.createElement('div');
        wrapper.className = 'wrapper-0-2-200 hover-icon-nav-panel';

        var p = document.createElement('p');
        p.className = 'linkEntry-0-2-198';

        var icon = document.createElement('span');
        icon.className = 'icon-nav-panel';

        var name = document.createElement('span');
        name.className = 'name-0-2-199';
        name.textContent = 'Panel';

        p.appendChild(icon);
        p.appendChild(document.createTextNode(' '));
        p.appendChild(name);
        wrapper.appendChild(p);
        link.appendChild(wrapper);

        container.insertBefore(link, upgrade);

        var style = document.createElement('style');
        style.textContent = `
            .icon-nav-panel {
                display: inline-block;
                width: 20px;
                height: 20px;
                background-image: url('/img/generic_03112016.svg');
                background-position: 0 -84px;
                background-repeat: no-repeat;
                background-size: auto auto;
                vertical-align: middle;
            }
            .hover-icon-nav-panel:hover .icon-nav-panel {
                background-position: -28px -84px;
            }
        `;
        document.head.appendChild(style);

        panelAdded = true;
    }

    window.NX = window.NX || {};
    window.NX.features = window.NX.features || {};
    window.NX.features.panelIcon = {
        apply: apply
    };

})();
