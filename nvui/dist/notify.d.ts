type Notification = {
    text: string;
    date: Date;
};
export declare class Notify {
    readonly redraw: () => void;
    readonly timeout: number;
    notification: Notification | undefined;
    constructor(redraw: () => void, timeout?: number);
    set: (msg: string) => void;
    currentText: () => string;
    render: () => import("snabbdom").VNode;
}
export {};
