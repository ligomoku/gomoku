import client from "./client.config";
import type { ResponseConfig } from "./client.config";
import type { PostGamehubAnonymousGetclockMutationResponse, PostGamehubAnonymousGetclockQueryParams } from "../models/PostGamehubAnonymousGetclock";

 /**
 * @link /gamehub/anonymous/GetClock
 */
export async function postGamehubAnonymousGetclock(params?: PostGamehubAnonymousGetclockQueryParams, options: Partial<Parameters<typeof client>[0]> = {}): Promise<ResponseConfig<PostGamehubAnonymousGetclockMutationResponse>["data"]> {
    const res = await client<PostGamehubAnonymousGetclockMutationResponse>({ method: "post", url: `/gamehub/anonymous/GetClock`, params, ...options });
    return res.data;
}