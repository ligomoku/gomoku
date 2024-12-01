import type { PlayerDto } from "./PlayerDto.ts";

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