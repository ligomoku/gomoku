/// <reference types="lichess" />
import { VNode } from 'snabbdom';
import { CheckState } from '../interfaces';
export declare function renderMaterialDiffs(showCaptured: boolean, bottomColor: Color, fen: Fen, showChecks: boolean, checkStates: CheckState[], ply: Ply): [VNode, VNode];
