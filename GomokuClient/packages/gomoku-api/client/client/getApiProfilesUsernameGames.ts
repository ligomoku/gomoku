import client from "./client.config";
import type { ResponseConfig } from "./client.config";
import type { GetApiProfilesUsernameGamesQueryResponse, GetApiProfilesUsernameGamesPathParams, GetApiProfilesUsernameGamesQueryParams, GetApiProfilesUsernameGamesHeaderParams } from "../models/GetApiProfilesUsernameGames";

 /**
 * @summary Get games for specific user
 * @link /api/profiles/:userName/games
 */
export async function getApiProfilesUsernameGames(userName: GetApiProfilesUsernameGamesPathParams["userName"], headers: GetApiProfilesUsernameGamesHeaderParams, params?: GetApiProfilesUsernameGamesQueryParams, options: Partial<Parameters<typeof client>[0]> = {}): Promise<ResponseConfig<GetApiProfilesUsernameGamesQueryResponse>["data"]> {
    const res = await client<GetApiProfilesUsernameGamesQueryResponse>({ method: "get", url: `/api/profiles/${userName}/games`, params, headers: { ...headers, ...options.headers }, ...options });
    return res.data;
}