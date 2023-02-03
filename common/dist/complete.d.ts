/// <reference types="web" />
type Fetch<Result> = (term: string) => Promise<Result[]>;
interface Opts<Result> {
    input: HTMLInputElement;
    fetch: Fetch<Result>;
    render: (result: Result) => string;
    populate: (result: Result) => string;
    onSelect?: (result: Result) => void;
    empty?: () => string;
    minLength?: number;
    regex?: RegExp;
}
export default function <Result>(opts: Opts<Result>): void;
export {};
