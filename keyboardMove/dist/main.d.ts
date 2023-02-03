/// <reference types="lichess" />
import * as cg from 'chessground/types';
import { Api as CgApi } from 'chessground/api';
import { Prop } from 'common';
export type KeyboardMoveHandler = (fen: Fen, dests?: cg.Dests, yourMove?: boolean) => void;
interface ClockController {
    millisOf: (color: Color) => number;
}
export interface KeyboardMove {
    drop(key: cg.Key, piece: string): void;
    promote(orig: cg.Key, dest: cg.Key, piece: string): void;
    update(step: Step, yourMove?: boolean): void;
    registerHandler(h: KeyboardMoveHandler): void;
    isFocused: Prop<boolean>;
    san(orig: cg.Key, dest: cg.Key): void;
    select(key: cg.Key): void;
    hasSelected(): cg.Key | undefined;
    confirmMove(): void;
    usedSan: boolean;
    jump(delta: number): void;
    justSelected(): boolean;
    clock(): ClockController | undefined;
    draw(): void;
    next(): void;
    vote(v: boolean): void;
    resign(v: boolean, immediately?: boolean): void;
    helpModalOpen: Prop<boolean>;
}
interface CrazyPocket {
    [role: string]: number;
}
export interface RootData {
    crazyhouse?: {
        pockets: [CrazyPocket, CrazyPocket];
    };
    game: {
        variant: {
            key: VariantKey;
        };
    };
    player: {
        color: Color;
    };
}
export interface RootController {
    chessground: CgApi;
    clock?: ClockController;
    crazyValid?: (role: cg.Role, key: cg.Key) => boolean;
    data: RootData;
    offerDraw?: (v: boolean, immediately?: boolean) => void;
    resign?: (v: boolean, immediately?: boolean) => void;
    sendMove: (orig: cg.Key, dest: cg.Key, prom: cg.Role | undefined, meta?: cg.MoveMetadata) => void;
    sendNewPiece?: (role: cg.Role, key: cg.Key, isPredrop: boolean) => void;
    submitMove?: (v: boolean) => void;
    userJumpPlyDelta?: (plyDelta: Ply) => void;
    redraw: Redraw;
    next?: () => void;
    vote?: (v: boolean) => void;
}
interface Step {
    fen: string;
}
type Redraw = () => void;
export declare function ctrl(root: RootController, step: Step): KeyboardMove;
export declare function render(ctrl: KeyboardMove): import("snabbdom").VNode;
export {};
