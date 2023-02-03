import { Eval, ParentCtrl, NodeEvals } from './types';
import { VNode } from 'snabbdom';
export declare function getBestEval(evs: NodeEvals): Eval | undefined;
export declare function renderGauge(ctrl: ParentCtrl): VNode | undefined;
export declare function renderCeval(ctrl: ParentCtrl): VNode | undefined;
export declare function renderPvs(ctrl: ParentCtrl): VNode | undefined;
