import { TileColor } from '../../hooks';
import { SignalClientMessages, SwaggerTypes } from '@gomoku/api';
import { CSSProperties } from 'react';
export interface TileProps {
    xIndex: SignalClientMessages.MakeMoveClientMessage["x"];
    yIndex: SignalClientMessages.MakeMoveClientMessage["y"];
    col: TileColor;
    lastTile?: SwaggerTypes.TileDto;
    onTileClick: (x: SignalClientMessages.MakeMoveClientMessage["x"], y: SignalClientMessages.MakeMoveClientMessage["y"]) => void;
    showAnnotations: boolean;
    winningSequence?: SwaggerTypes.GetGameHistoryResponse["winningSequence"];
}
export interface BoardProps {
    size: number;
    onTileClick: Pick<TileProps, "onTileClick">["onTileClick"];
    tiles: TileColor[][];
    lastTile?: SwaggerTypes.TileDto;
    style?: CSSProperties;
    winningSequence?: SwaggerTypes.GetGameHistoryResponse["winningSequence"];
}
export declare const Board: ({ size, onTileClick, tiles, lastTile, style, winningSequence, }: BoardProps) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=Board.d.ts.map