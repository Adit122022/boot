import type { Request, Response } from "express";
import { CatchError } from "../lib/globalErrorFunctions.js";

export const addContent =(req:Request ,res:Response)=>{
    try {
        
    } catch (error) {
        CatchError(error, res, "Can't Be deleted ! Node note present")
    }
}
export const getContent =(req:Request ,res:Response)=>{
    try {
        
    } catch (error) {
        CatchError(error, res, "Can't Be deleted ! Node note present")
    }
}
export const deleteContent =(req:Request ,res:Response)=>{
    try {
        
    } catch (error) {
        CatchError(error, res, "Can't Be deleted ! Node note present")
    }
}
