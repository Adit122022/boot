import express from "express"
import { addContent, deleteContent, getContent } from "../controllers/content.controller.js"
import { AuthMiddleware } from "../middleware/AuthMiddleware.js"
const ContentRouter = express.Router()


ContentRouter.post("/",AuthMiddleware,addContent) // add content
ContentRouter.get("/",getContent) // get content
ContentRouter.delete("/",deleteContent) // Delete content

export default ContentRouter