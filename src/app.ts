import express, { type Application, type Request, type Response } from "express"
import { globalErrorHandler } from "./middleware/globalErrorHandler"
import cors from "cors"
import { authRoute } from "./modules/auth/auth.route"
import { issueRoute } from "./modules/issue/issue.route"

const app : Application = express()

app.use(express.json())
app.use(express.text())
app.use(cors())

app.use('/api/auth', authRoute)
app.use('/api/issues', issueRoute)

app.get('/', (req:Request, res:Response)=>{
    res.status(200).json({
        message : "DevPulse Server",
        Author : "Mishkat Mahabub"
    })
})
app.use(globalErrorHandler)

export default app