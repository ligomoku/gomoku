import client from "./client.config";
import type { ResponseConfig } from "./client.config";
import type { PostGamehubRegisteredMakemoveMutationResponse, PostGamehubRegisteredMakemoveQueryParams } from "../models/PostGamehubRegisteredMakemove";

 /**
 * @link /gamehub/registered/MakeMove
 */
export async function postGamehubRegisteredMakemove(params?: PostGamehubRegisteredMakemoveQueryParams, options: Partial<Parameters<typeof client>[0]> = {}): Promise<ResponseConfig<PostGamehubRegisteredMakemoveMutationResponse>["data"]> {
    const res = await client<PostGamehubRegisteredMakemoveMutationResponse>({ method: "post", url: `/gamehub/registered/MakeMove`, params, ...options });
    return res.data;
}