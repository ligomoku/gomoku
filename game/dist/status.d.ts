import { GameData } from './interfaces';
export declare const ids: {
    created: number;
    started: number;
    aborted: number;
    mate: number;
    resign: number;
    stalemate: number;
    timeout: number;
    draw: number;
    outoftime: number;
    cheat: number;
    noStart: number;
    variantEnd: number;
};
export declare const started: (data: GameData) => boolean;
export declare const finished: (data: GameData) => boolean;
export declare const aborted: (data: GameData) => boolean;
export declare const playing: (data: GameData) => boolean;
