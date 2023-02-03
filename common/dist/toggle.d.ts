/// <reference types="lichess" />
export interface ToggleSettings {
    name: string;
    title?: string;
    id: string;
    checked: boolean;
    disabled?: boolean;
    change(v: boolean): void;
}
export declare function toggle(t: ToggleSettings, trans: Trans, redraw: () => void): import("snabbdom").VNode;
