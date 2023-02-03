export declare class Cache {
    private store;
    constructor(name: string);
    get(key: string, version: string): Promise<[boolean, any]>;
    set(key: string, version: string, data: any): Promise<void>;
}
