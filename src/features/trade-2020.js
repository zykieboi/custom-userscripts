(function() {
    'use strict';

    window.NX = window.NX || {};
    window.NX.features = window.NX.features || {};

    var CATEGORIES = [
        { value: 'null', label: 'All Accessories' },
        { value: 'Hat',  label: 'Hats' },
        { value: 'HairAccessory', label: 'Hair' },
        { value: 'FaceAccessory', label: 'Face' },
        { value: 'NeckAccessory', label: 'Neck' },
        { value: 'ShoulderAccessory', label: 'Shoulders' },
        { value: 'FrontAccessory', label: 'Front' },
        { value: 'BackAccessory', label: 'Back' },
        { value: 'WaistAccessory', label: 'Waist' },
        { value: 'Gear', label: 'Gear' },
        { value: 'Face', label: 'Faces' }
    ];

    var CSS = [
        '.nx20-root{color:var(--text-color-primary,#e8e8e8);min-height:calc(100vh - 88px);padding:24px;font-family:Arial,Helvetica,sans-serif;box-sizing:border-box}',
        '.nx20-root *{box-sizing:border-box}',
        '.nx20-shell{max-width:1210px;margin:0 auto}',
        '.nx20-title{font-size:34px;font-weight:400;margin:0 0 26px}',
        '.nx20-wrap{display:grid;grid-template-columns:minmax(0,704px) minmax(340px,390px);gap:28px;align-items:start}',
        '@media(max-width:980px){.nx20-wrap{grid-template-columns:1fr}}',
        '.nx20-sec{padding-bottom:28px;margin-bottom:28px;border-bottom:1px solid var(--text-color-quinary,#3a3d40)}',
        '.nx20-sec-head{display:grid;grid-template-columns:1fr 280px;gap:18px;align-items:center;margin-bottom:20px}',
        '.nx20-sec-title{font-size:23px;font-weight:400;margin:0}',
        '.nx20-select{height:39px;width:100%;padding:0 12px;font-size:18px;background:var(--white-color,#2a2c2e);color:var(--text-color-primary,#e8e8e8);border:1px solid #666}',
        '.nx20-items{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:16px 9px}',
        '.nx20-item{display:block;width:100%;padding:0;border:0;background:transparent;color:inherit;text-align:left;cursor:pointer}',
        '.nx20-thumb{position:relative;aspect-ratio:1/1;background:rgba(255,255,255,0.06);border:1px solid transparent;overflow:hidden}',
        '.nx20-thumb.sel{border-color:#666}',
        '.nx20-thumb img{width:100%;height:100%;object-fit:contain}',
        '.nx20-check{position:absolute;top:8px;right:8px;width:25px;height:25px;background:#fff;color:#111;text-align:center;line-height:22px}',
        '.nx20-name{min-height:42px;margin:7px 0 1px;font-size:17px;line-height:1.18}',
        '.nx20-val{color:var(--robux-color,#3ecf5a);font-size:17px}',
        '.nx20-empty{min-height:120px;display:flex;align-items:center;justify-content:center;color:#999}',
        '.nx20-side{border-left:1px solid var(--text-color-quinary,#3a3d40);padding-left:28px}',
        '.nx20-side-sec{margin-bottom:40px}',
        '.nx20-slots{display:grid;gap:16px}',
        '.nx20-slot{height:73px;display:flex;align-items:center;border:1px dashed #666;background:rgba(255,255,255,0.04)}',
        '.nx20-slot.filled{border-style:solid}',
        '.nx20-slot-in{width:100%;display:grid;grid-template-columns:52px 1fr;gap:10px;align-items:center;padding:8px;border:0;background:transparent;color:inherit;text-align:left;cursor:pointer}',
        '.nx20-slot-img{width:42px;height:42px;background:rgba(255,255,255,0.06)}',
        '.nx20-slot-img img{width:100%;height:100%;object-fit:contain}',
        '.nx20-slot-name{margin:0;font-size:17px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}',
        '.nx20-robux{margin-top:18px}',
        '.nx20-robux input{width:100%;height:38px;padding:0 12px;border:1px solid #666;background:rgba(0,0,0,0.2);color:inherit;font-size:17px}',
        '.nx20-total{display:flex;justify-content:space-between;margin-top:8px;font-size:18px}',
        '.nx20-total-val{color:var(--robux-color,#3ecf5a);font-size:22px}',
        '.nx20-offer{width:100%;min-height:36px;margin-top:18px;font-size:18px;cursor:pointer;background:var(--primary-color,#00a2ff);color:#fff;border:0}',
        '.nx20-offer:disabled{background:#333;color:#666;cursor:not-allowed}',
        '.nx20-modal-bg{position:fixed;inset:0;background:rgba(0,0,0,0.6);display:flex;align-items:center;justify-content:center;z-index:99999}',
        '.nx20-modal{background:var(--white-color,#2a2c2e);padding:20px;min-width:520px;max-width:640px;max-height:85vh;overflow-y:auto}',
        '.nx20-modal h3{margin:0 0 12px;font-size:20px}',
        '.nx20-modal p{margin:0 0 18px;font-size:19px;color:#999}',
        '.nx20-actions{display:flex;gap:12px;justify-content:center;margin-top:18px}',
        '.nx20-actions button{min-width:100px;min-height:36px;padding:8px 18px;font-size:16px;cursor:pointer;border:0}',
        '.nx20-actions .ok{background:var(--primary-color,#00a2ff);color:#fff}',
        '.nx20-actions .accept{background:#3ecf5a;color:#fff}',
        '.nx20-actions .decline{background:#e5484d;color:#fff}',
        '.nx20-actions .counter{background:#f5a623;color:#fff}',
        '.nx20-actions .cancel{background:#444;color:#fff}',
        '.nx20-err{color:#e5484d;text-align:center;margin-top:12px}',

        '.nx20-list-tabs{display:flex;gap:24px;margin-bottom:20px;border-bottom:1px solid var(--text-color-quinary,#3a3d40)}',
        '.nx20-list-tab{padding:8px 0;font-size:18px;color:#999;cursor:pointer;border-bottom:3px solid transparent;margin-bottom:-1px}',
        '.nx20-list-tab.active{color:var(--text-color-primary,#e8e8e8);border-bottom-color:var(--primary-color,#00a2ff)}',
        '.nx20-list-row{display:grid;grid-template-columns:64px 1fr 200px 140px 140px;gap:16px;padding:14px 0;align-items:center;border-bottom:1px solid var(--text-color-quinary,#3a3d40)}',
        '.nx20-list-row .avatar{width:48px;height:48px;background:rgba(255,255,255,0.06);border-radius:50%;overflow:hidden;display:flex;align-items:center;justify-content:center}',
        '.nx20-list-row .avatar img{width:100%;height:100%;object-fit:cover}',
        '.nx20-list-row .who{font-size:17px}',
        '.nx20-list-row .who .sub{font-size:13px;color:#999;margin-top:2px}',
        '.nx20-list-row .when{font-size:14px;color:#bbb}',
        '.nx20-list-row .when .sub{font-size:12px;color:#888;margin-top:2px}',
        '.nx20-list-row .status{font-size:15px;font-weight:600}',
        '.nx20-list-row .status.open{color:#00a2ff}',
        '.nx20-list-row .status.pending{color:#f5a623}',
        '.nx20-list-row .status.countered{color:#f5a623}',
        '.nx20-list-row .status.completed{color:#3ecf5a}',
        '.nx20-list-row .status.declined,.nx20-list-row .status.cancelled,.nx20-list-row .status.expired{color:#e5484d}',
        '.nx20-list-row .status.inactive{color:#888}',
        '.nx20-list-row .actions{text-align:right;display:flex;gap:6px;justify-content:flex-end}',
        '.nx20-list-row button{background:var(--primary-color,#00a2ff);color:#fff;border:0;padding:6px 12px;font-size:13px;cursor:pointer;border-radius:3px}',
        '.nx20-list-row button.ghost{background:#444}',
        '.nx20-list-row button:disabled{background:#333;color:#666;cursor:not-allowed}',
        '.nx20-list-empty{padding:40px 0;text-align:center;color:#999;font-size:16px}',

        '.nx20-detail-label{font-weight:700;font-size:15px;margin:10px 0 6px}',
        '.nx20-detail-row{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:6px;margin-bottom:14px}',
        '.nx20-detail-cell{position:relative;aspect-ratio:1/1;background:rgba(255,255,255,0.06);border:1px solid #555;overflow:hidden}',
        '.nx20-detail-cell img{width:100%;height:100%;object-fit:contain}',
        '.nx20-detail-cell .caption{position:absolute;bottom:0;left:0;right:0;background:rgba(0,0,0,0.65);font-size:10px;padding:2px 4px;text-align:center;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}',
        '.nx20-detail-value{float:right;font-size:13px;color:#bbb}',
        '.nx20-detail-value b{color:#3ecf5a}',
        '.nx20-detail-divider{border-top:1px solid #555;margin:14px 0}',
        '.nx20-detail-meta{font-size:13px;color:#999;text-align:center;margin-top:10px}'
    ].join('');

    var S = {
        meId: null, partnerId: null,
        myCat: 'null', partnerCat: 'null',
        myItems: [], partnerItems: [],
        myCursor: '', partnerCursor: '',
        myNext: null, partnerNext: null,
        myLoading: false, partnerLoading: false,
        myError: null, partnerError: null,
        offer: [], request: [],
        offerRobux: '', requestRobux: '',
        modalOpen: false, sentOpen: false,
        sending: false, sendError: null,
        listTab: 'inbound',
        listData: { inbound: null, outbound: null, completed: null, inactive: null },
        listLoading: false,
        listError: null,
        viewTrade: null,
        viewLoading: false,
        viewError: null,
        viewData: null,
        actionPending: false
    };

    var avatarCache = {};

    function el(tag, props) {
        var e = document.createElement(tag);
        props = props || {};
        for (var k in props) {
            var v = props[k];
            if (k === 'class') e.className = v;
            else if (k.indexOf('on') === 0 && typeof v === 'function') e.addEventListener(k.slice(2).toLowerCase(), v);
            else if (v === true) e.setAttribute(k, '');
            else if (v != null && v !== false) e.setAttribute(k, v);
        }
        for (var i = 2; i < arguments.length; i++) {
            var c = arguments[i];
            if (c == null || c === false) continue;
            e.appendChild(typeof c === 'string' ? document.createTextNode(c) : c);
        }
        return e;
    }

    function fmt(n) { return Number(n || 0).toLocaleString('en-US'); }
    function keyOf(x) { return x.userAssetId; }
    function has(list, item) { return list.some(function(x) { return keyOf(x) === keyOf(item); }); }
    function toggle(list, item) {
        var i = list.findIndex(function(x) { return keyOf(x) === keyOf(item); });
        if (i >= 0) { list.splice(i, 1); return; }
        if (list.length < 4) list.push(item);
    }

    function norm(raw) {
        return {
            assetId: raw.assetId,
            userAssetId: raw.userAssetId,
            name: raw.name || 'Unknown',
            serialNumber: raw.serialNumber != null ? raw.serialNumber : null,
            rap: raw.recentAveragePrice != null ? raw.recentAveragePrice : (raw.originalPrice || 0),
            thumbnail: null
        };
    }

    function refreshCsrf(res) {
        try { var t = res.headers.get('x-csrf-token'); if (t) window.NX_CSRF = t; } catch (e) {}
    }

    function primeToken() {
        return fetch('/apisite/presence/v1/presence/users', {
            method: 'POST', credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userIds: [0] })
        }).then(function(r) {
            var t = r.headers.get('x-csrf-token');
            if (t) window.NX_CSRF = t;
            return window.NX_CSRF;
        }).catch(function() { return window.NX_CSRF; });
    }

    function fetchInventory(userId, assetTypeId, cursor) {
        cursor = cursor || '';
        var qs = new URLSearchParams({ limit: 10, cursor: cursor });
        if (assetTypeId && assetTypeId !== 'null') qs.set('assetTypeId', assetTypeId);
        return fetch('/apisite/inventory/v1/users/' + userId + '/assets/collectibles?' + qs, { credentials: 'include' })
            .then(function(r) { refreshCsrf(r); return r.json(); })
            .then(function(j) {
                return {
                    items: (j && j.data ? j.data : []).map(norm),
                    nextCursor: (j && j.nextPageCursor) || null
                };
            });
    }

    function fetchThumbs(ids) {
        if (!ids.length) return Promise.resolve({});
        var qs = new URLSearchParams({ assetIds: ids.join(','), format: 'png', size: '420x420' });
        return fetch('/apisite/thumbnails/v1/assets?' + qs, { credentials: 'include' })
            .then(function(r) { return r.json(); })
            .then(function(j) {
                var out = {};
                var list = (j && (j.data || j.Data)) || [];
                list.forEach(function(t) {
                    var id = t.targetId != null ? t.targetId : t.assetId;
                    var url = t.imageUrl || t.url;
                    if (id != null && url) out[id] = url;
                });
                return out;
            });
    }

    function fetchAvatars(userIds) {
        var needed = userIds.filter(function (id) { return id && !avatarCache[id]; });
        if (!needed.length) return Promise.resolve();
        var qs = new URLSearchParams({ userIds: needed.join(','), size: '420x420', format: 'png' });
        return fetch('/apisite/thumbnails/v1/users/avatar?' + qs, { credentials: 'include' })
            .then(function (r) { return r.json(); })
            .then(function (j) {
                var list = (j && (j.data || j.Data)) || [];
                list.forEach(function (t) {
                    var id = t.targetId != null ? t.targetId : t.userId;
                    var url = t.imageUrl || t.url;
                    if (id != null && url) avatarCache[id] = url;
                });
            })
            .catch(function () {});
    }

    var _sending = false;

    function sendTrade(offers) {
        if (_sending) return Promise.reject(new Error('Trade already sending'));
        _sending = true;

        return primeToken().then(function(token) {
            var headers = { 'Content-Type': 'application/json' };
            if (token) headers['X-CSRF-Token'] = token;
            return fetch('/apisite/trades/v1/trades/send', {
                method: 'POST', credentials: 'include', headers: headers,
                body: JSON.stringify({ offers: offers })
            });
        }).then(function(r) {
            refreshCsrf(r);
            if (!r.ok) {
                return r.json().catch(function() { return {}; }).then(function(e) {
                    var msg = 'HTTP ' + r.status;
                    if (e && e.errors) {
                        if (Array.isArray(e.errors) && e.errors[0] && e.errors[0].message) msg = e.errors[0].message;
                        else if (typeof e.errors === 'object') msg = Object.keys(e.errors).map(function(k) { return k + ': ' + e.errors[k]; }).join(' | ');
                    }
                    throw new Error(msg);
                });
            }
            return r.json().catch(function() { return {}; });
        }).then(function(result) {
            _sending = false;
            return result;
        }).catch(function(err) {
            _sending = false;
            throw err;
        });
    }

    function fetchTrades(kind) {
        return fetch('/apisite/trades/v1/trades/' + kind + '?cursor=', { credentials: 'include' })
            .then(function(r) { refreshCsrf(r); return r.json(); })
            .then(function(j) {
                return {
                    data: (j && j.data) || [],
                    nextCursor: j && j.nextPageCursor
                };
            });
    }

    function fetchTradeDetails(id) {
        return fetch('/apisite/trades/v1/trades/' + id, { credentials: 'include' })
            .then(function(r) { refreshCsrf(r); return r.json(); });
    }

    function actionTrade(id, action) {
        return primeToken().then(function (token) {
            var headers = { 'Content-Type': 'application/json' };
            if (token) headers['X-CSRF-Token'] = token;
            return fetch('/apisite/trades/v1/trades/' + id + '/' + action, {
                method: 'POST', credentials: 'include', headers: headers,
                body: JSON.stringify({})
            });
        }).then(function (r) {
            refreshCsrf(r);
            if (!r.ok) {
                return r.json().catch(function () { return {}; }).then(function (e) {
                    var msg = 'HTTP ' + r.status;
                    if (e && e.errors) {
                        if (Array.isArray(e.errors) && e.errors[0] && e.errors[0].message) msg = e.errors[0].message;
                        else if (typeof e.errors === 'object') msg = Object.keys(e.errors).map(function (k) { return k + ': ' + e.errors[k]; }).join(' | ');
                    }
                    throw new Error(msg);
                });
            }
            return r.json().catch(function () { return {}; });
        });
    }

    function relTime(iso) {
        if (!iso) return '—';
        var t = Date.parse(iso);
        if (isNaN(t)) return '—';
        var s = Math.floor((Date.now() - t) / 1000);
        if (s < 0) {
            s = -s;
            if (s < 60) return 'in ' + s + 's';
            if (s < 3600) return 'in ' + Math.floor(s / 60) + 'm';
            if (s < 86400) return 'in ' + Math.floor(s / 3600) + 'h';
            return 'in ' + Math.floor(s / 86400) + 'd';
        }
        if (s < 60) return s + 's ago';
        if (s < 3600) return Math.floor(s / 60) + 'm ago';
        if (s < 86400) return Math.floor(s / 3600) + 'h ago';
        return Math.floor(s / 86400) + 'd ago';
    }

    function fmtDate(iso) {
        if (!iso) return '—';
        var d = new Date(iso);
        if (isNaN(d.getTime())) return '—';
        return (d.getMonth() + 1) + '/' + d.getDate() + '/' + String(d.getFullYear()).slice(-2);
    }

    function statusClass(status) {
        var s = (status || '').toLowerCase();
        if (s === 'open') return 'open';
        if (s === 'pending') return 'pending';
        if (s === 'countered') return 'countered';
        if (s === 'completed' || s === 'finished' || s === 'accepted') return 'completed';
        if (s === 'declined' || s === 'rejected' || s === 'cancelled' || s === 'expired') return 'declined';
        return 'inactive';
    }

    function statusLabel(trade, tab) {
        var s = trade.status;
        if (!s) s = trade.isActive ? 'Pending' : 'Inactive';
        if (tab === 'completed') return 'Completed';
        if (tab === 'inactive') return s === 'Open' ? 'Expired' : s;
        return s;
    }

    function Robux(v) {
        return el('span', { class: 'nx20-val' }, 'R$ ' + fmt(v));
    }

    function ItemCard(item, side) {
        var list = side === 'offer' ? S.offer : S.request;
        var sel = has(list, item);
        var btn = el('button', { class: 'nx20-item', type: 'button', onclick: function() { toggle(list, item); render(); } });
        var th = el('div', { class: 'nx20-thumb' + (sel ? ' sel' : '') });
        if (item.thumbnail) th.appendChild(el('img', { src: item.thumbnail }));
        if (sel) th.appendChild(el('span', { class: 'nx20-check' }, '\u2713'));
        btn.appendChild(th);
        btn.appendChild(el('div', { class: 'nx20-name' }, item.name));
        btn.appendChild(Robux(item.rap));
        return btn;
    }

    function Section(side) {
        var mine = side === 'my';
        var title = mine ? 'Your Inventory' : 'Their Inventory';
        var items = mine ? S.myItems : S.partnerItems;
        var cat = mine ? S.myCat : S.partnerCat;
        var loading = mine ? S.myLoading : S.partnerLoading;
        var error = mine ? S.myError : S.partnerError;

        var sec = el('section', { class: 'nx20-sec' });
        var head = el('div', { class: 'nx20-sec-head' }, el('h2', { class: 'nx20-sec-title' }, title));
        var sel = el('select', { class: 'nx20-select', onchange: function(e) {
            if (mine) { S.myCat = e.currentTarget.value; S.myCursor = ''; }
            else { S.partnerCat = e.currentTarget.value; S.partnerCursor = ''; }
            load(side);
        }});
        CATEGORIES.forEach(function(c) {
            var o = el('option', { value: c.value }, c.label);
            if (c.value === cat) o.selected = true;
            sel.appendChild(o);
        });
        head.appendChild(sel);
        sec.appendChild(head);

        if (error) sec.appendChild(el('div', { class: 'nx20-empty' }, error));
        else if (loading) sec.appendChild(el('div', { class: 'nx20-empty' }, 'Loading...'));
        else if (!items.length) sec.appendChild(el('div', { class: 'nx20-empty' }, 'No items.'));
        else {
            var g = el('div', { class: 'nx20-items' });
            items.forEach(function(it) { g.appendChild(ItemCard(it, mine ? 'offer' : 'request')); });
            sec.appendChild(g);
        }
        return sec;
    }

    function SidePanel(kind) {
        var isOffer = kind === 'offer';
        var items = isOffer ? S.offer : S.request;
        var robuxStr = isOffer ? S.offerRobux : S.requestRobux;
        var robux = parseInt(robuxStr, 10) || 0;
        var itemTotal = items.reduce(function(t, i) { return t + (i.rap || 0); }, 0);

        var sec = el('section', { class: 'nx20-side-sec' });
        sec.appendChild(el('h2', { class: 'nx20-sec-title' }, isOffer ? 'Your Offer' : 'Your Request'));
        var slots = el('div', { class: 'nx20-slots' });
        var padded = items.concat(new Array(Math.max(0, 4 - items.length)).fill(null));
        padded.forEach(function(item) {
            var slot = el('div', { class: 'nx20-slot' + (item ? ' filled' : '') });
            if (item) {
                var b = el('button', { class: 'nx20-slot-in', type: 'button', onclick: function() {
                    var arr = isOffer ? S.offer : S.request;
                    var i = arr.findIndex(function(x) { return keyOf(x) === keyOf(item); });
                    if (i >= 0) arr.splice(i, 1);
                    render();
                }});
                var w = el('span', { class: 'nx20-slot-img' });
                if (item.thumbnail) w.appendChild(el('img', { src: item.thumbnail }));
                b.appendChild(w);
                var r = el('span', {});
                r.appendChild(el('p', { class: 'nx20-slot-name' }, item.name));
                r.appendChild(Robux(item.rap));
                b.appendChild(r);
                slot.appendChild(b);
            }
            slots.appendChild(slot);
        });
        sec.appendChild(slots);

        var rw = el('div', { class: 'nx20-robux' });
        rw.appendChild(el('input', {
            inputmode: 'numeric', value: robuxStr, placeholder: 'Plus Robux amount',
            oninput: function(e) {
                var n = String(e.currentTarget.value).replace(/[^\d]/g, '');
                var v = n === '' ? '' : String(Math.min(parseInt(n, 10), 10000000));
                if (isOffer) S.offerRobux = v; else S.requestRobux = v;
                render();
            }
        }));
        sec.appendChild(rw);

        var t = el('div', { class: 'nx20-total' });
        t.appendChild(el('span', {}, 'Total:'));
        t.appendChild(el('span', { class: 'nx20-total-val' }, 'R$ ' + fmt(itemTotal + robux)));
        sec.appendChild(t);
        return sec;
    }

    function TradeWindow() {
        var root = el('div', { class: 'nx20-root' });
        var shell = el('div', { class: 'nx20-shell' });
        shell.appendChild(el('h1', { class: 'nx20-title' }, 'Trade with User ' + (S.partnerId || '?')));

        var wrap = el('div', { class: 'nx20-wrap' });
        var left = el('div', {});
        left.appendChild(Section('my'));
        if (S.partnerId) left.appendChild(Section('partner'));
        wrap.appendChild(left);

        var right = el('aside', { class: 'nx20-side' });
        right.appendChild(SidePanel('offer'));
        right.appendChild(SidePanel('request'));

        var canOffer = !!S.partnerId && S.offer.length > 0 && S.request.length > 0 && !S.sending && !!S.meId && S.meId !== S.partnerId;
        var btn = el('button', { class: 'nx20-offer', disabled: !canOffer, onclick: function() {
            S.sendError = null; S.modalOpen = true; render();
        }}, 'Make Offer');
        right.appendChild(btn);
        wrap.appendChild(right);

        shell.appendChild(wrap);
        root.appendChild(shell);

        if (S.modalOpen) {
            var bg = el('div', { class: 'nx20-modal-bg' });
            var m = el('div', { class: 'nx20-modal' });
            m.appendChild(el('h3', {}, 'Send Request'));
            m.appendChild(el('p', {}, 'Send this trade request?'));
            var acts = el('div', { class: 'nx20-actions' });

            var ok = el('button', { class: 'ok' }, S.sending ? 'Sending...' : 'Send');
            if (S.sending) {
                ok.disabled = true;
            } else {
                ok.addEventListener('click', function(ev) {
                    ev.preventDefault();
                    ev.stopPropagation();
                    ok.disabled = true;
                    ok.textContent = 'Sending...';
                    submit();
                }, { once: true });
            }
            acts.appendChild(ok);

            var cancel = el('button', { class: 'cancel' }, 'Cancel');
            if (S.sending) cancel.disabled = true;
            cancel.addEventListener('click', function() { S.modalOpen = false; render(); });
            acts.appendChild(cancel);

            m.appendChild(acts);
            if (S.sendError) m.appendChild(el('div', { class: 'nx20-err' }, S.sendError));
            bg.appendChild(m);
            root.appendChild(bg);
        }

        if (S.sentOpen) {
            var bg2 = el('div', { class: 'nx20-modal-bg' });
            var m2 = el('div', { class: 'nx20-modal' });
            m2.appendChild(el('h3', {}, 'Trade Sent!'));
            var acts2 = el('div', { class: 'nx20-actions' });
            acts2.appendChild(el('button', { class: 'cancel', onclick: function() { location.href = '/trades'; } }, 'Back to Trades'));
            m2.appendChild(acts2);
            bg2.appendChild(m2);
            root.appendChild(bg2);
        }

        return root;
    }

    function DetailItemCell(item) {
        var cell = el('div', { class: 'nx20-detail-cell', title: item.name || '' });
        var assetId = item.assetId || item.AssetId;
        if (assetId) {
            cell.appendChild(el('img', {
                src: 'https://www.aisaka.me/thumbs/asset.ashx?assetId=' + assetId + '&width=110&height=110&format=png',
                alt: item.name || ''
            }));
        }
        if (item.name) {
            cell.appendChild(el('div', { class: 'caption' }, item.name));
        }
        return cell;
    }

    function DetailOfferBlock(offer, label) {
        var wrap = el('div', {});
        wrap.appendChild(el('div', { class: 'nx20-detail-label' }, label));
        var items = (offer && offer.userAssets) || [];
        var robux = (offer && offer.robux) || 0;
        var total = items.reduce(function (t, i) { return t + (i.recentAveragePrice || 0); }, 0);

        var value = el('div', { class: 'nx20-detail-value' });
        value.appendChild(document.createTextNode('Value: '));
        value.appendChild(el('b', {}, 'R$ ' + fmt(total + robux)));
        wrap.appendChild(value);

        var row = el('div', { class: 'nx20-detail-row' });
        items.slice(0, 4).forEach(function (it) { row.appendChild(DetailItemCell(it)); });
        if (robux) {
            var robuxCell = el('div', { class: 'nx20-detail-cell' });
            robuxCell.appendChild(el('div', { style: { fontSize: '20px', fontWeight: '700', textAlign: 'center', paddingTop: '30px', color: '#3ecf5a' } }, 'R$' + robux));
            row.appendChild(robuxCell);
        }
        wrap.appendChild(row);
        return wrap;
    }

    function acceptCurrentTrade(id) {
        if (S.actionPending) return;
        S.actionPending = true;
        render();
        actionTrade(id, 'accept')
            .then(function () {
                S.actionPending = false;
                S.viewTrade = null;
                S.viewData = null;
                S.listData = { inbound: null, outbound: null, completed: null, inactive: null };
                loadTrades(S.listTab);
            })
            .catch(function (e) {
                S.actionPending = false;
                S.viewError = e.message || 'Failed to accept trade.';
                render();
            });
    }

    function declineCurrentTrade(id) {
        if (S.actionPending) return;
        S.actionPending = true;
        render();
        actionTrade(id, 'decline')
            .then(function () {
                S.actionPending = false;
                S.viewTrade = null;
                S.viewData = null;
                S.listData = { inbound: null, outbound: null, completed: null, inactive: null };
                loadTrades(S.listTab);
            })
            .catch(function (e) {
                S.actionPending = false;
                S.viewError = e.message || 'Failed to decline trade.';
                render();
            });
    }

    function TradeViewModal() {
        var bg = el('div', { class: 'nx20-modal-bg' });
        bg.addEventListener('click', function (e) {
            if (e.target === e.currentTarget) { S.viewTrade = null; S.viewData = null; S.viewError = null; render(); }
        });

        var m = el('div', { class: 'nx20-modal' });
        var t = S.viewTrade || {};
        var u = t.user || {};

        m.appendChild(el('h3', {}, 'Trade with ' + (u.displayName || u.name || 'User ' + (u.id || '?'))));

        if (S.viewLoading) {
            m.appendChild(el('div', { class: 'nx20-detail-meta' }, 'Loading trade details...'));
        } else if (S.viewError) {
            m.appendChild(el('div', { class: 'nx20-err' }, S.viewError));
        } else if (S.viewData) {
            var data = S.viewData;
            var offers = Array.isArray(data.offers) ? data.offers : [];
            var mine = offers.find(function (o) { return o.user && o.user.id === S.meId; });
            var theirs = offers.find(function (o) { return o.user && o.user.id !== S.meId; });

            var givingLabel = t.status === 'Open' ? 'Items you will give' :
                              t.status === 'Completed' ? 'Items you gave' :
                              'Items you would have given';
            var receivingLabel = t.status === 'Open' ? 'Items you will receive' :
                                 t.status === 'Completed' ? 'Items you received' :
                                 'Items you would have received';

            m.appendChild(DetailOfferBlock(mine, givingLabel));
            m.appendChild(el('div', { class: 'nx20-detail-divider' }));
            m.appendChild(DetailOfferBlock(theirs, receivingLabel));

            m.appendChild(el('div', { class: 'nx20-detail-meta' },
                'Trade #' + (t.id || '?') + ' • ' + (t.status || '') + ' • expires ' + relTime(t.expiration)
            ));
        }

        var acts = el('div', { class: 'nx20-actions' });

        var canAct = S.viewData && t.status && (t.status === 'Open' || t.status === 'Countered') && S.meId !== (u.id);
        var canDecline = S.viewData && (t.status === 'Open' || t.status === 'Countered') && (S.meId === (u.id) || S.meId !== (u.id));

        if (canAct) {
            var acceptBtn = el('button', { class: 'accept' }, S.actionPending ? '...' : 'Accept');
            if (S.actionPending) acceptBtn.disabled = true;
            acceptBtn.addEventListener('click', function () { acceptCurrentTrade(t.id); });
            acts.appendChild(acceptBtn);

            var counterBtn = el('button', { class: 'counter' }, 'Counter');
            if (S.actionPending) counterBtn.disabled = true;
            counterBtn.addEventListener('click', function () {
                location.href = '/trade/tradewindow?TradePartnerID=' + (u.id || '');
            });
            acts.appendChild(counterBtn);
        }

        if (canDecline) {
            var declineBtn = el('button', { class: 'decline' }, S.actionPending ? '...' : 'Decline');
            if (S.actionPending) declineBtn.disabled = true;
            declineBtn.addEventListener('click', function () { declineCurrentTrade(t.id); });
            acts.appendChild(declineBtn);
        }

        var close = el('button', { class: 'cancel' }, 'Close');
        close.addEventListener('click', function () { S.viewTrade = null; S.viewData = null; S.viewError = null; render(); });
        acts.appendChild(close);
        m.appendChild(acts);

        bg.appendChild(m);
        return bg;
    }

    function TradeRow(trade) {
        var u = trade.user || {};
        var partnerId = u.id;

        var row = el('div', { class: 'nx20-list-row' });

        var av = el('div', { class: 'avatar' });
        var src = avatarCache[partnerId];
        if (src) av.appendChild(el('img', { src: src, alt: u.name || '' }));
        row.appendChild(av);

        var who = el('div', { class: 'who' });
        who.appendChild(el('div', {}, u.displayName || u.name || ('User ' + (partnerId || '?'))));
        who.appendChild(el('div', { class: 'sub' }, u.name ? '@' + u.name : 'Trade #' + trade.id));
        row.appendChild(who);

        var when = el('div', { class: 'when' });
        when.appendChild(el('div', {}, fmtDate(trade.created)));
        when.appendChild(el('div', { class: 'sub' }, 'expires ' + fmtDate(trade.expiration)));
        row.appendChild(when);

        var label = statusLabel(trade, S.listTab);
        row.appendChild(el('div', { class: 'status ' + statusClass(label) }, label));

        var actions = el('div', { class: 'actions' });
        var viewBtn = el('button', { class: 'ghost' }, 'View Details');
        viewBtn.addEventListener('click', function () {
            S.viewTrade = trade;
            S.viewData = null;
            S.viewError = null;
            S.viewLoading = true;
            S.actionPending = false;
            render();
            fetchTradeDetails(trade.id)
                .then(function (data) {
                    S.viewData = data;
                    S.viewLoading = false;
                    render();
                })
                .catch(function (e) {
                    S.viewError = e.message || 'Failed to load trade.';
                    S.viewLoading = false;
                    render();
                });
        });
        actions.appendChild(viewBtn);

        if (trade.isActive && partnerId) {
            var open = el('button', {}, 'Open');
            open.addEventListener('click', function () {
                location.href = '/trade/tradewindow?TradePartnerID=' + partnerId;
            });
            actions.appendChild(open);
        }
        row.appendChild(actions);

        return row;
    }

    function TradeList() {
        var root = el('div', { class: 'nx20-root' });
        var shell = el('div', { class: 'nx20-shell' });
        shell.appendChild(el('h1', { class: 'nx20-title' }, 'Trades'));

        var tabs = el('div', { class: 'nx20-list-tabs' });
        ['inbound', 'outbound', 'completed', 'inactive'].forEach(function (kind) {
            var label = kind.charAt(0).toUpperCase() + kind.slice(1);
            var tab = el('div', {
                class: 'nx20-list-tab' + (S.listTab === kind ? ' active' : ''),
                onclick: function () {
                    S.listTab = kind;
                    if (!S.listData[kind]) loadTrades(kind);
                    else render();
                }
            }, label);
            tabs.appendChild(tab);
        });
        shell.appendChild(tabs);

        if (S.listLoading) {
            shell.appendChild(el('div', { class: 'nx20-list-empty' }, 'Loading trades...'));
        } else if (S.listError) {
            shell.appendChild(el('div', { class: 'nx20-list-empty' }, S.listError));
        } else {
            var data = S.listData[S.listTab] || [];
            if (!data.length) {
                shell.appendChild(el('div', { class: 'nx20-list-empty' }, 'No trades available.'));
            } else {
                data.forEach(function (t) { shell.appendChild(TradeRow(t)); });
            }
        }

        root.appendChild(shell);
        if (S.viewTrade) root.appendChild(TradeViewModal());
        return root;
    }

    function ensureStyle() {
        if (document.getElementById('nx20-style')) return;
        var s = document.createElement('style');
        s.id = 'nx20-style';
        s.textContent = CSS;
        document.head.appendChild(s);
    }

    function render() {
        ensureStyle();
        var isWindow = /^\/trade\/tradewindow/.test(location.pathname);
        var existing = document.querySelector('.nx20-root');
        var next = isWindow ? TradeWindow() : TradeList();
        if (existing) { existing.replaceWith(next); return; }
        var host = document.querySelector('.main-0-2-45')
            || document.querySelector('main')
            || document.querySelector('#__next > div > div')
            || document.querySelector('#__next');
        if (host) { host.innerHTML = ''; host.appendChild(next); }
    }

    function load(side) {
        var mine = side === 'my';
        if (mine && !S.meId) return;
        if (!mine && !S.partnerId) return;
        if (mine && S.meId === S.partnerId) {
            S.myError = 'Could not detect your own user id.';
            S.myItems = [];
            render();
            return;
        }
        if (mine) { S.myLoading = true; S.myError = null; }
        else { S.partnerLoading = true; S.partnerError = null; }
        render();

        var userId = mine ? S.meId : S.partnerId;
        var cat = mine ? S.myCat : S.partnerCat;
        var cursor = mine ? S.myCursor : S.partnerCursor;

        fetchInventory(userId, cat, cursor)
            .then(function(res) {
                return fetchThumbs(res.items.map(function(i) { return i.assetId; }))
                    .then(function(th) {
                        res.items.forEach(function(it) { it.thumbnail = th[it.assetId] || null; });
                        if (mine) { S.myItems = res.items; S.myNext = res.nextCursor; }
                        else { S.partnerItems = res.items; S.partnerNext = res.nextCursor; }
                    });
            })
            .catch(function(e) {
                if (mine) { S.myError = e.message; S.myItems = []; }
                else { S.partnerError = e.message; S.partnerItems = []; }
            })
            .then(function() {
                if (mine) S.myLoading = false; else S.partnerLoading = false;
                render();
            });
    }

    function loadTrades(kind) {
        S.listLoading = true;
        S.listError = null;
        render();
        fetchTrades(kind)
            .then(function(res) {
                S.listData[kind] = res.data || [];
                var ids = S.listData[kind]
                    .map(function (t) { return t.user && t.user.id; })
                    .filter(Boolean);
                return fetchAvatars(ids);
            })
            .catch(function(e) {
                S.listError = e.message || 'Failed to load trades.';
                S.listData[kind] = [];
            })
            .then(function() {
                S.listLoading = false;
                render();
            });
    }

    function submit() {
        if (S.sending) return;
        if (!S.meId || !S.partnerId || S.meId === S.partnerId) return;
        S.sending = true;
        S.sendError = null;
        render();

        var myR = S.offerRobux ? parseInt(S.offerRobux, 10) : 0;
        var theirR = S.requestRobux ? parseInt(S.requestRobux, 10) : 0;

        var offers = [
            { userId: S.meId, userAssetIds: S.offer.map(function(i) { return i.userAssetId; }) },
            { userId: S.partnerId, userAssetIds: S.request.map(function(i) { return i.userAssetId; }) }
        ];
        if (myR > 0) offers[0].robux = myR;
        if (theirR > 0) offers[1].robux = theirR;

        sendTrade(offers)
            .then(function() { S.sending = false; S.modalOpen = false; S.sentOpen = true; render(); })
            .catch(function(e) { S.sending = false; S.sendError = e.message; render(); });
    }

    function decodeJwtPayload(jwt) {
        try {
            var parts = jwt.split('.');
            if (parts.length < 2) return null;
            var pad = parts[1].replace(/-/g, '+').replace(/_/g, '/');
            while (pad.length % 4) pad += '=';
            return JSON.parse(atob(pad));
        } catch (e) { return null; }
    }

    function detectMe() {
        var cached = parseInt(localStorage.getItem('nx_me_id') || '0', 10);
        if (cached && (!S.partnerId || cached !== S.partnerId)) return cached;

        try {
            var m = document.cookie.match(/\.ROBLOSECURITY=([^;]+)/);
            if (m) {
                var payload = decodeJwtPayload(m[1]);
                if (payload && payload.userId && (!S.partnerId || payload.userId !== S.partnerId)) {
                    localStorage.setItem('nx_me_id', String(payload.userId));
                    return payload.userId;
                }
            }
        } catch (e) {}

        var link = document.querySelector('a[href*="/users/"][href*="/profile"]');
        if (link) {
            var mm = (link.getAttribute('href') || '').match(/\/users\/(\d+)\/profile/);
            if (mm) {
                var id = parseInt(mm[1], 10);
                if (!S.partnerId || id !== S.partnerId) {
                    localStorage.setItem('nx_me_id', String(id));
                    return id;
                }
            }
        }

        return null;
    }

    function boot() {
        var onWindow = /^\/trade\/tradewindow/.test(location.pathname);
        var onList = /^\/trades\/?$/.test(location.pathname);
        if (!onWindow && !onList) return;
        if (document.querySelector('.nx20-root')) return;

        ensureStyle();

        var p = (location.search.match(/[?&]TradePartnerID=(\d+)/) || [])[1];
        if (p) S.partnerId = parseInt(p, 10);

        S.meId = detectMe();

        if (onWindow) {
            render();
            if (S.meId && S.meId !== S.partnerId) load('my');
            if (S.partnerId) load('partner');
        } else {
            render();
            if (!S.listData[S.listTab]) loadTrades(S.listTab);
        }
    }

    window.NX.features.trade2020 = {
        apply: function() {
            var attempt = function() {
                if (/^\/trade\/tradewindow/.test(location.pathname) || /^\/trades\/?$/.test(location.pathname)) {
                    setTimeout(boot, 1000);
                }
            };
            attempt();
            var last = location.pathname + location.search;
            setInterval(function() {
                var now = location.pathname + location.search;
                if (now !== last) {
                    last = now;
                    var old = document.querySelector('.nx20-root');
                    if (old) old.remove();
                    attempt();
                }
            }, 400);
        }
    };

})();
