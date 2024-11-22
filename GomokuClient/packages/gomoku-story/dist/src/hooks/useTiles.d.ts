import { Winner } from '../utils';
import { SwaggerTypes } from '@gomoku/api';
export type TileColor = "black" | "white" | null;
export declare const useTiles: (gameHistory: SwaggerTypes.GetGameHistoryResponse) => {
    tiles: TileColor[][];
    lastTile: SwaggerTypes.TileDto;
    winner: Winner;
    addTile: (tile: SwaggerTypes.TileDto, newValue: TileColor) => void;
    removeTile: (tileToRemove: SwaggerTypes.TileDto, previousPlacedTile: SwaggerTypes.TileDto) => void;
};
//# sourceMappingURL=useTiles.d.ts.map