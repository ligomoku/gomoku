export interface ObjectStorage<V> {
    get(key: string): Promise<V>;
    put(key: string, value: V): Promise<string>;
    remove(key: string): Promise<void>;
    clear(): Promise<void>;
    list(): Promise<string[]>;
}
export declare function objectStorage<V>(storeName: string): Promise<ObjectStorage<V>>;
