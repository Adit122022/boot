import express from "express"
import { addContent, deleteContent, getContent } from "../controllers/content.controller.js"
import { AuthMiddleware } from "../middleware/AuthMiddleware.js"
const ContentRouter = express.Router()


ContentRouter.post("/",AuthMiddleware,addContent) // add content
ContentRouter.get("/",AuthMiddleware,getContent) // get content
ContentRouter.delete("/",AuthMiddleware,deleteContent) // Delete content

export default ContentRouter