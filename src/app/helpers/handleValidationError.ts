/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose"
import { TErrorSources, TGenericErrorResponse } from "../interfaces/error.type"

export const handleValidationError=(err:mongoose.Error.ValidationError):TGenericErrorResponse=>{
  let errorSources:TErrorSources[]=[]
  let errors=Object.values(err.errors)
    errors.forEach((errorObj:any)=>{
        errorSources.push({
            path:errorObj.path,
            message:errorObj.message
        })
    })
    return{
        statusCode:400,
        message:'Validation Error',
        errorSources
    }
}