/* Based on: */
/*!
 * hoverIntent v1.10.0 // 2019.02.25 // jQuery v1.7.0+
 * http://briancherne.github.io/jquery-hoverIntent/
 *
 * You may use hoverIntent under the terms of the MIT license. Basically that
 * means you are free to use hoverIntent as long as this header is left intact.
 * Copyright 2007-2019 Brian Cherne
 */
export default function () {
    if ('ontouchstart' in window)
        return;
    const interval = 200, sensitivity = 8;
    // current X and Y position of mouse, updated during mousemove tracking (shared across instances)
    let cX, cY;
    // saves the current pointer position coordinates based on the given mousemove event
    const track = (ev) => {
        cX = ev.pageX;
        cY = ev.pageY;
    };
    // state properties:
    // timeoutId = timeout ID, reused for tracking mouse position and delaying "out" handler
    // isActive = plugin state, true after `over` is called just until `out` is called
    // pX, pY = previously-measured pointer coordinates, updated at each polling interval
    // event = string representing the namespaced event used for mouse tracking
    let state = {};
    $('#topnav.hover').each(function () {
        const $el = $(this).removeClass('hover'), handler = () => $el.toggleClass('hover');
        // compares current and previous mouse positions
        const compare = () => {
            // compare mouse positions to see if pointer has slowed enough to trigger `over` function
            if (Math.sqrt((state.pX - cX) * (state.pX - cX) + (state.pY - cY) * (state.pY - cY)) < sensitivity) {
                $el.off(state.event, track);
                delete state.timeoutId;
                // set hoverIntent state as active for this element (permits `out` handler to trigger)
                state.isActive = true;
                handler();
            }
            else {
                // set previous coordinates for next comparison
                state.pX = cX;
                state.pY = cY;
                // use self-calling timeout, guarantees intervals are spaced out properly (avoids JavaScript timer bugs)
                state.timeoutId = setTimeout(compare, interval);
            }
        };
        // A private function for handling mouse 'hovering'
        const handleHover = function (ev) {
            // clear any existing timeout
            if (state.timeoutId)
                state.timeoutId = clearTimeout(state.timeoutId);
            // namespaced event used to register and unregister mousemove tracking
            const mousemove = (state.event = 'mousemove');
            // handle the event, based on its type
            if (ev.type == 'mouseover') {
                // do nothing if already active or a button is pressed (dragging a piece)
                if (state.isActive || ev.buttons)
                    return;
                // set "previous" X and Y position based on initial entry point
                state.pX = ev.pageX;
                state.pY = ev.pageY;
                // update "current" X and Y position based on mousemove
                $el.off(mousemove, track).on(mousemove, track);
                // start polling interval (self-calling timeout) to compare mouse coordinates over time
                state.timeoutId = setTimeout(compare, interval);
            }
            else {
                // "mouseleave"
                // do nothing if not already active
                if (!state.isActive)
                    return;
                // unbind expensive mousemove event
                $el.off(mousemove, track);
                // if hoverIntent state is true, then call the mouseOut function after the specified delay
                state = {};
                handler();
            }
        };
        $el.on('mouseover', handleHover).on('mouseleave', handleHover);
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudUhvdmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL21lbnVIb3Zlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxlQUFlO0FBQ2Y7Ozs7Ozs7R0FPRztBQVVILE1BQU0sQ0FBQyxPQUFPO0lBQ1osSUFBSSxjQUFjLElBQUksTUFBTTtRQUFFLE9BQU87SUFFckMsTUFBTSxRQUFRLEdBQUcsR0FBRyxFQUNsQixXQUFXLEdBQUcsQ0FBQyxDQUFDO0lBRWxCLGlHQUFpRztJQUNqRyxJQUFJLEVBQVUsRUFBRSxFQUFVLENBQUM7SUFFM0Isb0ZBQW9GO0lBQ3BGLE1BQU0sS0FBSyxHQUFHLENBQUMsRUFBYyxFQUFFLEVBQUU7UUFDL0IsRUFBRSxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUM7UUFDZCxFQUFFLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQztJQUNoQixDQUFDLENBQUM7SUFFRixvQkFBb0I7SUFDcEIsd0ZBQXdGO0lBQ3hGLGtGQUFrRjtJQUNsRixxRkFBcUY7SUFDckYsMkVBQTJFO0lBQzNFLElBQUksS0FBSyxHQUFVLEVBQUUsQ0FBQztJQUV0QixDQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsSUFBSSxDQUFDO1FBQ3RCLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLEVBQ3RDLE9BQU8sR0FBRyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRTNDLGdEQUFnRDtRQUNoRCxNQUFNLE9BQU8sR0FBRyxHQUFHLEVBQUU7WUFDbkIseUZBQXlGO1lBQ3pGLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFHLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUcsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFHLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxXQUFXLEVBQUU7Z0JBQ3RHLEdBQUcsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEtBQU0sRUFBRSxLQUFLLENBQUMsQ0FBQztnQkFDN0IsT0FBTyxLQUFLLENBQUMsU0FBUyxDQUFDO2dCQUN2QixzRkFBc0Y7Z0JBQ3RGLEtBQUssQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO2dCQUN0QixPQUFPLEVBQUUsQ0FBQzthQUNYO2lCQUFNO2dCQUNMLCtDQUErQztnQkFDL0MsS0FBSyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUM7Z0JBQ2QsS0FBSyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUM7Z0JBQ2Qsd0dBQXdHO2dCQUN4RyxLQUFLLENBQUMsU0FBUyxHQUFHLFVBQVUsQ0FBQyxPQUFPLEVBQUUsUUFBUSxDQUFDLENBQUM7YUFDakQ7UUFDSCxDQUFDLENBQUM7UUFFRixtREFBbUQ7UUFDbkQsTUFBTSxXQUFXLEdBQUcsVUFBVSxFQUFjO1lBQzFDLDZCQUE2QjtZQUM3QixJQUFJLEtBQUssQ0FBQyxTQUFTO2dCQUFFLEtBQUssQ0FBQyxTQUFTLEdBQUcsWUFBWSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUVyRSxzRUFBc0U7WUFDdEUsTUFBTSxTQUFTLEdBQUcsQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLFdBQVcsQ0FBQyxDQUFDO1lBRTlDLHNDQUFzQztZQUN0QyxJQUFJLEVBQUUsQ0FBQyxJQUFJLElBQUksV0FBVyxFQUFFO2dCQUMxQix5RUFBeUU7Z0JBQ3pFLElBQUksS0FBSyxDQUFDLFFBQVEsSUFBSSxFQUFFLENBQUMsT0FBTztvQkFBRSxPQUFPO2dCQUN6QywrREFBK0Q7Z0JBQy9ELEtBQUssQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQztnQkFDcEIsS0FBSyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDO2dCQUNwQix1REFBdUQ7Z0JBQ3ZELEdBQUcsQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLENBQUM7Z0JBQy9DLHVGQUF1RjtnQkFDdkYsS0FBSyxDQUFDLFNBQVMsR0FBRyxVQUFVLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDO2FBQ2pEO2lCQUFNO2dCQUNMLGVBQWU7Z0JBQ2YsbUNBQW1DO2dCQUNuQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVE7b0JBQUUsT0FBTztnQkFDNUIsbUNBQW1DO2dCQUNuQyxHQUFHLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUMsQ0FBQztnQkFDMUIsMEZBQTBGO2dCQUMxRixLQUFLLEdBQUcsRUFBRSxDQUFDO2dCQUNYLE9BQU8sRUFBRSxDQUFDO2FBQ1g7UUFDSCxDQUFDLENBQUM7UUFFRixHQUFHLENBQUMsRUFBRSxDQUFDLFdBQVcsRUFBRSxXQUFXLENBQUMsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLFdBQVcsQ0FBQyxDQUFDO0lBQ2pFLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qIEJhc2VkIG9uOiAqL1xuLyohXG4gKiBob3ZlckludGVudCB2MS4xMC4wIC8vIDIwMTkuMDIuMjUgLy8galF1ZXJ5IHYxLjcuMCtcbiAqIGh0dHA6Ly9icmlhbmNoZXJuZS5naXRodWIuaW8vanF1ZXJ5LWhvdmVySW50ZW50L1xuICpcbiAqIFlvdSBtYXkgdXNlIGhvdmVySW50ZW50IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgTUlUIGxpY2Vuc2UuIEJhc2ljYWxseSB0aGF0XG4gKiBtZWFucyB5b3UgYXJlIGZyZWUgdG8gdXNlIGhvdmVySW50ZW50IGFzIGxvbmcgYXMgdGhpcyBoZWFkZXIgaXMgbGVmdCBpbnRhY3QuXG4gKiBDb3B5cmlnaHQgMjAwNy0yMDE5IEJyaWFuIENoZXJuZVxuICovXG5cbnR5cGUgU3RhdGUgPSB7XG4gIHRpbWVvdXRJZD86IFRpbWVvdXQgfCB2b2lkO1xuICBpc0FjdGl2ZT86IGJvb2xlYW47XG4gIHBYPzogbnVtYmVyO1xuICBwWT86IG51bWJlcjtcbiAgZXZlbnQ/OiBzdHJpbmc7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoKSB7XG4gIGlmICgnb250b3VjaHN0YXJ0JyBpbiB3aW5kb3cpIHJldHVybjtcblxuICBjb25zdCBpbnRlcnZhbCA9IDIwMCxcbiAgICBzZW5zaXRpdml0eSA9IDg7XG5cbiAgLy8gY3VycmVudCBYIGFuZCBZIHBvc2l0aW9uIG9mIG1vdXNlLCB1cGRhdGVkIGR1cmluZyBtb3VzZW1vdmUgdHJhY2tpbmcgKHNoYXJlZCBhY3Jvc3MgaW5zdGFuY2VzKVxuICBsZXQgY1g6IG51bWJlciwgY1k6IG51bWJlcjtcblxuICAvLyBzYXZlcyB0aGUgY3VycmVudCBwb2ludGVyIHBvc2l0aW9uIGNvb3JkaW5hdGVzIGJhc2VkIG9uIHRoZSBnaXZlbiBtb3VzZW1vdmUgZXZlbnRcbiAgY29uc3QgdHJhY2sgPSAoZXY6IE1vdXNlRXZlbnQpID0+IHtcbiAgICBjWCA9IGV2LnBhZ2VYO1xuICAgIGNZID0gZXYucGFnZVk7XG4gIH07XG5cbiAgLy8gc3RhdGUgcHJvcGVydGllczpcbiAgLy8gdGltZW91dElkID0gdGltZW91dCBJRCwgcmV1c2VkIGZvciB0cmFja2luZyBtb3VzZSBwb3NpdGlvbiBhbmQgZGVsYXlpbmcgXCJvdXRcIiBoYW5kbGVyXG4gIC8vIGlzQWN0aXZlID0gcGx1Z2luIHN0YXRlLCB0cnVlIGFmdGVyIGBvdmVyYCBpcyBjYWxsZWQganVzdCB1bnRpbCBgb3V0YCBpcyBjYWxsZWRcbiAgLy8gcFgsIHBZID0gcHJldmlvdXNseS1tZWFzdXJlZCBwb2ludGVyIGNvb3JkaW5hdGVzLCB1cGRhdGVkIGF0IGVhY2ggcG9sbGluZyBpbnRlcnZhbFxuICAvLyBldmVudCA9IHN0cmluZyByZXByZXNlbnRpbmcgdGhlIG5hbWVzcGFjZWQgZXZlbnQgdXNlZCBmb3IgbW91c2UgdHJhY2tpbmdcbiAgbGV0IHN0YXRlOiBTdGF0ZSA9IHt9O1xuXG4gICQoJyN0b3BuYXYuaG92ZXInKS5lYWNoKGZ1bmN0aW9uICh0aGlzOiBIVE1MRWxlbWVudCkge1xuICAgIGNvbnN0ICRlbCA9ICQodGhpcykucmVtb3ZlQ2xhc3MoJ2hvdmVyJyksXG4gICAgICBoYW5kbGVyID0gKCkgPT4gJGVsLnRvZ2dsZUNsYXNzKCdob3ZlcicpO1xuXG4gICAgLy8gY29tcGFyZXMgY3VycmVudCBhbmQgcHJldmlvdXMgbW91c2UgcG9zaXRpb25zXG4gICAgY29uc3QgY29tcGFyZSA9ICgpID0+IHtcbiAgICAgIC8vIGNvbXBhcmUgbW91c2UgcG9zaXRpb25zIHRvIHNlZSBpZiBwb2ludGVyIGhhcyBzbG93ZWQgZW5vdWdoIHRvIHRyaWdnZXIgYG92ZXJgIGZ1bmN0aW9uXG4gICAgICBpZiAoTWF0aC5zcXJ0KChzdGF0ZS5wWCEgLSBjWCkgKiAoc3RhdGUucFghIC0gY1gpICsgKHN0YXRlLnBZISAtIGNZKSAqIChzdGF0ZS5wWSEgLSBjWSkpIDwgc2Vuc2l0aXZpdHkpIHtcbiAgICAgICAgJGVsLm9mZihzdGF0ZS5ldmVudCEsIHRyYWNrKTtcbiAgICAgICAgZGVsZXRlIHN0YXRlLnRpbWVvdXRJZDtcbiAgICAgICAgLy8gc2V0IGhvdmVySW50ZW50IHN0YXRlIGFzIGFjdGl2ZSBmb3IgdGhpcyBlbGVtZW50IChwZXJtaXRzIGBvdXRgIGhhbmRsZXIgdG8gdHJpZ2dlcilcbiAgICAgICAgc3RhdGUuaXNBY3RpdmUgPSB0cnVlO1xuICAgICAgICBoYW5kbGVyKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBzZXQgcHJldmlvdXMgY29vcmRpbmF0ZXMgZm9yIG5leHQgY29tcGFyaXNvblxuICAgICAgICBzdGF0ZS5wWCA9IGNYO1xuICAgICAgICBzdGF0ZS5wWSA9IGNZO1xuICAgICAgICAvLyB1c2Ugc2VsZi1jYWxsaW5nIHRpbWVvdXQsIGd1YXJhbnRlZXMgaW50ZXJ2YWxzIGFyZSBzcGFjZWQgb3V0IHByb3Blcmx5IChhdm9pZHMgSmF2YVNjcmlwdCB0aW1lciBidWdzKVxuICAgICAgICBzdGF0ZS50aW1lb3V0SWQgPSBzZXRUaW1lb3V0KGNvbXBhcmUsIGludGVydmFsKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgLy8gQSBwcml2YXRlIGZ1bmN0aW9uIGZvciBoYW5kbGluZyBtb3VzZSAnaG92ZXJpbmcnXG4gICAgY29uc3QgaGFuZGxlSG92ZXIgPSBmdW5jdGlvbiAoZXY6IE1vdXNlRXZlbnQpIHtcbiAgICAgIC8vIGNsZWFyIGFueSBleGlzdGluZyB0aW1lb3V0XG4gICAgICBpZiAoc3RhdGUudGltZW91dElkKSBzdGF0ZS50aW1lb3V0SWQgPSBjbGVhclRpbWVvdXQoc3RhdGUudGltZW91dElkKTtcblxuICAgICAgLy8gbmFtZXNwYWNlZCBldmVudCB1c2VkIHRvIHJlZ2lzdGVyIGFuZCB1bnJlZ2lzdGVyIG1vdXNlbW92ZSB0cmFja2luZ1xuICAgICAgY29uc3QgbW91c2Vtb3ZlID0gKHN0YXRlLmV2ZW50ID0gJ21vdXNlbW92ZScpO1xuXG4gICAgICAvLyBoYW5kbGUgdGhlIGV2ZW50LCBiYXNlZCBvbiBpdHMgdHlwZVxuICAgICAgaWYgKGV2LnR5cGUgPT0gJ21vdXNlb3ZlcicpIHtcbiAgICAgICAgLy8gZG8gbm90aGluZyBpZiBhbHJlYWR5IGFjdGl2ZSBvciBhIGJ1dHRvbiBpcyBwcmVzc2VkIChkcmFnZ2luZyBhIHBpZWNlKVxuICAgICAgICBpZiAoc3RhdGUuaXNBY3RpdmUgfHwgZXYuYnV0dG9ucykgcmV0dXJuO1xuICAgICAgICAvLyBzZXQgXCJwcmV2aW91c1wiIFggYW5kIFkgcG9zaXRpb24gYmFzZWQgb24gaW5pdGlhbCBlbnRyeSBwb2ludFxuICAgICAgICBzdGF0ZS5wWCA9IGV2LnBhZ2VYO1xuICAgICAgICBzdGF0ZS5wWSA9IGV2LnBhZ2VZO1xuICAgICAgICAvLyB1cGRhdGUgXCJjdXJyZW50XCIgWCBhbmQgWSBwb3NpdGlvbiBiYXNlZCBvbiBtb3VzZW1vdmVcbiAgICAgICAgJGVsLm9mZihtb3VzZW1vdmUsIHRyYWNrKS5vbihtb3VzZW1vdmUsIHRyYWNrKTtcbiAgICAgICAgLy8gc3RhcnQgcG9sbGluZyBpbnRlcnZhbCAoc2VsZi1jYWxsaW5nIHRpbWVvdXQpIHRvIGNvbXBhcmUgbW91c2UgY29vcmRpbmF0ZXMgb3ZlciB0aW1lXG4gICAgICAgIHN0YXRlLnRpbWVvdXRJZCA9IHNldFRpbWVvdXQoY29tcGFyZSwgaW50ZXJ2YWwpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gXCJtb3VzZWxlYXZlXCJcbiAgICAgICAgLy8gZG8gbm90aGluZyBpZiBub3QgYWxyZWFkeSBhY3RpdmVcbiAgICAgICAgaWYgKCFzdGF0ZS5pc0FjdGl2ZSkgcmV0dXJuO1xuICAgICAgICAvLyB1bmJpbmQgZXhwZW5zaXZlIG1vdXNlbW92ZSBldmVudFxuICAgICAgICAkZWwub2ZmKG1vdXNlbW92ZSwgdHJhY2spO1xuICAgICAgICAvLyBpZiBob3ZlckludGVudCBzdGF0ZSBpcyB0cnVlLCB0aGVuIGNhbGwgdGhlIG1vdXNlT3V0IGZ1bmN0aW9uIGFmdGVyIHRoZSBzcGVjaWZpZWQgZGVsYXlcbiAgICAgICAgc3RhdGUgPSB7fTtcbiAgICAgICAgaGFuZGxlcigpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICAkZWwub24oJ21vdXNlb3ZlcicsIGhhbmRsZUhvdmVyKS5vbignbW91c2VsZWF2ZScsIGhhbmRsZUhvdmVyKTtcbiAgfSk7XG59XG4iXX0=