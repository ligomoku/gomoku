/// <reference types="lichess" />
import { CheckCount, CheckState, MaterialDiff } from './interfaces';
export declare function getMaterialDiff(fenLike: string): MaterialDiff;
export declare function getScore(diff: MaterialDiff): number;
export declare const NO_CHECKS: CheckCount;
export declare function countChecks(steps: CheckState[], ply: Ply): CheckCount;
