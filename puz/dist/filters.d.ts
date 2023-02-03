import { Redraw } from 'chessground/types';
import { Toggle } from 'common';
export declare class PuzFilters {
    fail: Toggle;
    slow: Toggle;
    skip?: Toggle;
    constructor(redraw: Redraw, skip: boolean);
}
