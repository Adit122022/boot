import type { Request, Response } from "express";
import { CatchError, TryError } from "../lib/globalErrorFunctions.js";
import ContentModel from "../model/ContentModel.js";
import type { AuthRequest } from "../middleware/AuthMiddleware.js";


export const addContent = async (req: AuthRequest, res: Response) => {
    try {
        const { title, link } = req.body;

        if (!title || !link) {
            throw TryError("Title and link are required!", 400);
        }

        // req.user comes from the AuthMiddleware
        if (!req.user) {
            throw TryError("User not authenticated", 401);
        }
        
        console.log("USer :" ,req.user)

        const newContent = await ContentModel.create({
            title,
            link,
            userId: req.user.id, // Ensure this matches what you put in the JWT payload
            tags: []
        });

        res.status(201).json({
            message: "Content added successfully! 🚀",
            data: newContent
        });
    } catch (error) {
        CatchError(error, res, "Failed to add content");
    }
};
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
