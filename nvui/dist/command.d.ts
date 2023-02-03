import { Style } from './chess';
import { Pieces } from 'chessground/types';
export declare const commands: {
    piece: {
        help: string;
        apply(c: string, pieces: Pieces, style: Style): string | undefined;
    };
    scan: {
        help: string;
        apply(c: string, pieces: Pieces, style: Style): string | undefined;
    };
};
