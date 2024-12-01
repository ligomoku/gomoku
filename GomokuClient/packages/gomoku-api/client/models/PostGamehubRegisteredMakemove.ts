import type { MakeMoveClientMessage } from "./MakeMoveClientMessage";

 export type PostGamehubRegisteredMakemoveQueryParams = {
    /**
     * @type object | undefined
    */
    message?: MakeMoveClientMessage;
};
export type PostGamehubRegisteredMakemoveMutationResponse = any;
export type PostGamehubRegisteredMakemoveMutation = {
    Response: PostGamehubRegisteredMakemoveMutationResponse;
    QueryParams: PostGamehubRegisteredMakemoveQueryParams;
};