import { model, Schema } from "mongoose";

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"],
    },
  
    username: {
      type: String,
      required: [true, "Username is required"],
      lowercase: true,
      trim: true,
      maxlength: [20, "username should be of 20 characters only"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      select: false, // Prevents password from being returned in queries by default
      minlength: [8, "Password must be at least 8 characters long"],
    },
  },
  { 
    timestamps: true // Automatically creates 'createdAt' and 'updatedAt' fields
  }
);

// This check prevents re-defining the model during Hot Module Replacement (common in Next.js)
const UserModel = model("user", UserSchema);

export default UserModel;