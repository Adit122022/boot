import express from "express"
import { getSharedBrain, shareContent } from "../controllers/share.controller.js"
import { AuthMiddleware } from "../middleware/AuthMiddleware.js"
const ShareRouter = express.Router()



ShareRouter.post("/share",AuthMiddleware,shareContent)
ShareRouter.get("/share/:shareLink",AuthMiddleware,getSharedBrain)
export default ShareRouter