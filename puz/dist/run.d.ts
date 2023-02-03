import { Run } from './interfaces';
import { Config as CgConfig } from 'chessground/config';
export declare const makeCgOpts: (run: Run, canMove: boolean, flipped: boolean) => CgConfig;
export declare const povMessage: (run: Run) => string;
