import type { TimeControlDto } from "./TimeControlDto";

export type CreateGameRequest = {
  /**
   * @type integer, int32
   */
  boardSize: number;
  /**
   * @type object | undefined
   */
  timeControl?: TimeControlDto;
};
