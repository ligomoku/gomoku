/// <reference types="web" />
import { VNode } from 'snabbdom';
import { ModerationCtrl, ModerationOpts, Ctrl } from './interfaces';
export declare function moderationCtrl(opts: ModerationOpts): ModerationCtrl;
export declare function report(ctrl: Ctrl, line: HTMLElement): void;
export declare const lineAction: () => VNode;
export declare function moderationView(ctrl?: ModerationCtrl): VNode[] | undefined;
