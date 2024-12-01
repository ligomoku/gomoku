import type { ProfileDto } from "./ProfileDto";
import type { TimeControlDto } from "./TimeControlDto";

export type GetAvailableGamesResponse = {
  /**
   * @type string
   */
  gameId: string;
  /**
   * @type object | undefined
   */
  opponent?: ProfileDto;
  /**
   * @type object | undefined
   */
  timeControl?: TimeControlDto;
};
