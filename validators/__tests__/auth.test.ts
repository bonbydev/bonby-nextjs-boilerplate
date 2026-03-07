import { describe, expect, it } from "vitest";

import { signInSchema, signUpSchema } from "../auth";

describe("signInSchema", () => {
  it("validates a correct sign-in input", () => {
    const result = signInSchema.safeParse({
      email: "user@example.com",
      password: "password123",
    });
    expect(result.success).toBe(true);
  });

  it("rejects invalid email", () => {
    const result = signInSchema.safeParse({
      email: "not-an-email",
      password: "password123",
    });
    expect(result.success).toBe(false);
  });

  it("rejects empty password", () => {
    const result = signInSchema.safeParse({
      email: "user@example.com",
      password: "",
    });
    expect(result.success).toBe(false);
  });

  it("rejects missing fields", () => {
    const result = signInSchema.safeParse({});
    expect(result.success).toBe(false);
  });
});

describe("signUpSchema", () => {
  it("validates a correct sign-up input", () => {
    const result = signUpSchema.safeParse({
      name: "John Doe",
      email: "john@example.com",
      password: "password123",
      confirmPassword: "password123",
    });
    expect(result.success).toBe(true);
  });

  it("rejects short name", () => {
    const result = signUpSchema.safeParse({
      name: "J",
      email: "john@example.com",
      password: "password123",
      confirmPassword: "password123",
    });
    expect(result.success).toBe(false);
  });

  it("rejects short password", () => {
    const result = signUpSchema.safeParse({
      name: "John Doe",
      email: "john@example.com",
      password: "short",
      confirmPassword: "short",
    });
    expect(result.success).toBe(false);
  });

  it("rejects mismatched passwords", () => {
    const result = signUpSchema.safeParse({
      name: "John Doe",
      email: "john@example.com",
      password: "password123",
      confirmPassword: "different123",
    });
    expect(result.success).toBe(false);
  });
});
