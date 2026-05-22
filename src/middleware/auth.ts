import type { NextFunction, Request, Response } from "express"
import type { maintainer } from "../types/types.index"
import sendResponse from "../utility/sendResponse";
import jwt, { type JwtPayload } from "jsonwebtoken"
import config from "../config";
import { pool } from "../DB/index.db";
const authenticateUser = () => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            // console.log(req.headers.authorization);
            const token = req.headers.authorization

            if (!token) {
                res.status(401).json({
                    success: false,
                    message: "Unauthorized access!",
                })
            }

            const decoded = jwt.verify(token as string, config.jwt_secret) as JwtPayload

            // console.log(decoded);
            const userData = await pool.query(`
            SELECT * FROM users WHERE email = $1
             `, [decoded.email])

            const user = userData.rows[0]
            if (userData.rowCount === 0) {
                sendResponse(res, {
                    statusCode: 404,
                    success: false,
                    message: "User not found!"
                })
            }
            
            req.user = decoded

            next()
            
        } catch (error: any) {
            sendResponse(res, {
                statusCode: 500,
                success: false,
                message: error.message,
                data: error
            })
        }
    }
}
export default authenticateUser