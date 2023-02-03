export declare const Coords: {
    Hidden: number;
    Inside: number;
    Outside: number;
};
export type Coords = typeof Coords[keyof typeof Coords];
export declare const AutoQueen: {
    Never: number;
    OnPremove: number;
    Always: number;
};
export type AutoQueen = typeof AutoQueen[keyof typeof AutoQueen];
export declare const ShowClockTenths: {
    Never: number;
    Below10Secs: number;
    Always: number;
};
export type ShowClockTenths = typeof ShowClockTenths[keyof typeof ShowClockTenths];
export declare const ShowResizeHandle: {
    Never: number;
    OnlyAtStart: number;
    Always: number;
};
export type ShowResizeHandle = typeof ShowResizeHandle[keyof typeof ShowResizeHandle];
export declare const MoveEvent: {
    Click: number;
    Drag: number;
    ClickOrDrag: number;
};
export type MoveEvent = typeof MoveEvent[keyof typeof MoveEvent];
export declare const Replay: {
    Never: number;
    OnlySlowGames: number;
    Always: number;
};
export type Replay = typeof Replay[keyof typeof Replay];
