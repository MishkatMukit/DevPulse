import dotenv from "dotenv"
import path from "path"

dotenv.config({
    path : path.join(process.cwd(), ".env")
})

const config = {
    port : process.env.PORT,
    connction_string : process.env.CONNECTION_STRING,
    jwt_secret : process.env.JWT_SECRET as string
}

export default config