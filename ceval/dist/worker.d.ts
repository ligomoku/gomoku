/// <reference types="web" />
/// <reference types="lichess" />
import { Work, Redraw } from './types';
import { Cache } from './cache';
export declare enum CevalState {
    Initial = 0,
    Loading = 1,
    Idle = 2,
    Computing = 3,
    Failed = 4
}
export interface CevalWorker {
    getState(): CevalState;
    start(work: Work): void;
    stop(): void;
    engineName(): string | undefined;
    destroy(): void;
}
export interface WebWorkerOpts {
    url: string;
}
export declare class WebWorker implements CevalWorker {
    private opts;
    private redraw;
    private failed;
    private protocol;
    private worker;
    constructor(opts: WebWorkerOpts, redraw: Redraw);
    getState(): CevalState;
    start(work: Work): void;
    stop(): void;
    engineName(): string | undefined;
    destroy(): void;
}
export interface ThreadedWasmWorkerOpts {
    baseUrl: string;
    module: 'Stockfish' | 'StockfishMv';
    version: string;
    downloadProgress?: (mb: number) => void;
    wasmMemory: WebAssembly.Memory;
    cache?: Cache;
}
interface WasmStockfishModule {
    (opts: {
        wasmBinary?: ArrayBuffer;
        locateFile(path: string): string;
        wasmMemory: WebAssembly.Memory;
    }): Promise<Stockfish>;
}
interface Stockfish {
    addMessageListener(cb: (msg: string) => void): void;
    postMessage(msg: string): void;
}
declare global {
    interface Window {
        Stockfish?: WasmStockfishModule;
        StockfishMv?: WasmStockfishModule;
    }
}
export declare class ThreadedWasmWorker implements CevalWorker {
    private opts;
    private redraw;
    private static failed;
    private static protocols;
    private static sf;
    constructor(opts: ThreadedWasmWorkerOpts, redraw: Redraw);
    getState(): CevalState;
    private getProtocol;
    private boot;
    start(work: Work): void;
    stop(): void;
    engineName(): string | undefined;
    destroy(): void;
}
export interface ExternalEngine {
    id: string;
    name: string;
    variants: VariantKey[];
    maxThreads: number;
    maxHash: number;
    defaultDepth: number;
    clientSecret: string;
    officialStockfish?: boolean;
    endpoint: string;
}
export declare class ExternalWorker implements CevalWorker {
    private opts;
    private redraw;
    private state;
    private sessionId;
    private req;
    constructor(opts: ExternalEngine, redraw: Redraw);
    getState(): CevalState;
    start(work: Work): void;
    private analyse;
    stop(): void;
    engineName(): string;
    destroy(): void;
}
export {};
