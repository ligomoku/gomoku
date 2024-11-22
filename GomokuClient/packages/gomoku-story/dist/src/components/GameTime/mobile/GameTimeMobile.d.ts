import { GameTimeProps } from "../..";
import { SwaggerTypes } from "@gomoku/api";
export interface GameTimeMobileProps
  extends Omit<
    GameTimeProps,
    "players" | "blackTimeLeft" | "whiteTimeLeft" | "clock"
  > {
  opponentView?: boolean;
  player?: SwaggerTypes.PlayerDto;
  timeLeft?: number;
}
export declare const GameTimeMobile: ({
  moves,
  player,
  onUndo,
  onSkip,
  onFlag,
  onReset,
  onRematch,
  timeLeft,
  opponentView,
}: GameTimeMobileProps) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=GameTimeMobile.d.ts.map
