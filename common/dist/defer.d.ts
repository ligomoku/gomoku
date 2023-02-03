export interface Deferred<A> {
    promise: Promise<A>;
    resolve(a: A | PromiseLike<A>): void;
    reject(err: unknown): void;
}
export declare function defer<A>(): Deferred<A>;
