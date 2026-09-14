(function() {
    'use strict';

    window.NX = window.NX || {};
    window.NX.features = window.NX.features || {};

    var CSS_ID = 'nx-panel-style';
    var DEV_ID = 59420;

    var CSS = [
        '.nxp-root{background:#1a1c1e;color:#e0e0e0;min-height:calc(100vh - 60px);font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;padding:24px;box-sizing:border-box}',
        '.nxp-root *{box-sizing:border-box}',
        '.nxp-shell{max-width:1100px;margin:0 auto}',
        '.nxp-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:24px;padding-bottom:16px;border-bottom:1px solid #2f3133}',
        '.nxp-title{font-size:26px;font-weight:600;color:#fff;margin:0}',
        '.nxp-sub{font-size:13px;color:#7a7d80;margin-top:4px}',
        '.nxp-back{background:#2a2c2e;color:#d5d7d9;border:1px solid #3a3d40;border-radius:6px;padding:8px 14px;font-size:13px;font-weight:500;cursor:pointer;text-decoration:none !important}',
        '.nxp-back:hover{background:#333538;color:#fff}',
        '.nxp-tabs{display:flex;gap:4px;margin-bottom:20px}',
        '.nxp-tab{background:transparent;border:0;color:#7a7d80;font-size:14px;font-weight:500;padding:8px 14px;border-radius:6px;cursor:pointer;font-family:inherit}',
        '.nxp-tab:hover{background:#232527;color:#b8bcbf}',
        '.nxp-tab.active{background:#2a2c2e;color:#fff}',
        '.nxp-panel{background:#232527;border:1px solid #2f3133;border-radius:10px;padding:20px}',
        '.nxp-row{display:flex;align-items:center;justify-content:space-between;padding:12px 0;border-bottom:1px solid #2a2c2e;gap:16px}',
        '.nxp-row:last-child{border-bottom:0}',
        '.nxp-user{display:flex;flex-direction:column;min-width:0;flex:1}',
        '.nxp-name{font-size:14px;font-weight:500;color:#e8e8e8}',
        '.nxp-meta{font-size:12px;color:#7a7d80;margin-top:2px;word-break:break-all}',
        '.nxp-tag{display:inline-block;font-size:11px;font-weight:600;padding:2px 8px;border-radius:10px;margin-left:8px;vertical-align:middle}',
        '.nxp-tag.admin{background:#0a84ff;color:#fff}',
        '.nxp-tag.banned{background:#e5484d;color:#fff}',
        '.nxp-btn{background:#2a2c2e;color:#d5d7d9;border:1px solid #3a3d40;border-radius:6px;padding:6px 12px;font-size:12px;font-weight:500;cursor:pointer;font-family:inherit}',
        '.nxp-btn:hover{background:#333538;color:#fff}',
        '.nxp-btn.danger{border-color:#e5484d;color:#e5484d}',
        '.nxp-btn.danger:hover{background:#e5484d;color:#fff}',
        '.nxp-btn.primary{background:#0a84ff;border-color:#0a84ff;color:#fff}',
        '.nxp-btn.primary:hover{background:#0a76e0}',
        '.nxp-btn:disabled{opacity:0.5;cursor:not-allowed}',
        '.nxp-textarea{width:100%;min-height:110px;background:#1a1c1e;color:#e0e0e0;border:1px solid #3a3d40;border-radius:6px;padding:10px;font-family:inherit;font-size:13px;resize:vertical;line-height:1.5}',
        '.nxp-textarea:focus{outline:none;border-color:#0a84ff}',
        '.nxp-empty{color:#7a7d80;font-size:13px;text-align:center;padding:32px 0}',
        '.nxp-feedback{margin-top:14px;font-size:13px;padding:10px 12px;border-radius:6px}',
        '.nxp-feedback.ok{color:#3ecf5a;background:rgba(62,207,90,0.08);border:1px solid rgba(62,207,90,0.3)}',
        '.nxp-feedback.err{color:#e5484d;background:rgba(229,72,77,0.08);border:1px solid rgba(229,72,77,0.3)}',
        '.nxp-stat-row{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:20px}',
        '.nxp-stat{background:#1a1c1e;border:1px solid #2f3133;border-radius:8px;padding:14px}',
        '.nxp-stat-label{font-size:11px;color:#7a7d80;text-transform:uppercase;letter-spacing:0.6px;font-weight:600}',
        '.nxp-stat-value{font-size:24px;font-weight:600;color:#fff;margin-top:6px}',
        '.nxp-section-title{font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.7px;color:#7a7d80;margin:0 0 12px}'
    ].join('');

    var S = {
        tab: 'overview',
        users: null,
        announcement: null,
        loading: false,
        error: null,
        feedback: null,
        announceDraft: ''
    };

    function el(tag, props) {
        var e = document.createElement(tag);
        props = props || {};
        for (var k in props) {
            var v = props[k];
            if (k === 'class') e.className = v;
            else if (k === 'style') e.setAttribute('style', v);
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

    function ensureStyle() {
        if (document.getElementById(CSS_ID)) return;
        var s = document.createElement('style');
        s.id = CSS_ID;
        s.textContent = CSS;
        document.head.appendChild(s);
    }

    function timeAgo(ts) {
        if (!ts) return '—';
        var s = Math.floor((Date.now() - ts) / 1000);
        if (s < 60) return s + 's ago';
        if (s < 3600) return Math.floor(s / 60) + 'm ago';
        if (s < 86400) return Math.floor(s / 3600) + 'h ago';
        return Math.floor(s / 86400) + 'd ago';
    }

    function setFeedback(ok, text) {
        S.feedback = { ok: ok, text: text };
        render();
    }

    function render() {
        ensureStyle();
        var existing = document.querySelector('.nxp-root');
        var next = build();
        if (existing) existing.replaceWith(next);
        else {
            var host = document.querySelector('.main-0-2-45')
                || document.querySelector('main')
                || document.querySelector('#__next > div > div')
                || document.querySelector('#__next');
            if (host) { host.innerHTML = ''; host.appendChild(next); }
        }
    }

    function build() {
        var root = el('div', { class: 'nxp-root' });
        var shell = el('div', { class: 'nxp-shell' });

        var head = el('div', { class: 'nxp-head' });
        var titleWrap = el('div', {});
        titleWrap.appendChild(el('h1', { class: 'nxp-title' }, 'Nexus Panel'));
        titleWrap.appendChild(el('div', { class: 'nxp-sub' }, 'Restricted to the project owner.'));
        head.appendChild(titleWrap);
        head.appendChild(el('a', { class: 'nxp-back', href: '/home' }, '← Back to site'));
        shell.appendChild(head);

        var tabs = el('div', { class: 'nxp-tabs' });
        [['overview', 'Overview'], ['users', 'Users'], ['announce', 'Announcement']].forEach(function(t) {
            tabs.appendChild(el('button', {
                class: 'nxp-tab' + (S.tab === t[0] ? ' active' : ''),
                onclick: function() { S.tab = t[0]; S.feedback = null; render(); }
            }, t[1]));
        });
        shell.appendChild(tabs);

        var panel = el('div', { class: 'nxp-panel' });
        if (S.tab === 'overview') panel.appendChild(renderOverview());
        else if (S.tab === 'users') panel.appendChild(renderUsers());
        else if (S.tab === 'announce') panel.appendChild(renderAnnounce());
        shell.appendChild(panel);

        if (S.feedback) {
            shell.appendChild(el('div', { class: 'nxp-feedback ' + (S.feedback.ok ? 'ok' : 'err') }, S.feedback.text));
        }

        root.appendChild(shell);
        return root;
    }

    function renderOverview() {
        var wrap = el('div', {});
        var stats = el('div', { class: 'nxp-stat-row' });

        var total = S.users ? S.users.length : 0;
        var admins = S.users ? S.users.filter(function(u) { return u.isAdmin; }).length : 0;
        var banned = S.users ? S.users.filter(function(u) { return u.banned; }).length : 0;

        [['Total users', total], ['Admins', admins], ['Banned', banned]].forEach(function(s) {
            var card = el('div', { class: 'nxp-stat' });
            card.appendChild(el('div', { class: 'nxp-stat-label' }, s[0]));
            card.appendChild(el('div', { class: 'nxp-stat-value' }, String(s[1])));
            stats.appendChild(card);
        });
        wrap.appendChild(stats);

        wrap.appendChild(el('div', { class: 'nxp-section-title' }, 'Status'));
        var statusText = S.loading ? 'Loading…' : (S.error ? S.error : 'Connected.');
        wrap.appendChild(el('div', { class: 'nxp-sub' }, statusText));
        return wrap;
    }

    function renderUsers() {
        var wrap = el('div', {});
        if (S.loading) return el('div', { class: 'nxp-empty' }, 'Loading users…');
        if (S.error) return el('div', { class: 'nxp-empty' }, S.error);
        if (!S.users || !S.users.length) return el('div', { class: 'nxp-empty' }, 'No users yet.');

        S.users.forEach(function(u) {
            var row = el('div', { class: 'nxp-row' });
            var info = el('div', { class: 'nxp-user' });
            var name = el('div', { class: 'nxp-name' }, (u.username || 'Unknown') + ' #' + u.aisakaId);
            if (u.isAdmin) name.appendChild(el('span', { class: 'nxp-tag admin' }, 'ADMIN'));
            if (u.banned) name.appendChild(el('span', { class: 'nxp-tag banned' }, 'BANNED'));
            info.appendChild(name);
            info.appendChild(el('div', { class: 'nxp-meta' }, 'Last seen ' + timeAgo(u.lastSeen) + ' • Token ' + u.tokenPreview));
            row.appendChild(info);

            var actions = el('div', {});
            var banBtn = el('button', {
                class: 'nxp-btn ' + (u.banned ? '' : 'danger'),
                onclick: function() {
                    if (u.banned && !confirm('Unban ' + u.username + '?')) return;
                    if (!u.banned && !confirm('Ban ' + u.username + '?')) return;
                    window.NX.server.adminBan(u.tokenPreview).then(function(res) {
                        if (res.status === 200 && res.data.ok) {
                            setFeedback(true, (res.data.banned ? 'Banned ' : 'Unbanned ') + u.username);
                            loadUsers();
                        } else {
                            setFeedback(false, (res.data && res.data.error) || 'Failed');
                        }
                    }).catch(function(e) { setFeedback(false, e.message); });
                }
            }, u.banned ? 'Unban' : 'Ban');
            actions.appendChild(banBtn);
            row.appendChild(actions);
            wrap.appendChild(row);
        });
        return wrap;
    }

    function renderAnnounce() {
        var wrap = el('div', {});
        wrap.appendChild(el('div', { class: 'nxp-sub' }, 'Every Nexus user sees this banner on load.'));
        var ta = el('textarea', {
            class: 'nxp-textarea',
            placeholder: 'Announcement text…',
            oninput: function(e) { S.announceDraft = e.currentTarget.value; }
        });
        ta.value = S.announceDraft || '';
        ta.style.marginTop = '12px';
        wrap.appendChild(ta);

        var btn = el('button', {
            class: 'nxp-btn primary',
            style: 'margin-top:12px',
            onclick: function() {
                window.NX.server.adminAnnounce(S.announceDraft || '').then(function(res) {
                    if (res.status === 200 && res.data.ok) setFeedback(true, 'Announcement posted.');
                    else setFeedback(false, (res.data && res.data.error) || 'Failed');
                }).catch(function(e) { setFeedback(false, e.message); });
            }
        }, 'Post announcement');
        wrap.appendChild(btn);

        var clearBtn = el('button', {
            class: 'nxp-btn',
            style: 'margin-top:12px;margin-left:8px',
            onclick: function() {
                S.announceDraft = '';
                window.NX.server.adminAnnounce('').then(function(res) {
                    if (res.status === 200 && res.data.ok) setFeedback(true, 'Announcement cleared.');
                    else setFeedback(false, (res.data && res.data.error) || 'Failed');
                }).catch(function(e) { setFeedback(false, e.message); });
            }
        }, 'Clear');
        wrap.appendChild(clearBtn);

        return wrap;
    }

    function loadUsers() {
        S.loading = true; S.error = null;
        render();
        window.NX.server.adminUsers().then(function(res) {
            S.loading = false;
            if (res.status === 200) S.users = res.data.users || [];
            else if (res.status === 403) S.error = 'Not authorised.';
            else S.error = (res.data && res.data.error) || 'Failed to load users.';
            render();
        }).catch(function(e) {
            S.loading = false;
            S.error = e.message || 'Network error';
            render();
        });
    }

    function boot() {
        if (!/^\/admin\/?$/.test(location.pathname)) return;
        if (document.querySelector('.nxp-root')) return;

        var meId = parseInt(localStorage.getItem('nx_me_id') || '0', 10);
        if (meId !== DEV_ID) return;

        window.NX.server.claim(meId, '').then(function() {
            render();
            loadUsers();
        }).catch(function(e) {
            S.error = e.message || 'Could not reach server.';
            render();
        });
    }

    window.NX.features.nexusPanel = {
        apply: function() {
            boot();
            var last = location.pathname;
            setInterval(function() {
                if (location.pathname !== last) {
                    last = location.pathname;
                    if (/^\/admin\/?$/.test(location.pathname)) {
                        setTimeout(boot, 500);
                    }
                }
            }, 400);
        }
    };

})();
