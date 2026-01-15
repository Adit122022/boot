import type{ Response } from "express";
import config from "../config/_config.js";

export interface ErrorMessage extends Error {
  status?: number;
}
export const TryError = (message: string, status: number = 500) => {
  const err: ErrorMessage = new Error(message);
  err.status = status;
  return err;
};

export const CatchError =(e :unknown , res :Response,staticErrorMessage :string ="Internal Server Error !")=>{
    if (e instanceof Error) {
      const message = (config.NODE_ENV === "dev" ? e.message :staticErrorMessage)
      return res
        .status((e as ErrorMessage).status || 500)
        .json({ message });
    }
}