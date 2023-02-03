/// <reference types="web" />
import { VNode, Hooks, Attrs } from 'snabbdom';
export type MaybeVNode = VNode | string | null | undefined;
export type MaybeVNodes = MaybeVNode[];
export declare function onInsert<A extends HTMLElement>(f: (element: A) => void): Hooks;
export declare function bind(eventName: string, f: (e: Event) => any, redraw?: () => void, passive?: boolean): Hooks;
export declare const bindNonPassive: (eventName: string, f: (e: Event) => any, redraw?: () => void) => Hooks;
export declare function bindSubmit(f: (e: Event) => unknown, redraw?: () => void): Hooks;
export declare const dataIcon: (icon: string) => Attrs;
export declare const iconTag: (icon: string) => VNode;
