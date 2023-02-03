/// <reference types="lichess" />
import { VNode } from 'snabbdom';
export interface Setting<A> {
    choices: Choices<A>;
    get(): A;
    set(v: A): A;
}
type Choice<A> = [A, string];
type Choices<A> = Array<Choice<A>>;
interface Opts<A> {
    choices: Choices<A>;
    default: A;
    storage: LichessStorage;
}
export declare function makeSetting<A>(opts: Opts<A>): Setting<A>;
export declare function renderSetting<A>(setting: Setting<A>, redraw: () => void): VNode;
export {};
