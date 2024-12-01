import type { ClockDto } from "./ClockDto.ts";
import type { TimeControlDto } from "./TimeControlDto.ts";
import type { UsernamesDto } from "./UsernamesDto.ts";

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
    date: string;
    /**
     * @type object | undefined
    */
    timeControl?: TimeControlDto;
    /**
     * @type object | undefined
    */
    clock?: ClockDto;
};