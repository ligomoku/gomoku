export interface OnlinePlayersInfoProps {
  playersOnlineText: string;
  gamesInPlayText: string;
}

export const OnlinePlayersInfo = ({
  playersOnlineText,
  gamesInPlayText,
}: OnlinePlayersInfoProps) => (
  <div className="mt-6 text-center">
    <p className="text-base sm:text-xl">{playersOnlineText}</p>
    <p className="text-base sm:text-xl">{gamesInPlayText}</p>
  </div>
);
