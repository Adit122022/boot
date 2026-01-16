import type { Request, Response } from "express";
import { CatchError, TryError } from "../lib/globalErrorFunctions.js";
import ContentModel from "../model/ContentModel.js";
import type { AuthRequest } from "../middleware/AuthMiddleware.js";

export const addContent = async (req: AuthRequest, res: Response) => {
  try {
    const { title, link, type } = req.body;

    if (!title || !link) {
      throw TryError("Title and link are required!", 400);
    }

    // req.user comes from the AuthMiddleware
    if (!req.user) {
      throw TryError("User not authenticated", 401);
    }

    // console.log("USer :" ,req.user)

    const newContent = await ContentModel.create({
      title,
      link,
      type, // Add type here
      userId: req.user.id,
      tags: [], // Or req.body.tags if you want to support tags
    });

    res.status(201).json({
      message: "Content added successfully! 🚀",
      data: newContent,
    });
  } catch (error) {
    CatchError(error, res, "Failed to add content");
  }
};
export const getContent = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      throw TryError("User not authenticated", 401);
    }
    const content = await ContentModel.find({ userId: req.user.id }).populate(
      "userId"
    );

    res.json({ message: "User contents", content });
  } catch (error) {
    CatchError(error, res, "Can't Be deleted ! Node note present");
  }
};
export const deleteContent = async (req: AuthRequest, res: Response) => {
  try {
    const contentId = req.body?.contentId;
    if (!contentId) {
      throw TryError("please enter content id");
    }

    if (!req.user) {
      throw TryError("User not authenticated", 401);
    }
    const content = await ContentModel.deleteOne({
      _id: contentId,
      userId: req.user.id,
    });
    res.json({ message: "Deleted" });
  } catch (error) {
    CatchError(error, res, "Can't Be deleted ! Node note present");
  }
};
