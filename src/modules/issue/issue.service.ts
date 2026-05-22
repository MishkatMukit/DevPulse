import { pool } from "../../DB/index.db";
import type { IssueType } from "../../types/types.index";
import type { IIssue } from "./issue.interface";

const insertIssueIntoDB = async (payload: IIssue) => {

    const { title, description, type, reporter_id } = payload
    const result = await pool.query(`
        INSERT INTO issues (title, description, type, reporter_id) VALUES($1,$2,$3,$4) RETURNING *
        `, [title, description, type, reporter_id])
    return result
}
const getAllIssuesFromDB = async (query: string, values: string[]) => {
    const result = await pool.query(query, values)
    return result
}
const getAllUsersFromDB = async(allReporterId : number[])=>{
    const result  = pool.query(`
        SELECT id, name, role FROM users WHERE id = ANY($1)`,([allReporterId]))

    return result
}
const getSingleIssueFromDB = async (id: number) => {
    const result = await pool.query(`
        SELECT * FROM issues WHERE id = $1 
        `, [id])
        
    return result
}
const getSingleUserFromDB = async(id : number)=>{
    const result = pool.query(`
     
        SELECT id, name, role FROM users WHERE id = $1
        
        `,[id])
        return result
}
const updateIssueInDB = async(payload:IssueType, id:number)=>{
    const {title, description, type} = payload
    const result = await pool.query(`
        UPDATE issues
        SET
        title = COALESCE($1, title),
        description = COALESCE($2, description),
        type = COALESCE($3, type),
        status='in_progress' WHERE id = $4 RETURNING *
        `,[title, description, type, id])

        return result
}

const deleteIssueFromDB = async(id: Number)=>{
    const result = pool.query(`
    DELETE FROM issues WHERE id = $1 RETURNING *
        `, [id])

    return result
}
export const issueService = {
    insertIssueIntoDB,
    getAllIssuesFromDB,
    getSingleIssueFromDB,
    getAllUsersFromDB,
    getSingleUserFromDB,
    updateIssueInDB,
    deleteIssueFromDB
}

