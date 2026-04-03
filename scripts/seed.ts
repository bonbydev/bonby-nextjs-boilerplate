/* eslint-disable no-console */
import { existsSync, readFileSync } from "node:fs";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";

function loadEnvFile(path: string) {
  if (!existsSync(path)) return;

  const content = readFileSync(path, "utf8");
  const lines = content.split(/\r?\n/);

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    const separatorIndex = trimmed.indexOf("=");
    if (separatorIndex === -1) continue;

    const key = trimmed.slice(0, separatorIndex).trim();
    const rawValue = trimmed.slice(separatorIndex + 1).trim();
    const quoted =
      (rawValue.startsWith('"') && rawValue.endsWith('"')) ||
      (rawValue.startsWith("'") && rawValue.endsWith("'"));
    const value = quoted ? rawValue.slice(1, -1) : rawValue;

    if (!process.env[key]) {
      process.env[key] = value;
    }
  }
}

loadEnvFile(".env.development");
loadEnvFile(".env.development.local");

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable before running the seed script."
  );
}

const DEFAULT_USERNAME = process.env.SEED_USERNAME || "admin";
const DEFAULT_PASSWORD = process.env.SEED_PASSWORD || "admin12345";
const DEFAULT_ROLE = process.env.SEED_ROLE === "ADMIN" ? "ADMIN" : "USER";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, select: false },
    role: { type: String, default: "USER", enum: ["USER", "ADMIN"], index: true },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

async function seedUser() {
  await mongoose.connect(MONGODB_URI!);

  const username = DEFAULT_USERNAME.toLowerCase();
  const password = await bcrypt.hash(DEFAULT_PASSWORD, 12);

  const user = await User.findOneAndUpdate(
    { username },
    { username, password, role: DEFAULT_ROLE },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  console.log("Seed user ready:");
  console.log(`username: ${user.username}`);
  console.log(`password: ${DEFAULT_PASSWORD}`);
  console.log(`role: ${user.role}`);
}

seedUser()
  .catch((error) => {
    console.error("Failed to seed user:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.disconnect();
  });
