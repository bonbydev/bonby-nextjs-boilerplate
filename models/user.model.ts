import mongoose, { type Document } from "mongoose";

export interface IUser extends Document {
  name?: string;
  email: string;
  emailVerified?: Date;
  image?: string;
  password?: string;
  role: "USER" | "ADMIN";
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new mongoose.Schema<IUser>(
  {
    name: { type: String },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    emailVerified: { type: Date },
    image: { type: String },
    password: { type: String, select: false },
    role: { type: String, default: "USER", enum: ["USER", "ADMIN"], index: true },
  },
  { timestamps: true }
);

UserSchema.index({ createdAt: -1 });

export const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
