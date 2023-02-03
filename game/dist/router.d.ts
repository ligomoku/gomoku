/// <reference types="lichess" />
import { GameData, ContinueMode } from './interfaces';
export declare function game(data: GameData, color?: Color, embed?: boolean): string;
export declare function game(data: string, color?: Color, embed?: boolean): string;
export declare function cont(data: GameData, mode: ContinueMode): string;
