import mongoose, { Schema, model } from "mongoose";

const LinkSchema = new Schema({
  hash: { type: String, required: true, unique: true }, // The random URL string
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true, unique: true },
});

export const LinkModel = model("links", LinkSchema);