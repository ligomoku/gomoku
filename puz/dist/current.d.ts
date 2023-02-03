/// <reference types="lichess" />
import { Chess } from 'chessops';
import { Puzzle } from './interfaces';
export default class CurrentPuzzle {
    readonly index: number;
    readonly puzzle: Puzzle;
    line: Uci[];
    startAt: number;
    moveIndex: number;
    pov: Color;
    constructor(index: number, puzzle: Puzzle);
    position: () => Chess;
    expectedMove: () => string;
    lastMove: () => string;
    isOver: () => boolean;
}
