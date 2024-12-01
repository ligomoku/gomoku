import type { MakeMoveClientMessage } from "./MakeMoveClientMessage";

 export type PostGamehubAnonymousMakemoveQueryParams = {
    /**
     * @type object | undefined
    */
    message?: MakeMoveClientMessage;
};
export type PostGamehubAnonymousMakemoveMutationResponse = any;
export type PostGamehubAnonymousMakemoveMutation = {
    Response: PostGamehubAnonymousMakemoveMutationResponse;
    QueryParams: PostGamehubAnonymousMakemoveQueryParams;
};