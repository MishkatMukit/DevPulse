import type { NextFunction, Request, Response } from "express";
import sendResponse from "../utility/sendResponse";
import { UserRole } from "../types/types.index";

const requireMaintainer = () => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const user = req.user
        if(user?.role===UserRole.maintainer){
            return next()
        }
        else{
            sendResponse(res, {
            statusCode: 403,
            success: false,
            message : "Access forbidden!"
        })}
        }
} 

export default requireMaintainer