import type { ProfileDto } from "./ProfileDto.ts";
import type { TimeControlDto } from "./TimeControlDto.ts";

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