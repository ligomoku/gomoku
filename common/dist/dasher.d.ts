declare global {
    interface Lichess {
        dasher?: Promise<DasherCtrl>;
    }
}
interface DasherCtrl {
    subs: {
        background: {
            set(k: string): void;
        };
    };
}
export declare const loadDasher: () => Promise<DasherCtrl>;
export {};
