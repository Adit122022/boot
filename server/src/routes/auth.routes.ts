import express from "express"
import { signin, signup } from "../controllers/auth.controller.js"
const AuthRouter = express.Router()


AuthRouter.post("/signup",signup)
AuthRouter.post("/signin",signin)
export default AuthRouter