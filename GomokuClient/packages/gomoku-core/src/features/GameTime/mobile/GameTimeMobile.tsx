import {
  ChevronLeft,
  ChevronRight,
  Flag,
  Repeat1,
  Undo,
  X,
} from "lucide-react";
import { GameTimeProps, secondsToString } from "@/features/GameTime";
import { SwaggerTypes } from "@/api";

interface GameTimeMobileProps
  extends Omit<GameTimeProps, "players" | "blackTimeLeft" | "whiteTimeLeft" | "clock"> {
  opponentView?: boolean; // Clock Time mode for main player who sees the board (player not opponent)
  player?: SwaggerTypes.PlayerDto;
  timeLeft?: number;
}

export const GameTimeMobile = ({
  moves,
  player,
  onUndo,
  onSkip,
  onFlag,
  onReset,
  onRematch,
  timeLeft,
  opponentView,
}: GameTimeMobileProps) => {
  if (opponentView) {
    return (
      <div className="w-full max-w-md rounded-lg bg-[#2e2a24] p-2 font-mono text-white">
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center">
            <span
              className="mr-2 h-3 w-3 rounded-full"
              style={{ backgroundColor: player?.color }}
            ></span>
            <span className="font-bold text-[#ffa600]">{player?.userName}</span>
          </div>
          {timeLeft && (
            <div className="bg-[#3d3733] px-2 py-1 text-4xl font-bold">
              {secondsToString(timeLeft > 0 ? timeLeft : 0)}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md rounded-lg bg-[#2e2a24] p-2 font-mono text-white">
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center">
          <span
            className="mr-2 h-3 w-3 rounded-full"
            style={{ backgroundColor: player?.color }}
          ></span>
          <span className="font-bold text-[#ffa600]">{player?.userName}</span>
        </div>
        {timeLeft && (
          <div className="bg-[#3d3733] px-2 py-1 text-4xl font-bold">
            {secondsToString(timeLeft > 0 ? timeLeft : 0)}
          </div>
        )}
      </div>
      <div className="mb-2 flex items-center rounded bg-[#363330] text-sm">
        <ChevronLeft
          className="text-[#b0b0b0]"
          onClick={() => onSkip("back")}
        />
        <div className="flex-1 overflow-x-auto whitespace-nowrap px-2 py-1">
          {moves.length > 0 ? (
            moves.map((move, index) => (
              <span key={index} className="mr-2 text-[#ffa600]">
                {move}
              </span>
            ))
          ) : (
            <span>{!player && "Game will starts soon. Wait for your opponent"}</span>
          )}
        </div>
        <ChevronRight
          className="text-[#b0b0b0]"
          onClick={() => onSkip("forward")}
        />
      </div>

      <div className="mb-2 flex justify-between">
        <button className="rounded bg-[#363330] p-2" onClick={onReset}>
          <X className="h-5 w-5 text-[#b0b0b0]" />
        </button>
        <button className="rounded bg-[#363330] p-2" onClick={onUndo}>
          <Undo className="h-5 w-5 text-[#b0b0b0]" />
        </button>
        <button className="rounded bg-[#363330] p-2" onClick={onFlag}>
          <Flag className="h-5 w-5 text-[#b0b0b0]" />
        </button>
        <button className="rounded bg-[#363330] p-2" onClick={onRematch}>
          <Repeat1 className="h-5 w-5 text-[#b0b0b0]" />
        </button>
      </div>

      {moves.length < 0 && (
        <div className="mt-2 w-full rounded bg-[#7cb342] py-2 text-center text-sm">
          Waiting for first move...
        </div>
      )}
    </div>
  );
};
