import bcrypt from "bcrypt"
import jwt  from "jsonwebtoken"
import config from "../config/_config.js";


export const hashPassword =(password:string)=>{
    return  bcrypt.hash(password,10)
}
export const comparePassword = (password:string, encryptedPassword:string)=>{
    return bcrypt.compare(password,encryptedPassword)
}
export const createToken=(email:string)=>{
    return jwt.sign({email},config.JWT_SECRET,{expiresIn:'1d'})
}
export const decodeToken=(token:string)=>{
    return jwt.verify(token,config.JWT_SECRET)
}