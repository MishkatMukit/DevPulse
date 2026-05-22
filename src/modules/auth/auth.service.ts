import config from "../../config";
import { pool } from "../../DB/index.db";
import type { emailPass } from "../../types/types.index";
import type { IUser } from "../user/user.interface";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
const signupUserintoDB = async (payload: IUser) => {
    const { name, email, password, role } = payload;

    const hashPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(`
        INSERT INTO users(name, email, password, role) VALUES($1,$2,$3, COALESCE($4, 'contributor')) RETURNING * 
        ` , [name, email, hashPassword, role]
    );

    delete result.rows[0].password

    return result
}

const loginUserFromDB = async (payload: emailPass) => {
    const { email, password } = payload

    const userData = await pool.query(`
    SELECT * FROM users WHERE email = $1
        `, [email])
    if(userData.rowCount === 0){
        throw new Error("User not found!");
    }

    const user = userData.rows[0]

    const matchedPassword = await bcrypt.compare(password, user.password)

    // console.log(matchedPassword);

    if(!matchedPassword){
        throw new Error("Invalid Credentials");
    }
    
    const jwtPayload = {
        id : user.id,
        name : user.name,
        email: user.email,
        role: user.role
    }
    const accessToken = jwt.sign(jwtPayload, config.jwt_secret, {expiresIn:"1d"})

    // console.log(accessToken);
    delete user.password

    return {
        user,
        accessToken
    }

}
export const authService = {
    signupUserintoDB,
    loginUserFromDB
}