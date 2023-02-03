export interface Sync<T> {
    promise: Promise<T>;
    sync: T | undefined;
}
export declare function sync<T>(promise: Promise<T>): Sync<T>;
