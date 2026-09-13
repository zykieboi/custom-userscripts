(function() {
    'use strict';

    window.NX = window.NX || {};
    window.NX.features = window.NX.features || {};

    var V = {
        text:   'var(--text-color-primary, #e8e8e8)',
        muted:  'var(--text-color-secondary, #9aa0a6)',
        line:   'var(--text-color-quinary, #3a3d40)',
        card:   'var(--white-color, #2a2c2e)',
        accent: 'var(--primary-color, #00a2ff)',
        robux:  'var(--robux-color, #3ecf5a)',
        danger: 'var(--danger-color, #e5484d)'
    };

    var CATEGORIES = [
        { value: 'null', label: 'All Accessories' },
        { value: '8',  label: 'Hats' },
        { value: '41', label: 'Hair' },
        { value: '42', label: 'Face' },
        { value: '43', label: 'Neck' },
        { value: '44', label: 'Shoulders' },
        { value: '45', label: 'Front' },
        { value: '46', label: 'Back' },
        { value: '47', label: 'Waist' },
        { value: '19', label: 'Gear' },
        { value: '18', label: 'Faces' }
    ];

    var CSS = [
        '.nx20-root{color:' + V.text + ';min-height:calc(100vh - 88px);padding:24px 24px 68px;font-family:Arial,Helvetica,sans-serif;box-sizing:border-box}',
        '.nx20-root *{box-sizing:border-box}',
        '.nx20-shell{max-width:1210px;margin:0 auto}',
        '.nx20-back{display:inline-flex;align-items:center;gap:6px;margin-bottom:10px;color:' + V.text + ';text-decoration:none;font-size:18px;font-weight:600}',
        '.nx20-back:hover{color:' + V.accent + '}',
        '.nx20-title{font-size:34px;font-weight:400;margin:0 0 26px}',
        '.nx20-wrap{display:grid;grid-template-columns:minmax(0,704px) minmax(340px,390px);gap:28px;align-items:start}',
        '@media(max-width:980px){.nx20-wrap{grid-template-columns:1fr}}',
        '.nx20-sec{padding-bottom:28px;margin-bottom:28px;border-bottom:1px solid ' + V.line + '}',
        '.nx20-sec:last-child{border-bottom:0;margin-bottom:0}',
        '.nx20-sec-head{display:grid;grid-template-columns:1fr 280px;gap:18px;align-items:center;margin-bottom:20px}',
        '@media(max-width:620px){.nx20-sec-head{grid-template-columns:1fr}}',
        '.nx20-sec-title{font-size:23px;font-weight:400;margin:0}',
        '.nx20-select{height:39px;width:100%;padding:0 12px;font-size:18px;font-weight:500;background:' + V.card + ';color:' + V.text + ';border:1px solid ' + V.muted + ';border-radius:0;outline:0}',
        '.nx20-items{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:16px 9px}',
        '@media(max-width:720px){.nx20-items{grid-template-columns:repeat(3,minmax(0,1fr))}}',
        '@media(max-width:440px){.nx20-items{grid-template-columns:repeat(2,minmax(0,1fr))}}',
        '.nx20-item{display:block;width:100%;padding:0;border:0;background:transparent;color:' + V.text + ';text-align:left;cursor:pointer}',
        '.nx20-thumb{position:relative;aspect-ratio:1/1;width:100%;background:rgba(255,255,255,0.06);border:1px solid transparent;overflow:hidden}',
        '.nx20-thumb.sel{border-color:' + V.muted + ';box-shadow:inset 0 0 0 2px rgba(255,255,255,0.12)}',
        '.nx20-thumb img{width:100%;height:100%;object-fit:contain;display:block}',
        '.nx20-serial{position:absolute;left:7px;bottom:6px;height:23px;min-width:24px;padding:0 7px;border-radius:12px;background:rgba(0,0,0,0.55);color:#fff;font-size:13px;font-weight:500;display:inline-flex;align-items:center;justify-content:center}',
        '.nx20-check{position:absolute;top:8px;right:8px;width:25px;height:25px;border-radius:4px;background:#fff;border:1px solid ' + V.muted + ';color:#111;font-size:20px;line-height:22px;text-align:center}',
        '.nx20-name{min-height:42px;margin:7px 0 1px;font-size:17px;line-height:1.18;font-weight:400;overflow-wrap:break-word}',
        '.nx20-val{display:inline-flex;align-items:center;gap:4px;color:' + V.robux + ';font-size:17px;line-height:1.15}',
        '.nx20-pager{display:flex;align-items:center;justify-content:center;gap:8px;margin-top:16px;font-size:18px}',
        '.nx20-pg{width:34px;height:34px;border-radius:6px;background:' + V.card + ';color:' + V.text + ';border:1px solid ' + V.muted + ';font-size:26px;line-height:28px;padding:0;cursor:pointer}',
        '.nx20-pg:disabled{opacity:.45;cursor:not-allowed}',
        '.nx20-empty{min-height:120px;display:flex;align-items:center;justify-content:center;color:' + V.muted + ';font-size:16px;text-align:center}',
        '.nx20-side{border-left:1px solid ' + V.line + ';padding-left:28px}',
        '@media(max-width:980px){.nx20-side{border-left:0;padding-left:0}}',
        '.nx20-side-sec{margin-bottom:108px}',
        '.nx20-side-sec:last-of-type{margin-bottom:20px}',
        '.nx20-slots{display:grid;gap:16px}',
        '.nx20-slot{height:73px;width:100%;display:flex;align-items:center;border:1px dashed ' + V.muted + ';background:rgba(255,255,255,0.04)}',
        '.nx20-slot.filled{border-style:solid;background:rgba(255,255,255,0.07)}',
        '.nx20-slot-in{width:100%;display:grid;grid-template-columns:52px minmax(0,1fr);gap:10px;align-items:center;padding:8px 11px;border:0;background:transparent;color:' + V.text + ';text-align:left;cursor:pointer}',
        '.nx20-slot-img{width:42px;height:42px;background:rgba(255,255,255,0.06);overflow:hidden}',
        '.nx20-slot-img img{width:100%;height:100%;object-fit:contain}',
        '.nx20-slot-name{margin:0;font-size:17px;line-height:1.15;font-weight:400;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}',
        '.nx20-robux{position:relative;margin-top:18px}',
        '.nx20-robux input{width:100%;height:38px;padding:0 12px 0 34px;border:1px solid ' + V.line + ';border-radius:6px;background:rgba(0,0,0,0.2);color:' + V.text + ';font-size:17px;font-weight:500;outline:0}',
        '.nx20-robux .r{position:absolute;top:50%;left:11px;transform:translateY(-50%);color:' + V.robux + ';font-weight:700}',
        '.nx20-fee{display:flex;justify-content:space-between;margin-top:10px;color:' + V.muted + ';font-size:13px;font-weight:600}',
        '.nx20-total{display:flex;justify-content:space-between;align-items:center;margin-top:8px;font-size:18px}',
        '.nx20-total-val{color:' + V.robux + ';font-size:22px;display:inline-flex;align-items:center;gap:4px}',
        '.nx20-offer{width:100%;min-height:36px;margin-top:18px;font-size:18px;cursor:pointer;background:' + V.accent + ';color:#fff;border:0;border-radius:4px}',
        '.nx20-offer:disabled{background:#333;color:#666;cursor:not-allowed}',
        '.nx20-modal-bg{position:fixed;inset:0;background:rgba(0,0,0,0.6);display:flex;align-items:center;justify-content:center;z-index:99999}',
        '.nx20-modal{background:' + V.card + ';color:' + V.text + ';border:1px solid ' + V.line + ';border-radius:6px;padding:20px;min-width:393px;max-width:440px}',
        '.nx20-modal h3{margin:0 0 12px;font-size:20px;font-weight:400}',
        '.nx20-modal p{margin:0 0 18px;font-size:19px;color:' + V.muted + '}',
        '.nx20-actions{display:flex;gap:12px;justify-content:center}',
        '.nx20-actions button{min-width:90px;min-height:36px;padding:8px 18px;font-size:18px;cursor:pointer;border-radius:4px;border:0}',
        '.nx20-actions .ok{background:' + V.accent + ';color:#fff}',
        '.nx20-actions .cancel{background:' + V.card + ';color:' + V.text + ';border:1px solid ' + V.muted + '}',
        '.nx20-err{color:' + V.danger + ';text-align:center;margin-top:12px;font-size:14px}'
    ].join('');

    var S = {
        meId: null, partnerId: null,
        myCat: 'null', partnerCat: 'null',
        myItems: [], partnerItems: [],
        myCursor: '', partnerCursor: '',
        myPrev: null, partnerPrev: null,
        myNext: null, partnerNext: null,
        myPage: 1, partnerPage: 1,
        myLoading: false, partnerLoading: false,
        myError: null, partnerError: null,
        offer: [], request: [],
        offerRobux: '', requestRobux: '',
        modalOpen: false, sentOpen: false,
        sending: false, sendError: null
    };

    function el(tag, props) {
        var e = document.createElement(tag);
        props = props || {};
        Object.keys(props).forEach(function (k) {
            var v = props[k];
            if (k === 'class') e.className = v;
            else if (k.indexOf('on') === 0 && typeof v === 'function') e.addEventListener(k.slice(2).toLowerCase(), v);
            else if (v === true) e.setAttribute(k, '');
            else if (v != null && v !== false) e.setAttribute(k, v);
        });
        for (var i = 2; i < arguments.length; i++) {
            var c = arguments[i];
            if (c == null || c === false) continue;
            e.appendChild(typeof c === 'string' ? document.createTextNode(c) : c);
        }
        return e;
    }

    function fmt(n) { return Number(n || 0).toLocaleString('en-US'); }

    function clampRobux(v) {
        var n = String(v).replace(/[^\d]/g, '');
        return n === '' ? '' : String(Math.min(parseInt(n, 10), 10000000));
    }

    function keyOf(x) { return x.userAssetId != null ? x.userAssetId : x.assetId; }

    function has(list, item) {
        return list.some(function(x) { return keyOf(x) === keyOf(item); });
    }

    function toggle(list, item, max) {
        max = max || 4;
        var i = list.findIndex(function(x) { return keyOf(x) === keyOf(item); });
        if (i >= 0) { list.splice(i, 1); return; }
        if (list.length < max) list.push(item);
    }

    function normItem(raw) {
        var I = raw.Item || {};
        var C = raw.Creator || {};
        var P = raw.Product || {};
        var U = raw.UserItem || {};
        return {
            assetId: I.AssetId,
            userAssetId: U.UserAssetId != null ? U.UserAssetId : (raw.userAssetId != null ? raw.userAssetId : null),
            name: I.Name || 'Unknown',
            serialNumber: P.SerialNumber != null ? P.SerialNumber : null,
            rap: P.PriceInRobux || 0,
            creatorName: C.Name || '',
            thumbnail: null
        };
    }

    function refreshCsrf(res) {
        try {
            var t = res && res.headers && res.headers.get('x-csrf-token');
            if (t) window.NX_CSRF = t;
        } catch (e) {}
    }

    var API = {
        inventory: function(userId, assetTypeId, cursor) {
            cursor = cursor || '';
            if (assetTypeId === 'null' || assetTypeId == null) {
                var types = [8, 41, 42, 18, 43, 44, 45, 46, 47];
                return Promise.all(types.map(function(t) {
                    return API.inventory(userId, String(t), cursor).catch(function() {
                        return { items: [], nextCursor: null };
                    });
                })).then(function(rs) {
                    return {
                        items: rs.reduce(function(a, r) { return a.concat(r.items); }, []),
                        nextCursor: null
                    };
                });
            }
            var qs = new URLSearchParams({
                userId: userId,
                assetTypeId: assetTypeId,
                cursor: cursor,
                itemsPerPage: 10
            });
            return fetch('/users/inventory/list-json?' + qs, { credentials: 'include' })
                .then(function(r) {
                    refreshCsrf(r);
                    return r.json();
                })
                .then(function(j) {
                    return {
                        items: (j && j.Data && j.Data.Items ? j.Data.Items : []).map(normItem),
                        nextCursor: (j && j.Data && j.Data.nextPageCursor) || null
                    };
                });
        },

        thumbnails: function(assetIds) {
            if (!assetIds.length) return Promise.resolve({});
            var qs = new URLSearchParams({
                assetIds: assetIds.join(','),
                format: 'png',
                size: '420x420'
            });
            return fetch('/apisite/thumbnails/v1/assets?' + qs, { credentials: 'include' })
                .then(function(r) {
                    refreshCsrf(r);
                    return r.json();
                })
                .then(function(j) {
                    var out = {};
                    var list = (j && (j.data || j.Data)) || (Array.isArray(j) ? j : []);
                    list.forEach(function(t) {
                        var id = t.targetId != null ? t.targetId : (t.assetId != null ? t.assetId : t.id);
                        var url = t.imageUrl || t.url;
                        if (id != null && url) out[id] = url;
                    });
                    return out;
                });
        },

        sendTrade: function(payload, tradeId) {
            var url = tradeId
                ? '/apisite/trades/v1/trades/' + tradeId + '/counter'
                : '/apisite/trades/v1/trades/send';

            var attempt = function(token, isRetry) {
                var headers = { 'Content-Type': 'application/json' };
                if (token) headers['X-CSRF-Token'] = token;

                return fetch(url, {
                    method: 'POST',
                    credentials: 'include',
                    headers: headers,
                    body: JSON.stringify(payload)
                }).then(function(r) {
                    refreshCsrf(r);

                    if (r.status === 403 && !isRetry && window.NX_CSRF && window.NX_CSRF !== token) {
                        return attempt(window.NX_CSRF, true);
                    }

                    if (!r.ok) {
                        return r.json().catch(function() { return {}; }).then(function(e) {
                            throw new Error((e && e.errors && e.errors[0] && e.errors[0].message) || ('HTTP ' + r.status));
                        });
                    }
                    return r.json();
                });
            };

            return attempt(window.NX_CSRF, false);
        }
    };

    function RobuxValue(value) {
        return el('span', { class: 'nx20-val' },
            el('span', { class: 'icon-robux-16x16' }),
            el('span', {}, fmt(value))
        );
    }

    function ItemCard(item, side) {
        var list = side === 'offer' ? S.offer : S.request;
        var selected = has(list, item);
        var btn = el('button', {
            class: 'nx20-item',
            type: 'button',
            onclick: function() {
                toggle(list, item);
                render();
            }
        });
        var thumb = el('div', { class: 'nx20-thumb' + (selected ? ' sel' : '') });
        if (item.thumbnail) thumb.appendChild(el('img', { src: item.thumbnail, alt: item.name }));
        if (item.serialNumber) thumb.appendChild(el('span', { class: 'nx20-serial' }, '#' + item.serialNumber));
        if (selected) thumb.appendChild(el('span', { class: 'nx20-check' }, '\u2713'));
        btn.appendChild(thumb);
        btn.appendChild(el('div', { class: 'nx20-name' }, item.name));
        btn.appendChild(RobuxValue(item.rap));
        return btn;
    }

    function Section(side) {
        var mine = side === 'my';
        var title = mine ? 'Your Inventory' : 'Their Inventory';
        var items = mine ? S.myItems : S.partnerItems;
        var cat = mine ? S.myCat : S.partnerCat;
        var loading = mine ? S.myLoading : S.partnerLoading;
        var error = mine ? S.myError : S.partnerError;
        var page = mine ? S.myPage : S.partnerPage;
        var canPrev = mine ? !!S.myPrev : !!S.partnerPrev;
        var canNext = mine ? !!S.myNext : !!S.partnerNext;

        var sec = el('section', { class: 'nx20-sec' });
        var head = el('div', { class: 'nx20-sec-head' }, el('h2', { class: 'nx20-sec-title' }, title));
        var sel = el('select', {
            class: 'nx20-select',
            onchange: function(e) {
                var v = e.currentTarget.value;
                if (mine) { S.myCat = v; S.myCursor = ''; S.myPage = 1; }
                else { S.partnerCat = v; S.partnerCursor = ''; S.partnerPage = 1; }
                load(side);
            }
        });
        CATEGORIES.forEach(function(c) {
            var opt = el('option', { value: c.value }, c.label);
            if (c.value === cat) opt.selected = true;
            sel.appendChild(opt);
        });
        head.appendChild(sel);
        sec.appendChild(head);

        if (error) sec.appendChild(el('div', { class: 'nx20-empty' }, error));
        else if (loading) sec.appendChild(el('div', { class: 'nx20-empty' }, 'Loading inventory...'));
        else if (!items.length) sec.appendChild(el('div', { class: 'nx20-empty' }, 'No limiteds in this category.'));
        else {
            var grid = el('div', { class: 'nx20-items' });
            items.forEach(function(it) {
                grid.appendChild(ItemCard(it, mine ? 'offer' : 'request'));
            });
            sec.appendChild(grid);
        }

        var pager = el('div', { class: 'nx20-pager' });
        var prev = el('button', { class: 'nx20-pg', type: 'button' }, '\u2039');
        if (!canPrev) prev.disabled = true;
        prev.addEventListener('click', function() {
            if (mine) { S.myCursor = S.myPrev; S.myPage = Math.max(1, S.myPage - 1); }
            else { S.partnerCursor = S.partnerPrev; S.partnerPage = Math.max(1, S.partnerPage - 1); }
            load(side);
        });
        var next = el('button', { class: 'nx20-pg', type: 'button' }, '\u203a');
        if (!canNext) next.disabled = true;
        next.addEventListener('click', function() {
            if (mine) { S.myCursor = S.myNext; S.myPage += 1; }
            else { S.partnerCursor = S.partnerNext; S.partnerPage += 1; }
            load(side);
        });
        pager.appendChild(prev);
        pager.appendChild(el('span', {}, 'Page ' + page));
        pager.appendChild(next);
        sec.appendChild(pager);
        return sec;
    }

    function SidePanel(kind) {
        var isOffer = kind === 'offer';
        var title = isOffer ? 'Your Offer' : 'Your Request';
        var items = isOffer ? S.offer : S.request;
        var robuxStr = isOffer ? S.offerRobux : S.requestRobux;
        var robux = parseInt(robuxStr, 10) || 0;
        var itemTotal = items.reduce(function(t, i) { return t + (i.rap || 0); }, 0);
        var total = itemTotal + robux;
        var afterFee = Math.floor(robux * 0.7);

        var sec = el('section', { class: 'nx20-side-sec' });
        sec.appendChild(el('h2', { class: 'nx20-sec-title' }, title));

        var slots = el('div', { class: 'nx20-slots' });
        var padded = items.concat(new Array(Math.max(0, 4 - items.length)).fill(null));
        padded.forEach(function(item) {
            var slot = el('div', { class: 'nx20-slot' + (item ? ' filled' : '') });
            if (item) {
                var btn = el('button', { class: 'nx20-slot-in', type: 'button' });
                btn.addEventListener('click', function() {
                    var arr = isOffer ? S.offer : S.request;
                    var idx = arr.findIndex(function(x) { return keyOf(x) === keyOf(item); });
                    if (idx >= 0) arr.splice(idx, 1);
                    render();
                });
                var wrap = el('span', { class: 'nx20-slot-img' });
                if (item.thumbnail) wrap.appendChild(el('img', { src: item.thumbnail, alt: item.name }));
                btn.appendChild(wrap);
                var right = el('span', {});
                right.appendChild(el('p', { class: 'nx20-slot-name' }, item.name));
                right.appendChild(RobuxValue(item.rap));
                btn.appendChild(right);
                slot.appendChild(btn);
            }
            slots.appendChild(slot);
        });
        sec.appendChild(slots);

        var robuxWrap = el('div', { class: 'nx20-robux' });
        robuxWrap.appendChild(el('span', { class: 'r' }, 'R$'));
        var input = el('input', {
            inputmode: 'numeric',
            value: robuxStr,
            placeholder: 'Plus Robux amount'
        });
        input.addEventListener('input', function(e) {
            var v = clampRobux(e.currentTarget.value);
            if (isOffer) S.offerRobux = v; else S.requestRobux = v;
            render();
        });
        robuxWrap.appendChild(input);
        sec.appendChild(robuxWrap);

        if (robux > 0) {
            sec.appendChild(el('div', { class: 'nx20-fee' },
                el('span', {}, 'After 30% fee:'),
                RobuxValue(afterFee)
            ));
        }

        var tot = el('div', { class: 'nx20-total' });
        tot.appendChild(el('span', {}, 'Total Value:'));
        var tv = el('span', { class: 'nx20-total-val' });
        tv.appendChild(el('span', { class: 'icon-robux-16x16' }));
        tv.appendChild(el('span', {}, fmt(total)));
        tot.appendChild(tv);
        sec.appendChild(tot);
        return sec;
    }

    function ConfirmModal() {
        var bg = el('div', { class: 'nx20-modal-bg' });
        bg.addEventListener('click', function(e) {
            if (e.target === e.currentTarget && !S.sending) {
                S.modalOpen = false;
                render();
            }
        });
        var m = el('div', { class: 'nx20-modal' });
        m.appendChild(el('h3', {}, 'Send Request'));
        m.appendChild(el('p', {}, 'Are you sure you want to send a trade request?'));

        var actions = el('div', { class: 'nx20-actions' });
        var ok = el('button', { class: 'ok' }, S.sending ? 'Sending...' : 'Send');
        if (S.sending) ok.disabled = true;
        ok.addEventListener('click', submit);
        var cancel = el('button', { class: 'cancel' }, 'Cancel');
        if (S.sending) cancel.disabled = true;
        cancel.addEventListener('click', function() {
            S.modalOpen = false;
            render();
        });
        actions.appendChild(ok);
        actions.appendChild(cancel);
        m.appendChild(actions);

        if (S.sendError) m.appendChild(el('div', { class: 'nx20-err' }, S.sendError));
        bg.appendChild(m);
        return bg;
    }

    function SentModal() {
        var bg = el('div', { class: 'nx20-modal-bg' });
        var m = el('div', { class: 'nx20-modal' });
        m.appendChild(el('h3', {}, 'Trade Sent!'));
        m.appendChild(el('p', {}, 'Your trade request has been sent!'));

        var actions = el('div', { class: 'nx20-actions' });
        var back = el('button', { class: 'cancel' }, 'Back to Trades List');
        back.addEventListener('click', function() {
            S.sentOpen = false;
            render();
            location.reload();
        });
        actions.appendChild(back);
        m.appendChild(actions);
        bg.appendChild(m);
        return bg;
    }

    function Shell() {
        var root = el('div', { class: 'nx20-root' });
        var shell = el('div', { class: 'nx20-shell' });

        var back = el('a', { href: '/trades', class: 'nx20-back' }, '\u2039 Back to Trades List');
        shell.appendChild(back);

        var partnerName = S.partnerId ? ('User ' + S.partnerId) : 'User';
        shell.appendChild(el('h1', { class: 'nx20-title' }, 'Trade with ' + partnerName));

        var wrap = el('div', { class: 'nx20-wrap' });
        var left = el('div', {});
        left.appendChild(Section('my'));

        if (S.partnerId) {
            left.appendChild(Section('partner'));
        } else {
            var add = el('section', { class: 'nx20-sec' });
            add.appendChild(el('h2', { class: 'nx20-sec-title' }, 'Their Inventory'));
            var inp = el('input', {
                class: 'nx20-select',
                placeholder: 'Enter userId to trade with, then press Enter'
            });
            inp.addEventListener('keydown', function(e) {
                if (e.key !== 'Enter') return;
                var id = parseInt(e.currentTarget.value.replace(/[^\d]/g, ''), 10);
                if (!id) return;
                S.partnerId = id;
                S.partnerCursor = '';
                S.partnerPage = 1;
                load('partner');
            });
            add.appendChild(inp);
            left.appendChild(add);
        }
        wrap.appendChild(left);

        var right = el('aside', { class: 'nx20-side' });
        right.appendChild(SidePanel('offer'));
        right.appendChild(SidePanel('request'));

        var canOffer = !!S.partnerId && S.offer.length > 0 && S.request.length > 0 && !S.sending;
        var offerBtn = el('button', { class: 'nx20-offer' }, 'Make Offer');
        if (!canOffer) offerBtn.disabled = true;
        offerBtn.addEventListener('click', function() {
            S.sendError = null;
            S.modalOpen = true;
            render();
        });
        right.appendChild(offerBtn);
        wrap.appendChild(right);

        shell.appendChild(wrap);
        root.appendChild(shell);

        if (S.modalOpen) root.appendChild(ConfirmModal());
        if (S.sentOpen) root.appendChild(SentModal());
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
        var existing = document.querySelector('.nx20-root');
        var next = Shell();
        if (existing) {
            existing.replaceWith(next);
            return;
        }
        var main = document.querySelector('.main-0-2-45')
            || document.querySelector('main')
            || document.querySelector('#__next > div > div');
        if (main) {
            main.innerHTML = '';
            main.appendChild(next);
        }
    }

    function load(side) {
        var mine = side === 'my';
        if (mine && !S.meId) return;
        if (!mine && !S.partnerId) return;

        if (mine) { S.myLoading = true; S.myError = null; }
        else { S.partnerLoading = true; S.partnerError = null; }
        render();

        var userId = mine ? S.meId : S.partnerId;
        var cat = mine ? S.myCat : S.partnerCat;
        var cursor = mine ? S.myCursor : S.partnerCursor;

        API.inventory(userId, cat, cursor)
            .then(function(res) {
                var lims = res.items.filter(function(i) { return i.serialNumber != null; });
                return API.thumbnails(lims.map(function(i) { return i.assetId; }))
                    .then(function(thumbs) {
                        lims.forEach(function(it) { it.thumbnail = thumbs[it.assetId] || null; });
                        if (mine) { S.myItems = lims; S.myNext = res.nextCursor; }
                        else { S.partnerItems = lims; S.partnerNext = res.nextCursor; }
                    });
            })
            .catch(function(e) {
                if (mine) { S.myError = e.message || 'Failed to load inventory.'; S.myItems = []; }
                else { S.partnerError = e.message || 'Failed to load inventory.'; S.partnerItems = []; }
            })
            .then(function() {
                if (mine) S.myLoading = false; else S.partnerLoading = false;
                render();
            });
    }

    function submit() {
        if (S.sending) return;
        S.sending = true;
        S.sendError = null;
        render();

        API.sendTrade({
            offerUserId: S.meId,
            requestUserId: S.partnerId,
            offerUserAssets: S.offer.map(function(i) {
                return i.userAssetId != null ? i.userAssetId : i.assetId;
            }),
            requestUserAssets: S.request.map(function(i) {
                return i.userAssetId != null ? i.userAssetId : i.assetId;
            }),
            offerRobux: S.offerRobux ? parseInt(S.offerRobux, 10) : null,
            requestRobux: S.requestRobux ? parseInt(S.requestRobux, 10) : null
        }).then(function() {
            S.sending = false;
            S.modalOpen = false;
            S.sentOpen = true;
            render();
        }).catch(function(e) {
            S.sending = false;
            S.sendError = e.message || 'Failed to send trade.';
            render();
        });
    }

    function detectMe() {
        try {
            var me = window.__NEXT_DATA__
                && window.__NEXT_DATA__.props
                && window.__NEXT_DATA__.props.pageProps
                && window.__NEXT_DATA__.props.pageProps.user;
            if (me && me.id) return me.id;
        } catch (e) {}

        var a = document.querySelector('a[href*="/users/"]');
        if (a) {
            var m = a.getAttribute('href').match(/\/users\/(\d+)/);
            if (m) return parseInt(m[1], 10);
        }
        return null;
    }

    var booted = false;

    function boot() {
        if (!/^\/trades(\/|$)/.test(location.pathname)) return;
        if (booted && document.querySelector('.nx20-root')) return;
        booted = true;
        ensureStyle();

        S.meId = detectMe();
        if (!S.meId) {
            var id = parseInt(prompt('Nexus: could not detect your userId. Enter it:') || '', 10);
            if (!id) { booted = false; return; }
            S.meId = id;
        }

        render();
        load('my');
    }

    window.NX.features.trade2020 = {
        apply: function() {
            boot();
            var lastPath = location.pathname;
            setInterval(function() {
                if (location.pathname !== lastPath) {
                    lastPath = location.pathname;
                    if (/^\/trades(\/|$)/.test(lastPath)) {
                        booted = false;
                        setTimeout(boot, 300);
                    }
                }
            }, 500);
        }
    };

})();
