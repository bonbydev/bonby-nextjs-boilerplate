import bcrypt from "bcryptjs";
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/bonby-dev";

const UserSchema = new mongoose.Schema(
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

const User = mongoose.models.User || mongoose.model("User", UserSchema);

const seedUsers = [
  {
    name: "Admin User",
    email: "admin@example.com",
    password: "admin123456",
    role: "ADMIN",
  },
  {
    name: "Test User",
    email: "user@example.com",
    password: "user123456",
    role: "USER",
  },
];

async function seed() {
  console.log("Connecting to MongoDB...");
  await mongoose.connect(MONGODB_URI);
  console.log("Connected.");

  for (const userData of seedUsers) {
    const existing = await User.findOne({ email: userData.email });
    if (existing) {
      console.log(`  Skipping ${userData.email} (already exists)`);
      continue;
    }

    const hashedPassword = await bcrypt.hash(userData.password, 12);
    await User.create({
      name: userData.name,
      email: userData.email,
      password: hashedPassword,
      role: userData.role,
    });
    console.log(`  Created ${userData.role}: ${userData.email}`);
  }

  console.log("\nSeed complete. Users:");
  for (const u of seedUsers) {
    console.log(`  ${u.email} / ${u.password} (${u.role})`);
  }

  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
