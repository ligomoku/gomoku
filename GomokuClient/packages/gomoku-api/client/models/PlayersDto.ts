import type { PlayerDto } from "./PlayerDto";

export type PlayersDto = {
  /**
   * @type object | undefined
   */
  black?: PlayerDto;
  /**
   * @type object | undefined
   */
  white?: PlayerDto;
};
