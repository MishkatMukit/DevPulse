import type { Request, Response } from "express";
import sendResponse from "../../utility/sendResponse";
import { issueService } from "./issue.service";
import { pool } from "../../DB/index.db";


const createIssue = async (req: Request, res: Response) => {
    try {
        const id = req.user?.id

        const payload = {
            ...req.body,
            reporter_id: id
        }

        // console.log(id);
        const result = await issueService.insertIssueIntoDB(payload)
        sendResponse(res, {
            statusCode: 201,
            success: true,
            message: "Issue created successfully",
            data: result.rows[0]
        })

    } catch (error: any) {
        sendResponse(res, {
            statusCode: 500,
            success: false,
            message: error.message,
            data: error
        })
    }
}

const getAllIssues = async (req: Request, res: Response) => {
    const {
        sort = "newest",
        type,
        status

    } = req.query

    try {
        let query = `SELECT * FROM issues`;
        const values: string[] = [];
        const options: string[] = [];
        if (type) {
            values.push(type as string);
            options.push(`type = $${values.length}`);
        }
        if (status) {
            values.push(status as string);
            options.push(`status = $${values.length}`);
        }
        if (options.length > 0) {
            query += ` WHERE ` + options.join(" AND ");
        }
        if (sort === "oldest") {
            query += ` ORDER BY created_at ASC`;
        } else {
            query += ` ORDER BY created_at DESC`;
        }

        // console.log(query);

        const rawResult = await issueService.getAllIssuesFromDB(query, values);

        if (rawResult.rowCount === 0) {
            sendResponse(res, {
                statusCode: 404,
                success: false,
                message: "No issues found",
                data: {}
            })
        }
        const issues = rawResult.rows
        const allReporterId = issues.map(issue => issue.reporter_id)

        // console.log(allReporterId);

        const allUsers = await issueService.getAllUsersFromDB(allReporterId)

        const reporterMap = new Map(allUsers.rows.map(user => [user.id, user]))

        const result = issues.map(issue => ({
            id: issue.id,
            title: issue.title,
            description: issue.description,
            type: issue.type,
            status: issue.status,
            reporter: reporterMap.get(issue.reporter_id),
            created_at: issue.created_at,
            updated_at: issue.updated_at

        }))
        console.log(result);
        sendResponse(res, {
            statusCode: 200,
            success: true,
            data: result
        })

    } catch (error: any) {
        sendResponse(res, {
            statusCode: 500,
            success: false,
            message: error.message,
            data: error
        })
    }
}

const getSingleIssue = async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    try {

        const rawResult = await issueService.getSingleIssueFromDB(id)
        if (rawResult.rowCount === 0) {
            sendResponse(res, {
                statusCode: 404,
                success: false,
                message: "Issue not found!",
            })
        }
        const reporterId = rawResult.rows[0].reporter_id
        const rawReporter = await issueService.getSingleUserFromDB(reporterId)
        const reporter = rawReporter.rows[0]
        // console.log(reporter);
        const issue = rawResult.rows[0]
        // console.log(issue);
        const result = {
            id: issue.id,
            title: issue.title,
            description: issue.description,
            type: issue.type,
            status: issue.status,
            reporter: reporter,
            created_at: issue.created_at,
            updated_at: issue.updated_at
        }
        sendResponse(res, {
            statusCode: 200,
            success: true,
            data: result
        })
    } catch (error: any) {
        sendResponse(res, {
            statusCode: 500,
            success: false,
            message: error.message,
            data: error
        })
    }
}
const updateIssue = async (req: Request, res: Response) => {
    const issueId: number = Number(req.params.id)
    try {

        const result = await issueService.updateIssueInDB(req.body, issueId)

        sendResponse(res, {
            statusCode: 200,
            success: true,
            message:"Issue updated successfully",
            data: result.rows[0]
        })
    } catch (error: any) {
        sendResponse(res, {
            statusCode: 500,
            success: false,
            message: error.message,
            data: error
        })
    }
}

const deleteIssue = async (req: Request, res: Response) => {
    try {   
        const issueId : number = Number(req.params.id)

        const result = await issueService.deleteIssueFromDB(issueId)

        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Issue deleted successfully"
        })
    } catch (error: any) {
        sendResponse(res, {
            statusCode: 500,
            success: false,
            message: error.message,
            data: error
        })
    }
}
export const issueController = {
    createIssue,
    getAllIssues,
    getSingleIssue,
    updateIssue,
    deleteIssue
}