import client from "./client.config";
import type { ResponseConfig } from "./client.config";
import type { PostGamehubRegisteredGetclockMutationResponse, PostGamehubRegisteredGetclockQueryParams } from "../models/PostGamehubRegisteredGetclock";

 /**
 * @link /gamehub/registered/GetClock
 */
export async function postGamehubRegisteredGetclock(params?: PostGamehubRegisteredGetclockQueryParams, options: Partial<Parameters<typeof client>[0]> = {}): Promise<ResponseConfig<PostGamehubRegisteredGetclockMutationResponse>["data"]> {
    const res = await client<PostGamehubRegisteredGetclockMutationResponse>({ method: "post", url: `/gamehub/registered/GetClock`, params, ...options });
    return res.data;
}