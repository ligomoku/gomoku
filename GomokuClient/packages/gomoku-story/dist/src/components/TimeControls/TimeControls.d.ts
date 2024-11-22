import { SwaggerTypes } from '@gomoku/api';
export interface GameType {
    timeLabel: string;
    type: string;
    boardSize: number;
    timeControl: SwaggerTypes.TimeControlDto;
}
export interface TimeControlsProps {
    gameTypes: GameType[];
    onCreateGame: (boardSize: number, timeControl?: SwaggerTypes.TimeControlDto) => void;
    isLoading: boolean;
}
export declare const TimeControls: {
    ({ gameTypes, onCreateGame, isLoading, }: TimeControlsProps): import("react/jsx-runtime").JSX.Element;
    displayName: string;
};
//# sourceMappingURL=TimeControls.d.ts.map