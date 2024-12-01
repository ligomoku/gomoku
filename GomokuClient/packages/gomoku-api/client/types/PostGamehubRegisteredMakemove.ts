import type { MakeMoveClientMessage } from "./MakeMoveClientMessage.ts";

 export type PostGamehubRegisteredMakemoveQueryParams = {
    /**
     * @type object | undefined
    */
    message?: MakeMoveClientMessage;
};

 export type PostGamehubRegisteredMakemoveMutationResponse = any;

 export type PostGamehubRegisteredMakemoveMutation = {
    Response: any;
    QueryParams: PostGamehubRegisteredMakemoveQueryParams;
    Errors: any;
};