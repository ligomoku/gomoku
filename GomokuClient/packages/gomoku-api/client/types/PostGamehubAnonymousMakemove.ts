import type { MakeMoveClientMessage } from "./MakeMoveClientMessage.ts";

 export type PostGamehubAnonymousMakemoveQueryParams = {
    /**
     * @type object | undefined
    */
    message?: MakeMoveClientMessage;
};

 export type PostGamehubAnonymousMakemoveMutationResponse = any;

 export type PostGamehubAnonymousMakemoveMutation = {
    Response: any;
    QueryParams: PostGamehubAnonymousMakemoveQueryParams;
    Errors: any;
};