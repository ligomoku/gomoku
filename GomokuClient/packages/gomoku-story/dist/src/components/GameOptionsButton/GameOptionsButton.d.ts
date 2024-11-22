import { SwaggerTypes } from "@gomoku/api";
export interface GameOptionsButtonsProps {
  onCreateGame: (
    boardSize: number,
    timeControl?: SwaggerTypes.TimeControlDto,
  ) => void;
  onPlayWithFriendClick?: () => void;
  onPlayWithAIClick?: () => void;
  createGameText: string;
  playWithFriendText: string;
  playWithAIText: string;
  isLoadingCreateGame: boolean;
  isLoadingPlayWithFriend?: boolean;
  isLoadingPlayWithAI?: boolean;
}
export declare const GameOptionsButtons: ({
  onCreateGame,
  onPlayWithFriendClick,
  onPlayWithAIClick,
  createGameText,
  playWithFriendText,
  playWithAIText,
  isLoadingCreateGame,
  isLoadingPlayWithFriend,
  isLoadingPlayWithAI,
}: GameOptionsButtonsProps) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=GameOptionsButton.d.ts.map
