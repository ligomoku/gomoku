import type { PlayersDto } from "./PlayersDto";
import type { TimeControlDto } from "./TimeControlDto";

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