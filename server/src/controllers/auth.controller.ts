import type { Request, Response } from "express";
import { CatchError, TryError } from "../lib/globalErrorFunctions.js";
import UserModel from "../model/UserModel.js";
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
export const signup =async(req:Request ,res:Response)=>{
try {
     const {email , password} = req.body;
    if(!email || !password){
       throw TryError("Invalid Credentials", 401)
    }
    const isUser = await UserModel.findOne({email})
    if(isUser){
        throw TryError("User already Exist")
    }
     const encryptedPassword = await hashPassword(password)
    await UserModel.create({email,password:encryptedPassword})
    res.json({message:"User Created 🫡✅"})
} catch (error) {
        CatchError(error, res, "Signup Error !")
    }
}
export const signin =async(req:Request ,res:Response)=>{
try {
     const {email , password} = req.body;
    if(!email || !password){
       throw TryError("Invalid Credentials", 401)
    }
    const user = await UserModel.findOne({email}).select("+password")
    console.log(user)
    if (!user) throw TryError("User Not Found !" , 401)
    const isPasswordMatch =await comparePassword(password,user.password)
    if(!isPasswordMatch) throw TryError("Invalid Credentials")
        const token = createToken(user.email)
    res.json({message:"User Login",token,user})
} catch (error) {
        CatchError(error, res, "Signin Error !")
    }
}