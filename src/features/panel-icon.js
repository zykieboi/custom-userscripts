(function() {
    'use strict';

    var panelAdded = false;

    function apply() {
        if (panelAdded) return;

        var style = document.createElement('style');
        style.textContent = `
            .icon-nav-panel {
                background-image: url('/img/generic_03112016.svg');
                background-position: 0 -84px;
                background-repeat: no-repeat;
                background-size: auto auto;
                width: 28px;
                height: 28px;
                display: inline-block;
                vertical-align: middle;
            }
            .hover-icon-nav-panel:hover .icon-nav-panel {
                background-position: -28px -84px;
            }
            .hover-icon-nav-panel:hover {
                color: #f68802;
            }
            .hover-icon-nav-panel {
                margin-bottom: 8px !important;
            }
        `;
        document.head.appendChild(style);

        var upgrade = document.querySelector('[href*="Upgrade"], .upgradeNowButton-0-2-144, .upgradeNowButton-0-2-80');
        if (!upgrade) {
            setTimeout(apply, 400);
            return;
        }

        if (document.querySelector('.hover-icon-nav-panel')) return;

        var container = upgrade.parentElement;
        var first = container.querySelector('a[class*="link-"]');
        if (!first) return;

        var lc = first.className;
        var wc = (first.querySelector('div[class*="wrapper-"]') || {}).className || 'wrapper-0-2-210';
        var pc = (first.querySelector('p[class*="linkEntry-"]') || {}).className || 'linkEntry-0-2-208';
        var ic = (first.querySelector('span[class*="icon-"]') || {}).className || 'icon-0-2-214';
        var nc = (first.querySelector('span[class*="name-"]') || {}).className || 'name-0-2-209';

        var link = document.createElement('a');
        link.className = lc;
        link.href = '/panel';
        link.style.color = 'inherit';

        var wrap = document.createElement('div');
        wrap.className = wc + ' hover-icon-nav-panel';

        var p = document.createElement('p');
        p.className = pc;

        var icon = document.createElement('span');
        icon.className = 'icon-nav-panel ' + ic;

        var name = document.createElement('span');
        name.className = nc;
        name.textContent = 'Panel';

        p.appendChild(icon);
        p.appendChild(document.createTextNode(' '));
        p.appendChild(name);
        wrap.appendChild(p);
        link.appendChild(wrap);

        container.insertBefore(link, upgrade);
        panelAdded = true;
    }

    window.NX = window.NX || {};
    window.NX.features = window.NX.features || {};
    window.NX.features.panelIcon = {
        apply: apply
    };

})();
