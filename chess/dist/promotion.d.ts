/// <reference types="lichess" />
import * as Prefs from 'common/prefs';
import { MaybeVNode } from 'common/snabbdom';
import { Api as CgApi } from 'chessground/api';
import * as cg from 'chessground/types';
export type Callback = (orig: Key, dest: Key, role: cg.Role) => void;
export declare function promote(g: CgApi, key: Key, role: cg.Role): void;
export declare class PromotionCtrl {
    private withGround;
    private onCancel;
    private redraw;
    private autoQueenPref;
    private promoting?;
    private prePromotionRole?;
    constructor(withGround: <A>(f: (cg: CgApi) => A) => A | false | undefined, onCancel: () => void, redraw: () => void, autoQueenPref?: Prefs.AutoQueen);
    start: (orig: Key, dest: Key, callback: Callback, meta?: cg.MoveMetadata, forceAutoQueen?: boolean) => boolean;
    cancel: () => void;
    cancelPrePromotion: () => void;
    view: (antichess?: boolean) => MaybeVNode;
    private finish;
    private doPromote;
    private setPrePromotion;
    private renderPromotion;
}
