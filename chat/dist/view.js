import { h } from 'snabbdom';
import { bind } from 'common/snabbdom';
import discussionView from './discussion';
import { noteView } from './note';
import { moderationView } from './moderation';
export default function (ctrl) {
    const mod = ctrl.moderation();
    return h('section.mchat' + (ctrl.opts.alwaysEnabled ? '' : '.mchat-optional'), {
        class: {
            'mchat-mod': !!mod,
        },
        hook: {
            destroy: ctrl.destroy,
        },
    }, moderationView(mod) || normalView(ctrl));
}
function renderPalantir(ctrl) {
    const p = ctrl.palantir;
    if (!p.enabled())
        return;
    return p.instance
        ? p.instance.render(h)
        : h('div.mchat__tab.palantir.palantir-slot', {
            attrs: {
                'data-icon': '',
                title: 'Voice chat',
            },
            hook: bind('click', () => {
                if (!p.loaded) {
                    p.loaded = true;
                    lichess.loadScript('javascripts/vendor/peerjs.min.js').then(() => {
                        lichess.loadModule('palantir').then(() => {
                            p.instance = window.Palantir.palantir({
                                uid: ctrl.data.userId,
                                redraw: ctrl.redraw,
                            });
                            ctrl.redraw();
                        });
                    });
                }
            }),
        });
}
function normalView(ctrl) {
    const active = ctrl.vm.tab;
    return [
        h('div.mchat__tabs.nb_' + ctrl.allTabs.length, { attrs: { role: 'tablist' } }, [
            ...ctrl.allTabs.map(t => renderTab(ctrl, t, active)),
            renderPalantir(ctrl),
        ]),
        h('div.mchat__content.' + active, active === 'note' && ctrl.note
            ? [noteView(ctrl.note, ctrl.vm.autofocus)]
            : ctrl.plugin && active === ctrl.plugin.tab.key
                ? [ctrl.plugin.view()]
                : discussionView(ctrl)),
    ];
}
const renderTab = (ctrl, tab, active) => h('div.mchat__tab.' + tab, {
    attrs: { role: 'tab' },
    class: { 'mchat__tab-active': tab === active },
    hook: bind('click', () => ctrl.setTab(tab)),
}, tabName(ctrl, tab));
function tabName(ctrl, tab) {
    if (tab === 'discussion')
        return [
            h('span', ctrl.data.name),
            ctrl.opts.alwaysEnabled
                ? undefined
                : h('input', {
                    attrs: {
                        type: 'checkbox',
                        title: ctrl.trans.noarg('toggleTheChat'),
                        checked: ctrl.vm.enabled,
                    },
                    hook: bind('change', (e) => {
                        ctrl.setEnabled(e.target.checked);
                    }),
                }),
        ];
    if (tab === 'note')
        return [h('span', ctrl.trans.noarg('notes'))];
    if (ctrl.plugin && tab === ctrl.plugin.tab.key)
        return [h('span', ctrl.plugin.tab.name)];
    return [];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlldy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy92aWV3LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxDQUFDLEVBQVMsTUFBTSxVQUFVLENBQUM7QUFDcEMsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRXZDLE9BQU8sY0FBYyxNQUFNLGNBQWMsQ0FBQztBQUMxQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sUUFBUSxDQUFDO0FBQ2xDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFLOUMsTUFBTSxDQUFDLE9BQU8sV0FBVyxJQUFVO0lBQ2pDLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUU5QixPQUFPLENBQUMsQ0FDTixlQUFlLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxFQUNwRTtRQUNFLEtBQUssRUFBRTtZQUNMLFdBQVcsRUFBRSxDQUFDLENBQUMsR0FBRztTQUNuQjtRQUNELElBQUksRUFBRTtZQUNKLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTztTQUN0QjtLQUNGLEVBQ0QsY0FBYyxDQUFDLEdBQUcsQ0FBQyxJQUFJLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FDeEMsQ0FBQztBQUNKLENBQUM7QUFFRCxTQUFTLGNBQWMsQ0FBQyxJQUFVO0lBQ2hDLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDeEIsSUFBSSxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUU7UUFBRSxPQUFPO0lBQ3pCLE9BQU8sQ0FBQyxDQUFDLFFBQVE7UUFDZixDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQ3RCLENBQUMsQ0FBQyxDQUFDLENBQUMsdUNBQXVDLEVBQUU7WUFDekMs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