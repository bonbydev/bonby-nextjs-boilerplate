import mongoose, { type Document } from "mongoose";

export interface IUser extends Document {
  username: string;
  password?: string;
  role: "USER" | "ADMIN";
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new mongoose.Schema<IUser>(
  {
    username: { type: String, required: true, lowercase: true, trim: true },
    password: { type: String, select: false },
    role: { type: String, default: "USER", enum: ["USER", "ADMIN"], index: true },
  },
  { timestamps: true }
);

UserSchema.index({ createdAt: -1 });
UserSchema.index({ username: 1 }, { unique: true });

export const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
