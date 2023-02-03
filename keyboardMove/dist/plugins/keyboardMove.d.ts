/// <reference types="web" />
import { Dests } from 'chessground/types';
import { KeyboardMove } from '../main';
interface Opts {
    input: HTMLInputElement;
    ctrl: KeyboardMove;
}
declare const _default: (opts: Opts) => ((fen: string, dests: Dests | undefined, yourMove: boolean) => void) | undefined;
export default _default;
