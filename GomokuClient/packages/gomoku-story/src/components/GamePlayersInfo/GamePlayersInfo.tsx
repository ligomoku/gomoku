import { useMobileDesign } from "@/hooks";

export interface PlayerInfo {
  title: string;
  name: string;
  rating?: number;
  isCurrentPlayer: boolean;
  color: string; // Color indicator (e.g., for online/offline status)
}

export interface GamePlayersInfoProps {
  gameType: string;
  players: PlayerInfo[];
}

export const GamePlayersInfo = ({
  gameType,
  players,
}: GamePlayersInfoProps) => {
  const isMobile = useMobileDesign(1488);
  return (
    <div
      className="max-w-xs rounded-lg bg-[#2b2b2b] p-3 text-white"
      style={{
        maxWidth: isMobile ? "100%" : "350px",
        minWidth: isMobile ? "100%" : "350px",
      }}
    >
      <div className="mb-2 flex items-center">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mr-2 h-5 w-5 text-[#b0b0b0]"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M4.93 4.93l4.24 4.24" />
        </svg>
        <span className="text-sm text-[#b0b0b0]">{gameType}</span>
      </div>
      <div className="space-y-2">
        {players.map((player, index) => (
          <div key={index} className="flex items-center">
            <div
              className={`mr-2 h-2 w-2 rounded-full ${
              player.isCurrentPlayer
                  ? "bg-[#7cb342]"
                  : "border border-[#b0b0b0]"
              }`}
            />
            <span className="mr-1 font-medium text-[#ff9800]">
              {player.title}
            </span>
            <span
              className={`mr-1 ${player.isCurrentPlayer ? "font-bold" : ""}`}
            >
              {player.name}
            </span>
            {player.isCurrentPlayer && <span className="mr-1 text-red-500" />}
            {player.rating && (
              <span className="text-[#b0b0b0]">({player.rating})</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
