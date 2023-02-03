import { defined } from './common';
const storage = lichess.storage;
export function storedProp(k, defaultValue, fromStr, toStr) {
    const sk = 'analyse.' + k; // historical blunder
    let cached;
    return function (replacement) {
        if (defined(replacement) && replacement != cached) {
            cached = replacement;
            storage.set(sk, toStr(replacement));
        }
        else if (!defined(cached)) {
            const str = storage.get(sk);
            cached = str === null ? defaultValue : fromStr(str);
        }
        return cached;
    };
}
export const storedStringProp = (k, defaultValue) => storedProp(k, defaultValue, str => str, v => v);
export const storedBooleanProp = (k, defaultValue) => storedProp(k, defaultValue, str => str === 'true', v => v.toString());
export const storedIntProp = (k, defaultValue) => storedProp(k, defaultValue, str => parseInt(str), v => v + '');
export const storedJsonProp = (key, defaultValue) => (v) => {
    if (defined(v)) {
        storage.set(key, JSON.stringify(v));
        return v;
    }
    const ret = JSON.parse(storage.get(key));
    return ret !== null ? ret : defaultValue();
};
export const storedMap = (propKey, maxSize, defaultValue) => {
    const prop = storedJsonProp(propKey, () => []);
    const map = new Map(prop());
    return (key, v) => {
        if (defined(v)) {
            map.delete(key); // update insertion order as old entries are culled
            map.set(key, v);
            prop(Array.from(map.entries()).slice(-maxSize));
        }
        const ret = map.get(key);
        return defined(ret) ? ret : defaultValue();
    };
};
export const storedSet = (propKey, maxSize) => {
    const prop = storedJsonProp(propKey, () => []);
    let set = new Set(prop());
    return (v) => {
        if (defined(v)) {
            set.add(v);
            set = new Set([...set].slice(-maxSize)); // sets maintain insertion order
            prop([...set]);
        }
        return set;
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmFnZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9zdG9yYWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFNbkMsTUFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQztBQUVoQyxNQUFNLFVBQVUsVUFBVSxDQUN4QixDQUFTLEVBQ1QsWUFBZSxFQUNmLE9BQTJCLEVBQzNCLEtBQXVCO0lBRXZCLE1BQU0sRUFBRSxHQUFHLFVBQVUsR0FBRyxDQUFDLENBQUMsQ0FBQyxxQkFBcUI7SUFDaEQsSUFBSSxNQUFTLENBQUM7SUFDZCxPQUFPLFVBQVUsV0FBZTtRQUM5QixJQUFJLE9BQU8sQ0FBQyxXQUFXLENBQUMsSUFBSSxXQUFXLElBQUksTUFBTSxFQUFFO1lBQ2pELE1BQU0sR0FBRyxXQUFXLENBQUM7WUFDckIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7U0FDckM7YUFBTSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQzNCLE1BQU0sR0FBRyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDNUIsTUFBTSxHQUFHLEdBQUcsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ3JEO1FBQ0QsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQyxDQUFDO0FBQ0osQ0FBQztBQUVELE1BQU0sQ0FBQyxNQUFNLGdCQUFnQixHQUFHLENBQUMsQ0FBUyxFQUFFLFlBQW9CLEVBQXNCLEVBQUUsQ0FDdEYsVUFBVSxDQUNSLENBQUMsRUFDRCxZQUFZLEVBQ1osR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQ1YsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQ1AsQ0FB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QU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxnQ0FBZ0M7WUFDekUsSUFBSSxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDO1NBQ2hCO1FBQ0QsT0FBTyxHQUFHLENBQUM7SUFDYixDQUFDLENBQUM7QUFDSixDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBkZWZpbmVkIH0gZnJvbSAnLi9jb21tb24nO1xuXG5leHBvcnQgaW50ZXJmYWNlIFN0b3JlZFByb3A8Vj4ge1xuICAocmVwbGFjZW1lbnQ/OiBWKTogVjtcbn1cblxuY29uc3Qgc3RvcmFnZSA9IGxpY2hlc3Muc3RvcmFnZTtcblxuZXhwb3J0IGZ1bmN0aW9uIHN0b3JlZFByb3A8Vj4oXG4gIGs6IHN0cmluZyxcbiAgZGVmYXVsdFZhbHVlOiBWLFxuICBmcm9tU3RyOiAoc3RyOiBzdHJpbmcpID0+IFYsXG4gIHRvU3RyOiAodjogVikgPT4gc3RyaW5nXG4pOiBTdG9yZWRQcm9wPFY+IHtcbiAgY29uc3Qgc2sgPSAnYW5hbHlzZS4nICsgazsgLy8gaGlzdG9yaWNhbCBibHVuZGVyXG4gIGxldCBjYWNoZWQ6IFY7XG4gIHJldHVybiBmdW5jdGlvbiAocmVwbGFjZW1lbnQ/OiBWKSB7XG4gICAgaWYgKGRlZmluZWQocmVwbGFjZW1lbnQpICYmIHJlcGxhY2VtZW50ICE9IGNhY2hlZCkge1xuICAgICAgY2FjaGVkID0gcmVwbGFjZW1lbnQ7XG4gICAgICBzdG9yYWdlLnNldChzaywgdG9TdHIocmVwbGFjZW1lbnQpKTtcbiAgICB9IGVsc2UgaWYgKCFkZWZpbmVkKGNhY2hlZCkpIHtcbiAgICAgIGNvbnN0IHN0ciA9IHN0b3JhZ2UuZ2V0KHNrKTtcbiAgICAgIGNhY2hlZCA9IHN0ciA9PT0gbnVsbCA/IGRlZmF1bHRWYWx1ZSA6IGZyb21TdHIoc3RyKTtcbiAgICB9XG4gICAgcmV0dXJuIGNhY2hlZDtcbiAgfTtcbn1cblxuZXhwb3J0IGNvbnN0IHN0b3JlZFN0cmluZ1Byb3AgPSAoazogc3RyaW5nLCBkZWZhdWx0VmFsdWU6IHN0cmluZyk6IFN0b3JlZFByb3A8c3RyaW5nPiA9PlxuICBzdG9yZWRQcm9wPHN0cmluZz4oXG4gICAgayxcbiAgICBkZWZhdWx0VmFsdWUsXG4gICAgc3RyID0+IHN0cixcbiAgICB2ID0+IHZcbiAgKTtcblxuZXhwb3J0IGNvbnN0IHN0b3JlZEJvb2xlYW5Qcm9wID0gKGs6IHN0cmluZywgZGVmYXVsdFZhbHVlOiBib29sZWFuKTogU3RvcmVkUHJvcDxib29sZWFuPiA9PlxuICBzdG9yZWRQcm9wPGJvb2xlYW4+KFxuICAgIGssXG4gICAgZGVmYXVsdFZhbHVlLFxuICAgIHN0ciA9PiBzdHIgPT09ICd0cnVlJyxcbiAgICB2ID0+IHYudG9TdHJpbmcoKVxuICApO1xuXG5leHBvcnQgY29uc3Qgc3RvcmVkSW50UHJvcCA9IChrOiBzdHJpbmcsIGRlZmF1bHRWYWx1ZTogbnVtYmVyKTogU3RvcmVkUHJvcDxudW1iZXI+ID0+XG4gIHN0b3JlZFByb3A8bnVtYmVyPihcbiAgICBrLFxuICAgIGRlZmF1bHRWYWx1ZSxcbiAgICBzdHIgPT4gcGFyc2VJbnQoc3RyKSxcbiAgICB2ID0+IHYgKyAnJ1xuICApO1xuXG5leHBvcnQgaW50ZXJmYWNlIFN0b3JlZEpzb25Qcm9wPFY+IHtcbiAgKCk6IFY7XG4gICh2OiBWKTogVjtcbn1cblxuZXhwb3J0IGNvbnN0IHN0b3JlZEpzb25Qcm9wID1cbiAgPFY+KGtleTogc3RyaW5nLCBkZWZhdWx0VmFsdWU6ICgpID0+IFYpOiBTdG9yZWRKc29uUHJvcDxWPiA9PlxuICAodj86IFYpID0+IHtcbiAgICBpZiAoZGVmaW5lZCh2KSkge1xuICAgICAgc3RvcmFnZS5zZXQoa2V5LCBKU09OLnN0cmluZ2lmeSh2KSk7XG4gICAgICByZXR1cm4gdjtcbiAgICB9XG4gICAgY29uc3QgcmV0ID0gSlNPTi5wYXJzZShzdG9yYWdlLmdldChrZXkpISk7XG4gICAgcmV0dXJuIHJldCAhPT0gbnVsbCA/IHJldCA6IGRlZmF1bHRWYWx1ZSgpO1xuICB9O1xuXG5leHBvcnQgaW50ZXJmYWNlIFN0b3JlZE1hcDxWPiB7XG4gIChrZXk6IHN0cmluZyk6IFY7XG4gIChrZXk6IHN0cmluZywgdmFsdWU6IFYpOiB2b2lkO1xufVxuXG5leHBvcnQgY29uc3Qgc3RvcmVkTWFwID0gPFY+KHByb3BLZXk6IHN0cmluZywgbWF4U2l6ZTogbnVtYmVyLCBkZWZhdWx0VmFsdWU6ICgpID0+IFYpOiBTdG9yZWRNYXA8Vj4gPT4ge1xuICBjb25zdCBwcm9wID0gc3RvcmVkSnNvblByb3A8W3N0cmluZywgVl1bXT4ocHJvcEtleSwgKCkgPT4gW10pO1xuICBjb25zdCBtYXAgPSBuZXcgTWFwPHN0cmluZywgVj4ocHJvcCgpKTtcbiAgcmV0dXJuIChrZXk6IHN0cmluZywgdj86IFYpID0+IHtcbiAgICBpZiAoZGVmaW5lZCh2KSkge1xuICAgICAgbWFwLmRlbGV0ZShrZXkpOyAvLyB1cGRhdGUgaW5zZXJ0aW9uIG9yZGVyIGFzIG9sZCBlbnRyaWVzIGFyZSBjdWxsZWRcbiAgICAgIG1hcC5zZXQoa2V5LCB2KTtcbiAgICAgIHByb3AoQXJyYXkuZnJvbShtYXAuZW50cmllcygpKS5zbGljZSgtbWF4U2l6ZSkpO1xuICAgIH1cbiAgICBjb25zdCByZXQgPSBtYXAuZ2V0KGtleSk7XG4gICAgcmV0dXJuIGRlZmluZWQocmV0KSA/IHJldCA6IGRlZmF1bHRWYWx1ZSgpO1xuICB9O1xufTtcblxuZXhwb3J0IGludGVyZmFjZSBTdG9yZWRTZXQ8Vj4ge1xuICAoKTogU2V0PFY+O1xuICAodmFsdWU6IFYpOiBTZXQ8Vj47XG59XG5cbmV4cG9ydCBjb25zdCBzdG9yZWRTZXQgPSA8Vj4ocHJvcEtleTogc3RyaW5nLCBtYXhTaXplOiBudW1iZXIpOiBTdG9yZWRTZXQ8Vj4gPT4ge1xuICBjb25zdCBwcm9wID0gc3RvcmVkSnNvblByb3A8VltdPihwcm9wS2V5LCAoKSA9PiBbXSk7XG4gIGxldCBzZXQgPSBuZXcgU2V0PFY+KHByb3AoKSk7XG4gIHJldHVybiAodj86IFYpID0+IHtcbiAgICBpZiAoZGVmaW5lZCh2KSkge1xuICAgICAgc2V0LmFkZCh2KTtcbiAgICAgIHNldCA9IG5ldyBTZXQoWy4uLnNldF0uc2xpY2UoLW1heFNpemUpKTsgLy8gc2V0cyBtYWludGFpbiBpbnNlcnRpb24gb3JkZXJcbiAgICAgIHByb3AoWy4uLnNldF0pO1xuICAgIH1cbiAgICByZXR1cm4gc2V0O1xuICB9O1xufTtcbiJdfQ==