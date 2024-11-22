import { BoardProps } from "..";
import { SwaggerTypes } from "@gomoku/api";
export interface GamePreviewProps {
  gen: SwaggerTypes.GetGameHistoryResponse["gen"];
  lastTile?: Pick<BoardProps, "lastTile">["lastTile"];
}
export declare const GamePreview: ({
  gen,
  lastTile,
}: GamePreviewProps) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=GamePreview.d.ts.map
