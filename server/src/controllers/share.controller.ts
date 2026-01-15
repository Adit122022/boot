import type { Request, Response } from "express";
import { CatchError } from "../lib/globalErrorFunctions.js";

export const shareContent =(req:Request ,res:Response)=>{
    try {
        
    } catch (error) {
            CatchError(error, res, "Shring Error!")
        }
}