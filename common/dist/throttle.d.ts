/***
 * Wraps an asynchronous function to ensure only one call at a time is in
 * flight. Any extra calls are dropped, except the last one, which waits for
 * the previous call to complete.
 */
export declare function throttlePromise<T extends (...args: any) => Promise<any>>(wrapped: T): (...args: Parameters<T>) => void;
/**
 * Wraps an asynchronous function to return a promise that resolves
 * after completion plus a delay (regardless if the wrapped function resolves
 * or rejects).
 */
export declare function finallyDelay<T extends (...args: any) => Promise<any>>(delay: (...args: Parameters<T>) => number, wrapped: T): (...args: Parameters<T>) => Promise<void>;
/**
 * Wraps an asynchronous function to ensure only one call at a time is in flight. Any extra calls
 * are dropped, except the last one, which waits for the previous call to complete plus a delay.
 */
export declare function throttlePromiseDelay<T extends (...args: any) => Promise<any>>(delay: (...args: Parameters<T>) => number, wrapped: T): (...args: Parameters<T>) => void;
/**
 * Ensures calls to the wrapped function are spaced by the given delay.
 * Any extra calls are dropped, except the last one, which waits for the delay.
 */
export default function throttle<T extends (...args: any) => void>(delay: number, wrapped: T): (...args: Parameters<T>) => void;
