import type { Request, Response } from "express";
import { CatchError, TryError } from "../lib/globalErrorFunctions.js";
import UserModel from "../model/UserModel.js";
import {
  comparePassword,
  createToken,
  hashPassword,
} from "../lib/HelpingFunctions.js";

export const signup = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    if (!email || !username || !password) {
      throw TryError("Invalid Credentials", 401);
    }
    const isUser = await UserModel.findOne({ email });
    if (isUser) {
      throw TryError("User already Exist", 411);
    }
    const encryptedPassword = await hashPassword(password);
    await UserModel.create({ email, username, password: encryptedPassword });
    res.json({ message: "User Created 🫡✅" });
  } catch (error) {
    CatchError(error, res, "Signup Error !");
  }
};
export const signin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw TryError("Invalid Credentials", 401);
    }
    const user = await UserModel.findOne({ email }).select("+password");
    // console.log(user);
    if (!user) throw TryError("User Not Found !", 401);
    const isPasswordMatch = await comparePassword(password, user.password);
    if (!isPasswordMatch) throw TryError("Invalid Credentials");
    const payload = {
      email: user.email,
      id: user._id.toString(),
    };
    const token = createToken(payload);
    res.json({ message: "User Login", token, username: user.username });
  } catch (error) {
    CatchError(error, res, "Signin Error !");
  }
};
