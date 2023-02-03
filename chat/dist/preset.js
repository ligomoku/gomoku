import { h } from 'snabbdom';
import { bind } from 'common/snabbdom';
const groups = {
    start: ['hi/Hello', 'gl/Good luck', 'hf/Have fun!', 'u2/You too!'].map(splitIt),
    end: ['gg/Good game', 'wp/Well played', 'ty/Thank you', "gtg/I've got to go", 'bye/Bye!'].map(splitIt),
};
export function presetCtrl(opts) {
    let group = opts.initialGroup;
    let said = [];
    return {
        group: () => group,
        said: () => said,
        setGroup(p) {
            if (p !== group) {
                group = p;
                if (!p)
                    said = [];
                opts.redraw();
            }
        },
        post(preset) {
            if (!group)
                return;
            const sets = groups[group];
            if (!sets)
                return;
            if (said.includes(preset.key))
                return;
            if (opts.post(preset.text))
                said.push(preset.key);
        },
    };
}
export function presetView(ctrl) {
    const group = ctrl.group();
    if (!group)
        return;
    const sets = groups[group];
    const said = ctrl.said();
    return sets && said.length < 2
        ? h('div.mchat__presets', sets.map((p) => {
            const disabled = said.includes(p.key);
            return h('span', {
                class: {
                    disabled,
                },
                attrs: {
                    title: p.text,
                    disabled,
                },
                hook: bind('click', () => {
                    !disabled && ctrl.post(p);
                }),
            }, p.key);
        }))
        : undefined;
}
function splitIt(s) {
    const parts = s.split('/');
    return {
        key: parts[0],
        text: parts[1],
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3ByZXNldC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsQ0FBQyxFQUFTLE1BQU0sVUFBVSxDQUFDO0FBQ3BDLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQThCdkMsTUFBTSxNQUFNLEdBQWlCO0lBQzNCLEtBQUssRUFBRSxDQUFDLFVBQVUsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGFBQWEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUM7SUFDL0UsR0FBRyxFQUFFLENBQUMsY0FBYyxFQUFFLGdCQUFnQixFQUFFLGNBQWMsRUFBRSxvQkFBb0IsRUFBRSxVQUFVLENBQUMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDO0NBQ3ZHLENBQUM7QUFFRixNQUFNLFVBQVUsVUFBVSxDQUFDLElBQWdCO0lBQ3pDLElBQUksS0FBSyxHQUF1QixJQUFJLENBQUMsWUFBWSxDQUFDO0lBRWxELElBQUksSUFBSSxHQUFhLEVBQUUsQ0FBQztJQUV4QixPQUFPO1FBQ0wsS0FBSyxFQUFFLEdBQUcsRUFBRSxDQUFDLEtBQUs7UUFDbEIsSUFBSSxFQUFFLEdBQUcsRUFBRSxDQUFDLElBQUk7UUFDaEIsUUFBUSxDQUFDLENBQXFCO1lBQzVCLElBQUksQ0FBQyxLQUFLLEtBQUssRUFBRTtnQkFDZixLQUFLLEdBQUcsQ0FBQyxDQUFDO2dCQUNWLElBQUksQ0FBQyxDQUFDO29CQUFFLElBQUksR0FBRyxFQUFFLENBQUM7Z0JBQ2xCLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQzthQUNmO1FBQ0gsQ0FBQztRQUNELElBQUksQ0FBQyxNQUFNO1lBQ1QsSUFBSSxDQUFDLEtBQUs7Z0JBQUUsT0FBTztZQUNuQixNQUFNLElBQUksR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDM0IsSUFBSSxDQUFDLElBQUk7Z0JBQUUsT0FBTztZQUNsQixJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQztnQkFBRSxPQUFPO1lBQ3RDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO2dCQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3BELENBQUM7S0FDRixDQUFDO0FBQ0osQ0FBQztBQUVELE1BQU0sVUFBVSxVQUFVLENBQUMsSUFBZ0I7SUFDekMsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQzNCLElBQUksQ0FBQyxLQUFLO1FBQUUsT0FBTztJQUNuQixNQUFNLElBQUksR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDM0IsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3pCLE9BQU8sSUFBSSxJQUFJLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQztRQUM1QixDQUFDLENBQUMsQ0FBQyxDQUNDLG9CQUFvQixFQUNwQixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBUyxFQUFFLEVBQUU7WUFDckIsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDdEMsT0FBTyxDQUFDLENBQ04sTUFBTSxFQUNOO2dCQUNFLEtBQUssRUFBRTtvQkFDTCxRQUFRO2lCQUNUO2dCQUNELEtBQUssRUFBRTtvQkFDTCxLQUFLLEVBQUUsQ0FBQyxDQUFDLElBQUk7b0JBQ2IsUUFBUTtpQkFDVDtnQkFDRCxJQUFJLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUU7b0JBQ3ZCLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzVCLENBQUMsQ0FBQzthQUNILEVBQ0QsQ0FBQyxDQUFDLEdBQUcsQ0FDTixDQUFDO1FBQ0osQ0FBQyxDQUFDLENBQ0g7UUFDSCxDQUFDLENBQUMsU0FBUyxDQUFDO0FBQ2hCLENBQUM7QUFFRCxTQUFTLE9BQU8sQ0FBQyxDQUFTO0lBQ3hCLE1BQU0sS0FBSyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDM0IsT0FBTztRQUNMLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQ2IsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7S0FDZixDQUFDO0FBQ0osQ0FBQyJ9