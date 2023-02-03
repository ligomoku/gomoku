import { ExternalEngine } from './worker';
export type CevalTechnology = 'asmjs' | 'wasm' | 'hce' | 'nnue' | 'external';
export interface CevalPlatform {
    technology: CevalTechnology;
    growableSharedMem: boolean;
    supportsNnue: boolean;
    maxThreads: number;
    maxWasmPages: (minPages: number) => number;
    maxHashSize: () => number;
}
export declare function detectPlatform(officialStockfish: boolean, enableNnue: boolean, externalEngine?: ExternalEngine): CevalPlatform;
