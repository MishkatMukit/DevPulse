import type { Request, Response } from "express";
import sendResponse from "../../utility/sendResponse";
import { authService } from "./auth.service";

const signupUser = async(req : Request, res: Response) =>{
    try {
        const result = await authService.signupUserintoDB(req.body)
        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: result.rows[0]
        })
    } catch (error:any) {
        sendResponse(res, {
            statusCode: 500,
            success: false,
            message: error.message,
            data: error
        })
    }
}

const loginUser = async(req : Request, res: Response)=>{
    try {
        const result =  await authService.loginUserFromDB(req.body)
        res.status(200).json({
            success: true,
            message: "Login successful",
            data: {
                token : result.accessToken,
                user :  result.user
            }
        })

    } catch (error:any) {
        sendResponse(res, {
            statusCode: 500,
            success: false,
            message: error.message,
            data: error
        })
    }
}
 
export const authController ={
    signupUser,
    loginUser
}

