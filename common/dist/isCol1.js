let cache = 'init';
export default function () {
    if (typeof cache == 'string') {
        if (cache == 'init') {
            // only once
            window.addEventListener('resize', () => {
                cache = 'rec';
            }); // recompute on resize
            if (navigator.userAgent.indexOf('Edge/') > -1)
                // edge gets false positive on page load, fix later
                requestAnimationFrame(() => {
                    cache = 'rec';
                });
        }
        cache = !!window.getComputedStyle(document.body).getPropertyValue('--col1');
    }
    return cache;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXNDb2wxLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2lzQ29sMS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLEtBQUssR0FBNkIsTUFBTSxDQUFDO0FBRTdDLE1BQU0sQ0FBQyxPQUFPO0lBQ1osSUFBSSxPQUFPLEtBQUssSUFBSSxRQUFRLEVBQUU7UUFDNUIsSUFBSSxLQUFLLElBQUksTUFBTSxFQUFFO1lBQ25CLFlBQVk7WUFDWixNQUFNLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRTtnQkFDckMsS0FBSyxHQUFHLEtBQUssQ0FBQztZQUNoQixDQUFDLENBQUMsQ0FBQyxDQUFDLHNCQUFzQjtZQUMxQixJQUFJLFNBQVMsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDM0MsbURBQW1EO2dCQUNuRCxxQkFBcUIsQ0FBQyxHQUFHLEVBQUU7b0JBQ3pCLEtBQUssR0FBRyxLQUFLLENBQUM7Z0JBQ2hCLENBQUMsQ0FBQyxDQUFDO1NBQ047UUFDRCxLQUFLLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUM7S0FDN0U7SUFDRCxPQUFPLEtBQUssQ0FBQztBQUNmLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJsZXQgY2FjaGU6ICdpbml0JyB8ICdyZWMnIHwgYm9vbGVhbiA9ICdpbml0JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKCk6IGJvb2xlYW4ge1xuICBpZiAodHlwZW9mIGNhY2hlID09ICdzdHJpbmcnKSB7XG4gICAgaWYgKGNhY2hlID09ICdpbml0Jykge1xuICAgICAgLy8gb25seSBvbmNlXG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgKCkgPT4ge1xuICAgICAgICBjYWNoZSA9ICdyZWMnO1xuICAgICAgfSk7IC8vIHJlY29tcHV0ZSBvbiByZXNpemVcbiAgICAgIGlmIChuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoJ0VkZ2UvJykgPiAtMSlcbiAgICAgICAgLy8gZWRnZSBnZXRzIGZhbHNlIHBvc2l0aXZlIG9uIHBhZ2UgbG9hZCwgZml4IGxhdGVyXG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICAgICAgY2FjaGUgPSAncmVjJztcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGNhY2hlID0gISF3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShkb2N1bWVudC5ib2R5KS5nZXRQcm9wZXJ0eVZhbHVlKCctLWNvbDEnKTtcbiAgfVxuICByZXR1cm4gY2FjaGU7XG59XG4iXX0=