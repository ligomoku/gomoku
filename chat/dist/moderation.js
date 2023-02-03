import { h } from 'snabbdom';
import { bind } from 'common/snabbdom';
import userLink from 'common/userLink';
import { numberFormat } from 'common/number';
import { userModInfo, flag } from './xhr';
export function moderationCtrl(opts) {
    let data;
    let loading = false;
    const open = (line) => {
        const userA = line.querySelector('a.user-link');
        const text = line.querySelector('t').innerText;
        const username = userA.href.split('/')[4];
        if (opts.permissions.timeout) {
            loading = true;
            userModInfo(username).then(d => {
                data = { ...d, text };
                loading = false;
                opts.redraw();
            });
        }
        else {
            data = {
                id: username.toLowerCase(),
                username,
                text,
            };
        }
        opts.redraw();
    };
    const close = () => {
        data = undefined;
        loading = false;
        opts.redraw();
    };
    return {
        loading: () => loading,
        data: () => data,
        opts,
        open,
        close,
        timeout(reason, text) {
            data &&
                lichess.pubsub.emit('socket.send', 'timeout', {
                    userId: data.id,
                    reason: reason.key,
                    text,
                });
            close();
            opts.redraw();
        },
    };
}
export function report(ctrl, line) {
    const userA = line.querySelector('a.user-link');
    const text = line.querySelector('t').innerText;
    if (userA)
        reportUserText(ctrl.data.resourceId, userA.href.split('/')[4], text);
}
function reportUserText(resourceId, username, text) {
    if (confirm(`Report "${text}" to moderators?`))
        flag(resourceId, username, text);
}
export const lineAction = () => h('i.mod', { attrs: { 'data-icon': '' } });
export function moderationView(ctrl) {
    if (!ctrl)
        return;
    if (ctrl.loading())
        return [h('div.loading')];
    const data = ctrl.data();
    if (!data)
        return;
    const perms = ctrl.opts.permissions;
    const infos = data.history
        ? h('div.infos.block', [numberFormat(data.games || 0) + ' games', data.tos ? 'TOS' : undefined]
            .map(t => t && h('span', t))
            .concat([
            h('a', {
                attrs: {
                    href: '/@/' + data.username + '?mod',
                },
            }, 'profile'),
        ])
            .concat(perms.shadowban
            ? [
                h('a', {
                    attrs: {
                        href: '/mod/' + data.username + '/communication',
                    },
                }, 'coms'),
            ]
            : []))
        : undefined;
    const timeout = perms.timeout || perms.broadcast
        ? h('div.timeout.block', [
            h('strong', 'Timeout 15 minutes for'),
            ...ctrl.opts.reasons.map(r => h('a.text', {
                attrs: { 'data-icon': '' },
                hook: bind('click', () => ctrl.timeout(r, data.text)),
            }, r.name)),
        ])
        : h('div.timeout.block', [
            h('strong', 'Moderation'),
            ...[
                h('a.text', {
                    attrs: { 'data-icon': '' },
                    hook: bind('click', () => ctrl.timeout(ctrl.opts.reasons[0], data.text)),
                }, 'Timeout 15 minutes'),
                h('a.text', {
                    attrs: { 'data-icon': '' },
                    hook: bind('click', () => {
                        reportUserText(ctrl.opts.resourceId, data.username, data.text);
                        ctrl.timeout(ctrl.opts.reasons[0], data.text);
                    }),
                }, 'Timeout and report to Lichess'),
            ],
        ]);
    const history = data.history
        ? h('div.history.block', [
            h('strong', 'Timeout history'),
            h('table', h('tbody.slist', {
                hook: {
                    insert() {
                        lichess.contentLoaded();
                    },
                },
            }, data.history.map(function (e) {
                return h('tr', [
                    h('td.reason', e.reason),
                    h('td.mod', e.mod),
                    h('td', h('time.timeago', {
                        attrs: { datetime: e.date },
                    })),
                ]);
            }))),
        ])
        : undefined;
    return [
        h('div.top', { key: 'mod-' + data.id }, [
            h('span.text', {
                attrs: { 'data-icon': '' },
            }, [userLink(data.username)]),
            h('a', {
                attrs: { 'data-icon': '' },
                hook: bind('click', ctrl.close),
            }),
        ]),
        h('div.mchat__content.moderation', [h('i.line-text.block', ['"', data.text, '"']), infos, timeout, history]),
    ];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kZXJhdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9tb2RlcmF0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxDQUFDLEVBQVMsTUFBTSxVQUFVLENBQUM7QUFDcEMsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3ZDLE9BQU8sUUFBUSxNQUFNLGlCQUFpQixDQUFDO0FBRXZDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDN0MsT0FBTyxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUUsTUFBTSxPQUFPLENBQUM7QUFFMUMsTUFBTSxVQUFVLGNBQWMsQ0FBQyxJQUFvQjtJQUNqRCxJQUFJLElBQWdDLENBQUM7SUFDckMsSUFBSSxPQUFPLEdBQUcsS0FBSyxDQUFDO0lBRXBCLE1BQU0sSUFBSSxHQUFHLENBQUMsSUFBaUIsRUFBRSxFQUFFO1FBQ2pDLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFvQixDQUFDO1FBQ25FLE1BQU0sSUFBSSxHQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFpQixDQUFDLFNBQVMsQ0FBQztRQUNoRSxNQUFNLFFBQVEsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMxQyxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFO1lBQzVCLE9BQU8sR0FBRyxJQUFJLENBQUM7WUFDZixXQUFXLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFO2dCQUM3QixJQUFJLEdBQUcsRUFBRSxHQUFHLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQztnQkFDdEIsT0FBTyxHQUFHLEtBQUssQ0FBQztnQkFDaEIsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ2hCLENBQUMsQ0FBQyxD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