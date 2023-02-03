/// <reference types="lichess" />
/// <reference types="web" />
import { CevalTechnology } from './platform';
import { ExternalEngine } from './worker';
export declare function isEvalBetter(a: Tree.ClientEval, b: Tree.ClientEval): boolean;
export declare function renderEval(e: number): string;
export declare function sanIrreversible(variant: VariantKey, san: string): boolean;
export declare const pow2floor: (n: number) => number;
export declare const sharedWasmMemory: (initial: number, maximum: number) => WebAssembly.Memory;
export declare function defaultDepth(technology: CevalTechnology, threads: number, multiPv: number): number;
export declare function engineName(technology: CevalTechnology, externalEngine?: ExternalEngine): string;
