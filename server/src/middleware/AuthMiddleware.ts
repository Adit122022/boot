import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../config/_config.js";
import { CatchError, TryError } from "../lib/globalErrorFunctions.js";

// This helps TypeScript recognize req.user
export interface AuthRequest extends Request {
    user?: any; 
}
export const AuthMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers["authorization"];
        
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            throw TryError("Access Denied. No token provided.", 401);
        }

        // FIX: Extract only the token part (remove "Bearer ")
        const token = authHeader.split(" ")[1];
        // Verify the token
        const decoded = jwt.verify(token, config.JWT_SECRET);

        // Attach the decoded data (usually contains user id) to the request
        req.user = decoded;

        next();
    } catch (error) {
        CatchError(error, res, "Authentication Error");
    }
};