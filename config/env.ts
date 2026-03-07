import { z } from "zod";

const appEnvSchema = z.enum(["development", "staging", "production"]);

const envSchema = z
  .object({
    NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
    MONGODB_URI: z.string().min(1, "MONGODB_URI is required"),
    AUTH_SECRET: z.string().min(1, "AUTH_SECRET is required"),
    AUTH_TRUST_HOST: z.string().optional(),
    AUTH_GOOGLE_ID: z.string().optional(),
    AUTH_GOOGLE_SECRET: z.string().optional(),
    AUTH_GITHUB_ID: z.string().optional(),
    AUTH_GITHUB_SECRET: z.string().optional(),
    NEXT_PUBLIC_APP_URL: z.string().url().default("http://localhost:3000"),
    NEXT_PUBLIC_APP_ENV: appEnvSchema.default("development"),
  })
  .superRefine((data, ctx) => {
    if (data.NEXT_PUBLIC_APP_ENV === "production") {
      if (!data.AUTH_SECRET || data.AUTH_SECRET.length < 32) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "AUTH_SECRET must be at least 32 characters in production",
          path: ["AUTH_SECRET"],
        });
      }
    }
  });

export type Env = z.infer<typeof envSchema>;
export type AppEnv = z.infer<typeof appEnvSchema>;

function validateEnv(): Env {
  const parsed = envSchema.safeParse(process.env);

  if (!parsed.success) {
    console.error("Invalid environment variables:", parsed.error.flatten().fieldErrors);
    throw new Error("Invalid environment variables");
  }

  return parsed.data;
}

export const env = validateEnv();

export const isDevelopment = env.NEXT_PUBLIC_APP_ENV === "development";
export const isStaging = env.NEXT_PUBLIC_APP_ENV === "staging";
export const isProduction = env.NEXT_PUBLIC_APP_ENV === "production";
