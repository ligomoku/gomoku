import client from "./client.config";
import type { ResponseConfig } from "./client.config";
import type { PostGamehubAnonymousRequestundoMutationResponse, PostGamehubAnonymousRequestundoQueryParams } from "../models/PostGamehubAnonymousRequestundo";

 /**
 * @link /gamehub/anonymous/RequestUndo
 */
export async function postGamehubAnonymousRequestundo(params?: PostGamehubAnonymousRequestundoQueryParams, options: Partial<Parameters<typeof client>[0]> = {}): Promise<ResponseConfig<PostGamehubAnonymousRequestundoMutationResponse>["data"]> {
    const res = await client<PostGamehubAnonymousRequestundoMutationResponse>({ method: "post", url: `/gamehub/anonymous/RequestUndo`, params, ...options });
    return res.data;
}