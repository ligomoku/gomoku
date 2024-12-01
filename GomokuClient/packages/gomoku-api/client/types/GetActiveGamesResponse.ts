import type { PlayersDto } from "./PlayersDto.ts";
import type { TimeControlDto } from "./TimeControlDto.ts";

 export type GetActiveGamesResponse = {
    /**
     * @type string
    */
    gameId: string;
    /**
     * @type object | undefined
    */
    players?: PlayersDto;
    /**
     * @type object | undefined
    */
    timeControl?: TimeControlDto;
};