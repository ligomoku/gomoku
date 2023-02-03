export interface StoredProp<V> {
    (replacement?: V): V;
}
export declare function storedProp<V>(k: string, defaultValue: V, fromStr: (str: string) => V, toStr: (v: V) => string): StoredProp<V>;
export declare const storedStringProp: (k: string, defaultValue: string) => StoredProp<string>;
export declare const storedBooleanProp: (k: string, defaultValue: boolean) => StoredProp<boolean>;
export declare const storedIntProp: (k: string, defaultValue: number) => StoredProp<number>;
export interface StoredJsonProp<V> {
    (): V;
    (v: V): V;
}
export declare const storedJsonProp: <V>(key: string, defaultValue: () => V) => StoredJsonProp<V>;
export interface StoredMap<V> {
    (key: string): V;
    (key: string, value: V): void;
}
export declare const storedMap: <V>(propKey: string, maxSize: number, defaultValue: () => V) => StoredMap<V>;
export interface StoredSet<V> {
    (): Set<V>;
    (value: V): Set<V>;
}
export declare const storedSet: <V>(propKey: string, maxSize: number) => StoredSet<V>;
