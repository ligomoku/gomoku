/// <reference types="lichess" />
/// <reference types="web" />
import { VNode } from 'snabbdom';
import { Pieces } from 'chessground/types';
import { Api } from 'chessground/api';
import { Setting } from './setting';
export type Style = 'uci' | 'san' | 'literate' | 'nato' | 'anna';
export type PieceStyle = 'letter' | 'white uppercase letter' | 'name' | 'white uppercase name';
export type PrefixStyle = 'letter' | 'name' | 'none';
export type PositionStyle = 'before' | 'after' | 'none';
export type BoardStyle = 'plain' | 'table';
interface RoundStep {
    uci: Uci;
}
export declare const namePiece: {
    [letter: string]: string;
};
export declare function symbolToFile(char: string): string;
export declare function supportedVariant(key: string): boolean;
export declare function boardSetting(): Setting<BoardStyle>;
export declare function styleSetting(): Setting<Style>;
export declare function pieceSetting(): Setting<PieceStyle>;
export declare function prefixSetting(): Setting<PrefixStyle>;
export declare function positionSetting(): Setting<PositionStyle>;
export declare function lastCaptured(movesGenerator: () => string[], pieceStyle: PieceStyle, prefixStyle: PrefixStyle): string;
export declare function renderSan(san: San, uci: Uci | undefined, style: Style): string;
export declare function renderPieces(pieces: Pieces, style: Style): VNode;
export declare function renderPieceKeys(pieces: Pieces, p: string, style: Style): string;
export declare function renderPiecesOn(pieces: Pieces, rankOrFile: string, style: Style): string;
export declare function renderBoard(pieces: Pieces, pov: Color, pieceStyle: PieceStyle, prefixStyle: PrefixStyle, positionStyle: PositionStyle, boardStyle: BoardStyle): VNode;
export declare const renderFile: (f: string, style: Style) => string;
export declare const renderKey: (key: string, style: Style) => string;
export declare function castlingFlavours(input: string): string;
export declare function positionJumpHandler(): (ev: KeyboardEvent) => boolean;
export declare function pieceJumpingHandler(wrapSound: () => void, errorSound: () => void): (ev: KeyboardEvent) => boolean;
export declare function arrowKeyHandler(pov: Color, borderSound: () => void): (ev: KeyboardEvent) => boolean;
export declare function selectionHandler(getOpponentColor: () => Color, selectSound: () => void): (ev: MouseEvent) => boolean;
export declare function boardCommandsHandler(): (ev: KeyboardEvent) => boolean;
export declare function lastCapturedCommandHandler(steps: () => string[], pieceStyle: PieceStyle, prefixStyle: PrefixStyle): (ev: KeyboardEvent) => boolean;
export declare function possibleMovesHandler(yourColor: Color, turnColor: () => Color, startingFen: () => string, piecesFunc: () => Pieces, variant: string, moveable: () => Map<string, Array<string>> | undefined, steps: () => RoundStep[]): (ev: KeyboardEvent) => boolean;
export declare function inputToLegalUci(input: string, fen: string, chessground: Api): string | undefined;
export declare function renderMainline(nodes: Tree.Node[], currentPath: Tree.Path, style: Style): (string | VNode)[];
export declare function renderComments(node: Tree.Node, style: Style): string;
export {};
