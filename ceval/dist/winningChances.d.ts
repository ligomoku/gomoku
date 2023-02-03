/// <reference types="lichess" />
import { Eval } from './types';
export declare const povChances: (color: Color, ev: Eval) => number;
export declare const povDiff: (color: Color, e1: Eval, e2: Eval) => number;
