import type { NextFunction, Request, Response } from "express"
import sendResponse from "../utility/sendResponse"
import { UserRole, type Role } from "../types/types.index"
import { pool } from "../DB/index.db"

const authorizeIssue = (...roles: Role[])=>{
    return async(req:Request, res: Response, next:NextFunction)=>{
        const issueId = req.params.id
        const user = req.user

        // console.log(issueId);
        if(!user){
            sendResponse(res, {
            statusCode: 401,
            success: false,
            message: "Unauthorized access"
        })}

        if (!roles.includes(user?.role)) {
            return sendResponse(res, {
                statusCode: 403,
                success: false,
                message: "Forbidden access"
            })}
        if(user?.role === UserRole.maintainer){
            return next()
        }

        const result = await pool.query(
            `SELECT reporter_id, status FROM issues WHERE id = $1`,
            [issueId]
        );

        const issue = result.rows[0]

        if (!issue) {
            return sendResponse(res, {
                statusCode: 404,
                success: false,
                message: "Issue not found"
            })}
        if (issue.reporter_id !== user?.id) {
            return sendResponse(res, {
                statusCode: 403,
                success: false,
                message: "You can only update your own issue"
            })}
        
        if (issue.status !== "open") {
            return sendResponse(res, {
                statusCode: 403,
                success: false,
                message: "You can only update open issues"
            })}
        next()
    }
}
export default authorizeIssue