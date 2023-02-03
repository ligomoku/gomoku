let numberFormatter = false;
export const numberFormat = (n) => {
    if (numberFormatter === false)
        numberFormatter = window.Intl && Intl.NumberFormat ? new Intl.NumberFormat() : null;
    if (numberFormatter === null)
        return '' + n;
    return numberFormatter.format(n);
};
export const numberSpread = (el, nbSteps, duration, previous) => {
    let displayed;
    const display = (prev, cur, it) => {
        const val = numberFormat(Math.round((prev * (nbSteps - 1 - it) + cur * (it + 1)) / nbSteps));
        if (val !== displayed) {
            el.textContent = val;
            displayed = val;
        }
    };
    let timeouts = [];
    return (nb, overrideNbSteps) => {
        if (!el || (!nb && nb !== 0))
            return;
        if (overrideNbSteps)
            nbSteps = Math.abs(overrideNbSteps);
        timeouts.forEach(clearTimeout);
        timeouts = [];
        const prev = previous === 0 ? 0 : previous || nb;
        previous = nb;
        const interv = Math.abs(duration / nbSteps);
        for (let i = 0; i < nbSteps; i++)
            timeouts.push(setTimeout(display.bind(null, prev, nb, i), Math.round(i * interv)));
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnVtYmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL251bWJlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLGVBQWUsR0FBcUMsS0FBSyxDQUFDO0FBRTlELE1BQU0sQ0FBQyxNQUFNLFlBQVksR0FBRyxDQUFDLENBQVMsRUFBRSxFQUFFO0lBQ3hDLElBQUksZUFBZSxLQUFLLEtBQUs7UUFBRSxlQUFlLEdBQUcsTUFBTSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0lBQ25ILElBQUksZUFBZSxLQUFLLElBQUk7UUFBRSxPQUFPLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDNUMsT0FBTyxlQUFlLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ25DLENBQUMsQ0FBQztBQUVGLE1BQU0sQ0FBQyxNQUFNLFlBQVksR0FBRyxDQUFDLEVBQWUsRUFBRSxPQUFlLEVBQUUsUUFBZ0IsRUFBRSxRQUFnQixFQUFFLEVBQUU7SUFDbkcsSUFBSSxTQUFpQixDQUFDO0lBQ3RCLE1BQU0sT0FBTyxHQUFHLENBQUMsSUFBWSxFQUFFLEdBQVcsRUFBRSxFQUFVLEVBQUUsRUFBRTtRQUN4RCxNQUFNLEdBQUcsR0FBRyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksR0FBRyxDQUFDLE9BQU8sR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUM3RixJQUFJLEdBQUcsS0FBSyxTQUFTLEVBQUU7WUFDckIsRUFBRSxDQUFDLFdBQVcsR0FBRyxHQUFHLENBQUM7WUFDckIsU0FBUyxHQUFHLEdBQUcsQ0FBQztTQUNqQjtJQUNILENBQUMsQ0FBQztJQUNGLElBQUksUUFBUSxHQUFjLEVBQUUsQ0FBQztJQUM3QixPQUFPLENBQUMsRUFBVSxFQUFFLGVBQXdCLEVBQUUsRUFBRTtRQUM5QyxJQUFJLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztZQUFFLE9BQU87UUFDckMsSUFBSSxlQUFlO1lBQUUsT0FBTyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDekQsUUFBUSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUMvQixRQUFRLEdBQUcsRUFBRSxDQUFDO1FBQ2QsTUFBTSxJQUFJLEdBQUcsUUFBUSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLElBQUksRUFBRSxDQUFDO1FBQ2pELFFBQVEsR0FBRyxFQUFFLENBQUM7UUFDZCxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUMsQ0FBQztRQUM1QyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsT0FBTyxFQUFFLENBQUMsRUFBRTtZQUM5QixRQUFRLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN2RixDQUFDLENBQUM7QUFDSixDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJsZXQgbnVtYmVyRm9ybWF0dGVyOiBmYWxzZSB8IEludGwuTnVtYmVyRm9ybWF0IHwgbnVsbCA9IGZhbHNlO1xuXG5leHBvcnQgY29uc3QgbnVtYmVyRm9ybWF0ID0gKG46IG51bWJlcikgPT4ge1xuICBpZiAobnVtYmVyRm9ybWF0dGVyID09PSBmYWxzZSkgbnVtYmVyRm9ybWF0dGVyID0gd2luZG93LkludGwgJiYgSW50bC5OdW1iZXJGb3JtYXQgPyBuZXcgSW50bC5OdW1iZXJGb3JtYXQoKSA6IG51bGw7XG4gIGlmIChudW1iZXJGb3JtYXR0ZXIgPT09IG51bGwpIHJldHVybiAnJyArIG47XG4gIHJldHVybiBudW1iZXJGb3JtYXR0ZXIuZm9ybWF0KG4pO1xufTtcblxuZXhwb3J0IGNvbnN0IG51bWJlclNwcmVhZCA9IChlbDogSFRNTEVsZW1lbnQsIG5iU3RlcHM6IG51bWJlciwgZHVyYXRpb246IG51bWJlciwgcHJldmlvdXM6IG51bWJlcikgPT4ge1xuICBsZXQgZGlzcGxheWVkOiBzdHJpbmc7XG4gIGNvbnN0IGRpc3BsYXkgPSAocHJldjogbnVtYmVyLCBjdXI6IG51bWJlciwgaXQ6IG51bWJlcikgPT4ge1xuICAgIGNvbnN0IHZhbCA9IG51bWJlckZvcm1hdChNYXRoLnJvdW5kKChwcmV2ICogKG5iU3RlcHMgLSAxIC0gaXQpICsgY3VyICogKGl0ICsgMSkpIC8gbmJTdGVwcykpO1xuICAgIGlmICh2YWwgIT09IGRpc3BsYXllZCkge1xuICAgICAgZWwudGV4dENvbnRlbnQgPSB2YWw7XG4gICAgICBkaXNwbGF5ZWQgPSB2YWw7XG4gICAgfVxuICB9O1xuICBsZXQgdGltZW91dHM6IFRpbWVvdXRbXSA9IFtdO1xuICByZXR1cm4gKG5iOiBudW1iZXIsIG92ZXJyaWRlTmJTdGVwcz86IG51bWJlcikgPT4ge1xuICAgIGlmICghZWwgfHwgKCFuYiAmJiBuYiAhPT0gMCkpIHJldHVybjtcbiAgICBpZiAob3ZlcnJpZGVOYlN0ZXBzKSBuYlN0ZXBzID0gTWF0aC5hYnMob3ZlcnJpZGVOYlN0ZXBzKTtcbiAgICB0aW1lb3V0cy5mb3JFYWNoKGNsZWFyVGltZW91dCk7XG4gICAgdGltZW91dHMgPSBbXTtcbiAgICBjb25zdCBwcmV2ID0gcHJldmlvdXMgPT09IDAgPyAwIDogcHJldmlvdXMgfHwgbmI7XG4gICAgcHJldmlvdXMgPSBuYjtcbiAgICBjb25zdCBpbnRlcnYgPSBNYXRoLmFicyhkdXJhdGlvbiAvIG5iU3RlcHMpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbmJTdGVwczsgaSsrKVxuICAgICAgdGltZW91dHMucHVzaChzZXRUaW1lb3V0KGRpc3BsYXkuYmluZChudWxsLCBwcmV2LCBuYiwgaSksIE1hdGgucm91bmQoaSAqIGludGVydikpKTtcbiAgfTtcbn07XG4iXX0=