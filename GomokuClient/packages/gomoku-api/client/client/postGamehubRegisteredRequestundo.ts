import client from "./client.config";
import type { ResponseConfig } from "./client.config";
import type { PostGamehubRegisteredRequestundoMutationResponse, PostGamehubRegisteredRequestundoQueryParams } from "../models/PostGamehubRegisteredRequestundo";

 /**
 * @link /gamehub/registered/RequestUndo
 */
export async function postGamehubRegisteredRequestundo(params?: PostGamehubRegisteredRequestundoQueryParams, options: Partial<Parameters<typeof client>[0]> = {}): Promise<ResponseConfig<PostGamehubRegisteredRequestundoMutationResponse>["data"]> {
    const res = await client<PostGamehubRegisteredRequestundoMutationResponse>({ method: "post", url: `/gamehub/registered/RequestUndo`, params, ...options });
    return res.data;
}