import express from "express"
import { addContent, deleteContent, getContent } from "../controllers/content.controller.js"
const ContentRouter = express.Router()


ContentRouter.post("/content",addContent) // add content
ContentRouter.get("/content",getContent) // get content
ContentRouter.delete("/content",deleteContent) // Delete content

export default ContentRouter