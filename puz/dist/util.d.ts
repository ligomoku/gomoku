import { Puzzle } from './interfaces';
export declare const getNow: () => number;
export declare const puzzlePov: (puzzle: Puzzle) => "white" | "black";
export declare const loadSound: (file: string, volume?: number, delay?: number) => () => void;
export declare const sound: {
    move: (take: boolean) => void;
    good: () => void;
    wrong: () => void;
    end: () => void;
};
