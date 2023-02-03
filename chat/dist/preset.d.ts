import { VNode } from 'snabbdom';
import { Redraw } from './interfaces';
export interface PresetCtrl {
    group(): string | undefined;
    said(): string[];
    setGroup(group: string | undefined): void;
    post(preset: Preset): void;
}
export type PresetKey = string;
export type PresetText = string;
export interface Preset {
    key: PresetKey;
    text: PresetText;
}
export interface PresetGroups {
    start: Preset[];
    end: Preset[];
    [key: string]: Preset[];
}
export interface PresetOpts {
    initialGroup?: string;
    redraw: Redraw;
    post(text: string): boolean;
}
export declare function presetCtrl(opts: PresetOpts): PresetCtrl;
export declare function presetView(ctrl: PresetCtrl): VNode | undefined;
