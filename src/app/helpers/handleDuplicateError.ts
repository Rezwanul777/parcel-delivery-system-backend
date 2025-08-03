import { TGenericErrorResponse } from "../interfaces/error.type";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const handleDuplicateError=(err:any):TGenericErrorResponse=>{
    const matchedArray = err.message.match(/"([^"]*)"/);
    return{
        statusCode:400,
        message:`Duplicate ${matchedArray?.[1] || "field"} already exits`
    }
}