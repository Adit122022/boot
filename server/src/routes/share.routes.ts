import express from "express"
import { shareContent } from "../controllers/share.controller.js"
const ShareRouter = express.Router()



ShareRouter.post("/share",shareContent)
ShareRouter.get("/:shareLink",(req,res)=>{})
export default ShareRouter