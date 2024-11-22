import { SwaggerTypes } from '@gomoku/api';
export interface GameTimeProps {
    moves: string[];
    clock: SwaggerTypes.GetGameHistoryResponse["clock"];
    players: SwaggerTypes.GetGameHistoryResponse["players"];
    onUndo: () => void;
    onSkip: (direction: "back" | "forward") => void;
    onFlag: () => void;
    onReset: () => void;
    onRematch: () => void;
}
export declare const GameTime: ({ moves, clock, players, onUndo, onSkip, onFlag, onReset, onRematch, }: GameTimeProps) => import("react/jsx-runtime").JSX.Element;
export declare const secondsToString: (seconds: number) => string;
//# sourceMappingURL=GameTime.d.ts.map