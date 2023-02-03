/// <reference types="web" />
export type ProcessLine<T> = (line: T) => void;
export declare const readNdJson: <T>(response: Response, processLine: ProcessLine<T>) => Promise<void>;
