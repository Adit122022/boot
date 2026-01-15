import mongoose, { model, Schema } from "mongoose";

const ContentSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      lowercase: true,
      trim: true,
      maxlength: [100, "Title cannot exceed 100 characters"]
    },
    link: {
      type: String,
      required: [true, "Link is required"],
      trim: true,
    },
    // Tags are an array of IDs
    tags: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tag' // Ensure this matches your Tag model name exactly
      }
    ],
    // FIX: Changed from Array to a single Object since a post usually belongs to one user
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true
    },
  },
  { 
    timestamps: true 
  }
);

// Added an index for faster searching by title
ContentSchema.index({ title: 'text' });

const ContentModel = model("content", ContentSchema);

export default ContentModel;