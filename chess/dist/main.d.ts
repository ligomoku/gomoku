/// <reference types="lichess" />
export { type SanToUci, sanWriter } from './sanWriter';
export declare const initialFen: Fen;
export declare function fixCrazySan(san: San): San;
export type Dests = Map<Key, Key[]>;
export declare function readDests(lines?: string): Dests | null;
export declare function readDrops(line?: string | null): Key[] | null;
export declare const altCastles: {
    e1a1: string;
    e1h1: string;
    e8a8: string;
    e8h8: string;
};
