import { SwaggerTypes } from "@gomoku/api";
import { ReactNode } from "react";
export interface GameCreatorProps {
  isOpen: boolean;
  onClose: () => void;
  timeControl?: SwaggerTypes.TimeControlDto;
  onCreate: (boardSize: number) => void;
  isLoading: boolean;
}
export declare const GameCreator: {
  ({
    isOpen,
    onClose,
    onCreate,
    isLoading,
  }: GameCreatorProps): import("react/jsx-runtime").JSX.Element;
  displayName: string;
};
export interface GameCreatorButtonProps {
  children: ReactNode;
  timeControl?: SwaggerTypes.TimeControlDto;
  onCreateGame: (
    boardSize: number,
    timeControl?: SwaggerTypes.TimeControlDto,
  ) => void;
  isLoading: boolean;
}
export declare const GameCreatorButton: ({
  children,
  timeControl,
  onCreateGame,
  isLoading,
}: GameCreatorButtonProps) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=GameCreator.d.ts.map
