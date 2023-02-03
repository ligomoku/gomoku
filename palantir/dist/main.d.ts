import type * as snabbdom from 'snabbdom';
interface PalantirOpts {
    uid: string;
    redraw(): void;
}
export interface Palantir {
    render(h: typeof snabbdom.h): any;
}
export declare function palantir(opts: PalantirOpts): Palantir | undefined;
export {};
