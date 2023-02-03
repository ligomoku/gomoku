import { VNode } from 'snabbdom';
import { NoteCtrl, NoteOpts } from './interfaces';
export declare function noteCtrl(opts: NoteOpts): NoteCtrl;
export declare function noteView(ctrl: NoteCtrl, autofocus: boolean): VNode;
