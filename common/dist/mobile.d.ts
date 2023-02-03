/// <reference types="web" />
export declare function bindMobileTapHold(el: HTMLElement, f: (e: Event) => unknown, redraw?: () => void): void;
export declare function bindMobileMousedown(el: HTMLElement, f: (e: Event) => unknown, redraw?: () => void): void;
export declare function hookMobileMousedown(f: (e: Event) => any): import("snabbdom").Hooks;
export declare const isMobile: () => boolean;
export declare const isAndroid: () => boolean;
export declare const isIOS: () => boolean;
export declare const isIPad: () => boolean;
export declare const isTouchDevice: () => boolean;
