export default function debounce<T extends (...args: any) => void>(f: T, wait: number, immediate?: boolean): (...args: Parameters<T>) => void;
