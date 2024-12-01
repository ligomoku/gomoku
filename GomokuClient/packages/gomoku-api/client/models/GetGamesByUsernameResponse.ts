import type { UsernamesDto } from "./UsernamesDto";
import type { TimeControlDto } from "./TimeControlDto";
import type { ClockDto } from "./ClockDto";

export type GetGamesByUsernameResponse = {
  /**
   * @type string
   */
  gameId: string;
  /**
   * @type object
   */
  players: UsernamesDto;
  /**
   * @type boolean
   */
  isCompleted: boolean;
  /**
   * @type string
   */
  winner?: string | null;
  /**
   * @type string
   */
  gen: string;
  /**
   * @type string, date-time
   */
  date: Date;
  /**
   * @type object | undefined
   */
  timeControl?: TimeControlDto;
  /**
   * @type object | undefined
   */
  clock?: ClockDto;
};
