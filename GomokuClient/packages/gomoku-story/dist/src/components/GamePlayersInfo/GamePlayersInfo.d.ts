export interface PlayerInfo {
  title: string;
  name: string;
  rating: number;
  isCurrentPlayer: boolean;
  color: string;
}
export interface GamePlayersInfoProps {
  gameType: string;
  players: PlayerInfo[];
}
export declare const GamePlayersInfo: ({
  gameType,
  players,
}: GamePlayersInfoProps) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=GamePlayersInfo.d.ts.map
