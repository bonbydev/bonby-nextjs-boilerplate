import { beforeEach, describe, expect, it, vi } from "vitest";

import { rateLimit } from "../rate-limit";

describe("rateLimit", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  it("allows requests under the limit", () => {
    const result = rateLimit("test:1", { maxAttempts: 3, windowMs: 60_000 });
    expect(result.success).toBe(true);
    expect(result.remaining).toBe(2);
  });

  it("blocks requests over the limit", () => {
    for (let i = 0; i < 3; i++) {
      rateLimit("test:2", { maxAttempts: 3, windowMs: 60_000 });
    }
    const result = rateLimit("test:2", { maxAttempts: 3, windowMs: 60_000 });
    expect(result.success).toBe(false);
    expect(result.remaining).toBe(0);
  });

  it("resets after the time window", () => {
    for (let i = 0; i < 3; i++) {
      rateLimit("test:3", { maxAttempts: 3, windowMs: 60_000 });
    }

    vi.advanceTimersByTime(61_000);

    const result = rateLimit("test:3", { maxAttempts: 3, windowMs: 60_000 });
    expect(result.success).toBe(true);
    expect(result.remaining).toBe(2);
  });

  it("tracks different keys independently", () => {
    for (let i = 0; i < 3; i++) {
      rateLimit("key-a", { maxAttempts: 3, windowMs: 60_000 });
    }

    const resultA = rateLimit("key-a", { maxAttempts: 3, windowMs: 60_000 });
    const resultB = rateLimit("key-b", { maxAttempts: 3, windowMs: 60_000 });

    expect(resultA.success).toBe(false);
    expect(resultB.success).toBe(true);
  });
});
