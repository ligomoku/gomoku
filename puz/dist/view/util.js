import { h } from 'snabbdom';
import { getNow } from '../util';
export const playModifiers = (run) => {
    const now = getNow();
    const malus = run.modifier.malus;
    const bonus = run.modifier.bonus;
    return {
        'puz-mod-puzzle': run.current.startAt > now - 90,
        'puz-mod-move': run.modifier.moveAt > now - 90,
        'puz-mod-malus-slow': !!malus && malus.at > now - 950,
        'puz-mod-bonus-slow': !!bonus && bonus.at > now - 950,
    };
};
export const renderCombo = (config, renderBonus) => (run) => {
    const level = run.combo.level();
    return h('div.puz-combo', [
        h('div.puz-combo__counter', [
            h('span.puz-combo__counter__value', run.combo.current),
            h('span.puz-combo__counter__combo', 'COMBO'),
        ]),
        h('div.puz-combo__bars', [
            h('div.puz-combo__bar', [
                h('div.puz-combo__bar__in', {
                    attrs: { style: `width:${run.combo.percent()}%` },
                }),
                h('div.puz-combo__bar__in-full'),
            ]),
            h('div.puz-combo__levels', [0, 1, 2, 3].map(l => h('div.puz-combo__level', {
                class: {
                    active: l < level,
                },
            }, h('span', renderBonus(config.combo.levels[l + 1][1]))))),
        ]),
    ]);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy92aWV3L3V0aWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLENBQUMsRUFBUyxNQUFNLFVBQVUsQ0FBQztBQUVwQyxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sU0FBUyxDQUFDO0FBRWpDLE1BQU0sQ0FBQyxNQUFNLGFBQWEsR0FBRyxDQUFDLEdBQVEsRUFBRSxFQUFFO0lBQ3hDLE1BQU0sR0FBRyxHQUFHLE1BQU0sRUFBRSxDQUFDO0lBQ3JCLE1BQU0sS0FBSyxHQUFHLEdBQUcsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDO0lBQ2pDLE1BQU0sS0FBSyxHQUFHLEdBQUcsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDO0lBQ2pDLE9BQU87UUFDTCxnQkFBZ0IsRUFBRSxHQUFHLENBQUMsT0FBTyxDQUFDLE9BQU8sR0FBRyxHQUFHLEdBQUcsRUFBRTtRQUNoRCxjQUFjLEVBQUUsR0FBRyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsR0FBRyxHQUFHLEVBQUU7UUFDOUMsb0JBQW9CLEVBQUUsQ0FBQyxDQUFDLEtBQUssSUFBSSxLQUFLLENBQUMsRUFBRSxHQUFHLEdBQUcsR0FBRyxHQUFHO1FBQ3JELG9CQUFvQixFQUFFLENBQUMsQ0FBQyxLQUFLLElBQUksS0FBSyxDQUFDLEVBQUUsR0FBRyxHQUFHLEdBQUcsR0FBRztLQUN0RCxDQUFDO0FBQ0osQ0FBQyxDQUFDO0FBRUYsTUFBTSxDQUFDLE1BQU0sV0FBVyxHQUN0QixDQUFDLE1BQWMsRUFBRSxXQUFzQyxFQUFFLEVBQUUsQ0FDM0QsQ0FBQyxHQUFRLEVBQVMsRUFBRTtJQUNsQixNQUFNLEtBQUssR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ2hDLE9BQU8sQ0FBQyxDQUFDLGVBQWUsRUFBRTtRQUN4QixDQUFDLENBQUMsd0JBQXdCLEVBQUU7WUFDMUIsQ0FBQyxDQUFDLGdDQUFnQyxFQUFFLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDO1lBQ3RELENBQUMsQ0FBQyxnQ0FBZ0MsRUFBRSxPQUFPLENBQUM7U0FDN0MsQ0FBQztRQUNGLENBQUMsQ0FBQyxxQkFBcUIsRUFBRTtZQUN2QixDQUFDLENBQUMsb0JBQW9CLEVBQUU7Z0JBQ3RCLENBQUMsQ0FBQyx3QkFBd0IsRUFBRTtvQkFDMUIsS0FBSyxFQUFFLEVBQUUsS0FBSyxFQUFFLFNBQVMsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsR0FBRyxFQUFFO2lCQUNsRCxDQUFDO2dCQUNGLENBQUMsQ0FBQyw2QkFBNkIsQ0FBQzthQUNqQyxDQUFDO1lBQ0YsQ0FBQyxDQUNDLHVCQUF1QixFQUN2QixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUNuQixDQUFDLENBQ0Msc0JBQXNCLEVBQ3RCO2dCQUNFLEtBQUssRUFBRTtvQkFDTCxNQUFNLEVBQUUsQ0FBQyxHQUFHLEtBQUs7aUJBQ2xCO2FBQ0YsRUFDRCxDQUFDLENBQUMsTUFBTSxFQUFFLFdBQVcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUN0RCxDQUNGLENBQ0Y7U0FDRixDQUFDO0tBQ0gsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaCwgVk5vZGUgfSBmcm9tICdzbmFiYmRvbSc7XG5pbXBvcnQgeyBDb25maWcsIFJ1biB9IGZyb20gJy4uL2ludGVyZmFjZXMnO1xuaW1wb3J0IHsgZ2V0Tm93IH0gZnJvbSAnLi4vdXRpbCc7XG5cbmV4cG9ydCBjb25zdCBwbGF5TW9kaWZpZXJzID0gKHJ1bjogUnVuKSA9PiB7XG4gIGNvbnN0IG5vdyA9IGdldE5vdygpO1xuICBjb25zdCBtYWx1cyA9IHJ1bi5tb2RpZmllci5tYWx1cztcbiAgY29uc3QgYm9udXMgPSBydW4ubW9kaWZpZXIuYm9udXM7XG4gIHJldHVybiB7XG4gICAgJ3B1ei1tb2QtcHV6emxlJzogcnVuLmN1cnJlbnQuc3RhcnRBdCA+IG5vdyAtIDkwLFxuICAgICdwdXotbW9kLW1vdmUnOiBydW4ubW9kaWZpZXIubW92ZUF0ID4gbm93IC0gOTAsXG4gICAgJ3B1ei1tb2QtbWFsdXMtc2xvdyc6ICEhbWFsdXMgJiYgbWFsdXMuYXQgPiBub3cgLSA5NTAsXG4gICAgJ3B1ei1tb2QtYm9udXMtc2xvdyc6ICEhYm9udXMgJiYgYm9udXMuYXQgPiBub3cgLSA5NTAsXG4gIH07XG59O1xuXG5leHBvcnQgY29uc3QgcmVuZGVyQ29tYm8gPVxuICAoY29uZmlnOiBDb25maWcsIHJlbmRlckJvbnVzOiAoYm9udXM6IG51bWJlcikgPT4gc3RyaW5nKSA9PlxuICAocnVuOiBSdW4pOiBWTm9kZSA9PiB7XG4gICAgY29uc3QgbGV2ZWwgPSBydW4uY29tYm8ubGV2ZWwoKTtcbiAgICByZXR1cm4gaCgnZGl2LnB1ei1jb21ibycsIFtcbiAgICAgIGgoJ2Rpdi5wdXotY29tYm9fX2NvdW50ZXInLCBbXG4gICAgICAgIGgoJ3NwYW4ucHV6LWNvbWJvX19jb3VudGVyX192YWx1ZScsIHJ1bi5jb21iby5jdXJyZW50KSxcbiAgICAgICAgaCgnc3Bhbi5wdXotY29tYm9fX2NvdW50ZXJfX2NvbWJvJywgJ0NPTUJPJyksXG4gICAgICBdKSxcbiAgICAgIGgoJ2Rpdi5wdXotY29tYm9fX2JhcnMnLCBbXG4gICAgICAgIGgoJ2Rpdi5wdXotY29tYm9fX2JhcicsIFtcbiAgICAgICAgICBoKCdkaXYucHV6LWNvbWJvX19iYXJfX2luJywge1xuICAgICAgICAgICAgYXR0cnM6IHsgc3R5bGU6IGB3aWR0aDoke3J1bi5jb21iby5wZXJjZW50KCl9JWAgfSxcbiAgICAgICAgICB9KSxcbiAgICAgICAgICBoKCdkaXYucHV6LWNvbWJvX19iYXJfX2luLWZ1bGwnKSxcbiAgICAgICAgXSksXG4gICAgICAgIGgoXG4gICAgICAgICAgJ2Rpdi5wdXotY29tYm9fX2xldmVscycsXG4gICAgICAgICAgWzAsIDEsIDIsIDNdLm1hcChsID0+XG4gICAgICAgICAgICBoKFxuICAgICAgICAgICAgICAnZGl2LnB1ei1jb21ib19fbGV2ZWwnLFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgY2xhc3M6IHtcbiAgICAgICAgICAgICAgICAgIGFjdGl2ZTogbCA8IGxldmVsLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIGgoJ3NwYW4nLCByZW5kZXJCb251cyhjb25maWcuY29tYm8ubGV2ZWxzW2wgKyAxXVsxXSkpXG4gICAgICAgICAgICApXG4gICAgICAgICAgKVxuICAgICAgICApLFxuICAgICAgXSksXG4gICAgXSk7XG4gIH07XG4iXX0=