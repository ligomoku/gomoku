import type { PlayersDto } from "./PlayersDto";
import type { TileDto } from "./TileDto";
import type { TimeControlDto } from "./TimeControlDto";
import type { ClockDto } from "./ClockDto";

export type GetGameHistoryResponse = {
  /**
   * @type integer, int32
   */
  boardSize: number;
  /**
   * @type string
   */
  gen: string;
  /**
   * @type integer, int32
   */
  movesCount: number;
  /**
   * @type object
   */
  players: PlayersDto;
  /**
   * @type boolean
   */
  isGameStarted: boolean;
  /**
   * @type boolean
   */
  hasBothPlayersJoined: boolean;
  /**
   * @type boolean
   */
  isCompleted: boolean;
  /**
   * @type string
   */
  winner?: string | null;
  /**
   * @type array
   */
  winningSequence?: TileDto[] | null;
  /**
   * @type object
   */
  movesHistory: {
    [key: string]: TileDto;
  };
  /**
   * @type object | undefined
   */
  timeControl?: TimeControlDto;
  /**
   * @type object | undefined
   */
  clock?: ClockDto;
};
