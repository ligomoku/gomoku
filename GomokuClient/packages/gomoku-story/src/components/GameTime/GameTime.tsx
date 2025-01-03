import {
  Clock,
  FastForward,
  Flag,
  MoreHorizontal,
  Repeat1,
  Rewind,
  SkipBack,
  SkipForward,
  Undo,
  X,
} from "lucide-react";
import { Fragment } from "react";

import type { SwaggerTypes } from "@gomoku/api";

export interface GameTimeProps {
  moves: string[];
  clock: SwaggerTypes.GetGameHistoryResponse["clock"];
  players: SwaggerTypes.GetGameHistoryResponse["players"] | null;
  onUndo: () => void;
  onSkip: (direction: "back" | "forward") => void;
  onFlag: () => void;
  onReset: () => void;
  onRematch: () => void;
  currentPlayer: "black" | "white";
}

export const GameTime = ({
  moves,
  clock,
  players,
  onUndo,
  onSkip,
  onFlag,
  onReset,
  onRematch,
  currentPlayer,
}: GameTimeProps) => {
  const isCurrentPlayerBlack = currentPlayer === "black";
  const opponentPlayer = isCurrentPlayerBlack ? players?.white : players?.black;
  const currentPlayerObj = isCurrentPlayerBlack
    ? players?.black
    : players?.white;
  const opponentClock = isCurrentPlayerBlack ? clock?.white : clock?.black;
  const currentPlayerClock = isCurrentPlayerBlack ? clock?.black : clock?.white;

  return (
    <div className="w-[300px] rounded-lg bg-[#2e2a24] p-2 font-sans text-white">
      <div className="mb-2 flex items-center justify-between">
        {clock && opponentClock! > 0 && (
          <>
            <div className="font-mono text-5xl">
              {secondsToString(opponentClock!)}
            </div>
            <button className="rounded bg-[#3d3733] p-1 text-[#b0b0b0]">
              <Clock className="h-6 w-6" />
            </button>
          </>
        )}
      </div>

      <div className="mb-2 rounded bg-[#363330] p-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div
              className="mr-2 h-2 w-2 rounded-full"
              style={{
                backgroundColor: isCurrentPlayerBlack ? "white" : "black",
              }}
            />
            <span className="text-sm">{opponentPlayer?.userName}</span>
          </div>
          <div className="flex items-center">
            <div className="mr-0.5 h-3 w-1 rounded-sm bg-[#7cb342]" />
            <div className="mr-0.5 h-4 w-1 rounded-sm bg-[#7cb342]" />
            <div className="mr-0.5 h-5 w-1 rounded-sm bg-[#7cb342]" />
            <div className="mr-2 h-6 w-1 rounded-sm bg-[#7cb342]" />
          </div>
        </div>

        <div className="mt-2 flex justify-between">
          <Rewind
            className="h-5 w-5 text-[#b0b0b0]"
            onClick={() => onSkip("back")}
          />
          <SkipBack
            className="h-5 w-5 text-[#b0b0b0]"
            onClick={() => onSkip("back")}
          />
          <SkipForward
            className="h-5 w-5 text-[#b0b0b0]"
            onClick={() => onSkip("forward")}
          />
          <FastForward
            className="h-5 w-5 text-[#b0b0b0]"
            onClick={() => onSkip("forward")}
          />
          <Repeat1
            className="h-5 w-5 text-[#b0b0b0]"
            onClick={() => onRematch()}
          />
          <MoreHorizontal className="h-5 w-5 text-[#b0b0b0]" />
        </div>
      </div>

      {moves.length === 0 ? (
        <div className="mb-2 flex items-center rounded bg-[#363330] p-2">
          <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-[#b0b0b0]">
            <span className="text-xl font-bold text-[#363330]">i</span>
          </div>
          <div>
            <div className="text-sm">
              {!players?.black && !players?.white && "Game will starts soon"}
            </div>
            <div className="text-lg font-bold">
              {!players?.black && !players?.white && "Wait for your opponent"}
            </div>
          </div>
        </div>
      ) : (
        <div className="mb-2 max-h-[100px] overflow-y-auto rounded bg-[#363330] p-2">
          <div className="grid grid-cols-3 gap-2 text-sm">
            {moves.map((move, index) => (
              <Fragment key={index}>
                <div className="text-[#b0b0b0]">{index + 1}.</div>
                <div className={index % 2 === 0 ? "font-bold" : ""}>{move}</div>
                <div className={index % 2 === 0 ? "text-black" : "text-white"}>
                  ●
                </div>
              </Fragment>
            ))}
          </div>
        </div>
      )}

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
      </div>

      <div className="mb-2 rounded bg-[#363330] p-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div
              className="mr-2 h-2 w-2 rounded-full"
              style={{
                backgroundColor: isCurrentPlayerBlack ? "black" : "white",
              }}
            />
            <span className="text-sm">{currentPlayerObj?.userName}</span>
          </div>
          <div className="flex items-center">
            <div className="mr-0.5 h-3 w-1 rounded-sm bg-[#7cb342]" />
            <div className="mr-0.5 h-4 w-1 rounded-sm bg-[#7cb342]" />
            <div className="mr-0.5 h-5 w-1 rounded-sm bg-[#7cb342]" />
            <div className="mr-2 h-6 w-1 rounded-sm bg-[#7cb342]" />
          </div>
        </div>
      </div>

      {moves.length === 0 ? (
        <div className="rounded bg-[#7cb342] py-2 text-center text-sm">
          17 seconds to play the first move
        </div>
      ) : (
        <button
          className="w-full rounded bg-[#7cb342] py-2 text-center text-sm"
          onClick={() => alert("Add move clicked")}
        >
          Add move
        </button>
      )}

      {clock && currentPlayerClock! > 0 && (
        <div className="mt-2 text-center font-mono text-5xl">
          {secondsToString(currentPlayerClock!)}
        </div>
      )}
    </div>
  );
};

// Utility function to convert seconds into MM:SS format
export const secondsToString = (seconds: number) =>
  `${Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0")}:${Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0")}`;
