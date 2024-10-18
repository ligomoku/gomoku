import {
  Clock,
  Rewind,
  SkipBack,
  SkipForward,
  FastForward,
  MoreHorizontal,
  X,
  Flag,
} from "lucide-react";

export interface GameTimeProps {
  timeLeft: string;
  player: {
    name: string;
    rating: number;
  };
  opponent: {
    name: string;
    rating: number;
  };
  isTurn: boolean;
  turnMessage: string;
  moveTimeMessage: string;
}

export const GameTime = ({
  timeLeft,
  player,
  opponent,
  isTurn,
  turnMessage,
  moveTimeMessage,
}: GameTimeProps) => (
  <div className="w-[300px] rounded-lg bg-[#2e2a24] p-2 font-sans text-white">
    <div className="mb-2 flex items-center justify-between">
      <div className="font-mono text-5xl">{timeLeft}</div>
      <button className="rounded bg-[#3d3733] p-1 text-[#b0b0b0]">
        <Clock className="h-6 w-6" />
      </button>
    </div>

    <div className="mb-2 rounded bg-[#363330] p-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="mr-2 h-2 w-2 rounded-full bg-[#7cb342]"></div>
          <span className="text-sm">{player.name}</span>
        </div>
        <div className="flex items-center">
          <div className="mr-0.5 h-3 w-1 rounded-sm bg-[#7cb342]"></div>
          <div className="mr-0.5 h-4 w-1 rounded-sm bg-[#7cb342]"></div>
          <div className="mr-0.5 h-5 w-1 rounded-sm bg-[#7cb342]"></div>
          <div className="mr-2 h-6 w-1 rounded-sm bg-[#7cb342]"></div>
          <span className="text-sm">{player.rating}</span>
        </div>
      </div>

      <div className="mt-2 flex justify-between">
        <Rewind className="h-5 w-5 text-[#b0b0b0]" />
        <SkipBack className="h-5 w-5 text-[#b0b0b0]" />
        <SkipForward className="h-5 w-5 text-[#b0b0b0]" />
        <FastForward className="h-5 w-5 text-[#b0b0b0]" />
        <MoreHorizontal className="h-5 w-5 text-[#b0b0b0]" />
      </div>
    </div>

    <div className="mb-2 flex items-center rounded bg-[#363330] p-2">
      <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-[#b0b0b0]">
        <span className="text-xl font-bold text-[#363330]">i</span>
      </div>
      <div>
        <div className="text-sm">
          {isTurn ? "You play the white pieces" : "You play the black pieces"}
        </div>
        <div className="text-lg font-bold">{turnMessage}</div>
      </div>
    </div>

    <div className="mb-2 flex justify-between">
      <button className="rounded bg-[#363330] p-2">
        <X className="h-5 w-5 text-[#b0b0b0]" />
      </button>
      <button className="rounded bg-[#363330] px-3 py-2 text-xl font-bold text-[#b0b0b0]">
        ½
      </button>
      <button className="rounded bg-[#363330] p-2">
        <Flag className="h-5 w-5 text-[#b0b0b0]" />
      </button>
    </div>

    <div className="mb-2 rounded bg-[#363330] p-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="mr-2 h-2 w-2 rounded-full bg-[#7cb342]"></div>
          <span className="text-sm">{opponent.name}</span>
        </div>
        <span className="text-sm">{opponent.rating}</span>
      </div>
    </div>

    <div className="rounded bg-[#7cb342] py-2 text-center text-sm">
      {moveTimeMessage}
    </div>

    <div className="mt-2 text-center font-mono text-5xl">{timeLeft}</div>
  </div>
);

GameTime.displayName = "GameTime";
