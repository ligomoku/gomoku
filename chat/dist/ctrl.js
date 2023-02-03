import { presetCtrl } from './preset';
import { noteCtrl } from './note';
import { moderationCtrl } from './moderation';
import { prop } from 'common';
export default function (opts, redraw) {
    const data = opts.data;
    data.domVersion = 1; // increment to force redraw
    const maxLines = 200;
    const maxLinesDrop = 50; // how many lines to drop at once
    const palantir = {
        instance: undefined,
        loaded: false,
        enabled: prop(!!data.palantir),
    };
    const allTabs = ['discussion'];
    if (opts.noteId)
        allTabs.push('note');
    if (opts.plugin)
        allTabs.push(opts.plugin.tab.key);
    const tabStorage = lichess.storage.make('chat.tab'), storedTab = tabStorage.get();
    let moderation;
    const vm = {
        tab: allTabs.find(tab => tab === storedTab) || allTabs[0],
        enabled: opts.alwaysEnabled || !lichess.storage.get('nochat'),
        placeholderKey: 'talkInChat',
        loading: false,
        autofocus: false,
        timeout: opts.timeout,
        writeable: opts.writeable,
    };
    /* If discussion is disabled, and we have another chat tab,
     * then select that tab over discussion */
    if (allTabs.length > 1 && vm.tab === 'discussion' && lichess.storage.get('nochat'))
        vm.tab = allTabs[1];
    const post = (text) => {
        text = text.trim();
        if (!text)
            return false;
        if (text == 'You too!' && !data.lines.some(l => l.u != data.userId))
            return false;
        if (text.length > 140) {
            alert('Max length: 140 chars. ' + text.length + ' chars used.');
            return false;
        }
        lichess.pubsub.emit('socket.send', 'talk', text);
        return true;
    };
    const onTimeout = (userId) => {
        let change = false;
        data.lines.forEach(l => {
            if (l.u && l.u.toLowerCase() == userId) {
                l.d = true;
                change = true;
            }
        });
        if (userId == data.userId)
            vm.timeout = change = true;
        if (change) {
            data.domVersion++;
            redraw();
        }
    };
    const onReinstate = (userId) => {
        if (userId == data.userId) {
            vm.timeout = false;
            redraw();
        }
    };
    const onMessage = (line) => {
        data.lines.push(line);
        const nb = data.lines.length;
        if (nb > maxLines) {
            data.lines.splice(0, nb - maxLines + maxLinesDrop);
            data.domVersion++;
        }
        redraw();
    };
    const onWriteable = (v) => {
        vm.writeable = v;
        redraw();
    };
    const onPermissions = (obj) => {
        let p;
        for (p in obj)
            opts.permissions[p] = obj[p];
        instanciateModeration();
        redraw();
    };
    const trans = lichess.trans(opts.i18n);
    function instanciateModeration() {
        if (opts.permissions.timeout || opts.permissions.broadcast || opts.permissions.local) {
            moderation = moderationCtrl({
                reasons: opts.timeoutReasons || [{ key: 'other', name: 'Inappropriate behavior' }],
                permissions: opts.permissions,
                resourceId: data.resourceId,
                redraw,
            });
            opts.loadCss('chat.mod');
        }
    }
    instanciateModeration();
    const note = opts.noteId
        ? noteCtrl({
            id: opts.noteId,
            text: opts.noteText,
            trans,
            redraw,
        })
        : undefined;
    const preset = presetCtrl({
        initialGroup: opts.preset,
        post,
        redraw,
    });
    const subs = [
        ['socket.in.message', onMessage],
        ['socket.in.chat_timeout', onTimeout],
        ['socket.in.chat_reinstate', onReinstate],
        ['chat.writeable', onWriteable],
        ['chat.permissions', onPermissions],
        ['palantir.toggle', palantir.enabled],
    ];
    subs.forEach(([eventName, callback]) => lichess.pubsub.on(eventName, callback));
    const destroy = () => {
        subs.forEach(([eventName, callback]) => lichess.pubsub.off(eventName, callback));
    };
    const emitEnabled = () => lichess.pubsub.emit('chat.enabled', vm.enabled);
    emitEnabled();
    return {
        data,
        opts,
        vm,
        allTabs,
        setTab(t) {
            vm.tab = t;
            vm.autofocus = true;
            tabStorage.set(t);
            redraw();
        },
        moderation: () => moderation,
        note,
        preset,
        post,
        trans,
        plugin: opts.plugin,
        setEnabled(v) {
            vm.enabled = v;
            emitEnabled();
            if (!v)
                lichess.storage.set('nochat', '1');
            else
                lichess.storage.remove('nochat');
            redraw();
        },
        redraw,
        palantir,
        destroy,
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3RybC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9jdHJsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDdEMsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLFFBQVEsQ0FBQztBQUNsQyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQzlDLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxRQUFRLENBQUM7QUFFOUIsTUFBTSxDQUFDLE9BQU8sV0FBVyxJQUFjLEVBQUUsTUFBYztJQUNyRCxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO0lBQ3ZCLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDLENBQUMsNEJBQTRCO0lBQ2pELE1BQU0sUUFBUSxHQUFHLEdBQUcsQ0FBQztJQUNyQixNQUFNLFlBQVksR0FBRyxFQUFFLENBQUMsQ0FBQyxpQ0FBaUM7SUFFMUQsTUFBTSxRQUFRLEdBQUc7UUFDZixRQUFRLEVBQUUsU0FBUztRQUNuQixNQUFNLEVBQUUsS0FBSztRQUNiLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7S0FDL0IsQ0FBQztJQUVGLE1BQU0sT0FBTyxHQUFVLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDdEMsSUFBSSxJQUFJLENBQUMsTUFBTTtRQUFFLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDdEMsSUFBSSxJQUFJLENBQUMsTUFBTTtRQUFFLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7SUFFbkQsTUFBTSxVQUFVLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQ2pELFNBQVMsR0FBRyxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUM7SUFFL0IsSUFBSSxVQUFzQyxDQUFDO0lBRTNDLE1BQU0sRUFBRSxHQUFjO1FBQ3BCLEdBQUcsRUFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLFNBQVMsQ0FBQyxJQUFJLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFDekQsT0FBTyxFQUFFLElBQUksQ0FBQyxhQUFhLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUM7UUFDN0QsY0FBYyxFQUFFLFlBQVk7UUFDNUIsT0FBTyxFQUFFLEtBQUs7UUFDZCxTQUFTLEVBQUUsS0FBSztRQUNoQixPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU87UUFDckIsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTO0tBQzFCLENBQUM7SUFFRjs4Q0FDMEM7SUFDMUMsSUFBSSxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUMsR0FBRyxLQUFLLFlBQVksSUFBSSxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUM7UUFBRSxFQUFFLENBQUMsR0FBRyxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUV4RyxNQUFNLElBQUksR0FBRyxDQUFDLElBQVksRUFBVyxFQUFFO1FBQ3JDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDbkIsSUFBSSxDQUFDLElBQUk7WUFBRSxPQUFPLEtBQUssQ0FBQztRQUN4QixJQUFJLElBQUksSUFBSSxVQUFVLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQztZQUFFLE9BQU8sS0FBSyxDQUFDO1FBQ2xGLElBQUksSUFBSSxDQUFDLE1BQU0sR0FBRyxHQUFHLEVBQUU7WUFDckIsS0FBSyxDQUFDLHlCQUF5QixHQUFHLElBQUksQ0FBQyxNQUFNLEdBQUcsY0FBYyxDQUFDLENBQUM7WUFDaEUsT0FBTyxLQUFLLENBQUM7U0FDZDtRQUNELE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDakQsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDLENBQUM7SUFFRixNQUFNLFNBQVMsR0FBRyxDQUFDLE1BQWMsRUFBRSxFQUFFO1FBQ25DLElBQUksTUFBTSxHQUFHLEtBQUssQ0FBQztRQUNuQixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUNyQixJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsSUFBSSxNQUFNLEVBQUU7Z0JBQ3RDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDO2dCQUNYLE1BQU0sR0FBRyxJQUFJLENBQUM7YUFDZjtRQUNILENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxNQUFNLElBQUksSUFBSSxDQUFDLE1BQU07WUFBRSxFQUFFLENBQUMsT0FBTyxHQUFHLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDdEQsSUFBSSxNQUFNLEVBQUU7WUFDVixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7WUFDbEIsTUFBTSxFQUFFLENBQUM7U0FDVjtJQUNILENBQUMsQ0FBQztJQUVGLE1BQU0sV0FBVyxHQUFHLENBQUMsTUFBYyxFQUFFLEVBQUU7UUFDckMsSUFBSSxNQUFNLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUN6QixFQUFFLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztZQUNuQixNQUFNLEVBQUUsQ0FBQztTQUNWO0lBQ0gsQ0FBQyxDQUFDO0lBRUYsTUFBTSxTQUFTLEdBQUcsQ0FBQyxJQUFVLEVBQUUsRUFBRTtRQUMvQixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN0QixNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQztRQUM3QixJQUFJLEVBQUUsR0FBRyxRQUFRLEVBQUU7WUFDakIsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLEVBQUUsR0FBRyxRQUFRLEdBQUcsWUFBWSxDQUFDLENBQUM7WUFDbkQsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1NBQ25CO1FBQ0QsTUFBTSxFQUFFLENBQUM7SUFDWCxDQUFDLENBQUM7SUFFRixNQUFNLFdBQVcsR0FBRyxDQUFDLENBQVUsRUFBRSxFQUFFO1FBQ2pDLEVBQUUsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDO1FBQ2pCLE1BQU0sRUFBRSxDQUFDO0lBQ1gsQ0FBQyxDQUFDO0lBRUYsTUFBTSxhQUFhLEdBQUcsQ0FBQyxHQUFnQixFQUFFLEVBQUU7UUFDekMsSUFBSSxDQUFvQixDQUFDO1FBQ3pCLEtBQUssQ0FBQyxJQUFJLEdBQUc7WUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM1QyxxQkFBcUIsRUFBRSxDQUFDO1FBQ3hCLE1BQU0sRUFBRSxDQUFDO0lBQ1gsQ0FBQyxDQUFDO0lBRUYsTUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFFdkMsU0FBUyxxQkFBcUI7UUFDNUIsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRTtZQUNwRixVQUFVLEdBQUcsY0FBYyxDQUFDO2dCQUMxQixPQUFPLEVBQUUsSUFBSSxDQUFDLGNBQWMsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsd0JBQXdCLEVBQUUsQ0FBQztnQkFDbEYsV0FBVyxFQUFFLElBQUksQ0FBQyxXQUFXO2dCQUM3QixVQUFVLEVBQUUsSUFBSSxDQUFDLFVBQVU7Z0JBQzNCLE1BQU07YUFDUCxDQUFDLENBQUM7WUFDSCxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1NBQzFCO0lBQ0gsQ0FBQztJQUNELHFCQUFxQixFQUFFLENBQUM7SUFFeEIsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLE1BQU07UUFDdEIsQ0FBQyxDQUFDLFFBQVEsQ0FBQztZQUNQLEVBQUUsRUFBRSxJQUFJLENBQUMsTUFBTTtZQUNmLElBQUksRUFBRSxJQUFJLENBQUMsUUFBUTtZQUNuQixLQUFLO1lBQ0wsTUFBTTtTQUNQLENBQUM7UUFDSixDQUFDLENBQUMsU0FBUyxDQUFDO0lBRWQsTUFBTSxNQUFNLEdBQUcsVUFBVSxDQUFDO1FBQ3hCLFlBQVksRUFBRSxJQUFJLENBQUMsTUFBTTtRQUN6QixJQUFJO1FBQ0osTUFBTTtLQUNQLENBQUMsQ0FBQztJQUVILE1BQU0sSUFBSSxHQUErQjtRQUN2QyxDQUFDLG1CQUFtQixFQUFFLFNBQVMsQ0FBQztRQUNoQyxDQUFDLHdCQUF3QixFQUFFLFNBQVMsQ0FBQztRQUNyQyxDQUFDLDBCQUEwQixFQUFFLFdBQVcsQ0FBQztRQUN6QyxDQUFDLGdCQUFnQixFQUFFLFdBQVcsQ0FBQztRQUMvQixDQUFDLGtCQUFrQixFQUFFLGFBQWEsQ0FBQztRQUNuQyxDQUFDLGlCQUFpQixFQUFFLFFBQVEsQ0FBQyxPQUFPLENBQUM7S0FDdEMsQ0FBQztJQUNGLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUMsRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUM7SUFFaEYsTUFBTSxPQUFPLEdBQUcsR0FBRyxFQUFFO1FBQ25CLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUMsRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUM7SUFDbkYsQ0FBQyxDQUFDO0lBRUYsTUFBTSxXQUFXLEdBQUcsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUMxRSxXQUFXLEVBQUUsQ0FBQztJQUVkLE9BQU87UUFDTCxJQUFJO1FBQ0osSUFBSTtRQUNKLEVBQUU7UUFDRixPQUFPO1FBQ1AsTUFBTSxDQUFDLENBQU07WUFDWCxFQUFFLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztZQUNYLEVBQUUsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1lBQ3BCLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbEIsTUFBTSxFQUFFLENBQUM7UUFDWCxDQUFDO1FBQ0QsVUFBVSxFQUFFLEdBQUcsRUFBRSxDQUFDLFVBQVU7UUFDNUIsSUFBSTtRQUNKLE1BQU07UUFDTixJQUFJO1FBQ0osS0FBSztRQUNMLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTtRQUNuQixVQUFVLENBQUMsQ0FBVTtZQUNuQixFQUFFLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQztZQUNmLFdBQVcsRUFBRSxDQUFDO1lBQ2QsSUFBSSxDQUFDLENBQUM7Z0JBQUUsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUFDOztnQkFDdEMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDdEMsTUFBTSxFQUFFLENBQUM7UUFDWCxDQUFDO1FBQ0QsTUFBTTtRQUNOLFFBQVE7UUFDUixPQUFPO0tBQ1IsQ0FBQztBQUNKLENBQUMifQ==