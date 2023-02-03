/// <reference types="lichess" />
export type SanToUci = {
    [key: string]: Uci;
};
export declare function sanWriter(fen: string, ucis: string[]): SanToUci;
