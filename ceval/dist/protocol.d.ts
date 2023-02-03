import { Work } from './types';
export declare class Protocol {
    engineName: string | undefined;
    private work;
    private currentEval;
    private expectedPvs;
    private nextWork;
    private send;
    private options;
    connected(send: (cmd: string) => void): void;
    private setOption;
    disconnected(): void;
    received(command: string): void;
    private stop;
    private swapWork;
    compute(nextWork: Work | undefined): void;
    isComputing(): boolean;
}
