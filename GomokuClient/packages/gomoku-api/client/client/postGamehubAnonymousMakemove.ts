import client from "./client.config";
import type { ResponseConfig } from "./client.config";
import type { PostGamehubAnonymousMakemoveMutationResponse, PostGamehubAnonymousMakemoveQueryParams } from "../models/PostGamehubAnonymousMakemove";

 /**
 * @link /gamehub/anonymous/MakeMove
 */
export async function postGamehubAnonymousMakemove(params?: PostGamehubAnonymousMakemoveQueryParams, options: Partial<Parameters<typeof client>[0]> = {}): Promise<ResponseConfig<PostGamehubAnonymousMakemoveMutationResponse>["data"]> {
    const res = await client<PostGamehubAnonymousMakemoveMutationResponse>({ method: "post", url: `/gamehub/anonymous/MakeMove`, params, ...options });
    return res.data;
}