/***
 * Wraps an asynchronous function to ensure only one call at a time is in
 * flight. Any extra calls are dropped, except the last one, which waits for
 * the previous call to complete.
 */
export function throttlePromise(wrapped) {
    let current;
    let afterCurrent;
    return function (...args) {
        const self = this;
        const exec = () => {
            afterCurrent = undefined;
            current = wrapped.apply(self, args).finally(() => {
                current = undefined;
                if (afterCurrent)
                    afterCurrent();
            });
        };
        if (current)
            afterCurrent = exec;
        else
            exec();
    };
}
/**
 * Wraps an asynchronous function to return a promise that resolves
 * after completion plus a delay (regardless if the wrapped function resolves
 * or rejects).
 */
export function finallyDelay(delay, wrapped) {
    return function (...args) {
        const self = this;
        return new Promise(resolve => {
            wrapped.apply(self, args).finally(() => setTimeout(resolve, delay.apply(self, args)));
        });
    };
}
/**
 * Wraps an asynchronous function to ensure only one call at a time is in flight. Any extra calls
 * are dropped, except the last one, which waits for the previous call to complete plus a delay.
 */
export function throttlePromiseDelay(delay, wrapped) {
    return throttlePromise(finallyDelay(delay, wrapped));
}
/**
 * Ensures calls to the wrapped function are spaced by the given delay.
 * Any extra calls are dropped, except the last one, which waits for the delay.
 */
export default function throttle(delay, wrapped) {
    return throttlePromise(function (...args) {
        wrapped.apply(this, args);
        return new Promise(resolve => setTimeout(resolve, delay));
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhyb3R0bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvdGhyb3R0bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUNILE1BQU0sVUFBVSxlQUFlLENBQzdCLE9BQVU7SUFFVixJQUFJLE9BQWtDLENBQUM7SUFDdkMsSUFBSSxZQUFzQyxDQUFDO0lBRTNDLE9BQU8sVUFBcUIsR0FBRyxJQUFtQjtRQUNoRCxNQUFNLElBQUksR0FBRyxJQUFJLENBQUM7UUFFbEIsTUFBTSxJQUFJLEdBQUcsR0FBRyxFQUFFO1lBQ2hCLFlBQVksR0FBRyxTQUFTLENBQUM7WUFDekIsT0FBTyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUU7Z0JBQy9DLE9BQU8sR0FBRyxTQUFTLENBQUM7Z0JBQ3BCLElBQUksWUFBWTtvQkFBRSxZQUFZLEVBQUUsQ0FBQztZQUNuQyxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQztRQUVGLElBQUksT0FBTztZQUFFLFlBQVksR0FBRyxJQUFJLENBQUM7O1lBQzVCLElBQUksRUFBRSxDQUFDO0lBQ2QsQ0FBQyxDQUFDO0FBQ0osQ0FBQztBQUVEOzs7O0dBSUc7QUFDSCxNQUFNLFVBQVUsWUFBWSxDQUMxQixLQUF5QyxFQUN6QyxPQUFVO0lBRVYsT0FBTyxVQUFxQixHQUFHLElBQW1CO1FBQ2hELE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQztRQUNsQixPQUFPLElBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQzNCLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN4RixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQztBQUNKLENBQUM7QUFFRDs7O0dBR0c7QUFDSCxNQUFNLFVBQVUsb0JBQW9CLENBQ2xDLEtBQXlDLEVBQ3pDLE9BQVU7SUFFVixPQUFPLGVBQWUsQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUM7QUFDdkQsQ0FBQztBQUVEOzs7R0FHRztBQUNILE1BQU0sQ0FBQyxPQUFPLFVBQVUsUUFBUSxDQUM5QixLQUFhLEVBQ2IsT0FBVTtJQUVWLE9BQU8sZUFBZSxDQUFDLFVBQXFCLEdBQUcsSUFBbUI7UUFDaEUsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDMUIsT0FBTyxJQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUM1RCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKioqXG4gKiBXcmFwcyBhbiBhc3luY2hyb25vdXMgZnVuY3Rpb24gdG8gZW5zdXJlIG9ubHkgb25lIGNhbGwgYXQgYSB0aW1lIGlzIGluXG4gKiBmbGlnaHQuIEFueSBleHRyYSBjYWxscyBhcmUgZHJvcHBlZCwgZXhjZXB0IHRoZSBsYXN0IG9uZSwgd2hpY2ggd2FpdHMgZm9yXG4gKiB0aGUgcHJldmlvdXMgY2FsbCB0byBjb21wbGV0ZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRocm90dGxlUHJvbWlzZTxUIGV4dGVuZHMgKC4uLmFyZ3M6IGFueSkgPT4gUHJvbWlzZTxhbnk+PihcbiAgd3JhcHBlZDogVFxuKTogKC4uLmFyZ3M6IFBhcmFtZXRlcnM8VD4pID0+IHZvaWQge1xuICBsZXQgY3VycmVudDogUHJvbWlzZTx2b2lkPiB8IHVuZGVmaW5lZDtcbiAgbGV0IGFmdGVyQ3VycmVudDogKCgpID0+IHZvaWQpIHwgdW5kZWZpbmVkO1xuXG4gIHJldHVybiBmdW5jdGlvbiAodGhpczogYW55LCAuLi5hcmdzOiBQYXJhbWV0ZXJzPFQ+KTogdm9pZCB7XG4gICAgY29uc3Qgc2VsZiA9IHRoaXM7XG5cbiAgICBjb25zdCBleGVjID0gKCkgPT4ge1xuICAgICAgYWZ0ZXJDdXJyZW50ID0gdW5kZWZpbmVkO1xuICAgICAgY3VycmVudCA9IHdyYXBwZWQuYXBwbHkoc2VsZiwgYXJncykuZmluYWxseSgoKSA9PiB7XG4gICAgICAgIGN1cnJlbnQgPSB1bmRlZmluZWQ7XG4gICAgICAgIGlmIChhZnRlckN1cnJlbnQpIGFmdGVyQ3VycmVudCgpO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIGlmIChjdXJyZW50KSBhZnRlckN1cnJlbnQgPSBleGVjO1xuICAgIGVsc2UgZXhlYygpO1xuICB9O1xufVxuXG4vKipcbiAqIFdyYXBzIGFuIGFzeW5jaHJvbm91cyBmdW5jdGlvbiB0byByZXR1cm4gYSBwcm9taXNlIHRoYXQgcmVzb2x2ZXNcbiAqIGFmdGVyIGNvbXBsZXRpb24gcGx1cyBhIGRlbGF5IChyZWdhcmRsZXNzIGlmIHRoZSB3cmFwcGVkIGZ1bmN0aW9uIHJlc29sdmVzXG4gKiBvciByZWplY3RzKS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZpbmFsbHlEZWxheTxUIGV4dGVuZHMgKC4uLmFyZ3M6IGFueSkgPT4gUHJvbWlzZTxhbnk+PihcbiAgZGVsYXk6ICguLi5hcmdzOiBQYXJhbWV0ZXJzPFQ+KSA9PiBudW1iZXIsXG4gIHdyYXBwZWQ6IFRcbik6ICguLi5hcmdzOiBQYXJhbWV0ZXJzPFQ+KSA9PiBQcm9taXNlPHZvaWQ+IHtcbiAgcmV0dXJuIGZ1bmN0aW9uICh0aGlzOiBhbnksIC4uLmFyZ3M6IFBhcmFtZXRlcnM8VD4pOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBzZWxmID0gdGhpcztcbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICB3cmFwcGVkLmFwcGx5KHNlbGYsIGFyZ3MpLmZpbmFsbHkoKCkgPT4gc2V0VGltZW91dChyZXNvbHZlLCBkZWxheS5hcHBseShzZWxmLCBhcmdzKSkpO1xuICAgIH0pO1xuICB9O1xufVxuXG4vKipcbiAqIFdyYXBzIGFuIGFzeW5jaHJvbm91cyBmdW5jdGlvbiB0byBlbnN1cmUgb25seSBvbmUgY2FsbCBhdCBhIHRpbWUgaXMgaW4gZmxpZ2h0LiBBbnkgZXh0cmEgY2FsbHNcbiAqIGFyZSBkcm9wcGVkLCBleGNlcHQgdGhlIGxhc3Qgb25lLCB3aGljaCB3YWl0cyBmb3IgdGhlIHByZXZpb3VzIGNhbGwgdG8gY29tcGxldGUgcGx1cyBhIGRlbGF5LlxuICovXG5leHBvcnQgZnVuY3Rpb24gdGhyb3R0bGVQcm9taXNlRGVsYXk8VCBleHRlbmRzICguLi5hcmdzOiBhbnkpID0+IFByb21pc2U8YW55Pj4oXG4gIGRlbGF5OiAoLi4uYXJnczogUGFyYW1ldGVyczxUPikgPT4gbnVtYmVyLFxuICB3cmFwcGVkOiBUXG4pOiAoLi4uYXJnczogUGFyYW1ldGVyczxUPikgPT4gdm9pZCB7XG4gIHJldHVybiB0aHJvdHRsZVByb21pc2UoZmluYWxseURlbGF5KGRlbGF5LCB3cmFwcGVkKSk7XG59XG5cbi8qKlxuICogRW5zdXJlcyBjYWxscyB0byB0aGUgd3JhcHBlZCBmdW5jdGlvbiBhcmUgc3BhY2VkIGJ5IHRoZSBnaXZlbiBkZWxheS5cbiAqIEFueSBleHRyYSBjYWxscyBhcmUgZHJvcHBlZCwgZXhjZXB0IHRoZSBsYXN0IG9uZSwgd2hpY2ggd2FpdHMgZm9yIHRoZSBkZWxheS5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdGhyb3R0bGU8VCBleHRlbmRzICguLi5hcmdzOiBhbnkpID0+IHZvaWQ+KFxuICBkZWxheTogbnVtYmVyLFxuICB3cmFwcGVkOiBUXG4pOiAoLi4uYXJnczogUGFyYW1ldGVyczxUPikgPT4gdm9pZCB7XG4gIHJldHVybiB0aHJvdHRsZVByb21pc2UoZnVuY3Rpb24gKHRoaXM6IGFueSwgLi4uYXJnczogUGFyYW1ldGVyczxUPikge1xuICAgIHdyYXBwZWQuYXBwbHkodGhpcywgYXJncyk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4gc2V0VGltZW91dChyZXNvbHZlLCBkZWxheSkpO1xuICB9KTtcbn1cbiJdfQ==