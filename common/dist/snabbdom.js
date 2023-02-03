import { h } from 'snabbdom';
export function onInsert(f) {
    return {
        insert: vnode => f(vnode.elm),
    };
}
export function bind(eventName, f, redraw, passive = true) {
    return onInsert(el => el.addEventListener(eventName, e => {
        const res = f(e);
        if (res === false)
            e.preventDefault();
        redraw === null || redraw === void 0 ? void 0 : redraw();
        return res;
    }, { passive }));
}
export const bindNonPassive = (eventName, f, redraw) => bind(eventName, f, redraw, false);
export function bindSubmit(f, redraw) {
    return bind('submit', e => (e.preventDefault(), f(e)), redraw, false);
}
export const dataIcon = (icon) => ({
    'data-icon': icon,
});
export const iconTag = (icon) => h('i', { attrs: dataIcon(icon) });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic25hYmJkb20uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvc25hYmJkb20udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLENBQUMsRUFBdUIsTUFBTSxVQUFVLENBQUM7QUFLbEQsTUFBTSxVQUFVLFFBQVEsQ0FBd0IsQ0FBdUI7SUFDckUsT0FBTztRQUNMLE1BQU0sRUFBRSxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBUSxDQUFDO0tBQ25DLENBQUM7QUFDSixDQUFDO0FBRUQsTUFBTSxVQUFVLElBQUksQ0FBQyxTQUFpQixFQUFFLENBQW9CLEVBQUUsTUFBbUIsRUFBRSxPQUFPLEdBQUcsSUFBSTtJQUMvRixPQUFPLFFBQVEsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUNuQixFQUFFLENBQUMsZ0JBQWdCLENBQ2pCLFNBQVMsRUFDVCxDQUFDLENBQUMsRUFBRTtRQUNGLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNqQixJQUFJLEdBQUcsS0FBSyxLQUFLO1lBQUUsQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3RDLE1BQU0sYUFBTixNQUFNLHVCQUFOLE1BQU0sRUFBSSxDQUFDO1FBQ1gsT0FBTyxHQUFHLENBQUM7SUFDYixDQUFDLEVBQ0QsRUFBRSxPQUFPLEVBQUUsQ0FDWixDQUNGLENBQUM7QUFDSixDQUFDO0FBRUQsTUFBTSxDQUFDLE1BQU0sY0FBYyxHQUFHLENBQUMsU0FBaUIsRUFBRSxDQUFvQixFQUFFLE1BQW1CLEVBQVMsRUFBRSxDQUNwRyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFFcEMsTUFBTSxVQUFVLFVBQVUsQ0FBQyxDQUF3QixFQUFFLE1BQW1CO0lBQ3RFLE9BQU8sSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLGNBQWMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQztBQUN4RSxDQUFDO0FBRUQsTUFBTSxDQUFDLE1BQU0sUUFBUSxHQUFHLENBQUMsSUFBWSxFQUFTLEVBQUUsQ0FBQyxDQUFDO0lBQ2hELFdBQVcsRUFBRSxJQUFJO0NBQ2xCLENBQUMsQ0FBQztBQUVILE1BQU0sQ0FBQyxNQUFNLE9BQU8sR0FBRyxDQUFDLElBQVksRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLEtBQUssRUFBRSxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaCwgVk5vZGUsIEhvb2tzLCBBdHRycyB9IGZyb20gJ3NuYWJiZG9tJztcblxuZXhwb3J0IHR5cGUgTWF5YmVWTm9kZSA9IFZOb2RlIHwgc3RyaW5nIHwgbnVsbCB8IHVuZGVmaW5lZDtcbmV4cG9ydCB0eXBlIE1heWJlVk5vZGVzID0gTWF5YmVWTm9kZVtdO1xuXG5leHBvcnQgZnVuY3Rpb24gb25JbnNlcnQ8QSBleHRlbmRzIEhUTUxFbGVtZW50PihmOiAoZWxlbWVudDogQSkgPT4gdm9pZCk6IEhvb2tzIHtcbiAgcmV0dXJuIHtcbiAgICBpbnNlcnQ6IHZub2RlID0+IGYodm5vZGUuZWxtIGFzIEEpLFxuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYmluZChldmVudE5hbWU6IHN0cmluZywgZjogKGU6IEV2ZW50KSA9PiBhbnksIHJlZHJhdz86ICgpID0+IHZvaWQsIHBhc3NpdmUgPSB0cnVlKTogSG9va3Mge1xuICByZXR1cm4gb25JbnNlcnQoZWwgPT5cbiAgICBlbC5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgZXZlbnROYW1lLFxuICAgICAgZSA9PiB7XG4gICAgICAgIGNvbnN0IHJlcyA9IGYoZSk7XG4gICAgICAgIGlmIChyZXMgPT09IGZhbHNlKSBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHJlZHJhdz8uKCk7XG4gICAgICAgIHJldHVybiByZXM7XG4gICAgICB9LFxuICAgICAgeyBwYXNzaXZlIH1cbiAgICApXG4gICk7XG59XG5cbmV4cG9ydCBjb25zdCBiaW5kTm9uUGFzc2l2ZSA9IChldmVudE5hbWU6IHN0cmluZywgZjogKGU6IEV2ZW50KSA9PiBhbnksIHJlZHJhdz86ICgpID0+IHZvaWQpOiBIb29rcyA9PlxuICBiaW5kKGV2ZW50TmFtZSwgZiwgcmVkcmF3LCBmYWxzZSk7XG5cbmV4cG9ydCBmdW5jdGlvbiBiaW5kU3VibWl0KGY6IChlOiBFdmVudCkgPT4gdW5rbm93biwgcmVkcmF3PzogKCkgPT4gdm9pZCk6IEhvb2tzIHtcbiAgcmV0dXJuIGJpbmQoJ3N1Ym1pdCcsIGUgPT4gKGUucHJldmVudERlZmF1bHQoKSwgZihlKSksIHJlZHJhdywgZmFsc2UpO1xufVxuXG5leHBvcnQgY29uc3QgZGF0YUljb24gPSAoaWNvbjogc3RyaW5nKTogQXR0cnMgPT4gKHtcbiAgJ2RhdGEtaWNvbic6IGljb24sXG59KTtcblxuZXhwb3J0IGNvbnN0IGljb25UYWcgPSAoaWNvbjogc3RyaW5nKSA9PiBoKCdpJywgeyBhdHRyczogZGF0YUljb24oaWNvbikgfSk7XG4iXX0=