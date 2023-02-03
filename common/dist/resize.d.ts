/// <reference types="lichess" />
import * as cg from 'chessground/types';
import * as Prefs from './prefs';
type Visible = (ply: Ply) => boolean;
export default function resizeHandle(els: cg.Elements, pref: Prefs.ShowResizeHandle, ply: number, visible?: Visible): void;
export {};
